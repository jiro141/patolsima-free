import { useEffect, useState } from 'react';
import { Await } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Grid,
    Center,
    Container,
    Input,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Button,
    Link
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";


function Busqueda() {
    const [pasientes, setPasientes] = useState([]);
    const [tabla, setTabla] = useState([]);
    const [Busqueda, setBusqueda] = useState("");
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

    const peticionGet = async () => {
        await axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                setPasientes(response.data);
                setTabla(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        peticionGet();
    }, []);
    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
        filtrar(event.target.value)
    };
    const filtrar = (terminoBusqueda) => {
        var resultadoBusqueda = tabla.filter((elemento) => {
            if (elemento.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.username.toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.address.zipcode.includes(terminoBusqueda)
            ) {
                return elemento;
            }
        });
        setPasientes(resultadoBusqueda);
    }

    const seleccionarRegistro = (registro) => {
        setRegistroSeleccionado(registro);
    }
    return (
        <Box>
            {registroSeleccionado ? (
                <FormularioRegistro registro={registroSeleccionado} />
            ) : (
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
                    <Center>
                        <Table variant="simple">
                            <Thead>
                                <Tr >
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >Nombre</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >Apellidos</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >RIF/Cédula</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >Teléfono</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center'>Correo</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {pasientes && pasientes.map((pasientes) => (
                                    <Tr key={pasientes.id}>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(paciente)}>
                                            {pasientes.name}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(paciente)}>
                                            {pasientes.username}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(paciente)}>
                                            {pasientes.address.zipcode}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(paciente)}>
                                            {pasientes.phone}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(paciente)}>
                                            {pasientes.email}
                                        </Link>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Center>
                </Box>
            )
            }
        </Box >
    );
};

export default Busqueda;
