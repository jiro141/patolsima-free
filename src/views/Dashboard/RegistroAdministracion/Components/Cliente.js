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
    Select,
    // SelectOption
} from '@chakra-ui/react';
import axios from 'axios';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import BusquedaCliente from './BusquedaCliente';
import { authApi, makeRequest } from 'api/authApi';

const Cliente = ({ oneState, setOneState }) => {
    //definicion de los valores a cargar
    const [cedula, setCedula] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sexo, setSexo] = useState('');
    //carga de los datos del formulario
    const formData = {
        cedula,
        nombres,
        apellido,
        fecha_nacimiento,
        direccion,
        email,
        telefono,
        sexo
    };
    useEffect(() => {
        // console.log(cedula, nombre, apellido, fecha_nacimiento, procedencia, email, telefono);
        if (cedula && nombres && apellido && fecha_nacimiento && direccion && email && telefono && sexo) {
            setOneState(true);
        } else {
            setOneState(false);
        }
    }, [cedula, nombres, apellido, fecha_nacimiento, direccion, email, telefono, sexo]);
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
    const [pacientes, setPacientes] = useState([]);
    const [tabla, setTabla] = useState([]);
    const [Busqueda, setBusqueda] = useState("");
    const [registroSeleccionado, setRegistroSeleccionado] = useState(
        {
            // ci: "",
            // nombres: "",
            // apellidos: "",
            // email: "",
            // telefono_celular: "",
            // direccion:"",
            // fecha_nacimiento:""
        }
    );
    //consulta los datos de la api, mediante el metodo axios debe ser una peticion asincrona (async)
    const peticionGet = async () => {
        const token = decodeURIComponent(document.cookie).split(";")[1].slice(7);
        await authApi.get("/v1/core/pacientes/", {
        })
            .then(response => {
                setPacientes(response.data.results);
                setTabla(response.data.results);
            }).catch(error => {
                console.log(error);
            })
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
        var resultadoBusqueda = tabla.filter((elemento) => {
            if (elemento.nombres.toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.apellidos.toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.ci.includes(terminoBusqueda)
            ) {
                return elemento;
            }
        });
        setPacientes(resultadoBusqueda);
    }
    const [registro, setRegistro] = useState([]);
    const seleccionarRegistro = async (registro) => {
        try {
            const response = await makeRequest('GET', `v1/core/pacientes/:id/`, { pathParams: { id: registro.id } })
            if (response) {
                console.log(response);
                setRegistroSeleccionado({
                    ...response.data
                });
                toggleModal();
            }
        }catch(error){
            console.log(error);
        }
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
                <Text fontSize={'20px'} margin='15px 30px 30px 30px' color={'gray.600'}>Información Personal</Text>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Cédula:'
                            type="number"
                            name="cedula"
                            value={registroSeleccionado?.ci}
                            onChange={e => setCedula(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <Select onChange={e => setSexo(e.target.value)} defaultValue="sexo">
                            <option hidden colorScheme="gray.400">Genero:</option>
                            <option value={registroSeleccionado?.sexo}>Masculino</option>
                            <option value={registroSeleccionado?.sexo}>Femenino</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Nombres:'
                            type="text"
                            name="nombre"
                            value={registroSeleccionado ? registroSeleccionado?.nombres : ''}
                            onChange={e => setNombres(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Apellidos:'
                            type="text"
                            name="apellido"
                            value={registroSeleccionado?.apellidos}
                            onChange={e => setApellido(e.target.value)}
                        />
                    </FormControl>
                </Grid>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Fecha de Nacimiento (DD/MM/AAAA): '
                            type="Text"
                            name="fecha_nacimiento"
                            value={registroSeleccionado ? registroSeleccionado?.fecha_nacimiento : fecha_nacimiento}
                            onChange={(event) => setFecha_nacimiento(event.target.value)}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Procedencia'
                            type="text"
                            name="direccion"
                            value={registroSeleccionado?.direccion}
                            onChange={(event) => setDireccion(event.target.value)}
                        />
                    </FormControl>
                </Grid>
                <Text fontSize={'20px'} margin='15px 30px 30px 30px' color={'gray.600'}>Información de Contacto</Text>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Email:'
                            type="email"
                            name="email"
                            value={registroSeleccionado?.email}
                            onChange={(event) => setEmail(event.target.value)} />
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Telefono de Contacto:'
                            type="text"
                            name="Telefono"
                            value={registroSeleccionado?.telefono_celular}
                            onChange={(event) => setTelefono(event.target.value)}
                        />
                    </FormControl>
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
                                            {pacientes && pacientes?.map((pacientes) => (
                                                <Tr key={pacientes.id}>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                        {pacientes.nombres}
                                                    </Link>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                        {pacientes.apellidos}
                                                    </Link>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                        {pacientes.ci}
                                                    </Link>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                        {pacientes.telefono_celular}
                                                    </Link>
                                                    <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                        {pacientes.email}
                                                    </Link>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Center>
                            </Box>
                        </Box >
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Button
                marginLeft={{ lg: '90%', md: '80%', sm: '70%' }}
                marginBottom={{ lg: '-8%', md: '-15%', sm: '-30%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'
                onClick={mensajeAlerta}>
                Guardar
            </Button>
        </>
    );

}

export default Cliente;
