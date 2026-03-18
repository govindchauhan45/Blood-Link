import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DonorPage from './pages/DonorPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/donors' element={<DonorPage/>} />
        <Route path='/register' element={<DonorPage/>} />
        <Route path='/team' element={<TeamPage/>} />
        <Route path='/contact' element={<ContactPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App