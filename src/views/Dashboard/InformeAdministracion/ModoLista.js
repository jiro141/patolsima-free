import { React, useState, useEffect } from "react";
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


const Dashboard = () => {
  const {
    informes,
    getInformes,
    informesCompletados,
    informesNoCompletados,
    filteredInforme,
    loading,
    error,
    setInformes
  } = useInformes();
  useEffect(() => {
    getInformes();
  }, []);
  const [Busqueda, setBusqueda] = useState("");
  const [idInforme, setIdInforme] = useState("");
  const [detailEstudio, setdetailEstudio] = useState([]);
  const [detailInforme, setInformeDetail] = useState([]);
  console.log(informesCompletados);
  const [showModal, setShowModal] = useState(false);

  const [showModalList, setShowModalList] = useState(false);
  const toggleModalList = () => {
    setShowModalList(!showModalList);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const toggleModalConfirmacion = (paciente) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    // setPacienteName(paciente.nombres);
    // setPacienteIdDelete(paciente.id);
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
  const handleSelectInforme = async (id) => {
    const res = await getInformesDetail(id)
    setInformeDetail(res)
    setIdInforme(id)
    const resStudyDetail = await getStudiesDetail(id)
    setdetailEstudio(resStudyDetail)
    setShowModal(!showModal);
  }
  return (
    <>
      <Box
        margin={{ lg: "50px 0px 0px 20px", sm: "60px 0px 10% 0px" }}
        w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 235px)" }}
        height={'auto'}
        padding={{ lg: "0 50px 20px 10px", md: "20px", sm: "0px 0 10% 0" }}
        backgroundColor={"gray.100"}
        borderTopLeftRadius={"20px"}
        backgroundSize="cover"
        backgroundPosition="center"
        overflowY="hidden"
        overflowX={{ lg: "hidden", sm: "auto" }}
      >
        <Box marginTop={'-15px'} padding={'2%'}>
          <TableInforms_Pendientes>
            <Tbody>
              {informesNoCompletados.length === 0 ? (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    <Text marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                informesCompletados.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td style={{ width: '20%' }}>
                      <Link style={{ fontSize: '13.5px' }} onClick={() => handleSelectInforme(study)}>{study?.estudio_codigo}</Link>
                    </Td>
                    <Td>
                      {/* <Link style={{ fontSize: '13.5px' }} onClick={() => toggleModal(study)}>
          {study?.paciente?.nombres.length > 5 && study?.paciente?.apellidos.length > 5
            ? study?.paciente?.nombres + " " + study?.paciente?.apellidos.substring(0, 4) + "..."
            : study?.paciente?.nombres + ' ' + study?.paciente?.apellidos}
        </Link> */}
                    </Td>
                    <Td style={{ width: '20%' }}>
                      <Link style={{ fontSize: '13.5px' }} onClick={() => handleSelectInforme(study)}>{study?.estudio_paciente_ci}</Link>
                    </Td>
                    <Td style={{ width: '20%' }}>
                      <Link style={{ fontSize: '13.5px' }} onClick={() => handleSelectInforme(study)}>{study?.estudio_tipo}</Link>
                    </Td>
                    <Td style={{ width: '20%' }}>
                      <Link style={{ fontSize: '13.5px' }} onClick={() => handleSelectInforme(study)}>{study?.estudio_patologo_name}</Link>
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
                  <Td colSpan={5} textAlign="center">
                    <Text marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                informesCompletados.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td style={{ width: '20%' }}>
                      <Link style={{ fontSize: '13.5px' }} onClick={() => handleSelectInforme(study)}>{study?.estudio_codigo}</Link>
                    </Td>
                    <Td>
                      {/* <Link style={{ fontSize: '13.5px' }} onClick={() => toggleModal(study)}>
          {study?.paciente?.nombres.length > 5 && study?.paciente?.apellidos.length > 5
            ? study?.paciente?.nombres + " " + study?.paciente?.apellidos.substring(0, 4) + "..."
            : study?.paciente?.nombres + ' ' + study?.paciente?.apellidos}
        </Link> */}
                    </Td>
                    <Td style={{ width: '20%' }}>
                      <Link style={{ fontSize: '13.5px' }} onClick={() => handleSelectInforme(study)}>{study?.estudio_paciente_ci}</Link>
                    </Td>
                    <Td style={{ width: '20%' }}>
                      <Link style={{ fontSize: '13.5px' }} onClick={() => handleSelectInforme(study)}>{study?.estudio_tipo}</Link>
                    </Td>
                    <Td style={{ width: '20%' }}>
                      <Link style={{ fontSize: '13.5px' }} onClick={() => handleSelectInforme(study)}>{study?.estudio_patologo_name}</Link>
                    </Td>
                  </Tr>
                ))
              )}

            </Tbody>
          </TableInforms_Confirmados>
          <ShowMoreButton handleClick={toggleModalList} />
        </Box>
      </Box >
      <FilteredDataModal type='informes' thData={thValuesInformes} isOpenModal={showModalList} isToggleModal={toggleModalList} tBodyData={informes}
        Busqueda={Busqueda}
        //handleSelectTBody={seleccionarRegistro}
        handleSelectIcon={toggleModalConfirmacion}
        loading={loading}
        handleBusquedaChange={handleBusquedaChange}

      />
      <Modal
        size={'3xl'}
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