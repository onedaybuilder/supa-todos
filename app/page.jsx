"use client"
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";


export default function Home() {
  const router = useRouter()
  const supabase = createClient()
  const handleSignOut = async(e) => {
      console.log('Sign me out')
      const {data, error} = await supabase.auth.signOut()

      if(error){
        console.log(error.message)
      }

      router.push('/login')
    }

  
  const [todoText, setTodoText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [dueDate, setDuedate] = useState('')
 


  const handleTodoSubmit = async(e) => {
    //e.preventDefault()
    console.log("Adding todo: ", todoText, dueDate, isComplete)
    const {data: userData, error: userError} = await supabase.auth.getUser()

    const {data, error} = await supabase.from('todos')
                          .insert(
                            {
                              user_id: userData.user.id,
                              todo_text: todoText, 
                              is_complete: isComplete,
                              due_date: dueDate
                            }
                          ).select()

    if(error){
      console.error(error.message)
      return
    }

    setTodos([...todos, data[0]])

  }

    const [todos, setTodos] = useState([])                                 
  useEffect(() => {                                                      
      async function fetchData(){                                        
          const {data, error} = await supabase.from('todos').select()    
          if(error){                                                     
              console.error(error.message)                               
          }                                                              
          setTodos(data)                                                 
      }                                                                  
      fetchData()                                                        
  }, [])   


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       
        
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
       
          <button 
          type="button"
          onClick={handleSignOut}
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
          >Sign out</button>
        </div>


          <TodoList todos={todos} setTodos={setTodos}/>

      
        <form
          className="flex flex-col gap-4"
        >
          <label htmlFor="t-text">Todo</label>
          <input 
            type="text"
            id="t-text"
            value={todoText}
            className="border border-blue-800"
            onChange={(e) => setTodoText(e.target.value)}
          />

          <label htmlFor="d-date">Due Date</label>
           <input 
            type="date"
            id="d-date"
            value={dueDate}
            className="border border-blue-800"
            onChange={(e) => setDuedate(e.target.value)}
          />

           

          <button
            onClick={handleTodoSubmit}
            type="button"
            className="p-2 bg-blue-500 text-white rounded"
          >Submit</button>
        </form>


      </main>
    </div>
  );
}
