const textTransform = (text) => {
    // Check if text is a string
    if (typeof text !== 'string') {
        console.log(typeof text);
        throw new TypeError('Expected input to be a string');
    }

    // Remove non-printable ASCII characters (including control characters)
    let cleanedText = text.replace(/[\x00-\x1F\x7F]/g, '');

    // Replace common bullet points with a full stop
    cleanedText = cleanedText.replace(/[\u2022\u25AA\u25AB\u25FE\u25FB\u25FC\u25FD\u2219\u2043\u25CF]/g, '.');

    // Remove non-printable extended ASCII characters if needed
    // Optionally, uncomment this line if you want to include extended ASCII characters
    // cleanedText = cleanedText.replace(/[^\x20-\x7E]/g, '');

    // Replace multiple spaces or tabs with a single space
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

    // Return the cleaned text
    return cleanedText;
}

module.exports = { textTransform };
