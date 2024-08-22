const textTransform = (text) => {
    // Check if text is a string
    if (typeof text !== 'string') {
        console.log(typeof text);
        throw new TypeError('Expected input to be a string');
    }

    // Remove non-ASCII characters
    let asciiText = text.replace(/[^\x00-\x7F]/g, '');

    // Replace newline characters and carriage returns with a space
    asciiText = asciiText.replace(/[\r\n]+/g, ' ');

    // Replace multiple spaces or tabs with a single space
    let cleanedText = asciiText.replace(/\s+/g, ' ').trim();

    return cleanedText;
}

module.exports = { textTransform };