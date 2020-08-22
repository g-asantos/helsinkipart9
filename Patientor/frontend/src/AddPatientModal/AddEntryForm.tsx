import React from 'react';
import { useStateValue } from "../state";
import { Entry, EntryType } from '../types';
import { Formik, Form } from 'formik';
import { DiagnosisSelection } from './FormField';

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export type EntryOption = {
    value: EntryType;
    label: string;
  };
  


const typeOptions: EntryOption[] = [
    { value: EntryType.Hospital , label: "Hospital" },
    { value: EntryType.OccupationalHealthcare , label: "OccupationalHealthcare" },
    { value: EntryType.HealthCheck, label: "HealthCheck" }
];



export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
            initialValues={{
                date: "",
                type: EntryType.Hospital,
                specialist: "",
                diagnosisCodes: "",
                description: ""
            }}
            onSubmit={onSubmit}
            validate={values => {
                /// ...
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui">
                        // ...

                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />

                    // ...
                    </Form>
                );
            }}
        </Formik>
    );
};