import React from 'react';
import { Entry } from '../types';
import { Icon } from 'semantic-ui-react';



const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Hospital: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <div style={{ border: '1px solid', borderColor: 'grey', borderRadius: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontWeight: 'bold', marginRight: '8px', fontSize: '18px' }}>{entry.date}</p>
                    <Icon name='hospital symbol' size='huge' /></div>
                <span style={{ fontStyle: 'italic', color: 'grey' }}>{entry.description}</span>
            </div>
        </div>
    );
};


const OccupationalHealthCare: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <div style={{ border: '1px solid', borderColor: 'grey', borderRadius: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', borderColor: 'grey' }}>
                    <p style={{ fontWeight: 'bold', marginRight: '8px' }}>{entry.date}</p>
                    <Icon name='doctor' size='big' /></div>
                <span style={{ fontStyle: 'italic', color: 'grey' }}>{entry.description}</span>
            </div>
        </div>
    );
};


const HealthCheck: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <div style={{ border: '1px solid', borderColor: 'grey', borderRadius: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontWeight: 'bold', marginRight: '8px' }}>{entry.date}</p>
                    <Icon name='heart' size='big' /></div>
                <span style={{ fontStyle: 'italic', color: 'grey' }}>{entry.description}</span>
            </div>
        </div>
    );
};



const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthCare entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        default:
            return assertNever(entry);
    }
};


export default EntryDetails;