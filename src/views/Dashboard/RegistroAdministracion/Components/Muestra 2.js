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
  } = useContext(ModoVisualizacionContext);
  console.log(estudioId2);

  //definicion de los valores a cargar
  const [openModal, setOpenModal] = useState(false);
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
      notas: " ",
      urgente: false,
      envio_digital: false,
      tipo: "",
    },
    validationSchema: Yup.object({
      notas: Yup.string().required("El campo es obligatorio"),
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
      try {
        const estudioPost = await postStudies(newObj);

        if (estudioPost) {
          toast.success("¡El estudio fue creado con exito!", {
            autoClose: 1000,
          });
          console.log(estudioPost);
          setStudyData(estudioPost);
          setEstudioId2(estudioPost.id);

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
    const sendOrden = async () => {
      if (estudioId2 && muestraID && !estudioID) {
        const newOrden = {
          estudio_ids: [estudioId2]
        }
        const postOrden = await postOrdenes(newOrden)
        console.log(postOrden)

      }
      /* if(estudioId2){
        const newOrden={
          estudio_ids: [estudioID,estudioId2]
        }
        const postOrden =await postOrdenes(newOrden)
        console.log(postOrden)
        
       }*/
    }

    sendOrden()
    return () => {

    }
  }, [estudioId2])

  const uniqueId = generateUniqueId();
  //const fileInputRef = useRef(null);
  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <div style={{ height: "auto" }}>
      <NextStation />
      <form>
        <Grid marginY={'15px'} templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }} gap={{ lg: "100px", md: '20px', sm: '15px' }} >
          <Text  fontSize={'17px'} fontWeight={'bold'} >
            Información General
          </Text>
          <Box display={'flex'}>
            <Text  Text fontSize={'17px'} fontWeight={'bold'} 
            >
              {`Estudio N°: `}
            </Text>
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
            <subTitleBold marginBottom={"1.5%"} >
              Paciente
            </subTitleBold>
            <Text marginBottom={"15px"}>
              <Badge>
                {dataPaciente.nombres} {dataPaciente.apellidos}
              </Badge>
            </Text>
            <subTitleBold marginBottom={"15px"}>
              Cédula de Identidad
            </subTitleBold>
            <Text marginBottom={"15px"}>
              <Badge>{dataPaciente.ci}</Badge>
            </Text>
          </Box>
          <Box>
            <subTitleBold marginBottom={"15px"} fontSize={"17px"}>
              Médico tratante
            </subTitleBold>
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
          <Box>
            <Title
              textAlign={"left"}
              margin={{ lg: "15px auto 0 5px", sm: "0px auto 0px auto" }}
              color={"gray.600"}
            >
              Datos de Estudio
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

        {estudioId2 &&
          <AddMuestraForm muestraID={muestraID} finish={finish} setFinish={setFinish} setOpenModalSuccess={setOpenModalSuccess} />}
        {openModalSuccess && <SuccessModal isOpen={openModalSuccess} setOpenModal={setOpenModal} />}
      </form>
      {!estudioId2 && (
        <Box marginTop={'20px'} w={"100%"} textAlign="end">
          <SaveButton handleSubmit={handleSubmit} />
        </Box>
      )}
    </div>
  );
};

export default Muestra2;
