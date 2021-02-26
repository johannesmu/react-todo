
import './App.css';
import { useState } from 'react'

function List(props) {
  const list = props.items.map((item) => {
    return (
      <ListItem name={item.name} status={item.status} id={item.id} done={props.done} delete={props.delete} />
    )
  })

  return (
    <ul id="list">
      {list}
    </ul>
  )
}

function ListItem(props) {
  return (
    <li>
      <ListItemButtons status={props.status} done={props.done} delete={props.delete} />
      <span className="content">{props.name}</span>
    </li>
  )
}

function ListItemButtons(props) {
  const [itemStatus, setItemStatus] = useState(props.status)
  const itemDone = (evt) => {
    setItemStatus(true)
    props.done(evt)
  }
  if (itemStatus === true) {
    return (<button className={['button','delete'].join(' ')} value={props.id} onClick={props.delete}>&times;</button>)
  }
  else {
    return (<button className={['button','done'].join(' ')} value={props.id} onClick={props.done} >&#x2713;</button>)
  }
}

function App() {
  const [items, setItems] = useState(new Array())

  const SubmitHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const taskName = data.get('task')
    if( taskName.length == 0 ) {
      return
    }
    const taskId = new Date().getTime()
    const task = { name: taskName, id: taskId, status: false }
    setItems(items.concat(task))
    event.target.reset()
  }

  const DeleteItem = (event) => {
    const itemId = event.target.value
    console.log(itemId)
    items.forEach((item) => {
      if (item.id == itemId) {

      }
    })
  }

  const ChangeItemStatus = (event) => {
    const itemId = event.target.value
    items.forEach((item) => {
      if (item.id == itemId) {
        item.status = item.status ? false : true
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <form id="todo-form" onSubmit={SubmitHandler} >
          <input type="text" name="task" placeholder="add item" />
          <button type="submit">Add</button>
        </form>
        <h1>Todo</h1>
      </header>
      <List items={items} delete={DeleteItem} done={ChangeItemStatus} />
      <footer className="App-footer">To do list</footer>
    </div>
  );
}

export default App;
