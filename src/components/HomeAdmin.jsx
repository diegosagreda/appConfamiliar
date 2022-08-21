import React,{useContext} from 'react'
import '../styles/HomeAdmin.css'
import useModal from '../hooks/useModal';
import ModalNuevoEmpleado from '../modals/ModalNuevoEmpleado';
import ModalVerEmpleados from '../modals/ModalVerEmpleados';
import ModalNuevaArea from '../modals/ModalNuevaArea';
import ModalVerAreas from '../modals/ModalVerAreas';
import ModalVerObservaciones from '../modals/ModalVerObservaciones';
import {AppContext} from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {PeticionesApi} from '../helpers/PeticionesApi';

import {faPersonCirclePlus,faTableCells,faSquare,faUsers,faArrowRightFromBracket,faMessage} from '@fortawesome/free-solid-svg-icons';

const HomeAdmin = () => {

  const {setLogueado,setEmpleados} = useContext(AppContext);
  const {cargarEmpleados,cargarObservaciones} = PeticionesApi();

  const[modal, abrirModal, cerrarModal]=useModal(false)
  const[modal1, abrirModal1, cerrarModal1]=useModal(false)
  const[modal2, abrirModal2, cerrarModal2]=useModal(false)
  const[modal3, abrirModal3, cerrarModal3]=useModal(false)
  const[modal4, abrirModal4, cerrarModal4]=useModal(false)
  
  const handleCerrarSesion =(e)=>{
    e.preventDefault();
    setLogueado(false);
  }
  
  return (
    <div className="HomeAdmin">
       {modal? <ModalNuevoEmpleado cerrarModal={cerrarModal}/>:null}
       {modal1? <ModalVerEmpleados cerrarModal={cerrarModal1}/>:null}
       {modal2? <ModalNuevaArea cerrarModal={cerrarModal2}/>:null}
       {modal3? <ModalVerAreas cerrarModal={cerrarModal3}/>:null}
       {modal4? <ModalVerObservaciones cerrarModal={cerrarModal4}/>:null}
    
        <h2>ADMINISTRACION</h2>
        
      <div className="opciones">
        <div className="button-container">
          <div className="button" onClick={() =>abrirModal2()}>
              <FontAwesomeIcon className="icon" icon={faSquare} />
          </div>
          Registrar Area
        </div>
        <div className="button-container">
          <div className="button" onClick={() =>abrirModal3()}>
              <FontAwesomeIcon className="icon" icon={faTableCells} />
          </div>
          Ver Areas
        </div>
        <div className="button-container">
          <div className="button" onClick={() =>abrirModal()}>
              <FontAwesomeIcon className="icon" icon={faPersonCirclePlus} />
          </div>
          Nuevo Empleado
        </div>
        <div className="button-container">
          <div className="button" onClick={() =>{abrirModal1(); setEmpleados([]); cargarEmpleados()}}>
              <FontAwesomeIcon className="icon" icon={faUsers} />
          </div>
          Empleados
        </div>
        <div className="button-container">
            <div className="button" onClick={() =>{abrirModal4();cargarObservaciones()}}>
                <FontAwesomeIcon className="icon" icon={faMessage} />
            </div>
            Observaciones empleados
        </div>
        <div className="button-container">
          <div className="button" onClick={handleCerrarSesion}>
              <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket} />
          </div>
          Cerrar Sesion
        </div>
      </div>
    </div>
  )
}

export default HomeAdmin