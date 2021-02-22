
import './App.css';
import {useState} from 'react'

function ListItems( props ) {
  const list = props.items.map( (item) => {
    return ( 
        <li id={item.id} data-status={item.status} >
          {item.name}
          <ListItemButtons status={item.status} />
        </li>
      )
  })
  return (
    <ul>
      {list}
    </ul>
  )
}

function ListItemButtons( props ) {
  if(props.status === true) {
    return ( <button>&times;</button>)
  }
  else {
    return ( <button>done</button>)
  }
}

function App() {
  const[items,setItems] = useState(new Array())
  
  const SubmitHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const taskId= new Date().getTime()
    const taskName = data.get('task')
    const task = {name: taskName, id: taskId, status: false }
    setItems(items.concat(task))
    event.target.reset()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo</h1>
        <form id="todo-form" onSubmit={SubmitHandler} >
          <input type="text" name="task" placeholder="add item" />
          <button type="submit">Add</button>
        </form>
      </header>
      <ListItems items = {items} />
    </div>
  );
}

export default App;
