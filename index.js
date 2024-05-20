const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const express = require("express");
const gradient = require('gradient-string'); // Ensure you have installed the gradient-string package

const app = express();
const port = process.env.PORT || 3078;

const logo = `
██╗░░░░░██╗░░░██╗███╗░░██╗░█████╗  
██║░░░░░██║░░░██║████╗░██║██╔══██╗ 
██║░░░░░██║░░░██║██╔██╗██║███████║ 
██║░░░░░██║░░░██║██║╚████║██╔══██║ 
███████╗╚██████╔╝██║░╚███║██║░░██║ 
╚══════╝ ╚═════╝ ╚═╝  ╚══╝╚═╝  ╚═╝ 
`;

const redToGreen = gradient('red', 'cyan');
console.log(redToGreen("━".repeat(42)));
console.log(redToGreen(logo));
console.log(redToGreen("━".repeat(42)));

// Function to get bot ping
const getPing = async () => {
  const start = Date.now();
  await axios.get('https://www.google.com'); // Example request
  const end = Date.now();
  return end - start;
};

// Function to get memory usage
const getMemoryUsage = () => {
  const memoryUsage = process.memoryUsage();
  return (memoryUsage.heapUsed / 1024 / 1024).toFixed(2); // Convert to MB
};

// Assume you have a function or a variable that tracks the number of commands
const getNumberOfCommands = () => {
  // Placeholder for actual number of commands
  return 42;
};

(async () => {
  const ping = await getPing();
  const memoryUsage = getMemoryUsage();
  const numberOfCommands = getNumberOfCommands();

  console.log(redToGreen(`Bot Ping: ${ping} ms`));
  console.log(redToGreen(`Memory Usage: ${memoryUsage} MB`));
  console.log(redToGreen(`Number of Commands: ${numberOfCommands}`));
  console.log(redToGreen("━".repeat(50)));
})();

app.get("/", (req, res) => {
  res.send(`ZINO X MOHAMED`);
});

function startBot(message) {
  (message) ? logger(message, "[ Starting ]") : "";

  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", (codeExit) => {
    if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
      startBot("Starting up...");
      global.countRestart += 1;
      return;
    } else return;
  });

  child.on("error", function(error) {
    logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
  });
}

logger('••¤(`×[¤ MOHAMED X ZINO ¤]×´)¤••', "[ NAME ]");
logger("Version: 1.1.0", "[ VERSION ]");

startBot();

app.listen(port, () => {
  console.log(`Bot running on port: ${port}`);
});
