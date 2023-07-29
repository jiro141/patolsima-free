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
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalBody,
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
import { Title, subTitleBold, Titlelight, TitleBig, TitleBigW } from "../Texts";
import FinishButton from "../Buttons/FinishButton";
import GeneralButton from "../Buttons/GeneralButton";
import { postMuestra } from "api/controllers/estudios";
import ModalFacturacion from "views/Dashboard/Facturacion/components/ModalFacturacion";

const Muestra = () => {
  const {
    dataPaciente,
    dataMedico,
    pacienteID,
    medicoID,
    estudioID,
    muestraID,
    setEstudioID,
    estudioId2,
    setMuestraID
  } = useContext(ModoVisualizacionContext);

  //definicion de los valores a cargar
  const [createSuccess, setCreateSuccess] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();
  const [studyData, setStudyData] = useState();
  const [finish, setFinish] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmOtherMuestra, setConfirmOtherMuestra] = useState(false);
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
          setCreateSuccess(true)
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


  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const formikMuestra = useFormik({
    initialValues: {
      tipo_de_muestra: "",
      descripcion: null,
      notas: "",
    },
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      formikMuestra.resetForm()
      if(muestraID){
        //formikMuestra.resetForm()
       }
      const newObj = {
        estudio: estudioID ,
        ...formData,
      };
      try {
        const muestraPost = await postMuestra(newObj);
        if (muestraPost) {
          //console.log(muestraPost);
          setMuestraID(muestraPost.id);
          setEstudioID(muestraPost.estudio);
          toast.success("¡La muestra fue guardada con exito!", {
            autoClose: 1000,
          });
          
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
 
  const handleFinishRegister=()=>{
    setOpenModalSuccess(true);
  }
  const handleEnableNewMuestra=()=>{
    setConfirmOtherMuestra(true)
    formikMuestra.handleSubmit()
  }
  return (
    <div style={{ height: "auto" }}>
      <Box display={'flex'} justifyContent={'center'} margin={'5px'}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#137797'} p={'10px'} borderRadius={'100%'} width={'50px'} height={'50px'}>
        <TitleBigW
            title={'1'}
          />
        </Box>
      
      </Box>
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
           disabled={estudioID ? true :false}
            id="envio_digital"
            checked={formik.values.envio_digital}
            onChange={(e) =>
              formik.setFieldValue("envio_digital", e.target.checked)
            }
            label={"Envio digital"}
            name={"envio_digital"}
          />

          <Switch_
           disabled={estudioID ? true :false}
            id="urgente"
            name="urgente"
            checked={formik.values.urgente}
            onChange={(e) => formik.setFieldValue("urgente", e.target.checked)}
            label={"Urgente"}
          />

          {<FormControl  display="flex" alignItems="center" justifyContent={'left'} marginTop={"5px"}>
            <input type="file" accept=".pdf" onChange={handleFileChange}
              style={{ display: 'none' }} ref={fileInputRef} />
            <Text style={{fontSize:'15px',marginRight:'8px'}}>{selectedFile ? selectedFile.name : 'Subir archivo'}</Text>
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
          disabled={estudioID ? true :false}
          placeholder="Notas de estudio:"
          value={formik.values.notas}
          onChange={(e) => formik.setFieldValue("notas", e.target.value)}
        />

        {  <AddMuestraForm type={'muestra1'} muestraID={muestraID} finish={finish} setFinish={setFinish} setOpenModalSuccess={setOpenModalSuccess} formikMuestra={formikMuestra} confirmOtherMuestra={confirmOtherMuestra} />}

        { <SuccessModal confirm={confirm} setConfirm={setConfirm} isOpen={openModalSuccess} setOpenModal={setOpenModalSuccess} />}
      </form>

      {(
        <Box marginTop={'20px'} w={"100%"} display={'flex'} justifyContent={'space-between'} >
          
         { muestraID ? 
         <GeneralButton
            text={ "Agregar otra muestra"}
            disabled={estudioID ? false : true}
            handleClick={handleEnableNewMuestra}
          />:
          <GeneralButton
            text={ "Agregar muestra"}
            disabled={estudioID ? false : true}
            handleClick={formikMuestra.handleSubmit}
          />
          }
           {estudioID && muestraID ?<GeneralButton
            text={"Finalizar registro "}
            handleClick={handleFinishRegister}
          />:
          <GeneralButton
            text={"Guardar estudio"}
            handleClick={handleSubmit}
            disabled={createSuccess ? true : false}
          />
          }
        </Box>
      )}















    </div>
  );
};

export default Muestra;
