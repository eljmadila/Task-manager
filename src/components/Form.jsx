import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase-client'
import "../App.css"

function Form() {
    const [ show , setShow] = useState(false)
    const [ isLogged , setIsLogged] = useState(false)
    const [ isSubmitting , setIsSubmitting] = useState(false) 
    const [ username , setUsername] = useState("")
    const [ email , setEmail] = useState("")
    const [ password , setPassword] = useState("")
    const navigate = useNavigate()

    const resetAll = () => {
        setUsername('')
        setEmail('')
        setPassword('')
    }

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            console.error("Error logging in:", error.message)
            alert(error.message)
            return false
        }
        return true
    }

    const handleRegister = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username } }
        })
        if (error) {
            console.error("Error signing up:", error.message)
            alert(error.message)
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const success = isLogged ? await handleLogin() : await handleRegister()

        setIsSubmitting(false)

        if (success) {
            resetAll()
            navigate('/taskmanager')
        }
    }

    useEffect(()=>{
        resetAll()
    },[isLogged])

    return (
        <div className='task-form-container'>
            <h1 style={{ color: '#fff' }}>{isLogged ? "Login" : "Create"}</h1>
            <form onSubmit={handleSubmit}>
                {isLogged ? null : (
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter username...'
                            required
                        />
                    </div>
                )}

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter email...'
                        required
                    />
                </div>

                <div>
                    <label>Password</label>

                    <div className='pass-div'>
                        <input
                            type={show ? 'text' : 'password'}
                            value={password}
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter password...'
                            required
                        />
                        <p
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                            onClick={() => setShow(!show)}
                        >
                            {show ? (<i className="fa-solid fa-eye-slash"></i>) : (<i className="fa-solid fa-eye"></i>)}
                        </p>
                    </div>
                </div>

                <button className='subBtn' type='submit'>
                    {isSubmitting ? "Please wait..." : isLogged ? 'Login' : 'Create'}
                </button>
            </form>
            <div>
                <p>{isLogged ? "You don't have an account ? " : "You already have an account ?"}
                    <span
                        style={{ color: 'blue', transition: 'all 0.3s ease', cursor: 'pointer' }}
                        onClick={() => setIsLogged(!isLogged)}
                    > {isLogged ? "Create" : "Login"}</span>
                </p>
            </div>
        </div>
    )
}

export default Form