/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Rol {
    admin = "admin",
    researcher = "researcher"
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

export interface AuthLoginDto {
    email: string;
    password: string;
}

export interface CreateOcurrenceDto {
    phenomenaId: string;
    date: Date;
    description: string;
    witness: boolean;
    resolved: boolean;
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

export interface DeleteOcurrenceDto {
    ocurrenceId: string;
}

export interface DeletePhenomenonDto {
    phenomenonId: string;
}

export interface DeleteReseacherDto {
    researcherId: string;
}

export interface UpdateOcurrenceDto {
    ocurrenceId: string;
    date?: Date;
    description?: string;
    witness?: boolean;
    resolved?: boolean;
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

export interface AuthLoginResponseDto {
    accessToken: string;
    researcherId: string;
    type: string;
}

export interface IMutation {
    login(loginDto?: AuthLoginDto): AuthLoginResponseDto | Promise<AuthLoginResponseDto>;
    logout(): boolean | Promise<boolean>;
    createOcurrence(dto: CreateOcurrenceDto): Ocurrence | Promise<Ocurrence>;
    updateOcurrence(dto: UpdateOcurrenceDto): Ocurrence | Promise<Ocurrence>;
    deleteOcurrence(dto: DeleteOcurrenceDto): boolean | Promise<boolean>;
    createPhenomenon(dto: CreatePhenomenonDto): Phenomena | Promise<Phenomena>;
    updatePhenomenon(dto: UpdatePhenomenonDto): Phenomena | Promise<Phenomena>;
    deletePhenomenon(dto: DeletePhenomenonDto): boolean | Promise<boolean>;
    createResearcher(dto: CreateResearcherDto): Researcher | Promise<Researcher>;
    deleteResearcher(dto: DeleteReseacherDto): boolean | Promise<boolean>;
    updateResearcher(dto: UpdateResearcherDto): Researcher | Promise<Researcher>;
}

export interface Ocurrence {
    id: string;
    date: Date;
    description: string;
    witness: boolean;
    resolved: boolean;
    phenomena: Phenomena;
    phenomenaId: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface Phenomena {
    id: string;
    title: string;
    description: string;
    type: Types;
    researcher: Researcher;
    researcherId: string;
    ocurrences: Ocurrence[];
    updatedAt: Date;
    createdAt: Date;
}

export interface IQuery {
    loggedIn(): boolean | Promise<boolean>;
    getOcurrences(): Ocurrence[] | Promise<Ocurrence[]>;
    getOcurrence(id: string): Ocurrence | Promise<Ocurrence>;
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
