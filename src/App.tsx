import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Quiz from './pages/quiz/page';
import Home from './pages/home/page';
import SignIn from './pages/sign-in/page';
import SignUp from './pages/sign-up/page';
import ProtectedRoute from './utils/protectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Page */}
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          } />
        <Route path="/quiz" element={
          <ProtectedRoute>
            <Quiz/>
          </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
