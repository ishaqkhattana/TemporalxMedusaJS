const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) { }

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: 'medusa-plugin-variant-images',
    options: {
      enableUI: true,
    },
  },
  {
    resolve: "medusa-plugin-meilisearch",
    options: {
      config: {
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
      },
      settings: {
        products: {
          indexSettings: {
            searchableAttributes: ["title", "description", "base_sku", "sales_channels"],
            displayedAttributes: [
              "title",
              "description",
              "variant_sku",
              "thumbnail",
              "prices",
              "handle",
              "id",
              "base_sku",
              "sales_channels"
            ],
          },
          primaryKey: "id",
          transformer: (product) => {
            const { id, title, description, thumbnail, handle } = product;
            let base_sku = "";
            if (product?.is_giftcard) {
              if (product?.variants[0]?.sku) {
                base_sku = product?.variants[0]?.sku.replace(/[0-9]/g, '');
              }
            } else {
              if (product?.variants[0]?.sku) {
                base_sku = product?.variants[0]?.sku.replace(/[0-9]/g, '');
              }
            }
            let salesChannelIds = []
            if (product?.sales_channels) {
              salesChannelIds = product.sales_channels.map(channel => channel.id);
              console.log("product.sales_channels", product?.sales_channels)
            }
            // console.log("Updated:", id, title, description, thumbnail, handle, base_sku, salesChannelIds)
            return {
              id,
              title,
              description,
              thumbnail,
              handle,
              base_sku,
              sales_channel_ids: salesChannelIds,
            };

            // const prices = {};

            // product.variants[0].prices.forEach((price) => {
            //   prices[price.currency_code] = price.amount;
            // });

            // const categoriesArr = product?.categories?.map((categ) => categ.id);

            // if (!prices || !id || Object.values(prices).length < 3) {
            //   return null;
            // }

            // console.log("Updated:", id, prices);

            // return {
            //   id,
            //   prices,
            //   title,
            //   description,
            //   thumbnail,
            //   handle,
            //   categories: categoriesArr,
            // };
          },
        },
      },
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  /*cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
