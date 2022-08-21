import React,{useContext} from 'react'
import '../styles/Home_Area.css';
import useModal from '../hooks/useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDatabase,faMessage,faArrowRightFromBracket,faPersonCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';
import {PeticionesApi} from '../helpers/PeticionesApi';
import ModalInformacionEmpleado from '../modals/ModalInformacionEmpleado'
import ModalVerObservaciones from '../modals/ModalVerObservaciones';
import ModalVerObserEmple from '../modals/ModalVerObserEmple';

const Home_Emple = () => {
    const {setLogueado,usuario,areas,setArea} = useContext(AppContext);
    const {cargarObservaciones} = PeticionesApi();



    const getArea = (id) =>{
        let are = areas.filter(area => area.idarea === id);
        if(are.length > 0){
            return are[0].nombre;
        }
        return "";
      }
    const handleCerrarSesion =(e)=>{
        e.preventDefault();
        setLogueado(false);
      }

      const[modal, abrirModal, cerrarModal]=useModal(false)
      const[modal1, abrirModal1, cerrarModal1]=useModal(false)
  return (
    <div className='HomeArea'>
        {modal? <ModalInformacionEmpleado cerrarModal={cerrarModal}/>:null}
        {modal1? <ModalVerObserEmple cerrarModal={cerrarModal1}/>:null}
 
      
      <h2>Empleado Area {getArea(usuario[0].idarea)}</h2>
      <div className="opciones">
     
        <div className="button-container">
          <div className="button" onClick={() =>{abrirModal();usuario.length>0 && setArea(usuario[0])}}>
              <FontAwesomeIcon className="icon" icon={faPersonCirclePlus} />
          </div>
          Informacion personal
        </div>
        <div className="button-container">
            <div className="button" onClick={() =>{abrirModal1();cargarObservaciones()}}>
                <FontAwesomeIcon className="icon" icon={faMessage} />
            </div>
            Observaciones
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

export default Home_Emple