import React,{useContext} from 'react';
import "./styles/Login.css";
import "./styles/App.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppContext} from "./context/AppContext";

import Home_Login from './components/Home_Login.jsx'
import Home_Admin from './components/HomeAdmin';
import Home_Area from './components/Home_Area.jsx';
import Home_Emple from './components/Home_Emple';


function App() {

  const {logueado,empleado}=useContext(AppContext);

  return (
    <div className="App">
        {
          logueado?
         
              <BrowserRouter>
                <Routes>
                    {empleado.rol === 'administrador' && 
                    <Route exact path='/homeAdmin' element={<Home_Admin/>}/>
                    }
                    {empleado.rol === 'gerente' && 
                    <Route exact path='/homeArea' element={<Home_Area/>}/>
                    }
                     {empleado.rol === 'empleado' && 
                    <Route exact path='/homeEmple' element={<Home_Emple/>}/>
                    }
                </Routes>
              </BrowserRouter>
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
