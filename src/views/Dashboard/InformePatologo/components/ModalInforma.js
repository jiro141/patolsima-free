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
} from "@chakra-ui/react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInformes } from "hooks/Informes/useInformes";
import { lastInformes } from "api/controllers/informes";
import { completeInforme } from "api/controllers/informes";
import { getInformePreview } from "api/controllers/informes";
import { Title } from "components/widgets/Texts";
import { SubTitlelight } from "components/widgets/Texts";
import OutlineBtnModal from "components/widgets/Buttons/OutlineBtnModal";
import GeneralButton from "components/widgets/Buttons/GeneralButton";
import ModalCreateNotes from "views/Dashboard/InformeAdministracion/components/ModalCreateNotes";
import ModalSendWp from "components/widgets/Modals/ModalSendWp";
import { useEffect } from "react";
import { Separator } from "components/Separator/Separator";
import GreyButton from "components/widgets/Buttons/GreyButton";
import { aprobarInforme } from "api/controllers/informes";
import AddIHQModal from "components/widgets/Modals/AddIHQModal";
import WrapContentDetail from "components/widgets/Cards/WrapContentDetail";
import BadgeDetail from "components/widgets/Cards/BadgeDetail";

const ModalInforme = ({
  informeDetail,
  detailEstudio,
  setInformeDetail,
  setShowModalGeneral,
}) => {
  console.log(detailEstudio, 'detalles informe');
  const [showModal, setShowModal] = useState(false);
  const [showModalMacro, setShowModalMacro] = useState(false);
  const [showModalDiag, setShowModalDiag] = useState(false);
  const [showModalNotas, setShowModalNotas] = useState(false);
  const [showModalBibli, setShowModalBibli] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalSendWp, setShowModalSendWp] = useState(false);
  const [showModalEstudioNotas, setShowModalEstudioNotas] = useState(false);
  const [historyMap, setHistoryMap] = useState([]);
  const [showModalAnexos, setShowModalAnexos] = useState(false);
  const [showModalDescIh, setShowModalDescIh] = useState(false);
  const [showModalResultadosIh, setShowModalResultadosIh] = useState(false);
  const [showModalMuestra,setShowModalMuestra]=useState(false);
  const toggleModalAnexos = () => {
    setShowModalAnexos(!showModalAnexos);
  }
  const toggleModalMuestra = () => {
    setShowModalMuestra(!showModalMuestra);
  }
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
  const toggleModalNotas = () => {
    setShowModalEstudioNotas(!showModalEstudioNotas);
  };
  const toggleModalIH = () => {
    setShowModalDescIh(!showModalDescIh);
  };
  const toggleModalIHResultados = () => {
    setShowModalResultadosIh(!showModalResultadosIh);
  };
  //console.log(informeDetail.paciente.id); 
  useEffect(() => {
    const historyInformes = async () => {
      // console.log(informeDetail, 'detalles');
      if (detailEstudio) {
        const res = await lastInformes(detailEstudio?.paciente?.id);
        // console.log(res, 'informes anteriores');
        setHistoryMap(res);
      }
    };
    historyInformes();
    return () => { };
  }, []);

  const handleSubmitGenerateInfor = async () => {
    if (detailEstudio) {
      const res = await aprobarInforme(detailEstudio.id);
      console.log(res);
      if (res) {
        toast.success("¡Informe aprobado con exito!", {
          autoClose: 1000,
        });
        setShowModalGeneral(false)
        window.location.reload();
      } else {
        toast.error("¡No puedes aprobar este informe!", {
          autoClose: 1000,
        });
      }
    }
  };

  const generarPdf = async () => {
    const res = await getInformePreview(detailEstudio.id);
    window.open(res, "_blank");
    //console.log(res)
  };
  const handleOptionClick = (url) => {
    window.location.href = url;

  };
  const size = useBreakpointValue({ base: "sm", lg: "5xl", md: "2xl" });
  return (
    <>
      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }}
        height={{ base: 'auto', md: '55vh' }} >
        <Box marginTop={"-20px"}>
          <Title title={"Información General"} color={"#000"} />
          <Separator
            marginTop={"8px"}
            width={"70%"}
            backgroundColor={"#89bbcc"}
            color={"#89bbcc"}
          ></Separator>
          {/* <Grid templateColumns={"repeat(3,1fr)"}>
            <Box>
              <Box margin={"10px"}>
                <SubTitlelight title={"Paciente"} color={"#000"} />
                {detailEstudio ? (
                  <Badge>
                    <Text>
                      {` ${
                        detailEstudio?.paciente?.nombres.length > 9
                          ? detailEstudio?.paciente?.nombres.substring(0, 9) +
                            "..."
                          : detailEstudio?.paciente?.nombres
                      }

                            ${
                              detailEstudio?.paciente?.apellidos.length > 10
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
          </Grid>*/}

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
              text={`${detailEstudio?.medico_tratante?.nombres.length > 9
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
                }`}
            />
            <BadgeDetail
              title={'Prioridad'}
              content={detailEstudio && detailEstudio}
              text={detailEstudio?.prioridad}
            />

            <BadgeDetail
              title={'Telefono'}
              content={detailEstudio && detailEstudio}
              text={detailEstudio?.medico_tratante?.telefono_celular}
            />

          </WrapContentDetail>


          <Title title={"Información de estudio"} color={"#000"} />
          <Separator
            marginTop={"8px"}
            width={"70%"}
            backgroundColor={"#89bbcc"}
            color={"#89bbcc"}
          ></Separator>


          {/* <Grid templateColumns={"repeat(3,1fr)"}>
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
          </Grid>*/}
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



          <Grid
            margin={"20% 10px -10px 0px"}
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
          <Box width={'100%'} height={"100%"} justifyContent={'center'} alignItems={'center'} marginTop={'-20%'}>

            {/* <GreyButton
              handleClick={toggleModalR}
              title={"Registro de cambios"}
            /> */}


            {detailEstudio?.tipo === 'INMUNOSTOQUIMICA' || detailEstudio?.tipo === 'INMUNOHISTOQUIMICA'
              ?
              <>
                <OutlineBtnModal
                  text={"Muestra recibida"}
                  handleClick={toggleModalMuestra}

                />

                <OutlineBtnModal
                  text={"Agregar nuevo proceso"}
                  handleClick={toggleModalIH}

                />
                <OutlineBtnModal
                  text={"Resultados"}
                  handleClick={toggleModalIHResultados}

                />
                <OutlineBtnModal
                  text={"Descripción Microscópica"}
                  handleClick={toggleModal}
                />
                <OutlineBtnModal text={"Notas"} handleClick={toggleModalN} />
                <OutlineBtnModal text={"Anexos"} handleClick={toggleModalAnexos} />
                <OutlineBtnModal text={"Bibliografía"} handleClick={toggleModalB} />
              </>
              :
              <Box marginTop={'5%'}>
                <OutlineBtnModal
                  text={"Descripción Macroscópica"}
                  handleClick={toggleModalM}
                />
                <OutlineBtnModal
                  text={"Descripción Microscópica"}
                  handleClick={toggleModalM}
                />
                <OutlineBtnModal text={"Diagnóstico"} handleClick={toggleModalD} />
                <OutlineBtnModal text={"Notas"} handleClick={toggleModalN} />
                <OutlineBtnModal text={"Anexos"} handleClick={toggleModalAnexos} />
                <OutlineBtnModal text={"Bibliografía"} handleClick={toggleModalB} />
              </Box>
            }
          </Box>
        </Box>
      </Grid >

      <ModalCreateNotes
        setShowModal={setShowModal}
        titulo={"Descripción Macroscópica"}
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
        titulo={"Descripción Microscópica"}
        toggleModal={toggleModalM}
        showModal={showModalMacro}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="macro"
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
        setShowModal={setShowModalAnexos}
        titulo={"Anexos"}
        toggleModal={toggleModalAnexos}
        showModal={showModalAnexos}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="anexos"
        setShowModalGeneral={setShowModalGeneral}
      />
      <ModalCreateNotes
        setShowModal={setShowModalMuestra}
        titulo={"Muestra recibida"}
        toggleModal={toggleModalMuestra}
        showModal={showModalMuestra}
        informeDetail={informeDetail}
        idStudy={detailEstudio?.id}
        type="muestra"
        setShowModalGeneral={setShowModalGeneral}
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

      <ModalSendWp
        detailEstudio={detailEstudio}
        isOpen={showModalSendWp}
        setOpenModal={setShowModalSendWp}
      />
      <AddIHQModal
        showModal={showModalDescIh}
        toggleModal={toggleModalIH}
        idStudy={detailEstudio?.id}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={{ lg: "space-between", md: 'space-between', sm: 'center' }}
        mb={"-20px"}
        mt={"-30px"}
        width={"100%"}
      >
        <Box display={{ sm: 'none', lg: 'grid', md: 'flex' }} gridTemplateColumns={'1fr 1fr'} gap={'20px'} width={'100%'}>
          <GreyButton
            handleClick={() => setShowModalEstudioNotas(true)}
            title={"Notas de estudio"}
          />
          <GreyButton
            handleClick={toggleModalR}
            title={"Registro de cambios"}
          />
        </Box>

        <Box display={"flex"} mx={"2.5%"} >
          <GeneralButton text={"Vista previa"} handleClick={generarPdf} />

          <Button
            // disabled={informeDetail?.aprobado === false ? true : false}
            size="auto"
            padding={{ lg: "10px", sm: '10px' }}
            // marginX={"10px"}
            marginY={"30px"}
            color={"whiteAlpha.900"}
            borderColor={"gray.400"}
            background={"#137797"}
            borderRadius={"20px"}
            onClick={handleSubmitGenerateInfor}
          >
            <Text fontSize={{ sm: '0.9rem', lg: '1rem', md: '1rem' }} >
              Aprobar
            </Text>

          </Button>
        </Box>
      </Box>
    </>
  );
};
export default ModalInforme;