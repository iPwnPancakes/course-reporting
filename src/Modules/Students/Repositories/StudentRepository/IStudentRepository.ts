import { Student } from '../../Models/Student';

export interface IStudentRepository {
    addStudent(student: Student): void;

    getAllStudents(): Student[];

    contains(student: Student): boolean;
}
