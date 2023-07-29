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
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import { useInformes } from "hooks/Informes/useInformes";
const Dashboard = () => {
  // const [cambioDelDia, setCambioDelDia] = useState('');
  //const [facturas, setFacturas] = useState([]);
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { hiddenInformessort, sethiddenInformessort } = useContext(MainContext);
  const { informes, getInformes, informesCompletados, informesNoCompletados, filteredInforme, loading, error, setInformes } = useInformes()

  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

  const [Busqueda, setBusqueda] = useState("");
  const [idInforme, setIdInforme] = useState("");
  const [detailInforme, setInformeDetail] = useState([]);
  const [detailEstudio, setdetailEstudio] = useState([]);

  const colorA = '#137797';


  //modal 
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



  // const [showModal, setShowModal] = useState(false);
  // const toggleModal = (study) => {
  //   setShowModal(!showModal);
  //   setStudy(study);
  // };
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

  const handleBusquedaChange = (event) => {
    const query = event.target.value;
    if (query.startsWith(" ")) return;
    setBusqueda(query);
    filtrar(query);
  };
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
  console.log(facturasNoConfirmadas)
  return (
    <>
      <Box
        margin={{
          lg: "50px 0px 0px 30px",
          md: "60px 0px 0px 0px",
          sm: "30px 0px 10% 0px",
        }}
        padding={{ lg: "0 25px 50px 25px", md: "10px", sm: "0px 0 10% 0" }}
        backgroundColor={{ lg: "gray.100", md: "gray.100", sm: "none" }}
        borderRadius={"20px"}
        backgroundSize="cover"
        backgroundPosition="center"
        overflowX="hidden"
        overflowY={"hidden"}
      >

        {/* <CardCambio cambioDelDia={cambioDelDia} /> */}
        <Box marginTop={'-15px'} padding={'2%'}>

          <TableOrders_Pendientes>

            <Tbody>
              {facturasNoConfirmadas.map((study) => (
                <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                  <Td textAlign={'center'} style={{ width: '15%' }}>
                    <Link onClick={() => toggleModal(study)}>{formatDate(study?.fecha_recepcion)}</Link>
                  </Td>
                  <Td textAlign={'center'}><Link onClick={() => toggleModal(study)}> {study.cliente?.razon_social.length > 16
                    ? study.cliente?.razon_social.substring(0, 40) + "..."
                    : study.cliente?.razon_social}</Link></Td>
                  <Td textAlign={'center'}>
                    <Link style={{ width: '15%' }} onClick={() => toggleModal(study)}>{study?.cliente?.ci_rif}</Link>
                  </Td>
                  <Td textAlign={'center'} style={{ width: '15%' }}>
                    <Link onClick={() => toggleModal(study)}>
                      {study?.total_usd} $
                    </Link>
                  </Td>
                  <Td textAlign={'center'} style={{ width: '15%' }}>
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
              {facturasConfirmadas.map((study) => (
                <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                  <Td textAlign={'center'} style={{ width: '15%' }}>
                    <Link onClick={() => toggleModal(study)}>{formatDate(study?.fecha_recepcion)}</Link>
                  </Td>
                  <Td textAlign={'center'}><Link onClick={() => toggleModal(study)}> {study.cliente?.razon_social.length > 16
                    ? study.cliente?.razon_social.substring(0, 40) + "..."
                    : study.cliente?.razon_social}</Link></Td>
                  <Td textAlign={'center'}>
                    <Link style={{ width: '15%' }} onClick={() => toggleModal(study)}>{study?.cliente?.ci_rif}</Link>
                  </Td>
                  <Td textAlign={'center'} style={{ width: '15%' }}>
                    <Link onClick={() => toggleModal(study)}>
                      {study?.total_usd} $
                    </Link>
                  </Td>
                  <Td textAlign={'center'} style={{ width: '15%' }}>
                    <Link textAlign={'center'} onClick={() => toggleModal(study)}>
                      {study.total_bs} Bs
                    </Link>
                  </Td>

                </Tr>
              ))}
            </Tbody>
          </TableOrders_Confirmadas>

          <ShowMoreButton handleClick={toggleModalList} />
        </Box>
      </Box>
      <Modal
        size={size}
        maxWidth='100%'
        isOpen={showModal}
        onClose={toggleModal}>
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
              onClick={toggleModal}>
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ModalFacturacion study={study} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <FilteredDataModal
        isOpenModal={showModalList}
        isToggleModal={toggleModalList}
        Busqueda={Busqueda}
        handleBusquedaChange={handleBusquedaChange}
        thData={thValuesFacturas}
        tBodyData={searchFacturas}
        handleSelectIcon={toggleModalConfirmacion}
        type="facturas"
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