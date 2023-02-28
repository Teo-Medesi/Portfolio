import Home from './pages/Home'
import Dev from './pages/Dev'
import { Route, Routes } from 'react-router-dom'
import "./assets/styles/app.scss"

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dev" element={<Dev />} />
      </Routes>
    </div>
  )
}

export default App
