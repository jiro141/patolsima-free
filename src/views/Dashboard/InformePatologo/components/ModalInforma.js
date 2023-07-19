import { React, useState, useEffect } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    Badge
} from "@chakra-ui/react";
import ModalDescripcion from "./ModalDescripcion";
import { getStudiesDetail } from "api/controllers/estudios";
import { Separator } from "components/Separator/Separator";
import GeneralButton from "components/widgets/Buttons/GeneralButton";


const ModalInforme = ({ id }) => {
    const [studiesDetail, setStudiesDetail] = useState();
    const [showModal, setShowModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const StudiesDetailGet = async () => {
        try {
            const estudiosDetail = await getStudiesDetail(id);
            setStudiesDetail(estudiosDetail)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        StudiesDetailGet();
    }, []);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    //tamaños de modal
    const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
    const fechaHora = studiesDetail?.created_at;
    const fecha = fechaHora ? fechaHora.split("T")[0] : "";
    return (
        <>
            <Grid templateColumns={'2fr 1fr'}>
                <Box marginTop={'-50px'}>
                    <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Información General</Text>
                    <Grid templateColumns={"repeat(3,1fr)"}>
                        <Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'} >Paciente</Text>
                                {studiesDetail ? (
                                    <Badge>
                                    <Text >{studiesDetail?.paciente?.nombres} {studiesDetail.paciente.apellidos}</Text>
                                    </Badge>
                                    
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'}>Fecha</Text>
                                <Badge>
                                <Text >{fecha}</Text>
                                </Badge>
                                
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'}>Cedula de Identidad</Text>
                                {studiesDetail ? (
                                    <Badge>
                                    <Text >{studiesDetail?.paciente.ci}</Text>
                                    </Badge>
                                    
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'}>Medico Tratante</Text>
                                {studiesDetail ? (
                                    <Badge>
<Text >{studiesDetail.medico_tratante.nombres} {studiesDetail.medico_tratante.apellidos}</Text>
                                    </Badge>
                                    
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'}>Telefono</Text>
                                {studiesDetail ? (
                                    <Badge>
                                <Text color={'gray.600'}>{studiesDetail.paciente.telefono_celular}</Text>
                                    </Badge>
                                    
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'}>Telefono</Text>
                                {studiesDetail ? (
                                    <Badge>
 <Text >{studiesDetail.medico_tratante.telefono_celular}</Text>
                                    </Badge>
                                   
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                   
                    <Text margin={'10px'} fontSize={'20px'}>Información de estudio</Text>
                    <Grid templateColumns={"repeat(3,1fr)"}>
                        <Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'}>Numero de estudio</Text>
                                {studiesDetail ? (
                                    <Badge>
                                    <Text >{studiesDetail.codigo}</Text>
                                    </Badge>
                                    
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                          {/*  <Box margin={'10px'} >
                                <Text fontSize={'17px'}>Tipo de muestra</Text>
                                <Text>Estomago</Text>
                            </Box>*/}
                        </Box>
                        <Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'}>Tipo de estudio</Text>
                                {studiesDetail ? (
                                    <Badge>
                                    <Text >{studiesDetail.tipo}</Text>
                                    </Badge>
                                    
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                            {/*<Box margin={'10px'}>
                                <Text fontSize={'17px'}>Tipo de muestra 2</Text>
                                <Text>Estomago parte alta</Text>
                            </Box>*/}
                        </Box>
                        <Box>
                            <Box margin={'10px'}>
                                <Text fontSize={'16px'}>Patologo</Text>
                                {studiesDetail ? (
                                    <Badge>
 <Text >{studiesDetail?.patologo?.nombres} {studiesDetail?.patologo?.apellidos}</Text>
                                    </Badge>
                                   
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                            {/*<Box margin={'10px'}>
                                <Text fontSize={'17px'}>Tipo de muestra 3</Text>
                                <Text>Estomago parte baja</Text>
                            </Box>*/}
                        </Box>
                    </Grid>
                    <Grid margin={'40px 5px 20px 5px'} templateColumns={'repeat(3,1fr)'} gap={'20px'}>
                        <Select color="gray.400" defaultValue="Informes anteriores">
                            <option hidden colorScheme="gray.400">Informes anteriores</option>
                            {/*studiesDetail ? (
                                studiesDetail.muestras.map((muestra, index) => (
                                    <option key={index} value={muestra.tipo_de_muestra}>
                                        {muestra.tipo_de_muestra}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )*/}
                        </Select>
                        <Select color="gray.400" defaultValue="Anexos">
                            <option hidden colorScheme="gray.400">Anexos</option>
                            {/*studiesDetail ? (
                                studiesDetail.adjuntos.map((adjunto, index) => (
                                    <option key={index} value={adjunto}>
                                        {adjunto}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )*/}
                        </Select>
                        <Input
                            placeholder='Notas'
                            type="text"
                            name="notas"
                        />
                    </Grid>
                </Box>
                <Box marginTop={'-50%'} height={'100%'}>
                    <Box height='80%' marginTop={'60%'} borderLeft={'solid #89bbcc'}>
                        <Button
                            margin={'10px'}
                            marginBottom={'30px'}
                            marginTop={'-20%'}
                            border={'solid 2px'}
                            color={'gray.400'}
                            borderColor={'gray.400'}
                            w={'80%'}
                            background={'none'}
                            borderRadius={'10px'}>
                            Registro de cambios</Button>
                        <Button
                            margin={'10px'}
                            border={'solid 2px'}
                            color={'#137798'}
                            borderColor={'#137798'}
                            w={'80%'}
                            background={'none'}
                            borderRadius={'20px'}
                            onClick={() => {
                                toggleModal();
                                setTitulo('Descripción macroscópica');
                            }}>Descripción macroscópica</Button>
                        <Button
                            margin={'10px'}
                            border={'solid 2px'}
                            color={'#137798'}
                            borderColor={'#137798'}
                            w={'80%'}
                            background={'none'}
                            borderRadius={'20px'}
                            onClick={() => {
                                toggleModal();
                                setTitulo('Descripción microscópica');
                            }}>Descripción microscópica</Button>
                        <Button
                            margin={'10px'}
                            border={'solid 2px'}
                            color={'#137798'}
                            borderColor={'#137798'}
                            w={'80%'}
                            background={'none'}
                            borderRadius={'20px'}
                            onClick={() => {
                                toggleModal();
                                setTitulo('Diagnóstico');
                            }}>Diagnóstico</Button>
                        <Button
                            margin={'10px'}
                            border={'solid 2px'}
                            color={'#137798'}
                            borderColor={'#137798'}
                            w={'80%'}
                            background={'none'}
                            borderRadius={'20px'}
                            onClick={() => {
                                toggleModal();
                                setTitulo('Notas');
                            }}>Notas</Button>
                        <Button
                            margin={'10px'}
                            border={'solid 2px'}
                            color={'#137798'}
                            borderColor={'#137798'}
                            w={'80%'}
                            background={'none'}
                            borderRadius={'20px'}
                            onClick={() => {
                                toggleModal();
                                setTitulo('Anexos');
                            }}>Anexos</Button>
                        <Button
                            margin={'10px'}
                            border={'solid 2px'}
                            color={'#137798'}
                            borderColor={'#137798'}
                            w={'80%'}
                            background={'none'}
                            borderRadius={'20px'}
                            onClick={() => {
                                toggleModal();
                                setTitulo('Biblografía');
                            }}>Biblografía</Button>
                    </Box>
                    <Box style={{display:"flex", justifyContent:'flex-end',marginTop:"-20px"}}>
                    <GeneralButton  text={'Procesar'} handleClick={()=>{}}  />
                    </Box>
                </Box>
            </Grid>
           { /*<Button
                marginBottom={{ lg: '-5%', md: '-8%', sm: '-10%' }}
                marginLeft={{ lg: '88%', md: '70%', sm: '77%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'>
                Procesar
            </Button>*/}
            <Modal
                size={'4xl'}
                maxWidth='100%'
                isOpen={showModal}
                onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent borderRadius={'20px'} bg="#ffff">
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
                            <CloseButton />
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <ModalDescripcion idStudy={id} titulo={titulo} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ModalInforme;