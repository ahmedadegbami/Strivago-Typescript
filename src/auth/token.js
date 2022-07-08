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
exports.JWTAuthMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const tools_js_1 = require("./tools.js");
const JWTAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Check if authorization header is in the request, if it is not --> 401
    if (!req.headers.authorization) {
        next((0, http_errors_1.default)(401, "Please provide Bearer Token in the authorization header!"));
    }
    else {
        try {
            // 2. If authorization header is there we can extract the token from it (Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJhYzg1NmRkMzM5YTBmNzU2OGVhNjEiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NTY0OTI5MTMsImV4cCI6MTY1NzA5NzcxM30.VdPVmNkUGOvSf4y39rMuXPI_aaafxexqU65Q2Jgbefo")
            const token = req.headers.authorization.replace("Bearer ", "");
            // 3. Verify token (check the expiration date and check the signature integrity), if everything is fine we should get back the payload ({_id, role})
            const payload = yield (0, tools_js_1.verifyAccessToken)(token);
            // 4. If token is ok --> next
            req.user = {
                _id: payload._id,
                role: payload.role
            };
            next();
        }
        catch (error) {
            // 5. If the token is not ok --> jsonwebtoken library should throw some errors, so we gonna catch'em and --> 401
            console.log(error);
            next((0, http_errors_1.default)(401, "Token not valid!"));
        }
    }
});
exports.JWTAuthMiddleware = JWTAuthMiddleware;
