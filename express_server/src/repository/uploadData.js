const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadPdfData = async (object) => {
    try {
        // Validate the response data
        const json = JSON.parse(object);
        const pdfInfo = json.pdfInfo;
        const content = json.pages;

        if (!pdfInfo || !content) {
            throw new Error("Invalid data format: Missing pdfInfo or content.");
        }

        // Ensure pdfInfo contains required fields
        const { numpages, version } = pdfInfo;
        if (typeof numpages !== 'number' || typeof version !== 'string') {
            throw new Error("Invalid pdfInfo format.");
        }

        // Create a new Pdf record
        const newPdf = await prisma.pdfInfo.create({
            data: {
                numpages: pdfInfo.numpages,
                version: pdfInfo.version,
                author: pdfInfo.author,
                content: {
                    create: content.map(page => ({
                        pageId: page.pageId,
                        chunks: {
                            create: page.chunks.map(chunk => ({
                                lines: {
                                    create: chunk.lines.map(line => ({
                                        pagenum: page.pageId,
                                        lineId: line.lineId,
                                        sublines: {
                                            create: line.sublines.map(subline => ({
                                                pagenum: page.pageId,
                                                linenum: line.lineId,
                                                sublineId: subline.sublineId.toString(),
                                                text: subline.text,
                                            })),
                                        },
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
        console.error('Error uploading PDF data:', error.message);
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = uploadPdfData;
