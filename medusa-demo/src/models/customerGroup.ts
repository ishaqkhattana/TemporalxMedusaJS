import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import {
    CustomerGroup as MedusaCustomerGroup,
} from "@medusajs/medusa"
import { SalesChannel } from "./salesChannel";

@Entity()
export class CustomerGroup extends MedusaCustomerGroup {
    @Index("CustomerGroupSalesChannelID")
    @Column({ nullable: true })
    sales_channel_id?: string;

    @ManyToOne(() => SalesChannel, (salesChannel) => salesChannel.customer_groups)
    @JoinColumn({ name: 'sales_channel_id', referencedColumnName: 'id' })
    sales_channel?: SalesChannel;
}