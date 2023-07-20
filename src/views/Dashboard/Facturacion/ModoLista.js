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


const Dashboard = () => {
  const [cambioDelDia, setCambioDelDia] = useState('');
  const [facturas, setFacturas] = useState([]);
  const [study, setStudy] = useState([]);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const {
    getSearchFacturas,
    loadingSF,
    searchFacturas,
    staticFacturas,
    error,
    setSearchFacturas,
  } = useSearchFacturas();


  const cambioDia = async () => {
    try {
      const cambio = await getCambio()
      setCambioDelDia(cambio)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    cambioDia();
  }, []);
  const peticionGet = async () => {
    try {
      const facturasList = await getFacturasList()
      setFacturas(facturasList)
    } catch (error) {
      console.log(error);
    }
  };
  console.log(facturas);
  useEffect(() => {
    peticionGet();
  }, []);

  const toggleModalConfirmacion = (factura) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setfacturaIdDelete(factura?.id);
    setPacienteName(factura?.cliente?.razon_social);
  };

 
  const facturasClasificadas = facturas.reduce((clasificacion, factura) => {
    if (factura.confirmada) {
      clasificacion.confirmadas.push(factura);
    } else if (factura.pagada) {
      clasificacion.pagadas.push(factura);
    } else {
      clasificacion.pendientes.push(factura);
    }
    return clasificacion;
  }, { confirmadas: [], pagadas: [], pendientes: [] });
  

  const sinConfirmar = facturasClasificadas.pendientes.map((listaFacturas) => {
    const fechaHora = listaFacturas.fecha_recepcion;
    const fecha = fechaHora ? fechaHora.split("T")[0] : "";
    return {
      id: listaFacturas.id,
      nestudio: listaFacturas.cliente,
      fecha: fecha,
      paciente: listaFacturas.cliente.razon_social,
      ci: listaFacturas.cliente.ci_rif,
      montoBs: listaFacturas.total_bs,
      montoUsd:listaFacturas.total_usd
    }
  });

  const pendientes = facturasClasificadas.confirmadas.map((listaFacturas) => {
    const fechaHora = listaFacturas.fecha_recepcion;
    const fecha = fechaHora ? fechaHora.split("T")[0] : "";
    return {
      id: listaFacturas.id,
      nestudio: listaFacturas.cliente,
      fecha: fecha,
      paciente: listaFacturas.cliente.razon_social,
      ci: listaFacturas.cliente.ci_rif,
      montoBs: listaFacturas.total_bs,
      montoUsd:listaFacturas.total_usd
    }
  });
  const [showModal, setShowModal] = useState(false);
  const toggleModal = (study) => {
    setShowModal(!showModal);
    setStudy(study);
  };
  const [showModalList, setShowModalList] = useState(false);
  const toggleModalList = () => {
    getSearchFacturas();
    setShowModalList(!showModalList);
  };
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "3xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const [Busqueda, setBusqueda] = useState("");
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

  return (
    <>
      <Box margin={{ lg: '50px 0px 0px 30px', sm: '60px 0px 10% 0px' }}
          padding={{ lg: '0 25px', md: '10px', sm: '0px 0 10% 0' }}
          backgroundColor={'gray.100'}
          borderTopLeftRadius={'20px'}
          backgroundSize="cover"
          backgroundPosition="center"
          overflowY="hidden"
          overflowX={{lg:"hidden",sm:"auto"}}
      >
        <Box
          width={'100%'}
          margin={'10px 0px 0px 25px'}
          display="flex" justifyContent="flex-end"
        >
          <Box width={"auto"} marginBottom={'-20px'} >
            <Text
              borderTopLeftRadius={"20px"}
              borderBottomLeftRadius={"20px"}
              textAlign={"center"}
              padding="10px"
              backgroundColor="#137797"
              color="#FFF"
              fontSize={"14px"}
            >
              Dolar BCV: {cambioDelDia}
            </Text>
          </Box>
        </Box>
        <Box marginTop={'-15px'} padding={'2%'}>
         {/* <Heading
            size="md"
          >
            Ordenes sin confirmar
          </Heading>
          <Box
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            backgroundColor={"#FFFF"} 
            borderRadius="20px"
            mt={'25px'}
            mb={'20px'}
            p={'6px'}
            width={"100%"}
            height={'auto'}
           
           // m={"20px 30px 30px 20px"}
           // backgroundColor={"#FFFF"}
           // boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            //py={'25px'}
            px={'10px'}
          py={"25px"}
           
          
            >
            <Box 
            overflow={'auto'}
            minH={"280px"}
           maxH={"280px"}
           sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
              height:"6px",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}>
              <Table >
                <Thead style={{width:'100%'}}>
                 <TH thData={thValuesFacturasSimples} />
                </Thead>
                <Tbody>
                  {sinConfirmar.map((study) => (
                    <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                      <Td style={{width:'20%'}}>
                        <Link  style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}> {study.fecha}</Link>
                      </Td>
                      <Td><Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.paciente}</Link></Td>
                      <Td>
                        <Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.ci}</Link>
                      </Td>
                      <Td>
                        <Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.montoUsd} $ </Link>
                      </Td>
                      <Td><Link onClick={() => toggleModal(study)}>{study.montoBs} Bs </Link></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>*/}
         <TableOrders_Pendientes> 

         <Tbody>
                  {sinConfirmar.map((study) => (
                    <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                      <Td style={{width:'20%'}}>
                        <Link  style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}> {study.fecha}</Link>
                      </Td>
                      <Td><Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.paciente}</Link></Td>
                      <Td>
                        <Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.ci}</Link>
                      </Td>
                      <Td>
                        <Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.montoUsd} $ </Link>
                      </Td>
                      <Td><Link onClick={() => toggleModal(study)}>{study.montoBs} Bs </Link></Td>
                    </Tr>
                  ))}
                </Tbody>
         </TableOrders_Pendientes>

         <TableOrders_Confirmadas> 

         <Tbody>
                  {pendientes.map((study) => (
                    <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                      <Td style={{width:'20%'}}>
                        <Link  style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}> {study.fecha}</Link>
                      </Td>
                      <Td><Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.paciente}</Link></Td>
                      <Td>
                        <Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.ci}</Link>
                      </Td>
                      <Td>
                        <Link style={{fontSize:'13.5px'}} onClick={() => toggleModal(study)}>{study.montoUsd} $ </Link>
                      </Td>
                      <Td><Link onClick={() => toggleModal(study)}>{study.montoBs} Bs </Link></Td>
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
     {/* <Modal
        size={sizeView}
        maxWidth='100%'
        isOpen={showModalList}
        onClose={toggleModalList}>
        <ModalOverlay />
        <ModalContent minH={'500px'} borderRadius={'20px'} bg="#ffff">
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
              onClick={toggleModalList}>
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody marginTop={'-5%'}>
            <ListaFacturas />
          </ModalBody>
        </ModalContent>
      </Modal>*/}
    </>
  );
};
export default Dashboard;