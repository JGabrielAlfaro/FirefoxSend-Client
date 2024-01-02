import React from 'react'
import Link from 'next/link'


import { useContext, useEffect } from "react"
import AuthContext from "@/context/auth/authContext"
import appContext from "@/context/app/appContext"
import AppContext from '@/context/app/appContext'
import {useRouter} from 'next/router'


const Header = () => {

    //Routing
    const router = useRouter();

    //Definir el context para el usuario
    const authContext = useContext(AuthContext)
    const {usuarioAutenticado,usuario,cerrarSesion} = authContext;

     //Definir el context para la aplicación
    const appContext = useContext(AppContext)
    const {limpiarState} = appContext;

    //Extraer el usuario autenticado del storage
    useEffect(()=>{
      usuarioAutenticado()
    },[])

  const redireccionar =() => {
    router.push("/")
    limpiarState();
  }

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      {/* <Link href={"/"}> */}
          <img 
            src='/logo.svg' 
            className='w-64 mb-8 md:mb-0 cursor-pointer'
            onClick={()=> redireccionar()}
            />
      {/* </Link> */}
      
      <div>
        {
          usuario ? (
            <div className='flex items-center'>
              <p className='mr-2'>Hola {usuario.nombre}</p>
              <button 
                className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
                onClick={()=>cerrarSesion()}
              >
                Cerrando Sesión
              </button>
            </div>
          ) : (
              <>
                <Link 
                  href={"/login"} 
                  className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'
                > Iniciar Sesion</Link>

                <Link 
                  href={"/crearcuenta"} 
                  className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
                > Crear Cuenta</Link>
              </>
          )
        }
         
      </div>
    </header>
  )
}

export default Header
