"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const mappedErrors = error.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            res.status(400).json({ success: false, error: mappedErrors });
            return;
        }
        res.status(400).json({ success: false, error: 'Validation Error' });
    }
};
exports.validate = validate;
