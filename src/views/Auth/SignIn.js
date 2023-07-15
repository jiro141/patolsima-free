import React, { useContext } from "react"
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
// Chakra imports
import {
  Modal,
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  useImage,
  CloseButton,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

// Assets
import signInImage from "assets/img/login.png";
import Imagen from "assets/img/Textura.png";
import logo from "assets/img/logo.png";
import { useAuthContext } from "hooks/useAuthContext";
import Axios from "api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import MainContext from "context/mainContext/MainContext";

function SignIn() {
  // Estados para guardar el correo y la contraseña ingresados por el usuario
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();
  const {setLoginSuccess}=useContext(MainContext)
   //carga de los datos del formulario
   const formik = useFormik({
    initialValues: {
      username:"",
      password:""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("El campo es obligatorio"),
      password: Yup.string().required("El campo es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      setLoading(true)
      try {
        const { data } = await Axios.post("/login/",formData );
         window.localStorage.setItem('access', data.access);
         window.localStorage.setItem('refresh', data.refresh);
         setLoginSuccess(true)
         //setError(false)
         history.push('layouts/Admin.js'); 	
      } catch (error) {
        setError(error.message)
        console.log(error);
       
        history.push('/'); 	
      }finally{
        setLoading(false)
        if(error){
          toast.error(error, {
            autoClose: 1000,
          });
        }
        return 
      }
    },
  });



  // Chakra color mode
  const titleColor = useColorModeValue("#137797", "#137797");
  const textColor = useColorModeValue("gray.400", "white");
  const switchColor = useColorModeValue("#137797", "while");



  return (<>

    <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}>
      <ModalOverlay />
      <ModalContent borderRadius={'20px'} maxW={{ sm: '65%', lg: '30%' }} bg="white">
        <ModalHeader textAlign={'center'} marginBottom={'-15px'} marginTop={'15px'}>Error de inicio de sesión</ModalHeader>
        <ModalCloseButton
          marginTop={'-25px'}
          color={'white'}
          w={'40px'}
          h={'40px'}
          borderRadius={'50%'}
          bg={'#137797'}
          _hover={{
            bg: '#137797',
            cursor: 'pointer'
          }}
        />
        <ModalBody>
          <p>Los datos suministratos son incorrectos. Por favor, inténtelo de nuevo.</p>
        </ModalBody>
      </ModalContent>
    </Modal>

    <Flex  position='relative' mb='40px' >
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          backgroundImage={Imagen}
          bgRepeat='no-repeat'
          bgPosition={'center'}
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Text
              mb='5px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'
              textAlign={'center'}>
              Bienvenidos, ingresa en cuestión de segundos.
            </Text>
            <Heading color={titleColor} fontSize='28px' mb='10px' textAlign={'center'}>
              Iniciar sesión
            </Heading>

            <FormControl>
              <FormLabel mt='24px' ms='4px' fontSize='sm' fontWeight='bold'>
                Usuario
              </FormLabel>
              <Input
                borderRadius={'none'}
                borderTop={'none'}
                borderLeft={'none'}
                borderRight={'none'}
                borderBottomColor={'#137797'}
                mb='10px'
                fontSize='sm'
                type='text'
                id="username"
                size='lg'
                name="username"
                onChange={(e) =>
                  formik.setFieldValue("username", e.target.value)
                }
              />
              { formik.errors.username &&
              <div style={{marginBottom:'15px'}}>
              <p style={{color:'red',fontWeight:'bold'}} >{formik.errors.username}</p>
              </div>}
              <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                Contraseña
              </FormLabel>
              <Input
                borderRadius={'none'}
                borderTop={'none'}
                borderLeft={'none'}
                borderRight={'none'}
                borderBottomColor={'#137797'}
                mb='20px'
                fontSize='sm'
                type='password'
                id="password"
                size='lg'
                name="password"
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
                //value={password}
               // onChange={(e) => setPassword(e.target.value)}
              />
               {
                formik.errors.password &&
                <div style={{marginBottom:'15px'}}>
               <p style={{color:'red',fontWeight:'bold'}}>{formik.errors.password}</p>
               </div>}

              <FormControl display='flex' alignItems='center'>
                <Switch id='remember-login' color={switchColor} me='10px' />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  ms='1'
                  fontWeight='normal'>
                  Recuerda mi Usuario
                </FormLabel>
              </FormControl>
              <Button
                backgroundColor={'#137797'}
                fontSize='18px'
                type='submit'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "#0D5C6F",
                  color: "white"
                }}
                onClick={formik.handleSubmit}>
               {loading ?'Cargando...' : 'Iniciar sesión'}
              </Button>

            </FormControl>
          
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          overflowY={'hidden'}
          h='100%'
          w='50vw'
          position='absolute'
          right='0px'
        >
          <Box
            backgroundColor={'blackAlpha.600'}
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='58%'
            position='absolute'
            borderBottomLeftRadius='20px'>
            <Box >
              <Text color={'whiteAlpha.900'} textAlign={'justify'} fontWeight='medium' margin={'67% 40px'} >
                La misión de Laboratorio de Anatomía Patológica Patolsima es prestar un servicio de salud, mediante la realización de estudios de laboratorio de citologías, biopsias e inmunohistoquímica, con garantía en la precisión y exactitud de los resultados, satisfaciendo las necesidades de nuestros clientes y brindándoles un servicio de calidad.
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  </>
  );
}

export default SignIn;
