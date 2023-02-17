import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateStudentTable1676650654057 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'students',
                columns: [
                    { name: 'name', type: 'varchar', length: '255', isPrimary: true },
                    { name: 'email', type: 'varchar', length: '255' }
                ]
            })
        );

        await queryRunner.createIndex(
            'students',
            new TableIndex({
                name: 'students_name_index',
                columnNames: ['name'],
                isUnique: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(new Table({ name: 'students' }));
    }
}
