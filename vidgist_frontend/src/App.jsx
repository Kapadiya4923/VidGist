import { Link, Route, Routes } from 'react-router'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import { createContext, useState } from 'react'
// import './App.css'

export const LinkContext = createContext(null);

function App() {

  const [link,setLink] = useState("");

  return (
    <LinkContext.Provider value={{link,setLink}}>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </LinkContext.Provider>
  )
}

export default App
