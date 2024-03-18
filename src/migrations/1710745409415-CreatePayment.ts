import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePayment1710745409415 implements MigrationInterface {
    name = 'CreatePayment1710745409415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "ChipsPurchased" TO "chipsPurchased"`);
        await queryRunner.query(`CREATE TABLE "bet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" character varying NOT NULL, CONSTRAINT "PK_4ceea2cdef435807614b8e17aed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "bet"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "chipsPurchased" TO "ChipsPurchased"`);
    }

}
