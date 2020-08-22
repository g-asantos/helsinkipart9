import React from 'react';
import './App.css';
import { Header } from './components/Header'
import { Content } from './components/Content'
import { Total } from './components/Total'

import { courses } from './courses';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
 

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courses.courseParts} />
      <Total count={courses.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />

    </div>
  );
};


export default App;
