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
import ModoVisualizacionContext from 'components/ModoVisualizacion/ModoVisualizacion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClienteCardPostInitial = ({ oneState, setOneState, registro, setRegistro,siguiente, isLoading, setIsloading }) => {
    const { setFormValues, pacienteID, setPacienteID } = useContext(ModoVisualizacionContext);
    //manejo de estados

    //modal listado de pacientes
    const [mostrarModal, setMostrarModal] = useState(false);
    //render de pacientes
    const [pacientes, setPacientes] = useState([]);
    //para buscar los pacientes en la lista
    const [pacientesEstatico, setPacientesEstatico] = useState([]);
    //el estado de busqueda de la lista
    const [Busqueda, setBusqueda] = useState("");
    //guardo los nombres para mostrar en la confirmacion
    const [pacienteName, setPacienteName] = useState('');
    //modal confirmacion eliminacion 
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    //guardar el id del paciente a eliminar
    const [pacienteIdDelete, setPacienteIdDelete] = useState('');
    

    //Formik junto con yup sirve para validar la entrada en los inputs, ademas hace una manera mas sencilla de manejar los metodos post y put
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
            // setIsloading(true);// cuando carga un paciente pasa a true
            try {
                const pacientePost = await postPacientes(formData);
                setFormValues(formData);
                setPacienteID(pacientePost);
                console.log(pacientePost);
                if (pacientePost) {
                    toast.success('¡El paciente fue guardado correctamente!', {
                        autoClose: 1500,
                        onClose: () => {
                            // setIsloading(false);
                        }
                    });
                } else {
                    toast.error('¡Hubo un error al guardar el paciente!', {
                        autoClose: 1500,
                        onClose: () => {
                            // setIsloading(false);
                        }
                    });
                }
            }
            catch (error) {
                console.log(error);

            }
            return;
        },
    });
    const isError = formik.errors

    //para la tabla flotante, modal es la terminologia para ventana flotante 
    const toggleModal = () => {
        setMostrarModal(!mostrarModal);
    };

    // hacer la peticion para que se muestre la lista de pacientes en el modal
    const peticionGet = async () => {
        try {
            //aqui hago la peticion a los controladores
            const pacientesList = await getPacientesList()
            // console.log(pacientesList);
            //seteo el estado con la nueva carga de pacientes
            setPacientes(pacientesList)
            //lo guardo para tambien filtrarlo en la lista
            setPacientesEstatico(pacientesList);
        } catch (error) {
            console.log(error);
        }
    };
    //pd: no entiendo este useEffect pero si lo quito no funciona asi que se queda 
    useEffect(() => {
        peticionGet();
    }, []);
    //cambia el estado de la busqueda para aplicar la el filtro en la funcion 
    const handleBusquedaChange = (event) => {
        // console.log(event);
        setBusqueda(event.target.value);
        filtrar(event.target.value);
    };

    // dentro de estafuncion cambio el estado a put 
    const seleccionarRegistro = async (paciente) => {
        try {
            const pacienteDetail = await getPacientesDetail(paciente.id)
            setRegistro(pacienteDetail);
            toggleModal(true);
            setOneState('put')
        } catch (error) {
            console.log(error);
        }
    }
    //abri el modal de confimacion 
    const toggleModalConfirmacion = (paciente) => {
        setShowModalConfirmacion(!showModalConfirmacion);
        setPacienteName(`${paciente.nombres} ${paciente.apellidos}`);
        setPacienteIdDelete(paciente.id)

    };
    //metodo delete cargo el ID, para enviarlo al controlador y alla lo reciba  
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
        <Box
            backgroundColor={"#FFFF"}
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
            padding={'30px'}
            borderRadius='20px'
            m={{ lg: '1% 13% 5% 13%', sm: '2%' }} >
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
                            <option hidden >Género:</option>
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
                        <Confirmacion id={pacienteIdDelete} close={toggleModalConfirmacion} nombres={pacienteName} eliminar={eliminarPaciente} />
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
                onClick={formik.handleSubmit}                  
                isLoading={isLoading}
                loadingText="Guardando..."
            >
                Guardar
            </Button>
        </Box >
    );
}

export default ClienteCardPostInitial;
// aqui debe pasarle por parametros el estado inicial (post)
//ejemplo = setOneState('post')
// este es el componente inicial de clientes (post)