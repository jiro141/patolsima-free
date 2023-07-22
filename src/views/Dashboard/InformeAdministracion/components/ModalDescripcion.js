import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button
} from "@chakra-ui/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import CKEditorDefaultConfig from "api/ckeditor/ckeditorconfig";
import SaveButton from "components/widgets/Buttons/SaveButton";
import GeneralButton from "components/widgets/Buttons/GeneralButton";
import { updateInforme } from "api/controllers/informes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ModalDescripcion = ({ titulo, idStudy,informeDetail,setShowModal,type }) => {
const [data, setdata] = useState([])
const handleSubmitData=async()=>{
  if(type==='micro'){
    const newObj={
        estudio:idStudy,
        descripcion_microscopica:data.data
       }
       const res=await updateInforme(idStudy,newObj)
      if(res){
        toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModal(false)
      }else{
        toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
      }
  }
  if(type==='macro'){
    const newObj={
        estudio:idStudy,
        descripcion_macroscopica:data.data
       }
       const res=await updateInforme(idStudy,newObj)
      if(res){
        toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModal(false)
      }else{
        toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
      }
  }
  if(type==='diag'){
    const newObj={
        estudio:idStudy,
        diagnostico:data.data
       }
       const res=await updateInforme(idStudy,newObj)
      if(res){
        toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModal(false)
      }else{
        toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
      }
  }
  if(type==='notas'){
    const newObj={
        estudio:idStudy,
        notas:data.data
       }
       const res=await updateInforme(idStudy,newObj)
      if(res){
        toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModal(false)
      }else{
        toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
      }
  }
  if(type==='bibli'){
    const newObj={
        estudio:idStudy,
        bibliografia:data.data
       }
       const res=await updateInforme(idStudy,newObj)
      if(res){
        toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModal(false)
      }else{
        toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
      }
  }

}
    return (
        <>
            <Box marginTop={'-50px'}  >
                <Text margin={'10px'} color={'gray.900'} fontSize={'20px'}>{titulo}</Text>
                <Box height={'md'} minW={'400px'}>
                    <Box minH={'400px'} maxH={'200px'} 
                    sx={{
                        "&::-webkit-scrollbar": {
                          width: "6px",
                          height:"6px",
                          borderRadius: "8px",
                          backgroundColor: "#f5f5f5",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#888",
                          borderRadius: "5px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#555",
                        },
                      }}
                    overflowY="scroll">
                        {
                            type==='micro' ?
                            <CKEditor
                            editor={Editor}
                            config={{...{patolsima_informe_id: idStudy}, ...CKEditorDefaultConfig}}
                            data={
                                informeDetail?.descripcion_microscopica===null ? ' ' :informeDetail?.descripcion_microscopica
                            }
                            onReady={(editor) => {
                                console.log("CKEditor5 React Component is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({  data });
                                setdata({data})
                            }}
                        /> : type==='macro' ?
                        <CKEditor
                        editor={Editor}
                        config={{...{patolsima_informe_id: idStudy}, ...CKEditorDefaultConfig}}
                        data={
                            informeDetail?.descripcion_macroscopica===null ? ' ' :informeDetail?.descripcion_macroscopica
                        }
                        onReady={(editor) => {
                            console.log("CKEditor5 React Component is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log('from other');
                            setdata({data})
                        }}
                    /> :  type==='diag' ?
                    <CKEditor
                    editor={Editor}
                    config={{...{patolsima_informe_id: idStudy}, ...CKEditorDefaultConfig}}
                    data={
                        informeDetail?.diagnostico===null ? ' ' :informeDetail?.diagnostico
                    }
                    onReady={(editor) => {
                        console.log("CKEditor5 React Component is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log('from other');
                        setdata({data})
                    }}
                /> : type==='notas' ?
                <CKEditor
                editor={Editor}
                config={{...{patolsima_informe_id: idStudy}, ...CKEditorDefaultConfig}}
                data={
                    informeDetail?.notas===null ? ' ' :informeDetail?.notas
                }
                onReady={(editor) => {
                    console.log("CKEditor5 React Component is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log('from other');
                    setdata({data})
                }}
            /> : type==='bibli' ?
            <CKEditor
            editor={Editor}
            config={{...{patolsima_informe_id: idStudy}, ...CKEditorDefaultConfig}}
            data={
                informeDetail?.bibliografia===null ? ' ' :informeDetail?.bibliografia
            }
            onReady={(editor) => {
                console.log("CKEditor5 React Component is ready to use!", editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                console.log('from other');
                setdata({data})
            }}
        /> : ''
                        }
                    </Box>
                </Box>
               
              
            </Box>
            <div style={{display:'flex', alignItems:'center',justifyContent:'space-between',border:'0px solid',width:'95%'}}>
                <GeneralButton text={'Descartar'} handleClick={()=>setShowModal(false)} />
                <SaveButton handleSubmit={handleSubmitData}/>
                
                </div>
        </>
    );
}
export default ModalDescripcion;

export const ModalDescripcionMacro = ({ titulo, idStudy,informeDetail,setShowModal }) => {
    const [data, setdata] = useState([])
    const handleSubmitData=async()=>{
       const newObj={
        estudio:idStudy,
        descripcion_macroscopica:data.data
       }
       const res=await updateInforme(idStudy,newObj)
      if(res){
        toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModal(false)
      }else{
        toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
      }
    
    }
        return (
            <>
                <Box marginTop={'-50px'}  >
                    <Text margin={'10px'} color={'gray.900'} fontSize={'20px'}>{titulo}</Text>
                    <Box height={'sm'}>
                        <Box minH={'400px'} maxH={'200px'} 
                        sx={{
                            "&::-webkit-scrollbar": {
                              width: "6px",
                              height:"6px",
                              borderRadius: "8px",
                              backgroundColor: "#f5f5f5",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              background: "#888",
                              borderRadius: "5px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              background: "#555",
                            },
                          }}
                        overflowY="scroll">
                            <CKEditor
                                editor={Editor}
                                config={{...{patolsima_informe_id: idStudy}, ...CKEditorDefaultConfig}}
                                data={informeDetail?.descripcion_microscopica===null ? ' ' :informeDetail?.descripcion_microscopica }
                                onReady={(editor) => {
                                    console.log("CKEditor5 React Component is ready to use!", editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({  data });
                                    setdata({data})
                                }}
                            />
                        </Box>
                    </Box>
                    <div style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                    <GeneralButton text={'Descartar'} handleClick={()=>setShowModal(false)} />
                    <SaveButton handleSubmit={handleSubmitData}/>
                    
                    </div>
                  
                </Box>
            </>
        );
    }
  