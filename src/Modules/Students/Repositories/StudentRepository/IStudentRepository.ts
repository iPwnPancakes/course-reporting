export interface IStudentRepository {
    getIfExists(name: string): string | null;

    addStudent(name: string): void;

    getNumberOfStudents(): Number;

    getAllStudents(): string[];
}
