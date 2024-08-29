const { jobResults } = require("../helpers/SearchJobs");
const Stack = require("../helpers/stack");
const transformResponse = require("../helpers/transformResponse");
const { useBoyerMooreClass } = require("../utils/javaIntegration");

const processJobs = async (jobId, feeder, textToSearch)=> {
    const results = await searchText(feeder, textToSearch);
    const batchSize = 5;

    const lineTexts = results.lineTexts;
    const frequency = results.freq;

    for (let i = 0; i < lineTexts.length; i+=batchSize) {
        const end = Math.min(i+batchSize, lineTexts.length);
        const batch = lineTexts.slice(i, end);

        jobResults[jobId].res.push(batch);
    }

    jobResults[jobId].status    
}

const searchText = async (feeder, textToSearch) => {
    // Prepare arguments for Boyer-Moore algorithm
    const jsonArgs = {
        args0: feeder,
        args1: textToSearch
    };

    // Call Boyer-Moore algorithm
    const response = await useBoyerMooreClass(jsonArgs);
    console.log(response);

    // Transform the response
    const { isFound, freq, offsetArray } = transformResponse(response.toString());

    // Return message if no lines are found
    if (!isFound) {
        return "No Lines Found!";
    }

    // Initialize stack and result arrays
    const lines = [];
    const stack = new Stack();

    // Initialize start of the line
    let lineStart = 0;

    // Process the feeder text
    for (let i = 0; i < feeder.length; i++) {
        // If the current character is a period, it indicates the end of a line
        if (feeder.charAt(i) === '.') {
            while (!stack.isEmpty()) {
                const top = stack.pop(); // Get the start index of the line
                lines.push({
                    start: lineStart,
                    end: i
                });
                // Reset lineStart to start from the current period
                lineStart = i + 1;
            }
        }

        // Push the index onto the stack if it is in the offsetArray
        if (offsetArray.includes(i)) {
            stack.push(i);
        }
    }

    // Handle the case where the last segment does not end with a period
    if (!stack.isEmpty()) {
        const top = stack.pop();
        lines.push({
            start: lineStart,
            end: feeder.length
        });
    }

    // Extract the text for each line segment
    const lineTexts = lines.map(line => feeder.substring(line.start, line.end).trim());

    // Return the results
    return new Promise((resolve)=>{
        resolve({ lineTexts, freq });
    });
};

module.exports = { processJobs, searchText };
