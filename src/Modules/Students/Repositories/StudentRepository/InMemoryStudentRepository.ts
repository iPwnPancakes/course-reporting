import { IStudentRepository } from './IStudentRepository';
import { Student } from '../../Models/Student';

export class InMemoryStudentRepository implements IStudentRepository {
    constructor(private arr: Student[] = []) {
    }

    addStudent(student: Student): Student {
        if (!this.contains(student)) {
            this.arr.push(student);
        }

        return student;
    }

    getAllStudents(): Student[] {
        return this.arr;
    }

    contains(student: Student): boolean {
        for (let i = 0; i < this.arr.length; i++) {
            if (student.equals(this.arr[i])) {
                return true;
            }
        }

        return false;
    }
}
