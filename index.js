const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const express = require("express");
const gradient = require('gradient-string'); // Ensure you have installed the gradient-string package
const chalk = require('chalk'); // Ensure you have installed the chalk package

const app = express();
const port = process.env.PORT || 3078;

const logo = `
██╗░░░░░██╗░░░██╗███╗░░██╗░█████╗  
██║░░░░░██║░░░██║████╗░██║██╔══██╗ 
██║░░░░░██║░░░██║██╔██╗██║███████║  
██║░░░░░██║░░░██║██║╚████║██╔══██║  
███████╗╚██████╔╝██║░╚███║██║░░██║ 
╚══════╝ ╚═════╝ ╚═╝  ╚══╝╚═╝   ╚═╝ 
`;

const redToGreen = gradient('red', 'cyan');
console.log(redToGreen("━".repeat(42)));
console.log(redToGreen(logo));
console.log(redToGreen("━".repeat(42)));

// Function to get bot ping
const getPing = async () => {
  try {
    const start = Date.now();
    await axios.get('https://www.google.com'); // Example request
    const end = Date.now();
    return end - start;
  } catch (error) {
    logger(`Error fetching ping: ${error.message}`, "[ ERROR ]");
    return -1; // Return a negative value to indicate an error
  }
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

  // Print features with blue color and bold font
  const blueBold = chalk.blue.bold;
  console.log(blueBold("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"));
  console.log(blueBold(`┃➢ Bot Ping: ${ping >= 0 ? ping + ' ms' : 'Error fetching ping'}       ┃`));
  console.log(blueBold(`┃➢  Memory Usage: ${memoryUsage} MB       ┃`));
  console.log(blueBold(`┃➢ Number of Commands: ${numberOfCommands}            ┃`));
  console.log(blueBold(`┃➢ Bot Version: LUNA-V3                        ┃`));
  console.log(blueBold("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"));

  console.log(redToGreen("━".repeat(50)));

})();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`く愛↬ 𝗕𝗢𝗧 𝗟𝗨𝗡𝗔↫🇩🇿\n ZINO MOHAMED`);
});

function startBot(message) {
  if (message) logger(message, "[ Starting ]");

  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", (codeExit) => {
    if (codeExit !== 0 || (global.countRestart && global.countRestart < 5)) {
      global.countRestart = (global.countRestart || 0) + 1;
      startBot("Starting up...");
    }
  });

  child.on("error", (error) => {
    logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
  });
}

startBot();

app.listen(port, () => {
  console.log(`Bot running on port: ${port}`);
});
