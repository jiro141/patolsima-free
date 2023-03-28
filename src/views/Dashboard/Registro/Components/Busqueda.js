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
    Text
} from "@chakra-ui/react";


function Busqueda() {
    const [pasientes, setPasientes] = useState([]);
    const [tabla, setTabla] = useState([]);
    const [Busqueda, setBusqueda] = useState("");

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
    return (
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
                                <Td borderRadius='none'
                                borderBottom="1px solid"
                                borderBottomColor={'gray.500'}>{pasientes.name}</Td>
                                <Td borderRadius='none'
                                borderBottom="1px solid"
                                borderBottomColor={'gray.500'}>{pasientes.username}</Td>
                                <Td borderRadius='none'
                                borderBottom="1px solid"
                                borderBottomColor={'gray.500'}>{pasientes.address.zipcode}</Td>
                                <Td borderRadius='none'
                                borderBottom="1px solid"
                                borderBottomColor={'gray.500'}>{pasientes.phone}</Td>
                                <Td borderRadius='none'
                                borderBottom="1px solid"
                                borderBottomColor={'gray.500'}>{pasientes.email}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Center>
        </Box>
    );
};

export default Busqueda;
