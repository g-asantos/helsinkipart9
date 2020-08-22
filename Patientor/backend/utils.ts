/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender, EntryType, HealthCheckRating, NewHospitalEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseAllbutGender = (content: any): string => {
    if (!content || !isString(content) || content === undefined) {
        throw new Error('Incorrect or missing content' + String(content));
    }

    return content;
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};


const isType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const isHealth = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};


const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + String(gender));
    }
    return gender;
};

const parseType = (type: any): EntryType => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect Entry Type');
    }

    return type;
};

const parseHealth = (health: any): HealthCheckRating => {

    if (!isHealth(health)) {
        throw new Error('Incorrect Health Rating');
    }

    return health;
};
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const newEntries = (object: any): any => {

    const baseEntry = {
        type: parseType(object[0].type),
        description: parseAllbutGender(object[0].description),
        date: parseAllbutGender(object[0].date),
        specialist: parseAllbutGender(object[0].specialist),
        diagnosisCodes: [object[0].diagnosisCodes]
    };



    switch (baseEntry.type) {
        case 'Hospital':
            return {
                ...baseEntry,
                discharge: {
                    date: parseAllbutGender(object[0].discharge.date),
                    criteria: parseAllbutGender(object[0].discharge.criteria)
                }
            };
        case 'OccupationalHealthcare':
            return {
                ...baseEntry,
                sickLeave: {
                    startDate: parseAllbutGender(object[0].sickLeave.startDate),
                    endDate: parseAllbutGender(object[0].sickLeave.endDate)
                }
            };
        case 'HealthCheck':
            return {
                ...baseEntry,
                healthCheckRating: parseHealth(object[0].healthCheckRating)
            };
        default:
            return {
                ...baseEntry
            };
    }
};


export const toNewHospitalEntry = (object: NewHospitalEntry): NewHospitalEntry => {
    return {
        specialist: parseAllbutGender(object.specialist),
        type: 'Hospital',
        date: parseAllbutGender(object.date),
        description: parseAllbutGender(object.description),
        discharge: object.discharge,
        diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : undefined
    };
};


export const toNewOccupationalHealthcareEntry = (object: NewOccupationalHealthcareEntry): NewOccupationalHealthcareEntry => {
    return {
        specialist: parseAllbutGender(object.specialist),
        type: 'OccupationalHealthcare',
        date: parseAllbutGender(object.date),
        description: parseAllbutGender(object.description),
        employerName: parseAllbutGender(object.employerName),
        sickLeave: object.sickLeave ? object.sickLeave : undefined,
        diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : undefined
    };
};


export const toNewHealthCheckEntry = (object: NewHealthCheckEntry): NewHealthCheckEntry => {
    return {
        specialist: parseAllbutGender(object.specialist),
        type: 'HealthCheck',
        date: parseAllbutGender(object.date),
        description: parseAllbutGender(object.description),
        healthCheckRating: parseHealth(object.healthCheckRating),
        diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : undefined
    };
};






/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {



    if (object.entries.length === 0) {

        const newEntry: NewPatient = {
            name: parseAllbutGender(object.name),
            dateOfBirth: parseAllbutGender(object.dateOfBirth),
            ssn: parseAllbutGender(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseAllbutGender(object.occupation),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            entries: []
        };

        return newEntry;



    } else {
        const newEntry: NewPatient = {
            name: parseAllbutGender(object.name),
            dateOfBirth: parseAllbutGender(object.dateOfBirth),
            ssn: parseAllbutGender(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseAllbutGender(object.occupation),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            entries: [newEntries(object.entries)]
        };

        return newEntry;
    }




};

