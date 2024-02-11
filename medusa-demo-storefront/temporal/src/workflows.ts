// /temporal/src/workflows.ts
import { defineSignal, proxyActivities, setHandler, sleep, condition } from '@temporalio/workflow';
import type * as activities from './activities';

const { purchase, verifyCardDetails, capturePayment, updateInternalState, NotifyConsumer } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export const cancelPaymentSignal = defineSignal('cancelPayment');
export const capturePaymentSignal = defineSignal('capturePayment');


export async function OneClickBuy(id: string): Promise<string> {
  let purchaseState = 'PURCHASE_PENDING';
  await verifyCardDetails()
  await sleep('4 seconds'); 

  await updateInternalState()
  await sleep('4 seconds'); 

  await NotifyConsumer()
  await sleep('4 seconds');

  const result = await purchase(id);
  await sleep('4 seconds'); 
  console.log(`Activity ID: ${result} executed!`);

  setHandler(cancelPaymentSignal, () => void (purchaseState = 'PURCHASE_CANCELLED'));
  setHandler(capturePaymentSignal, () => void (purchaseState = 'PURCHASE_CAPTURED'));

  if (await condition(() => purchaseState === 'PURCHASE_CAPTURED', '120s')) { 
    await capturePayment()
    return "Payment Captured"
  } else {
    return "Payment Cancelled"
  }
}