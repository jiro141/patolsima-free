import { React, useContext, useState } from "react";
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

const FacturaTerceros = ({ study, setShowModal }) => {
  const { setfactClientTerceros } = useContext(MainContext)
  const formik = useFormik({
    initialValues: {
      email: '',
      direccion: '',
      telefono_fijo: null,
      telefono_celular: "",
      razon_social: "",
      ci_rif: ""
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
        const resPost = await postFacturaTerceros(formData)
        if (resPost) {
          setfactClientTerceros(resPost)
          //console.log(resPost)
          toast.success("¡Se creo la factura correctamente!", {
            autoClose: 1000,
          });
          setShowModal(false)
        }
      } catch (error) {
        toast.success("¡Ocurrio un error para crear la factura!", {
          autoClose: 1000,
        });
      }


    },
  });


  return (
    <Box>
      <Text marginTop={'-10%'} fontSize={'20px'}>Datos de cliente</Text>
      <Grid gap={'15px'} margin={'6px'} templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>

        <InputOverall
          placeholder='CI/RIF'
          name={'ci_rif'}
          value={formik.values.ci_rif}
          onChange={e => formik.setFieldValue('ci_rif', e.target.value)}
          errors={formik.errors.ci_rif}
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
          value={formik.values.telefono_celular}
          onChange={e => formik.setFieldValue('telefono_celular', e.target.value)}
          errors={formik.errors.telefono_celular}
        />
        <InputOverall
          placeholder='Telefono Fijo'
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