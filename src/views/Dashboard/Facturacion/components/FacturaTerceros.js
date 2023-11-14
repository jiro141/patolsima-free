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
import InputAutoComplete from "components/widgets/Inputs/InputAutoComplete";
import debounce from "just-debounce-it";
import { useSearchFacturas } from "hooks/Facturas/useSearchFacturas";
import { useClientCiByorder } from "hooks/Facturas/useClientCiByorder";
import { getClient } from "api/controllers/facturas";

const FacturaTerceros = ({ study, setShowModal, setFinishFactTerceros }) => {
  const { setfactClientTerceros, factClientTerceros } = useContext(MainContext)
  const [searchResult, setsearchResult] = useState(false)
  const [selectSearch, setSelectSearch] = useState(false);
  const [tercero, setTercero] = useState([])
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
      telefono_fijo: null,
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
      console.log('data',formData);
      if (selectSearch) {
        try {
          console.log('entro pero aqui no');
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

      } else {
        try {
          console.log('entro');
          const resPost = await postCreateClient(formData);
          if (resPost) {
            setfactClientTerceros(resPost);
            toast.success("¡Se creo el cliente con éxito!", {
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
      }
      setFinishFactTerceros(true)
    },
  });
  console.log(selectSearch);
  useEffect(() => {
    if (study) {
      const searchByCi = async () => {
        const res = await getOrdenesByCi(pacientsByCi.ci_rif)
        if (res) {
          const resDetail = await getFacturasDetail(study.id)
          setsearchResult(true);
        } else {
          console.log('no existe la ci');
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
    const newQuery = event.target.value;

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
      const resDetail = await getClient(selectedPatient.ci_rif, index)
      setTercero(resDetail);
      formik.setValues({
        ci_rif: resDetail.ci_rif,
        direccion: resDetail.direccion,
        razon_social: resDetail.razon_social,
        telefono_celular: resDetail.telefono_celular,
        telefono_fijo: resDetail.telefono_fijo,
        email: resDetail.email,
      })
    } else {
      setSelectSearch(false)
    }
  };
  return (
    <Box>
      <Text marginTop={'-10%'} fontSize={'20px'}>Datos de cliente</Text>
      <Grid gap={'15px'} margin={'6px'} templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
        {/* <InputAutoComplete
          name={"ci"}
          searchValue={searchci}
          onChange={handleChangeCi}
          resultSearch={pacientsByCi}
          errors={errorpacientsByCi}
          loading={loadingpacientsByCi}
          placeholder={"Cedula de identidad:"}
          handleSelectSearch={handleSelectSearch}
         /> */}
         <InputAutoComplete
          // name={"ci"}
          searchValue={searchci}
          onChange={handleChangeCi}
          resultSearch={pacientsByCi}
          errors={errorpacientsByCi}
          loading={loadingpacientsByCi}
          placeholder={"Cedula de identidad:"}
          handleSelectSearch={handleSelectSearch}
          selectSearch={selectSearch}
        />


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
        onClick={formik.handleSubmit}>
        Guardar
      </Button>
    </Box>
  );
}
export default FacturaTerceros;