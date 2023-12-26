import React, {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {REGISTRO_ERROR, REGISTRO_EXITOSO,USUARIO_AUTENTICADO,LIMPIAR_ALERTA,LOGIN_EXITOSO,LOGIN_ERROR,CERRAR_SESION} from '../../types'
import clienteAxios from "@/config/axios";
import tokenAuth from "@/config/tokenAuth";

const AuthState = ({children}) => {

    //Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token_FirefoxSend') : '',
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

    //Iniciar Sesión
    const iniciarSesion = async (datosFormulario) => {
        // console.log(datosFormulario)

        try {
            const respuesta = await clienteAxios.post('/api/auth',datosFormulario)
            // console.log(respuesta.data.token)
            dispath({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
            limpiar_mensaje();
        } catch (error) {
            // console.log(error.response.data.msg)
            dispath({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
            limpiar_mensaje();
        }
    }

    //Retorne el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
       const token = localStorage.getItem('token_FirefoxSend')
       if (token){
        tokenAuth(token)
       }
       try {
        const respuesta = await clienteAxios.get('/api/auth')
        // console.log(respuesta.data.usuario)
        dispath({
            type: USUARIO_AUTENTICADO,
            payload: respuesta.data.usuario
        })
       } catch (error) {
         // console.log(error.response.data.msg)
         dispath({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
        })
        limpiar_mensaje();
       }
    }

    //Cerrar la sesión.
    const cerrarSesion = () => {
        dispath({
            type: CERRAR_SESION
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
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;


