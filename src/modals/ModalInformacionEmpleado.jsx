import React,{useContext,useState} from 'react'
import {AppContext} from '../context/AppContext';
import '../styles/ModalNuevoEmpleado.css';


const ModalInformacionEmpleado = ({cerrarModal}) => {
  const {area,areas,setArea} = useContext(AppContext);


  const getArea = (id) =>{
    console.log(id)
    let are = areas.filter(area => area.idarea === id);
    if(are.length > 0){
        return are[0].nombre;
    }
    return "";
  }

  
const [dataEmpleado, setdataEmpleado] = useState({
    cedula:area.cedula ? area.cedula:"",
    nombre:area.nombre?area.nombre:"", 
    telefono:area.telefono?area.telefono:"",
    email:area.email?area.email:"",
    ciudad_nacimiento:area.ciudad_nacimiento?area.ciudad_nacimiento:"",
    fecha_nacimiento:area.fecha_nacimiento?area.fecha_nacimiento:"",
    ciudad_expedicion:area.ciudad_expedicion?area.ciudad_expedicion:"",
    fecha_expedicion:area.fecha_expedicion?area.fecha_expedicion:"",
    tipo_sangre:area.tipo_sangre?area.tipo_sangre:"",
    sexo:area.sexo?area.sexo:"",
    estado_civil:area.estado_civil?area.estado_civil:"",
    ciudad_residencia:area.ciudad_residencia?area.ciudad_residencia:"",
    direccion_residencia:area.direccion_residencia?area.direccion_residencia:"",
    idarea:area.idarea?area.idarea:"",
    salario:area.salario?area.salario:"",
    rol:area.rol?area.rol:""
});
const handleCerrarModal=(e)=>{
    e.preventDefault();
    setArea({});
    cerrarModal();       
}

  return (
    <div className="inf-estudiante">                 
    <div className="contenedor-inf-estudiante">
    <section className=" encabezado-modal">
        <div className="encab-modal">
                <h3>
                   INFORMACION EMPLEADO
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
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input 
                        name="nombre" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.nombre? dataEmpleado.nombre : ''}
                        /* disabled={estudiante.idestudiante? true : false} *//>

                    <label htmlFor="cedula">Cédula</label>
                    <input 
                        name="cedula" 
                        type="number"
                        disabled
                        defaultValue={dataEmpleado.cedula? dataEmpleado.cedula : ''}
                       /*  defaultValue={estudiante.nombre? estudiante.nombre : ''} *//>

                    <label htmlFor="Telefono">Teléfono</label>
                    <input 
                        name="telefono" 
                        type="number" 
                        disabled
                        defaultValue={dataEmpleado.telefono? dataEmpleado.telefono : ''}
                        /* defaultValue={estudiante.apellido? estudiante.apellido : ''} *//>

                    <label htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        type="email" 
                        disabled
                        defaultValue={dataEmpleado.email? dataEmpleado.email : ''}
                        /* defaultValue={estudiante.telefono? estudiante.telefono : ''} *//>
                  
                    <label htmlFor="ciudad">Ciudad Nacimiento</label>
                    <input 
                        name="ciudad_nacimiento" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.ciudad_nacimiento? dataEmpleado.ciudad_nacimiento : ''}
                        /* defaultValue={estudiante.nomacudiente? estudiante.nomacudiente : ''} *//>
                    <label htmlFor="fecha">Fecha Nacimiento</label>
                    <input 
                        name="fecha_nacimiento" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.fecha_nacimiento? dataEmpleado.fecha_nacimiento : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>

                    <label htmlFor="expedicion">Ciudad Expedición documento</label>
                    <input 
                        name="ciudad_expedicion" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.ciudad_expedicion? dataEmpleado.ciudad_expedicion : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
                    <label htmlFor="fecha">Fecha Expedición documento</label>
                    <input 
                        name="fecha_expedicion" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.fecha_expedicion? dataEmpleado.fecha_expedicion : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
                    
                    <label htmlFor="tipo_sangre">Tipo de sangre</label>
                    <input 
                        name="tipo_sangre" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.tipo_sangre? dataEmpleado.tipo_sangre : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
                

                    <label htmlFor="sexo">Sexo</label>
                    <input 
                        name="sexo" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.sexo? dataEmpleado.sexo : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
                    

                    <label htmlFor="estado_civil">Estado Civil</label>
                    <input 
                        name="estado_civil" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.estado_civil? dataEmpleado.estado_civil : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
    

                    <label htmlFor="area">Area</label>
                    <input 
                        name="area" 
                        type="text" 
                        disabled
                        defaultValue={getArea(dataEmpleado.idarea)}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
            

                    <label htmlFor="rol">Rol</label>
                    <input 
                        name="rol" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.rol? dataEmpleado.rol : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
                   

                    <label htmlFor="ciudad_residencia">Ciudad Residencia</label>
                    <input 
                        name="ciudad_residencia" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.ciudad_residencia? dataEmpleado.ciudad_residencia : ''}

                    />

                    <label htmlFor="direccion_residencia">Direccion de residencia</label>
                    <input 
                        name="direccion_residencia" 
                        type="text" 
                        disabled
                        defaultValue={dataEmpleado.direccion_residencia? dataEmpleado.direccion_residencia : ''}
                    />
                     <label htmlFor="salario">Salario</label>
                    <input 
                        name="salario" 
                        type="number" 
                        disabled
                        defaultValue={dataEmpleado.salario? dataEmpleado.salario : ''}
                    />
                </div>
               
            
            </main>                

    </div>
    </div>
  )
}

export default ModalInformacionEmpleado