import { Entity, OneToMany } from "typeorm"
import {
    SalesChannel as MedusaSalesChannel,
} from "@medusajs/medusa"
import { CustomerGroup } from "./customerGroup";

@Entity()
export class SalesChannel extends MedusaSalesChannel {
    @OneToMany(() => CustomerGroup, (customerGroup) => customerGroup?.sales_channel)
    customer_groups?: CustomerGroup[];
}