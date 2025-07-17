import {Course} from './Course'


// const Course = ({course}) => {
//   return (
//     <div>
   
//       <Header course={course}/>
//       {course.parts.map(part => <Part key={part.id} name={part.name} ex={part.exercises}/>)}
//       <div><strong>Total of {course.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</strong></div>
//     </div>
//   )
// }


const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App