import { React, useState, useEffect, useContext } from "react";
import {
  Badge,
  Heading,
  Link,
  Text,
  useColorModeValue,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
  CloseButton,
  useBreakpointValue
} from "@chakra-ui/react";
import { FaFlask } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import DatosMuestra from "./DatosMuestra";
import ModalInforme from "./components/ModalInforma";
import ListaInformes from "./components/ListaInformes";
import { getListInforme } from "api/controllers/informes";
import Container from "components/widgets/utils/Container";
import { TableStudys_Alta } from "../Facturacion/components/TableOrders";
import { TableStudys_Media } from "../Facturacion/components/TableOrders";
import { TableStudys_Baja } from "../Facturacion/components/TableOrders";
import { getInformesListHightPriority } from "api/controllers/informes";
import { getInformesListMediaPriority } from "api/controllers/informes";
import { getInformesListLowPriority } from "api/controllers/informes";
import ShowMoreButton from "components/widgets/Buttons/ShowMoreButton";
import FilteredDataModal from "components/widgets/Modals/FilteredDataModal";
import MainContext from "context/mainContext/MainContext";
import { getStudiesDetail } from "api/controllers/estudios";
import { formatDate } from "helpers";
import { useInformes } from "hooks/Informes/useInformes";
import { thValuesFacturas } from "mocks";
import { thValuesInformes } from "mocks";
import { getInformesDetail } from "api/controllers/informes";
const Dashboard = () => {
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";
  const [informesHightPriority, setInformesHightPriority] = useState([])
  const [informesMediaPriority, setInformesMediaPriority] = useState([])
  const [informesLowPriority, setInformesLowPriority] = useState([])
  const [detailInforme, setInformeDetail] = useState();
  const [idInforme, setIdInforme] = useState("");
  const [detailEstudio, setdetailEstudio] = useState([]);
  const { hiddenInformessort, sethiddenInformessort, enableInfoModalDetails, setEnableInfoModalDetails } = useContext(MainContext);
  const [Busqueda, setBusqueda] = useState("");
  const { informes, getInformes, informesCompletados, informesNoCompletados, filteredInforme, loading, error, setInformes, getInformesNotConfirm, getInformesConfirm } = useInformes()
  const [showModalListDetails, setShowModalListDetails] = useState(false);
  const [detailInformefromShowMore, setInformeDetailfromShowMore] = useState([]);
  const [detailEstudiofromShowMore, setdetailEstudiofromShowMore] = useState([]);
 
  const handleSelectInforme = async (study) => {
    setEnableInfoModalDetails(!enableInfoModalDetails);
    // const res = await getInformesDetail(study)
    setInformeDetail(study)
    setIdInforme(study)
    const resStudyDetail = await getStudiesDetail(study.estudio_id)
    setdetailEstudio(resStudyDetail)
  }

  const peticionGetHightPriority = async () => {
    try {
      const informesList = await getInformesListHightPriority()
      setInformesHightPriority(informesList);

    } catch (error) {
      console.log(error);
    }
  };
  const peticionGetMediaPriority = async () => {
    try {
      const informesList = await getInformesListMediaPriority()
      setInformesMediaPriority(informesList);

    } catch (error) {
      console.log(error);
    }
  };
  const peticionGetLowPriority = async () => {
    try {
      const informesList = await getInformesListLowPriority()
      console.log(informesList);
      setInformesLowPriority(informesList);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // peticionGet();
    getInformesListHightPriority()
    getInformesListMediaPriority()
    getInformesListLowPriority()
    peticionGetHightPriority()
    peticionGetMediaPriority()
    peticionGetLowPriority()
  }, []);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [showModalList, setShowModalList] = useState(false);
  const toggleModalList = () => {
    setShowModalList(!showModalList);
  };
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
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
  const handleSelectInformeFromShowMore = async (id) => {
    console.log(id);
    setShowModalListDetails(true)
    const res = await getInformesDetail(id)
    setInformeDetailfromShowMore(res)
    //setIdInforme(id)
    const resStudyDetail = await getStudiesDetail(id)
    setdetailEstudiofromShowMore(resStudyDetail)

   
  }
 

  return (
    <>
      <Container>
        <Box padding={'2%'}>
          <TableStudys_Alta colorA={highPriorityColor}>
            <Tbody>
              {informesHightPriority?.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                informesHightPriority?.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_codigo}</Link>
                    </Td>
                    <Td textAlign={'center'}>
                      <Link onClick={() => toggleModal(study)}>
                        {study?.estudio_paciente_name.length > 16
                          ? study?.estudio_paciente_name.substring(0, 16) + "..."
                          : study?.estudio_paciente_name}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_paciente_ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{formatDate(study?.created_at)}</Link>
                    </Td>
                    <Td textAlign={'center'} >
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_tipo}</Link>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </TableStudys_Alta>
          <TableStudys_Media colorA={mediumPriorityColor}>
            <Tbody>
              {informesMediaPriority?.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                informesMediaPriority?.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_codigo}</Link>
                    </Td>
                    <Td textAlign={'center'}>
                      <Link onClick={() => handleSelectInforme(study)}>
                        {study?.estudio_paciente_name.length > 16
                          ? study?.estudio_paciente_name.substring(0, 16) + "..."
                          : study?.estudio_paciente_name}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_paciente_ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{formatDate(study?.created_at)}</Link>
                    </Td>
                    <Td textAlign={'center'} >
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_tipo}</Link>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </TableStudys_Media>
          <TableStudys_Baja colorA={lowPriorityColor}>
            <Tbody>
              {informesLowPriority?.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                informesLowPriority?.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_codigo}</Link>
                    </Td>
                    <Td textAlign={'center'}>
                      <Link onClick={() => handleSelectInforme(study)}>
                        {study?.estudio_paciente_name.length > 16
                          ? study?.estudio_paciente_name.substring(0, 16) + "..."
                          : study?.estudio_paciente_name}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_paciente_ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{formatDate(study?.created_at)}</Link>
                    </Td>
                    <Td textAlign={'center'} >
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_tipo}</Link>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </TableStudys_Baja>
          <ShowMoreButton handleClick={toggleModalList} />
        </Box>
      </Container>
      <FilteredDataModal
        type='informes'
        thData={thValuesInformes}
        isOpenModal={showModalList}
        isToggleModal={toggleModalList}
        tBodyData={informes}
        Busqueda={Busqueda}
        handleSelectTBody={handleSelectInformeFromShowMore}
        //handleSelectIcon={toggleModalConfirmacion}
        //loading={loading}
        handleBusquedaChange={handleBusquedaChange}
      //  setAbonarSend={setAbonarSend}
      />
     {/* <DeleteModal
        isOpen={showModalConfirmacion}
        onClose={toggleModalConfirmacion}
        id={facturaIdDelete}
        close={toggleModalConfirmacion}
        eliminar={handleDeleteFact}
        nombres={pacienteName}
      /> */}
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
              onClick={() => setEnableInfoModalDetails(false)}>
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ModalInforme detailEstudio={detailEstudio} informeDetail={detailInforme}
              setInformeDetail={setInformeDetail}
              setShowModalGeneral={setShowModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
     
      <Modal
        size={'3xl'}
        maxWidth='100%'
        onClose={() => setShowModalListDetails(false)}
        isOpen={showModalListDetails}>
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
              onClick={() => setShowModalListDetails(false)}>
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ModalInforme detailEstudio={detailEstudiofromShowMore} informeDetail={detailInformefromShowMore}
              setInformeDetail={setInformeDetail}
              setShowModalGeneral={setShowModal} />
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
};
export default Dashboard;