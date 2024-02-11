import { Lifetime } from "awilix"
import { 
  ProductService as MedusaProductService, Product, User,
} from "@medusajs/medusa"
import { CreateProductInput as MedusaCreateProductInput, FindProductConfig, ProductSelector as MedusaProductSelector } from "@medusajs/medusa/dist/types/product"
import { MongoAbility, AbilityTuple, MongoQuery } from "@casl/ability"

type ProductSelector = {
  store_id?: string
} & MedusaProductSelector

type CreateProductInput = {
  store_id?: string
} & MedusaCreateProductInput

class ProductService extends MedusaProductService {
  static LIFE_TIME = Lifetime.SCOPED
  protected readonly loggedInUser_: User | null
  protected readonly ability_: MongoAbility<AbilityTuple, MongoQuery> | null

  constructor(container, options) {
    // @ts-expect-error prefer-rest-params
    super(...arguments)

    try {
      this.loggedInUser_ = container.loggedInUser
      this.ability_ = container.ability

    } catch (e) {
      // avoid errors when backend first runs
    }
  }

  async list(selector: ProductSelector, config?: FindProductConfig): Promise<Product[]> {
    console.log("list")
    return await super.list(selector, config)
  }

  async listAndCount(selector: ProductSelector, config?: FindProductConfig): Promise<[Product[], number]> {
    console.log("list and count")
    let ability = this.ability_
    // console.log(this.loggedInUser_)
    return await super.listAndCount(selector, config)

    // if (ability.can('read', 'all')) {
        // return await super.listAndCount(selector, config)
    // } else {
    //     throw new Error('Only admins can list products');
    // }
  }

}

export default ProductService