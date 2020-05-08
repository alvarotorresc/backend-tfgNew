/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Rol {
    Admin = "Admin",
    Researcher = "Researcher"
}

export interface CreateResearcherDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    nationality: string;
    image: string;
    rol: Rol;
}

export interface DeleteReseacherDto {
    researcherId: string;
}

export interface UpdateResearcherDto {
    researcherId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    age?: number;
    nationality?: string;
    image?: string;
    rol?: Rol;
}

export interface IMutation {
    createResearcher(dto: CreateResearcherDto): Researcher | Promise<Researcher>;
    deleteResearcher(dto: DeleteReseacherDto): boolean | Promise<boolean>;
    updateResearcher(dto: UpdateResearcherDto): Researcher | Promise<Researcher>;
}

export interface IQuery {
    researchers(): Researcher[] | Promise<Researcher[]>;
    researcher(id: string): Researcher | Promise<Researcher>;
}

export interface Researcher {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    nationality: string;
    image: string;
    rol: Rol;
    updatedAt: Date;
    createdAt: Date;
}
