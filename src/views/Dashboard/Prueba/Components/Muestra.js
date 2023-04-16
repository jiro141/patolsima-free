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
    Center,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Switch,
    chakra
} from '@chakra-ui/react';
import axios from 'axios';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import BusquedaCliente from './BusquedaCliente';

const Muestra = () => {
    //definicion de los valores a cargar
    const [estudiot, setEstudiot] = useState('');
    const [estudioa, setEstudioa] = useState('');
    const [precio, setPrecio] = useState('');
    const [tmuestra, setTmuestra] = useState('');
    const [notas, setNotas] = useState('');
    const [archivo, setAchivo] = useState('');
    //carga de los datos del formulario
    const formData = {
        estudiot,
        estudioa,
        precio,
        tmuestra,
        notas,
        archivo
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
    const [pasientes, setPasientes] = useState([]);
    const [tabla, setTabla] = useState([]);
    const [Busqueda, setBusqueda] = useState("");
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    //consulta los datos de la api, mediante el metodo axios debe ser una peticion asincrona (async)
    const peticionGet = async () => {
        await axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                setPasientes(response.data);
                setTabla(response.data);
            }).catch(error => {
                //  console.log(error);
            })
    };
    //para activar el evento que filtra a los datos que se encuentran la lista
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
            {/* como se muestra la alerta en pantalla */}
            {alerta && (
                <Alert status='error' mb={4}>
                    <AlertIcon />
                    Por favor, llene todos los campos antes de continuar.
                    <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={() => mensajeAlerta(false)}
                    />
                </Alert>
            )}
            <form >
                {/* onSubmit={handleSubmit}> */}
                <Text fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Información General</Text>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
                    <Box>
                        <Text fontWeight={'bold'} marginBottom={'10px'}>Paciente</Text>
                        <Text>Molina Contreras Maria Eugenia</Text>
                        <Text>Cédula de Identidad</Text>
                        <Text>26371890</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'} marginBottom={'10px'}>Médico tratante</Text>
                        <Text marginBottom={'10px'}>Carmen Mora</Text>
                        <FormControl display='flex' alignItems='center'>
                            <Switch id='remember-login' color={'#137797'} me='10px' />
                            <FormLabel
                                htmlFor='remember-login'
                                mb='0'
                                ms='1'
                                fontWeight='normal'>
                                Envio digital
                            </FormLabel>
                        </FormControl>
                        <FormControl display='flex' alignItems='center'>
                            <Switch id='remember-login' color={'#137798'} me='10px' />
                            <FormLabel
                                htmlFor='remember-login'
                                mb='0'
                                ms='1'
                                fontWeight='normal'>
                                Urgente
                            </FormLabel>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>

                </Grid>
                <Text fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Datos de Estudio</Text>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
                    <Box>
                        <FormControl mb={3}>
                            <Input
                                placeholder='Tipo de estudio: '
                                type="text"
                                name="estudiot"
                                value={estudiot}

                            />
                        </FormControl>
                        <FormControl mb={3}>
                            <Input
                                placeholder='Estudio Asociado:'
                                type="text"
                                name="estudioa"
                                value={estudioa}

                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>Número de estudio</Text>
                        <Text> <chakra.span fontWeight={'bold'}>cod:</chakra.span> nnn-aaaa</Text>
                        <FormControl mb={3}>
                            <Input
                                placeholder='Precio ($):'
                                type="text"
                                name="precio"
                                value={precio}

                            />
                        </FormControl>
                    </Box>
                </Grid>
            </form>
            <Button
                padding={'10px 60px'}
                marginTop='20px'
                bgColor={'#137797'}
                color='#ffff'
                onClick={toggleModal}>
                Ver más</Button>
            <Modal
                size={'4xl'}
                maxWidth='100%'
                isOpen={mostrarModal}
                onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent bg="#ffff">
                    <ModalHeader>
                        <Button
                            borderRadius={'50%'}
                            colorScheme="blue"
                            width="40px"
                            height="40px"
                            marginLeft={'95%'}
                            marginTop={'-60px'}
                            bgColor={'#137797'}
                            color='#ffff'
                            onClick={toggleModal}>
                            <CloseButton
                            />
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <Box>
                            {/* {registroSeleccionado ? (
                                <MostrarCliente registroSeleccionado={pasientes} />
                            ) : ( */}
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
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                                        {pasientes.name}
                                                    </Link>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                                        {pasientes.username}
                                                    </Link>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                                        {pasientes.address.zipcode}
                                                    </Link>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                                        {pasientes.phone}
                                                    </Link>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pasientes)}>
                                                        {pasientes.email}
                                                    </Link>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Center>
                            </Box>
                            {/* )} */}
                        </Box >
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Button
                type='submit'
                marginLeft={'95%'}
                marginBottom='-10%'
                width={'40px'}
                height='40px'
                borderRadius={'50%'}
                bgColor={'#137797'}
                color='#ffff'>
                <ChevronRightIcon boxSize="2em" strokeWidth="2" />
            </Button>
        </>
    );

}

export default Muestra;
