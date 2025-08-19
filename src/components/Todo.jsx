import React, { useState } from 'react'
import Button from './common/Button'
// import ProtoTypes

const Todo = ({ todo, handleEditTodo, handleDelete }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editInput, setEditInput] = useState(todo.text)
    return (
        <div className='todolist-div'>
            {!isEditing ? (<li
                className={`li-style ${todo.isDone ? "li-style-isDone" : ""}`}
                onClick={() => handleEditTodo(todo._id, {isDone: !todo.isDone })}>
                {todo.text}
            </li>) : (
                <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)} />


            )}
            {!isEditing ? //turn-ary
                (<Button
                    cssid={'edit-button'}
                    clickFunc={() => {
                        setIsEditing(true)

                    }}
                    buttonName={'Edit'}
                />) : (
                    <Button
                        cssid={'done-button'}
                        clickFunc={() => {
                            handleEditTodo(todo._id, { text: editInput })
                            setIsEditing(false)
                        }}
                        buttonName={"Update"} />

                )}
            <Button
                cssid={'delete-button'}
                clickFunc={() => {
                    console.log('deleting')
                    handleDelete(todo._id, editInput)
                }}
                buttonName={'Delete'}
            />

        </div>
    )
}

export default Todo