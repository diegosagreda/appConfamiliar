import React,{useContext} from 'react'
import {AppContext} from '../context/AppContext';

const TablaObserEmple = () => {
  
  const {observaciones,setObservacion,usuario} = useContext(AppContext);
  
  return (
    <div className='TablaVerEstudiante'>
    <div class="tabla-estudiante">
        <div class="tabla-interna">
            <table>
                <thead>
                    <tr>
                      
                        <th>Id</th>
                        <th>Observacion</th>
                       
                    </tr>
                </thead>
            
                <tbody className='contenido-tabla'>
                    {observaciones.map(o => (
                    <tr>
                        <td>{o.cedula}</td>
                        <td>{o.nota}</td>
                     
                       
                    </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
    </div>
</div>
  )
}

export default TablaObserEmple