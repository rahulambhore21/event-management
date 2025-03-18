import './App.css'
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home'
import Event from './pages/Event/Event';
import { BrowserRouter, Routes, Route } from "react-router";
import AddEvent from './pages/AddEvent/AddEvent';
import Profile from './pages/Profile/Profile';
import ApiProvider from './Context/Context';

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/addevent" element={<AddEvent/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  )
}

export default App
