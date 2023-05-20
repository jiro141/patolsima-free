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
    chakra,
    Textarea,
    Select
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


    //agregar los inputs de mas muestras 
    const [inputs, setInputs] = useState([]);

    const addInputs = () => {
        if (inputs.length < 6) {
            setInputs([...inputs, {}]);
        }
    };

    return (
        <>
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
                <Text fontSize={'20px'} margin='2% auto 2% auto' color={'gray.600'}>Información General</Text>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
                    <Box>
                        <Text marginBottom={'1%'}>Paciente</Text>
                        <Text>Molina Contreras Maria Eugenia</Text>
                        <Text marginY={'1%'}>Cédula de Identidad</Text>
                        <Text>26371890</Text>
                    </Box>
                    <Box>
                        <Text marginBottom={'1%'}>Médico tratante</Text>
                        <Text >Carmen Mora</Text>

                    </Box>
                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>

                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px' >
                    <Box>
                        <Text textAlign={'left'} fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Datos de Estudio</Text>
                    </Box>
                    <Box>
                        <Text textAlign={'left'} fontSize={'20px'} margin='15px auto 0 auto' color={'gray.600'}>Codigo del Estudio </Text>
                        <Text fontSize={'16px'} >cod: nnn-aa</Text>
                    </Box>
                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
                    <Select  color="gray.400" defaultValue="sexo">
                        <option hidden >Tipo de Estudio:</option>
                        <option></option>
                        <option></option>
                    </Select>
                    <FormControl mb={3}>
                        <Input
                            placeholder='Estudio Asociado:'
                            type="text"
                            name="estudioa"
                            value={estudioa}

                        />
                    </FormControl>
                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px' marginY={'2%'}>
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
                </Grid>

                <Grid>
                    <Input
                        placeholder='Tipo de muestra'
                        type="text"
                        name="tmuestra"
                        value={tmuestra}

                    />
                    <Textarea
                        marginTop={'10px'}
                        size="lg"
                        borderRadius="md"
                        placeholder="Notas" />
                </Grid>
                {inputs.map((input, index) => (
                    <div key={index}>
                        <Grid marginTop='10px'>
                            <Input
                                placeholder='Tipo de muestra'
                                type="text"
                                name="tmuestra"
                                value={input.tmuestra}
                                onChange={e => {
                                    const updatedInputs = [...inputs];
                                    updatedInputs[index].tmuestra = e.target.value;
                                    setInputs(updatedInputs);
                                }}
                            />
                            <Textarea
                                marginTop={'10px'}
                                size="lg"
                                borderRadius="md"
                                placeholder="Notas"
                                onChange={e => {
                                    const updatedInputs = [...inputs];
                                    updatedInputs[index].notes = e.target.value;
                                    setInputs(updatedInputs);
                                }}
                            />
                        </Grid>
                    </div>
                ))}
            </form>
            <Box w={'100%'} textAlign={'center'}>
                <Button
                    padding={'10px 60px'}
                    marginBottom='-16.5%'
                    bgColor={'#137798'}
                    color='#ffff'
                    borderRadius={'20px'}
                    onClick={addInputs}>
                    Agregar otra muestra</Button>
            </Box>
            <Box w={'100%'} textAlign='end'>
                <Button
                    marginBottom={{ lg: '-10%', md: '-15%', sm: '-30%' }}
                    borderRadius={'20px'}
                    bgColor={'#137798'}
                    color='#ffff'
                    onClick={mensajeAlerta}>
                    Guardar
                </Button>
            </Box>
        </>
    );

}

export default Muestra;
