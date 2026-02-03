
"use client"

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";


const TodoList = ({todos, setTodos}) => {
    const supabase = createClient()

    

    const handleDelete = async(todoID) => {
        await supabase.from('todos').delete().eq('id', todoID)

        setTodos(todos.filter((todo) => todo.id !== todoID))
    }

    const handleUpdate = async(todoID, status) => {
        await supabase.from('todos').update({is_complete: !status}).eq('id', todoID)

        setTodos(todos.map((todo)=> (
            todo.id === todoID ? {...todo, is_complete: !todo.is_complete} : todo
        )))
    }
    
    return ( 
       todos.map((todo) => (
        
         <div 
            className="m-4"
         key={todo.id}>
            <p className="text-white">{todo.todo_text}</p>
            <p className="text-white">{todo.due_date}</p>
           <input 
            type="checkbox"
            className="border border-blue-800 mr-4"
            checked={todo.is_complete}
            onChange={() => handleUpdate(todo.id, todo.is_complete)}
          />
            <button
            type="button"
            className="border border-red-800 p-2 rounded"
            onClick={() => handleDelete(todo.id)}
            > delete</button>
        </div>
        
       ))
     );
}
 
export default TodoList;