import { useReducer } from "react";
import {MOSTRAR_ALERTA,OCULTAR_ALERTA,SUBIR_ARCHIVO,SUBIR_ARCHIVO_EXITO,SUBIR_ARCHIVO_ERROR,CREAR_ENLACE_EXITO,CREAR_ENLACE_ERROR} from '../../types'
import AppContext from "./appContext";
import AppReducer from './appReducer';
import clienteAxios from "@/config/axios";

  const AppState = ({children}) => {

    const initialState = {
      mensaje_archivo: null,
      nombre:'',
      nombre_original:'',
      cargando: null,
      descargas:1,
      password: '',
      autor: null,
      url:''
    }

    //Definir el reducer
    const [state, dispath] = useReducer(AppReducer,initialState)

    //Muestra una alerta
    const mostrarAlerta = (msg) => {
      console.log(msg)
      dispath({
        type:MOSTRAR_ALERTA,

        payload: msg
      })
      limpiar_mensaje();
    }

    const limpiar_mensaje = () =>{
      //Limpia la alerta despues de 3 segundos.

      setTimeout(()=>{
      dispath({
          type:OCULTAR_ALERTA,
      })
  },3000)
  }

  //Sube los archivos al servidor
  const subirArchivo = async(formData,nombreArchivo) =>{
    // console.log("Subiendo archivos")

    dispath({
      type: SUBIR_ARCHIVO,
    })

    try {
      const resultado = await clienteAxios.post('/api/archivos',formData)
      dispath({
        type: SUBIR_ARCHIVO_EXITO,
        payload:{
          nombre:resultado.data.archivo,
          nombre_original:nombreArchivo
        }
      })
      console.log(resultado.data)
      
    } catch (error) {
      dispath({
        type: SUBIR_ARCHIVO_ERROR,
        payload:error.response.data.msg
      })
      
    }finally{
      limpiar_mensaje() ;
    }
  }


  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor
    }
    try {
      const resultado = await clienteAxios.post('/api/enlaces',data);
      console.log(resultado.data.msg)
      dispath({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg
      })
    } catch (error) {
      console.log(error)
    }
}

    return (
      <AppContext.Provider
          value={{
            mensaje_archivo: state.mensaje_archivo,
            nombre:state.nombre,
            nombre_original: state.nombre_original,
            cargando:state.cargando,
            descargas:state.descargas,
            password:state.password,
            autor:state.autor,
            url:state.url,
            mostrarAlerta,
            subirArchivo,
            crearEnlace
            
          }}
      >
          {children}
      </AppContext.Provider>
    )
}

export default AppState;


