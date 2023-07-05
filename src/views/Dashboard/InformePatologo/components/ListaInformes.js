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
import { getListInforme } from 'api/controllers/informes';
import { deleteInforme } from 'api/controllers/informes';
// import BusquedaCliente from './BusquedaCliente';

const ListaInformes = () => {
   
    //Alerta para no seguir 
    const [alerta, setAlerta] = useState(false);
    const [informes, setInformes] = useState();
    const [informesList,setInformesList]=useState();
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
    const [Busqueda, setBusqueda] = useState("");
    //consulta los datos de la api, mediante el metodo axios debe ser una peticion asincrona (async)
    const peticionGet = async () => {
        try {
            const informesList = await getListInforme()
            setInformes(informesList);
            setInformesList(informesList)

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
    //para activar el evento que filtra a los datos que se encuentran la lista
    //las condicionales y los metodos para filtrar los datos, el metodo filter, toLowerCase es
    //que toma minusculas y mayusculas por y minusculas
    const filtrar = (terminoBusqueda) => {
        let resultadoBusqueda = informesList.filter((elemento) => {
            if (elemento.estudio_codigo.toLowerCase().includes(terminoBusqueda.toLowerCase())
                ||
                elemento.estudio_tipo.toLowerCase().includes(terminoBusqueda.toLowerCase())
                ||
                elemento.estudio_paciente_ci.toString().includes(terminoBusqueda)
            ) {
                return elemento;
            }
        });
        
        setInformes(resultadoBusqueda);
    }
    const eliminarInforme = async () => {
        try {
            const pacienteDelete = await deleteInforme(informes.id);
            // setInformes(informes.filter(i => i.id !== ));
            // Eliminar el paciente del estado local
        } catch (error) {
            console.log(error);
        }
    }
    const renderDate = (createdAt) => {
        const date = createdAt ? new Date(createdAt) : null;
        if (date) {
            const formattedDate = date.toLocaleDateString();
            return formattedDate;
        }
        return '';
    };
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
                                        textAlign='center' ># Muestra</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >Fecha de impresa</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >Paciente</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center' >RIF/CI</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center'>Tipo de Estudio</Th>
                                    <Th borderRadius='none'
                                        borderBottom="3px solid"
                                        borderBottomColor={'gray.500'}
                                        textAlign='center'>Patologo</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {informes && informes.map((informe) => (
                                    <Tr key={informe.id}>
                                        <Link textAlign={'center'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                            {informe.estudio_codigo}
                                        </Link>
                                        <Link textAlign={'center'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                            {renderDate(informe.created_at)}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                            {/* {pasientes.address.zipcode} */}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                            {informe.estudio_paciente_ci}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                            {informe.estudio_tipo}
                                        </Link>
                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                            {informe.estudio_patologo_name}
                                        </Link>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Center>
                </Box>
                {/* )} */}
            </Box >
        </>
    );

}

export default ListaInformes;
