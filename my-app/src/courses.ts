  
import { Courses } from './types';

export const courses: Courses = {
  courseName: "Half Stack application development",
  courseParts: [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "My own interface",
      exerciseCount: 12,
      description: "Testing of an interface",
      author: "Petrimus Hetrimus"
    }
  ]
}