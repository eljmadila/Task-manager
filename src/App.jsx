import React, { useState, useEffect } from 'react'
import { supabase } from "./supabase-client"
import Form from "./components/Form"
import Taskmanager from './pages/Taskmanager'
import { Routes, Route } from 'react-router-dom'
import "../src/App.css"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error checking session:", error.message)
      }
      setUser(session?.user ?? null)
      setLoading(false)
    }
    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <Routes>
        <Route path='/' element={user ? <Taskmanager /> : <Form />} />
        <Route path='/taskmanager' element={user ? <Taskmanager /> : <Form />} />
        <Route path='/auth' element={user ? <Taskmanager /> : <Form />} />
      </Routes>
    </div>
  )
}

export default App