
import React, {createContext, useState} from 'react'
export const AppContext=createContext();

export const DataProvider=({children})=>{

  const [logueado, setLogueado] = useState(false);
  const [empleado, setEmpleado] = useState({});
  const [areas,setAreas] = useState([]);
  const [area,setArea] = useState({});
  const [usuario,setUsuario] = useState({});
  const [empleados,setEmpleados] = useState([]);
  const {empleadoEdit,setEmpleadoEdit} = useState();
  const [observaciones, setObservaciones] = useState([]);
  const [observacion, setObservacion] = useState({});

  return (
    <AppContext.Provider value={{
      logueado, setLogueado,
      empleado,setEmpleado,
      usuario,setUsuario,
      areas,setAreas,
      area,setArea,
      empleados,setEmpleados,
      empleadoEdit,setEmpleadoEdit,
      observaciones,setObservaciones,
      observacion,setObservacion
    }}>{children}</AppContext.Provider>
  )
}