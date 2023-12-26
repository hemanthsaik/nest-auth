import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserLogs1703559650095 implements MigrationInterface {
    name = 'UpdateUserLogs1703559650095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_logs\` CHANGE \`expires_at\` \`expiresAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_logs\` CHANGE \`lastSignedIn\` \`lastSignedIn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_logs\` CHANGE \`lastSignedIn\` \`lastSignedIn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_logs\` CHANGE \`expiresAt\` \`expires_at\` timestamp NOT NULL`);
    }

}
