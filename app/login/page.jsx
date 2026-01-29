"use client"

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient()

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    

    const handleGoogleSignIn = async() =>{
        console.log("Sign in with google", email, password)
        
    }
    
    const handleSignUp= async() =>{
        console.log("Sign up with", email, password)
        const {data, error} = await supabase.auth.signUp({email, password})

        if(error){
            console.log('Error', error.message)
            return
        }
    }

    const handleSignIn = async() =>{
        console.log("Sign in with", email, password)
        const {data, error} = await supabase.auth.signInWithPassword({email, password})

         if(error){
            console.log('Error', error.message)
            return
        }
    }

    return ( 
        <>
            <div className="">
            <form className="flex flex-col gap-4 items-center justify-center h-screen">
                <h1>Auth Form</h1>
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                className="border border-blue-800"
                value={email} 
                onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                className="border border-blue-800"
                value={password} 
                onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <button 
                type='button'
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleSignUp}
                >
                    Sign Up
                </button>
                <button 
                type='button'
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleSignIn}
                >
                    Sign In
                </button>
                <button 
                type='button'
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleGoogleSignIn}
                >
                    Google Sign In
                </button>
            </form>
            </div>
        </>
     );
}
 
export default Login;