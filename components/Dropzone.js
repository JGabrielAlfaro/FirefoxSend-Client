import { useDropzone } from "react-dropzone";
import React,{ useCallback,useContext } from "react";
import clienteAxios from "@/config/axios";
import AppContext from "@/context/app/appContext";

const Dropzone = () => {

//Config reducer
const appContext = useContext(AppContext);
const {cargando,mostrarAlerta,subirArchivo,crearEnlace} = appContext;

const onDropRejected = () =>{
    mostrarAlerta("No se pudo subir, el limite máximo es 1 MB, obten una cuenta gratis para subir archivos más grandes ")
}

const onDropAccepted = useCallback( async (acceptedFiles)=> {
    // console.log(acceptedFiles)
    //Crear un from Data
    const formData = new FormData();
    formData.append('archivo',acceptedFiles[0]);

    //console.log("Filename origin:",acceptedFiles[0].path)
    subirArchivo(formData,acceptedFiles[0].path);


},[])



//Extraer contenido de dropzone
// onDrop(acepta todo, aunque no este el archivo),onDropAccepted(solo los aceptados),onDropRejected(solo lo que tienen error)
const {getRootProps,getInputProps,isDragActive,acceptedFiles} = useDropzone({onDropAccepted, onDropRejected,maxSize:1000000})

const archivos = acceptedFiles.map( file =>(
    <li key={file.lastModified} className="bg-white flex-1 p-3 shadow-lg rounded">
       <p className="font-bold text-lg">{file.path} </p> 
       <p className="text-sm text-gray-500">{ (file.size / Math.pow(1024,2)).toFixed(2) } MB</p>
    </li>
))



  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {
        acceptedFiles.length > 0 ? (
            <div className="mt-10 w-full"> 
                <h4 className="text-2xl font-bold text-center mb-4">Archivo:</h4>
                <ul>
                    {archivos}
                </ul>
                {
                    cargando ? <p className="my-10 text-center text-gray-600">Subiendo archivo...</p> : (
                        <button 
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            onClick={()=>crearEnlace()}
                        >
                            Crear enlace
                        </button>
                    )
                }
            </div>
        ) : (
            <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                    <input className="h-100" {...getInputProps()}/>
                    {
                        isDragActive ? (
                            <p className="text-2xl text-center text-gray-600">Suelta el archivo</p>
                        ) : (
                            <div className="text-center">
                                <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aquí</p>
                                <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800">
                                    Selecciona archivos para subir
                                </button>
                            </div>
                        )
                    }
            </div>
        )
      }
      
    </div>
  );
};

export default Dropzone;
