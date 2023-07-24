import { React, useState, useEffect, useCallback, useContext } from "react";
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
    Input,
    Badge
} from "@chakra-ui/react";
import { BsFillPencilFill, BsFillFileCheckFill } from "react-icons/bs";
import FacturaTerceros from "./FacturaTerceros";
import Confirmacion from "./Confirmacion";
import ModalAbonar from "./ModalAbonar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postConfirmar } from "api/controllers/facturas";
import { putMonto } from "api/controllers/facturas";
import { generateUniqueId } from "helpers";
import { useFacturaDetail } from "hooks/Facturas/useFacturaDetail";
import GeneralButton from "components/widgets/Buttons/GeneralButton";
import { useFacturas } from "hooks/Facturas/useFacturas";
import AddAbonarModal from "components/widgets/Modals/AddAbonarModal";
import { postFactura } from "api/controllers/facturas";
import { postRecibo } from "api/controllers/facturas";
import { Separator } from "components/Separator/Separator";
import { postArchivar } from "api/controllers/facturas";
import ModalPrint from "components/widgets/Modals/ModalPrintFact";
import ModalFctTerceros from "components/widgets/Modals/ModalFctTerceros";
import { studiesDetail } from "api/controllers/estudios";
import { getStudiesDetail } from "api/controllers/estudios";
import MainContext from "context/mainContext/MainContext";
import { formatDate } from "helpers";
import { generarNumeroAleatorio } from "helpers";


const ModalFacturacion = ({ study, setArchived, handleArchivarConfirmFacts, setShowModalG }) => {
    //console.log(study)
    const {
        getFacturasDetails,
        facturasDetail,
        itemOrden,
        loadingDetailFact,
        setloadingStudy,
        setFacturasDetail,
        loadingStudy } = useFacturaDetail({ studyId: study.id })
    const [studyDetail, setStudyDetail] = useState(null);
    const [editing, setEditing] = useState(false);
    const [pdfContent, setPdfContent] = useState(null);
    const [pdfContentFact, setPdfContentFact] = useState(null);
    const [pdfContentNotaPago, setPdfContentNotaPago] = useState(null);
    const [openModalFact, setOpenModalFact] = useState(false);
    const [openModalFact2, setOpenModalFact2] = useState(false);
    const [openModalPago, setOpenModalPago] = useState(false);
    const { factClientTerceros, setfactClientTerceros } = useContext(MainContext)

    const [pagoId, setPagoId] = useState();
    const [data, setData] = useState(
        {
            monto_usd: "",
        }
    );
    const getStudyDetail = async () => {
        try {

            const study = await getStudiesDetail(itemOrden);
            setStudyDetail(study);
        } catch (error) {
            console.log(error);
        } finally {
            // setloadingStudy(false); facturasDetail
        }
    };
    useEffect(() => {
        getFacturasDetails()

        return () => { }
    }, [])

    useEffect(() => {
        getStudyDetail()
        return () => { }
    }, [itemOrden])




    /*  useEffect(() => {
        if(facturasDetail){
            getStudyDetail()  
        }
         
      return () => {  }
    }, [])*/


    console.log(itemOrden)




    const confirmar = async () => {
        try {
            const confirmarFactura = await postConfirmar(facturasDetail?.id)
            if (confirmarFactura) {
                toast.success("¡Se confirmo la factura correctamente!", {
                    autoClose: 1000,
                });
                window.location.reload();
            } else {
                toast.error("¡Hubo un error al confirmar la factura!", {
                    autoClose: 1000,
                });
            }
            // console.log(confirmarFactura)
        } catch (error) {
            console.log(error);
        }
    }
    const aggMonto = async () => {
        try {
            const putEnviarMonto = await putMonto(facturasDetail?.items_orden[0]?.id, data)
            if (putEnviarMonto) {
                toast.success("¡Se envio el monto correctamente!", {
                    autoClose: 1000,
                });
                window.location.reload();
            } else {
                toast.error("¡Hubo un error al crear el monto!", {
                    autoClose: 1000,
                });
            }

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


    const fechaHora = facturasDetail?.cliente?.created_at;
    const fecha = fechaHora ? fechaHora.split("T")[0] : "";
    let newId = generateUniqueId()
    const numeroAleatorio = generarNumeroAleatorio(1, 10000000000);
    const generarFactura = async () => {
        const fact = {
            n_factura: numeroAleatorio
        }
        console.log('study id->')
        console.log(study.id)
        const resFact = await postFactura(study.id, fact)
        if (resFact) {
            console.log(resFact)
            setPdfContentFact(resFact.uri)
            setOpenModalFact2(true)
        } else {
            toast.error("¡Ocurrio un error al generar la factura!", {
                autoClose: 1000,
            });
        }
        //console.log(resFact)

    }
    const generarRecibo = async () => {
        const fact = {
            n_factura: newId
        }
        const resRecibo = await postRecibo(study.id, fact)
        if (resRecibo) {
            setPdfContent(resRecibo.uri)
            setOpenModalFact(true)
        } else {
            toast.error("¡Ocurrio un error al generar el recibo!", {
                autoClose: 1000,
            });
        }

    }



    const handleArchivar = async () => {
       if(study){
        const resSendArchived = await postArchivar(study?.id)
        if (resSendArchived) {
            toast.success("¡Se archivo la factura correctamente!", {
                autoClose: 1000,
            });
            handleArchivarConfirmFacts(facturasDetail?.id)
            //setSearchFacturas(informeList.filter((item) => item.completado === true));
            setShowModalG(false)
            setArchived(true)
        } else {
            toast.error("¡Esta factura no se puede archivar!", {
                autoClose: 1000,
            });
        }
       }
        //console.log(resSendArchived)
    }

    useEffect(() => {
        setfactClientTerceros(null)
    }, [])

   // console.log(facturasDetail)
   // console.log(studyDetail)
   // console.log('factClientTerceros->')
    //console.log(factClientTerceros);
    return (
        <>
            {loadingDetailFact ?
                <p>cargando</p> : <Box marginTop={'-50px'}  >
                    <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
                        <Text margin={'5px'} color={'gray.900'} fontSize={'20px'} >Datos de factura</Text>
                        <Text margin={'18px'} textAlign={{ lg: 'right', sm: 'left' }} color={'gray.500'} fontSize={'20px'} >

                            Número de Orden { facturasDetail && facturasDetail?.id}
                            {/* {`${newId}`} */}

                        </Text>
                    </Grid>
                    <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                        <Box>
                            <Box margin={'5px'}>
                                <Text fontSize={'16px'} >Cliente</Text>
                                {facturasDetail && !factClientTerceros ? (
                                    <Text fontSize={'14px'}>
                                        <Badge>
                                            {facturasDetail?.cliente.razon_social?.length > 17 ? facturasDetail.cliente?.razon_social?.substring(0, 17) + '...' : facturasDetail.cliente?.razon_social}
                                        </Badge>


                                    </Text>
                                ) : factClientTerceros ?
                                    <Text fontSize={'14px'}>
                                        <Text fontSize={'14px'}>
                                            <Badge>
                                                {factClientTerceros?.razon_social?.length > 17 ? factClientTerceros?.razon_social?.substring(0, 17) + '...' : factClientTerceros?.razon_social}

                                            </Badge>


                                        </Text>


                                    </Text> : null

                                }
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'5px'}>
                                <Text fontSize={'16px'} >RIF/CI</Text>
                                {facturasDetail && !factClientTerceros ? (
                                    <Text fontSize={'14px'}>
                                        <Badge>
                                            {facturasDetail.cliente.ci_rif}

                                        </Badge>


                                    </Text>
                                ) : factClientTerceros ?
                                    <Text fontSize={'14px'}>
                                        <Text fontSize={'14px'}>
                                            <Badge>
                                                {factClientTerceros?.ci_rif}

                                            </Badge>
                                        </Text>
                                    </Text> : null

                                }
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'5px'}>
                                <Text fontSize={'16px'}>Fecha</Text>
                                {facturasDetail && !factClientTerceros ? (
                                    <Text fontSize={'14px'}>
                                        <Badge>
                                            {formatDate(facturasDetail.created_at)}

                                        </Badge>


                                    </Text>
                                ) : factClientTerceros ?
                                    <Text fontSize={'14px'}>
                                        <Text fontSize={'14px'}>
                                            <Badge>
                                                {formatDate(factClientTerceros.created_at)}

                                            </Badge>


                                        </Text>


                                    </Text> : null

                                }
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'5px'}>
                                <Text fontSize={'16px'} >Télefono</Text>
                                {
                                    facturasDetail && !factClientTerceros ? (
                                        <Text fontSize={'14px'}>
                                            <Badge>{facturasDetail.cliente.telefono_celular}</Badge>

                                        </Text>
                                    ) : factClientTerceros ?
                                        <Text fontSize={'14px'}>
                                            <Badge>{factClientTerceros.telefono_celular}</Badge>
                                        </Text> : null
                                }
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'5px'}>
                                <Text fontSize={'16px'} >Dirección</Text>
                                {
                                    facturasDetail && !factClientTerceros ? (
                                        <Text fontSize={'14px'}>
                                            <Badge>{facturasDetail.cliente.direccion}</Badge>
                                        </Text>
                                    ) : factClientTerceros ?
                                        <Text fontSize={'14px'}>
                                            <Badge>{factClientTerceros.direccion}</Badge>
                                      </Text> : null
                                }
                            </Box>

                        </Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Estado del pago</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>

                                    {facturasDetail.pagada ?
                                        <Badge variant='subtle' colorScheme='green'>
                                            Completado
                                        </Badge>


                                        :
                                        <Badge variant='subtle' colorScheme={"orange"}>
                                            Pendiente
                                        </Badge>
                                    }
                                </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Grid>


                 {facturasDetail && facturasDetail.pagada ?
                 <></> :
                 <Button
                        marginTop={'15px'}
                        marginBottom={'10px'}
                        // marginLeft={{ lg: '70%', md: '60%', sm: '40%' }}
                        borderRadius={'20px'}
                        bgColor={'#137797'}
                        color='#ffff'
                        onClick={() => toggleModal(study)}>
                        Factura para un tercero
                    </Button>}

                    <Separator></Separator>
                    <Text margin={'5px'} fontSize={'20px'}>Descripción</Text>
                    <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                        <Box>
                            <Box margin={'5px'} >
                                <Text fontSize={'16px'} ># Estudio</Text>
                                {studyDetail ? (
                                    <Text fontSize={'14px'}>
                                        <Badge>{studyDetail?.codigo}</Badge>
                                    </Text>
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                        </Box>
                        <Box >
                            <Box margin={'5px'}  >
                                <Text fontSize={'16px'} >Paciente</Text>
                                {studyDetail ? (
                                    <Text fontSize={'14px'}>
                                        <Badge>
                                            {studyDetail?.paciente.nombres} {studyDetail?.paciente.apellidos}
                                        </Badge>


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
                                    <Text fontSize={'14px'}>
                                        <Badge>
                                            {studyDetail.tipo}
                                        </Badge>


                                    </Text>
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
                                        <Text fontSize={'14px'}>
                                            <Badge>
                                                {facturasDetail.balance.total_usd} $
                                            </Badge>


                                        </Text>
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
                                    <Text fontSize={'14px'}>
                                        <Badge>
                                            {facturasDetail.balance.total_bs} Bs
                                        </Badge>


                                    </Text>
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid marginTop={'5px'} marginBottom={'3px'} marginLeft={'5px'} marginRight={'18px'} templateColumns={{ lg: "repeat(4,1fr)", md: "repeat(4,1fr)", sm: "repeat(2,1fr)" }} >
                        <Box >
                            <Box margin={'5px'}>
                                <Text margin={'5px'} fontSize={'20px'}>Monto</Text>
                                <Text fontSize={'14px'} marginTop={'5px'}>
                                    <Badge>
                                        Dolares ($)
                                    </Badge>

                                </Text>
                                <Text fontSize={'14px'} marginTop={'5px'}>
                                    <Badge>
                                        Bolivares (Bs)
                                    </Badge>

                                </Text>
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'10px'}>
                                <Text margin={'5px'} fontSize={'20px'}>Pendiente</Text>
                                {facturasDetail ? (
                                    <Text fontSize={'14px'} marginTop={'5px'}>
                                        <Badge>
                                            {facturasDetail.balance.por_pagar_usd} $
                                        </Badge>

                                    </Text>
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>)}
                                {facturasDetail ? (
                                    <Text fontSize={'14px'} marginTop={'5px'}>
                                        <Badge>
                                            {facturasDetail.balance.por_pagar_bs} Bs
                                        </Badge>

                                    </Text>
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>)}
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'10px'}>
                                <Text margin={'5px'} fontSize={'20px'}>Abonado</Text>
                                {facturasDetail ? (
                                    <Text fontSize={'14px'} marginTop={'5px'}>
                                        <Badge>
                                            {facturasDetail.balance?.pagado_usd} $
                                        </Badge>

                                    </Text>
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>)}
                                {facturasDetail ? (
                                    <Text fontSize={'14px'} marginTop={'5px'}>
                                        <Badge>
                                            {facturasDetail.balance?.pagado_bs} Bs
                                        </Badge>

                                    </Text>
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>)}
                            </Box>
                        </Box>
                        <Box>
                            <Box margin={'10px'}>
                                <Text margin={'5px'} fontSize={'20px'}>Total</Text>
                                {facturasDetail ? (
                                    <Text fontSize={'14px'}>
                                        <Badge>
                                            {facturasDetail.balance?.total_usd} $
                                        </Badge>

                                    </Text>
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                                {facturasDetail ? (
                                    <Text fontSize={'14px'}>
                                        <Badge>
                                            {facturasDetail.balance?.total_bs} Bs
                                        </Badge>

                                    </Text>
                                ) : (
                                    <Text fontSize={'14px'}>Loading...</Text>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                    {
                        facturasDetail && facturasDetail.pagada ?
                            <Box >

                                <Button
                                    onClick={handleArchivar}
                                    //marginBottom={{ lg: '-10%', md: '-13%', sm: '-25%' }}
                                    marginRight={'2%'}
                                    borderRadius={'20px'}
                                    bgColor={'#137797'}
                                    color='#ffff'>
                                    Archivar
                                </Button>
                                <Button
                                    // marginBottom={{ lg: '-10.5%', md: '-13%', sm: '-25%' }}
                                    // marginLeft={{ lg: '20%', md: '20%', sm: '12%' }}
                                    borderRadius={'20px'}
                                    bgColor={'#137797'}
                                    color='#ffff'

                                    onClick={generarRecibo}
                                >
                                    Generar recibo
                                </Button>
                                <GeneralButton
                                    text="Generar Factura"
                                    handleClick={generarFactura}
                                />
                            </Box> :

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Button
                                    onClick={handleArchivar}
                                    //marginBottom={{ lg: '-10%', md: '-13%', sm: '-25%' }}
                                    marginRight={'2%'}
                                    borderRadius={'20px'}
                                    bgColor={'#137797'}
                                    color='#ffff'>
                                    Archivar
                                </Button>
                                <Button
                                    // marginBottom={{ lg: '-10.5%', md: '-13%', sm: '-25%' }}
                                    // marginLeft={{ lg: '50%', md: '52%', sm: '12%' }}
                                    borderRadius={'20px'}
                                    bgColor={'#137797'}
                                    color='#ffff'
                                    onClick={() => setShowModalAbonar(true)}>
                                    Abonar
                                </Button>

                                {facturasDetail?.confirmada === false ?
                                    <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <GeneralButton
                                            text="Confirmar"
                                            handleClick={confirmar}
                                        />
                                    </div>

                                    :
                                    ''
                                }
                            </div>
                    }

                    <ModalPrint text={'¿Desea descargar el recibo ?'} isOpen={openModalFact} setOpenModal={setOpenModalFact} pdfContent={pdfContent} />
                    <ModalPrint text={'¿Desea descargar la factura ?'} isOpen={openModalFact2} setOpenModal={setOpenModalFact2} pdfContent={pdfContentFact} />
                    <ModalPrint text={'¿Desea descargar la nota de pago ?'} isOpen={openModalPago} setOpenModal={setOpenModalPago} pdfContent={pdfContentNotaPago} type={'nota'} />

                    {/** */}

                </Box>
            }


            <ModalFctTerceros study={study} toggleModal={toggleModal} showModal={showModal} setShowModal={setShowModal} />

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

            <AddAbonarModal openModalPago={openModalPago} setOpenModalPago={setOpenModalPago} facturasDetail={facturasDetail} isOpen={showModalAbonar} setShowModal={setShowModalAbonar} idOrden={facturasDetail?.id} setPdfContent={setPdfContentNotaPago} />


        </>
    );
}
export default ModalFacturacion;