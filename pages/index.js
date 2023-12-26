
import Layout from "@/components/Layout"
import { useContext, useEffect } from "react"
import AuthContext from "@/context/auth/authContext"


export default function Home() {

    //Definir el context
    const authContext = useContext(AuthContext)
    const {usuarioAutenticado} = authContext;

    //Extraer el usuario autenticado del storage

    useEffect(()=>{
      usuarioAutenticado()
    },[])


  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  )
}
