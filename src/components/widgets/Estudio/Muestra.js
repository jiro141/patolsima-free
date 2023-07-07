import { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  Grid,
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
} from "@chakra-ui/react";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { postStudies } from "api/controllers/estudios";
import { BsFolderPlus } from "react-icons/bs";
import InputOverall from "../Inputs/InputOverall";
import InputSelector from "../Inputs/InputSelector";
import { typeStudies } from "mocks";
import Switch_ from "../Switchs/Switch";
import AddMuestraForm from "./AddMuestraForm";
import GeneralButton from "../Buttons/GeneralButton";
import SaveButton from "../Buttons/SaveButton";
import { generateUniqueId } from "helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFileModal from "../Modals/AddFileModal";

const Muestra = () => {
  const { dataPaciente, dataMedico, pacienteID,medicoID, estudioID,
    setEstudioID, muestraID } = useContext(
    ModoVisualizacionContext
  );
  //definicion de los valores a cargar
  const [estudiot, setEstudiot] = useState("");
  const [estudioa, setEstudioa] = useState("");
  const [precio, setPrecio] = useState("");
  const [tmuestra, setTmuestra] = useState("");
  const [notas, setNotas] = useState("");
  const [archivo, setAchivo] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Aquí puedes realizar las operaciones que desees con el archivo seleccionado
    console.log(file);
  };
  console.log(medicoID);
  //carga de los datos del formulario
  const formik = useFormik({
    initialValues: {
        notas: " ",
        urgente: false,
      envio_digital: false,
      tipo: "CITOLOGIA_GINECOLOGICA",
  
    },
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      //console.log(formData);
      const newObj={
        paciente_id: pacienteID,
    medico_tratante_id: medicoID,
    patologo_id: null,
    ...formData
      }
      try {
        const estudioPost = await postStudies(newObj);
        if(estudioPost){
          toast.success("¡El estudio fue creado con exito!", {
            autoClose: 1000,
          });
          setEstudioID(estudioPost.id)
          setOpenModal(true)
        }else{
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
  
  

  //agregar los inputs de mas muestras
  const [inputs, setInputs] = useState([]);

  const addInputs = () => {
    if (inputs.length < 6) {
      setInputs([...inputs, {}]);
    }
  };
  
  const uniqueId = generateUniqueId();
  const handleSubmit=()=>{
    formik.handleSubmit()
  }
  return (
    <div style={{height:"auto"}}>
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
              margin={{ lg: "15px auto 0 5px", sm: "0px auto 0px auto" }}
              color={"gray.600"}
            >
              Datos de Estudio
            </Text>
          </Box>
          <Box>
            <Text
              textAlign={"left"}
              fontSize={"18px"}
              margin={{ lg: "15px auto 0 5px", sm: "0px auto 10px auto" }}
              color={"gray.600"}
            >
              
             { `Estudio N°: `}
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
          <Box>
            <Text
              textAlign={"left"}
              fontSize={"18px"}
             // margin={{ lg: "15px auto 0 5px", sm: "0px auto 10px auto" }}
              color={"gray.600"}
            >
              
             { `${uniqueId} `}
            </Text>
          </Box>
     
           
          
        </Grid>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
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
           

          {/* <FormControl display='flex' alignItems='center'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <FormLabel>Agregar adjuntos</FormLabel>
                        <Button type="button" onClick={handleButtonClick}>
                            <BsFolderPlus color="#137797" />
                        </Button>

                    </FormControl>*/}
                  
        </Grid>
        <Textarea
           marginTop={'10px'}
           size="lg"
           name='notas'
           borderRadius="md"
           placeholder="notas"
           value={formik.values.notas}
           onChange={e => formik.setFieldValue('notas', e.target.value)}
            />
      
       

      {openModal && <AddMuestraForm />}
      {estudioID && <AddFileModal isOpen={openModal} setOpenModal={setOpenModal} />}
      </form>
     
     
     

     {!estudioID &&  <Box w={"100%"} textAlign="end">
      <SaveButton handleSubmit={handleSubmit} />
      </Box>}

     
    </div>
  );
};

export default Muestra;
