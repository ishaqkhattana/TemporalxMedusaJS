import { Context } from '@temporalio/activity';

export async function verifyCardDetails(): Promise<string> {
  console.log(`Card Details verified!`);
  return Context.current().info.activityId;
}

export async function capturePayment(): Promise<string> {
  console.log(`Payment Captured!`);
  return Context.current().info.activityId;
}

export async function updateInternalState(): Promise<string> {
  console.log(`DB Records updated!`);
  return Context.current().info.activityId;
}

export async function NotifyConsumer(): Promise<string> {
  console.log(`Consumer notified!`);
  return Context.current().info.activityId;
}

export async function purchase(id: string): Promise<string> {
  console.log(`Purchased ${id}!`);
  return Context.current().info.activityId;
}