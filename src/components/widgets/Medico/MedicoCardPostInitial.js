import { useState, useEffect, useContext } from "react";
import {
  Button,
  FormControl,
  Input,
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
} from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";
import { getMedicosList } from "api/controllers/medicos";
import { getMedicosDetail } from "api/controllers/medicos";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { postMedicos } from "api/controllers/medicos";
import Confirmacion from "views/Dashboard/RegistroAdministracion/Components/Confirmacion";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import InputOverall from "../Inputs/InputOverall";
import ShowMoreButton from "../Buttons/ShowMoreButton";
import SaveButton from "../Buttons/SaveButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../Modals/DeleteModal";
import { deletePaciente } from "api/controllers/pacientes";
import { deleteMedico } from "api/controllers/medicos";
import FilteredDataModal from "../Modals/FilteredDataModal";
import { thValuesMedicos } from "mocks";
import MainContext from "context/mainContext/MainContext";

const MedicoCardPostInitial = ({
 
  registro,
  setRegistro,
}) => {
  const { setFormValues,
    setMedicoID,medicoID } = useContext(ModoVisualizacionContext);
  const {activeTab, setActiveTab,setTwoState,twoState, setTwoStatee}=useContext(MainContext)

  
  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      especialidad: "",
      telefono_celular: "",
      email: "",
    },
    onSubmit: async (formData, { resetForm }) => {
      // se agregar resetForm para limpar los campos del formulario
      try {
        const guardarMedico = await postMedicos(formData);
        //console.log(guardarMedico)
        if (guardarMedico) {
          setMedicoID(guardarMedico.id)
          toast.success("¡El medico fue guardado correctamente!", {
            autoClose: 1500,
          });
          setActiveTab(2)
        } else {
          toast.error("¡Hubo un error al guardar el medico!", {
            autoClose: 1500,
          });
        }
        setFormValues(formData, "medico");
      } catch (error) {
        console.log(error);
      }
      return;
    },
  });
  //definicion de los valores a cargar
  const [medicos, setMedicos] = useState("");

  //para la tabla flotante, modal es la terminologia para ventana flotante
  const [mostrarModal, setMostrarModal] = useState(false);
  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };
  //consultar los datos de la api, mostrarlos en la lista
  const [tabla, setTabla] = useState([]);
  const [Busqueda, setBusqueda] = useState("");
  //consulta los datos de la api, mediante el metodo axios debe ser una peticion asincrona (async)
  const peticionGet = async () => {
    try {
      const medicosList = await getMedicosList();
      setMedicos(medicosList);
      setTabla(medicosList);
      //    console.log(pacientesList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    peticionGet();
  }, []);
  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
    filtrar(event.target.value);
  };

  const [medicoName, setMedicoName] = useState("");
 // const [medicoID, setMedicoID] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  //modal confirmacion eliminacion
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

  const toggleModalConfirmacion = (medico) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setMedicoName(medico.nombres);
    setMedicoID(medico.id);
    setEspecialidad(medico.especialidad);
  };

  const eliminarMedico = async (medicoID) => {
    console.log(medicoID);
    try {
      const medicoDelete = await deleteMedico(medicoID);
      setMedicos(medicos.filter((p) => p.id !== medicoID));
      setShowModalConfirmacion(!showModalConfirmacion);
      // Eliminar el paciente del estado local
    } catch (error) {
      console.log(error);
    }
  };

  //las condicionales y los metodos para filtrar los datos, el metodo filter, toLowerCase es
  //que toma minusculas y mayusculas por y minusculas
  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = tabla.filter((elemento) => {
      if (
        elemento.nombres
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.apellidos
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.especialidad
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setMedicos(resultadoBusqueda);
  };
  const seleccionarRegistro = async (medico) => {
    
    formik.setValues({
      nombres: medico?.nombres,
      apellidos: medico?.apellidos,
      especialidad: medico?.especialidad,
      telefono_celular: medico?.telefono_celular,
      email: medico?.email,
    });
    try {
      const medicosDetail = await getMedicosDetail(medico.id);
      setRegistro(medicosDetail);
      toggleModal(true);
      setTwoState("put");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      backgroundColor={"#FFFF"}
      boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
      padding={"30px"}
      borderRadius="20px"
      m={"1% 13% 5% 13%"}
    >
      <form>
        <Text fontSize={"20px"} margin="15px auto 30px auto" color={"gray.600"}>
          Información Personal
        </Text>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
          gap={{ lg: "20px", sm: "5px" }}
        >
          <InputOverall
            name="nombres"
            value={formik.values.nombres}
            placeholder="Nombres:"
            onChange={(e) => formik.setFieldValue("nombres", e.target.value)}
            errors={formik.errors.nombres}
          />

          <InputOverall
            name="Apellido"
            value={formik.values.apellidos}
            placeholder="Apellidos:"
            onChange={(e) => formik.setFieldValue("apellidos", e.target.value)}
            errors={formik.errors.apellidos}
          />
        </Grid>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
          gap={{ lg: "20px", sm: "5px" }}
        >
          <InputOverall
            name="Especialidad "
            value={formik.values.especialidad}
            placeholder="Especialidad:"
            onChange={(e) =>
              formik.setFieldValue("especialidad", e.target.value)
            }
            errors={formik.errors.especialidad}
          />
        </Grid>
        <Text fontSize={"20px"} margin="15px auto 30px auto" color={"gray.600"}>
          Información de Contacto
        </Text>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
          gap={{ lg: "20px", sm: "5px" }}
        >
          <InputOverall
            name="Email:"
            value={formik.values.email}
            placeholder="Email"
            onChange={(e) => formik.setFieldValue("email", e.target.email)}
            errors={formik.errors.email}
          />

          <InputOverall
            name="Telefono"
            value={formik.values.telefono_celular}
            placeholder="Telefono de Contacto:"
            onChange={(e) =>
              formik.setFieldValue("telefono_celular", e.target.value)
            }
            errors={formik.errors.telefono_celular}
          />
        </Grid>
      </form>

      <ShowMoreButton handleClick={toggleModal} />

      <FilteredDataModal
        type={"medics"}
        isOpenModal={mostrarModal}
        isToggleModal={toggleModal}
        Busqueda={Busqueda}
        thData={thValuesMedicos}
        tBodyData={medicos}
        handleSelectTBody={seleccionarRegistro}
        handleSelectIcon={toggleModalConfirmacion}
        //loading={loading}
        handleBusquedaChange={handleBusquedaChange}
      />

      <SaveButton handleSubmit={formik.handleSubmit} />

      <DeleteModal
        isOpen={showModalConfirmacion}
        onClose={toggleModalConfirmacion}
        id={medicoID}
        close={toggleModalConfirmacion}
        eliminar={eliminarMedico}
        nombres={medicoName}
      />
    </Box>
  );
};

export default MedicoCardPostInitial;
