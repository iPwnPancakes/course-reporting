import { Student } from '../../Models/Student';

export interface IStudentRepository {
    addStudent(student: Student): Promise<Student>;

    getAllStudents(): Promise<Student[]>;

    contains(student: Student): Promise<boolean>;
}
