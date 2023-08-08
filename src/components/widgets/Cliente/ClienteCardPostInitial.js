import { useState, useContext, useCallback } from "react";
import { Text, Grid, Box, Input } from "@chakra-ui/react";
import {  useFormik } from "formik";
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
import { Title } from "../Texts";
import PhoneInputOverall from "../Inputs/PhoneInputOverall";
import "../../../css/style.css";
import { usePacientsListBySearch } from "hooks/Pacients/usePacientsBySearch";

const ClienteCardPostInitial = ({ setRegistro, isLoading }) => {
  const { setFormValues, pacienteID, setPacienteID } = useContext(
    ModoVisualizacionContext
  );


  const { activeTab, setActiveTab, setTwoState, setOneState, oneState } = useContext(MainContext)
  const [mostrarModal, setMostrarModal] = useState(false);
  const [showPrincipalIn, setShowPrincipalIn] = useState(false);
  const [search, setSearch] = useState("");
  const [pacienteName, setPacienteName] = useState("");
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [pacienteIdDelete, setPacienteIdDelete] = useState("");
  const [selectSearch, setSelectSearch] = useState(false);
  const [onOpenCalendar, setOpenCalendar] = useState(false);
  const [value, setvalue] = useState(false);
  const [date, onChange] = useState(formatDate(new Date()));
  const [countryCode, setCountryCode] = useState('ve');
  const [numberCode, setNumberCode] = useState('58');
  const [selectPacient, setSelectPacient] = useState('');
  const [nselectPacient, setnSelectPacient] = useState('');

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
 const{
  getPacientsBySearch,
  pacientsBySearch,
  loadingpacientsBySearch,
  setpacientsBySearch,
  errorpacientsBySearch}= usePacientsListBySearch({search})

  const formik = useFormik({
    initialValues: {
      ci: "",
      nombres: "",
      apellidos: "",
      // fecha_nacimiento: '',
      direccion: "",
      email: "",
      telefono_fijo: " ",
      // telefono_celular: "",
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
          telefono_celular: '+' + numberCode + formData.telefono_celular,
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
            setTwoState('post')
            return null
          }
          else {
            toast.error("¡Hubo un error al guardar el paciente!", {
              autoClose: 1000,
            });
          }
          getPacients();
        } catch (error) {
          toast.error(error.message, { autoClose: 1000 });
        }
        // return;
      }
      if (oneState == 'put') {
        const newObj = {
          ...formData,
          //ci: searchci,
          fecha_nacimiento: dateNew,
        }

        try {
          // if (pacientsByCi) {
          const pacientePut = await putPacientes(formData.id || pacientsByCi[0].id, newObj);
          setFormValues(newObj, 'paciente');
          console.log(pacientePut);
          setPacienteID(pacientePut.id);
          if (pacientePut) {
            toast.success("¡El paciente fue guardado correctamente!", {
              autoClose: 1000,
            });
            // setActiveTab(activeTab + 1)
            setTwoState('post')
          }
          else {
            toast.error("¡Hubo un error al guardar el paciente!", {
              autoClose: 1000,
            });
            // formik.resetForm()
          }
          // }

          getPacients();
        } catch (error) {
          toast.error(error.message, { autoClose: 1000 });
        }
      }
    }




  });

 




  const handleSelectSearch = async () => {
    if (pacientsByCi.length > 0) {
      const data = await getPacientesDetail(pacientsByCi[0]?.id)
      formik.setValues({
        ci: data.ci,
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono_celular: data.tlf,
        email: data.email,
        sexo: data.sexo,
        direccion: data.direccion,
        fecha_nacimiento: data.fecha_nacimiento,
        telefono_celular: data.telefono_celular

      })
      onChange(data.fecha_nacimiento)
      setSelectSearch(true);
      setOneState('put')
    }
  };

  const toggleModal = () => {
    getPacients();
    setMostrarModal(!mostrarModal);
  };
  const handleBusquedaChange = (event) => {
    const query = event.target.value;
    if (query.startsWith(" ")) return;
    if (query === '') {
      setvalue(true)
    }
     setSearch(query);
    debouncedGetPacientsSearchResult(query)
    //filtrar(query);
  };
  const seleccionarRegistro = async (paciente) => {
    setOneState("put");
    console.log(paciente)

    try {
      const pacienteDetail = await getPacientesDetail(paciente.id);
      console.log(pacienteDetail);
      setPacienteID(paciente.id)
      setRegistro(pacienteDetail);
      toggleModal(true);
      setShowPrincipalIn(true)

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
      setSelectPacient(pacienteDetail.telefono_celular)

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

 
  const debouncedGetPacients = useCallback(
    debounce((searchci) => {
      console.log(searchci)
      if (searchci === "") {
        formik.resetForm('')
        onChange(new Date())
        // setsearchci("");

      } if (searchci.length > 0) {
        //getPacientesListByCi({ searchci })
        setSelectSearch(false);
      }
      // setSelectSearch(false);

    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      setpacients([])
      setpacientsBySearch([])
      setSearch("");
    }
  }, [mostrarModal])
  
  const debouncedGetPacientsSearchResult = useCallback(
    debounce((search) => {
      if (search === "") {
        getPacients()
      } if (search.length > 0) {
        getPacientsBySearch({search})
        setpacients(pacientsBySearch)
      }     
    }, 500),
    []
  );
 

  const handleChangeCi = (event) => {
    const newQuery = event.target.value;
    setsearchci(newQuery);
    debouncedGetPacients(newQuery);
  };


  useEffect(() => {
    if (formik.values.ci === '') {
      //formik.resetForm('')
      setOneState('post')
    }

    return () => {
      //setsearchci("");
    }
  }, [formik.values])

  const handleSelectChange = (e) => {
    setnSelectPacient(e.target.value);
  }

  return (
    <Box


      backgroundColor={"#FFFF"}
      boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
      padding={"30px"}
      borderRadius="20px"
      mx={{sm:'3%',lg:'10%',md:'10%'}}
      my={{sm:'3%',lg:'2%',md:'2%'}}
    >

      {
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
            {oneState === 'put' &&
              <InputOverall
                name="ci"
                value={formik.values.ci}
                placeholder="Cedula de identidad:"
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
                placeholder={"Cedula de identidad:"}
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
           
            <InputCalendar onOpenCalendar={onOpenCalendar} value={date} onChange={handleDateChange} setOpenCalendar={setOpenCalendar} />
            <InputOverall
              name="direccion"
              value={formik.values.direccion}
              placeholder="Procedencia:"
              onChange={(e) =>
                formik.setFieldValue("direccion", e.target.value)
              }
              errors={formik.errors.direccion}
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
              value={formik.values.email}
              placeholder="Email:"
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              errors={formik.errors.email}
            />
          

            {selectPacient || selectSearch ?
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

              </div> :
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
      }

      <FilteredDataModal
        isOpenModal={mostrarModal}
        isToggleModal={toggleModal}
        Busqueda={search}
        thData={thValuesPacientes}
        tBodyData={search ? pacientsBySearch: pacients}
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
      <Box marginTop={'10px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} w={'100%'}>
        <Box  boxSize={{lg:'3rem',sm:'2rem', md:'3rem'}}>

        </Box>
        <ShowMoreButton handleClick={toggleModal} />

        <SaveButton handleSubmit={formik.handleSubmit} isLoading={isLoading} />

        {<NextStation handleNextSubmit={formik.handleSubmit} searchci={searchci} />}
      </Box>


    </Box>
  );
};

export default ClienteCardPostInitial;
