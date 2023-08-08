import { useState, useEffect, useContext, useCallback } from "react";
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
import { putMedicos } from "api/controllers/medicos";
import { BackStation, NextStation } from "../Buttons/NextStation";
import { useMedicos } from "hooks/Medicos/useMedicos";
import { Title, Titlelight, SubTitlelight } from "../Texts";
import PhoneInputOverall from "../Inputs/PhoneInputOverall";
import debounce from "just-debounce-it";
import { useMedicoListBySearch } from "hooks/Medicos/useMedicosBySearch";



const MedicoCardPostInitial = ({
  registro,
  setRegistro,
  isLoading
}) => {
  const { setFormValues,
    setMedicoID, medicoID } = useContext(ModoVisualizacionContext);
  const { activeTab, setActiveTab, setTwoState, twoState } = useContext(MainContext);
  // const [medicos, setMedicos] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  // const [tabla, setTabla] = useState([]);
  const [Busqueda, setBusqueda] = useState("");
  const [medicoName, setMedicoName] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [countryCode, setCountryCode] = useState('ve');
  const [numberCode, setNumberCode] = useState('58');
  const [selectMedico, setSelectMedico] = useState('');
  const [search, setSearch] = useState("");
  
  //modal confirmacion eliminacion
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const {
    medicos,
    getMedicos,
    loading,
    error,
    setMedicos,
    tabla,
    setTabla
  } = useMedicos();

 const{medicosBySearch,
  loadingMedicosBySearch,
  errorMedicosBySearch,
  getMedicsBySearch,
  setmedicosBySearch}= useMedicoListBySearch({search})


  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      especialidad: "",
      telefono_celular: "" || null,
      email: "" || null,
    },
    validationSchema: Yup.object({
      //nombres: Yup.string().required("Los nombres son obligatorios"),
     // apellidos: Yup.string().required("Los apellidos son obligatorios"),
      //especialidad: Yup.string().required("Los apellidos son obligatorios"),
       email: Yup.string().email("Correo electrónico invalido")
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      if (twoState === 'post') {
        try {
          const guardarMedico = await postMedicos(formData);
          if (guardarMedico) {
            setMedicoID(guardarMedico.id)
            toast.success("¡El medico fue guardado correctamente!", {
              autoClose: 1500,
            });
            //setActiveTab(activeTab + 1)
          } else {
            toast.error("¡Hubo un error al guardar el medico!", {
              autoClose: 1500,
            });
          }
          setFormValues(formData, "medico");
          getMedicos();
        } catch (error) {
          toast.error(error.message, { autoClose: 1000 });
        }
      }
      if (twoState === 'put') {
        try {
          const guardarMedico = await putMedicos(formData);
          console.log(guardarMedico);
          if (guardarMedico) {
            setMedicoID(guardarMedico.id)
            toast.success("¡El medico fue guardado correctamente!", {
              autoClose: 1500,
            });
           // setActiveTab(activeTab + 1)
          } else {
            toast.error("¡Hubo un error al guardar el medico!", {
              autoClose: 1500,
            });
            formik.resetForm()
          }
          setFormValues(formData, "medico");
        } catch (error) {
          toast.error(error.message, { autoClose: 1000 });
        }
      }
    },
  });
  //definicion de los valores a cargar


  //para la tabla flotante, modal es la terminologia para ventana flotante

  const toggleModal = () => {
    getMedicos();
    setMostrarModal(!mostrarModal);
  };
  //consultar los datos de la api, mostrarlos en la lista

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
    const query = event.target.value;
    if (query.startsWith(" ")) return;
    
     setSearch(query);
    debouncedGetMedicosSearchResult(query)
   // filtrar(event.target.value);
  };



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

useEffect(() => {
  return () => {
    setmedicosBySearch([])
    setMedicos([])
    setSearch('')
  }
}, [mostrarModal])

  const debouncedGetMedicosSearchResult = useCallback(
    debounce((search) => {
      if (search === "") {
        getMedicos()
      } if (search.length > 0) {      
        getMedicsBySearch({search})
        setMedicos(medicosBySearch)
      }     
    }, 500),
    []
  );

  const seleccionarRegistro = async (medico) => {

    formik.setValues({
      id: medico?.id,
      nombres: medico?.nombres,
      apellidos: medico?.apellidos,
      especialidad: medico?.especialidad,
      telefono_celular: medico?.telefono_celular,
      email: medico?.email,
    });
    setSelectMedico(medico?.telefono_celular)
    try {
      const medicosDetail = await getMedicosDetail(medico.id);
      setRegistro(medicosDetail);
      toggleModal(true);
      setTwoState('put');
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
      mx={{sm:'3%',lg:'10%',md:'10%'}}
      my={{sm:'3%',lg:'2%',md:'2%'}}
     // m={"1% 13% 5% 13%"}
    >
      
      <form>
        <Box margin={'5px'} padding={'5px'}>
          <Title
            title={'Información personal'}
          >
          </Title>
        </Box>
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
        <Box margin={'5px'} padding={'5px'}>
          <Title
            title={'Información de contacto'}
          >
          </Title>
        </Box>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
          gap={{ lg: "20px", sm: "5px" }}
        >
          <InputOverall
            name="email"
            type={'email'}
            value={formik.values.email}
            placeholder="Email:"
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
            errors={formik.errors.email}
          />

         {/* <InputOverall
            name="Telefono"
            value={formik.values.telefono_celular}
            placeholder="Telefono de Contacto:"
            onChange={(e) =>
              formik.setFieldValue("telefono_celular", e.target.value)
            }
            errors={formik.errors.telefono_celular}
          />*/}
           
             {selectMedico ?
          <div>
           <InputOverall
              name="Telefono"
              value={formik.values.telefono_celular}
              //placeholder="Telefono de Contacto:"
              onChange={(e) =>
                formik.setFieldValue("telefono_celular", e.target.value)
              }
              errors={formik.errors.telefono_celular}
            />
          
          </div>:
          <PhoneInputOverall name="Telefono" 
             value={formik.values.telefono_celular}
             onChange={(e) =>
              formik.setFieldValue("telefono_celular", e.target.value)
            }
            numberCode={numberCode}
             setNumberCode={setNumberCode}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
             errors={formik.errors.telefono_celular}
             placeholder="4247423185"
            />
        
        }
        </Grid>
      </form>

      <Box marginTop={'10px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        

       <BackStation />
       <ShowMoreButton handleClick={toggleModal} />
        <SaveButton handleSubmit={formik.handleSubmit} isLoading={isLoading} />
        <NextStation  errors={formik.values.email} handleNextSubmit={formik.handleSubmit} />
      </Box>
      <FilteredDataModal
          type={"medics"}
          isOpenModal={mostrarModal}
          isToggleModal={toggleModal}
          Busqueda={search}
          thData={thValuesMedicos}
          tBodyData={search ? medicosBySearch : medicos}
          handleSelectTBody={seleccionarRegistro}
          handleSelectIcon={toggleModalConfirmacion}
          loading={loading}
          handleBusquedaChange={handleBusquedaChange}
        />

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
