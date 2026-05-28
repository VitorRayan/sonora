import './App.css'

import { useEffect, useState } from 'react'

import { Toaster } from 'react-hot-toast'

import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'

export default function App() {

  const [screen, setScreen] = useState('login')

  useEffect(() => {

    const loggedUser =
      localStorage.getItem('loggedUser')

    if (loggedUser) {
      setScreen('dashboard')
    }

  }, [])

  return (
    <div className="App">

      <Toaster position="top-center" />

      {screen === 'login' && (
        <Login setScreen={setScreen} />
      )}

      {screen === 'register' && (
        <Register setScreen={setScreen} />
      )}

      {screen === 'dashboard' && (
        <Dashboard setScreen={setScreen} />
      )}

    </div>
  )
}