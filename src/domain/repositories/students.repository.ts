import { StudentEntity } from 'src/domain';
import { Repository } from 'typeorm';

export interface StudentRepositoryInterface extends Repository<StudentEntity> {}
