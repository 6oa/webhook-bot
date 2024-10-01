## About This Bot
- Fully functional GitHub bot that sends commits into embeds to any specified webhook.
- Easy to use and setup with a simple bat script prompting you to fill out all webhook types, or you can edit the config.json yourself
## Prerequisites
- [Node.JS](https://nodejs.org/dist/v21.1.0/node-v21.1.0-x64.msi)

## Node.js Installation
- Open a command prompt inside the folder
- Then run the following command
```bash
  npm install
```
    
### Bot Installation
-  Clone the repo
- Launch the .bat file, after that a file will be created called `config.json`, Then follow the on screen prompts
- You can change this later on by either deleting the `config.json` or simply editing the file its self
- Go to github-repo/settings/webhooks and create a new webhook like the example below

```bash
  http://IP_ADDRESS:PORT/recieve_github
```
### Webhook Settings
- Head into the repository that you want to commits to be in and go to "Settings > Webhooks > Add Webhook" and then follow the options below
![image](https://github.com/user-attachments/assets/c023adb6-cf1e-40ac-ac86-8db20523edb5)

- Replace `IP_ADDRESS`, Whatever machine the bot is currently being run on. Find the ip address then replace `"IP_ADDRESS"`
- Replace `PORT`, Whatever machine the bot is currently being run on. Use the configured port that is port forwarded then replace `"PORT"`
- Make sure that there is a `:` in the middle of `IP_ADDRESS` and `PORT` like this `IP_ADDRESS:PORT`

### Bot's features
- Main webhook: These are public commits that are shown only if there is brackets surrounded in the commit message "tweak(bot)" for example
- Hidden updates webhook: These are private commits that show all the commits that dont have brackets in the message "Update server.js" for example
- Port: You will have to port forward this port in your internet providers home page it can be any number you want, Go to https://portchecker.co/ to check if the port is taken or not
- 
## Preview

![image](https://i.imgur.com/DkmOueu.png)

## Errors?
<a href="https://discordapp.com/users/1041903927253286952"><img src="https://img.shields.io/badge/evn.-black?style=for-the-badge&logo=discord" alt="evn."></a>
