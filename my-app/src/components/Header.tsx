import React from 'react';

interface HeaderProps  {
    name: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
    return <h1>{props.name}</h1>;
}
