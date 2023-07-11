import { Box, Grid, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useFormik, validateYupSchema } from "formik";
import { postMuestra } from 'api/controllers/estudios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputOverall from '../Inputs/InputOverall';
import { useContext } from 'react';
import ModoVisualizacionContext from 'components/ModoVisualizacion/ModoVisualizacion';
import SaveButton from '../Buttons/SaveButton';
import GeneralButton from '../Buttons/GeneralButton';

export default function AddMuestraForm() {
  const { estudioID, setMuestraID,muestraID } = useContext(
    ModoVisualizacionContext
  );
  

  const formik = useFormik({
    initialValues: {
      tipo_de_muestra: "",
      descripcion: " ",
      notas: ""
  
    },
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      if(muestraID){
        formik.resetForm()
      }
      const newObj={
        estudio:estudioID,
    ...formData
      }
      try {
        const muestraPost = await postMuestra(newObj);
        if(muestraPost){
          console.log(muestraPost)
          setMuestraID(muestraPost.id)
          toast.success("¡La muestra fue creada con exito!", {
            autoClose: 1000,
          });
          
        }else{
          toast.error("¡Hubo un error al crear la muestra!", {
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.log(error);
      }
      return;
    },
  });


  return (
    <div style={{paddingLeft:"10px", paddingRight:"10px",width:"100%"}}>
     <Text fontSize={'20px'} margin={'2% auto 2% auto'} color={'gray.600'}>Agregar muestra</Text>

       <InputOverall
       placeholder='Tipo de muestra'
       name={'tipo_de_muestra'}
       value={formik.values.tipo_de_muestra}
       onChange={e=>formik.setFieldValue('tipo_de_muestra',e.target.value)}
       />
        <InputOverall
       placeholder='Descripcion'
       name={'descripcion'}
       value={formik.values.descripcion}
       onChange={e=>formik.setFieldValue('descripcion',e.target.value)}
       />
       <Textarea
           marginTop={'10px'}
           size="lg"
           name='notas'
           borderRadius="md"
           placeholder="Notas"
           value={formik.values.notas}
           onChange={e => formik.setFieldValue('notas', e.target.value)}
            />
            {muestraID && <Box w={"100%"} textAlign={"center"}>
        <GeneralButton text={"Agregar otra muestra"} handleClick={formik.handleSubmit} />
      </Box>}
            <Box w={"100%"} textAlign="end">
      <SaveButton handleSubmit={formik.handleSubmit} />
      </Box>
  
    </div>
  
  )
}
