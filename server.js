const express = require('express');
const bodyParser = require('body-parser');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const config = require('./config');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hook = new Webhook(config.webhook);

app.post('/recieve_github', (req, res) => {

    const numCommits = req.body.commits.length;
    const branchName = req.body.ref.split('/').pop();

    const embed = new MessageBuilder()
    .setTitle(`[${req.body.repository.name}:${branchName}] ${numCommits} new commit${numCommits > 1 ? 's' : ''}`) 
    .setAuthor(`${req.body.sender.login}`, `${req.body.sender.avatar_url}`, `${req.body.sender.html_url}`)
    .setURL(`${req.body.repository.html_url}`)
    .setColor('#57f288')
    .setTimestamp();

    let commitFieldText = '';

    for (let i in req.body.commits) {
        commitFieldText += '[`' + req.body.commits[i].id.substring(0, 7) + '`](' + req.body.commits[i].url + ') ' + req.body.commits[i].message + ' - ' + req.body.commits[i].author.username + ' \n';
    }

    embed.addField('', commitFieldText);

    hook.send(embed);

    res.sendStatus(200);
});

app.listen(config.port, function () {
    console.log('Listening on port ' + config.port);
});

// @stripbar