import React,{useContext} from 'react'
import '../styles/TablaEmpleados.css'
import {AppContext} from '../context/AppContext';
import useModal from '../hooks/useModal';
import ModalRetroalimentacion from '../modals/ModalRetroalimentacion';
import {PeticionesApi} from '../helpers/PeticionesApi';


const TablaObservaciones = () => {

  const {observaciones,setObservacion,usuario} = useContext(AppContext);
  const {eliminarObservacion} = PeticionesApi();
  const[modal, abrirModal, cerrarModal]=useModal(false);

  const handleEditar = (id) =>{
      const obser = observaciones.find(observacion => observacion.idobservacion === id);
      setObservacion(obser)
      abrirModal();
  }
  const handleEliminar = async(id) =>{
    await eliminarObservacion(id);
  }
  const handleVer = async(id) =>{
    const obser = observaciones.find(observacion => observacion.idobservacion === id);
    setObservacion(obser)
    abrirModal();
  }
    
  return (
    <div className='TablaVerEstudiante'>
    {modal? <ModalRetroalimentacion cerrarModal={cerrarModal}/>:null}
    <div class="tabla-estudiante">
        <div class="tabla-interna">
            <table>
                <thead>
                    <tr>
                      
                        <th>Id</th>
                        <th>Observacion</th>
                        <th width='150'>Accion</th>
                      
                    </tr>
                </thead>
            
                <tbody className='contenido-tabla'>
                    {observaciones.map(o => (
                    <tr>
                        <td>{o.cedula}</td>
                        <td>{o.nota}</td>
                     
                        <td>
                       
                            <button onClick={() => handleEditar(o.idobservacion)}>Editar</button>
                            <button onClick={() => handleEliminar(o.idobservacion)}>Borrar</button>     
                        </td>
                    </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    </div>
</div>
  )
}

export default TablaObservaciones