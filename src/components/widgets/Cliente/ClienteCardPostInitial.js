import { useState, useContext, useCallback } from "react";
import { Text, Grid, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getPacientesDetail } from "api/controllers/pacientes";
import { postPacientes } from "api/controllers/pacientes";
import { deletePaciente } from "api/controllers/pacientes";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputOverall from "../Inputs/InputOverall";
import InputSelector from "../Inputs/InputSelector";
import { selectorOptionsGenders, thValuesPacientes } from "mocks";
import SaveButton from "../Buttons/SaveButton";
import ShowMoreButton from "../Buttons/ShowMoreButton";
import DeleteModal from "../Modals/DeleteModal";
import FilteredDataModal from "../Modals/FilteredDataModal";
import { usePacients } from "hooks/Pacients/usePacients";
import { useSearchPacients } from "hooks/Pacients/useSearchPacients";
import { usePacientsListCi } from "hooks/Pacients/usePacientByCI";
import debounce from "just-debounce-it";
import InputAutoComplete from "../Inputs/InputAutoComplete";
import { useEffect } from "react";
import MainContext from "context/mainContext/MainContext";
import { formatDate } from "helpers";
import InputCalendar from "../Inputs/InputCalendar";
import { putPacientes } from "api/controllers/pacientes";
import { NextStation } from "../Buttons/NextStation";

const ClienteCardPostInitial = ({ setRegistro, isLoading }) => {
  const { setFormValues, pacienteID, setPacienteID } = useContext(
    ModoVisualizacionContext
  );


  const { activeTab, setActiveTab, setTwoState, setOneState, oneState } = useContext(MainContext)
  const [mostrarModal, setMostrarModal] = useState(false);
  const [Busqueda, setBusqueda] = useState("");
  const [pacienteName, setPacienteName] = useState("");
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [pacienteIdDelete, setPacienteIdDelete] = useState("");
  const [selectSearch, setSelectSearch] = useState(false);
  const [onOpenCalendar, setOpenCalendar] = useState(false);
  const [date, onChange] = useState(formatDate(new Date()));

  const handleDateChange = (date) => {
    onChange(date);
  };

  const {
    pacients,
    getPacients,
    loading,
    error,
    setpacients,
    pacientesEstatico,
  } = usePacients();
  const { searchci, setsearchci, errorci, seterrorci } = useSearchPacients();
  const {
    pacientsByCi,
    getPacientsByCi,
    loadingpacientsByCi,
  } = usePacientsListCi({ searchci });

  const formik = useFormik({
    initialValues: {
      ci: "",
      nombres: "",
      apellidos: "",
      // fecha_nacimiento: '',
      direccion: "",
      email: "",
      telefono_fijo: " ",
      telefono_celular: "",
      sexo: "",
    },
    validationSchema: Yup.object({
      nombres: Yup.string().required("Los nombres son obligatorios"),
      apellidos: Yup.string().required("Los apellidos son obligatorios"),
      //ci: Yup.string().required("La cedula es obligatoria"),
      telefono_celular: Yup.string().required("el telefono es obligatorio"),
      direccion: Yup.string().required("La direccion es obligatoria"),

      sexo: Yup.string().required("el sexo es obligatorio"),
      email: Yup.string()
        .email("direccion de correo no valida")
        .required("el correo es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      let dateformat = formatDate(date)
      let dateNew = dateformat.trim()
     // console.log(typeof dateNew)
      if (oneState === 'post' && activeTab === 0) {
        const newObj = {
          ...formData,
          ci: searchci,
          fecha_nacimiento: dateNew
        }
        try {
          const pacientePost = await postPacientes(newObj);
          setFormValues(newObj, 'paciente');
          console.log(pacientePost)
          setPacienteID(pacientePost.id);

          if (pacientePost) {
            toast.success("¡El paciente fue guardado correctamente!", {
              autoClose: 1000,
            });
            setActiveTab(activeTab + 1)
            //console.log(activeTab)
            //setActiveTab(1)
            setTwoState('post')
          }
          else {
            toast.error("¡Hubo un error al guardar el paciente!", {
              autoClose: 1000,
            });
            formik.resetForm()
          }
          getPacients();
        } catch (error) {
          toast.error(error.message, { autoClose: 1000 });
        }
        // return;
      }
      if (oneState == 'put') {
        const Obj = {
          ...formData,
          fecha_nacimiento: dateNew,
        }
        const id = {
          id: formData.id
        }
        try {
          const pacientePost = await putPacientes(id, Obj);
          setFormValues(Obj, 'paciente');
          setPacienteID(pacientePost.id);

          if (pacientePost) {
            toast.success("¡El paciente fue guardado correctamente!", {
              autoClose: 1000,
            });
            setActiveTab(activeTab + 1)
            setTwoState('post')
          }
          else {
            toast.error("¡Hubo un error al guardar el paciente!", {
              autoClose: 1000,
            });
            formik.resetForm()
          }
          getPacients();
        } catch (error) {
          toast.error(error.message, { autoClose: 1000 });
        }
      }
    }




  });

  console.log()
  useEffect(() => {
    seterrorci("");
  }, []);

  const handleSelectSearch = () => {
    if (pacientsByCi.length > 0) {
      const mapped = pacientsByCi.map((data, i) => ({
        id: data.id,
        ci: data.ci,
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        tlf: data.telefono_celular,
        sexo: data.sexo
      }));

      formik.setValues({
        ci: mapped[0].ci,
        nombres: mapped[0].nombres,
        apellidos: mapped[0].apellidos,
        email: mapped[0].email,
        telefono_celular: mapped[0].tlf,
        email: mapped[0].email,
        sexo: mapped[0].sexo
      });
      setSelectSearch(true);
      setOneState('put')
    }

    //setSelectSearch(false);
  };

  const toggleModal = () => {
    getPacients();
    setMostrarModal(!mostrarModal);
  };
  const handleBusquedaChange = (event) => {
    const query = event.target.value;
    if (query.startsWith(" ")) return;
    setBusqueda(query);
    filtrar(query);
  };
  const seleccionarRegistro = async (paciente) => {
console.log(paciente)
  
    try {
      const pacienteDetail = await getPacientesDetail(paciente.id);
      console.log(pacienteDetail);
      setPacienteID(paciente.id)
      setRegistro(pacienteDetail);
      toggleModal(true);
      setOneState("put");

     
     formik.setValues({
        id: pacienteDetail.id,
        ci: pacienteDetail.ci,
        nombres: pacienteDetail.nombres,
        apellidos: pacienteDetail.apellidos,
       // fecha_nacimiento: date,
        direccion: pacienteDetail.direccion,
        email: pacienteDetail.email,
        telefono_fijo: pacienteDetail.telefono_fijo,
        telefono_celular: pacienteDetail.telefono_celular,
        sexo: pacienteDetail.sexo,
       
      });
      onChange(pacienteDetail.fecha_nacimiento)
      //console.log(formikValue)
      // formik.validateForm();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModalConfirmacion = (paciente) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setPacienteName(paciente.nombres);
    setPacienteIdDelete(paciente.id);
  };
  const eliminarPaciente = async (pacienteID) => {
    try {
      await deletePaciente(pacienteID);
      setpacients(pacients.filter((p) => p.id !== pacienteID));
      setShowModalConfirmacion(!showModalConfirmacion);
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
    }
  };

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
    setpacients(resultadoBusqueda);
  };
  const debouncedGetPacients = useCallback(
    debounce((searchci) => {
      if (searchci === "") {
        setsearchci("");
        return;
      }
      getPacientsByCi({ searchci });
    }, 500),
    []
  );

  const handleChangeCi = (event) => {
    const newQuery = event.target.value;
    setsearchci(newQuery);
    debouncedGetPacients(newQuery);
  };

  return (
    <Box
      backgroundColor={"#FFFF"}
      boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
      padding={"30px"}
      borderRadius="20px"
      m={{ lg: "1% 13% 5% 13%", sm: "2%" }}
    >
      <NextStation/>
      {
        <form>
          <Text
            fontSize={"20px"}
            textAlign={'left'}

            margin={'5px'}
            padding={'5px'}
            color={"gray.600"}
          >
            Información Personal
          </Text>
          <Grid
            templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
            gap={{ lg: "20px", sm: "5px" }}

          >
            {oneState === 'put' &&
              <InputOverall
                name="ci"
                value={formik.values.ci}
                placeholder="Cedula de identidad"
                onChange={(e) =>
                  formik.setFieldValue("ci", e.target.value)
                }
                errors={formik.errors.ci}
              />
            }
            {oneState === 'post' &&
              <InputAutoComplete
                // name={"ci"}
                searchValue={searchci}
                onChange={handleChangeCi}
                resultSearch={pacientsByCi}
                errors={errorci}
                loading={loadingpacientsByCi}
                placeholder={"Cedula de identidad"}
                handleSelectSearch={handleSelectSearch}
                selectSearch={selectSearch}

              />
            }
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
            {
              <InputOverall
                name="nombres"
                value={formik.values.nombres}
                placeholder="Nombres:"
                onChange={(e) =>
                  formik.setFieldValue("nombres", e.target.value)
                }
                errors={formik.errors.nombres}
              />
            }
            <InputOverall
              name="apellidos"
              value={formik.values.apellidos}
              placeholder="Apellidos:"
              onChange={(e) =>
                formik.setFieldValue("apellidos", e.target.value)
              }
              errors={formik.errors.apellidos}
            />
          </Grid>
          <Grid
            templateColumns={{ lg: "repeat(2,1fr)", sm: "1fr" }}
            gap={{ lg: "20px", sm: "5px" }}
          >
            {/* <InputOverall
              name="fecha_nacimiento"
              value={date}
              placeholder="Fecha de Nacimiento (AAAA-MM-DD): "
              onChange={handleDateChange}
              //errors={formik.errors.fecha_nacimiento}
              type="date"
              //handleClick={()=>console.log('clik')}
            /> */}
            <InputCalendar onOpenCalendar={onOpenCalendar} value={date} onChange={handleDateChange} setOpenCalendar={setOpenCalendar} />
            <InputOverall
              name="direccion"
              value={formik.values.direccion}
              placeholder="Procedencia"
              onChange={(e) =>
                formik.setFieldValue("direccion", e.target.value)
              }
              errors={formik.errors.direccion}
            />
          </Grid>
          <Text
            textAlign={'left'}
            fontSize={"20px"}
            margin={'5px'}
            padding={'5px'}
            //margin="15px 30px 30px 30px"
            color={"gray.600"}
          >
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
      }
      <FilteredDataModal
        isOpenModal={mostrarModal}
        isToggleModal={toggleModal}
        Busqueda={Busqueda}
        thData={thValuesPacientes}
        tBodyData={pacients}
        handleSelectTBody={seleccionarRegistro}
        handleSelectIcon={toggleModalConfirmacion}
        loading={loading}
        handleBusquedaChange={handleBusquedaChange}
      />

      <DeleteModal
        isOpen={showModalConfirmacion}
        onClose={toggleModalConfirmacion}
        id={pacienteIdDelete}
        close={toggleModalConfirmacion}
        eliminar={eliminarPaciente}
        nombres={pacienteName}
      />
      <Box marginTop={'10px'} display={'flex'} alignItems={'end'} justifyContent={'space-between'}>
        <ShowMoreButton handleClick={toggleModal} />
        <SaveButton handleSubmit={formik.handleSubmit} isLoading={isLoading} />
      </Box>


    </Box>
  );
};

export default ClienteCardPostInitial;
