import React from 'react';
import {Part} from './Part'
import { CourseParts } from '../types'




export const Content: React.FC<CourseParts> = ({ parts }) => (
    <div>
      {
        parts.map(part => 
        <Part key={part.name} {...part} />)
      }
    </div>
  )