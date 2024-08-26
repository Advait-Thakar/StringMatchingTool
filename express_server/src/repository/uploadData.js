const prisma = require('../../prisma/index');

const uploadPdfData = async (object) => {
    try {
        // Validate the response data
        const json = JSON.parse(object);
        const pdfInfo = json.pdfInfo;
        const content = json.pages;
        if (!pdfInfo || !content) {
            throw new Error("Invalid data format: Missing pdfInfo or content.");
        }

        // Create a new Pdf record
        const newPdf = await prisma.pdf.create({
            data: {
                number_of_pages: pdfInfo.numpages,
                version: pdfInfo.version,
                content: {
                    create: content.map((page) => ({
                        chunks: {
                            create: page.chunks.map((chunk) => ({
                                sublines: {
                                    create: chunk.sublines
                                        .map((subline) => ({
                                            pagenum: page.pageId,
                                            linenum: chunk.linesId,
                                            sublinenum: subline.sublineId,
                                            text: subline.subline,
                                        })),
                                },
                            })),
                        },
                    })),
                },
            },
        });

        console.log('Pdf data uploaded successfully:', newPdf);
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = uploadPdfData;
