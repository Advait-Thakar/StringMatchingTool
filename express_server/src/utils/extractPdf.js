const pdf = require('pdf-parse');

const getExtractedText = async (fileBuffer) => {
    // Create an array to store objects containing pageNumber and content
    const pages = [];

    // Define the options with a custom page render function
    const options = {
        pagerender: (pageData) => {
            return pageData.getTextContent().then((textContent) => {
                const pageText = textContent.items.map(item => item.str).join(' ');

                // Store the extracted page text and page number into the array
                pages.push({
                    pageNumber: pageData.pageNumber,
                    content: pageText
                });
            });
        }
    };

    // Parse the PDF with custom options
    const pdfData = await pdf(fileBuffer, options);

    metadata = {
        numpages: pdfData.numpages,
        version: pdfData.version,
        author: pdfData.info.Author || 'Unknown' // Extract author or provide a default value
    };

    // Return the array of page objects and metadata
    return {
        pages,
        metadata
    };
};

module.exports = { getExtractedText };
