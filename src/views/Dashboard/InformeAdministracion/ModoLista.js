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
import ListaInformes from "./components/ListaInformes";
import ModalInforme from "./components/ModalInforma";
import { Title } from "components/widgets/Texts";
import { TableInforms_Pendientes, TableInforms_Confirmados } from "../Facturacion/components/TableOrders";
import { useInformes } from "hooks/Informes/useInformes";
import ShowMoreButton from "components/widgets/Buttons/ShowMoreButton";
import FilteredDataModal from "components/widgets/Modals/FilteredDataModal";
import { thValuesInformes } from "mocks";
import { getInformesDetail } from "api/controllers/informes";
import { getStudiesDetail } from "api/controllers/estudios";
import Container from "components/widgets/utils/Container";
import MainContext from "context/mainContext/MainContext";
import { getInformesCompletados } from "api/controllers/informes";
import { getInformesNoCompletados } from "api/controllers/informes";
import DeleteModal from "components/widgets/Modals/DeleteModal";
import { deleteInforme } from "api/controllers/informes";

const Dashboard = () => {
  const { informes, getInformes, informesCompletados, informesNoCompletados, filteredInforme, loading, error, setInformes, getInformesNotConfirm, getInformesConfirm } = useInformes()
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const { hiddenInformessort, sethiddenInformessort, enableInfoModalDetails, setEnableInfoModalDetails } = useContext(MainContext);
  useEffect(() => {
    getInformes();
  }, []);
  const [Busqueda, setBusqueda] = useState("");
  const [idInforme, setIdInforme] = useState("");
  const [detailEstudio, setdetailEstudio] = useState([]);
  const [detailInforme, setInformeDetail] = useState();
  const [studyId, setStudyId] = useState('');
  const [pacienteName, setPacienteName] = useState("");
  console.log(informesCompletados);
  useEffect(() => {
    getInformes();
    getInformesNotConfirm()
    getInformesConfirm()
    getInformesCompletados()
    getInformesNoCompletados()
  }, [showModalConfirmacion]);
  const [showModal, setShowModal] = useState(false);

  const [showModalList, setShowModalList] = useState(false);
  const toggleModalList = () => {
    setShowModalList(!showModalList);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
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
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const handleSelectInforme = async (study) => {
    setEnableInfoModalDetails(!enableInfoModalDetails);
    // const res = await getInformesDetail(study)
    setInformeDetail(study)
    setIdInforme(study)
    const resStudyDetail = await getStudiesDetail(study.estudio_id)
    setdetailEstudio(resStudyDetail)
  }
  return (
    <>
      <Container>
        <Box marginTop={"30px"} width={'100%'}
          pl={'5px'}>
          <TableInforms_Pendientes>
            <Tbody>
              {informesNoCompletados.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} style={{fontSize:'15px'}}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                informesNoCompletados.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td style={{fontSize:'13.5px'}} textAlign={'center'} >
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_codigo}</Link>
                    </Td>
                    <Td style={{fontSize:'13.5px'}} textAlign={'center'}>
                      <Link onClick={() => handleSelectInforme(study)}>
                        {study?.estudio_paciente_name.length > 16
                          ? study?.estudio_paciente_name.substring(0, 10) + "..."
                          : study?.estudio_paciente_name}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{fontSize:'13.5px'}}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_paciente_ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{fontSize:'13.5px'}}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_tipo}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{fontSize:'13.5px'}} >
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_patologo_name.length > 16
                        ? study?.estudio_patologo_name.substring(0, 10) + "..."
                        : study?.estudio_patologo_name}</Link>
                    </Td>
                  </Tr>
                ))
              )}

            </Tbody>
          </TableInforms_Pendientes>
          <TableInforms_Confirmados>
            <Tbody>
              {informesCompletados.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} style={{fontSize:'15px'}}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                informesCompletados.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td textAlign={'center'} style={{fontSize:'13.5px'}}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_codigo}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{fontSize:'13.5px'}}>
                      <Link onClick={() => handleSelectInforme(study)}>
                        {study?.estudio_paciente_name.length > 16
                          ? study?.estudio_paciente_name.substring(0, 10) + "..."
                          : study?.estudio_paciente_name}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{fontSize:'13.5px'}}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_paciente_ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{fontSize:'13.5px'}}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_tipo}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{fontSize:'13.5px'}} >
                      <Link onClick={() => handleSelectInforme(study)}>{study?.estudio_patologo_name.length > 16
                        ? study?.estudio_patologo_name.substring(0, 10) + "..."
                        : study?.estudio_patologo_name}</Link>
                    </Td>
                  </Tr>
                ))
              )}

            </Tbody>
          </TableInforms_Confirmados>
          <ShowMoreButton handleClick={toggleModalList} />
        </Box>
      </Container >
      <FilteredDataModal type='informes' thData={thValuesInformes} isOpenModal={showModalList} isToggleModal={toggleModalList} tBodyData={informes}
        Busqueda={Busqueda}
        handleSelectIcon={toggleModalConfirmacion}
        loading={loading}
        handleBusquedaChange={handleBusquedaChange}
        handleSelectTBody={informes}

      />
      <DeleteModal
        isOpen={showModalConfirmacion}
        onClose={toggleModalConfirmacion}
        id={studyId}
        close={toggleModalConfirmacion}
        eliminar={handleDeleteInf}
        nombres={pacienteName}
      />
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
              setShowModalGeneral={setShowModal}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Dashboard;