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
  Badge,
  Tooltip,
  UnorderedList,
  ListItem,
  List
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
import { Title } from "components/widgets/Texts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateInformeCompletePdf } from "api/controllers/informes";
import GreyButton from "components/widgets/Buttons/GreyButton";
import ModalPrint from "components/widgets/Modals/ModalPrintFact";
import BadgeDetail from "components/widgets/Cards/BadgeDetail";
import WrapContentDetail from "components/widgets/Cards/WrapContentDetail";
import AddIHQModal from "components/widgets/Modals/AddIHQModal";




const ModalInforme = ({ informeDetail, detailEstudio, setInformeDetail, setShowModalGeneral,setEnableInfoModalDetails }) => {
 // console.log(detailEstudio);
  const [showModal, setShowModal] = useState(false);
  const [showModalMacro, setShowModalMacro] = useState(false);
  const [showModalDiag, setShowModalDiag] = useState(false);
  const [showModalNotas, setShowModalNotas] = useState(false);
  const [showModalBibli, setShowModalBibli] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalSendWp, setShowModalSendWp] = useState(false);
  const [historyMap, setHistoryMap] = useState([]);
  const [showModalEstudioNotas, setShowModalEstudioNotas] = useState(false);
  const [pdfUri, setpdfUri] = useState('');
  const [showModalGenerateUri, setShowModalGenerateUri] = useState(false);
  const [showModalDescIh, setShowModalDescIh] = useState(false);
  const [showModalResultadosIh, setShowModalResultadosIh] = useState(false);
  const { setInformesCompletados, setInformesNoCompletados, informes, getInformes } = useInformes()

  const toggleModalNotas = () => {
    setShowModalEstudioNotas(!showModalEstudioNotas);
  };
  const toggleModal = async () => {

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
  const toggleModalR = () => {
    setShowModalRegister(!showModalRegister);
  };
  const toggleModalIH = () => {
    setShowModalDescIh(!showModalDescIh);
  };
  console.log(detailEstudio.paciente.id);
  // informeDetail?.paciente?.id
  useEffect(() => {
    const historyInformes = async () => {
      if (detailEstudio) {
        const res = await lastInformes(detailEstudio.paciente?.id)
        setHistoryMap(res);
      }

    }
    historyInformes()
    return () => {

    }
  }, [])

  const handleSubmitGenerateInfor = async () => {
    if (detailEstudio) {

      const res = await completeInforme(detailEstudio.id)

      if (res) {
        const resGenerate = await generateInformeCompletePdf(detailEstudio?.id)
        console.log(resGenerate);
        
        if (resGenerate) {
          if (detailEstudio?.envio_digital) {
            setShowModalSendWp(true)
            setShowModalGenerateUri(false)
            return
          }
          if (!detailEstudio?.envio_digital) {

            console.log(resGenerate.uri);
            setpdfUri(resGenerate.uri)
            setShowModalGenerateUri(true)

          }

        } /*else {
          toast.error("Se requiere confirmación del patologo y administrador, recuerda confirmar el pago", {
            autoClose: 3000,
          });
        }*/
        setEnableInfoModalDetails(false)
        window.location.reload();
      } else {
        toast.error("¡Ocurrio un error al generar el informe!", {
          autoClose: 1000,
        });
      }

    }



  }
  const generarPdf = async () => {
    const res = await getInformePreview(detailEstudio.id)
    window.open(res, "_blank");
    //console.log(res)
  }

  const handleOptionClick = (url) => {
    window.location.href = url;

  };
  const toggleModalIHResultados= () => {
    setShowModalResultadosIh(!showModalResultadosIh);
  };


  console.log(detailEstudio)
  console.log(informeDetail)
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  return (
    <>
      <Grid templateColumns={{ lg: "2fr 1fr", sm: "1fr" }}>
        <Box marginTop={"-20px"}>
          <Title title={"Información General"} color={"#000"} />
          <Separator
            marginTop={"8px"}
            width={"70%"}
            backgroundColor={"#89bbcc"}
            color={"#89bbcc"}
          ></Separator>
             
                <WrapContentDetail>
                <BadgeDetail 
                title={'Paciente'}
                content={detailEstudio && detailEstudio}
                text={`${detailEstudio?.paciente?.nombres.length > 9
                  ? detailEstudio?.paciente?.nombres.substring(0, 10) +
                  "..."
                  : detailEstudio?.paciente?.nombres
                  }

                          ${detailEstudio?.paciente?.apellidos.length > 9
                    ? detailEstudio?.paciente?.apellidos.substring(
                      0,
                      3
                    ) + "..."
                    : detailEstudio?.paciente?.apellidos
                  }`}
                />
                 <BadgeDetail 
                title={'RIF/CI'}
                content={detailEstudio && detailEstudio}
                text={detailEstudio?.paciente?.ci}
                />
                
                <BadgeDetail 
                title={'Telefono'}
                content={detailEstudio && detailEstudio}
                text={detailEstudio?.paciente?.telefono_celular}
                />
                </WrapContentDetail>
             
                <WrapContentDetail>
                <BadgeDetail 
                title={'Medico T.'}
                content={detailEstudio && detailEstudio}
                text={ detailEstudio?.medico_tratante ?`${detailEstudio?.medico_tratante?.nombres.length > 9
                  ? detailEstudio?.medico_tratante?.nombres.substring(0, 9) +
                  "..."
                  : detailEstudio?.medico_tratante?.nombres
                  }

                          ${detailEstudio?.medico_tratante?.apellidos.length > 9
                    ? detailEstudio?.medico_tratante?.apellidos.substring(
                      0,
                     3
                    ) + "..."
                    : detailEstudio?.medico_tratante?.apellidos
                  }` : 'Indefinido'}
                />
                  <BadgeDetail 
                title={'Prioridad'}
                content={detailEstudio && detailEstudio}
                text={detailEstudio?.prioridad}
                />
                
                <BadgeDetail 
                title={'Telefono'}
                content={detailEstudio && detailEstudio}
                text={detailEstudio?.medico_tratante ? detailEstudio?.medico_tratante?.telefono_celular:'Indefinido'}
                />
               
                </WrapContentDetail>
               
<Box marginTop={'5%'}>
<Title title={"Información de estudio"} color={"#000"} />
          <Separator
            marginTop={"8px"}
            width={"70%"}
            backgroundColor={"#89bbcc"}
            color={"#89bbcc"}
          ></Separator>
           <WrapContentDetail>
           <BadgeDetail 
                title={'Estudio #'}
                content={detailEstudio && detailEstudio}
                text={detailEstudio?.codigo}
                />
               
                <BadgeDetail 
                title={'Patologo'}
                content={detailEstudio && detailEstudio}
                text={`${detailEstudio?.patologo?.nombres.length > 9
                  ? detailEstudio?.patologo?.nombres.substring(0, 9) +
                  "..."
                  : detailEstudio?.patologo?.nombres
                  }

                          ${detailEstudio?.patologo?.apellidos.length > 9
                    ? detailEstudio?.patologo?.apellidos.substring(
                      0,
                     3
                    ) + "..."
                    : detailEstudio?.patologo?.apellidos
                  }`}
                />
                 <BadgeDetail 
                title={'Tipo de estudio'}
                content={detailEstudio && detailEstudio}
                text={detailEstudio?.tipo}
                />
                
           </WrapContentDetail>
</Box>
          
      <Grid
       display={{lg:'flex',md:'flex',sm:'none'}}
            margin={"50px 10px 20px 10px"}
            templateColumns={"repeat(2,1fr)"}
            gap={"20px"}
          >
            {historyMap && (
              <Select
                width={"100%"}
                color="gray.400"
                defaultValue="Informes anteriores"
              >
                <option hidden colorScheme="gray.400">
                  Informes anteriores
                </option>
                {historyMap.map((estudio, index) => (
                  <option key={index} value={estudio.estudio_id}>
                    {estudio.estudio_codigo}
                  </option>
                ))}
              </Select>
            )}
            {detailEstudio && (
              <Select
                onChange={() => handleOptionClick(detailEstudio?.adjuntos[0]?.uri)}
                width={"100%"}
                color="gray.400"
                disabled={detailEstudio?.adjuntos?.length > 0 && detailEstudio?.adjuntos[0] ? false : true}
             
              >
                <option hidden colorScheme="gray.400">
                  Anexos
                </option>
                {detailEstudio?.adjuntos?.map((estudio, index) => (
                  <option key={index} value={estudio.uri} >

                    {estudio.file_name}

                  </option>
                ))}
              </Select>
            )}

            {/*detailEstudio && (
              <Select
                width={"100%"}
                color="gray.400"
                defaultValue="Informes anteriores"
              >
                <option hidden colorScheme="gray.400">
                  Muestras
                </option>
                {detailEstudio?.muestras?.map((estudio, index) => (
                  <option key={index} value={estudio.estudio_id}>
                    {estudio.tipo_de_muestra}
                  </option>
                ))}
              </Select>
            )*/}
          </Grid>
        </Box>

        <Box
          height={"100%"}
          display={"flex"}
          flexDirection={{ lg: "column", sm: 'row' }}
          alignItems={"center"}
          justifyContent={'center'}
        >
          
           <Box width={'100%'} height={"100%"} justifyContent={'center'} alignItems={'center'}>
           <GreyButton
                handleClick={toggleModalR}
                title={"Registro de cambios"}
              />
              
          {detailEstudio?.tipo==='INMUNOSTOQUIMICA' || detailEstudio?.tipo==='INMUNOHISTOQUIMICA' ?
          
          
          <>
             <OutlineBtnModal
              text={"Agregar nuevo proceso"}
              handleClick={toggleModalIH}
             
            />
             <OutlineBtnModal
              text={"Resultados"}
              handleClick={toggleModalIHResultados}
             
            />
            
          </>
        
            : <>
            <OutlineBtnModal
              text={"Descripción Macroscópica "}
              handleClick={toggleModal}
            />
            <OutlineBtnModal
              text={"Descripción Microscópica"}
              handleClick={toggleModalM}
            />
            <OutlineBtnModal text={"Diagnóstico"} handleClick={toggleModalD} />
            <OutlineBtnModal text={"Notas"} handleClick={toggleModalN} />
            <OutlineBtnModal text={"Bibliografía"} handleClick={toggleModalB} />
            
          </>}
            
            <Box display={{sm:'flex',lg:'none',md:'none'}} width={'100%'} my={'3%'}>
       
       
        <GreyButton
          handleClick={() => setShowModalEstudioNotas(true)}
          title={"Notas de estudio"}
        />
        </Box>
           </Box> 
         
        </Box>
      </Grid>

      <ModalCreateNotes
        setShowModal={setShowModal}
        titulo={"Descripción Macroscópica"}
        toggleModal={toggleModal}
        showModal={showModal}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="macro"
      
        setInformeDetail={setInformeDetail}
        setShowModalGeneral={setShowModalGeneral}
      />

      <ModalCreateNotes
        setShowModal={setShowModalMacro}
        titulo={"Descripción Microscópica"}
        toggleModal={toggleModalM}
        showModal={showModalMacro}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="micro"
        setShowModalGeneral={setShowModalGeneral}
      />

      <ModalCreateNotes
        setShowModal={setShowModalDiag}
        titulo={"Descripción Diagnóstico"}
        toggleModal={toggleModalD}
        showModal={showModalDiag}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="diag"
        setShowModalGeneral={setShowModalGeneral}
      />

      <ModalCreateNotes
        setShowModal={setShowModalNotas}
        titulo={"Notas"}
        toggleModal={toggleModalN}
        showModal={showModalNotas}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="notas"
        setShowModalGeneral={setShowModalGeneral}
      />

      <ModalCreateNotes
        setShowModal={setShowModalBibli}
        titulo={"Bibliografía"}
        toggleModal={toggleModalB}
        showModal={showModalBibli}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="bibli"
        setShowModalGeneral={setShowModalGeneral}
      />

      <ModalCreateNotes
        setShowModal={setShowModalRegister}
        titulo={"Registro de Cambios"}
        toggleModal={toggleModalR}
        showModal={showModalRegister}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="register"
      //setShowModalGeneral={setShowModalGeneral}
      />
      <ModalCreateNotes
        setShowModal={setShowModalEstudioNotas}
        titulo={"Notas de estudio"}
        toggleModal={toggleModalNotas}
        showModal={showModalEstudioNotas}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        detailEstudio={detailEstudio}
        type="notas2"
      //setShowModalGeneral={setShowModalGeneral}
      />
       <ModalCreateNotes
        setShowModal={setShowModalResultadosIh}
        titulo={"Resultados Inmunohistoquimica"}
        toggleModal={toggleModalIHResultados}
        showModal={showModalResultadosIh}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        detailEstudio={detailEstudio}
        type="resultadosI"
        //setShowModalGeneral={setShowModalGeneral}
      />
     <AddIHQModal
      showModal={showModalDescIh}
      toggleModal={toggleModalIH}
      idStudy={detailEstudio?.id}
      />
      <ModalSendWp
        detailEstudio={detailEstudio}
        isOpen={showModalSendWp}
        setOpenModal={setShowModalSendWp}
      />
      <ModalPrint text={'¿Desea descargar el informe generado ?'} isOpen={showModalGenerateUri} setOpenModal={setShowModalGenerateUri} pdfContent={pdfUri} />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={{lg:"space-between",md:'space-between',sm:'center' }}
        mb={"-20px"}
        mt={"-30px"}
        width={"100%"}
      >
        <Box  display={{sm:'none',lg:'flex',md:'none'}} width={'70%'} >
        <GreyButton
          handleClick={() => setShowModalEstudioNotas(true)}
          title={"Notas de estudio"}
        />
         
          
        </Box>
        
        <Box display={"flex"} mx={"2.5%"} justifyContent={'flex-end'} width={'30%'}>
          <GeneralButton text={"Vista previa"} handleClick={generarPdf} />

          <Tooltip label='El informe debe ser aprobado por el patologo antes.'>
          <Button
             disabled={informeDetail?.aprobado ? false : true}
            size="auto"
            padding={{lg:"10px",sm:'10px'}}
           // marginX={"10px"}
            marginY={"30px"}
            color={"whiteAlpha.900"}
            borderColor={"gray.400"}
            background={"#137797"}
            borderRadius={"20px"}
            onClick={handleSubmitGenerateInfor}
          >
            <Text fontSize={{sm:'0.9rem',lg:'1rem',md:'1rem'}} >
            Generar
        </Text>
           
          </Button>
</Tooltip>
          
        </Box>
      </Box>
    </>
  );
}
export default ModalInforme;