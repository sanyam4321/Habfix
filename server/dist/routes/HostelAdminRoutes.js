"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HostelAdmin_1 = require("../controllers/HostelAdmin");
const roleAuthentication_1 = require("../middlewares/roleAuthentication");
const jwtVerification_1 = __importDefault(require("../middlewares/jwtVerification"));
const hostelAdminRoutes = (0, express_1.Router)();
hostelAdminRoutes.put("/edit_profile", jwtVerification_1.default, roleAuthentication_1.hostelAdminAuth, HostelAdmin_1.edit_profile);
exports.default = hostelAdminRoutes;
