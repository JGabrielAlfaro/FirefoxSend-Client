import React from 'react'
import Link from 'next/link'


import { useContext, useEffect } from "react"
import AuthContext from "@/context/auth/authContext"


const Header = () => {

    //Definir el context
    const authContext = useContext(AuthContext)
    const {usuarioAutenticado,usuario,cerrarSesion} = authContext;

    //Extraer el usuario autenticado del storage

    useEffect(()=>{
      usuarioAutenticado()
    },[])


  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href={"/"}>
          <img src='logo.svg' className='w-64 mb-8 md:mb-0'/>
      </Link>
      
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
