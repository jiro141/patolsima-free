import React from "react"
import { useState } from "react";
// Chakra imports
import {
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
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/login.png";
import Imagen from "assets/img/Textura.png";
import logo from "assets/img/logo.png";
import { authApi } from "api/authApi";

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue("#137797", "#137797");
  const textColor = useColorModeValue("gray.400", "white");
  const switchColor = useColorModeValue("#137797", "while");

  // Componente de inicio de sesión
  // Estados para guardar el correo y la contraseña ingresados por el usuario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Función de inicio de sesión
  const handleLogin = async () => {
    const body1 = {
      username: username,
      password: password
    };
    const response = await authApi.post("login/", 
      body1
    );
    console.log(response);

    const data = await response.json();

    if (response.ok) {
      window.location.href = '../Dashboard/Dashboard/index.js'; // Cambia la URL a la del dashboard
    } else {
      // Maneja el error de acuerdo a tus necesidades
    }
  };
  return (
    <Flex position='relative' mb='40px' >
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
              <FormLabel mt='24px' ms='4px' fontSize='sm' fontWeight='normal'>
                Email
              </FormLabel>
              <Input
                borderRadius={'none'}
                borderTop={'none'}
                borderLeft={'none'}
                borderRight={'none'}
                borderBottomColor={'#137797'}
                mb='24px'
                fontSize='sm'
                type='text'
                size='lg'
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Contraseña
              </FormLabel>
              <Input
                borderRadius={'none'}
                borderTop={'none'}
                borderLeft={'none'}
                borderRight={'none'}
                borderBottomColor={'#137797'}
                mb='36px'
                fontSize='sm'
                type='password'
                size='lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                onClick={handleLogin}>
                Iniciar sesión
              </Button>

            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='space-between'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                <Link _hover={{ bg: { titleColor } }} as='span' ms='5px' fontWeight='bold'>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Text>
              <Text color={textColor} fontWeight='medium'>
                <Link _hover={{ bg: { titleColor } }} as='span' ms='5px' fontWeight='bold'>
                  Crear nueva cuenta
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
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
              <Text color={'whiteAlpha.900'} textAlign={'justify'} fontWeight='medium' margin={'69% 40px'} >
                La misión de Laboratorio de Anatomía Patológica Patolsima es prestar un servicio de salud, mediante la realización de estudios de laboratorio de citologías, biopsias e inmunohistoquímica, con garantía en la precisión y exactitud de los resultados, satisfaciendo las necesidades de nuestros clientes y brindándoles un servicio de calidad.
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
