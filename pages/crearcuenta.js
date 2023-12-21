
import Layout from "@/components/Layout"
import { useFormik } from "formik"
import * as Yup from 'yup'

export default function CrearCuenta() {

    //Formulario y validacion con formik
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es Obligatorio'),
            email: Yup.string().email("El email no es valido").required('El email es Obligatorio'),
            password:  Yup.string().required('El password es Obligatorio').min(6,"El password debe contener al menos 6 caracteres")
        }),
        onSubmit: (data) =>{
            console.log("Enviando formulario", data)
        }
    })
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mb-32">
        <h2 className="text-4xl font-sans font-bold text-center text-gray-800 my-4">Crear cuenta</h2>

        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <form
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-4">

                        {/* NOMBRE */}
                        <label 
                            className="block text-black text-sm font-bold mb-2"
                            htmlFor="nombre"
                        >Nombre</label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shawow-outline"
                            id="nombre"
                            placeholder="Nombre de Usuario"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4"> 
                                <p className="font-bold">Error</p>
                                <p >{formik.errors.nombre}</p>
                            </div>
                        ) : null }


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
                        value={"Crear cuenta"}
                    />
                </form>

            </div>

        </div>
      </div>
    </Layout>
  )
}