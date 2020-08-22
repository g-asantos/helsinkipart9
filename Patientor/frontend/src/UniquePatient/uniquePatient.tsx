import React from 'react';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, Entry } from "../types";
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';




export const UniquePatient: React.FC = (): JSX.Element => {
    const [{ patients, diagnosis }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const getPatient = async (id: string) => {
            const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            if (!Object.values(patients).includes(patient)) {
                dispatch({ type: "ADD_PATIENT", payload: patient });
            }
        };
        getPatient(id);
    }, [dispatch, id, patients]);




    const patient = Object.values(patients).find(p => p.id === id);








    if (patient) {
        console.log(patient);
        const specificDiagnosis: Array<Diagnosis> = Object.values(diagnosis).filter(d => {

            if (patient.entries.length !== 0) {
                if (patient.entries[0].diagnosisCodes[0] !== null) {
                    for (let i = 0; i < patient.entries[0].diagnosisCodes[0].length; i++) {
                        if (d.code === patient.entries[0].diagnosisCodes[0][i]) {
                            return d;
                        }
                    }
                }
            }

            return '';
        });

        const entriesArray: Array<Entry> = patient.entries;




        switch (patient.gender) {
            case 'male':
                return (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '0.18fr 0.18fr' }}>
                            <h1>{patient.name}</h1>
                            <Icon name='mars' size='huge' />
                        </div>
                        <h5>ssn: {patient.ssn}</h5>
                        <h5>occupation: {patient.occupation}</h5>
                        <h5>birth date: {patient.dateOfBirth}</h5>
                        {patient.entries.length !== 0 ?
                            <div>
                                <h1>entries</h1>
                                {entriesArray.map((entry: Entry): JSX.Element => {
                                    return <EntryDetails key={entry.id + Math.random()} entry={entry} />;
                                })}
                                <ul>
                                    {specificDiagnosis[0] === undefined || specificDiagnosis === undefined ?
                                        '' : specificDiagnosis.map((diagnosis): JSX.Element => {

                                            return <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>;
                                        })






                                    }


                                </ul>
                            </div>

                            : ''

                        }

                    </div>
                );
            case 'female':
                return (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '0.18fr 0.18fr' }}>
                            <h1>{patient.name}</h1>
                            <Icon name='venus' size='huge' />

                        </div>
                        <h5>ssn: {patient.ssn}</h5>
                        <h5>occupation: {patient.occupation}</h5>
                        <h5>birth date: {patient.dateOfBirth}</h5>
                        {patient.entries.length !== 0 ?
                            <div>
                                <h1>entries</h1>
                                {entriesArray.map((entry: Entry): JSX.Element => {
                                    return <EntryDetails key={entry.id + Math.random()} entry={entry} />;
                                })}
                                <ul>
                                    {specificDiagnosis[0] === undefined || specificDiagnosis === undefined ?
                                        '' : specificDiagnosis.map((diagnosis): JSX.Element => {

                                            return <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>;
                                        })






                                    }


                                </ul>
                            </div>

                            : ''

                        }

                    </div>
                );
            case 'other':
                return (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '0.18fr 0.18fr' }}><h1>{patient.name}</h1>
                            <Icon name='neuter' size='huge' /></div>
                        <h5>ssn: {patient.ssn}</h5>
                        <h5>occupation: {patient.occupation}</h5>
                        <h5>birth date: {patient.dateOfBirth}</h5>
                        {patient.entries.length !== 0 ?
                            <div>
                                <h1>entries</h1>
                                {entriesArray.map((entry: Entry): JSX.Element => {
                                    return <EntryDetails key={entry.id + Math.random()} entry={entry} />;
                                })}
                                <ul>
                                    {specificDiagnosis[0] === undefined || specificDiagnosis === undefined ?
                                        '' : specificDiagnosis.map((diagnosis): JSX.Element => {

                                            return <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>;
                                        })






                                    }


                                </ul>
                            </div>

                            : ''

                        }
                    </div>
                );
            default:
                break;
        }
    } else {
        return (<div>loading</div>);
    }

    return <div>loading</div>;


};