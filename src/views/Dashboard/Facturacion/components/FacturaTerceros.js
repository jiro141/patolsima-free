import { React, useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Grid,
  Select,
  Input,
  Button
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { putFacturaTerceros } from "api/controllers/facturas";
import InputOverall from "components/widgets/Inputs/InputOverall";
import { postFacturaTerceros } from "api/controllers/facturas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContext from "context/mainContext/MainContext";
import { putClientFactura } from "api/controllers/facturas";
import { getOrdenesByCi } from "api/controllers/facturas";
import { getFacturasDetail } from "api/controllers/facturas";
import InputAuto from "components/widgets/Inputs/InputAuto";
import debounce from "just-debounce-it";
import { useSearchFacturas } from "hooks/Facturas/useSearchFacturas";
import { useClientCiByorder } from "hooks/Facturas/useClientCiByorder";
import { getClient } from "api/controllers/facturas";

const FacturaTerceros = ({ study, setShowModal, setFinishFactTerceros }) => {
  const { setfactClientTerceros, factClientTerceros } = useContext(MainContext)
  const [searchResult, setsearchResult] = useState(false)
  const [selectSearch, setSelectSearch] = useState(false);
  // const [finishFactTerceros, setFinishFactTerceros] = useState(false);
  const [tercero, setTercero] = useState([]);
  const [terceroPost, setTerceroPost] = useState(null);
  const [searchci, setsearchci] = useState('');
  const { pacientsByCi,
    getPacientsByCi,
    errorpacientsByCi,
    loadingpacientsByCi,
    setpacientsByCi } = useClientCiByorder({ searchci });
  const formik = useFormik({
    initialValues: {
      email: '',
      direccion: '',
      telefono_fijo: '',
      telefono_celular: '',
      razon_social: '',
      ci_rif: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Ingrese un correo electrónico válido').required('El campo es obligatorio'),
      direccion: Yup.string().required("El campo es obligatorio"),
      telefono_celular: Yup.string().required("El campo es obligatorio"),
      razon_social: Yup.string().required("El campo es obligatorio"),
      ci_rif: Yup.string().required("El campo es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      try {
        // console.log('entro pero aqui no');
        const resPost = await putClientFactura(tercero.id, formData);
        if (resPost) {
          setfactClientTerceros(resPost);
          toast.success("¡Se actualizó el cliente con éxito!", {
            autoClose: 1000,
          });
          setTimeout(async () => {
            const clienteOrd = {
              cliente_id: tercero.id
            };
            const postTercero = await putFacturaTerceros(study.id, clienteOrd);
            if (postTercero) {
              toast.success("¡Se actualizó el cliente en la factura con éxito!", {
                autoClose: 1200,
              });
              setShowModal(false);
            } else {
              toast.error("¡Ocurrió un error al actualizar el cliente de la factura!", {
                autoClose: 1200,
              });
            }
          }, 1500);
        }
      } catch (error) {
        toast.error("¡Ocurrió un error al actualizar el cliente!", {
          autoClose: 1000,
        });
      }
      setFinishFactTerceros(true)
    },
  });
  // console.log(formik.values,'ver datos');

  // probando factura a terceros de dos formas
  const enviar = async () => {
    try {
      const formData = formik.values;

      if (formData.ci_rif === '') {
        formData.ci_rif = searchci;
      }

      const resPost = await postFacturaTerceros(formData);

      if (resPost) {
        setTerceroPost(resPost);
        toast.success("¡Se creó el cliente con éxito!", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("¡Ocurrió un error al actualizar el cliente!", { autoClose: 1000 });
    }
    setFinishFactTerceros(true);
  };

  useEffect(() => {
    if (terceroPost) {
      console.log(terceroPost, 'datos del tercero');

      const clienteOrd = {
        cliente_id: terceroPost.id
      };

      const actualizarClienteFactura = async () => {
        try {
          const postTercero = await putFacturaTerceros(study.id, clienteOrd);

          if (postTercero) {
            toast.success("¡Se actualizó el cliente en la factura con éxito!", { autoClose: 1200 });
            setShowModal(false);
          } else {
            toast.error("¡Ocurrió un error al actualizar el cliente de la factura!", { autoClose: 1200 });
          }
        } catch (error) {
          toast.error("¡Ocurrió un error al actualizar el cliente de la factura!", { autoClose: 1200 });
        }
      };

      actualizarClienteFactura();
    }
  }, [terceroPost]);

  const handleClick = () => {
    // Verificar el estado y ejecutar la función correspondiente
    if (selectSearch) {
      formik.handleSubmit(); // Llama al método handleSubmit de formik
    } else {
      // console.log('aqui si entro');
      enviar(); // Llama al método handleSubmit de enviar
    }
  };




  // console.log(selectSearch);
  useEffect(() => {
    if (study) {
      const searchByCi = async () => {
        const res = await getOrdenesByCi(pacientsByCi.ci_rif)
        if (res) {
          const resDetail = await getFacturasDetail(study.id);
          // setTercero(resDetail);
          setsearchResult(true);
        } else {
          // console.log('no existe la ci');
          toast.error("¡No esta el cliente en registro!", {
            autoClose: 1000,
          });
          setsearchResult(false)
        }

      }
      searchByCi()
    }
    return () => { }
  }, [study])



  const handleChangeCi = (event) => {
    // console.log(event, 'evento');
    const newQuery = event.target.value;
    console.log(newQuery, ' datos de busqueda');
    setsearchci(newQuery);
    debouncedGetPacients(newQuery);
  };

  useEffect(() => {
    if (searchci === "") {
      formik.resetForm('')
    }
  }, [])

  const debouncedGetPacients = useCallback(
    debounce((searchci) => {
      if (searchci === "") {
        formik.resetForm('')
        setSelectSearch(false);
      } if (searchci.length > 0) {
        getPacientsByCi({ searchci })
        // console.log(searchci);
        setsearchci(searchci)
        setSelectSearch(true);
      }
      setSelectSearch(false);

    }, 500),
    []
  );
  const handleSelectSearch = async (index) => {
    if (pacientsByCi.length > 0) {
      setSelectSearch(true);
      const selectedPatient = pacientsByCi[index];
      setTercero(selectedPatient);
      // console.log(selectedPatient,'datos de tercer');
      // Asignar directamente los valores a formik.values
      formik.setValues({
        ci_rif: selectedPatient.ci_rif,
        direccion: selectedPatient.direccion,
        razon_social: selectedPatient.razon_social,
        telefono_celular: selectedPatient.telefono_celular,
        telefono_fijo: selectedPatient.telefono_fijo,
        email: selectedPatient.email,
      });
    } else {
      setSelectSearch(false)
    }
  };
  // console.log(searchci,'cosas');
  return (
    <Box>
      <Text marginTop={'-10%'} fontSize={'20px'}>Datos de cliente</Text>
      <Grid gap={'15px'} margin={'6px'} templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
        <InputAuto
          setsearchci={setsearchci}
          searchValue={searchci}
          onChange={handleChangeCi}
          resultSearch={pacientsByCi}
          errors={errorpacientsByCi}
          loading={loadingpacientsByCi}
          placeholder={"Cedula de identidad:"}
          handleSelectSearch={handleSelectSearch}
          selectSearch={selectSearch}
        />
        {/* <InputOverall
          placeholder="Cedula de identidad:"
          name={'ci_rif'}
          value={formik.values.ci_rif}
          // defaultValue={tercero.razon_social}
          onChange={e => formik.setFieldValue('ci_rif', e.target.value)}
          errors={formik.errors.ci_rif} /> */}


        <InputOverall
          placeholder='Nombres o razón social'
          name={'razon_social'}
          value={formik.values.razon_social}
          // defaultValue={tercero.razon_social}
          onChange={e => formik.setFieldValue('razon_social', e.target.value)}
          errors={formik.errors.razon_social} />


      </Grid>
      <Grid gap={'20px'} margin={'10px'} templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>

        <InputOverall
          placeholder='Telefono Celular'
          name={'telefono_celular'}
          defaultValue={searchResult.telefono_celular}
          value={formik.values.telefono_celular}
          onChange={e => formik.setFieldValue('telefono_celular', e.target.value)}
          errors={formik.errors.telefono_celular}
        />
        <InputOverall
          placeholder='Telefono Fijo'
          defaultValue={searchResult.telefono_fijo}
          name={'telefono_fijo'}
          value={formik.values.telefono_fijo}
          onChange={e => formik.setFieldValue('telefono_fijo', e.target.value)}
        //errors={formik.errors.telefono_celular}
        />

      </Grid>
      <Grid margin={'10px'} gap={'20px'} templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
        <InputOverall
          placeholder='Procedencia'
          name={'direccion'}
          value={formik.values.direccion}
          onChange={e => formik.setFieldValue('direccion', e.target.value)}
          errors={formik.errors.direccion}
        />

        <InputOverall
          placeholder='Email'
          name={'email'}
          value={formik.values.email}
          onChange={e => formik.setFieldValue('email', e.target.value)}
          errors={formik.errors.email}
        />
      </Grid>
      <Button
        marginLeft={{ lg: '82%', md: '70%', sm: '77%' }}
        borderRadius={'20px'}
        bgColor={'#137797'}
        color='#ffff'
        onClick={handleClick}>
        Guardar
      </Button>
    </Box>
  );
}
export default FacturaTerceros;