import Layout from "@/components/Layout"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useContext,useEffect } from "react"
import AuthContext from "@/context/auth/authContext"
import Alerta from "@/components/Alerta"
import {useRouter} from 'next/router'

export default function Login() {

  //Definir el context
   const authContext = useContext(AuthContext)
   const {iniciarSesion,mensaje,autenticado} = authContext;

   //Router
   const router = useRouter()

   //Valida si estamos autenticado
   useEffect(()=>{
    if (autenticado){
        router.push('/')
    }
   },[autenticado])

   //Formulario y validacion con formik
   const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string().email("El email no es valido").required('El email es Obligatorio'),
        password:  Yup.string().required('El password es Obligatorio')
    }),
    onSubmit: (datosFormulario) =>{
       iniciarSesion(datosFormulario)
    }
})

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mb-32">
        <h2 className="text-4xl font-sans font-bold text-center text-gray-800 my-4">Iniciar Sesión</h2>
        {
            mensaje && < Alerta />
        }
        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <form
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-4">

                         {/* EMAIL */}
                        <label 
                            className="block text-black text-sm font-bold mb-2"
                            htmlFor="email"
                        >Email</label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shawow-outline"
                            id="email"
                            placeholder="Email de Usuario"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                         {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p >{formik.errors.email}</p>
                            </div>
                        ) : null }

                          {/* PASSWORD */}
                          <label 
                            className="block text-black text-sm font-bold mb-2"
                            htmlFor="password"
                        >Pasword</label>
                        <input
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shawow-outline"
                            id="password"
                            placeholder="Password de Usuario"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.password && formik.errors.password ? (
                            <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p >{formik.errors.password}</p>
                            </div>
                        ) : null }
                    </div>
                    <input 
                        type="submit"
                        className="bg-red-500 hover:bg-gray-500 w-full p-2 text-white uppercase font-bold"
                        value={"Iniciar Sesión"}
                    />
                </form>

            </div>

        </div>
      </div>
    </Layout>
  )
}
