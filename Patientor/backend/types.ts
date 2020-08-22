export type Diagnose = {
    code: string,
    name: string,
    latin?: string
};


interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
    startDate: string,
    endDate: string
}

export interface Discharge {
    date: string,
    criteria: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave?: SickLeave
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital',
    discharge: Discharge
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Array<Entry>
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum EntryType {
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck',
}

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;



export type NewPatient = Omit<Patient, 'id'>;
export type NewEntry = NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Entry, 'id'>;