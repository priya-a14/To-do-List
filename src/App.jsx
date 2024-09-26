import { useState ,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
function App() {
  const [todo, setTodo] = useState("") //input text
  const [todos, setTodos] = useState([]) //holds all the todos as an array
 const [showFinished, setshowFinished] = useState(true)
  //useEffect which will load the todos on the screen
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){ //if the todo list is not null then we will display otherwise not
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const saveToLS=(params)=>{ //to store the todos permanently
   localStorage.setItem("todos",JSON.stringify(todos))

  }

  const toggleFinished=(e)=>{
    setshowFinished(!showFinished)
  }

   const handleEdit=(e,id)=>{
      let t= todos.filter(i=>i.id===id)
      setTodo(t[0].todo)
      let newTodos=todos.filter(item=>{
        return item.id!==id
     })
     setTodos(newTodos)
     saveToLS()
   }
   const handleDelete=(e,id)=>{
         let newTodos=todos.filter(item=>{
        return item.id!==id
     })
    // newTodos[index].isCompleted=! newTodos[index].isCompleted
     setTodos(newTodos)
     saveToLS()
   }

   const handleAdd =()=>{
       setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}]) //todo is an object here and isCompleted = false because its not completed
       setTodo("")
       saveToLS()
   }

   const handleChange=(e)=>{
       setTodo(e.target.value)
   }

   const handleCheckbox=(e) => { 
     let id= e.target.name
     let index=todos.findIndex(item=>{// finds the index of todo
      return item.id==id;
     })
     let newTodos=[...todos];
     newTodos[index].isCompleted=! newTodos[index].isCompleted
     setTodos(newTodos)
     saveToLS()
    }
  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] 
      md:w-[45%]">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-blue-800 hover:bg-blue-950  disabled:bg-blue-700 p-3 py-1 text-sm text-white  rounded-full font-bold mx-2'>Save</button>
          </div> 
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox"  checked={showFinished}/> Show Finished
      <h2 className='text-lg font-bold'>Your Todos</h2>
      <div className="todos">
        {todos.length===0 && < div className="m-5">No Todos to display</div>}
        {todos.map(item=>{
        
        return(showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
        <div className='flex gap-5'>            
              <input name ={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  />
              <div className={item.isCompleted ?"line-through":""}>{item.todo}</div>
        </div>
           <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-blue-800 hover:bg-blue-950 p-3 py-1 text-sm text-white  rounded-md mx-1 font-bold'><FaEdit/></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-blue-800 hover:bg-blue-950 p-3 py-1 text-sm text-white  rounded-md mx-1 font-bold'><AiFillDelete/></button>
           </div>
        </div>
         })}
      </div>
      </div>
    </>
  )
}

export default App
