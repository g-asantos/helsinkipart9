import diagData from '../data/diagnoses.json';
import { Diagnose} from '../types';


const diagnoses: Diagnose[] = diagData;


const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getEntries
};