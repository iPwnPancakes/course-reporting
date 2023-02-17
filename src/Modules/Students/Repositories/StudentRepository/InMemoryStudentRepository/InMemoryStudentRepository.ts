import { IStudentRepository } from '../IStudentRepository';
import { Student } from '../../../Models/Student';

export class InMemoryStudentRepository implements IStudentRepository {
    constructor(private arr: Student[] = []) {
    }

    async addStudent(student: Student): Promise<Student> {
        if (!await this.contains(student)) {
            this.arr.push(student);
        }

        return student;
    }

    async getAllStudents(): Promise<Student[]> {
        return this.arr;
    }

    async contains(student: Student): Promise<boolean> {
        for (let i = 0; i < this.arr.length; i++) {
            if (student.equals(this.arr[i])) {
                return true;
            }
        }

        return false;
    }
}
