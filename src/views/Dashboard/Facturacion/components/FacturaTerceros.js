import { React, useContext, useEffect, useState } from "react";
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

const FacturaTerceros = ({ study, setShowModal,setFinishFactTerceros }) => {
  const { setfactClientTerceros } = useContext(MainContext)
  const [searchResult, setsearchResult] = useState(false)
  const [searchci, setsearchci] = useState('')
  
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
      console.log(formData);
      if(searchResult){
        try {
          const resPost = await putClientFactura(study?.cliente?.id,formData)
          if (resPost) {
            setfactClientTerceros(resPost)
            //console.log(resPost)
            toast.success("¡Se actualizo el cliente con exito en la factura!", {
              autoClose: 1000,
            });
  
            setShowModal(false)
           // window.location.reload();
          }
        } catch (error) {
          toast.error("¡Ocurrio un error para actualizar el cliente de la factura!", {
            autoClose: 1000,
          });
        }
      }else{
        try {
          const resPostClient = await postFacturaTerceros(formData)
          if (resPostClient) {
            toast.success("¡Se creo el cliente con exito en la factura!", {
              autoClose: 1000,
            });
  
            setShowModal(false)
           // window.location.reload();
          }
        } catch (error) {
          toast.error("¡Ocurrio un error para crear el cliente de la factura!", {
            autoClose: 1000,
          });
        }
      }
     
      setFinishFactTerceros(true)

    },
  });
console.log(study.cliente.id);
  useEffect(() => {
    if(study){
   const searchByCi=async()=>{
   const res= await getOrdenesByCi('V465456')
   if(res){
     //setsearchResult(res[0].cliente)
     setsearchResult(true)
    //  console.log(res[0].cliente);
     const resDetail = await getFacturasDetail(study.id)
     console.log(resDetail);
    formik.setValues({
      ci_rif: resDetail.cliente.ci_rif,
      direccion:resDetail.cliente.direccion,
      razon_social: resDetail.cliente.razon_social,
      telefono_celular:resDetail.cliente.telefono_celular,
      telefono_fijo:resDetail.cliente.telefono_fijo,
      email:resDetail?.cliente?.email,
    })
    
     //console.log('ya existe la ci');
   }else{
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

  const debouncedGetPacients = useCallback(
    debounce((searchci) => {
      console.log(searchci)
      if (searchci === "") {
        formik.resetForm('')
        onChange(new Date())
        // setsearchci("");

      } if (searchci.length > 0) {
        getPacientsByCi({ searchci })
        setSelectSearch(false);
      }
      // setSelectSearch(false);

    }, 500),
    []
  );
  return (
    <Box>
      <Text marginTop={'-10%'} fontSize={'20px'}>Datos de cliente</Text>
      <Grid gap={'15px'} margin={'6px'} templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>

       {/* <InputOverall
          placeholder='CI/RIF'
          defaultValue={'searchResult?.ci_rif'}
          name={'ci_rif'}
          value={formik.values.ci_rif}
          onChange={e => formik.setFieldValue('ci_rif', e.target.value)}
          errors={formik.errors.ci_rif}
        />*/}
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
        <InputOverall
          placeholder='Nombres o razón social'
          name={'razon_social'}
          value={formik.values.razon_social}
          onChange={e => formik.setFieldValue('razon_social', e.target.value)}
          errors={formik.errors.razon_social}
        />

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
        // marginBottom={{ lg: '-6%', md: '-8%', sm: '-10%' }}
        marginLeft={{ lg: '82%', md: '70%', sm: '77%' }}
        borderRadius={'20px'}
        bgColor={'#137797'}
        color='#ffff'
        onClick={formik.handleSubmit}>
        Aceptar
      </Button>
    </Box>
  );
}
export default FacturaTerceros;