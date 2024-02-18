import React, { useState } from 'react';
import src from './icon.png'

function App() {

  const [list ,setList] = useState([])
  const [message, setMessage] = useState({
    text: "",
    id: ""
  })

  const [editingItem,setEditingItem] = useState({
    id: "",
    isEditing: false 
  })
  
  const changeMessage = (e) => {
    setMessage({
      ...message,
      text: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newTodo = {
      text: message.text,
      id: new Date().getTime().toString()
    }
    setList([...list,newTodo])
    setMessage({
      id: "",
      text: ""
    })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    let newTodos = list.map((eachItems) => {
      if(eachItems.id === editingItem.id) {
        return {
          text: message.text,
          id: editingItem.id
        }
      }
      else {
        return eachItems
      }

    })
    setList(newTodos);
    setMessage({
      text: "",
      id: ""
    })
    setEditingItem({
      id: "",
      isEditing: false
    })
  }

  const handleDelete = (id) => {
    let newTodos = list.filter((eachItems) => {
      return eachItems.id !== id
    })
    setList(newTodos)
  };

  const changeEditstate = (id) => {
    setEditingItem({
      ...editingItem,
      id: id,
      isEditing: true
    })

    let editableItem = list.find((eachItems) => eachItems.id === id )
    setMessage({
      ...message,
      text: editableItem.text,
      id: editableItem.id
    })
  }
  return (
    <div className="App">
      <nav>
        <div className='logo-section'>
          <img src="icon.png" alt="logo" />
          <h2>To-Do List</h2>
        </div>
        <form>
          <input type="text" name="message" id="message" placeholder='Enter Your Message' value={message.text} onChange={changeMessage}/>
          {
            editingItem.isEditing ? ( <button type="submit" onClick={handleEdit}>edit</button> ) : (<button type="submit" onClick={handleSubmit}>add</button>)
          }
        </form>
      </nav>
      <hr />
      {
        list.length === 0 && <h3>There is no items in the list</h3>
      }
      <ul>
        {
          list.map((eachItems) => {
            const {text , id} = eachItems
            return <li>
              <span>{text}</span>
              <div>
              <button onClick={() => changeEditstate (id)}>edit</button>
              <button onClick={() => handleDelete(id)}>delete</button>
              </div>
            </li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
