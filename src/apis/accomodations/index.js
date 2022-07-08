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
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const model_js_1 = __importDefault(require("./model.js"));
const host_js_1 = require("../../auth/host.js");
const token_js_1 = require("../../auth/token.js");
const accomdationRouter = express_1.default.Router();
accomdationRouter.post("/", token_js_1.JWTAuthMiddleware, host_js_1.hostOnlyMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAccomdation = new model_js_1.default(req.body);
        const { _id } = yield newAccomdation.save();
        res.status(201).send({ _id });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
accomdationRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accomdations = yield model_js_1.default.find();
        res.send(accomdations);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
accomdationRouter.get("/:accomdationId", token_js_1.JWTAuthMiddleware, host_js_1.hostOnlyMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accomdation = yield model_js_1.default.findById(req.params.accomdationId);
        if (accomdation) {
            res.send(accomdation);
        }
        else {
            next((0, http_errors_1.default)(404, `Accomdation with id ${req.params.accomdationId} not found!`));
        }
    }
    catch (error) {
        next(error);
    }
}));
accomdationRouter.put("/:accomdationId", token_js_1.JWTAuthMiddleware, host_js_1.hostOnlyMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAccomdation = yield model_js_1.default.findByIdAndUpdate(req.params.accomdationId, req.body, { new: true, runValidators: true });
        if (updatedAccomdation) {
            res.send(updatedAccomdation);
        }
        else {
            next((0, http_errors_1.default)(404, `Accomdation with id ${req.params.accomdationId} not found!`));
        }
    }
    catch (error) {
        next(error);
    }
}));
accomdationRouter.delete("/:accomdationId", token_js_1.JWTAuthMiddleware, host_js_1.hostOnlyMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAccomdation = yield model_js_1.default.findByIdAndDelete(req.params.accomdationId);
        if (deletedAccomdation) {
            res.send(deletedAccomdation);
        }
        else {
            next((0, http_errors_1.default)(404, `Accomdation with id ${req.params.accomdationId} not found!`));
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = accomdationRouter;
