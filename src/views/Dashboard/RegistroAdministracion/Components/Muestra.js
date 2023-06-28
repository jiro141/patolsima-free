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
    Switch,
    chakra,
    Textarea,
    Select
} from '@chakra-ui/react';
import axios from 'axios';
import ModoVisualizacionContext from 'components/ModoVisualizacion/ModoVisualizacion';
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { postStudies } from 'api/controllers/estudios';


const Muestra = () => {
    const { dataPaciente, dataMedico,pacienteID } = useContext(ModoVisualizacionContext);
    //definicion de los valores a cargar
    const [estudiot, setEstudiot] = useState('');
    const [estudioa, setEstudioa] = useState('');
    const [precio, setPrecio] = useState('');
    const [tmuestra, setTmuestra] = useState('');
    const [notas, setNotas] = useState('');
    const [archivo, setAchivo] = useState('');
    console.log(pacienteID);
    //carga de los datos del formulario
    const formik = useFormik({
    
        initialValues: {
            tipo: 'CITOLOGIA_GINECOLOGICA',
            urgente: false,
            envio_digital: false,
            paciente_id: pacienteID,
            medico_tratante_id: 5,
            patolog_id: '',
            notas: 'vsdfdfd'
        },
        validateOnChange: false,
        onSubmit: async (formData, { resetForm }) => { 
            console.log(formData);
            try {
                const estudioPost = await postStudies(formData);
            }
            catch (error) {
                console.log(error);
            }
            return;

        },
    });


    //agregar los inputs de mas muestras 
    const [inputs, setInputs] = useState([]);

    const addInputs = () => {
        if (inputs.length < 6) {
            setInputs([...inputs, {}]);
        }
    };

    return (
        <>
            <form >
                <Text fontSize={'20px'} margin='2% auto 2% auto' color={'gray.600'}>Información General</Text>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
                    <Box>
                        <Text marginBottom={'1.5%'} fontSize={'17px'}>Paciente</Text>
                        <Text>{dataPaciente.nombres} {dataPaciente.apellidos}</Text>
                        <Text marginY={'1.5%'} fontSize={'17px'}>Cédula de Identidad</Text>
                        <Text>{dataPaciente.ci}</Text>
                    </Box>
                    <Box>
                        <Text marginBottom={'1.5%'} fontSize={'17px'}>Médico tratante</Text>
                        <Text >{dataMedico.nombres} {dataMedico.apellidos}</Text>

                    </Box>
                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px' >
                    <Box>
                        <Text textAlign={'left'} fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Datos de Estudio</Text>
                    </Box>
                    <Box>
                        <Text textAlign={'left'} fontSize={'18px'} margin='15px auto 0 auto' color={'gray.600'}>Estudio N°: C-nn-yyyy </Text>
                    </Box>
                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
                    <Select color="gray.400" defaultValue="sexo">
                        <option hidden >Tipo de Estudio:</option>
                        <option value='BIOPSIA'>Biopsia</option>
                        <option value='CITOLOGIA_GINECOLOGICA'>Citologia Ginecologica</option>
                        <option value='CITOLOGIA_ESPECIAL'>Citologia Especial</option>
                        <option value='INMUNOSTOQUIMICA'>Inmunohistoquimica</option>
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
                        <Switch
                            id='envio_digital'
                            color={'#137797'}
                            me='10px'
                            name='envio_digital'
                            checked={formik.values.envio_digital}
                            onChange={e => formik.setFieldValue('envio_digital', e.target.checked)}
                        />
                        <FormLabel htmlFor='envio_digital' mb='0' ms='1' fontWeight='normal'>
                            Envio digital
                        </FormLabel>
                    </FormControl>
                    <FormControl display='flex' alignItems='center'>
                        <Switch
                            id='urgente'
                            color={'#137797'}
                            me='10px'
                            name='urgente'
                            checked={formik.values.urgente}
                            onChange={e => formik.setFieldValue('urgente', e.target.checked)}
                        />
                        <FormLabel htmlFor='urgente' mb='0' ms='1' fontWeight='normal'>
                            Urgente
                        </FormLabel>
                    </FormControl>

                </Grid>

                <Grid>
                    <Input
                        placeholder='Tipo de muestra'
                        type="text"
                        name="tipo"
                        value={tmuestra}
                        onChange={e => formik.setFieldValue('tipo', e.target.value)}
                    />
                    <Textarea
                        marginTop={'10px'}
                        size="lg"
                        name='notas'
                        borderRadius="md"
                        placeholder="notas"
                        value={formik.values.notas}
                        onChange={e => formik.setFieldValue('notas', e.target.value)} />
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
                    marginBottom='-120px'
                    bgColor={'#137798'}
                    color='#ffff'
                    borderRadius={'20px'}
                    onClick={addInputs}>
                    Agregar otra muestra</Button>
            </Box>
            <Box w={'100%'} textAlign='end'>
                <Button
                    marginBottom={{ lg: '-80px', md: '-15%', sm: '-30%' }}
                    borderRadius={'20px'}
                    bgColor={'#137798'}
                    color='#ffff'
                    onClick={formik.handleSubmit}
                >
                    Guardar
                </Button>
            </Box>
        </>
    );

}

export default Muestra;
