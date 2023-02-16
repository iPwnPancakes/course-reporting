import { Student } from '../../Models/Student';

export interface IStudentRepository {
    addStudent(student: Student): Student;

    getAllStudents(): Student[];

    contains(student: Student): boolean;
}
