import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'students' })
export class StudentEntity {
    @PrimaryColumn('varchar')
    name: string;

    @Column('varchar')
    email: string;
}
