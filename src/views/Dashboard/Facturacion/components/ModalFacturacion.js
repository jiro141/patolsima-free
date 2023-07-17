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


const ModalFacturacion = ({ study }) => {
    console.log(study)
   const { 
    getFacturasDetails,
    facturasDetail,
    studyDetail,
    itemOrden,
    getStudyDetail,
    loadingDetailFact,
    loadingStudy}=useFacturaDetail({studyId:study.id})
  
    const [editing, setEditing] = useState(false);
    const [pdfContent, setPdfContent] = useState(null);
    const [pdfContentFact, setPdfContentFact] = useState(null);
    const [openModalFact, setOpenModalFact] = useState(false);
    const [openModalFact2, setOpenModalFact2] = useState(false);

    const [pagoId,setPagoId]=useState();
    const [data, setData] = useState(
        {
            monto_usd: "",
        }
    );
    useEffect(() => {
        getFacturasDetails()   
      return () => {  }
    }, [])
    useEffect(() => {
        getStudyDetail()   
      return () => { }
    }, [itemOrden])
    
    


    const confirmar = async () => {
        try {
            const confirmarFactura = await postConfirmar(facturasDetail?.id)
            if(confirmarFactura){
                toast.success("¡Se confirmo la factura correctamente!", {
                    autoClose: 1000,
                  });
                  window.location.reload(); 
            }else{
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
            if(putEnviarMonto){
                toast.success("¡Se envio el monto correctamente!", {
                    autoClose: 1000,
                  });
                  window.location.reload(); 
            }else{
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
    let newId= generateUniqueId()
    let newId2= generateUniqueId()
console.log(facturasDetail)
const generarFactura=async()=>{
    const fact={
        n_factura: newId2
    }
  const resFact= await postFactura(study.id,fact)
  if(resFact){
    setPdfContentFact(resFact.uri)
    setOpenModalFact2(true)
  }else{
    toast.error("¡Ocurrio un error al generar la factura!", {
        autoClose: 1000,
      });
   }
  //console.log(resFact)

}
const generarRecibo=async()=>{
    const fact={
        n_factura: newId
    }
    const resRecibo= await postRecibo(study.id,fact)
    if(resRecibo){
    setPdfContent(resRecibo.uri)
    setOpenModalFact(true)
    }else{
        toast.error("¡Ocurrio un error al generar el recibo!", {
            autoClose: 1000,
          });
       }
   
  }
  const handleArchivar=async()=>{
   const resSendArchived= await postArchivar(study.id)
   if(resSendArchived){
    toast.success("¡Se archivo la factura correctamente!", {
        autoClose: 1000,
      });
   }else{
    toast.error("¡Ocurrio un error al archivar!", {
        autoClose: 1000,
      });
   }
   //console.log(resSendArchived)
  }
    return (
        <>
            <Box marginTop={'-50px'}  >
                <Grid templateColumns={{ lg: 'repeat(2,1fr)', sm: 'repeat(1,1fr)' }}>
                    <Text margin={'5px'} color={'gray.900'} fontSize={'20px'} >Datos de factura</Text>
                    <Text margin={'18px'} textAlign={{ lg: 'right', sm: 'left' }} color={'gray.500'} fontSize={'20px'} >
                        
                        Recibo N { `${newId}`} 
                        
                        </Text>
                </Grid>
                <Grid templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Cliente</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>
                                    <Badge>
                                    {facturasDetail.cliente.razon_social.length > 17 ? facturasDetail.cliente.razon_social.substring(0, 17) + '...': facturasDetail.cliente.razon_social}
                                    
                                    </Badge>
                                    
                                
                                </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >RIF/CI</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>
                                    <Badge>
                                    {facturasDetail.cliente.ci_rif}
                                    </Badge>
                                    
                                    </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'}>Fecha</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>
                                   <Badge>{fecha}</Badge>
                                    
                                    </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Télefono</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>
                                    <Badge>{facturasDetail.cliente.telefono_celular}</Badge>
                                    
                                    </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Dirección</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>
                                    <Badge>{facturasDetail.cliente.direccion}</Badge>
                                    
                                    </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                        
                    </Box>
                    <Box margin={'5px'}>
                            <Text fontSize={'16px'} >Estado del pago</Text>
                            {facturasDetail ? (
                                <Text fontSize={'14px'}>
                                    
                                    {facturasDetail.pagada===false ?
                                        
                                        <Badge variant='subtle' colorScheme={"orange"}>
                                         Pendiente
                                        </Badge>
                                        :
                                        <Badge variant='subtle' colorScheme='green'>
                                         Completado
                                        </Badge>
                                    }
                                    </Text>
                            ) : (
                                <Text fontSize={'14px'}>Loading...</Text>
                            )}
                        </Box>
                </Grid>

              {
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
                                    <Badge>{studyDetail.codigo}</Badge>
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
                                        {studyDetail?.paciente.nombres} {studyDetail.paciente.apellidos}
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
                
                <div style={{display:'flex',  alignItems:'center'}}> 
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
                    onClick={()=>setShowModalAbonar(true)}>
                    Abonar
                </Button>

                {facturasDetail?.confirmada===false ?
            <div style={{ width:'80%', display:'flex',justifyContent:'flex-end'}}>
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

           {/** */}   
                
            </Box>
           
     
            {/*<Modal
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
            </Modal>*/}
<ModalFctTerceros study={study}  toggleModal={toggleModal} showModal={showModal} />
        
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

<AddAbonarModal facturasDetail={facturasDetail} isOpen={showModalAbonar} setShowModal={setShowModalAbonar} idOrden={facturasDetail?.id} />

           {/*<Modal facturasDetail?.id
                size={"sm"}
                maxWidth='100%'
                isOpen={showModalAbonar}
               // onClose={toggleModalAbonar}
                >
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
                            onClick={()=>setShowModalAbonar(false)}>
                            <CloseButton />
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAbonar setShowModalAbonar={setShowModalAbonar} onPagoIdChange={handlePagoIdChange} facturasDetail={facturasDetail} />
                    </ModalBody>
                </ModalContent>
            </Modal>*/}
        </>
    );
}
export default ModalFacturacion;