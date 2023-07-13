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
  const {
    facturas,
    getFacturas,
    getCambios,
    cambioDelDia,
    facturasConfirmadas,
    facturasNoConfirmadas,
    loading,
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
    getCambios();
  }, []);

  const toggleModalConfirmacion = (factura) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setfacturaIdDelete(factura?.id);
    setPacienteName(factura?.cliente?.razon_social);
  };

  /*const facturasClasificadas = facturas?.reduce((clasificacion, factura) => {
    if (factura.confirmada) {
      clasificacion.confirmadas.push(factura);
    } else if (factura.pagada) {
      clasificacion.pagadas.push(factura);
    } else {
      clasificacion.pendientes.push(factura);
    }
    return clasificacion;
  }, { confirmadas: [], pagadas: [], pendientes: [] })*/

  /* const sinProcesarStudies = facturasClasificadas.pendientes.map((listaFacturas, i) => {
    const fechaHora = listaFacturas?.fecha_recepcion;
    const fecha = fechaHora ? fechaHora.split("T")[0] : "";
    return {
      id: listaFacturas.id,
      nestudio: listaFacturas.cliente,
      fecha: fecha,
      paciente: listaFacturas.cliente.razon_social,
      ci: listaFacturas.cliente.ci_rif,
      monto: listaFacturas.total_usd
    };
  });*/

  /* const pendientesStudies = facturasClasificadas.confirmadas.map((listaFacturas) => {
    const fechaHora = listaFacturas?.fecha_recepcion;
    const fecha = fechaHora ? fechaHora.split("T")[0] : "";
    return {
      id: listaFacturas.id,
      nestudio: listaFacturas.cliente,
      fecha: fecha,
      paciente: listaFacturas.cliente.razon_social,
      ci: listaFacturas.cliente.ci_rif,
      monto: listaFacturas.total_usd
    }
  });*/

  //modal
  // console.log(facturas.reduce);
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
  const size = useBreakpointValue({ base: "sm", lg: "3xl", md: "2xl" });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: "2xl" });

  const renderStudies = (studies) => {
    return studies.map((study) => (
      <Link
        onClick={() => {
          toggleModal(study);
        }}
      >
        <Box
          margin={"5px auto 5px auto"}
          boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
          borderRadius={"16px"}
          key={study.id}
          padding={"0"}
        >
          <Box
            borderTopLeftRadius={"16px"}
            borderTopRightRadius={"16px"}
            backgroundColor={colorA}
            padding={"10px"}
            paddingBottom={"0px"}
            minH={"15px"}
          >
            <Badge
              textAlign={"center"}
              background={"none"}
              padding={"5px 20px 0px 20px"}
              w={"180px"}
              height={"35px"}
            >
              <Icon
                border={"solid"}
                borderColor={colorA}
                marginTop={"-15%"}
                marginLeft={"86%"}
                height={"50px"}
                width={"50px"}
                padding={"5px"}
                borderRadius={"50%"}
                as={BsReceipt}
                backgroundColor={"#FFFF"}
                color={colorA}
              />
            </Badge>
          </Box>
          <Box p={"10px"}>
            <Heading fontSize={"16px"}>Fecha</Heading>
            <Text
              textAlign={"right"}
              ml={2}
              fontSize={"16px"}
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {study.fecha}
            </Text>
            <Heading fontSize={"16px"}>Paciente</Heading>
            <Text
              fontSize={"16px"}
              textAlign={"right"}
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {study.paciente}
            </Text>
            <Heading fontSize={"16px"}>RIF/CI</Heading>
            <Text fontSize={"16px"} textAlign={"right"}>
              {study.ci}
            </Text>
            <Heading fontSize={"16px"}>Monto Total</Heading>
            <Text fontSize={"16px"} textAlign={"right"}>
              {study.monto} ($)
            </Text>
          </Box>
        </Box>
      </Link>
    ));
  };
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
        margin={{ lg: "50px 0px 0px 30px", sm: "60px 0px 10% 0px" }}
        padding={{ lg: "0 25px", md: "10px", sm: "0px 0 10% 0" }}
        backgroundColor={"gray.100"}
        borderTopLeftRadius={"20px"}
        backgroundSize="cover"
        backgroundPosition="center"
        overflowY="hidden"
        overflowX={{ lg: "hidden", sm: "auto" }}
        // maxH={'40em'}
      >
        <Box
          width={{ lg: "100%", sm: "95%" }}
          margin={"10px 0px 0px 25px"}
          display="flex"
          justifyContent="flex-end"
        >
          <Box width={"15%"}>
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

        <Box marginTop={"-15px"} padding={"2%"}>
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
            <ModalFacturacion study={study} />
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
