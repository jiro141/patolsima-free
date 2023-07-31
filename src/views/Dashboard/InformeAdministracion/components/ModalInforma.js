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



const ModalInforme = ({ informeDetail, detailEstudio, setInformeDetail, setShowModalGeneral }) => {
  console.log(detailEstudio);
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
  //console.log(informeDetail.paciente.id);
  useEffect(() => {
    const historyInformes = async () => {
      if (informeDetail) {
        const res = await lastInformes(informeDetail?.paciente?.id)
        setHistoryMap(res);
      }

    }
    historyInformes()
    return () => {

    }
  }, [informes])

  const handleSubmitGenerateInfor = async () => {
    if (detailEstudio) {

      const res = await completeInforme(detailEstudio.id)
      console.log('res complete informe -->');
      console.log(res);
      if (res) {
        const resGenerate = await generateInformeCompletePdf(detailEstudio?.id)
        console.log(resGenerate);
        informes()
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

        } else {
          toast.error("Se requiere confirmación del patologo y administrador, recuerda confirmar el pago", {
            autoClose: 3000,
          });
        }
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

  console.log(detailEstudio)
  //console.log(detailEstudio.envio_digital)
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
          <Grid templateColumns={{ lg: "repeat(3,1fr)", sm: "repeat(2,1fr)" }}>
            <Box>
              <Box margin={"10px"}>
                <SubTitlelight title={"Paciente"} color={"#000"} />
                {detailEstudio ? (
                  <Badge>
                    <Text>
                      {` ${detailEstudio?.paciente?.nombres.length > 9
                        ? detailEstudio?.paciente?.nombres.substring(0, 9) +
                        "..."
                        : detailEstudio?.paciente?.nombres
                        }
    
                                ${detailEstudio?.paciente?.apellidos.length > 10
                          ? detailEstudio?.paciente?.apellidos.substring(
                            0,
                            10
                          ) + "..."
                          : detailEstudio?.paciente?.apellidos
                        }`}
                    </Text>
                  </Badge>
                ) : (
                  <Badge>
                    <Text>Cargando</Text>
                  </Badge>
                )}
              </Box>
              <Box margin={"10px"}>
                <SubTitlelight title={"Prioridad"} color={"#000"} />
                {detailEstudio ? (
                  <Badge
                    colorScheme={
                      detailEstudio?.prioridad === "ALTA"
                        ? "red"
                        : detailEstudio?.prioridad === "MEDIA"
                          ? "purple"
                          : ""
                    }
                  >
                    <Text>{`${detailEstudio?.prioridad} `}</Text>
                  </Badge>
                ) : (
                  <Badge>
                    <Text>Cargando</Text>
                  </Badge>
                )}
              </Box>
            </Box>
            <Box>
              <Box margin={"10px"}>
                <SubTitlelight title={"CI/RIF"} color={"#000"} />
                {detailEstudio ? (
                  <Badge>
                    <Text>{`${detailEstudio?.paciente?.ci}`}</Text>
                  </Badge>
                ) : (
                  <Badge>
                    <Text>Cargando</Text>
                  </Badge>
                )}
              </Box>
              {detailEstudio?.medico_tratante && (
                <Box margin={"10px"}>
                  <SubTitlelight title={"Medico Tratante"} color={"#000"} />
                  {detailEstudio?.medico_tratante ? (
                    <Badge>
                      <Text>{`${detailEstudio?.medico_tratante?.nombres} ${detailEstudio?.medico_tratante?.apellidos}`}</Text>
                    </Badge>
                  ) : (
                    <></>
                  )}
                </Box>
              )}
            </Box>
            <Box pb={"10px"}>
              <Box margin={"10px"}>
                {detailEstudio ? (
                  <Box margin={"10px"}>
                    <SubTitlelight title={"Telefono "} color={"#000"} />
                    {detailEstudio?.paciente?.telefono_celular ? (
                      <Badge>
                        <Text>{`${detailEstudio?.paciente?.telefono_celular}`}</Text>
                      </Badge>
                    ) : (
                      <></>
                    )}
                  </Box>
                ) : (
                  ""
                )}
              </Box>
              {detailEstudio && detailEstudio?.medico_tratante && (
                <Box margin={"10px"}>
                  <Box margin={"10px"}>
                    <SubTitlelight title={"Telefono"} color={"#000"} />
                    {detailEstudio?.medico_tratante?.telefono_celular ? (
                      <Badge>
                        <Text>{`${detailEstudio?.medico_tratante?.telefono_celular}`}</Text>
                      </Badge>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Box margin={"8px"} />
          <Title title={"Información de estudio"} color={"#000"} />
          <Separator
            marginTop={"8px"}
            width={"70%"}
            backgroundColor={"#89bbcc"}
            color={"#89bbcc"}
          ></Separator>
          <Grid templateColumns={{ lg: "repeat(4,1fr)", sm: "repeat(2,1fr)" }}>
            <Box mt={"10px"}>
              <SubTitlelight title={"Estudio #"} color={"#000"} />
              {detailEstudio ? (
                <Badge>
                  <Text>{`${detailEstudio?.codigo}`}</Text>
                </Badge>
              ) : (
                <Badge>
                  <Text>Cargando</Text>
                </Badge>
              )}
            </Box>

            <Box mt={"10px"}>
              <SubTitlelight title={"Patologo"} color={"#000"} />
              {detailEstudio ? (
                <Badge>
                  <Text>{`${detailEstudio?.patologo?.nombres} ${detailEstudio?.patologo?.apellidos}`}</Text>
                </Badge>
              ) : (
                <Badge>
                  <Text>Cargando</Text>
                </Badge>
              )}
            </Box>
            <Box mt={"10px"}>
              <SubTitlelight title={"Tipo de estudio"} color={"#000"} />
              {detailEstudio ? (
                <Badge>
                  <Text>{`${detailEstudio?.tipo}`}</Text>
                </Badge>
              ) : (
                <Badge>
                  <Text>Cargando</Text>
                </Badge>
              )}
            </Box>
          </Grid>
          <Grid
            margin={"50px 10px 20px 10px"}
            templateColumns={"repeat(3,1fr)"}
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
              //onClick={()=>console.log('clikin')}
              //defaultValue="Informes anteriores"
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

            {detailEstudio && (
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
            )}
          </Grid>
        </Box>

        <Box
          height={"100%"}
          display={"flex"}
          flexDirection={{ lg: "column", sm: 'row' }}
          alignItems={"flex-start"}
          justifyContent={'space-between'}
        >
          <Box height="50%" marginTop={"6%"} >
            <Box
              margin={"10px"}
              marginBottom={"5px"}
              marginTop={"-20%"}
              width={"100%"}
            >
              <GreyButton
                handleClick={toggleModalR}
                title={"Registro de cambios"}
              />
            </Box>
            <OutlineBtnModal
              text={"Descripción Microscópica"}
              handleClick={toggleModal}
            />
            <OutlineBtnModal
              text={"Descripción Macroscópica"}
              handleClick={toggleModalM}
            />
            <OutlineBtnModal text={"Diagnóstico"} handleClick={toggleModalD} />
            <OutlineBtnModal text={"Notas"} handleClick={toggleModalN} />
            <OutlineBtnModal text={"Bibliografía"} handleClick={toggleModalB} />
          </Box>
        </Box>
      </Grid>

      <ModalCreateNotes
        setShowModal={setShowModal}
        titulo={"Descripción microscópica"}
        toggleModal={toggleModal}
        showModal={showModal}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="micro"
        setInformeDetail={setInformeDetail}
        setShowModalGeneral={setShowModalGeneral}
      />

      <ModalCreateNotes
        setShowModal={setShowModalMacro}
        titulo={"Descripción macroscópica"}
        toggleModal={toggleModalM}
        showModal={showModalMacro}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="macro"
        setShowModalGeneral={setShowModalGeneral}
      />

      <ModalCreateNotes
        setShowModal={setShowModalDiag}
        titulo={"Descripción diagnóstico"}
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
        titulo={"Biblografía"}
        toggleModal={toggleModalB}
        showModal={showModalBibli}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="bibli"
        setShowModalGeneral={setShowModalGeneral}
      />

      <ModalCreateNotes
        setShowModal={setShowModalRegister}
        titulo={"Registro de cambios"}
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
        setShowModal={setShowModalDescIh}
        titulo={"Descripción"}
        toggleModal={toggleModalIH}
        showModal={showModalDescIh}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        detailEstudio={detailEstudio}
        type="desIH"
      //setShowModalGeneral={setShowModalGeneral}
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
        justifyContent={"space-between"}
        mb={"-20px"}
        mt={"-30px"}
        width={"95%"}
      >
        <GreyButton
          handleClick={() => setShowModalEstudioNotas(true)}
          title={"Notas de estudio"}
        />
        <Box display={"flex"} ml={"60px"}>
          <GeneralButton text={"Vista previa"} handleClick={generarPdf} />

          <Button
            // disabled={detailEstudio?.envio_digital ? false : true}
            size="auto"
            padding={"10px"}
            marginX={"10px"}
            marginY={"30px"}
            color={"whiteAlpha.900"}
            borderColor={"gray.400"}
            background={"#137797"}
            borderRadius={"20px"}
            onClick={handleSubmitGenerateInfor}
          >
            Generar
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default ModalInforme;