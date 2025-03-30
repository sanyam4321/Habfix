"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit_profile = exports.checkHostelIssue = exports.reviewHostelIssue = exports.assignHostelIssue = exports.login_hostelAdmin = exports.signup_hostelAdmin = void 0;
const index_1 = require("../index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup_hostelAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { domain_id, name, role, hostel, password, phone_number } = req.body;
        if (!domain_id || !name || !hostel || !password || !phone_number) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }
        if (role !== "hostel_admin") {
            return res.status(400).json({
                success: false,
                message: "Invalid access to this route. Please sign up as a hostel admin."
            });
        }
        //check whether the hostel admin already exists or not
        const existingHostelAdmin = yield index_1.prisma.hostel_admin.findUnique({
            where: {
                domain_id
            }
        });
        if (existingHostelAdmin) {
            return res.status(400).json({
                success: false,
                message: "Hostel Admin already exists. Please sign in to continue."
            });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const hostelAdmin = yield index_1.prisma.hostel_admin.create({
            data: {
                name,
                domain_id,
                hostel,
                phone_number,
                password: hashedPassword
            }
        });
        return res.status(200).json({
            success: true,
            message: "Hostel Admin created successfully",
            hostelAdmin
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.signup_hostelAdmin = signup_hostelAdmin;
const login_hostelAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { domain_id, password } = req.body;
        if (!domain_id || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }
        if (req.body.role !== "hostel_admin") {
            return res.status(400).json({
                success: false,
                message: "Invalid access to this route. Please sign in as a hostel admin."
            });
        }
        const hostelAdmin = yield index_1.prisma.hostel_admin.findUnique({
            where: {
                domain_id
            }
        });
        if (!hostelAdmin) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        //check if the password is correct
        const validPassword = yield bcrypt_1.default.compare(password, hostelAdmin.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        //create and assign a token
        const token = jsonwebtoken_1.default.sign({
            domain_id: hostelAdmin.domain_id,
            role: "hostel_admin"
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            hostelAdmin
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.login_hostelAdmin = login_hostelAdmin;
const assignHostelIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { domain_id } = req.user;
        const { issue_id, technician_id } = req.body;
        if (!domain_id) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        if (!technician_id) {
            return res.status(400).json({
                success: false,
                message: "No Technician selected"
            });
        }
        const issue = yield index_1.prisma.issue.findUnique({
            where: {
                issue_id: Number(issue_id)
            }
        });
        const technician = yield index_1.prisma.technician.findUnique({
            where: {
                technician_id: technician_id
            }
        });
        if ((issue === null || issue === void 0 ? void 0 : issue.category) !== (technician === null || technician === void 0 ? void 0 : technician.category)) {
            return res.json({
                message: "please select technician with matching category"
            });
        }
        const updatedIssue = yield index_1.prisma.issue.update({
            where: {
                issue_id: Number(issue_id),
            },
            data: {
                technician_id: technician_id,
            },
        });
        return res.json({
            success: true,
            message: "Issue assigned successfully",
            issue: updatedIssue,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.assignHostelIssue = assignHostelIssue;
const reviewHostelIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { domain_id } = req.user;
        const { issue_id } = req.body;
        if (!domain_id) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        const issue = yield index_1.prisma.issue.delete({
            where: {
                issue_id
            }
        });
        return res.status(200).json({
            success: true,
            message: "Issues reviewed and resolved successfully",
            issue
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
});
exports.reviewHostelIssue = reviewHostelIssue;
const checkHostelIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { domain_id } = req.user;
        if (!domain_id) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        const hostelAdmin = yield index_1.prisma.hostel_admin.findUnique({
            where: {
                domain_id
            }
        });
        if (!hostelAdmin) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const hostel = hostelAdmin.hostel;
        const issues = yield index_1.prisma.issue.findMany({
            where: {
                location: hostel,
                is_resolved: false
            }
        });
        return res.status(200).json({
            success: true,
            message: "Here is the list of assigned issues at your hostel",
            issues
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.checkHostelIssue = checkHostelIssue;
//route for edit HostelAdmin profile
const edit_profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { domain_id } = req.user;
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.edit_profile = edit_profile;
