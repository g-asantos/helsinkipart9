import React from 'react';

interface Total{
    count: number;
}



export const Total: React.FC<Total> = (props) => {
return <h1>Number of exercises {props.count}</h1>;
}