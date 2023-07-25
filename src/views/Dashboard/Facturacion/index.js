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
import CardCambio from "components/widgets/Cards/CardCambio";
import { getFacturasListNoConfirm } from "api/controllers/facturas";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { hiddenFactssort, archived, setArchived,
    idSelectItem, setidSelectItem,
    enablefactModalDetails, setEnablefactModalDetails,ordenId
  } = useContext(MainContext);
  const history = useHistory();
  const colorA = "#137797";
  const [Busqueda, setBusqueda] = useState("");
  const [study, setStudy] = useState([]);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [showModalConfirmaciodn, setShowModalConfirmacdion] = useState(false);
  const [abonarSend, setAbonarSend] = useState(false);
  const [facturaIdDelete, setfacturaIdDelete] = useState("");
  const [pacienteName, setPacienteName] = useState("");
<<<<<<< HEAD
  // const [archived, setArchived] = useState(false);
=======
  const [newIdOrder, setNewIdOrder] = useState([]);
 // const [archived, setArchived] = useState(false);
>>>>>>> d09b60e0b4cf7d8f7637a79ef7ec4650264881ec
  const {
    facturas,
    getFacturas,
    getCambios,
    cambioDelDia,
    facturasConfirmadas,
    facturasNoConfirmadas,
    loading,
<<<<<<< HEAD
    getFacturasConfirm, getFacturasNotConfirm,
    setFacturasNoConfirmadas
=======
    getFacturasConfirm,getFacturasNotConfirm,
    setFacturasNoConfirmadas,
    facturasNoConfirmadasFirstId,

>>>>>>> d09b60e0b4cf7d8f7637a79ef7ec4650264881ec
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
<<<<<<< HEAD
  const toggleModal = (study) => {
=======
  const [showModalFromRe, setShowModalFromRe] = useState(false);
 const toggleModal = (study) => {
>>>>>>> d09b60e0b4cf7d8f7637a79ef7ec4650264881ec
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
  const handleArchivarConfirmFacts = (facturaIdDelete) => {
    console.log(facturaIdDelete)
    //setFacturasConfirmadas(facturasConfirmadas.filter((p) => p.id !== facturaIdDelete))
    setFacturasNoConfirmadas(facturasNoConfirmadas.filter((p) => p.id !== facturaIdDelete))
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);   
    const param1Value = urlParams.get("param1");  
    if(param1Value=== 'ordenId'){
      const sendIds=async()=>{
       const res= await  getFacturasListNoConfirm();
       if(res){
       setNewIdOrder(res[0]);
       setShowModalFromRe(true)
       }
      }    
      sendIds()   
    }
    

  }, []);

  const handleCloseFromR=()=>{
    history.push('/admin/Facturacion');
    setShowModalFromRe(false)
    //window.location.reload();
  }
 
  return modoVisualizacion === "tarjeta" ? (
    <>
      <Box
        margin={{
          lg: "50px 0px 0px 30px",
          md: "60px 0px 0px 0px",
          sm: "30px 0px 10% 0px",
        }}
        w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 235px)" }}
        height={'auto'}
        padding={{ lg: "0 25px 50px 25px", md: "10px", sm: "0px 0 10% 0"  }}
        backgroundColor={"gray.100"}
        borderRadius={"20px"}
        backgroundSize="cover"
        backgroundPosition="center"
        overflowY="hidden"
        overflowX={{ lg: "hidden", sm: "auto" }}
      // maxH={'40em'}
      >
        {/* <CardCambio cambioDelDia={cambioDelDia} /> */}

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

          <ShowMoreButton setAbonarSend={setAbonarSend} handleClick={toggleModalList} />
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
            <ModalFacturacion setAbonarSend={setAbonarSend} setShowModalConfirmacdion={setShowModalConfirmacdion} setShowModalG={setShowModal} handleArchivarConfirmFacts={handleArchivarConfirmFacts} setArchived={setArchived} study={ study } abonarSend={abonarSend} />
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
            <ModalFacturacion setAbonarSend={setAbonarSend} setShowModalConfirmacdion={setShowModalConfirmacdion} setShowModalG={setShowModalFromRe} handleArchivarConfirmFacts={handleArchivarConfirmFacts} setArchived={setArchived} study={ newIdOrder } abonarSend={abonarSend} />
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
            <ModalFacturacion abonarSend={abonarSend} setShowModalG={setShowModal} handleArchivarConfirmFacts={handleArchivarConfirmFacts} setArchived={setArchived} study={idSelectItem } />
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
        handleSelectTBody={handleSelectTBody}
        handleSelectIcon={toggleModalConfirmacion}
        type="facturas"
      />
    </>
  ) : (
    <ModoLista />
  );
};

export default Dashboard;
