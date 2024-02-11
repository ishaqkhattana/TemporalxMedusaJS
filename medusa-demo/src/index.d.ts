import { CustomerGroup } from "@medusajs/medusa";

export declare module "@medusajs/medusa/dist/models/store" {
    declare interface Store {
        members?: User[];
    }
}

export declare module "@medusajs/medusa/dist/models/user" {
    declare interface User {
        store_id?: string;
        store?: Store;
    }
}

export declare module "@medusajs/medusa/dist/models/sales-channel" {
    declare interface SalesChannel {
        customer_groups?: CustomerGroup[];
    }
}