const SUCCESS_MESSAGES = {
    SUCCESS: {
        status: 200,
        message: 'Request was successful.',
    },
    CREATED: {
        status: 201,
        message: 'Resource was created successfully.',
    },
    NO_CONTENT: {
        status: 204,
        message: 'No content available.',
    },
};

const SUCCESS = {
    getSuccessMessage: (key) => {
        return SUCCESS_MESSAGES[key] || SUCCESS_MESSAGES.SUCCESS;
    },
};

module.exports = SUCCESS;
