import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServiceIdToUserLogs1703569046449 implements MigrationInterface {
    name = 'AddServiceIdToUserLogs1703569046449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_logs\` ADD \`serviceId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_logs\` ADD CONSTRAINT \`FK_b13b73ce5bc838bbb27cdf56890\` FOREIGN KEY (\`serviceId\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_logs\` DROP FOREIGN KEY \`FK_b13b73ce5bc838bbb27cdf56890\``);
        await queryRunner.query(`ALTER TABLE \`user_logs\` DROP COLUMN \`serviceId\``);
    }

}
