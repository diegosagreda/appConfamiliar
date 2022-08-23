import React,{useState,useContext,useEffect} from 'react'
import '../styles/ModalNuevoEmpleado.css';

import {PeticionesApi} from '../helpers/PeticionesApi';
import {AppContext} from '../context/AppContext';
import {BallTriangle} from 'react-loader-spinner' 

const ModalNuevoEmpleado = ({cerrarModal}) => {

    const {registrarEmpleado,actualizarEmpleado,cargarEmpleados,buscarEmpleado} = PeticionesApi();
    const {area,setArea,areas,usuario} = useContext(AppContext);
    const [loader, setloader] = useState(false);
    useEffect(()=>{
        if(usuario.length > 0){
            setdataEmpleado({
                ...dataEmpleado,
               idarea:usuario[0].idarea,
               rol:'empleado'
            });
        }
    },[])

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
const handleChange = (e)=>{
    setdataEmpleado({
        ...dataEmpleado,
        [e.target.name]:e.target.value
    });
}
const handleGuardar = async (e)=>{
    setloader(true);
    //Validacion cc repetida
    e.preventDefault();
        if(dataEmpleado.cedula &&dataEmpleado.nombre && dataEmpleado.telefono && dataEmpleado.email &&
            dataEmpleado.ciudad_nacimiento && dataEmpleado.fecha_nacimiento &&dataEmpleado.ciudad_expedicion &&
            dataEmpleado.fecha_expedicion &&dataEmpleado.tipo_sangre &&dataEmpleado.sexo &&
            dataEmpleado.estado_civil &&dataEmpleado.ciudad_residencia &&dataEmpleado.direccion_residencia &&
            dataEmpleado.idarea && dataEmpleado.salario &&dataEmpleado.rol){
    
            if(area.cedula){

                await actualizarEmpleado(area.cedula,dataEmpleado);
                alert('Informacion empleado Actualizada');
                setArea({});
                cerrarModal();
            }else{
                if(!await buscarEmpleado(dataEmpleado.cedula)){
                    await registrarEmpleado(dataEmpleado);
                    cerrarModal();
                }else{
                    alert("Ya se encuentra un empleado con la misma cédula")
                }
            }
            await cargarEmpleados();
        }else{
            alert("Campos vacios")
        }
        setloader(false);
}

  return (
    <div className="inf-estudiante">                 
    <div className="contenedor-inf-estudiante">
    <section className=" encabezado-modal">
        <div className="encab-modal">
                <h3>
                    {area.cedula ? 'Actualizar empleado' : ' Ingreso nuevo empleado'}
                  
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
                        onChange={handleChange}
                        defaultValue={dataEmpleado.nombre? dataEmpleado.nombre : ''}
                        /* disabled={estudiante.idestudiante? true : false} *//>

                    <label htmlFor="cedula">Cédula</label>
                    <input 
                        name="cedula" 
                        type="number"
                        onChange={handleChange}
                        defaultValue={dataEmpleado.cedula? dataEmpleado.cedula : ''}
                       /*  defaultValue={estudiante.nombre? estudiante.nombre : ''} *//>

                    <label htmlFor="Telefono">Teléfono</label>
                    <input 
                        name="telefono" 
                        type="number" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.telefono? dataEmpleado.telefono : ''}
                        /* defaultValue={estudiante.apellido? estudiante.apellido : ''} *//>

                    <label htmlFor="email">Email</label>
                    <input 
                        name="email" 
                        type="email" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.email? dataEmpleado.email : ''}
                        /* defaultValue={estudiante.telefono? estudiante.telefono : ''} *//>
                  
                    <label htmlFor="ciudad">Ciudad Nacimiento</label>
                    <input 
                        name="ciudad_nacimiento" 
                        type="text" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.ciudad_nacimiento? dataEmpleado.ciudad_nacimiento : ''}
                        /* defaultValue={estudiante.nomacudiente? estudiante.nomacudiente : ''} *//>
                    <label htmlFor="fecha">Fecha Nacimiento</label>
                    <input 
                        name="fecha_nacimiento" 
                        type="date" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.fecha_nacimiento? dataEmpleado.fecha_nacimiento : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>

                    <label htmlFor="expedicion">Ciudad Expedición documento</label>
                    <input 
                        name="ciudad_expedicion" 
                        type="text" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.ciudad_expedicion? dataEmpleado.ciudad_expedicion : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
                    <label htmlFor="fecha">Fecha Expedición documento</label>
                    <input 
                        name="fecha_expedicion" 
                        type="date" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.fecha_expedicion? dataEmpleado.fecha_expedicion : ''}
                        /* defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''} *//>
                    
                    <label htmlFor="tipo_sangre">Tipo de sangre</label>
                    <select name="tipo_sangre" id="" onChange={handleChange}>
                        <option>--Seleccionar--</option>
                        <option value="0+">O+</option>
                        <option value="0-">O-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>  
                    </select>

                    <label htmlFor="sexo">Sexo</label>
                    <select name="sexo" id="" onChange={handleChange}>
                        <option>--Seleccionar--</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>

                    <label htmlFor="estado_civil">Estado Civil</label>
                    <select name="estado_civil" id="estado_civil" onChange={handleChange}>
                        <option>--Seleccionar--</option>
                        <option value="Soltero">Soltero</option>
                        <option value="Casado">Casado</option>
                    </select>
                    {(usuario.length > 0) ? null : 
                        <>
                            <label htmlFor="area">Area</label>
                            <select name="idarea" 
                                    id="area" 
                                    onChange={handleChange}
                                    >
                                <option>--Seleccionar--</option>
                                {areas.map(area => (
                                    <option value={area.idarea}>{area.nombre}</option>
                                ))}
                            </select>
                        
                            <label htmlFor="rol">Rol</label>
                            <select name="rol" id="rol" onChange={handleChange}>
                                <option>--Seleccionar--</option>
                                <option value="gerente">Gerente</option>
                                <option value="empleado">Empleado</option>
                            </select>
                        </>
                    }


                    <label htmlFor="ciudad_residencia">Ciudad Residencia</label>
                    <input 
                        name="ciudad_residencia" 
                        type="text" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.ciudad_residencia? dataEmpleado.ciudad_residencia : ''}

                    />

                    <label htmlFor="direccion_residencia">Direccion de residencia</label>
                    <input 
                        name="direccion_residencia" 
                        type="text" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.direccion_residencia? dataEmpleado.direccion_residencia : ''}
                    />
                     <label htmlFor="salario">Salario</label>
                    <input 
                        name="salario" 
                        type="number" 
                        onChange={handleChange}
                        defaultValue={dataEmpleado.salario? dataEmpleado.salario : ''}
                    />
                </div>
                <div className="btn-inf-estudiante">
                    <button  onClick={handleGuardar}>
                        {loader? <BallTriangle color='#fff' height={20} width={20}/>:'Guardar'}
                    </button>
                </div>
            
            </main>                

    </div>
    </div>
  )
}

export default ModalNuevoEmpleado