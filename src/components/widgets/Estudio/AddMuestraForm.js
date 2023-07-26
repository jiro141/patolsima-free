import { Box, Grid, Input, Text, Textarea, Tooltip } from "@chakra-ui/react";
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
import { Title, subTitleBold, Titlelight } from "../Texts";

export default function AddMuestraForm({ formikMuestra,confirmOtherMuestra,type }) {
  const { estudioId2, estudioID, setMuestraID, muestraID,setOrdenId,setEstudioID,muestraID2 } = useContext(
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
      if(muestraID || muestraID2 ){
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
      
      
 /*  console.log('postOrden ->');
   console.log(estudioID);
    const sendOrden = async () => {
      const newOrden = {
        estudio_ids: [estudioID]
      };
      const postOrden = await postOrdenes(newOrden);
      
     console.log(postOrden);
    };
    sendOrden();
  */
 
}, [ estudioID]);
  
  
  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px", width: "100%" }}>
      <Box marginY={'15px'}>
        <Title
          title={'Agregar muestra'}
        >
        </Title>
      </Box>
     {type==='muestra1'? <>
      <InputOverall
        placeholder="Tipo de muestra"
        disabled={estudioID  ? false : true}
        name={"tipo_de_muestra"}
        value={formikMuestra.values.tipo_de_muestra}
        onChange={(e) =>
          formikMuestra.setFieldValue("tipo_de_muestra", e.target.value)
        }
      />
   
      <Textarea
        marginTop={"10px"}
        disabled={estudioID ? false : true}
        size="lg"
        name="notas"
        borderRadius="md"
        placeholder="Notas de muestra:"
        value={formikMuestra.values.notas}
        onChange={(e) => formikMuestra.setFieldValue("notas", e.target.value)}
      />
      </>
    :
    <>
      <InputOverall
        placeholder="Tipo de muestra 2:"
        disabled={estudioId2  ? false : true}
        name={"tipo_de_muestra"}
        value={formikMuestra.values.tipo_de_muestra}
        onChange={(e) =>
          formikMuestra.setFieldValue("tipo_de_muestra", e.target.value)
        }
      />
   
      <Textarea
        marginTop={"10px"}
        disabled={estudioId2 ? false : true}
        size="lg"
        name="notas"
        borderRadius="md"
        placeholder="Notas de muestra 2:"
        value={formikMuestra.values.notas}
        onChange={(e) => formikMuestra.setFieldValue("notas", e.target.value)}
      />
      </>
    
    }
      
     
    </div>
  );
}
