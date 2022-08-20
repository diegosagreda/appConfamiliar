import React,{useContext} from 'react'
import '../styles/TablaEmpleados.css'
import {AppContext} from '../context/AppContext';
import {PeticionesApi} from '../helpers/PeticionesApi';
import useModal from '../hooks/useModal';
import ModalNuevaArea from '../modals/ModalNuevaArea';

const TablaAreas = () => {

  const {areas,setArea} = useContext(AppContext);
  const {eliminarArea} = PeticionesApi();
  const[modal, abrirModal, cerrarModal]=useModal(false);

  const handleEliminarArea = async(id)=>{
    await eliminarArea(id);
 }
 const handleEditarArea = (id)=>{
    let area = areas.find(a=>a.idarea === id);
    setArea(area);
    //abrimos modal
    abrirModal();
 }


  return (
    <div className='TablaVerEstudiante'>
    {modal? <ModalNuevaArea cerrarModal={cerrarModal}/>:null}
    <div class="tabla-estudiante">
        <div class="tabla-interna">
            <table>
                <thead>
                    <tr>
                      
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th width='200'>Accion</th>
                    </tr>
                </thead>
            
                <tbody className='contenido-tabla'>
                    {areas.map(area => (
                    <tr>
                        <td>{area.nombre}</td>
                        <td>{area.descripcion}</td>
                        <td>
                            <button onClick={()=>handleEditarArea(area.idarea)}>Editar</button>
                            <button onClick={()=>handleEliminarArea(area.idarea)}>Borrar</button>     
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

export default TablaAreas