import React, { useState, useEffect, useContext } from "react";
// import { useEffect } from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Badge,
  Heading,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  CloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { BsReceipt } from "react-icons/bs";
import ModalFacturacion from "./components/ModalFacturacion";
import ListaFacturas from "./components/ListaFacturas";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import ModoLista from "./ModoLista";
import { useFacturas } from "hooks/Facturas/useFacturas";
import ShowMoreButton from "components/widgets/Buttons/ShowMoreButton";
import CardOverall_ from "components/widgets/Cards/CardOverall";
import MainContext from "context/mainContext/MainContext";
import FilteredDataModal from "components/widgets/Modals/FilteredDataModal";
import { useSearchFacturas } from "hooks/Facturas/useSearchFacturas";
import { thValuesFacturas } from "mocks";
import DeleteModal from "components/widgets/Modals/DeleteModal";
import { deleteOrden } from "api/controllers/facturas";

const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { hiddenFactssort } = useContext(MainContext);
  const colorA = "#137797";
  const [Busqueda, setBusqueda] = useState("");
  const [study, setStudy] = useState([]);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [facturaIdDelete, setfacturaIdDelete] = useState("");
  const [pacienteName, setPacienteName] = useState("");
  const [archived, setArchived] = useState(false);
  const {
    facturas,
    getFacturas,
    getCambios,
    cambioDelDia,
    facturasConfirmadas,
    facturasNoConfirmadas,
    loading,
    getFacturasConfirm,getFacturasNotConfirm
  } = useFacturas();
  const {
    getSearchFacturas,
    loadingSF,
    searchFacturas,
    staticFacturas,
    error,
    setSearchFacturas,
  } = useSearchFacturas();

  // console.log(cambioDelDia)
  useEffect(() => {
    getFacturas();
    getFacturasConfirm()
    getFacturasNotConfirm()
    getCambios();
    setArchived(false)
  }, []);

  const toggleModalConfirmacion = (factura) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setfacturaIdDelete(factura?.id);
    setPacienteName(factura?.cliente?.razon_social);
  };


  const [showModal, setShowModal] = useState(false);
 
 
  const toggleModal = (study) => {
    setShowModal(!showModal);
    setStudy(study);
  };
  useEffect(() => {
    if(archived){
      getFacturas();
      getFacturasConfirm()
      setShowModal(false)
      
    }
    
  }, [archived])
  

  const [showModalList, setShowModalList] = useState(false);
  const toggleModalList = () => {
    getSearchFacturas();
    setShowModalList(!showModalList);
  };
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "3xl", md: "2xl" }); 
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
  return modoVisualizacion === "tarjeta" ? (
    <>
      <Box
        margin={{ lg: "50px 0px 0px 20px", sm: "60px 0px 10% 0px" }}
        w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 235px)" }}
        height={'auto'}
        //pb={'50px'}
        //py={'5px'}
      // border={'1px'}
     // pb={'60px'}
        padding={{ lg: "0 50px 20px 10px", md: "20px", sm: "0px 0 10% 0" }}
        backgroundColor={"gray.100"}
        borderTopLeftRadius={"20px"}
        backgroundSize="cover"
        backgroundPosition="center"
        overflowY="hidden"
        overflowX={{ lg: "hidden", sm: "auto" }}
        // maxH={'40em'}
      >
        <Box
         // width={{ lg: "100%", sm: "95%" }}
         
        // margin={"10px 0px 0px 55px"}
          display="flex"
          justifyContent="flex-end"
          w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 250px)" }}
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

        <Box marginTop={"5px"} width={'100%'}
        pl={'5px'}
        
        >
          {hiddenFactssort ? (
            <>
              <CardOverall_
                title={"Ordenes sin confirmar"}
                content={facturasNoConfirmadas}
                toggleModal={toggleModal}
                colorA={colorA}
                loading={loading}
                type="other"
              />

              <CardOverall_
                title={"Ordenes confirmadas"}
                content={facturasConfirmadas}
                toggleModal={toggleModal}
                colorA={colorA}
                loading={loading}
                type="other"
              />
            </>
          ) : (
            <CardOverall_
              title={"Resultados"}
              content={facturas}
              toggleModal={toggleModal}
              colorA={colorA}
              loading={loading}
              type="search"
            />
          )}

          <ShowMoreButton handleClick={toggleModalList} />
        </Box>
      </Box>
      <Modal
        size={size}
        maxWidth="100%"
        isOpen={showModal}
        onClose={toggleModal}
      >
        <ModalOverlay />
        <ModalContent borderRadius={"20px"} bg="#ffff">
          <ModalHeader>
            <Button
              borderRadius={"50%"}
              colorScheme="blue"
              width="40px"
              height="40px"
              marginLeft={"95%"}
              marginTop={"-60px"}
              bgColor={"#137797"}
              color="#ffff"
              onClick={() => toggleModal(study)}
            >
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ModalFacturacion setArchived={setArchived} study={study} />
          </ModalBody>
        </ModalContent>
      </Modal>

   

      <DeleteModal
        isOpen={showModalConfirmacion}
        onClose={toggleModalConfirmacion}
        id={facturaIdDelete}
        close={toggleModalConfirmacion}
        eliminar={handleDeleteFact}
        nombres={pacienteName}
      />
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
    </>
  ) : (
    <ModoLista />
  );
};

export default Dashboard;
