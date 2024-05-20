const chalk = require('chalk');
const gradient = require('gradient-string');

const log = (errorMessage, solutionMessage) => {
    console.error(chalk.bold.hex("#FF00FF")(`[ ERROR ] ${chalk.red('⚠')} » `) + errorMessage);
    if (solutionMessage) {
        console.log(chalk.bold.hex("#FFA500")(`[ SOLUTION ] » `) + solutionMessage);
    }
};

const logWithGradient = (errorMessage, solutionMessage) => {
    console.error(gradient.rainbow(`[ 😈 MOHAMED X ZINO 😈 ERROR ${chalk.red('⚠')} ] » `) + errorMessage);
    if (solutionMessage) {
        console.log(gradient.rainbow(`[ 🌟 SOLUTION 🌟 ] » `) + solutionMessage);
    }
};

// Export the log functions
module.exports = log;
module.exports.loader = logWithGradient;

// Example usage with error handling
const exampleFunction = () => {
    try {
        // Simulate an error
        throw new Error("This is a simulated error message");
    } catch (error) {
        log(error.message, "This is the solution for the error.");
        logWithGradient(error.message, "This is the solution for the error.");
    }
};

// Call the example function to demonstrate error logging
exampleFunction();
