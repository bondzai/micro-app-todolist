import './App.css';
import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid'
import List from "./components/List"
import Alert from './components/Alert';

function App() {
  const [name, setName] = useState("")
  const [list,setList] = useState([])
  const [alert,setAlert] = useState({show : false, text : "", type : ""})
  const [checkEditItem, setCheckEditItem] = useState(false)
  const [editID, setEditID] = useState(null)

  const submitData = (e) => {
    e.preventDefault()
    if (!name) {
      setAlert({show:true, text : "Require", type : "error"})
    } else if ((checkEditItem === true) && (name !== "")) {
      const newiTems = list.map((item) => {
        if (item.id === editID) {
          return {...item, title : name}
        }
        return item
      })
      setList(newiTems)
      setName("")
      setCheckEditItem(false)
      setEditID(null)
      setAlert({show : true, text : "Update successfull", type : "success"})
    } else {
      const newTask = {
        id : uuidv4(),
        title : name
      }
      setList([...list,newTask])
      setName("")
      setAlert({show:true, text : "Insert successful", type : "success"})
    }
  }

  const removeItem = (id) => {
    const newItems = list.filter((item) => {
      return item.id !== id
    })
    setList(newItems)
    setAlert({show : true, text : "delete successful", type : "error"})
  }

  const editItem = (id) => {
    setCheckEditItem(true)
    setEditID(id)
    const target = list.find((item) => {
      return item.id === id
    })
    setName(target.title)
  }

  return (
    <section className = "container">
      <h1> TO DO LIST </h1>
      {alert.show && <Alert {...alert} setAlert = {setAlert} list = {list}/>}
      <form className = "form-group" onSubmit = {submitData}>
        <div className = "form-control">
          <input type = "text" 
            className = "input-text" 
            onChange = {(e) => setName(e.target.value)}
            value = {name}
          />
          <button type = "submit" className = "input-button">
             {checkEditItem ? "Update" : "Insert"}
          </button>
        </div>
      </form>
      <section className = "list-container">
        {list.map((data, index) => {
          return <List key = {index} {...data} removeItem = {removeItem} editItem = {editItem}/>
        })}
      </section>
    </section>
  );
}

export default App;