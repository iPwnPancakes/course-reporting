import { CommandHandler } from '../../../../Shared/Application/Command/CommandHandler';
import { Result } from '../../../../Shared/Application/Result/Result';
import { IStudentRepository } from '../../Repositories/StudentRepository/IStudentRepository';
import { GetAllRegisteredStudentsRequest } from './GetAllRegisteredStudentsRequest';
import { ViewBag } from '../../../../Shared/Application/ViewBag/ViewBag';

export class GetAllRegisteredStudentsHandler implements CommandHandler {
    public static key: string = 'GetAllRegisteredStudents';

    public constructor(private readonly studentRepo: IStudentRepository) {}

    async handle(request: GetAllRegisteredStudentsRequest): Promise<Result<ViewBag>> {
        try {
            return {
                ok: true,
                value: new ViewBag({ students: await this.studentRepo.getAllStudents() })
            };
        } catch (e: unknown) {
            return {
                ok: false,
                error: e instanceof Error ? e : new Error('Failed to fetch all students from student repository')
            };
        }
    }
}
