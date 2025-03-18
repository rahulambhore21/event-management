import './App.css'
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home'
import Event from './pages/Event/Event'; // Import the Event component
import { BrowserRouter, Routes, Route } from "react-router";
import AddEvent from './pages/AddEvent/AddEvent';
import Profile from './pages/Profile/Profile';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/event/:id" element={<Event />} /> {/* Add this line */}
        <Route path="/addevent" element={<AddEvent/>} />
        <Route path="profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
