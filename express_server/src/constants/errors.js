const ERROR_MESSAGES = {
    BAD_REQUEST: {
        status: 400,
        message: 'Bad request. The server could not understand the request due to invalid syntax.',
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized. Authentication is required and has failed or not been provided.',
    },
    FORBIDDEN: {
        status: 403,
        message: 'Forbidden. The server understood the request, but refuses to authorize it.',
    },
    NOT_FOUND: {
        status: 404,
        message: 'Not found. The requested resource could not be found.',
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: 'Internal server error. The server encountered an unexpected condition.',
    },
    SERVICE_UNAVAILABLE: {
        status: 503,
        message: 'Service unavailable. The server is currently unable to handle the request due to temporary overload or maintenance.',
    },
};

const ERROR = {
    getErrorMessage: (key) => {
        return ERROR_MESSAGES[key] || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
    },
};

module.exports = ERROR;
