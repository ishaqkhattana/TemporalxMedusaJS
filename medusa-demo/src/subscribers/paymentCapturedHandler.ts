import {
  OrderService,
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/medusa";

import { defineSignal } from '@temporalio/workflow';
import { Client } from '@temporalio/client';

type PaymentCapturedEvent = {
  id: string;
  no_notification: boolean;
};

export default async function paymentCapturedHandler({
  data,
  eventName,
  container,
}: SubscriberArgs<PaymentCapturedEvent>) {
    const capturePaymentSignal = defineSignal('capturePayment');
    const client = new Client();
    const handle = client.workflow.getHandle('payment');
    const signalRes = await handle.signal(capturePaymentSignal)
    console.log({signalRes})
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PAYMENT_CAPTURED,
};