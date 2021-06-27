import { UniversityInterface } from './university.interface'

export interface UserInterface {
    email: string | null;
    favorites: UniversityInterface[];
    createdAt: Date;
}