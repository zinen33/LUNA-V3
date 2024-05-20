const chalk = require('chalk');
const gradient = require('gradient-string');

const log = (data, option) => {
    switch (option) {
        case "warn":
            console.log(chalk.bold.hex("#FF00FF")(`[ WARNING ] » `) + data);
            break;
        case "error":
            console.log(chalk.bold.hex("#FF00FF")(`[ ERROR ] » `) + data);
            console.error(data); // Print the error message to stderr
            break;
        default:
            console.log(chalk.bold.hex("#00BFFF")(`[ ${option.toUpperCase()} ] » `) + data);
            break;
    }
};

const logWithGradient = (data, option) => {
    const message = `[ 😈 MOHAMED X ZINO 😈 ] » ${data}`;
    switch (option) {
        case "warn":
            console.log(gradient.rainbow(`[ 😈 MOHAMED X ZINO 😈 ] » `) + data);
            break;
        case "error":
            console.log(gradient.rainbow(`[ 👿 ERROR 👿 ] » `) + data);
            console.error(data); // Print the error message to stderr
            break;
        default:
            console.log(gradient.rainbow(message));
            break;
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
        log(error.message, "error");
        logWithGradient(error.message, "error");
    }
};

// Call the example function to demonstrate error logging
exampleFunction();
