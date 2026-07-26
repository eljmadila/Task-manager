import React, { useState, useEffect } from 'react'
import { supabase } from "../supabase-client"
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Taskmanager() {
  const navigate = useNavigate()
  const [newTask, setNewTask] = useState({ title: '', description: '' })
  const [currentTask, setCurrentTask] = useState({ title: '', description: '' })
  const [editingId, setEditingId] = useState(null) 
  const [tasks, setTasks] = useState([])

  const fetchData = async () => {
    const { data, error } = await supabase.from("tasks").select("*").order("id", { ascending: true })

    if (error) {
      console.error("Failed to retrieve data", error.message)
      return
    }

    setTasks(data)
  }

  useEffect(() => {
    fetchData() 
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.from("tasks").insert(newTask)

    if (error) {
      console.error("Failed to insert data", error.message)
      return
    }

    setNewTask({ title: '', description: '' })
    fetchData()
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq("id", id)

    if (error) {
      console.error("Failed to delete data", error.message)
      return
    }

    fetchData()
  }

  const deleteAll = async () => {
    const { error } = await supabase.from('tasks').delete().neq("id", 0)

    if (error) {
      console.error("Failed to delete all data", error.message)
      return
    }

    fetchData()
  }

  const startEditing = (task) => {
    setEditingId(task.id)
    setCurrentTask({ title: task.title, description: task.description })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setCurrentTask({ title: '', description: '' })
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault()

    const { error } = await supabase
      .from('tasks')
      .update({ title: currentTask.title, description: currentTask.description })
      .eq("id", id)

    if (error) {
      console.error("Failed to update data", error.message)
      return
    }

    setEditingId(null) 
    fetchData()
  } 

  const logOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error("Couldn't log out", error.message)
        return false
    }
    navigate("/")
    return true
  } 

  return (
    <div className='container'>
      <div>
        <h2>Welcome</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask.title}
          placeholder='Enter a task...'
          onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
          required
        />
        <textarea
          value={newTask.description}
          placeholder='Enter a description...'
          onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
          required
        ></textarea>
        <button type='submit'>Add Task</button>
      </form>

      <div className='card-container'>
        {tasks.map((task) => (
          <div key={task.id}>
            {editingId === task.id ? (
              <form onSubmit={(e) => handleUpdate(e, task.id)}>
                <input
                  type="text"
                  value={currentTask.title}
                  placeholder='Edit task...'
                  onChange={(e) => setCurrentTask((prev) => ({ ...prev, title: e.target.value }))}
                />
                <textarea
                  value={currentTask.description}
                  placeholder='Edit description...'
                  onChange={(e) => setCurrentTask((prev) => ({ ...prev, description: e.target.value }))}
                ></textarea>
                <div className='btns'>
                  <button type='submit'>Save</button>
                  <button type='button' onClick={cancelEditing}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className='card'>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div>
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={deleteAll} className='deleteBtnAll'>Delete All</button>
      <button onClick={logOut} className='logout'>Log Out</button>
    </div>
  )
}

export default Taskmanager