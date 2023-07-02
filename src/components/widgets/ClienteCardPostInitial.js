import { useState, useEffect, useContext } from "react";
import {
  Text,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Link,
  Box,
  Center,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import {
  getPacientesList,
  getPacientesDetail,
} from "api/controllers/pacientes";
import { postPacientes } from "api/controllers/pacientes";
import { deletePaciente } from "api/controllers/pacientes";
import { BsFillTrashFill } from "react-icons/bs";
import Confirmacion from "views/Dashboard/RegistroAdministracion/Components/Confirmacion";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputOverall from "./Inputs/InputOverall";
import InputSelector from "./Inputs/InputSelector";
import { selectorOptionsGenders } from "mocks";
import SaveButton from "./Buttons/SaveButton";
import ShowMoreButton from "./Buttons/ShowMoreButton";
import InputSearch from "./Inputs/InputSearch";
import CloseButtonL from "./Buttons/CloseButton";

const ClienteCardPostInitial = ({
  oneState,
  setOneState,
  registro,
  setRegistro,
  siguiente,
  isLoading,
  setIsloading,
}) => {
  const { setFormValues, pacienteID, setPacienteID } = useContext(
    ModoVisualizacionContext
  );
  //manejo de estados

  //modal listado de pacientes
  const [mostrarModal, setMostrarModal] = useState(false);
  //render de pacientes
  const [pacientes, setPacientes] = useState([]);
  //para buscar los pacientes en la lista
  const [pacientesEstatico, setPacientesEstatico] = useState([]);
  //el estado de busqueda de la lista
  const [Busqueda, setBusqueda] = useState("");
  //guardo los nombres para mostrar en la confirmacion
  const [pacienteName, setPacienteName] = useState("");
  //modal confirmacion eliminacion
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  //guardar el id del paciente a eliminar
  const [pacienteIdDelete, setPacienteIdDelete] = useState("");

  //Formik junto con yup sirve para validar la entrada en los inputs, ademas hace una manera mas sencilla de manejar los metodos post y put
  const formik = useFormik({
    initialValues: {
      ci: "5660950",
      nombres: "",
      apellidos: "",
      fecha_nacimiento: "1997-02-05",
      direccion: null,
      email: "",
      telefono_fijo: null,
      telefono_celular: "+584247532003",
      sexo: "MASCULINO",
    },
    validationSchema: Yup.object({
      nombres: Yup.string().required("Los nombres son obligatorios"),
      apellidos: Yup.string().required("Los apellidos son obligatorios"),
      ci: Yup.string().required("La cedula es obligatoria"),
      telefono_celular: Yup.string().required("el telefono es obligatorio"),
      direccion: Yup.string().required("La direccion es obligatoria"),
      fecha_nacimiento: Yup.string().required(
        "La fecha de nacimiento es obligatoria"
      ),
      sexo: Yup.string().required("el sexo es obligatorio"),
      email: Yup.string()
        .email("direccion de correo no valida")
        .required("el correo es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      // se agregar resetForm para limpar los campos del formulario
     // console.log(formData);
      const {
        ci,
        nombres,
        apellidos,
        fecha_nacimiento,
        direccion,
        email,
        telefono_fijo,
        telefono_celular,
        sexo,
      } = formData;

      try {
        const pacientePost = await postPacientes({
          ci,
          nombres,
          apellidos,
          fecha_nacimiento,
          direccion,
          email,
          telefono_fijo,
          telefono_celular,
          sexo,
        });
        setFormValues(formData);
        setPacienteID(pacientePost);
        // console.log(pacientePost);
        if (pacientePost) {
          toast.success("¡El paciente fue guardado correctamente!", {
            autoClose: 1500,
            onClose: () => {
              // setIsloading(false);
            },
          });
        } else {
          toast.error("¡Hubo un error al guardar el paciente!", {
            autoClose: 1500,
            onClose: () => {
              // setIsloading(false);
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
      return;
    },
  });


  //para la tabla flotante, modal es la terminologia para ventana flotante
  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  // hacer la peticion para que se muestre la lista de pacientes en el modal
  const peticionGet = async () => {
    try {
      //aqui hago la peticion a los controladores
      const pacientesList = await getPacientesList();
      console.log(pacientesList);
      //seteo el estado con la nueva carga de pacientes
      setPacientes(pacientesList);
      //lo guardo para tambien filtrarlo en la lista
      setPacientesEstatico(pacientesList);
    } catch (error) {
      console.log("error post pacientes-->");
      console.log(error);
    }
  };
  //pd: no entiendo este useEffect pero si lo quito no funciona asi que se queda
  useEffect(() => {
    peticionGet();
  }, []);
  //cambia el estado de la busqueda para aplicar la el filtro en la funcion
  const handleBusquedaChange = (event) => {
    // console.log(event);
    setBusqueda(event.target.value);
    filtrar(event.target.value);
  };

  // dentro de estafuncion cambio el estado a put
  const seleccionarRegistro = async (paciente) => {
    try {
      const pacienteDetail = await getPacientesDetail(paciente.id);
      setRegistro(pacienteDetail);
      toggleModal(true);
      setOneState("put");
    } catch (error) {
      console.log(error);
    }
  };
  //abri el modal de confimacion
  const toggleModalConfirmacion = (paciente) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setPacienteName(`${paciente.nombres} ${paciente.apellidos}`);
    setPacienteIdDelete(paciente.id);
  };
  //metodo delete cargo el ID, para enviarlo al controlador y alla lo reciba
  const eliminarPaciente = async (pacienteID) => {
    try {
      const pacienteDelete = await deletePaciente(pacienteID);
      setPacientes(pacientes.filter((p) => p.id !== pacienteID));
      // Eliminar el paciente del estado local
    } catch (error) {
      console.log(error);
    }
  };

  //para activar el evento que filtra a los datos que se encuentran la lista
  //las condicionales y los metodos para filtrar los datos, el metodo filter, toLowerCase es
  //que toma minusculas y mayusculas por y minusculas
  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = pacientesEstatico.filter((elemento) => {
      if (
        elemento.apellidos
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nombres
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.ci.toString().includes(terminoBusqueda)
      ) {
        return elemento;
      }
    });
    setPacientes(resultadoBusqueda);
  };

  return (
    <Box
      backgroundColor={"#FFFF"}
      boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
      padding={"30px"}
      borderRadius="20px"
      m={{ lg: "1% 13% 5% 13%", sm: "2%" }}
    >
      <form>
        <Text fontSize={"20px"} margin="15px 30px 30px 30px" color={"gray.600"}>
          Información Personal
        </Text>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
          gap={{ lg: "20px", sm: "5px" }}
        >
          <InputOverall
            name="ci"
            value={formik.values.ci}
            placeholder="Cédula:"
            onChange={(e) => formik.setFieldValue("ci", e.target.value)}
            errors={formik.errors.ci}
          />
          <InputSelector
            name="sexo"
            errors={formik.errors.sexo}
            value={formik.values.sexo}
            error={formik.errors.sexo}
            onChange={(e) => formik.setFieldValue("sexo", e.target.value)}
            options={selectorOptionsGenders}
            type={"Género:"}
          />
        </Grid>
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
            name="apellidos"
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
            name="fecha_nacimiento"
            value={formik.values.fecha_nacimiento}
            placeholder="Fecha de Nacimiento (AAAA-MM-DD): "
            onChange={(e) =>
              formik.setFieldValue("fecha_nacimiento", e.target.value)
            }
            errors={formik.errors.apellidos}
          />
          <InputOverall
            name="direccion"
            value={formik.values.direccion}
            placeholder="Procedencia"
            onChange={(e) => formik.setFieldValue("direccion", e.target.value)}
            errors={formik.errors.direccion}
          />
        </Grid>
        <Text fontSize={"20px"} margin="15px 30px 30px 30px" color={"gray.600"}>
          Información de Contacto
        </Text>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
          gap={{ lg: "20px", sm: "5px" }}
        >
          <InputOverall
            name="email"
            value={formik.values.email}
            placeholder="Email:"
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
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

      <Modal
        size={"5xl"}
        maxWidth="100%"
        isOpen={mostrarModal}
        onClose={toggleModal}
      >
        <ModalOverlay />
        <ModalContent
          minH={"500px"}
          borderRadius={"20px"}
          bg="#ffff"
          // maxHeight="80vh" // Establece el máximo alto del modal
          // overflowY="auto" // Genera scroll cuando el contenido excede el alto máximo
        >
          <ModalHeader>
            <CloseButtonL handleModal={toggleModal} />
          </ModalHeader>
          <ModalBody marginTop={"-5%"}>
            <Box>
              <Box>
                <InputSearch
                  SearchValue={Busqueda}
                  title={"Buscar Registro"}
                  handleChange={handleBusquedaChange}
                />

                <Center>
                  <Box
                    width={"100%"}
                    maxH={"400px"}
                    overflowY={"auto"}
                    sx={{
                      "&::-webkit-scrollbar": {
                        width: "5px", // Ancho del scroll
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#89bbcc",
                        borderRadius: "10px", // Color del scroll
                      },
                    }}
                  >
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th
                            borderRadius="none"
                            borderBottom="3px solid"
                            borderBottomColor={"gray.500"}
                            textAlign="center"
                          >
                            Nombre
                          </Th>
                          <Th
                            borderRadius="none"
                            borderBottom="3px solid"
                            borderBottomColor={"gray.500"}
                            textAlign="center"
                          >
                            Apellidos
                          </Th>
                          <Th
                            borderRadius="none"
                            borderBottom="3px solid"
                            borderBottomColor={"gray.500"}
                            textAlign="center"
                          >
                            RIF/Cédula
                          </Th>
                          <Th
                            borderRadius="none"
                            borderBottom="3px solid"
                            borderBottomColor={"gray.500"}
                            textAlign="center"
                          >
                            Teléfono
                          </Th>
                          <Th
                            borderRadius="none"
                            borderBottom="3px solid"
                            borderBottomColor={"gray.500"}
                            textAlign="center"
                          >
                            Correo
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {pacientes &&
                          pacientes?.map((pacientes) => (
                            <Tr key={pacientes.id}>
                              <Link
                                paddingX={"10px"}
                                as="td"
                                margin={"10px"}
                                borderRadius="none"
                                borderBottom="1px solid"
                                borderBottomColor="gray.500"
                                onClick={() => seleccionarRegistro(pacientes)}
                              >
                                {pacientes.nombres}
                              </Link>
                              <Link
                                paddingX={"10px"}
                                as="td"
                                margin={"10px"}
                                borderRadius="none"
                                borderBottom="1px solid"
                                borderBottomColor="gray.500"
                                onClick={() => seleccionarRegistro(pacientes)}
                              >
                                {pacientes.apellidos}
                              </Link>
                              <Link
                                paddingX={"10px"}
                                as="td"
                                margin={"10px"}
                                borderRadius="none"
                                borderBottom="1px solid"
                                borderBottomColor="gray.500"
                                onClick={() => seleccionarRegistro(pacientes)}
                              >
                                {pacientes.ci}
                              </Link>
                              <Link
                                paddingX={"10px"}
                                as="td"
                                margin={"10px"}
                                borderRadius="none"
                                borderBottom="1px solid"
                                borderBottomColor="gray.500"
                                onClick={() => seleccionarRegistro(pacientes)}
                              >
                                {pacientes.telefono_celular}
                              </Link>
                              <Link
                                paddingX={"10px"}
                                as="td"
                                margin={"10px"}
                                borderRadius="none"
                                borderBottom="1px solid"
                                borderBottomColor="gray.500"
                                onClick={() => seleccionarRegistro(pacientes)}
                              >
                                {pacientes.email}
                              </Link>
                              <Link
                                paddingX={"10px"}
                                as="td"
                                margin={"10px"}
                                borderRadius="none"
                                borderBottom="1px solid"
                                borderBottomColor="gray.500"
                                onClick={() =>
                                  toggleModalConfirmacion(pacientes)
                                }
                              >
                                <BsFillTrashFill color="#137797" />
                              </Link>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </Box>
                </Center>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        size={"xs"}
        maxWidth="100%"
        isOpen={showModalConfirmacion}
        onClose={toggleModalConfirmacion}
      >
        <ModalOverlay />
        <ModalContent marginTop={"15%"} bg="#ffff" borderRadius={"20px"}>
          <ModalBody>
            <Confirmacion
              id={pacienteIdDelete}
              close={toggleModalConfirmacion}
              nombres={pacienteName}
              eliminar={eliminarPaciente}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <SaveButton handleSubmit={formik.handleSubmit} isLoading={isLoading} />
    </Box>
  );
};

export default ClienteCardPostInitial;
