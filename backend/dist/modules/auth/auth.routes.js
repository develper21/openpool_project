"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_schema_1 = require("./auth.schema");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.post('/register', (0, middleware_1.validate)(auth_schema_1.registerSchema), auth_controller_1.AuthController.register);
router.post('/login', (0, middleware_1.validate)(auth_schema_1.loginSchema), auth_controller_1.AuthController.login);
router.post('/refresh', (0, middleware_1.validate)(auth_schema_1.refreshSchema), auth_controller_1.AuthController.refresh);
// Protected routes
router.use(middleware_1.authMiddleware);
router.use(middleware_1.trackApiUsage);
router.get('/me', auth_controller_1.AuthController.getMe);
router.post('/regenerate-api-key', auth_controller_1.AuthController.regenerateApiKey);
router.post('/logout', auth_controller_1.AuthController.logout);
exports.default = router;
