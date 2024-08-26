const getChunkedData = (data) => {
    let pages = [];

    data.forEach(page => {
        pages.push({
            pageId: page.pageNumber,
            chunks: divideChunks(page.content),
        });
    });

    return pages;
};

const divideChunks = (content) => {
    const chunks = [];
    let linesId = 0;  // Initialize linesId inside the function to maintain scope
    const chunkSize = 100;
    const lines = content.split(".");

    lines.forEach((line) => {
        linesId++;
        if (line.length > chunkSize) {
            const sublines = divideLines(line, chunkSize);
            chunks.push({
                linesId: linesId,
                sublines
            });
        } else {
            chunks.push({
                linesId: linesId,
                sublines: [{
                    sublineId: 1,
                    subline: line
                }]
            });
        }
    });

    return chunks;  
}

const divideLines = (lineContent, chunkSize) => {
    const sublines = [];
    let sublineId = 0;  // Initialize sublineId inside the function to maintain scope

    for (let offset = 0; offset < lineContent.length; offset += chunkSize) {
        sublineId++;
        const end = Math.min(lineContent.length, offset + chunkSize);
        let subline = lineContent.substring(offset, end);
        sublines.push({
            sublineId: sublineId,
            subline
        });
    }

    return sublines;  
}

module.exports = { getChunkedData };
