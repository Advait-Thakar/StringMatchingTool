const transformResponse = (response) => {
    if (typeof response !== 'string') {
        throw new Error('Expected response to be a string');
    }

    const data = response.split(":");

    if (data.length < 3) {
        throw new Error('Response format is incorrect');
    }

    const isFound = data[0] === 'true';
    const freq = Number(data[1]);

    // Ensure data[2] is defined and is a string
    const offsetString = data[2].slice(1, -1);
    const offsetArray = offsetString.split(',').map(Number);

    return { isFound, freq, offsetArray };
}

module.exports = transformResponse;
