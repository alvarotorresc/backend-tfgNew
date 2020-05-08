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

export enum Types {
    APPARITION = "APPARITION",
    PSYCHOPHONY = "PSYCHOPHONY",
    HAUNTED_HOUSE = "HAUNTED_HOUSE",
    REINCARNATION = "REINCARNATION",
    TELEPATHY = "TELEPATHY",
    TELEKINESIS = "TELEKINESIS",
    UFOLOGY = "UFOLOGY"
}

export interface CreatePhenomenonDto {
    researcherId: string;
    title: string;
    description: string;
    type: Types;
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

export interface DeletePhenomenonDto {
    phenomenonId: string;
}

export interface DeleteReseacherDto {
    researcherId: string;
}

export interface UpdatePhenomenonDto {
    phenomenonId: string;
    title?: string;
    description?: string;
    type?: Types;
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
    createPhenomenon(dto: CreatePhenomenonDto): Phenomena | Promise<Phenomena>;
    updatePhenomenon(dto: UpdatePhenomenonDto): Phenomena | Promise<Phenomena>;
    deletePhenomenon(dto: DeletePhenomenonDto): boolean | Promise<boolean>;
    createResearcher(dto: CreateResearcherDto): Researcher | Promise<Researcher>;
    deleteResearcher(dto: DeleteReseacherDto): boolean | Promise<boolean>;
    updateResearcher(dto: UpdateResearcherDto): Researcher | Promise<Researcher>;
}

export interface Phenomena {
    id: string;
    title: string;
    description: string;
    type: Types;
    researcher: Researcher;
    researcherId: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface IQuery {
    getPhenomena(): Phenomena[] | Promise<Phenomena[]>;
    getPhenomenon(id: string): Phenomena | Promise<Phenomena>;
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
    phenomena: Phenomena[];
    updatedAt: Date;
    createdAt: Date;
}
