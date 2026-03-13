"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
// Prisma's Role Enum representation or simple string type to match DB
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["RESEARCHER"] = "RESEARCHER";
    Role["VIEWER"] = "VIEWER";
})(Role || (exports.Role = Role = {}));
