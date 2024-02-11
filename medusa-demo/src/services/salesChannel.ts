import { Lifetime } from "awilix"
import {
    FindConfig,
    Selector,
    StoreService as MedusaStoreService, Store, User, SalesChannel, SalesChannelService as MedusaSalesChannelService
} from "@medusajs/medusa"

class SalesChannelService extends MedusaSalesChannelService {
    static LIFE_TIME = Lifetime.SCOPED
    protected readonly loggedInUser_: User | null

    constructor(container, options) {
        // @ts-expect-error prefer-rest-params
        super(...arguments)

        try {
            this.loggedInUser_ = container.loggedInUser
        } catch (e) {
            // avoid errors when backend first runs
        }
    }

    async listAndCount(selector: Selector<SalesChannel>, config?: FindConfig<SalesChannel>): Promise<[SalesChannel[], number]> {

        const hardcodedCustomerId = 'cus_01HJ69QR5MAXG823PS77SSB85Y';
    
        const queryWithCustomerGroup = this.manager_
            .createQueryBuilder(SalesChannel, 's')
            .innerJoinAndSelect('s.customer_groups', 'cg')
            .innerJoin('cg.customers', 'c', 'c.id = :customerId', { customerId: hardcodedCustomerId });
    
        const queryWithoutCustomerGroup = this.manager_
            .createQueryBuilder(SalesChannel, 's')
            .leftJoinAndSelect('s.customer_groups', 'cg')
            .where('cg.id IS NULL');
    
        const salesChannelsWithCustomerGroup = await queryWithCustomerGroup.getMany();
        const salesChannelsWithoutCustomerGroup = await queryWithoutCustomerGroup.getMany();
    
        const salesChannels = [...salesChannelsWithCustomerGroup, ...salesChannelsWithoutCustomerGroup];
    
        if (!salesChannels) {
            throw new Error('Unable to find the user store');
        }
    
        return [salesChannels, salesChannels.length];
    }
    
}

export default SalesChannelService