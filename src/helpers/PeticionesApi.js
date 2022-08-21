import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const PeticionesApi = () => {

    let production = 'https://api-rest-confamiliar.herokuapp.com';
    //let production = 'http://localhost:3050';
    //let production = 'http://192.168.43.105:3080';
    //let production = 'http://192.168.1.14:3080';
    
    const {setAreas,setEmpleados ,areas,setUsuario,usuario,setObservaciones,empleados} = useContext(AppContext);
    
    const iniciarSesion = async (usuario, contraseña) => {
        console.log(usuario,contraseña);        
        try {
            const respuesta = await fetch(production + '/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contrasena: contraseña
                })
            });
            if (respuesta.status === 200) {
                const rta = await respuesta.json();
                 cargarAreas();
                 cargarEmpleados();
                 cargarObservaciones();
                return rta[0];
            } else {
                return false;
            }
        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    const registrarArea = async (data) => {
        
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/areas', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                alert('Area registrada con exito');
                return respuesta.json();
            }
            else {
                alert('Error al crear Area');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar Area...")
            console.log(error)
        }
    }
    const cargarAreas = async() =>{
        try {
            const respuesta = await fetch(production + '/areas');

            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                setAreas(resp)
            } else {
                setAreas([]);
            }
        } catch (error) {
            console.log("Algo salio mal al cargar areas")
        }
    }
    const eliminarArea = async(idarea) =>{
        try {
            const response = await fetch(production+'/areas/'+idarea,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
            alert('Area Eliminada');
            cargarAreas();
            }else{
           alert('Algo salio mal al eliminar Area')
        }
        }catch {
          console.log('Algo fallo al eliminar area');
        }
    }
    const actualizarArea = async (idarea, data)=>{
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/areas/' +idarea, { // produccion es la url de la api
                method: 'PUT', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                alert('Area Actualizada');
                cargarAreas();
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio al actualizarArea...")
            console.log(error)
        }
    }
    const getArea =(id) =>{
        console.log(id)
        let area = areas.filter(area => area.idarea == id);
        console.log(area)
        return "Jola"
    }

    const registrarEmpleado = async(data)=>{
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/empleados', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                alert('Empleado Registrado');
                return respuesta.json();
            }
            else {
                alert('Error al crear Empleado');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar Empleado...")
            console.log(error)
        }
    }
    const cargarEmpleados = async()=>{
        setEmpleados([]);
        try {
            const respuesta = await fetch(production + '/empleados');

            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                //Filtro de area
                if(usuario.length > 0){
                    let empleadosArea = resp.filter(em => em.idarea == usuario[0].idarea && em.rol == 'empleado');
                    
                    setEmpleados(empleadosArea);
                    return
                }
                setEmpleados(resp)
            } else {
                setEmpleados([]);
            }
        } catch (error) {
            console.log("Algo salio mal al cargar empleados")
        }
    }
    const eliminarEmpleado = async(cedula)=>{
        try {
            const response = await fetch(production+'/empleados/'+cedula,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
            alert('Empleado borrado del sistema');
            cargarEmpleados();
            }else{
           alert('Algo salio mal al eliminar Empleado')
        }
        }catch {
          console.log('Algo fallo al eliminar emoleado');
        }
    }
    const actualizarEmpleado = async(cedula,data)=>{
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/empleados/' +cedula, { // produccion es la url de la api
                method: 'PUT', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                alert('Informacion Empleado Actualizada');
                cargarEmpleados();
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio al actualizarEmpleado...")
            console.log(error)
        }
    }
    const buscarEmpleado = async (id)=>{
        try {
            const respuesta = await fetch(production + '/empleados/'+id);

            if (respuesta.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("Algo salio mal al cargar empleados")
        }
    }
    const cargarEmpleadoOnline = async (id)=>{
        try {
            const respuesta = await fetch(production + '/empleados/'+id);

            if (respuesta.status === 200) {
                let rta = await respuesta.json();
                setUsuario(rta);
            } else {
                setUsuario({});
            }
        } catch (error) {
            console.log("Algo salio mal al cargar empleado")
        }
    }

    const registrarObservacion =async(data)=>{
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/observaciones', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                alert('Retroalimentacion registrada');
                return respuesta.json();
            }
            else {
                alert('Error al crear retro');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar retro...")
            console.log(error)
        }
    }
    const cargarObservaciones = async()=>{
        try {
            const respuesta = await fetch(production + '/observaciones');
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                 //Filtro de area
                 if(usuario.length > 0){
                    //Cargamos observaciones de un solo empleado
                    if(usuario[0].rol === 'empleado'){
                        let obser = resp.filter(em => em.idarea == usuario[0].idarea && em.cedula == usuario[0].cedula);
                        setObservaciones(obser);
                        return
                    }

                    let obser = resp.filter(em => em.idarea == usuario[0].idarea);
                    setObservaciones(obser);
                    return
                }
                setObservaciones(resp)
            } else {
                setObservaciones([]);
            }
        } catch (error) {
            console.log("Algo salio mal al cargar observaciones")
        }
    }
    const actualizarObservacion = async(id,data)=>{
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/observaciones/' +id, { // produccion es la url de la api
                method: 'PUT', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                alert('Retroalimentacion Actualizada');
                cargarAreas();
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio al actualizar Retro...")
            console.log(error)
        }
    }
    const eliminarObservacion = async (id) => {
        try {
            const response = await fetch(production+'/observaciones/'+id,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
            alert('Retroalimentacion eliminada');
            cargarObservaciones();
            }else{
           alert('Algo salio mal al eliminar retro')
        }
        }catch {
          console.log('Algo fallo al eliminar retro');
        }
    }

    return {
       iniciarSesion,
       registrarArea,
       cargarAreas,
       eliminarArea,
       actualizarArea,
       registrarEmpleado,
       cargarEmpleados,
       eliminarEmpleado,
       actualizarEmpleado,
       buscarEmpleado,
       getArea,
       cargarEmpleadoOnline,
       registrarObservacion,
       actualizarObservacion,
       cargarObservaciones,
       eliminarObservacion
    }

}