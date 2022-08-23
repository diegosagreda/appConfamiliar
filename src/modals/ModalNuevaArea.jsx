import React,{useState,useContext} from 'react'
import '../styles/ModalNuevaArea.css';
import { PeticionesApi } from '../helpers/PeticionesApi';
import {AppContext} from '../context/AppContext';
import {BallTriangle} from 'react-loader-spinner' 

const ModalNuevaArea = ({cerrarModal}) => {
    const {registrarArea,cargarAreas,actualizarArea} = PeticionesApi();
    const {area,setArea} = useContext(AppContext);
    const [loader, setloader] = useState(false);

    const [dataArea, setdataArea] = useState({
        nombre:area.nombre?area.nombre:"",
        descripcion:area.descripcion?area.descripcion:""
      })
      const handleGuardar = async(e)=>{
        setloader(true);
        e.preventDefault();
        if(dataArea.nombre && dataArea.descripcion){
          if(area.nombre){
            await actualizarArea(area.idarea,dataArea);
            alert('Area Actualizada');
            setArea({});
          }else{
            await registrarArea(dataArea);
          }

        }else{
          alert('Campos Vacios')
        }
        await cargarAreas();
        cerrarModal();
        setloader(false);
    }
    const handleCerrarModal=(e)=>{
        e.preventDefault();
        setArea({});
        cerrarModal();       
      }
    const handleChange = (e)=>{
        setdataArea({
            ...dataArea,
            [e.target.name]:e.target.value
        });
    }
   
  return (
    <div className="inf-estudiante">                 
    <div className="contenedor-inf-estudiante">
    <section className=" encabezado-modal">
        <div className="encab-modal">
                <h3>
                  {area.nombre? 'Editar Area' :'Nueva Area'}
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
                <div className="estudiante-informacion-1">
                 <label htmlFor="nombre">Nombre</label>
                 <input type="text" 
                        id="nombre" 
                        name="nombre"
                        defaultValue={dataArea.nombre} 
                        onChange={handleChange}/>

                 <label htmlFor="descripcion">Descripcion</label>
                 <textarea name="descripcion" 
                           id="descripcion" 
                           cols="15" 
                           rows="20"
                           defaultValue={dataArea.descripcion} 
                           onChange={handleChange}></textarea>

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

export default ModalNuevaArea