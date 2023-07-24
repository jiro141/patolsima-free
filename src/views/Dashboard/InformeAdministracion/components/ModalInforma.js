import { React, useState } from "react";
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
import { Titlelight } from "components/widgets/Texts";
import { SubTitlelight } from "components/widgets/Texts";
import { Separator } from "components/Separator/Separator";
import GeneralButton from "components/widgets/Buttons/GeneralButton";
import { formatDate } from "helpers";
import OutlineBtnModal from "components/widgets/Buttons/OutlineBtnModal";
import ModalCreateNotes from "./ModalCreateNotes";
import { getInformesDetail } from "api/controllers/informes";
import { aprobarInforme } from "api/controllers/informes";
import { completeInforme } from "api/controllers/informes";
import { useInformes } from "hooks/Informes/useInformes";
import { useEffect } from "react";
import { getInformePreview } from "api/controllers/informes";
import { lastInformes } from "api/controllers/informes";
import ModalSendWp from "components/widgets/Modals/ModalSendWp";


const ModalInforme = ({informeDetail,detailEstudio,setInformeDetail,setShowModalGeneral}) => {
    const [showModal, setShowModal] = useState(false);
    const [showModalMacro, setShowModalMacro] = useState(false);
    const [showModalDiag, setShowModalDiag] = useState(false);
    const [showModalNotas, setShowModalNotas] = useState(false);
    const [showModalBibli, setShowModalBibli] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showModalSendWp, setShowModalSendWp] = useState(false);
    const [historyMap, setHistoryMap] = useState([]);
    const {setInformesCompletados,setInformesNoCompletados,informes,getInformes}=useInformes()
    
   
    const toggleModal = async() => {
     
        setShowModal(!showModal);
    };
    const toggleModalM = () => {
        setShowModalMacro(!showModalMacro);
    };
    const toggleModalD = () => {
        setShowModalDiag(!showModalDiag);
    };
    const toggleModalN = () => {
        setShowModalNotas(!showModalNotas);
    };

    const toggleModalB = () => {
        setShowModalBibli(!showModalBibli);
    };
    const toggleModalR= () => {
        setShowModalRegister(!showModalRegister);
    };
    //console.log(informeDetail.paciente.id);
    useEffect(() => {
        const historyInformes=async()=>{
            if(informeDetail){
                const res= await lastInformes(informeDetail?.paciente?.id)
                setHistoryMap(res);
            }
        
        }
        historyInformes()
      return () => {

      }
    }, [])
    
    const handleSubmitGenerateInfor=async()=>{
        if(detailEstudio.envio_digital){
            setShowModalSendWp(true)
        }else{
            const res=await completeInforme(detailEstudio.id)
            if(res){
                window.location.reload();
                setShowModalGeneral(false)
            
            }

        }

       
       
    }
    const generarPdf=async()=>{
       const res= await getInformePreview(detailEstudio.id)
       window.open(res, "_blank");
       //console.log(res)
    }
   
  
    
    console.log(detailEstudio.envio_digital)
    //tamaños de modal
    const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
    return (
        <>
            <Grid templateColumns={'2fr 1fr'}>
                <Box marginTop={'-20px'}>

                    <Titlelight title={'Información General'} color={'#000'} />
                    <Separator marginTop={'8px'} width={'70%'} backgroundColor={'#89bbcc'} color={'#89bbcc'}></Separator>
                    <Grid templateColumns={"repeat(3,1fr)"}>
                        <Box>
                            <Box margin={'10px'}>

                                <SubTitlelight title={'Paciente'} color={'#000'} />
                                {detailEstudio ?
                                    <Badge>
                                        <Text >{`${detailEstudio?.paciente?.nombres} 
                            ${detailEstudio?.paciente?.apellidos.length > 10
                                                ? detailEstudio?.paciente?.apellidos.substring(0, 10) + "..."
                                                : detailEstudio?.paciente?.apellidos}`}


                                        </Text>
                                    </Badge> :
                                    <Badge>
                                        <Text >Cargando</Text>
                                    </Badge>
                                }

                            </Box>
                            <Box margin={'10px'}>
                                <SubTitlelight title={'Fecha'} color={'#000'} />
                                {detailEstudio.lenght > 0 ?
                                    <Badge>
                                        <Text>{formatDate(detailEstudio?.created_at)}</Text>
                                    </Badge> :
                                    <Badge>
                                        <Text >Cargando</Text>
                                    </Badge>}

                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'10px'}>
                                <SubTitlelight title={'CI/RIF'} color={'#000'} />
                                {detailEstudio ?
                                    <Badge>
                                        <Text >{`${detailEstudio?.paciente?.ci}`}</Text>
                                    </Badge> :
                                    <Badge>
                                        <Text >Cargando</Text>
                                    </Badge>
                                }

                            </Box>
                            <Box margin={'10px'}>
                                <SubTitlelight title={'Medico Tratante'} color={'#000'} />
                                {detailEstudio ?
                                    <Badge>
                                        <Text >{`${detailEstudio?.medico_tratante?.nombres} ${detailEstudio?.medico_tratante?.apellidos}`}</Text>
                                    </Badge> :
                                    <Badge>
                                        <Text >Cargando</Text>
                                    </Badge>}
                            </Box>
                        </Box>
                        <Box pb={'10px'}>
                            <Box margin={'10px'}>
                                <Box margin={'10px'}>
                                    <SubTitlelight title={'Telefono '} color={'#000'} />
                                    {detailEstudio ?
                                        <Badge>
                                            <Text >{`${detailEstudio?.paciente?.telefono_celular}`}</Text>
                                        </Badge> :
                                        <Badge>
                                            <Text >Cargando</Text>
                                        </Badge>}
                                </Box>
                            </Box>
                            <Box margin={'10px'}>
                                <Box margin={'10px'}>
                                    <SubTitlelight title={'Telefono'} color={'#000'} />
                                    {detailEstudio ?
                                        <Badge>
                                            <Text >{`${detailEstudio?.medico_tratante?.telefono_celular}`}</Text>
                                        </Badge> :
                                        <Badge>
                                            <Text >Cargando</Text>
                                        </Badge>}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Box margin={'8px'} />
                    <Titlelight title={'Información de estudio'} color={'#000'} />
                    <Separator marginTop={'8px'} width={'70%'} backgroundColor={'#89bbcc'} color={'#89bbcc'}></Separator>
                    <Grid templateColumns={"repeat(3,1fr)"}>
                        <Box>
                            <Box margin={'10px'}>
                                <SubTitlelight title={'Estudio #'} color={'#000'} />
                                {detailEstudio ?
                                    <Badge>
                                        <Text >{`${detailEstudio?.codigo}`}</Text>
                                    </Badge> :

                                    <Badge>
                                        <Text >Cargando</Text>
                                    </Badge>
                                }


                            </Box>
                            <Box margin={'10px'} >
                                <SubTitlelight title={'Tipo de estudio'} color={'#000'} />
                                {detailEstudio ?
                                    <Badge>
                                        <Text >{`${detailEstudio?.tipo}`}</Text>
                                    </Badge> :

                                    <Badge>
                                        <Text >Cargando</Text>
                                    </Badge>
                                }
                            </Box>
                        </Box>

                        <Box>
                            <Box margin={'10px'}>
                                <SubTitlelight title={'Patologo'} color={'#000'} />
                                {detailEstudio ?
                                    <Badge>
                                        <Text >{`${detailEstudio?.patologo?.nombres} ${detailEstudio?.patologo?.apellidos}`}</Text>
                                    </Badge> :

                                    <Badge>
                                        <Text >Cargando</Text>
                                    </Badge>
                                }
                            </Box>
                            <Box margin={'10px'}>
                                <SubTitlelight title={'Prioridad'} color={'#000'} />
                                {detailEstudio ?
                                    <Badge>
                                        <Text >{`${detailEstudio?.prioridad} `}</Text>
                                    </Badge> :

                                    <Badge>
                                        <Text >Cargando</Text>
                                    </Badge>
                                }
                            </Box>


                        </Box>

                    </Grid>
                    <Grid margin={'50px 10px 20px 10px'} templateColumns={'repeat(2,1fr)'} gap={'20px'}>

                        <Select width={'100%'} color="gray.400" defaultValue="Informes anteriores">
                            <option hidden colorScheme="gray.400">Informes anteriores</option>
                            {historyMap.map((estudio, index) => (
        <option key={index} value={estudio.estudio_id}>
          {estudio.estudio_tipo} - {estudio.estudio_codigo}
        </option>
      ))}
                            { /*<option value=""></option>
                            <option value=""></option>*/}
                        </Select>

                        <Select color="gray.400" defaultValue="Anexos">
                            <option hidden colorScheme="gray.400">Anexos</option>
                            {/*<option value=""></option>
                            <option value=""></option>*/}
                        </Select>
                        {/*<Input
                            placeholder='Notas'
                            type="text"
                            name="notas"
                        />*/}
                    </Grid>
                </Box>
                <Box marginTop={'-55%'} height={'100%'}>
                    <Box height='80%' marginTop={'60%'} borderLeft={'c'}>
                        <Button
                            margin={'10px'}
                            marginBottom={'30px'}
                            marginTop={'-20%'}
                            border={'solid 2px'}
                            color={'gray.400'}
                            borderColor={'gray.400'}
                            w={'80%'}
                            background={'none'}
                            borderRadius={'10px'}
                            onClick={toggleModalR}>Registro de cambios</Button>

                        <OutlineBtnModal text={'Descripción microscópica'}
                            handleClick={toggleModal}
                        />
                        <OutlineBtnModal text={'Descripción macroscópica'}
                            handleClick={toggleModalM}
                        />
                        <OutlineBtnModal text={'Diagnóstico'}
                            handleClick={toggleModalD}
                        />
                        <OutlineBtnModal text={'Notas'}
                            handleClick={toggleModalN}
                        />




                        <OutlineBtnModal text={'Biblografía'}
                            handleClick={toggleModalB}
                        />

                    </Box>
                    <Box style={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}> 
                    <GeneralButton text={'Vista previa'} handleClick={generarPdf} />
              
                    <GeneralButton text={'Generar'} handleClick={handleSubmitGenerateInfor} />
                    </Box>

                </Box>
            </Grid>

            {/* <Modal
                size={'lg'}
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
                        <ModalDescripcion />
                    </ModalBody>
                </ModalContent>
            </Modal>*/}
            <ModalCreateNotes
            setShowModal={setShowModal}
            titulo={'Descripción microscópica'} toggleModal={toggleModal} showModal={showModal} informeDetail={informeDetail} idStudy={detailEstudio.id} type='micro'setInformeDetail={setInformeDetail} 
            setShowModalGeneral={setShowModalGeneral}
            />

            <ModalCreateNotes
            setShowModal={setShowModalMacro}
            titulo={'Descripción macroscópica'} toggleModal={toggleModalM} showModal={showModalMacro} informeDetail={informeDetail} idStudy={detailEstudio.id} type='macro'
            setShowModalGeneral={setShowModalGeneral}
            />

            <ModalCreateNotes
            setShowModal={setShowModalDiag}
            titulo={'Descripción diagnóstico'} toggleModal={toggleModalD} showModal={showModalDiag} informeDetail={informeDetail} idStudy={detailEstudio.id} type='diag'
            setShowModalGeneral={setShowModalGeneral} />
           
            <ModalCreateNotes
            setShowModal={setShowModalNotas}
            titulo={'Notas'} toggleModal={toggleModalN} showModal={showModalNotas} informeDetail={informeDetail} idStudy={detailEstudio.id} type='notas'
            setShowModalGeneral={setShowModalGeneral}
            />

        <ModalCreateNotes
            setShowModal={setShowModalBibli}
            titulo={'Biblografía'} toggleModal={toggleModalB} showModal={showModalBibli} informeDetail={informeDetail} idStudy={detailEstudio.id} type='bibli'
            setShowModalGeneral={setShowModalGeneral}
            />

<ModalCreateNotes
            setShowModal={setShowModalRegister}
            titulo={'Registro de cambios'} toggleModal={toggleModalB} showModal={showModalRegister} informeDetail={informeDetail} idStudy={detailEstudio.id} type='register'
            //setShowModalGeneral={setShowModalGeneral}
            />
<ModalSendWp isOpen={showModalSendWp} setOpenModal={setShowModalSendWp} />
           
        </>
    );
}
export default ModalInforme;