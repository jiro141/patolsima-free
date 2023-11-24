import React, { useState, useEffect, useContext, useCallback } from "react";
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
import ModalFacturacion from "./components/ModalFacturacion";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import ModoLista from "./ModoLista";
import { useFacturas } from "hooks/Facturas/useFacturas";
import ShowMoreButton from "components/widgets/Buttons/ShowMoreButton";
import CardOverall_ from "components/widgets/Cards/CardOverall";
import MainContext from "context/mainContext/MainContext";
import FilteredDataModal from "components/widgets/Modals/FilteredDataModal";
import { thValuesFacturas } from "mocks";
import DeleteModal from "components/widgets/Modals/DeleteModal";
import { deleteOrden } from "api/controllers/facturas";
import { getFacturasListNoConfirm } from "api/controllers/facturas";
import { useHistory } from "react-router-dom";
import Container from "components/widgets/utils/Container";
import debounce from "just-debounce-it";
import { useSearchFacturas } from "hooks/Facturas/useSearchFacturas";
import Reporte from "./components/Reporte"


const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { hiddenFactssort, archived, setArchived,
    idSelectItem, setidSelectItem,
    enablefactModalDetails, setEnablefactModalDetails, ordenId, facturas, setFacturas
  } = useContext(MainContext);
  const history = useHistory();
  const colorA = "#137797";
  const [search, setSearch] = useState("");
  const [study, setStudy] = useState([]);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [showModalConfirmaciodn, setShowModalConfirmacdion] = useState(false);
  const [abonarSend, setAbonarSend] = useState(false);
  const [facturaIdDelete, setfacturaIdDelete] = useState("");
  const [modalReporte, setModalReporte] = useState(false);
  const [pacienteName, setPacienteName] = useState("");
  // const [archived, setArchived] = useState(false);
  const toggleModalReporte = () => {
    setModalReporte(!modalReporte);
    console.log('funciona');
  }
  const {
    // facturas,
    getFacturas,
    getCambios,
    cambioDelDia,
    facturasConfirmadas,
    facturasNoConfirmadas,
    loading,
    getFacturasConfirm, getFacturasNotConfirm,
    setFacturasNoConfirmadas,
    setFacturasConfirmadas,
    // setFacturas
  } = useFacturas();
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


  const toggleModalConfirmacion = (factura) => {
    setShowModalConfirmacion(!showModalConfirmacion);
    setfacturaIdDelete(factura?.id);
    setPacienteName(factura?.cliente?.razon_social);
  };
  const [showModal, setShowModal] = useState(false);
  const [showModalFromRe, setShowModalFromRe] = useState(false);
  const [newIdOrder, setNewIdOrder] = useState([]);
  //setNewIdOrder

  const toggleModal = (study) => {
    setShowModal(!showModal);
    setStudy(study);
  };
  useEffect(() => {
    if (archived) {
      setShowModal(false)
    }

  }, [archived])
  const handleSelectTBody = (id) => { }
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
    setSearch(query);
    debouncedGetPacientsSearchResult(query)
    //filtrar(query);
  };
  //   useEffect(() => {

  //     setSearch("");
  //     setSearchFacturas([]);
  //     return () => {
  //       setFacturas([]);
  //     }
  // }, []);
  useEffect(() => {
    if (searchFacturas.length > 0) {
      setFacturas(searchFacturas);
    }
  }, [searchFacturas]);

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
  const handleArchivarConfirmFacts = (facturaIdDelete) => {
    console.log(facturaIdDelete)
    setFacturasConfirmadas(facturasConfirmadas.filter((p) => p.id !== facturaIdDelete))
    setFacturasNoConfirmadas(facturasNoConfirmadas.filter((p) => p.id !== facturaIdDelete))
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const param1Value = urlParams.get("param1");
    if (param1Value === 'ordenId') {
      const sendIds = async () => {
        const res = await getFacturasListNoConfirm();
        if (res) {
          setNewIdOrder(res[0]);
          setShowModalFromRe(true)
        }
      }
      sendIds()
    }


  }, []);

  const handleCloseFromR = () => {
    history.push('/admin/Facturacion');

    setShowModalFromRe(false)
    //window.location.reload();
  }



  return modoVisualizacion === "tarjeta" ? (
    <>
      <Container>
        {/* <CardCambio cambioDelDia={cambioDelDia} /> */}

        <Box marginTop={"30px"} width={'100%'}
          pl={'5px'}

        >
          {hiddenFactssort ? (
            <>
              <CardOverall_
                title={"Ordenes Sin Confirmar"}
                content={facturasNoConfirmadas}
                toggleModal={toggleModal}
                colorA={colorA}
                loading={loading}
                type="other"
              />

              <CardOverall_
                title={"Ordenes Confirmadas"}
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

          <Box width={{ lg: '50%', md: '100%', sm: '100%' }}>
            <Box display={{ lg: 'flex', md: 'flex', sm: 'block' }} gap={'20px'} justifyContent={'space-evenly'}>
              <ShowMoreButton handleClick={toggleModalList} />
              <Button
                borderRadius={'20px'}
                paddingX={{ lg: '30px', sm: '20px', md: '20px' }}
                // marginTop='20px'
                bgColor={'#89bbcc'}
                color='#ffff'
                onClick={toggleModalReporte}>
                <Text fontSize={{ sm: '0.8rem', lg: '1rem', md: '1rem' }} >
                  Generar reporte
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>

      </Container>
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
            <ModalFacturacion setAbonarSend={setAbonarSend} setShowModalConfirmacdion={setShowModalConfirmacdion} setShowModalG={setShowModal} handleArchivarConfirmFacts={handleArchivarConfirmFacts} setArchived={setArchived} study={study} abonarSend={abonarSend} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        size={size}
        maxWidth="100%"
        isOpen={showModalFromRe}
        onClose={() => setShowModalFromRe(false)}
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
              onClick={handleCloseFromR}
            >
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ModalFacturacion setAbonarSend={setAbonarSend} setShowModalConfirmacdion={setShowModalConfirmacdion} setShowModalG={setShowModalFromRe} handleArchivarConfirmFacts={handleArchivarConfirmFacts} setArchived={setArchived} study={newIdOrder} abonarSend={abonarSend} />
          </ModalBody>
        </ModalContent>
      </Modal>
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

      <Modal
        size={size}
        maxWidth="100%"
        isOpen={enablefactModalDetails}
        onClose={() => setEnablefactModalDetails(false)}
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
              onClick={() => setEnablefactModalDetails(false)}
            >
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ModalFacturacion
              setEnablefactModalDetails={setEnablefactModalDetails}
              setAbonarSend={setAbonarSend}
              abonarSend={abonarSend}
              setShowModalG={setShowModal}
              handleArchivarConfirmFacts={handleArchivarConfirmFacts}
              setArchived={setArchived} study={idSelectItem} />
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
        Busqueda={search}
        handleBusquedaChange={handleBusquedaChange}
        thData={thValuesFacturas}
        tBodyData={facturas}
        handleSelectTBody={handleSelectTBody}
        handleSelectIcon={toggleModalConfirmacion}
        type="facturas"
      // setAbonarSend={setAbonarSend}
      />
    </>
  ) : (
    <ModoLista />
  );
};

export default Dashboard;
