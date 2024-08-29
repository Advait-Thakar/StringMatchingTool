const SUCCESS = require("../constants/responses");
const searchText = require("../services/searchText");
const fs = require('fs').promises;  // Using promises for async file handling
const path = require('path');
const { getExtractedText } = require("../utils/extractPdf");
const { textTransform } = require("../utils/textTransform");
const { jobResults, jobsInProgress } = require("../helpers/SearchJobs");


const searchController = {
    handleSearch: async (req, res) => {
        try {
            // Resolve the path to the uploaded file
            //console.log(req.file.filename);
            const filePath = path.resolve('../public/uploads', `${req.file.filename}`);

            // Read the file asynchronously
            const fileBuffer = await fs.readFile(filePath);

            // Extract text from the file
            const { pages } = await getExtractedText(fileBuffer);
            let feeder = '';
            pages.forEach((page)=>{
                feeder += '\n' + page.content;
            });
            feeder = textTransform(feeder);

            // Get search text from request body (preferred over headers for this purpose)
            let textToSearch = req.body.search || req.query.text;  // Adjust based on your API design
            textToSearch = textToSearch;

            // Perform the search operation (ensure this function is correctly implemented)
            
            const jobId = `${Date.now()}-${Math.random}`
            jobResults[jobId] = { status: 'in-progress', res: [] };
            jobsInProgress.add(jobId);

            searchText.processJobs(jobId, feeder, textToSearch);
            
            
            const results = await searchText.searchText(feeder, textToSearch);

            const response = SUCCESS.getSuccessMessage("SUCCESS");

            // Send JSON response
            res.json({ response, feeder, textToSearch, results });

        } catch (error) {
            console.error("Error in handleSearch:", error);

            // Send error response
            res.status(500).json({ message: "An error occurred", error: error.message });
        }
    }
}

module.exports = searchController;
