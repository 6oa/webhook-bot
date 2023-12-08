@echo off
setlocal enabledelayedexpansion

rem Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Opening Node.js website...

    start https://nodejs.org/en/
    
    echo Please install Node.js manually and run the script again.
    pause
    exit /b 1
)

rem Check if config.js exists
if not exist config.js (
    echo config.js not found. Please enter the required information to create the config.js file.

    set /p webhook=Enter Your Main Webhook URL:
    
    set /p hiddenUpdates=Enter Your Hidden Updates URL:

    set /p port=Enter your port:

    (
        echo const webhook = '!webhook!'
        echo const hiddenUpdates = '!hiddenUpdates!'
        echo const server_port = !port!
        echo module.exports = {
        echo     webhook: webhook,
        echo     hiddenUpdates: hiddenUpdates,
        echo     port: server_port
        echo };
    ) > config.js

    echo Configuration saved to config.js.
)

:continue

node .

pause
