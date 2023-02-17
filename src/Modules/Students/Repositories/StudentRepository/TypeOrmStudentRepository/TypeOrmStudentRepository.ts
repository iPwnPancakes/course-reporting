import { IStudentRepository } from '../IStudentRepository';
import { Student } from '../../../Models/Student';
import { DataSource } from 'typeorm';
import { StudentEntity } from '../../../../../Infrastructure/TypeOrm/Entities/StudentEntity';

export class TypeOrmStudentRepository implements IStudentRepository {
    constructor(private readonly dataSource: DataSource) {
    }

    async addStudent(student: Student): Promise<Student> {
        const repo = this.dataSource.getRepository(StudentEntity);

        const studentEntity = new StudentEntity();
        studentEntity.name = student.getName();
        studentEntity.email = student.getEmail();

        await repo.save(studentEntity);

        return student;
    }

    async contains(student: Student): Promise<boolean> {
        const repo = this.dataSource.getRepository(StudentEntity);

        return await repo.exist({ where: { name: student.getName() } });
    }

    async getAllStudents(): Promise<Student[]> {
        const repo = this.dataSource.getRepository(StudentEntity);

        const studentEntities = await repo.find();

        return studentEntities.map((studentEntity: StudentEntity) => {
            const student = Student.make(studentEntity.name, studentEntity.email);

            if (student.ok === false) {
                throw new Error('Could not create Student from repository row entry');
            }

            return student.value;
        });
    }
}
