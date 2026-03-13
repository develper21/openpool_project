"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message, statusCode = 200, pagination) => {
    const response = { success: true };
    if (data !== undefined)
        response.data = data;
    if (message)
        response.message = message;
    if (pagination)
        response.pagination = pagination;
    return res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const errorResponse = (res, message, statusCode = 500, errorDetails) => {
    const response = {
        success: false,
        error: message,
    };
    if (errorDetails) {
        // Handling Zod-style or extended error arrays
        if (Array.isArray(errorDetails)) {
            response.error = errorDetails;
        }
        else {
            // Attach non-array error details as a specific field structure or log it
            response.error = errorDetails;
        }
    }
    return res.status(statusCode).json(response);
};
exports.errorResponse = errorResponse;
