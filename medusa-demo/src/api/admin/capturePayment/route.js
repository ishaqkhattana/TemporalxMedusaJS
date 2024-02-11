"use strict";
import { defineSignal } from '@temporalio/workflow';
import { Client } from '@temporalio/client';

Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
async function GET(req, res) {
    try {
        const capturePaymentSignal = defineSignal('capturePayment');
        const client = new Client();
        const handle = client.workflow.getHandle('payment');
        const signalRes = await handle.signal(capturePaymentSignal)
        res.status(200).json({ res: signalRes });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}
exports.GET = GET;