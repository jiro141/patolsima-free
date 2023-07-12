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
import SuccessModal from "components/widgets/Modals/SuccessModal";
import { generateUniqueId } from "helpers";

const Muestra2 = () => {
  const {
    dataPaciente,
    dataMedico,
    pacienteID,
    estudioId2,
    setEstudioId2,
  } = useContext(ModoVisualizacionContext);


  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      tipo: "CITOLOGIA_GINECOLOGICA",
      urgente: false,
      envio_digital: false,
      patologo_id: null,
      notas: "",
    },
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      const newObj = {
        paciente_id: pacienteID,
        medico_tratante_id: medicoID,
        patologo_id: null,
        ...formData,
      };
      try {
        const estudioPost = await postStudies(newObj);
        setEstudioId2(estudioPost.id);
      } catch (error) {
        console.log(error);
      }
      return;
    },
  });

  const uniqueId = generateUniqueId();
  //const fileInputRef = useRef(null);
 
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async() => {
    fileInputRef.current.click();
   
  };

  return (
    <>
      <form>
        <Text fontSize={"20px"} margin={"2% auto 2% auto"} color={"gray.600"}>
          Información General
        </Text>
        <Grid templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }} gap="20px">
          <Box>
            <Text marginBottom={"1.5%"} fontSize={"17px"}>
              Paciente
            </Text>
            <Text>
              {dataPaciente.nombres} {dataPaciente.apellidos}
            </Text>
            <Text marginY={"1.5%"} fontSize={"17px"}>
              Cédula de Identidad
            </Text>
            <Text>{dataPaciente.ci}</Text>
          </Box>
          <Box>
            <Text marginBottom={"1.5%"} fontSize={"17px"}>
              Médico tratante
            </Text>
            <Text>
              {dataMedico.nombres} {dataMedico.apellidos}
            </Text>
          </Box>
        </Grid>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
          gap="20px"
        ></Grid>
        <Grid templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }} gap="20px">
          <Box>
            <Text
              textAlign={"left"}
              fontSize={"20px"}
              margin={{ lg: "15px auto 0 30px", sm: "15px auto 5px auto" }}
              color={"gray.600"}
            >
              Datos de Estudio
            </Text>
          </Box>
          <Box>
            <Text
              textAlign={"left"}
              fontSize={"18px"}
              margin={{ lg: "15px auto 0 auto", sm: "0px auto 10px auto" }}
              color={"gray.600"}
            >
              Estudio N°: <Badge>{`${uniqueId}`}</Badge>
            </Text>
          </Box>
        </Grid>
        <Grid templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }} gap="20px">

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
          gap="20px"
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
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            marginTop={"5px"}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <FormLabel>
              {selectedFile ? selectedFile.name : "Sube un archivo"}
            </FormLabel>
            <Button type="button" onClick={handleUpload}>
              <BsFolderPlus color="#137797" />
            </Button>
          </FormControl>
        </Grid>

        <Textarea
          marginTop={"10px"}
          size="lg"
          name="notas"
          borderRadius="md"
          placeholder="notas:"
          value={formik.values.notas}
          onChange={(e) => formik.setFieldValue("notas", e.target.value)}
        />

        {estudioId2 && (
          <AddMuestraForm setOpenModalSuccess={setOpenModalSuccess} />
        )}
        {openModalSuccess && (
          <SuccessModal isOpen={openModalSuccess} setOpenModal={setOpenModal} />
        )}
      </form>
    </>
  );
};

export default Muestra2;
