import React,{useContext} from 'react'
import '../styles/TablaEmpleados.css'
import {AppContext} from '../context/AppContext';
import {PeticionesApi} from '../helpers/PeticionesApi';
import useModal from '../hooks/useModal';
import ModalNuevoEmpleado from '../modals/ModalNuevoEmpleado';
import ModalInformacionEmpleado from '../modals/ModalInformacionEmpleado';
import ModalRetroalimentacion from '../modals/ModalRetroalimentacion';

const TablaEmpleados = () => {
    const {empleados,setArea,areas} = useContext(AppContext);
    const {eliminarEmpleado} = PeticionesApi();
    const[modal, abrirModal, cerrarModal]=useModal(false);
    const[modal1, abrirModal1, cerrarModal1]=useModal(false);
    const[modal2, abrirModal2, cerrarModal2]=useModal(false);

    const handleEliminar = async(id)=>{
       await eliminarEmpleado(id);
    }
    const handleConsultar = (id)=>{
        let empleado = empleados.find(e => e.cedula === id);
        setArea(empleado);
        abrirModal1();
    }
    const handleEditar = (id)=>{
        let empleado = empleados.find(e => e.cedula === id);
        setArea(empleado);
        abrirModal();
    }
    const handleAnotacion = (id)=>{
        let empleado = empleados.find(e => e.cedula === id);
        setArea(empleado);
        abrirModal2();
    }
    const getArea = (id) =>{
        let are = areas.filter(area => area.idarea === id);
        if(are.length > 0){
            return are[0].nombre;
        }
        return "";
      }
    
 
  return (
    <div className='TablaVerEstudiante'>
       {modal? <ModalNuevoEmpleado cerrarModal={cerrarModal}/>:null}
       {modal1? <ModalInformacionEmpleado cerrarModal={cerrarModal1}/>:null}
       {modal2? <ModalRetroalimentacion cerrarModal={cerrarModal2}/>:null}
    <div class="tabla-estudiante">
        <div class="tabla-interna">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombres</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Area</th>
                        <th width='280'>Acción</th>
                    </tr>
                </thead>
            
                <tbody className='contenido-tabla'>
                    {empleados.map(empleado =>(
                    <tr>
                        <td>{empleado.cedula}</td>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.telefono}</td>
                        <td>{empleado.rol}</td>
                        <td>
                            {getArea(empleado.idarea)}
                        </td>
                        <td>
                            <button onClick={() => handleEditar(empleado.cedula)}>Editar</button>
                            <button onClick={() => handleConsultar(empleado.cedula)}>Consultar</button>
                            <button onClick={() => handleEliminar(empleado.cedula)}>Borrar</button>
                            <button onClick={() => handleAnotacion(empleado.cedula)}>Observación</button>
          
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

export default TablaEmpleados