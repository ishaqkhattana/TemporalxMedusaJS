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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OneClickBuy = exports.capturePaymentSignal = exports.cancelPaymentSignal = void 0;
// /temporal/src/workflows.ts
var workflow_1 = require("@temporalio/workflow");
var _a = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute'
}), purchase = _a.purchase, verifyCardDetails = _a.verifyCardDetails, capturePayment = _a.capturePayment, updateInternalState = _a.updateInternalState, NotifyConsumer = _a.NotifyConsumer;
exports.cancelPaymentSignal = (0, workflow_1.defineSignal)('cancelPayment');
exports.capturePaymentSignal = (0, workflow_1.defineSignal)('capturePayment');
function OneClickBuy(id) {
    return __awaiter(this, void 0, void 0, function () {
        var purchaseState, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    purchaseState = 'PURCHASE_PENDING';
                    return [4 /*yield*/, verifyCardDetails()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, workflow_1.sleep)('4 seconds')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, updateInternalState()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, workflow_1.sleep)('4 seconds')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, NotifyConsumer()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, workflow_1.sleep)('4 seconds')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, purchase(id)];
                case 7:
                    result = _a.sent();
                    return [4 /*yield*/, (0, workflow_1.sleep)('4 seconds')];
                case 8:
                    _a.sent();
                    console.log("Activity ID: ".concat(result, " executed!"));
                    (0, workflow_1.setHandler)(exports.cancelPaymentSignal, function () { return void (purchaseState = 'PURCHASE_CANCELLED'); });
                    (0, workflow_1.setHandler)(exports.capturePaymentSignal, function () { return void (purchaseState = 'PURCHASE_CAPTURED'); });
                    return [4 /*yield*/, (0, workflow_1.condition)(function () { return purchaseState === 'PURCHASE_CAPTURED'; }, '120s')];
                case 9:
                    if (!_a.sent()) return [3 /*break*/, 11];
                    return [4 /*yield*/, capturePayment()];
                case 10:
                    _a.sent();
                    return [2 /*return*/, "Payment Captured"];
                case 11: return [2 /*return*/, "Payment Cancelled"];
            }
        });
    });
}
exports.OneClickBuy = OneClickBuy;
//# sourceMappingURL=workflows.js.map