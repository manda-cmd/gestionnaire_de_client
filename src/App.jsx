import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Ajouter from './pages/Ajouter'
import NotFound from './pages/NotFound'
import ListesClients from './pages/ListesClients'

const App = () => {
  return (
   <>
 <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListesClients />} />
        <Route path="/listes-clients" element={<ListesClients />} />
        <Route path='/listes-clients/:id' element={<ListesClients />} />
        <Route path="/Ajouter" element={<Ajouter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

   </>
  )
}

export default App