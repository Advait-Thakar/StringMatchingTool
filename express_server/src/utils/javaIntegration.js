const { exec } = require('child_process');
const path = require('path');

// Correct path to your compiled Java classes directory

const runJavaClass = (args) => {

    // Construct the command to run the Java class
    const jarPath = 'D://Project/StringMatchingTool/express_server/src/utils/encoder.jar';
    const command = `java -jar ${jarPath} "${args.args0}" "${args.args1}" "${args.args2}"`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Java class: ${error.message}`); // Log the error
                reject(`Error executing Java class: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Java Class Error: ${stderr}`); // Log stderr
                reject(`Java Class Error: ${stderr}`);
                return;
            }
            resolve(stdout.trim());
        });
    });
};

const useBoyerMooreClass = (args) => {
    const jarPath = 'D://Project/StringMatchingTool/express_server/src/utils/searching.jar';
    const command = `java -jar ${jarPath} "${args.args0}" "${args.args1}"`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Java class: ${error.message}`); // Log the error
                reject(`Error executing Java class: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Java Class Error: ${stderr}`); // Log stderr
                reject(`Java Class Error: ${stderr}`);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

const runTest = (args) => {
    const jarPath = 'D://Project/StringMatchingTool/express_server/src/utils/techmintapp.jar';
    const argString = args.join(" ");
    return new Promise((resolve, reject) => {
        exec(`java -jar ${jarPath} ${argString}`, (err, stdout, stderr) => {
            if (err) {
                console.error("Error executing command:", err);
                reject(err);
                return; // Exit early if there's an error
            }
            console.log("Value at stdout is:", stdout);
            resolve(stdout);
        });
    });
};

module.exports = { runJavaClass, useBoyerMooreClass, runTest };
