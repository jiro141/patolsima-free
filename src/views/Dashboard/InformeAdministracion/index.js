import React, { useState, useEffect, useContext } from "react";
// import { useEffect } from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Badge,
  Heading,
  Grid,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Flex,
  CloseButton,
  useBreakpointValue
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { BsFillFileEarmarkRichtextFill } from "react-icons/bs";
import { authApi } from "api/authApi";
import ModalInforme from "./components/ModalInforma";
import ListaInformes from "./components/ListaInformes";
import ModoLista from "./ModoLista"
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import MainContext from "context/mainContext/MainContext";
import CardOverall_ from "components/widgets/Cards/CardOverall";
import { useInformes } from "hooks/Informes/useInformes";
import ShowMoreButton from "components/widgets/Buttons/ShowMoreButton";
import { CardOverall_Infor } from "components/widgets/Cards/CardOverall";
import FilteredDataModal from "components/widgets/Modals/FilteredDataModal";
import { thValuesInformes } from "mocks";
import { useInformeDetail } from "hooks/Informes/useInformeDetail";
import { getInformesDetail } from "api/controllers/informes";
import { getStudiesDetail } from "api/controllers/estudios";
import Container from "components/widgets/utils/Container";
import DeleteModal from "components/widgets/Modals/DeleteModal";
import { getInformesCompletados } from "api/controllers/informes";
import { getInformesNoCompletados } from "api/controllers/informes";
import { deleteInforme } from "api/controllers/informes";

const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { hiddenInformessort, sethiddenInformessort, enableInfoModalDetails, setEnableInfoModalDetails } = useContext(MainContext);
  const { informes, getInformes, informesCompletados, informesNoCompletados, filteredInforme, loading, error, setInformes, getInformesNotConfirm, getInformesConfirm } = useInformes()

  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

  const [Busqueda, setBusqueda] = useState("");
  const [idInforme, setIdInforme] = useState("");
  const [studyId, setStudyId] = useState('');
  const [pacienteName, setPacienteName] = useState("");
  const [detailInforme, setInformeDetail] = useState([]);
  const [detailEstudio, setdetailEstudio] = useState([]);

  const colorA = '#137797';


  //modal 
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setEnableInfoModalDetails(!enableInfoModalDetails);
  };
  const [showModalList, setShowModalList] = useState(false);
  const toggleModalList = () => {
    setShowModalList(!showModalList);
    // get
  };

  const handleDeleteInf = async (study) => {
    try {
      await deleteInforme(study);
      // setSearchFacturas(searchFacturas.filter((p) => p.id !== facturaIdDelete));
      setShowModalConfirmacion(!showModalConfirmacion);
    } catch (error) {
      //toast.error(error.message, { autoClose: 1000 });
    }
  };
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  useEffect(() => {
    getInformes();
    getInformesNotConfirm()
    getInformesConfirm()
    getInformesCompletados()
    getInformesNoCompletados()
  }, [showModalConfirmacion]);
  



  const toggleModalConfirmacion = (estudio) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setStudyId(estudio?.estudio_id);
    setPacienteName(estudio?.estudio_paciente_name);
  };
  const handleBusquedaChange = (event) => {
    const query = event.target.value;
    if (query.startsWith(" ")) return;
    setBusqueda(query);
    filtrar(query);
  };

  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = filteredInforme.filter((elemento) => {
      if (
        elemento.estudio_codigo
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.estudio_patologo_name
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())

      ) {
        return elemento;
      }
    });
    setInformes(resultadoBusqueda);
  };

  const renderStudies = (studies) => {
    return studies.map((study) => (
      <Box>
        <Link
          onClick={toggleModal}>
          <Box
            w={'200px'}
            h={'248px'}
            margin={"5px auto 5px auto"}
            boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
            borderRadius={"16px"}
            key={study.id}
            padding={"0"}
          >
            <Box
              w={'200px'}
              h={'45px'}
              borderTopLeftRadius={"16px"}
              borderTopRightRadius={"16px"}
              backgroundColor={colorA}
            >
              <Badge
                textAlign={"center"}
                background={"none"}
                color={"#FFFF"}
                padding={"10px"}
                fontSize={"17px"}
                w={'200px'}
              >
                {study.nestudio}
                <Icon
                  position={'relative'}
                  border={"solid"}
                  marginTop={"-25px"}
                  marginLeft={"25%"}
                  marginBottom={'-18px'}
                  height={"55px"}
                  width={"55px"}
                  padding={"5px"}
                  borderRadius={"50%"}
                  as={BsFillFileEarmarkRichtextFill}
                  backgroundColor={"#FFFF"}
                  color={colorA}
                />
              </Badge>
            </Box>
            <Box w={'200px'} h={'193px'} p={"10px"} >
              <Heading size="sm">Fecha de ingreso</Heading>
              <Text
                textAlign={"right"}
                ml={2}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.fecha}
              </Text>
              <Heading size="sm">Estudio</Heading>
              <Text
                textAlign={"right"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.estudio}
              </Text>
              <Heading size="sm">Paciente</Heading>
              <Text textAlign={"right"}>{study.paciente}</Text>
              <Heading size="sm">RIF/CI</Heading>
              <Text textAlign={"right"}>{study.ci}</Text>
            </Box>
          </Box>
        </Link>
      </Box>
    ));
  };
  const handleSelectInforme = async (id) => {
    const res = await getInformesDetail(id)
    setInformeDetail(res)
    setIdInforme(id)
    const resStudyDetail = await getStudiesDetail(id)
    setdetailEstudio(resStudyDetail)
  }
  //console.log(informes.estudio)
  return (
    modoVisualizacion === 'tarjeta' ? (
      <>
        <Container
        >


          <Box marginTop={"30px"} width={'100%'}
            pl={'5px'}>
            {hiddenInformessort ? (
              <>
                <CardOverall_Infor
                  type='informes'
                  title={"Infomes sin completar"}
                  content={informesNoCompletados}
                  toggleModal={toggleModal}
                  colorA={colorA}
                  loading={loading}
                  handleSelectInforme={handleSelectInforme}
                />

                <CardOverall_Infor
                  title={"Infomes Completados"}
                  content={informesCompletados}
                  toggleModal={toggleModal}
                  colorA={colorA}
                  loading={loading}
                  handleSelectInforme={handleSelectInforme}
                  type='informes'
                />
              </>
            ) : (
              <CardOverall_Infor
                title={"Resultados"}
                content={informes}
                toggleModal={toggleModal}
                colorA={colorA}
                loading={loading}
                handleSelectInforme={handleSelectInforme}
                type="search"
              />
            )}

            <ShowMoreButton handleClick={toggleModalList} />
          </Box>
        </Container>
        <Modal
          size={'3xl'}
          maxWidth='100%'
          onClose={() => setEnableInfoModalDetails(false)}
          isOpen={enableInfoModalDetails}>
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
              <ModalInforme detailEstudio={detailEstudio} informeDetail={detailInforme}
                setInformeDetail={setInformeDetail}
                setShowModalGeneral={setShowModal}
                setEnableInfoModalDetails={setEnableInfoModalDetails}
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        <FilteredDataModal
          type='informes'
          thData={thValuesInformes}
          isOpenModal={showModalList}
          isToggleModal={toggleModalList}
          tBodyData={informes}
          Busqueda={Busqueda}
          handleSelectTBody={handleSelectInforme}
          handleSelectIcon={toggleModalConfirmacion}
          loading={loading}
          handleBusquedaChange={handleBusquedaChange}
        />
        <DeleteModal
          isOpen={showModalConfirmacion}
          onClose={toggleModalConfirmacion}
          id={studyId}
          close={toggleModalConfirmacion}
          eliminar={handleDeleteInf}
          nombres={pacienteName}
        />



      </>
    ) : (<ModoLista />)
  );
};

export default Dashboard;
