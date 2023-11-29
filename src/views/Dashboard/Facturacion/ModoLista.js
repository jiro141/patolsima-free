import { React, useState, useEffect, useCallback } from "react";
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
import ModalFacturacion from "./components/ModalFacturacion";
import ListaFacturas from "./components/ListaFacturas";
import { getCambio } from "api/controllers/tazaDia";
import { getFacturasList } from "api/controllers/facturas";
import { TH } from "components/widgets/Tables";
import { thValuesFacturas } from "mocks";
import { thValuesFacturasSimples } from "mocks";
import SaveButton from "components/widgets/Buttons/SaveButton";
import ShowMoreButton from "components/widgets/Buttons/ShowMoreButton";
import TableOrders, { TableOrders_Confirmadas, TableOrders_Pendientes } from "./components/TableOrders";
import FilteredDataModal from "components/widgets/Modals/FilteredDataModal";
import { useSearchFacturas } from "hooks/Facturas/useSearchFacturas";
import DeleteModal from "components/widgets/Modals/DeleteModal";
import { deleteOrden } from "api/controllers/facturas";
import CardCambio from "components/widgets/Cards/CardCambio";
import { useFacturas } from "hooks/Facturas/useFacturas";
import { formatDate } from "helpers";
import Container from "components/widgets/utils/Container";
import { useContext } from "react";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import MainContext from "context/mainContext/MainContext";
import { useHistory } from "react-router-dom";
import debounce from "just-debounce-it";
import Reporte from "./components/Reporte"
const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { hiddenFactssort, archived, setArchived, facturas,
    idSelectItem, setidSelectItem,
    enablefactModalDetails, setEnablefactModalDetails, ordenId, setFacturas
  } = useContext(MainContext);
  const history = useHistory();
  const colorA = "#137797";
  const [Busqueda, setBusqueda] = useState("");
  const [study, setStudy] = useState([]);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [showModalConfirmaciodn, setShowModalConfirmacdion] = useState(false);
  const [abonarSend, setAbonarSend] = useState(false);
  const [modalReporte, setModalReporte] = useState(false);
  // const [facturaIdDelete, setfacturaIdDelete] = useState("");
  // const [pacienteName, setPacienteName] = useState("");
  // const [archived, setArchived] = useState(false);
  const toggleModalReporte = () => {
    setModalReporte(!modalReporte);
    console.log('funciona');
  }
  const {

    getFacturas,
    getCambios,
    cambioDelDia,
    facturasConfirmadas,
    facturasNoConfirmadas,
    loading,
    getFacturasConfirm, getFacturasNotConfirm,
    setFacturasNoConfirmadas,
    setFacturasConfirmadas
  } = useFacturas();
  console.log(facturas);
  const {
    loadingSF,
    searchFacturas,
    staticFacturas,
    error,
    setSearchFacturas,
    getSearchFacturas
  } = useSearchFacturas({ search });
  // console.log(cambioDelDia)
  useEffect(() => {
    getFacturas();
    getFacturasConfirm()
    getFacturasNotConfirm()
    getCambios();
    //setArchived(false)
  }, [showModalConfirmaciodn]);
  useEffect(() => {
    getFacturas();
    getFacturasConfirm()
    getFacturasNotConfirm()
    getCambios();
    //setArchived(false)
  }, [abonarSend]);
  useEffect(() => {
    if (searchFacturas.length > 0) {
      setFacturas(searchFacturas);
    }
  }, [searchFacturas]);

  //modal 
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };
  const [showModalList, setShowModalList] = useState(false);
  // const toggleModalList = () => {
  //   setShowModalList(!showModalList);
  // };
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "3xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });

  useEffect(() => {
    getFacturas();
    getFacturasConfirm()
    getFacturasNotConfirm()
    getCambios();

  }, []);


  const toggleModalConfirmacion = (factura) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setfacturaIdDelete(factura?.id);
    setPacienteName(factura?.cliente?.razon_social);
  };
  const handleArchivarConfirmFacts = (facturaIdDelete) => {
    console.log(facturaIdDelete)
    setFacturasConfirmadas(facturasConfirmadas.filter((p) => p.id !== facturaIdDelete))
    setFacturasNoConfirmadas(facturasNoConfirmadas.filter((p) => p.id !== facturaIdDelete))
  }
  const handleSelectTBody = (id) => { }
  // const [showModalList, setShowModalList] = useState(false);
  const toggleModalList = () => {
    getSearchFacturas();
    setShowModalList(!showModalList);
  };


  // const [showModal, setShowModal] = useState(false);
  const toggleModal = (study) => {
    console.log(study);
    setEnablefactModalDetails(!enablefactModalDetails);
    setidSelectItem(study);
  };
  // // const [showModalList, setShowModalList] = useState(false);
  // const toggleModalList = () => {
  //   getSearchFacturas();
  //   setShowModalList(!showModalList);
  // };
  //tamaños de modal
  // const size = useBreakpointValue({ base: "sm", lg: "3xl", md: '2xl' });
  // const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  // const [Busqueda, setBusqueda] = useState("");
  const [facturaIdDelete, setfacturaIdDelete] = useState("");
  const [pacienteName, setPacienteName] = useState("");

  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = staticFacturas.filter((elemento) => {
      if (
        elemento.cliente.razon_social
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.cliente.ci_rif.toString().includes(terminoBusqueda)
      ) {
        return elemento;
      }
    });
    setSearchFacturas(resultadoBusqueda);
  };
  const handleDeleteFact = async (facturaIdDelete) => {
    try {
      await deleteOrden(facturaIdDelete);
      setSearchFacturas(searchFacturas.filter((p) => p.id !== facturaIdDelete));
      setShowModalConfirmacion(!showModalConfirmacion);
    } catch (error) {
      //toast.error(error.message, { autoClose: 1000 });
    }
  };
  const handleBusquedaChange = (event) => {
    const query = event.target.value;
    if (query.startsWith(" ")) return;
    setSearch(query);
    debouncedGetPacientsSearchResult(query)
    //filtrar(query);
  };
  const debouncedGetPacientsSearchResult = useCallback(
    debounce((search) => {
      if (search === "") {
        getFacturas();
      } else if (search.length > 0) {
        getSearchFacturas({ search });
        setFacturas(searchFacturas);
        // setSearchFacturas(result)
      }
    }, 500),
    []
  );
  return (
    <>
      <Container
      >


        <Box marginTop={"30px"} width={'100%'}
          pl={'5px'}>

          <TableOrders_Pendientes>

            <Tbody>
              {
                facturasNoConfirmadas.length === 0 ? (
                  <Tr>
                    <Td border={'none'} colSpan={5} textAlign="center">
                      <Text textAlign="center" marginTop={'48px'} style={{ fontSize: '15px' }}>
                        No se encontraron resultados
                      </Text>
                    </Td>
                  </Tr>
                ) :

                  facturasNoConfirmadas.map((study) => (
                    <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link onClick={() => toggleModal(study)}>{formatDate(study?.fecha_recepcion)}</Link>
                      </Td>
                      <Td textAlign={'center'}><Link onClick={() => toggleModal(study)}> {study.cliente?.razon_social.length > 16
                        ? study.cliente?.razon_social.substring(0, 40) + "..."
                        : study.cliente?.razon_social}</Link></Td>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link onClick={() => toggleModal(study)}>{study?.cliente?.ci_rif}</Link>
                      </Td>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link onClick={() => toggleModal(study)}>
                          {study?.total_usd} $
                        </Link>
                      </Td>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link textAlign={'center'} onClick={() => toggleModal(study)}>
                          {study.total_bs} Bs
                        </Link>
                      </Td>

                    </Tr>
                  ))}
            </Tbody>
          </TableOrders_Pendientes>

          <TableOrders_Confirmadas>
            <Tbody>
              {
                facturasConfirmadas.length === 0 ? (
                  <Tr>
                    <Td border={'none'} colSpan={5} textAlign="center">
                      <Text textAlign="center" marginTop={'48px'} style={{ fontSize: '15px' }}>
                        No se encontraron resultados
                      </Text>
                    </Td>
                  </Tr>
                ) :

                  facturasConfirmadas.map((study) => (
                    <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link onClick={() => toggleModal(study)}>{formatDate(study?.fecha_recepcion)}</Link>
                      </Td>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link onClick={() => toggleModal(study)}> {study.cliente?.razon_social.length > 16
                          ? study.cliente?.razon_social.substring(0, 40) + "..."
                          : study.cliente?.razon_social}</Link></Td>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link onClick={() => toggleModal(study)}>{study?.cliente?.ci_rif}</Link>
                      </Td>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link onClick={() => toggleModal(study)}>
                          {study?.total_usd} $
                        </Link>
                      </Td>
                      <Td textAlign={'center'} style={{ fontSize: '13.5px' }}>
                        <Link textAlign={'center'} onClick={() => toggleModal(study)}>
                          {study.total_bs} Bs
                        </Link>
                      </Td>

                    </Tr>
                  ))}
            </Tbody>
          </TableOrders_Confirmadas>

          <Box display={{ lg: 'flex', md: 'flex', sm: 'block' }} width={{ lg: '50%', md: '100%', sm: '100%' }}>
            {/* <Box display={{ lg: 'flex', md: 'flex', sm: 'block' }} gap={'20px'} justifyContent={'space-evenly'}> */}
            <ShowMoreButton handleClick={toggleModalList} />
            <Button
              borderRadius={'20px'}
              paddingX={{ lg: '30px', sm: '20px', md: '20px' }}
              marginTop={{ lg: '0', md: '0', sm: '20px' }}
              marginX={{ lg: '20px', md: '10px', sm: '0' }}
              bgColor={'#89bbcc'}
              color='#ffff'
              onClick={toggleModalReporte}>
              <Text fontSize={{ sm: '0.8rem', lg: '1rem', md: '1rem' }} >
                Generar reporte
              </Text>
            </Button>
          </Box>
        </Box>
      </Container>
      <Modal
        size={size}
        maxWidth='100%'
        isOpen={enablefactModalDetails}
        onClose={() => setEnablefactModalDetails(false)}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"} bg="#ffff">
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
              onClick={() => setEnablefactModalDetails(false)}>
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ModalFacturacion setAbonarSend={setAbonarSend} setShowModalConfirmacdion={setShowModalConfirmacdion} setShowModalG={setShowModal} handleArchivarConfirmFacts={handleArchivarConfirmFacts} setArchived={setArchived} study={idSelectItem} abonarSend={abonarSend} />
          </ModalBody>
        </ModalContent>
      </Modal>`
      <Modal
        size={"lg"}
        maxWidth='100%'
        isOpen={modalReporte}
        onClose={toggleModalReporte}>
        <ModalOverlay />
        <ModalContent marginTop={"12%"} bg="#ffff" borderRadius={"20px"}>
          <ModalHeader>
            <Button
              borderRadius={"50%"}
              colorScheme="blue"
              width="40px"
              height="40px"
              marginLeft={"93%"}
              marginTop={"-60px"}
              bgColor={"#137797"}
              color="#ffff"
              onClick={toggleModalReporte}
            >
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <Reporte />
          </ModalBody>
        </ModalContent>
      </Modal>
      <FilteredDataModal
        isOpenModal={showModalList}
        isToggleModal={toggleModalList}
        Busqueda={search}
        handleBusquedaChange={handleBusquedaChange}
        thData={thValuesFacturas}
        tBodyData={facturas}
        handleSelectTBody={handleSelectTBody}
        handleSelectIcon={toggleModalConfirmacion}
        type="facturas"
      // setAbonarSend={setAbonarSend}
      />
      <DeleteModal
        isOpen={showModalConfirmacion}
        onClose={toggleModalConfirmacion}
        id={facturaIdDelete}
        close={toggleModalConfirmacion}
        eliminar={handleDeleteFact}
        nombres={pacienteName}
      />

    </>
  );
};
export default Dashboard;