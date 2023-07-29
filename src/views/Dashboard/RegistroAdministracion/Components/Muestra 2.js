import { useState, useEffect, useContext, useRef } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseButton,
  Link,
  Box,
  Center,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Switch,
  chakra,
  Textarea,
  Select,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { postStudies } from "api/controllers/estudios";
import { BsFolderPlus } from "react-icons/bs";
import InputSelector from "components/widgets/Inputs/InputSelector";
import { typeStudies } from "mocks";
import Switch_ from "components/widgets/Switchs/Switch";
import AddMuestraForm from "components/widgets/Estudio/AddMuestraForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessModal from "components/widgets/Modals/SuccessModal";
import { generateUniqueId } from "helpers";
import { postOrdenes } from "api/controllers/facturas";
import { NextStation } from "components/widgets/Buttons/NextStation";
import SaveButton from "components/widgets/Buttons/SaveButton";
import { Title, subTitleBold, Titlelight } from "components/widgets/Texts";
import GeneralButton from "components/widgets/Buttons/GeneralButton";
import { postMuestra } from "api/controllers/estudios";
import { TitleBig } from "components/widgets/Texts";
import { TitleBigW } from "components/widgets/Texts";
const Muestra2 = () => {
  const {
    estudioID,
    muestraID,
    dataPaciente,
    dataMedico,
    pacienteID,
    estudioId2,
    medicoID,
    setEstudioId2,
    muestraID2, setMuestraID2
  } = useContext(ModoVisualizacionContext);
  // console.log(estudioId2);

  //definicion de los valores a cargar
  const [createSuccess, setCreateSuccess] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [studyData, setStudyData] = useState();
  const [finish, setFinish] = useState(false);
  // const history = useHistory();

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
      notas: "" || null,
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
      //console.log(formData);
      const newObj = {
        paciente_id: pacienteID,
        medico_tratante_id: medicoID || null,
        patologo_id: null,
        ...formData,
      };
      console.log(newObj);
      console.log('crear estudio 2 -->>');
      try {
        const estudioPost = await postStudies(newObj);

        if (estudioPost) {
          toast.success("¡El estudio fue creado con exito!", {
            autoClose: 1000,
          });
          console.log(estudioPost);
          setStudyData(estudioPost);
          setEstudioId2(estudioPost.id);
          setCreateSuccess(true)
          //setOpenModal(true);
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
      if (estudioId2 && muestraID && !estudioID) {
        const newOrden = {
          estudio_ids: [estudioId2, estudioID]
        }
        const postOrden = await postOrdenes(newOrden)
        // console.log(postOrden)

      }
     if(estudioId2){
        const newOrden={
          estudio_ids: [estudioID,estudioId2]
        }
        const postOrden =await postOrdenes(newOrden)
        console.log(postOrden)
        
       }
    }

    sendOrden()
    return () => {

    }*/
  }, [estudioId2])

  const uniqueId = generateUniqueId();
  //const fileInputRef = useRef(null);
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
     /* if(muestraID){
        formikMuestra.resetForm()
       }*/
      const newObj = {
        estudio: estudioId2 ,
        ...formData,
      };
      try {
        const muestraPost = await postMuestra(newObj);
        if (muestraPost) {
          //console.log(muestraPost);
          setMuestraID2(muestraPost.id);
          //setEstudioID(muestraPost.estudio);
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
  return (
    <div style={{ height: "auto" }}>
      <Box display={'flex'} justifyContent={'center'} margin={'5px'}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#137797'} p={'10px'} borderRadius={'100%'} width={'50px'} height={'50px'}>
        <TitleBigW
            title={'2'}
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
            <Text marginBottom={"15px"}>
              <Badge>
                {dataPaciente.nombres} {dataPaciente.apellidos}
              </Badge>
            </Text>
            <Titlelight title={'Cédula de Identidad:'} marginBottom={"15px"} >
            </Titlelight>
            <Text marginBottom={"15px"}>
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
            disabled={estudioId2 ? true :false}
            checked={formik.values.envio_digital}
            onChange={(e) =>
              formik.setFieldValue("envio_digital", e.target.checked)
            }
            label={"Envio digital"}
            name={"envio_digital"}
          />

          <Switch_
           disabled={estudioId2 ? true :false}
            id="urgente"
            name="urgente"
            checked={formik.values.urgente}
            onChange={(e) => formik.setFieldValue("urgente", e.target.checked)}
            label={"Urgente"}
          />

          {<FormControl display="flex" alignItems="center" justifyContent={'left'} marginTop={"5px"}>
            <input type="file" accept=".pdf" onChange={handleFileChange}
              style={{ display: 'none' }} ref={fileInputRef} />
            <Text style={{fontSize:'15px',marginRight:'8px'}}>{selectedFile ? selectedFile.name : 'Subir archivo'}</Text>
            <Button type="button" onClick={handleUpload}>
              <BsFolderPlus color="#137797" />
            </Button>
          </FormControl>}
        </Grid>
        <Textarea
         disabled={estudioId2 ? true :false}
          marginTop={"10px"}
          size="lg"
          name="notas"
          borderRadius="md"
          placeholder="Notas de estudio 2:"
          value={formik.values.notas}
          onChange={(e) => formik.setFieldValue("notas", e.target.value)}
        />

        {
          <AddMuestraForm muestraID={muestraID2} setOpenModalSuccess={setOpenModalSuccess} 
          formikMuestra={formikMuestra}
          />}
        { <SuccessModal type={'muestra2'} isOpen={openModalSuccess} setOpenModal={setOpenModalSuccess} />}
      </form>
      {(
        <Box marginTop={'20px'} w={"100%"} display={'flex'} justifyContent={'space-between'} >
          
           <GeneralButton
            text={ muestraID2 ?"Agregar otra muestra" : "Agregar muestra"}
            disabled={estudioId2 ? false : true}
            handleClick={formikMuestra.handleSubmit}
          />
       
          
          
         
           {estudioId2 && muestraID2 ?<GeneralButton
            text={"Finalizar registro "}
            handleClick={handleFinishRegister}
          />:
          <GeneralButton
            text={"Guardar estudio 2"}
            disabled={createSuccess ? true : false}
            handleClick={handleSubmit}
          />
          }
         {/* <SaveButton type='studio' handleSubmit={handleSubmit} />*/}
        </Box>
      )}
    </div>
  );
};

export default Muestra2;
