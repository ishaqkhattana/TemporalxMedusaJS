# Medusa x Temporal POC

## Getting started
1. Install dependencies in both admin and storefront using `npm ci`
2. Run a temporal server with `temporal server start-dev`
3. Run a redis server with `redis-server`
5. Make sure Database connection configuration is done
4. Make sure Postgres database server is running with seed data (`npm run seed` in the medusa-demo directory)
5. `npm run dev` in medusa-demo dir will start the admin server and FE
6. `npm run dev` will start the storefront app along with a temporal worker

## Description
1. Completing checkout on the storefront (localhost:8000) will trigger a workflow with a series of dummy steps in Temporal UI on localhost
2. Capturing payment within 2 minutes (on the admin panel localhost:7001) of an order will complete the workflow
3. Failing to capture the payment within 2 minutes will exit the workflow as well but with a different result
