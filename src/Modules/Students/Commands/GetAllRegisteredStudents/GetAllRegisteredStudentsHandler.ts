import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { Result } from '../../../../Shared/Application/Result/Result';
import { Student } from '../../Models/Student';
import { IStudentRepository } from '../../Repositories/StudentRepository/IStudentRepository';
import { GetAllRegisteredStudentsRequest } from './GetAllRegisteredStudentsRequest';

export type GetAllRegisteredStudentsResponse = Student[];

export class GetAllRegisteredStudentsHandler implements CommandHandler<GetAllRegisteredStudentsResponse> {
    public static key: string = 'GetAllRegisteredStudents';

    public constructor(private readonly studentRepo: IStudentRepository) {}

    async handle(request: GetAllRegisteredStudentsRequest): Promise<Result<GetAllRegisteredStudentsResponse>> {
        try {
            return { ok: true, value: await this.studentRepo.getAllStudents() };
        } catch (e: unknown) {
            return {
                ok: false,
                error: e instanceof Error ? e : new Error('Failed to fetch all students from student repository')
            };
        }
    }
}
