import React,{useContext} from 'react';
import "./styles/Login.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppContext} from "./context/AppContext";

import Home_Login from './components/Home_Login.jsx'
import Home_Admin from './components/HomeAdmin';
import Home_Area from './components/Home_Area.jsx';


function App() {

  const {logueado,empleado}=useContext(AppContext);

  return (
    <div className="App">
        {
          logueado?
          (
            empleado.rol === 'administrador'?
              <BrowserRouter>
                <Routes>
                    <Route exact path='/homeAdmin' element={<Home_Admin/>}/>
                </Routes>
              </BrowserRouter>
              :
              <BrowserRouter>
                <Routes>
                    <Route exact path='/homeArea' element={<Home_Area/>}/>
                </Routes>
              </BrowserRouter>
           )
              :
              <BrowserRouter>
                <Routes>
                  <Route exact path='/' element={<Home_Login/>}/>
                  <Route path='*' element={<Home_Login/>}/>
                </Routes>
              </BrowserRouter>
        }
      </div>
  )
}
export default App;
