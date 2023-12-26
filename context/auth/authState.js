import React, {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {REGISTRO_ERROR, REGISTRO_EXITOSO,USUARIO_AUTENTICADO,LIMPIAR_ALERTA} from '../../types'
import clienteAxios from "@/config/axios";

const AuthState = ({children}) => {

    //Definir un state inicial
    const initialState = {
        token:'UN TOKEN',
        autenticado:null,
        usuario: null,
        mensaje: null,
    }

    //Definir el reducer
    const [state, dispath] = useReducer(authReducer,initialState)

    //Registrar nuevos usuarios

    const registrarUsuario = async (datos) => {
       try {
        const respuesta = await clienteAxios.post('/api/usuarios',datos)
        // console.log(respuesta.data.msg)
        dispath({
            type:REGISTRO_EXITOSO,
            payload:respuesta.data.msg
        })

        limpiar_mensaje();

       } catch (error) {
        // console.log(error.response.data.msg)
        dispath({
            type:REGISTRO_ERROR,
            payload: error.response.data.msg
        })
        limpiar_mensaje();
       }
    }

    const limpiar_mensaje = () =>{
        //Limpia la alerta despues de 3 segundos.

        setTimeout(()=>{
        dispath({
            type:LIMPIAR_ALERTA,
        })
    },3000)
    }

    //Usuario autentificado
    const usuarioAutenticado = nombre => {
        dispath({
            type: USUARIO_AUTENTICADO,
            payload:nombre
        })
    }
   

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado:state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;


