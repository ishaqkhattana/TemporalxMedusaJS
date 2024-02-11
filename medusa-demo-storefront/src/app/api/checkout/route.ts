import { NextRequest, NextResponse } from "next/server"
import { Connection, Client } from '@temporalio/client';
import { OneClickBuy } from "../../../../temporal/lib/workflows.js";

/**
 * This endpoint uses the serverless Product Module to list and count all product categories.
 * The module connects directly to your Medusa database to retrieve and manipulate data, without the need for a dedicated server.
 * Read more about the Product Module here: https://docs.medusajs.com/modules/products/serverless-module
 */
export async function GET(request: NextRequest) {
    try {
        const connection = await Connection.connect();
        const client = new Client({ connection });
        const itemIds = ['test-item-1', 'test-item-2', 'test-item-3']
        const randomIdIndex = Math.floor(Math.random() * itemIds.length)
        await client.workflow.start(OneClickBuy, {
            workflowId: 'payment',
            taskQueue: 'payment', 
            args: [itemIds[randomIdIndex]],
        }); // kick off the purchase async
        return NextResponse.json({
            status: "success",
        })
    } catch (err: any) {
        return NextResponse.json({
            status: "nope",
            error: err.message,
        })
    }

}
