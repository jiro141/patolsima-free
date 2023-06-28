import { useState, useEffect, useContext } from 'react';
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
    FormErrorMessage
} from '@chakra-ui/react';
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { getPacientesList, getPacientesDetail } from 'api/controllers/pacientes';
import { postPacientes } from 'api/controllers/pacientes';
import { deletePaciente } from 'api/controllers/pacientes';
import { BsFillTrashFill } from "react-icons/bs";
import Confirmacion from './Confirmacion';




const Cliente = ({ oneState, setOneState }) => {

     //estado de data inicial 
    //  const [data, setData] = useState({});
    const formik = useFormik({
        initialValues: {
            nombres: '',
            apellidos: '',
            ci: '',
            telefono_celular: "",
            direccion: "",
            fecha_nacimiento: "",
            sexo: "",
            email: ""
        },
        validationSchema: Yup.object(
            {
                nombres: Yup.string().required('Los nombres son obligatorios'),
                apellidos: Yup.string().required('Los apellidos son obligatorios'),
                ci: Yup.string().required('La cedula es obligatoria'),
                telefono_celular: Yup.string().required('el telefono es obligatorio'),
                direccion: Yup.string().required('La direccion es obligatoria'),
                fecha_nacimiento: Yup.string().required('La fecha de nacimiento es obligatoria'),
                sexo: Yup.string().required('el sexo es obligatorio'),
                email: Yup.string().email('direccion de correo no valida').required('el correo es obligatorio')
            }
        ),
        validateOnChange: false,
        onSubmit: async (formData, { resetForm }) => { // se agregar resetForm para limpar los campos del formulario 
            try {
                const pacientePost = await postPacientes(formData);
                // const setFormValues = (values) => {
                //     setData((prevValues) => ({
                //       ...prevValues,
                //       ...values,
                //     }));
                //   };
               // resetForm();
                // setPacientes([...pacientes, pacientePost]); // para no refrezcar la pag, se setea el estado
            }
            catch (error) {
                console.log(error);
            }
            return;
        },
    });

    const isError = formik.errors

    //para la tabla flotante, modal es la terminologia para ventana flotante 
    const [mostrarModal, setMostrarModal] = useState(false);
    const toggleModal = () => {
        setMostrarModal(!mostrarModal);
    };
    //consultar los datos de la api, mostrarlos en la lista 
    const [pacientes, setPacientes] = useState([]);
    const [pacientesEstatico, setPacientesEstatico] = useState([]);
    const [Busqueda, setBusqueda] = useState("");
   
    
    const [registroSeleccionado, setRegistroSeleccionado] = useState(
        {
            ci: "",
            nombres: "",
            apellidos: "",
            email: "",
            telefono_celular: "",
            direccion: "",
            fecha_nacimiento: "",
            sexo: ""
        }
    );
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

    const [pacienteName, setPacienteName] = useState('');
    const [pacienteID,setPacienteID]=useState('');
    
    
    // dentro de estafuncion cambio el estado a put 
    const seleccionarRegistro = async (paciente) => {
        try {
            const pacienteDetail = await getPacientesDetail(paciente.id)
            setRegistroSeleccionado(pacienteDetail);
            toggleModal(true);
            setOneState('put')
        } catch (error) {
            console.log(error);
        }
    }


    //modal confirmacion eliminacion 
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const toggleModalConfirmacion = (paciente) => {
        setShowModalConfirmacion(!showModalConfirmacion);
        setPacienteName(`${paciente.nombres} ${paciente.apellidos}`);
        setPacienteID(paciente.id)

    };
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

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Text fontSize={'20px'} margin='15px 30px 30px 30px' color={'gray.600'}>Información Personal</Text>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl isInvalid={formik.errors.ci} mb={3}>
                        <Input
                            isRequired
                            placeholder='Cédula:'
                            type="number"
                            name="cedula"
                            value={formik.values.ci}
                            onChange={e => formik.setFieldValue('ci', e.target.value)}
                        />
                        {!isError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>{formik.errors.ci}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={formik.errors.sexo} mb={3}>
                        <Select
                            color="gray.400"
                            onChange={e => formik.setFieldValue('sexo', e.target.value)}
                            defaultValue="sexo"
                            value={formik.values.sexo}
                            error={formik.errors.sexo}
                        >
                            <option hidden color="gray.400">Género:</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMENINO">Femenino</option>
                        </Select>
                        {!isError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>{formik.errors.sexo}</FormErrorMessage>
                        )}
                    </FormControl>
                </Grid>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl isInvalid={formik.errors.nombres} mb={3}>
                        <Input
                            placeholder='Nombres:'
                            type="text"
                            name="nombre"
                            value={formik.values.nombres}
                            onChange={e => formik.setFieldValue('nombres', e.target.value)}
                        />
                        {!isError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>{formik.errors.nombres}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={formik.errors.apellidos} mb={3}>
                        <Input
                            placeholder='Apellidos:'
                            type="text"
                            name="apellido"
                            value={formik.values.apellidos}
                            onChange={e => formik.setFieldValue('apellidos', e.target.value)} />
                        {!isError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>{formik.errors.apellidos}</FormErrorMessage>
                        )}
                    </FormControl>
                </Grid>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl isInvalid={formik.errors.fecha_nacimiento} mb={3}>
                        <Input
                            placeholder='Fecha de Nacimiento (AAAA-MM-DD): '
                            type="Text"
                            name="fecha_nacimiento"
                            value={formik.values.fecha_nacimiento}
                            onChange={e => formik.setFieldValue('fecha_nacimiento', e.target.value)}
                        />
                        {!isError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>{formik.errors.fecha_nacimiento}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={formik.errors.direccion} mb={3}>
                        <Input
                            placeholder='Procedencia'
                            type="text"
                            name="direccion"
                            value={formik.values.direccion}
                            onChange={e => formik.setFieldValue('direccion', e.target.value)}
                        />
                        {!isError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>{formik.errors.direccion}</FormErrorMessage>
                        )}
                    </FormControl>
                </Grid>
                <Text fontSize={'20px'} margin='15px 30px 30px 30px' color={'gray.600'}>Información de Contacto</Text>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl isInvalid={formik.errors.email} mb={3}>
                        <Input
                            placeholder='Email:'
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={e => formik.setFieldValue('email', e.target.value)} />
                    </FormControl>
                    {!isError ? (
                        <></>
                    ) : (
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    )}
                    <FormControl isInvalid={formik.errors.telefono_celular} mb={3}>
                        <Input
                            placeholder='Telefono de Contacto:'
                            type="text"
                            name="Telefono"
                            value={formik.values.telefono_celular}
                            onChange={e => formik.setFieldValue('telefono_celular', e.target.value)}
                        />
                        {!isError ? (
                            <></>
                        ) : (
                            <FormErrorMessage>{formik.errors.telefono_celular}</FormErrorMessage>
                        )}
                    </FormControl>
                </Grid>

            </form >
            <Button
                borderRadius={'20px'}
                padding={'10px 60px'}
                marginTop='20px'
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
                marginLeft={{ lg: '38em', md: '80%', sm: '70%' }}
                marginBottom={{ lg: '-4.5em', md: '-15%', sm: '-30%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'
                onClick={formik.handleSubmit}>
                Guardar
            </Button>
        </>
    );
}

export default Cliente;
