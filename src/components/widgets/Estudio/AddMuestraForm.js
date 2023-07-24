import { Box, Grid, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useFormik, validateYupSchema } from "formik";
import { postMuestra } from "api/controllers/estudios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputOverall from "../Inputs/InputOverall";
import { useContext } from "react";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import SaveButton from "../Buttons/SaveButton";
import GeneralButton from "../Buttons/GeneralButton";
import { postOrdenes } from "api/controllers/facturas";
import FinishButton from "../Buttons/FinishButton";

export default function AddMuestraForm({ setOpenModalSuccess, finish, setFinish }) {
  const { estudioId2, estudioID, setMuestraID, muestraID,setOrdenId,setEstudioID } = useContext(
    ModoVisualizacionContext
  );

  const formik = useFormik({
    initialValues: {
      tipo_de_muestra: "",
      descripcion: null,
      notas: "",
    },
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      if(muestraID){
        formik.resetForm()
       }
      const newObj = {
        estudio: estudioID || estudioId2,
        ...formData,
      };
      try {
        const muestraPost = await postMuestra(newObj);
        if (muestraPost) {
          console.log(muestraPost);
          setMuestraID(muestraPost.id);
          setEstudioID(muestraPost.estudio);
          toast.success("¡La muestra fue guardada con exito!", {
            autoClose: 1000,
          });
          setOpenModalSuccess(true);
      /* const newOrden = {
            estudio_ids: [muestraPost.estudio],
          };
          const postOrden = await postOrdenes(newOrden);
          console.log(postOrden);
         // setOrdenId(postOrden.id);

          setOpenModalSuccess(true);*/
        } else {
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
  const handleFinish = () => {
    if (muestraID) {
     
      setFinish(true);
    }
  };
  
  useEffect(() => {
   if(muestraID){
    //setOpenModalSuccess(true);
   }
    return () => {}
  }, [muestraID])

  useEffect(() => {
      
      
   console.log('postOrden ->');
   console.log(estudioID);
    const sendOrden = async () => {
      const newOrden = {
        estudio_ids: [estudioID]
      };
      const postOrden = await postOrdenes(newOrden);
      
     console.log(postOrden);
    };
    sendOrden();
  
 
}, [ estudioID]);
  
  
  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px", width: "100%" }}>
      <Text
        textAlign={"left"}
        fontSize={"17px"}
        fontWeight={'bold'}
        margin={{ lg: "15px auto 15px 5px", sm: "0px auto 0px auto" }}
        color={"gray.600"}
      >
        Agregar muestra
      </Text>

      <InputOverall
        placeholder="Tipo de muestra"
        name={"tipo_de_muestra"}
        value={formik.values.tipo_de_muestra}
        onChange={(e) =>
          formik.setFieldValue("tipo_de_muestra", e.target.value)
        }
      />
      {/* <InputOverall
        placeholder="Descripcion"
        name={"descripcion"}
        value={formik.values.descripcion}
        onChange={(e) => formik.setFieldValue("descripcion", e.target.value)}
      /> */}
      <Textarea
        marginTop={"10px"}
        size="lg"
        name="notas"
        borderRadius="md"
        placeholder="Notas:"
        value={formik.values.notas}
        onChange={(e) => formik.setFieldValue("notas", e.target.value)}
      />
      {/**muestraID && */}
      { (
        <Box w={"100%"} textAlign={"center"}>
          <GeneralButton
            text={"Agregar muestra"}
            handleClick={formik.handleSubmit}
          />
        </Box>
      )}
      {/*
        <Box marginTop={'20px'} w={"100%"} textAlign="end">
          <FinishButton handleSubmit={formik.handleSubmit} />
        </Box>
      */}
    </div>
  );
}
