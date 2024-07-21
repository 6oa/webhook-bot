## About This Bot
- This is one of my early builds of my github bot with some missing features such as not being an actual bot.
- This is going to be a little project i can work on from time to time and help out some other people wanting a bot like this
- And alot more to come
## Prerequisites
-   [Windows 10](https://go.microsoft.com/fwlink/?LinkId=691209)/[11](https://go.microsoft.com/fwlink/?linkid=2156295)
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
![image](https://github.com/user-attachments/assets/c023adb6-cf1e-40ac-ac86-8db20523edb5)

- Replace `IP_ADDRESS`, Whatever machine the bot is currently being run on. Find the ip address then replace `"IP_ADDRESS"`
- Replace `PORT`, Whatever machine the bot is currently being run on. Use the configured port that is port forwarded then replace `"PORT"`
- Make sure that there is a `:` in the middle of `IP_ADDRESS` and `PORT` like this `IP_ADDRESS:PORT`

### Bot's features
- Main webhook: These are public commits that are shown only if there is brackets surrounded in the commit message "tweak(bot)" for example
- Hidden updates webhook: These are private commits that show all the commits that dont have brackets in the message "Update server.js" for example
- Port: You will have to port forward this port in your internet providers home page it can be any number you want, Go to https://portchecker.co/ to check if the port is taken or not

## Errors?
- Contact the developer [evn.](https://discord.com/users/1041903927253286952) on discord.
![image](https://github.com/user-attachments/assets/8483e210-7179-4818-b14f-c15099d693a8)

## Preview

![image](https://i.imgur.com/DkmOueu.png)
