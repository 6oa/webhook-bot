@echo off
setlocal enabledelayedexpansion

rem Check if config.js exists
if not exist config.js (
    echo config.js not found. Please enter the required information to create the config.js file.
    
    rem Prompt for the webhook URL
    set /p webhook=Enter your webhook URL:
    
    rem Prompt for the port
    set /p port=Enter your port:

    (
        echo const webhook = '!webhook!'
        echo const server_port = !port!
        echo module.exports = {
        echo     webhook: webhook,
        echo     port: server_port
        echo };
    ) > config.js

    echo Configuration saved to config.js.
) else (
    echo config.js already exists. No need to set up configuration again.
)

rem Run your Node.js application
node .

pause