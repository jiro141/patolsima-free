import { useState, useEffect } from 'react';
import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
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
    Center, Table, Thead, Tr, Th, Tbody
} from '@chakra-ui/react';
import axios from 'axios';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { getFacturasList } from 'api/controllers/facturas';
// import BusquedaCliente from './BusquedaCliente';

const ListaFacturas = () => {
    //definicion de los valores a cargar
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    //carga de los datos del formulario
    const formData = {
        nombre,
        apellido,
        especialidad,
        email,
        telefono,
    };
    //Alerta para no seguir 
    const [alerta, setAlerta] = useState(false);
    //alerta 
    const mensajeAlerta = () => {
        if (Object.values(formData).every((value) => value == '')) {
            setAlerta(true);
            setTimeout(() => { setAlerta(false); }, 3000);
        }
    };

    //para la tabla flotante, modal es la terminologia para ventana flotante 
    const [mostrarModal, setMostrarModal] = useState(false);
    const toggleModal = () => {
        setMostrarModal(!mostrarModal);
    };
    //consultar los datos de la api, mostrarlos en la lista 
    const [facturas, setFacturas] = useState([]);
    const [tabla, setTabla] = useState([]);
    const [Busqueda, setBusqueda] = useState("");
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    //consulta los datos de la api, mediante el metodo axios debe ser una peticion asincrona (async)
    const peticionGet = async () => {
        try {
          const facturasList = await getFacturasList()
          setFacturas(facturasList)
          setTabla(facturasList);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        peticionGet();
      }, []);
    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
        filtrar(event.target.value)
    };
    //las condicionales y los metodos para filtrar los datos, el metodo filter, toLowerCase es
    //que toma minusculas y mayusculas por y minusculas
    const filtrar = (terminoBusqueda) => {
        let resultadoBusqueda = tabla.filter((elemento) => {
            if (elemento.cliente.razon_social.toLowerCase().includes(terminoBusqueda.toLowerCase())
                ||
                elemento.cliente.ci_rif.toString().includes(terminoBusqueda)
            ) {
                return elemento;
            }
        });
        setFacturas(resultadoBusqueda);
    }
    const [registro, setRegistro] = useState([]);
    const seleccionarRegistro = (registro) => {
        setRegistroSeleccionado(registro);

        console.log('Registro seleccionado:', registro);

        setNombre(registro.nombre);
        setApellido(registro.apellido);
        setEspecialidad(registro.especialidad);
        setEmail(registro.email);
        setTelefono(registro.telefono);

        toggleModal();
    }
   

    return (
        <>
            <Box>
                <Box>
                    <Box bg="none" py={4} mb={4}>
                        <Grid templateColumns={'1fr 2fr'} maxW="container.lg">
                            <Text margin={'auto'} fontWeight={'bold'} color='gray.500' fontSize={'24px'}> Buscar Registro</Text>
                            <Input
                                focusBorderColor="transparent"
                                border={'none'}
                                borderRadius='none'
                                borderBottom="1px solid"
                                borderBottomColor={'gray.500'}
                                placeholder="Buscar..."
                                size="lg"
                                value={Busqueda}
                                onChange={handleBusquedaChange}
                            />
                        </Grid>
                    </Box>
                    <Center >
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >#</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >Recibida</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >Impresa</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >Cliente</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center'>RIF/CI</Th>
                                        <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center'>Monto ($)</Th>
                                        <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center'>Monto(Bs)</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {facturas && facturas.map((facturas) => (
                                    <Tr key={facturas.id}>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(facturas)}>
                                            {facturas.id}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(facturas)}>
                                            {/* {facturas.address.zipcode} */}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(facturas)}>
                                            {/* {facturas.address.zipcode} */}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(facturas)}>
                                            {facturas.cliente.razon_social}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(facturas)}>
                                            {facturas.cliente.ci_rif}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(facturas)}>
                                            {/* {facturas.address.geo.lat} */}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(facturas)}>
                                            {/* {facturas.address.geo.lng} */}
                                        </Link>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Center>
                </Box>
            </Box >
        </>
    );

}

export default ListaFacturas;
