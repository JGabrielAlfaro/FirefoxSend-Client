import Layout from "@/components/Layout";

import clienteAxios from "@/config/axios";

//La respuesta que vamos a obtener.
//props, se aplica distructuring y queda como {params}
// getStaticProps => getServerSideProps
export async function getServerSideProps ({params}){
    //  console.log("params:",params)
    const {idEnlace} = params;

    const resultado = await clienteAxios.get(`/api/enlaces/${idEnlace}`)
    // console.log(resultado)
    return {
        props: {
            enlace: resultado.data
        }
    }
}

//Nos permite generar diferentes url.
// getStaticPaths => getServerSidePaths
export async function getServerSidePaths (){
    const enlaces = await clienteAxios.get('/api/enlaces')

    // console.log(enlaces)


    return {
        //idEnlace, viene del nombre del archivo del routing dinamico.
        paths:enlaces.data.enlaces.map(item=>({
            params: {idEnlace:item.url}
        })),
        fallback: false // false (url validas, si esta mal pone pagina 404), true (entra cualquiera y no pone la pag 404)
        
    }
}

//"enlace" viene del props de getStaticProps.
export default ({enlace}) =>{

    console.log(enlace)
    return (
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
            <div className="flex items-center justify-center mt-10 ">
                    <a 
                        href= {`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/archivos/${enlace.archivo}`} 
                        className="bg-red-500 text-center px-10 py-3 rounded font-bold text-white cursor-pointer"
                        download
                    >AQUI</a>
            </div>
        </Layout>
    )
}

