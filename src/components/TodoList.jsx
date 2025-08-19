import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Todo'
import axios from 'axios'

const TodoList = () => {

    const [todoList, setTodoList] = useState([])
    const [textInput, setTextInput] = useState("")

    useEffect(() => {
        async function getAllTodos() {
            try {
                const response = await axios.get(
                    `${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/todo/get-all-todos`)
                setTodoList(response.data.payload)
            } catch (error) {
                console.log(error)
            }
        }
        getAllTodos()
    }, [])

    // async function handleChangeIsDone(id,isDone) {
    // try {
    // const response = await axios.put(`http://localhost:3000/api/todo/update-todo/${id}`)



    //EDITING
    // given an id, make a new list using the old list but only changing the object with the id
    //     const newList = todoList.map(item => {   //loop through array
    //         if (item.id === id) {  //if we arrive at an object with the matching id,
    //             item.isDone = !item.isDone //toggle isDOne
    //         }
    //         return item    //push the item into the new array
    //     })
    //     setTodoList(newList) //set the new list
    // } catch (error) {

    // }



    async function handleEditTodo(id, updateObj) {//if changing isDone {isDone: true/false} {text: "walk dog"}
        try {
            const response = await axios.put(`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/todo/update-todo/${id}`, updateObj)
            console.log(response.data.payload)
            const newList = todoList.map(item => {   //loop through array
                if (item._id === id) {  //if we arrive at an object with the matching id,
                    item = response.data.payload
                }
                return item//push the item into the new array
            })
            setTodoList(newList)// set new list
        } catch (error) {
            console.log(error)
        }


    }

    async function handleDelete(id, deleteObj) {
        try {
            await axios.delete(`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/todo/delete-todo/${id}`, deleteObj)//communicates with db
            const newList = todoList.filter(item => item._id !== id)//telling db to get rid of it
            setTodoList(newList)
        } catch (error) {
            console.log(error)
        }

    }

    // const newList = todoList.map(item => {
    //  if(item.id === id){
    //     return //if === doesnt return anything
    //  }else{
    //     return item // in new list
    //  }
    // })
    // setTodoList(newList)
    // }

    async function addTodo(event) {

        try {
            event.preventDefault()
            if (textInput === '') {
                return
            }
            const response = await axios.post(`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/todo/create-todo, { text: textInput }`)
            //add todo from the textInput

            setTodoList([...todoList, response.data.payload])// the new .push(), called 
            //spread operator
            setTextInput('')
        } catch (error) {
    console.log(error)
        }
    }

    return (
        <div>
            <div className='form-div'>
                <form onSubmit={e => addTodo(e)}>
                    <input
                        type="text"
                        name="todoInput"
                        value={textInput}
                        onChange={e => setTextInput(e.target.value)}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div className='todo-div'>
                <ul>
                    {
                        todoList.map((todo) => {
                            return <Todo
                                key={todo._id}
                                todo={todo}
                                // handleChangeIsDone={handleChangeIsDone}
                                handleEditTodo={handleEditTodo}
                                handleDelete={handleDelete} />
                        })
                    }
                </ul>
            </div>
        </div>
        //textbox
        //button/submit
        //List =>
        //checkbox for done or line through
    )
}

export default TodoList