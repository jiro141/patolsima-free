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
    Center, Table, Thead, Tr, Th, Tbody
} from '@chakra-ui/react';
import { BsFillTrashFill } from "react-icons/bs";
import { getMedicosList } from 'api/controllers/medicos';
import { getMedicosDetail } from 'api/controllers/medicos';
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { postMedicos } from 'api/controllers/medicos';
import Confirmacion from 'views/Dashboard/RegistroAdministracion/Components/Confirmacion';
import ModoVisualizacionContext from 'components/ModoVisualizacion/ModoVisualizacion';
import SaveButton from './Buttons/SaveButton';
import { Title } from './Texts';

const MedicoCardPostInitial = ({ twoState, setTwoState, registro, setRegistro }) => {
    const { setFormValues, setMedicoID } = useContext(ModoVisualizacionContext);
    console.log('estoy en post medico')
    const formik = useFormik({
        initialValues: {
            email: '',
            nombres: '',
            apellidos: '',
            especialidad: '',
            telefono_celular: "",
           
        },
        onSubmit: async (formData, { resetForm }) => { 
            try {
                const guardarMedico = await postMedicos(formData);
                // resetForm();
                if (guardarMedico) {
                    toast.success('¡El medico fue guardado correctamente!', {
                        autoClose: 1500,
                        onClose: () => {
                            setIsloading(false);
                        }
                    });
                } else {
                    toast.error('¡Hubo un error al guardar el medico!', {
                        autoClose: 1500,
                        onClose: () => {
                            setIsloading(false);
                        }
                    });
                }
                setFormValues(formData, 'medico');
            }
            catch (error) {
                console.log(error);
            }
            return;
        },
    });
    //definicion de los valores a cargar
    const [medicos, setMedicos] = useState('');

    //para la tabla flotante, modal es la terminologia para ventana flotante 
    const [mostrarModal, setMostrarModal] = useState(false);
    const toggleModal = () => {
        setMostrarModal(!mostrarModal);
    };
    //consultar los datos de la api, mostrarlos en la lista 
    const [tabla, setTabla] = useState([]);
    const [Busqueda, setBusqueda] = useState("");
    //consulta los datos de la api, mediante el metodo axios debe ser una peticion asincrona (async)
    const peticionGet = async () => {
        try {
            const medicosList = await getMedicosList()
            setMedicos(medicosList)
            setTabla(medicosList)
            //    console.log(pacientesList);
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

    const [medicoName, setMedicoName] = useState('');
    //const [medicoID, setMedicoID] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    //modal confirmacion eliminacion 
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);


    const toggleModalConfirmacion = (medico) => {
        setShowModalConfirmacion(!showModalConfirmacion);
        setMedicoName(`${medico.nombres} ${medico.apellidos}`);
        setMedicoID(medico.id)
        setEspecialidad(medico.especialidad);

    };

    const eliminarMedico = async (medicoID) => {
        try {
            const medicoDelete = await deletePaciente(medicoID);
            setPacientes(medicos.filter(p => p.id !== medicoID));
            // Eliminar el paciente del estado local
        } catch (error) {
            console.log(error);
        }
    }

    //las condicionales y los metodos para filtrar los datos, el metodo filter, toLowerCase es
    //que toma minusculas y mayusculas por y minusculas
    const filtrar = (terminoBusqueda) => {
        let resultadoBusqueda = tabla.filter((elemento) => {
            if (elemento.nombres.toLowerCase().includes(terminoBusqueda.toLowerCase())
                ||
                elemento.apellidos.toLowerCase().includes(terminoBusqueda.toLowerCase())
                ||
                elemento.especialidad.toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setMedicos(resultadoBusqueda);
    }
    const seleccionarRegistro = async (medico) => {
        try {
            const medicosDetail = await getMedicosDetail(medico.id)
            setRegistro(medicosDetail);
            toggleModal(true);
            setTwoState('put')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box backgroundColor={"#FFFF"}
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
            padding={{ lg: '30px', sm: '15px' }}
            borderRadius='20px'
            m={{ lg: '1% 13% 5% 13%', sm: '2%' }} >
            <form >
                <Text fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Información Personal</Text>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Nombres:'
                            type="text"
                            name="nombres"
                            value={formik.values.nombres}
                            onChange={e => formik.setFieldValue('nombres', e.target.value)}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Apellidos:'
                            type="text"
                            name="Apellido"
                            value={formik.values.apellidos}
                            onChange={e => formik.setFieldValue('apellidos', e.target.value)}
                        />
                    </FormControl>
                </Grid>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Especialidad '
                            type="text"
                            name="Especialidad"
                            value={formik.values.especialidad}
                            onChange={e => formik.setFieldValue('especialidad', e.target.value)}
                        />
                    </FormControl>
                </Grid>
                <Text fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Información de Contacto</Text>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: '1fr' }} gap={{ lg: '20px', sm: '5px' }}>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Email:'
                            // type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={e => formik.setFieldValue('email', e.target.value)}
                        />
                    </FormControl>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Telefono de Contacto:'
                            type="text"
                            name="Telefono"
                            value={formik.values.telefono_celular}
                            onChange={e => formik.setFieldValue('telefono_celular', e.target.value)}
                        />
                    </FormControl>
                </Grid>
            </form>
          {/*  <Button
                borderRadius={'20px'}
                padding={'10px 60px'}
                marginTop='20px'
                marginLeft={{ lg: '0px', sm: '10%' }}
                bgColor={'#89bbcc'}
                color='#ffff'
                onClick={toggleModal}>
                Ver más</Button>*/}
            <Modal
                size={'4xl'}
                maxWidth='100%'
                isOpen={mostrarModal}
                onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent minH={'500px'} borderRadius={'20px'} bg="#ffff">
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
                    <ModalBody marginTop={'-5%'}>
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
                                                <Tr>
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
                                                        textAlign='center' >Especialidad</Th>
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
                                                {medicos && medicos.map((medico) => (
                                                    <Tr key={medico.id}>
                                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(medico)}>
                                                            {medico.nombres}
                                                        </Link>
                                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(medico)}>
                                                            {medico.apellidos}
                                                        </Link>
                                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(medico)}>
                                                            {medico.especialidad}
                                                        </Link>
                                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(medico)}>
                                                            {medico.telefono_celular}
                                                        </Link>
                                                        <Link as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => seleccionarRegistro(medico)}>
                                                            {medico.email}
                                                        </Link>
                                                        <Link paddingX={'10px'} as="td" margin={'10px'} borderRadius="none" borderBottom="1px solid" borderBottomColor="gray.500" onClick={() => toggleModalConfirmacion(medico)} >
                                                            <BsFillTrashFill color='#137797' />
                                                        </Link>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </Box>
                                </Center>
                            </Box>
                            {/* )} */}
                        </Box >
                    </ModalBody>
                </ModalContent>
            </Modal>
            <SaveButton handleSubmit={formik.handleSubmit} />
          {/*  <Button
                type='submit'
                marginLeft={{ lg: '35em', md: '80%', sm: '30%' }}
                marginBottom={{ lg: '-4.5em', md: '-5%', sm: '-20%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'
                onClick={formik.handleSubmit}
            >
                Guardar
            </Button>*/}
            <Modal
                size={"xs"}
                maxWidth='100%'
                isOpen={showModalConfirmacion}
                onClose={toggleModalConfirmacion}>
                <ModalOverlay />
                <ModalContent marginTop={"15%"} bg="#ffff" borderRadius={"20px"}>
                    <ModalBody>
                        <Confirmacion nombres={medicoName} id={medicoID} close={toggleModalConfirmacion} eliminar={eliminarMedico} especialidad={especialidad} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );

}

export default MedicoCardPostInitial;
