import { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  Grid,
  Link,
  Box,
  Textarea,
  Select,
  Badge,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postStudies } from "api/controllers/estudios";
import { BsFolderPlus } from "react-icons/bs";
import InputSelector from "../Inputs/InputSelector";
import { typeStudies } from "mocks";
import Switch_ from "../Switchs/Switch";
import AddMuestraForm from "./AddMuestraForm";
//import GeneralButton from "../Buttons/GeneralButton";
import SaveButton from "../Buttons/SaveButton";
import { generateUniqueId } from "helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import AddFileModal from "../Modals/AddFileModal";
//import MainContext from "context/mainContext/MainContext";
import { postOrdenes } from "api/controllers/facturas";
import { postMuestraAdjunto } from "api/controllers/estudios";
import { useHistory } from "react-router-dom";
import SuccessModal from "../Modals/SuccessModal";
import { NextStation } from "../Buttons/NextStation";
import { Title, subTitleBold, Titlelight } from "../Texts";
import FinishButton from "../Buttons/FinishButton";

const Muestra = () => {
  const {
    dataPaciente,
    dataMedico,
    pacienteID,
    medicoID,
    estudioID,
    muestraID,
    setEstudioID,
    estudioId2
  } = useContext(ModoVisualizacionContext);

  //definicion de los valores a cargar
  const [openModal, setOpenModal] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();
  const [studyData, setStudyData] = useState();
  const [finish, setFinish] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    fileInputRef.current.click();

  };

  //carga de los datos del formulario
  const formik = useFormik({
    initialValues: {
      notas: '' || null,
      urgente: false,
      envio_digital: false,
      tipo: "",
    },
    validationSchema: Yup.object({
      // notas: Yup.string().required("El campo es obligatorio"),
      tipo: Yup.string().required("El campo es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      //console.log(pacienteID)
      const newObj = {
        paciente_id: pacienteID,
        medico_tratante_id: medicoID || null,
        patologo_id: null,
        ...formData,
      };
      //console.log(newObj);
      try {
        const estudioPost = await postStudies(newObj);

        if (estudioPost) {
          toast.success("¡El estudio fue creado con exito!", {
            autoClose: 1000,
          });
          // console.log(estudioPost);
          setStudyData(estudioPost);
          setEstudioID(estudioPost.id);

          // console.log(studyData);
          setOpenModal(true);
        } else {
          toast.error("¡Hubo un error al crear el estudio!", {
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.log(error);
      }
      return;
    },
  });
  useEffect(() => {
    /*  const sendOrden = async () => {
        if (muestraID ) {
          const newOrden = {
            estudio_ids: [estudioID]
          }
          const postOrden = await postOrdenes(newOrden)
          console.log(postOrden)
  
        }
         if(estudioId2){
          const newOrden={
            estudio_ids: [estudioID,estudioId2]
          }
          const postOrden =await postOrdenes(newOrden)
          console.log(postOrden)
          
         }
      }
  */

  }, [estudioID])

  console.log('confirmacion', confirm);
  if (confirm) {
    useEffect(() => {
      const sendOrden = async () => {
        const newOrden = {
          estudio_ids: [estudioID]
        };
        const postOrden = await postOrdenes(newOrden);
        // console.log(postOrden);
      };
      sendOrden();
    }, [confirm, estudioID]);
  }





  useEffect(() => {
    const postDoc = async () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
          const resAdjunto = await postMuestraAdjunto(estudioID, formData)
          // console.log(resAdjunto)
        } catch (error) {
          console.log(error)
        }
      }
    }
    postDoc()
    return () => { }
  }, [estudioID])


  // console.log(finish);
  // console.log(muestraID);
  const uniqueId = generateUniqueId();
  const handleSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <div style={{ height: "auto" }}>
      {/* <NextStation /> */}
      <form>
        <Grid marginY={'15px'} templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }} gap={{ lg: "100px", md: '20px', sm: '15px' }} >
          <Title
            title={'Información General'}
          >
          </Title>
          <Box display={'flex'}>
            <Title
              title={'Estudio N°:'}
            >
            </Title>
            {
              studyData ? (
                <Box>
                  <Text
                    textAlign={"right"}
                    fontSize={"18px"}
                    // margin={{ lg: "15px auto 0 5px", sm: "0px auto 10px auto" }}
                    color={"gray.600"}
                  >
                    <Badge fontSize={"15px"} >{studyData.codigo}</Badge>
                  </Text>
                </Box>
              ) :
                <></>
            }
          </Box>
        </Grid>
        <Grid templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }} gap="100px">
          <Box>
            <Titlelight title={'Paciente:'} marginBottom={"15px"} >
            </Titlelight>
            <Text marginBottom={'15px'}>
              <Badge>
                {dataPaciente.nombres} {dataPaciente.apellidos}
              </Badge>
            </Text>
            <Titlelight title={'Cédula de Identidad:'} marginBottom={"15px"} >
            </Titlelight>
            <Text marginBottom={'15px'}>
              <Badge>{dataPaciente.ci}</Badge>
            </Text>
          </Box>
          <Box>
            <Titlelight title={'Médico tratante:'} marginBottom={"15px"} >
            </Titlelight>
            <Text>
              <Badge>
                {dataMedico.nombres} {dataMedico.apellidos}
              </Badge>
            </Text>
          </Box>
        </Grid>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
          gap="20px"
        ></Grid>
        <Grid templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }} gap="100px">
          <Box marginBottom={'15px'}>
          <Title
            title={'Datos de estudio'}
          >
          </Title>
          </Box>

        </Grid>

        <Grid templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }} gap="100px">
          <InputSelector
            name="tipo"
            errors={formik.errors.tipo}
            value={formik.values.tipo}
            error={formik.errors.tipo}
            onChange={(e) => formik.setFieldValue("tipo", e.target.value)}
            options={typeStudies}
            type={"Tipo de Estudio:"}
          />
        </Grid>
        <Grid
          templateColumns={{ lg: "repeat(3,1fr)", sm: "1fr" }}
          gap="10px"
          marginY={"2%"}

        >
          <Switch_
            id="envio_digital"
            checked={formik.values.envio_digital}
            onChange={(e) =>
              formik.setFieldValue("envio_digital", e.target.checked)
            }
            label={"Envio digital"}
            name={"envio_digital"}
          />

          <Switch_
            id="urgente"
            name="urgente"
            checked={formik.values.urgente}
            onChange={(e) => formik.setFieldValue("urgente", e.target.checked)}
            label={"Urgente"}
          />

          {<FormControl display="flex" alignItems="center" justifyContent={'left'} marginTop={"5px"}>
            <input type="file" accept=".pdf" onChange={handleFileChange}
              style={{ display: 'none' }} ref={fileInputRef} />
            <FormLabel>{selectedFile ? selectedFile.name : 'Sube un archivo'}</FormLabel>
            <Button type="button" onClick={handleUpload}>
              <BsFolderPlus color="#137797" />
            </Button>
          </FormControl>}
        </Grid>
        <Textarea
          marginTop={"10px"}
          size="lg"
          name="notas"
          borderRadius="md"
          placeholder="Notas:"
          value={formik.values.notas}
          onChange={(e) => formik.setFieldValue("notas", e.target.value)}
        />

        {estudioID && <AddMuestraForm muestraID={muestraID} finish={finish} setFinish={setFinish} setOpenModalSuccess={setOpenModalSuccess} />}
        {finish && <SuccessModal confirm={confirm} setConfirm={setConfirm} isOpen={openModalSuccess} setOpenModal={setOpenModal} />}
      </form>

      {!estudioID && (
        <Box marginTop={'20px'} w={"100%"} textAlign="end">
          <SaveButton handleSubmit={handleSubmit} />
        </Box>
      )}

    </div>
  );
};

export default Muestra;
