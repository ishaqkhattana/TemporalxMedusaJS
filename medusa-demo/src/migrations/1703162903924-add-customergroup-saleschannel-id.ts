import { MigrationInterface, QueryRunner } from "typeorm"

export class AddCustomergroupSaleschannelId1703162903924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_group" ADD "sales_channel_id" character varying`);
        await queryRunner.query(`CREATE INDEX "CustomerGroupSalesChannelID" ON "customer_group" ("sales_channel_id") `);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."CustomerGroupSalesChannelID"`);
        await queryRunner.query(`ALTER TABLE "customer_group" DROP COLUMN "sales_channel_id"`);
    }

}
