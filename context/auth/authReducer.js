import { USUARIO_AUTENTICADO,REGISTRO_EXITOSO,REGISTRO_ERROR,LIMPIAR_ALERTA,LOGIN_EXITOSO,LOGIN_ERROR,CERRAR_SESION } from "@/types";

export default (state, action) => {
  switch (action.type) {

    case USUARIO_AUTENTICADO:
        return {
            ...state,
            usuario: action.payload,
        }

    case REGISTRO_EXITOSO :
    case REGISTRO_ERROR :
        return {
            ...state,
            mensaje: action.payload,
        }
    case LOGIN_EXITOSO :
        localStorage.setItem('token_FirefoxSend',action.payload)
        return {
            ...state,
            token: action.payload,
            autenticado: true
        }
    case LOGIN_ERROR :
        return {
            ...state,
            mensaje: action.payload,
        }
    case LIMPIAR_ALERTA:
        return {
            ...state,
            mensaje: null,
        }
    case CERRAR_SESION : 
        localStorage.removeItem('token_FirefoxSend')
        return {
            ...state,
            usuario: null,
            autenticado: null,
            token: null,
        }
    default:
      return state;
  }
};
