import React, {useContext, useRef, useState} from 'react';
import Logo from "../images/logo.png";
import {useNavigate} from 'react-router-dom';
import {PeticionesApi} from '../helpers/PeticionesApi';
import { AppContext } from '../context/AppContext';
import {BallTriangle} from 'react-loader-spinner' 


export default function Login() {

  const [loader, setloader] = useState(false);
  const usuarioo = useRef(null);
  const contraseña = useRef(null);
  const navigate = useNavigate();
  const {iniciarSesion,cargarEmpleadoOnline} = PeticionesApi();

  const {setLogueado,setEmpleado} = useContext(AppContext);


  const ingresar = async(e) =>{
    e.preventDefault();
    setloader(true);
    const empleado = await iniciarSesion(usuarioo.current.value,contraseña.current.value);
    if(empleado.rol){
      setEmpleado(empleado)
      await cargarEmpleadoOnline(empleado.cedula)
      setLogueado(true);
      if(empleado.rol === "administrador"){
        navigate('/homeAdmin') 
      }else if(empleado.rol === "gerente"){
        navigate('/homeArea')
      }else if(empleado.rol === "empleado"){
        navigate('/homeEmple')
      }
    }else{
      setLogueado(false);
      alert('Credenciales incorrectas')
    } 
    setloader(false)
  }
  
  
  return (
    <div>

    <form className='formulario_login'>

        <h1>Iniciar Sesión</h1>
        <label>Usuario</label>
        <input className='input-datos' type="text" ref={usuarioo}></input>

        <label>Contraseña</label>
        <input className='input-datos' type="password" ref={contraseña}></input>

        <div className='opc-formulario'>
            <button  type='submit' onClick={ingresar}>
              {loader? <BallTriangle color='#fff' height={30} width={30}/>:'Ingresar'}
            </button>
        

        </div>
        
      </form>
      
    </div>
  )
}