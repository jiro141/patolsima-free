import { React, useState, useEffect } from "react";
import {
    Box,
    Text,
    Grid,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    useBreakpointValue,
    Input
} from "@chakra-ui/react";
import { BsFillPencilFill, BsFillFileCheckFill } from "react-icons/bs";
import FacturaTerceros from "./FacturaTerceros";
import Confirmacion from "./Confirmacion";
import ModalAbonar from "./ModalAbonar";
import { getFacturasDetail } from "api/controllers/facturas";
import { studiesDetail } from "api/controllers/estudios";
import { postConfirmar } from "api/controllers/facturas";
import { putMonto } from "api/controllers/facturas";
import { generateUniqueId } from "helpers";



const ModalFacturacion = ({ study }) => {
    const [facturasDetail, setFacturasDetail] = useState()
    const [studyDetail, setStudyDetail] = useState();
    const [itemOrden, setItemOrden] = useState();
    const [editing, setEditing] = useState(false);
    const [pagoId,setPagoId]=useState();
    const [data, setData] = useState(
        {
            monto_usd: "",
        }
    );
    //console.log(facturasDetail);
    const datosModal = async () => {
        try {
            const facturasDetail = await getFacturasDetail(study.id);
            setFacturasDetail(facturasDetail);
            setItemOrden(facturasDetail?.items_orden.map(item => item.estudio));

        } catch (error) {
            console.log(error);
        }
    }
   // console.log(itemOrden);
  // console.log(facturasDetail.balance);
    useEffect(() => {
        datosModal();
    }, []);

    const datosStudie = async () => {
        try {
            const study = await studiesDetail(itemOrden);
            setStudyDetail(study);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        datosStudie();
    }, [itemOrden]);

    const confirmar = async () => {
        try {
            const confirmarFactura = await postConfirmar(facturasDetail?.id)
            console.log(confirmarFactura)
        } catch (error) {
            console.log(error);
        }
    }
    const aggMonto = async () => {
        try {
            const putEnviarMonto = await putMonto(facturasDetail?.items_orden[0]?.id, data)
        } catch (error) {
            console.log(error);
        }
    }

    //esta funcion cambia los valores que tienen los inputs
    const cambiarValoresRegistro = (key, value) => {
        setData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleEditClick = () => {
        setEditing(true);
    };
    const handlePagoIdChange = (pagoId) => {
        setPagoId(handlePagoIdChange);
    };

    //modal
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const toggleModalConfirmacion = () => {
        setShowModalConfirmacion(!showModalConfirmacion);
    };
    const [showModalAbonar, setShowModalAbonar] = useState(false);
    const toggleModalAbonar = () => {
        setShowModalAbonar(!showModalAbonar);
    };
    //tamaños de modal
    const size = useBreakpointValue({ sm: "sm", lg: "xl", md: 'xs' });
    const fechaHora = facturasDetail?.cliente?.created_at;
    const fecha = fechaHora ? fechaHora.split("T")[0] : "";
    let newId= generateUniqueId()
    return (
        <>
            <Box marginTop={'-50px'}>
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
                    <Text margin={'5px'} color={'gray.900'} fontSize={'20px'} >Datos de factura</Text>
                    <Text margin={'18px'} textAlign={{ lg: 'right', sm: 'left' }} color={'gray.500'} fontSize={'20px'} >Recibo N { `${newId}`}</Text>
                </Grid>
                <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Cliente</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>{facturasDetail.cliente.razon_social}</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >RIF/CI</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>{facturasDetail.cliente.ci_rif}</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'}>Fecha</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>{fecha}</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Télefono</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>{facturasDetail.cliente.telefono_celular}</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Dirección</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>{facturasDetail.cliente.direccion}</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Button
                    marginTop={'2px'}
                    marginLeft={{ lg: '70%', md: '60%', sm: '40%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'
                    onClick={() => toggleModal(study)}>
                    Factura para un tercero
                </Button>
                <Text margin={'5px'} fontSize={'20px'}>Descripción</Text>
                <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                    <Box>
                        <Box margin={'5px'} >
                            <Text fontSize={'16px'} ># Estudio</Text>
                            {studyDetail ? (
                                <Text fontSize={'14px'}>{studyDetail.codigo}</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box >
                        <Box margin={'5px'}  >
                            <Text fontSize={'16px'} >Paciente</Text>
                            {studyDetail ? (
                                <Text fontSize={'14px'}>{/*studyDetail?.paciente.nombres} {studyDetail.paciente.apellidos*/}
                                prueba
                                </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={' 5px '}>
                            <Text fontSize={'16px'} >Tipo de estudio</Text>
                            {studyDetail ? (
                                <Text fontSize={'14px'}>{studyDetail.tipo} </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={' 5px'}>
                            <Text fontSize={'16px'} >Monto($)</Text>
                            {facturasDetail ? (
                                facturasDetail.balance.total_usd !== 0 ? (
                                    <Text fontSize={'14px'}>{facturasDetail.balance.total_usd} $</Text>
                                ) : (
                                    <>
                                        {editing ? (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Input h={'60%'} type="number"
                                                    style={{ marginRight: '8px' }}
                                                    value={data?.monto_usd}
                                                    onChange={e => cambiarValoresRegistro("monto_usd", e.target.value)} />
                                                <Button
                                                    borderRadius={'10px'}
                                                    colorScheme="blue"
                                                    bgColor={'#137797'}
                                                    color='#ffff'
                                                    size="sm"
                                                    onClick={aggMonto}
                                                >
                                                    <BsFillFileCheckFill size={25} />
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                borderRadius={'10px'}
                                                colorScheme="blue"
                                                bgColor={'#137797'}
                                                color='#ffff'
                                                size="sm"
                                                onClick={handleEditClick}
                                            >
                                                <BsFillPencilFill size={16} />
                                            </Button>
                                        )}
                                    </>
                                )
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Monto(Bs)</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>{facturasDetail.balance.total_bs} Bs</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid margin={'10px'} templateColumns={{ lg: "repeat(4,1fr)", md: "repeat(4,1fr)", sm: "repeat(2,1fr)" }} >
                    <Box>
                        <Box margin={'10px'}>
                            <Text margin={'5px'} fontSize={'20px'}>Monto</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>Dolares ($)</Text>
                            <Text fontSize={'14px'} marginTop={'5px'}>Bolivares (Bs)</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text margin={'5px'} fontSize={'20px'}>Pendiente</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'} marginTop={'5px'}>{facturasDetail.balance.por_pagar_usd} $</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>)}
                            {facturasDetail ? (
                                <Text fontSize={'14px'} marginTop={'5px'}>{facturasDetail.balance.por_pagar_bs} Bs</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>)}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text margin={'5px'} fontSize={'20px'}>Abonado</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'} marginTop={'5px'}>{facturasDetail.balance?.pagado_usd} $</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>)}
                            {facturasDetail ? (
                                <Text fontSize={'14px'} marginTop={'5px'}>{facturasDetail.balance?.pagado_bs} Bs</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>)}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'10px'}>
                            <Text margin={'5px'} fontSize={'20px'}>Total</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>{facturasDetail.balance?.total_usd} $</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>{facturasDetail.balance?.total_bs} Bs</Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                </Grid>
              { 
             facturasDetail && facturasDetail.balance?.total_bs > 0 ?
              <>
              
               <Button
                    marginBottom={{ lg: '-10%', md: '-13%', sm: '-25%' }}
                    marginLeft={'1%'}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Archivar
                </Button>
                <Button
                    marginBottom={{ lg: '-10.5%', md: '-13%', sm: '-25%' }}
                    marginLeft={{ lg: '50%', md: '52%', sm: '12%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'
                    onClick={toggleModalAbonar}>
                    Abonar
                </Button>
                </> : ''
                }


                <Button
                    marginBottom={{ lg: '-3.5%', md: '-5%', sm: '-10%' }}
                    marginLeft={{ lg: '85%', md: '85%', sm: '75%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'
                    onClick={() => {
                        //toggleModalConfirmacion();
                        confirmar();
                    }}>
                    Confirmar
                </Button>
            </Box>
            <Modal
                size={"lg"}
                maxWidth='100%'
                isOpen={showModal}
                onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent bg="#ffff" borderRadius={"20px"}>
                    <ModalHeader>
                        <Button
                            borderRadius={'50%'}
                            colorScheme="blue"
                            width="40px"
                            height="40px"
                            marginLeft={'92%'}
                            marginTop={'-60px'}
                            bgColor={'#137797'}
                            color='#ffff'
                            onClick={toggleModal}>
                            <CloseButton />
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <FacturaTerceros study={study} />
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
                        <Confirmacion pago={pagoId} facturasDetail={facturasDetail} toggleModalConfirmacion={toggleModalConfirmacion} confirmar={confirmar} />
                    </ModalBody>
                </ModalContent>
            </Modal>
           {/* <Modal
                size={"sm"}
                maxWidth='100%'
                isOpen={showModalAbonar}
                onClose={toggleModalAbonar}>
                <ModalOverlay />
                <ModalContent marginTop={"15%"} bg="#ffff" borderRadius={"20px"}>
                    <ModalHeader>
                        <Button
                            borderRadius={'50%'}
                            colorScheme="blue"
                            width="40px"
                            height="40px"
                            marginLeft={'92%'}
                            marginTop={'-60px'}
                            bgColor={'#137797'}
                            color='#ffff'
                            onClick={toggleModalAbonar}>
                            <CloseButton />
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAbonar close={toggleModalAbonar} onPagoIdChange={handlePagoIdChange} facturasDetail={facturasDetail} />
                    </ModalBody>
                </ModalContent>
            </Modal>*/}
        </>
    );
}
export default ModalFacturacion;