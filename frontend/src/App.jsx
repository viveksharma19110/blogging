import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Createblog from './pages/Createblog'
import Nopage from './pages/Nopage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='blog' element={<Blog />} />
            <Route path='create' element={<Createblog/>} />
            <Route path='*' element={<Nopage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App