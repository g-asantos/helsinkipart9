import patientData from '../data/patients';
import { Patient, NewPatient, NewEntry } from '../types';
import { toNewPatient } from '../utils';


const patients: Patient[] = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});


const getEntries = (): Patient[] => {
  return patients;
};

const getEntriesWithoutSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const ids = patients.map(d => d.id);
  const newPatient = {
    id: String(ids.length + 1),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);

  if (patient === undefined) {
    throw new Error(`The patient with id ${id} was not found`);
  }
  return patient;
};

const newEntry = (entry: NewEntry, patientId: string): Patient => {
  

  const patient: Patient = getPatient(patientId);

  const newEntry = [{
    id: String(Math.random() * 500),
    ...entry
  }];
  
  
  const updatedPatient = {
    ...patient,
    entries: patient?.entries.concat(newEntry)
  };

  
  const index = patientData.indexOf(patient);
  patientData[index] = updatedPatient;
  
  return updatedPatient;

};


export default {
  getEntries,
  getEntriesWithoutSsn,
  addPatient,
  getPatient,
  newEntry
};