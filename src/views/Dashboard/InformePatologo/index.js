import { React, useState, useContext, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  Badge,
  Heading,
  Grid,
  GridItem,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useBreakpointValue,
  Button,
  Flex,
  CloseButton
} from "@chakra-ui/react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
// import DatosMuestra from "./DatosMuestra";
import ModalInforme from "./components/ModalInforma";
import ModoLista from "./ModoLista"
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import ListaInformes from "./components/ListaInformes";
import { getListInforme } from "api/controllers/informes";
import { getStudiesList } from "api/controllers/estudios";
import { CardOverall_Muestra } from "components/widgets/Cards/CardOverall";
import CardOverall_ from "components/widgets/Cards/CardOverall";
import MainContext from "context/mainContext/MainContext";
import { useMuestrasPatologo } from "hooks/MuestrasPatologo/useMuestrasPatologo";
import ShowMoreButton from "components/widgets/Buttons/ShowMoreButton";
import Container from "components/widgets/utils/Container";
import { getInformesDetail } from "api/controllers/informes";
import { getStudiesDetail } from "api/controllers/estudios";
import { useInformesPatologo } from "hooks/InformesPatologo/useInformesPatologo";
import { CardOverall_Infor } from "components/widgets/Cards/CardOverall";
import FilteredDataModal from "components/widgets/Modals/FilteredDataModal";
import { thValuesInformes } from "mocks";
import { useInformes } from "hooks/Informes/useInformes";
//import ModalInforme from "../InformeAdministracion/components/ModalInforma";

const Dashboard = () => {
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";
 // const [informes, setInformes] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const [showModalListDetails, setShowModalListDetails] = useState(false);
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { hiddenmuestrasPatologosort} = useContext(MainContext);
  const {muestraALTA,muestraMEDIA,muestraBAJA ,getInformesPatologoAlta,getInformesPatologoMedia,getInformesPatologoBaja,loadingA,loadingM,loadingB}= useInformesPatologo()
  const [detailInforme, setInformeDetail] = useState([]);
  const [detailEstudio, setdetailEstudio] = useState([]);
  const { informes, getInformes, informesCompletados, informesNoCompletados, filteredInforme, loading, error, setInformes, getInformesNotConfirm, getInformesConfirm } = useInformes()


  const toggleModal = (informe) => {
    setShowModal(!showModal);
    setInformeDetail(informe.estudio_id)
  };

  const toggleModalList = () => {
    setShowModalList(!showModalList);
  };
  const peticionGet = async () => {
    try {
      const informesList = await getListInforme()
      setInformes(informesList);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    peticionGet();
  }, []);
  useEffect(() => {
    getInformesPatologoAlta()
    getInformesPatologoMedia()
    getInformesPatologoBaja()
  }, [])
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });

  const [Busqueda, setBusqueda] = useState("");
  const [detailInformefromShowMore, setInformeDetailfromShowMore] = useState([]);
  const [detailEstudiofromShowMore, setdetailEstudiofromShowMore] = useState([]);


  const handleSelectInforme = async (id) => {
    console.log('endpoint here');
    console.log(id);
    const res = await getInformesDetail(id)
    console.log(res);
    setInformeDetail(res)
   // setIdInforme(id)
    const resStudyDetail = await getStudiesDetail(id)
    setdetailEstudio(resStudyDetail)
  }
  console.log(muestraMEDIA);
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
    modoVisualizacion === 'tarjeta' ? (
      <>
        <Container>
            <Box  marginTop={"30px"} width={'100%'}
        pl={'5px'} >
          
            <>
              <CardOverall_Infor
                title={"Prioridad Alta"}
                content={muestraALTA}
                toggleModal={toggleModal}
                colorA={highPriorityColor}
                loading={loadingA}
                handleSelectInforme={handleSelectInforme}
                type="other"
              />

              <CardOverall_Infor
                title={"Prioridad Media"}
                content={muestraMEDIA}
                toggleModal={toggleModal}
                colorA={mediumPriorityColor}
                handleSelectInforme={handleSelectInforme}
                loading={loadingM}
                type="other"
              />
              <CardOverall_Infor
                title={"Prioridad Baja"}
                content={muestraBAJA}
                toggleModal={toggleModal}
                colorA={lowPriorityColor}
                handleSelectInforme={handleSelectInforme}
                loading={loadingB}
                type="other"
              />
            </>

            <ShowMoreButton handleClick={toggleModalList} />

          </Box>
          <Box padding={'2%'}>
            { /*  <Heading
              size="md"
            >
              Informes en proceso
            </Heading>
            <Box
              width={'100%'}
              m={"20px 30px 30px 10px"}
              backgroundColor={"#FFFF"}
              boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
              borderRadius="20px"
              overflowY="scroll"
              overflowX="hidden"
              maxH={'34em'}
              minH={"300px"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "8px",
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
              }}
              //maxH={'33.5em'}
            >
              <SimpleGrid columns={1} spacing={4}>
                <SimpleGrid columns={1}>
                  <Box padding={'25px'}>
                    <Heading
                      borderBottom="solid"
                      borderColor={highPriorityColor}
                      size="md"
                      mb={4}
                    >
                      Prioridad Alta
                    </Heading>
                    <Grid gap={"20px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                      {/*renderStudies(highPriorityStudies, highPriorityColor)
                    </Grid>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={1}>
                  <Box padding={'25px'}>
                    <Heading
                      borderBottom="solid"
                      borderColor={mediumPriorityColor}
                      size="md"
                      mb={4}
                    >
                      Prioridad Media
                    </Heading>
                    <Grid gap={"20px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                      {/*renderStudies(mediumPriorityStudies, mediumPriorityColor)
                    </Grid>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={1}>
                  <Box padding={'25px'}>
                    <Heading
                      borderBottom="solid"
                      borderColor={lowPriorityColor}
                      size="md"
                      mb={4}
                    >
                      Prioridad Baja
                    </Heading>
                    <Grid gap={"20px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                      {/*renderStudies(lowPriorityStudies, lowPriorityColor)
                    </Grid>
                  </Box>
                </SimpleGrid>
              </SimpleGrid>
            </Box>
            <Button
              borderRadius={'20px'}
              padding={'10px 30px'}
              bgColor={'#137797'}
              color='#ffff'
              onClick={toggleModalList}
            >
              Ver más</Button>*/}
          </Box>
        </Container>
       
         <Modal
          size={"4xl"}
          maxWidth='100%'
          isOpen={showModal}
          onClose={toggleModal}
          >
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
              <ModalInforme id={detailInforme} informeDetail={detailInforme}
              detailEstudio={detailEstudio}
              setInformeDetail={setInformeDetail}
              setShowModalGeneral={setShowModal} />
            </ModalBody>
          </ModalContent>
        </Modal>


        
      {/* <Modal showModalListDetails
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
              <ListaInformes />
            </ModalBody>
          </ModalContent>
        </Modal>*/}

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
        />
         <Modal
          size={"3xl"}
          maxWidth='100%'
          isOpen={showModalListDetails}
          onClose={()=>setShowModalListDetails(false)}
          >
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
                onClick={()=>setShowModalListDetails(false)}>
                <CloseButton />
              </Button>
            </ModalHeader>
            <ModalBody>
              <ModalInforme id={detailInforme} informeDetail={detailInformefromShowMore}
              detailEstudio={detailEstudiofromShowMore}
              setInformeDetail={setInformeDetail}
              setShowModalGeneral={setShowModal} />
            </ModalBody>
          </ModalContent>
        </Modal>

      </>
    ) : (
      <ModoLista />
    )
  );
};

export default Dashboard;
