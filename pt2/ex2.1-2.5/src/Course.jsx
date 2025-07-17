const Part = ({name, ex}) => {
return (
  <div >{name} {ex}</div>
)
}


const Header = ({course}) => {
 return (
  <h2>{course.name}</h2>
 )
}


export const Course = ({course}) => {
  return (
    <div>
   
      <Header course={course}/>
      {course.parts.map(part => <Part key={part.id} name={part.name} ex={part.exercises}/>)}
      <div><strong>Total of {course.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</strong></div>
    </div>
  )
}

// export default Course
