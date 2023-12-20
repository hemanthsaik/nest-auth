import { MigrationInterface, QueryRunner } from "typeorm";

export class Logs1703053836011 implements MigrationInterface {
    name = 'Logs1703053836011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`emailId\` varchar(255) NOT NULL, \`lastSignedIn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expires_at\` timestamp NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`token\` varchar(2500) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`service\` (\`id\` int NOT NULL AUTO_INCREMENT, \`serviceName\` varchar(255) NOT NULL, \`callbackUrl\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`service\``);
        await queryRunner.query(`DROP TABLE \`user_logs\``);
    }

}
