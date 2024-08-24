import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameList from './pages/GameList';
import GameDetails from './pages/GameDetails';
import LogIn from './pages/LogIn';
import UserLibrary from './pages/UserLibrary';
import Profile from './pages/Profile';
import Register from './pages/Register'
//import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from './utils/AdminRoute';


function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allgames" element={<GameList />} />
            <Route path="/detail" element={<GameDetails />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/mylibrary" element={<UserLibrary />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/mylibrary" element={<UserLibrary />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          {/*  <Footer /> */}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;