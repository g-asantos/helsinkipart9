import React from 'react';
import { CoursePart } from '../types'


const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};


export const Part: React.FC<CoursePart> = (props) => {

    switch (props.name) {
        case "Fundamentals":
            return <p>Name: {props.name} Exercises: {props.exerciseCount} Description: {props.description}</p>
        case "Using props to pass data":
            return <p>Name: {props.name} Exercises: {props.exerciseCount} Group Projects: {props.groupProjectCount}</p>
        case "Deeper type usage":
            return <p>Name: {props.name} Exercises: {props.exerciseCount} Description: {props.description} Exercise Submission
            Link: {props.exerciseSubmissionLink}</p>
        case 'My own interface':
            return <p>Name: {props.name} Exercises: {props.exerciseCount} Author: {props.author}</p>
        default:
            return assertNever(props);
    }

}