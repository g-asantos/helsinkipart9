import express from 'express';

const router = express.Router();
import {toNewPatient, toNewHospitalEntry, toNewOccupationalHealthcareEntry, toNewHealthCheckEntry, assertNever} from '../utils';
import patientService  from '../services/patientServices';
import {  Entry } from '../types';



router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});




router.get('/', (_req, res) => {
    res.send(patientService.getEntriesWithoutSsn());
});



router.post('/:id/entries', (req, res) => {
  const body = req.body as Entry;
  const patientId: string = req.params.id;
  if (!body.type) {
      res.status(401).json({ error: "Missing type"});
  }
  try {
      switch (body.type) {
          case "Hospital": {
              const entryToAdd = toNewHospitalEntry(body);
              const updatedPatient = patientService.newEntry(entryToAdd, patientId);
              res.json(updatedPatient);
              break;
          }
          case "OccupationalHealthcare": {
              const entryToAdd = toNewOccupationalHealthcareEntry(body);
              const updatedPatient = patientService.newEntry(entryToAdd, patientId);
              res.json(updatedPatient);
              break;
          }
          case "HealthCheck": {
              const entryToAdd = toNewHealthCheckEntry(body);
              const updatedPatient = patientService.newEntry(entryToAdd, patientId);
              res.json(updatedPatient);
              break;
          }
          default:
              assertNever(body);
          }
  } catch (e) {
      if (e instanceof Error) {
          res.status(401).json({ error: e.message});
      } else {
          throw e;
      }
  }
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);

    const newEntry = patientService.addPatient(newPatient);

    res.json(newEntry);
  });

export default router;