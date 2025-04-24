const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>{props.subtitle} {props.ex1 + props.ex2 + props.ex3}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.subtitle} {props.ex}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      <Part subtitle={props.subtitle} ex={props.ex}/>
      <Part subtitle={props.subtitle2} ex={props.ex2}/>
      <Part subtitle={props.subtitle3} ex={props.ex3}/>  
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  const part4 = 'Number of exercises'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  return (
    <div>
      <Header title={course} />
      <Content subtitle={part1} ex={exercises1} subtitle2={part2} ex2={exercises2} subtitle3={part3} ex3={exercises3}/>
      <Total subtitle={part4} ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
    </div>
  )
}


export default App