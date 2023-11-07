const express = require('express');
const bodyParser = require('body-parser');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const config = require('./config');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hook = new Webhook(config.webhook);

app.post('/recieve_github', (req, res) => {
    const event = req.get('X-GitHub-Event');

    switch (event) {
        case 'push':
            handlePushEvent(req);
            break;
        case 'create':
            handleBranchCreation(req);
            break;
        case 'delete':
            handleBranchDeletion(req);
            break;
        case 'collaborator_added':
            handleCollaboratorAdded(req);
            break;
        case 'collaborator_removed':
            handleCollaboratorRemoved(req);
            break;
        case 'repository':
            handleRepoRenamed(req);
            break;
        case 'fork':
            handleRepoForked(req);
            break;
        case 'star':
            handleRepoStarred(req);
            break;
        case 'release':
            handleReleaseEvent(req);
            break;
        default:
            console.log(`Unhandled GitHub event: ${event}`);
            break;
    }

    res.sendStatus(200);
});

function handlePushEvent(req) {
    const repository = req.body.repository;
    const ref = req.body.ref;
    const commits = req.body.commits;
    const sender = req.body.sender;

    const branchName = ref.split('/').pop();
    const numCommits = commits.length;

    const embed = new MessageBuilder()
        .setTitle(`[${repository.name}:${branchName}] ${numCommits} new commit${numCommits > 1 ? 's' : ''}`)
        .setAuthor(sender.login, sender.avatar_url, sender.html_url)
        .setURL(repository.html_url)
        .setColor('#57f288')
        .setTimestamp();

    let commitFieldText = '';

    for (let i in commits) {
        const commit = commits[i];
        commitFieldText += `\`\`\`${commit.id.substring(0, 7)}\`\`\` [${commit.message}](${commit.url}) - ${commit.author.username}\n`;
    }

    embed.addField('', commitFieldText);

    hook.send(embed);
}

function handleBranchCreation(req) {
    const repository = req.body.repository;
    const branchName = req.body.ref;
    const creator = req.body.sender;

    const embed = new MessageBuilder()
        .setTitle(`[${repository.name}] Branch Created`)
        .setDescription(`Branch "${branchName}" created by ${creator.login}`)
        .setAuthor(creator.login, creator.avatar_url, creator.html_url)
        .setURL(repository.html_url)
        .setColor('#3498db')
        .setTimestamp();

    hook.send(embed);
}

function handleBranchDeletion(req) {
    const repository = req.body.repository;
    const branchName = req.body.ref;
    const deleter = req.body.sender;

    const embed = new MessageBuilder()
        .setTitle(`[${repository.name}] Branch Deleted`)
        .setDescription(`Branch "${branchName}" deleted by ${deleter.login}`)
        .setAuthor(deleter.login, deleter.avatar_url, deleter.html_url)
        .setURL(repository.html_url)
        .setColor('#e74c3c')
        .setTimestamp();

    hook.send(embed);
}

function handleBranchRenamed(req) {
    const repository = req.body.repository;
    const before = req.body.before;
    const after = req.body.after;
    const renamer = req.body.sender;

    const embed = new MessageBuilder()
        .setTitle(`[${repository.name}] Branch Renamed`)
        .setDescription(`Branch "${before}" renamed to "${after}" by ${renamer.login}`)
        .setAuthor(renamer.login, renamer.avatar_url, renamer.html_url)
        .setURL(repository.html_url)
        .setColor('#f1c40f')
        .setTimestamp();

    hook.send(embed);
}

function handleCollaboratorAdded(req) {
    const repository = req.body.repository;
    const collaborator = req.body.sender;
    const addedCollaborator = req.body.collaborator;

    const embed = new MessageBuilder()
        .setTitle(`[${repository.name}] Collaborator Added`)
        .setDescription(`${collaborator.login} added ${addedCollaborator.login} as a collaborator`)
        .setAuthor(collaborator.login, collaborator.avatar_url, collaborator.html_url)
        .setURL(repository.html_url)
        .setColor('#2ecc71')
        .setTimestamp();

    hook.send(embed);
}

function handleCollaboratorRemoved(req) {
    const repository = req.body.repository;
    const collaborator = req.body.sender;
    const removedCollaborator = req.body.collaborator;

    const embed = new MessageBuilder()
        .setTitle(`[${repository.name}] Collaborator Removed`)
        .setDescription(`${collaborator.login} removed ${removedCollaborator.login} as a collaborator`)
        .setAuthor(collaborator.login, collaborator.avatar_url, collaborator.html_url)
        .setURL(repository.html_url)
        .setColor('#e74c3c')
        .setTimestamp();

    hook.send(embed);
}

function handleRepoRenamed(req) {
    const repository = req.body.repository;
    const oldName = req.body.repository.name;
    const newName = req.body.repository.full_name;
    const author = req.body.sender;

    const embed = new MessageBuilder()
    .setTitle(`[${repository.name}]: Repository Renamed`)
        .setDescription(`Repository "${oldName}" renamed to "${newName}"`)
        .setAuthor(author.login, author.avatar_url, author.html_url)
        .setURL(repository.html_url)
        .setColor('#f1c40f')
        .setTimestamp();

    hook.send(embed);
}

function handleRepoForked(req) {
    const repository = req.body.repository;
    const forker = req.body.sender;
    const forkedRepo = req.body.forkee.full_name;

    const embed = new MessageBuilder()
    .setTitle(`[${repository.name}]: Repository Forked`)
        .setAuthor(forker.login, forker.avatar_url, forker.html_url)
        .setURL(repository.html_url)
        .setColor('#9b59b6')
        .setTimestamp();

    hook.send(embed);
}

function handleRepoStarred(req) {
    const repository = req.body.repository;
    const stargazer = req.body.sender;

    const embed = new MessageBuilder()
        .setTitle(`[${repository.name}] Repository Starred`)
        .setDescription(`${stargazer.login} starred the repository`)
        .setAuthor(stargazer.login, stargazer.avatar_url, stargazer.html_url)
        .setURL(repository.html_url)
        .setColor('#f39c12')
        .setTimestamp();

    hook.send(embed);
}

function handleReleaseEvent(req) {
    const repository = req.body.repository;
    const release = req.body.release;
    const sender = req.body.sender;

    const embed = new MessageBuilder()
        .setTitle(`[${repository.full_name}] New Release Created`)
        .setDescription(`${sender.login} created a new release "${release.tag_name}"`)
        .addField('Release Name', release.name || 'N/A', true)
        .addField('Release Tag', release.tag_name, true)
        .addField('Author', sender.login, true)
        .addField('Release URL', release.html_url)
        .setColor('#6f42c1')
        .setTimestamp();

    hook.send(embed);
}


app.listen(config.port, function () {
    console.log('Listening on port ' + config.port);
});
