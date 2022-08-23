import React,{useState,useContext} from 'react'
import '../styles/ModalRetroalimentacion.css';
import {AppContext} from '../context/AppContext';
import {PeticionesApi} from '../helpers/PeticionesApi';
import {BallTriangle} from 'react-loader-spinner' 

const ModalRetroalimentacion = ({cerrarModal}) => {

  const {area,observacion,setObservacion,usuario,setArea} = useContext(AppContext);
  const [loader, setloader] = useState(false);
  const {registrarObservacion,actualizarObservacion,cargarObservaciones} = PeticionesApi();
  const [dataRetroalimentacion, setdataRetroalimentacion] = useState({
    cedula:observacion.cedula ? observacion.cedula : area.cedula,
    nota:observacion.nota ? observacion.nota : '',
    idarea:observacion.idarea ? observacion.idarea : area.idarea
  })

  const handleCerrarModal=(e)=>{
    e.preventDefault();
    setObservacion({});
    cerrarModal();       
  }
  const handleChange = (e)=>{
    setdataRetroalimentacion({
        ...dataRetroalimentacion,
        [e.target.name]:e.target.value
    });
}
const handleGuardar = async(e)=>{
  setloader(true);
    e.preventDefault();
    if(dataRetroalimentacion.nota){
      if(observacion.cedula){
        await actualizarObservacion(observacion.idobservacion,dataRetroalimentacion);
        alert('Retroalimentación Actualizada')
        setObservacion({});
        setArea({});
        cerrarModal();
      }else{
        await registrarObservacion(dataRetroalimentacion);
        setObservacion({});
        setArea({});
        cerrarModal();
      }
      
    }else{
      alert('Campos Vacio')
    }
    await cargarObservaciones();
    setloader(false);
}
  return (
    <div className="inf-estudiante">                 
    <div className="contenedor-inf-estudiante">
    <section className=" encabezado-modal">
        <div className="encab-modal">
                <h3>
                  {observacion.cedula ? 'Editar Retroalimentación' : 'Retroalimentación empleado '}
                </h3>
            </div>
            <p className="salir-modal" onClick={handleCerrarModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                    viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
            </p>  
            </section>
            <main className="reg-estudiante">
                <div className="estudiante-informacion">
                    <textarea
                        rows={10} 
                        name="nota" 
                        type="text" 
                        onChange={handleChange}
                        placeholder="Escriba aqui"
                        defaultValue={dataRetroalimentacion.nota}
                      
                        /* defaultValue={estudiante.idestudiante? estudiante.idestudiante : ''} */
                        /* disabled={estudiante.idestudiante? true : false} *//>

                </div>

             
                
                <div className="btn-inf-estudiante">
                    
                      <button  onClick={handleGuardar}>
                        {loader? <BallTriangle color='#fff' height={20} width={20}/>:'Guardar'}
                      </button>
                      <button  onClick={handleCerrarModal}>Cancelar</button>
                </div>
                
                 
            
            </main>                

    </div>
    </div>
  
  )
}

export default ModalRetroalimentacion;