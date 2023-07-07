import { useState, useEffect, useContext } from 'react';
import {
    Button,
    FormControl,
    Input,
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
    FormErrorMessage
} from '@chakra-ui/react';
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { getPacientesList, getPacientesDetail } from 'api/controllers/pacientes';
import { postPacientes } from 'api/controllers/pacientes';
import { deletePaciente } from 'api/controllers/pacientes';
import { BsFillTrashFill } from "react-icons/bs";
import Confirmacion from 'views/Dashboard/RegistroAdministracion/Components/Confirmacion';
import { putPacientes } from 'api/controllers/pacientes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModoVisualizacionContext from 'components/ModoVisualizacion/ModoVisualizacion';

const ClienteCardPut = ({ oneState, setOneState, registro, setRegistro }) => {

    //creacion de estados 
    const [pacientes, setPacientes] = useState([]);
    const [pacientesEstatico, setPacientesEstatico] = useState([]);
    const [Busqueda, setBusqueda] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [pacienteName, setPacienteName] = useState('');
    const { pacienteID} = useContext(ModoVisualizacionContext);
   // const [pacienteID, setPacienteID] = useState('');
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    //estado para el boton pase de loading... 
    const [isLoading, setIsloading] = useState(false);

    //funcion para enviar valores put (falta arreglar 2/6/2023)
    const onSubmit = async (paciente) => {
        
        setIsloading(true);
        try {
            console.log(pacienteID)
            const pacientePut = await putPacientes(pacienteID, registro)
            if (pacientePut) {
                toast.success('¡El paciente fue guardado correctamente!', {
                    autoClose: 1500,
                    onClose: () => {
                        setIsloading(false);
                    }
                });
            } else {
                toast.error('¡Hubo un error al guardar el paciente!', {
                    autoClose: 1500,
                    onClose: () => {
                        setIsloading(false);
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //para la tabla flotante, modal es la terminologia para ventana flotante 
    const toggleModal = () => {
        setMostrarModal(!mostrarModal);
    };


    //consultar los datos de la api, mostrarlos en la lista 
    const peticionGet = async () => {
        try {
            const pacientesList = await getPacientesList()
            setPacientes(pacientesList)
            setPacientesEstatico(pacientesList);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        peticionGet();
    }, []);
    const handleBusquedaChange = (event) => {
        console.log(event);
        setBusqueda(event.target.value);
        filtrar(event.target.value);
    };

    // dentro de estafuncion cambio el estado a put 
    const seleccionarRegistro = async (paciente) => {
       console.log(paciente.id)
        setPacienteID(paciente.id)
        try {
            const pacienteDetail = await getPacientesDetail(paciente.id)
            console.log(pacienteDetail.id);   
            setRegistro(pacienteDetail);
            toggleModal(true);
            setOneState('put')
            console.log(registro);
        } catch (error) {
            console.log(error);
        }
    }


    //modal confirmacion eliminacion 
    const toggleModalConfirmacion = (paciente) => {
        setShowModalConfirmacion(!showModalConfirmacion);
        setPacienteName(`${paciente.nombres} ${paciente.apellidos}`);
        setPacienteID(paciente.id)

    };
    //eliminar paciente viene desde los controladores de paciente
    const eliminarPaciente = async (pacienteID) => {
        try {
            const pacienteDelete = await deletePaciente(pacienteID);
            setPacientes(pacientes.filter(p => p.id !== pacienteID));
            // Eliminar el paciente del estado local
        } catch (error) {
            console.log(error);
        }
    }
    //para activar el evento que filtra a los datos que se encuentran la lista
    //las condicionales y los metodos para filtrar los datos, el metodo filter, toLowerCase es
    //que toma minusculas y mayusculas por y minusculas
    const filtrar = (terminoBusqueda) => {
        let resultadoBusqueda = pacientesEstatico.filter((elemento) => {
            if (elemento.apellidos.toLowerCase().includes(terminoBusqueda.toLowerCase())
                ||
                elemento.nombres.toLowerCase().includes(terminoBusqueda.toLowerCase())
                ||
                elemento.ci.toString().includes(terminoBusqueda)
            ) {
                return elemento;
            }
        });
        setPacientes(resultadoBusqueda);
    }
    //esta funcion cambia los valores que tienen los inputs
    const cambiarValoresRegistro = (key, value) => {
        setRegistro((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };
    return (
        <Box
            backgroundColor={"#FFFF"}
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
            padding={{lg:'30px',sm:'15px'}}
            borderRadius='20px'
            m={{ lg: '1% 13% 5% 13%', sm: '2%' }} >
            <form onSubmit={onSubmit}>
                <Text fontSize={'20px'} margin='15px 30px 30px 30px' color={'gray.600'}>Información Personal</Text>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            isRequired
                            placeholder='Cédula:'
                            type="number"
                            name="cedula"
                            value={registro?.ci}
                            onChange={e => cambiarValoresRegistro("ci", e.target.value)}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <Select
                            color="gray.400"
                            defaultValue="sexo"
                            value={registro?.sexo}
                            onChange={e => cambiarValoresRegistro("sexo", e.target.value)}
                        >
                            <option hidden color="gray.400">Género:</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMENINO">Femenino</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Nombres:'
                            type="text"
                            name="nombres"
                            value={registro?.nombres}
                            onChange={e => cambiarValoresRegistro("nombres", e.target.value)}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Apellidos:'
                            type="text"
                            name="apellidos"
                            value={registro?.apellidos}
                            onChange={e => cambiarValoresRegistro("apellidos", e.target.value)} />
                    </FormControl>
                </Grid>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Fecha de Nacimiento (AAAA-MM-DD): '
                            type="Text"
                            name="fecha_nacimiento"
                            value={registro?.fecha_nacimiento}
                            onChange={e => cambiarValoresRegistro("fecha_nacimiento", e.target.value)}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Procedencia'
                            type="text"
                            name="direccion"
                            value={registro?.direccion}
                            onChange={e => cambiarValoresRegistro("direccion", e.target.value)}
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
                            value={registro?.email}
                            onChange={e => cambiarValoresRegistro("email", e.target.value)} />
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Telefono de Contacto:'
                            type="text"
                            name="Telefono"
                            value={registro?.telefono_celular}
                            onChange={e => cambiarValoresRegistro("telefono_celular", e.target.value)}
                        />
                    </FormControl>
                </Grid>

            </form >
            <Button
                borderRadius={'20px'}
                padding={'10px 60px'}
                marginTop='20px'
                marginLeft={{lg:'0px',sm:'10%'}}
                bgColor={'#89bbcc'}
                color='#ffff'
                onClick={toggleModal}>
                Ver más</Button>
            <Modal
                size={'5xl'}
                maxWidth='100%'
                isOpen={mostrarModal}
                onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent
                    minH={'500px'}
                    borderRadius={'20px'}
                    bg="#ffff"
                // maxHeight="80vh" // Establece el máximo alto del modal
                // overflowY="auto" // Genera scroll cuando el contenido excede el alto máximo
                >
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
                    </ModalHeader >
                    <ModalBody marginTop={'-5%'} >
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
                                    <Box width={'100%'} maxH={'400px'} overflowY={'auto'}
                                        sx={{
                                            '&::-webkit-scrollbar': {
                                                width: '5px', // Ancho del scroll
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                background: '#89bbcc',
                                                borderRadius: '10px' // Color del scroll
                                            },
                                        }}>
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
                                            <Tbody >
                                                {pacientes && pacientes?.map((pacientes) => (
                                                    <Tr key={pacientes.id}>
                                                        <Link paddingX={'10px'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                            {pacientes.nombres}
                                                        </Link>
                                                        <Link paddingX={'10px'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                            {pacientes.apellidos}
                                                        </Link>
                                                        <Link paddingX={'10px'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                            {pacientes.ci}
                                                        </Link>
                                                        <Link paddingX={'10px'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                            {pacientes.telefono_celular}
                                                        </Link>
                                                        <Link paddingX={'10px'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(pacientes)}>
                                                            {pacientes.email}
                                                        </Link>
                                                        <Link paddingX={'10px'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => toggleModalConfirmacion(pacientes)}>
                                                            <BsFillTrashFill color='#137797' />
                                                        </Link>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </Box>
                                </Center>
                            </Box>
                        </Box >
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
                size={"xs"}
                maxWidth='100%'
                isOpen={showModalConfirmacion}
                onClose={toggleModalConfirmacion}>
                <ModalOverlay />
                <ModalContent marginTop={"15%"} bg="#ffff" borderRadius={"20px"}>
                    <ModalBody>
                        <Confirmacion id={pacienteID} close={toggleModalConfirmacion} nombres={pacienteName} eliminar={eliminarPaciente} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Button
                type='submit'
                marginLeft={{ lg: '35em', md: '80%', sm: '30%' }}
                marginBottom={{ lg: '-4.5em', md: '-5%', sm: '-20%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'
                onClick={onSubmit}
                isLoading={isLoading}
                loadingText="Guardando..."
            >
                Guardar
            </Button>
        </Box>
    );
}

export default ClienteCardPut;
// aqui debe pasarle por parametros el estado inicial (post)
//ejemplo = setOneState('post')
// este es el componente inicial de clientes (post)