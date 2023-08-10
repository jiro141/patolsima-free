import { Box, Button, CloseButton, Grid, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import InputOverall from '../Inputs/InputOverall'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Title } from '../Texts';
import { postIHQ } from 'api/controllers/informes';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import MainContext from 'context/mainContext/MainContext';
import '../../../css/style.css'
import { putIHQ } from 'api/controllers/informes';

export default function AddIHQModal({showModal,toggleModal,idStudy,type,dataResultP,
  dataResultR,
  dataResultd,setdataResultP, setShowModalG,setEnableEditResult}) {
  const [step2, setstep2] = useState(false)
 // const [idResult, setIdResult] = useState('')
 const {idResult, setIdResult, idResultEdit, 
  idStudyEdit }=useContext(MainContext)

    const formik = useFormik({
        initialValues: {
          //informe: idStudy,
          procedimiento:  '',
          reaccion: '',
          diagnostico_observaciones: '',
        },
       
        validateOnChange: false,
        onSubmit: async (formData, { resetForm }) => {
console.log(idResultEdit);
          if(type==='edit'){
            const newObjs={
              informe:idStudy,
              ...formData
             }
             
           try {
            const res=await putIHQ(idResultEdit,newObjs)
          
           if(res){
            toast.success("¡Actualización exitosa!", {
              autoClose: 1000,
            })
            window.location.reload();
           }
           
           } catch (error) {
            
           }
          }else{
            const newObjs={
              informe:idStudy,
              ...formData
             }
             
           try {
            const res=await postIHQ(newObjs)
         
           setIdResult(res.id)
           if(res){
            toast.success("¡Registro exitoso!", {
              autoClose: 1000,
            })
           }
           window.location.reload();
           } catch (error) {
            
           }
          }
       
          setShowModalG(false)
          setEnableEditResult(false)
        },
      });

  
      
      useEffect(() => {
        formik.setValues({
          procedimiento:  dataResultP,
          reaccion: dataResultR,
          diagnostico_observaciones: dataResultd,
  
        })
        return () => {
         
        }
      }, [dataResultP,dataResultR,dataResultd])
      
  return (
    <Modal
    size={"lg"}
  
     maxWidth='100%'
   // size='5xl'
     isOpen={showModal}
     onClose={toggleModal}
     >
     <ModalOverlay />
     <ModalContent bg="#ffff" borderRadius={"20px"}>
         <ModalHeader>
             <Button
                 borderRadius={'50%'}
                 colorScheme="blue"
                 width="40px"
                 height="40px"
                 marginLeft={'92%'}
                 marginTop={'-60px'}
                 bgColor={'#137797'}
                 color='#ffff'
                 onClick={toggleModal}>
                 <CloseButton />
             </Button>
         </ModalHeader>
         <ModalBody>
         <Box>
 
     <Box  display={'flex'} justifyContent={'center'} marginTop={'-30px'} marginBottom={'15px'}>
    { type==='edit' ?  <Title title={'Edita los datos'} />:
     <Title title={'Ingresa los datos'} />}
     </Box>
      <Box position={'relative'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-end'} px={'5px'} mx={'10px'}>

       {
        <InputOverall
          placeholder='Procedimiento'
          name={'procedimiento'}
          //defaultValue={dataResultP}
         
          value={formik.values.procedimiento}
          onChange={e => formik.setFieldValue('procedimiento', e.target.value)}
          //errors={formik.errors.ci_rif}
        />}
        <InputOverall
          placeholder='Reaccion'
          name={'reaccion'}
          value={formik.values.reaccion}
          onChange={e => formik.setFieldValue('reaccion', e.target.value)}
          //errors={formik.errors.razon_social}
        />
      
        <Textarea  placeholder='Diagnostico y observaciones'      
        name={'diagnostico_observaciones'}
          value={formik.values.diagnostico_observaciones}
          onChange={e => formik.setFieldValue('diagnostico_observaciones', e.target.value)}
        />
{/*<ArrowButton />*/}
       

      </Box>
    
      
      <Button
      marginTop={'10px'}
        // marginBottom={{ lg: '-6%', md: '-8%', sm: '-10%' }}
        marginLeft={{ lg: '82%', md: '70%', sm: '77%' }}
        borderRadius={'20px'}
        bgColor={'#137797'}
        color='#ffff'
        onClick={formik.handleSubmit}>
        Aceptar
      </Button>
    </Box>
         </ModalBody>
     </ModalContent>
 </Modal>
  )
}
