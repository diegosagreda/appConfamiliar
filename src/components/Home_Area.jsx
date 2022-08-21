import React,{useContext} from 'react'
import '../styles/Home_Area.css';
import useModal from '../hooks/useModal';
import ModalVerEmpleados from '../modals/ModalVerEmpleados';
import ModalVerObservaciones from '../modals/ModalVerObservaciones';
import ModalNuevoEmpleado from '../modals/ModalNuevoEmpleado';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../context/AppContext';
import {PeticionesApi} from '../helpers/PeticionesApi';

import {faDatabase,faMessage,faArrowRightFromBracket,faPersonCirclePlus} from '@fortawesome/free-solid-svg-icons';


const Home_Area = () => {
  const[modal, abrirModal, cerrarModal]=useModal(false)
  const[modal1, abrirModal1, cerrarModal1]=useModal(false)
  const[modal2, abrirModal2, cerrarModal2]=useModal(false)

  const {setLogueado,usuario,areas} = useContext(AppContext);
  const {cargarEmpleados,cargarObservaciones} = PeticionesApi();
  const handleCerrarSesion =(e)=>{
    e.preventDefault();
    setLogueado(false);
  }
  const getArea = (id) =>{
    let are = areas.filter(area => area.idarea === id);
    if(are.length > 0){
        return are[0].nombre;
    }
    return "";
  }

  return (
    <div className='HomeArea'>
      {modal? <ModalVerEmpleados cerrarModal={cerrarModal}/>:null}
      {modal1? <ModalVerObservaciones cerrarModal={cerrarModal1}/>:null}
      {modal2? <ModalNuevoEmpleado cerrarModal={cerrarModal2}/>:null}
      
      <h2>Gerente Area: {getArea(usuario[0].idarea)}</h2>
      <div className="opciones">
        <div className="button-container">
            <div className="button" onClick={() => {abrirModal(); cargarEmpleados()}}>
                <FontAwesomeIcon className="icon" icon={faDatabase} />
            </div>
            Bases de datos empleados
        </div>
        <div className="button-container">
          <div className="button" onClick={() =>abrirModal2()}>
              <FontAwesomeIcon className="icon" icon={faPersonCirclePlus} />
          </div>
          Nuevo Empleado
        </div>
        <div className="button-container">
            <div className="button" onClick={() =>{abrirModal1();cargarObservaciones()}}>
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

export default Home_Area