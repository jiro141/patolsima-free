import {
  Badge,
  Box,
  CircularProgress,
  Grid,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
  border,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDate } from "helpers";
import React, { useEffect, useRef, useState } from "react";
import { BsFillFileEarmarkRichtextFill, BsReceipt } from "react-icons/bs";
import "../../../css/style.css";
import NotFound from "../others/NotFound";
import RowCard from "./RowCard";
import { FaFlask } from "react-icons/fa";
import { Separator } from "components/Separator/Separator";
import { Title } from "../Texts";
//here

const renderStudies = (content, toggleModal, colorA, type) => {
  return content.map((study) => (
    <Link
      onClick={() => {
        toggleModal(study);
      }}
    >
       <Box
       width={'185px'}
        height={"200px"}
      
        margin={"20px 0px 20px 13px"}
        boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
        borderRadius={"16px"}
        key={study.id}
        
       
      >
        <Box
          borderTopLeftRadius={"16px"}
          borderTopRightRadius={"16px"}
          backgroundColor={colorA}
          py={'1px'}
          px={'10px'}
          minH={"5px"}
        >
          <RowCard
            type={"headPrincipal"}
            data={ '   ' + formatDate(study.fecha_recepcion)}
            headTitle={formatDate(study.fecha_recepcion)}
            icon={<BsReceipt size={"25px"} color={colorA} />}
            color={useColorModeValue("gray.600", "gray.400")}
          />
        </Box>
        <Box p={"10px"}>
       {/* <RowCard
            headTitle={"Fecha"}
            data={formatDate(study.fecha_recepcion)}
            color={useColorModeValue("gray.600", "gray.400")}
          />*/}

          <RowCard
            headTitle={"Paciente"}
            data={
              study.cliente.razon_social.length > 10
                ? study.cliente.razon_social.substring(0, 10) + "..."
                : study.cliente.razon_social
            }
            color={useColorModeValue("gray.600", "gray.400")}
          />
         <RowCard
            headTitle={"RIF/CI"}
            data={study.cliente.ci_rif}
            color={useColorModeValue("gray.600", "gray.400")}
          />

          <RowCard
            headTitle={"Monto Total"}
            data={study.total_usd + "$"}
            color={useColorModeValue("gray.600", "gray.400")}
          />
        </Box>
      </Box> 
    </Link>
  ));
 
};

const renderInformes = (content, toggleModal, colorA,type,handleSelectInforme) => {
 
    return content.map((study) => (
      <Link
        onClick={() => {
          toggleModal(study);
          handleSelectInforme(study.estudio_id)
        }}
      >
        <Box
       width={'185px'}
       height={"200px"}
     
       margin={"20px 0px 20px 13px"}
       boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
       borderRadius={"16px"}
       key={study.id}
        >
          <Box
            borderTopLeftRadius={"16px"}
            borderTopRightRadius={"16px"}
            backgroundColor={colorA}
            py={'1px'}
            px={'10px'}
            minH={"15px"}
            marginV={"5px"}
          >
            <RowCard
              type="headPrincipal"
              headTitle={' ' + study.estudio_codigo}
              icon={
                <BsFillFileEarmarkRichtextFill size={"25px"} color={colorA} />
              }
              color={useColorModeValue("gray.600", "gray.400")}
            />
          </Box>
          <Box className="WrapAlignRow" p={"10px"} width={"100%"}>
            <RowCard
               headTitle={"Paciente"}
               data={
                 study.estudio_patologo_name.length > 10
                   ? study.estudio_patologo_name.substring(0, 10) + "..."
                   : study.estudio_patologo_name
               }
              color={useColorModeValue("gray.600", "gray.400")}
            />
  
            <RowCard
              headTitle={"RIF/CI"}
              data={study.estudio_paciente_ci}
              color={useColorModeValue("gray.600", "gray.400")}
            />
  
           <RowCard
              headTitle={"Fecha"}
              data={formatDate(study.created_at)}
              color={useColorModeValue("gray.600", "gray.400")}
            />
            
  
           {/*study.estudio_prioridad  && 
           <RowCard
              headTitle={"Prioridad"}
              data={
                <Badge>
            { study.estudio_prioridad}
                </Badge>
               
              }
              color={useColorModeValue("gray.600", "gray.400")}
            />*/}
          </Box>
        </Box>
      </Link>
    ));
  
  
};
const renderMuestras = (content, toggleModal, colorA,type) => {
  return content.map((study) => (
    <Link
      onClick={() => {
        toggleModal(study);
      }}
    >
      <Box
      width={'185px'}
      height={"200px"}
    
      margin={"20px 0px 20px 13px"}
      boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
      borderRadius={"16px"}
      >
        <Box
          borderTopLeftRadius={"16px"}
          borderTopRightRadius={"16px"}
          backgroundColor={colorA}
          py={'1px'}
          px={'6px'}
          minH={"15px"}
          marginV={"5px"}
          display={'flex'}
          flex={'wrap'}
          overflow={'hidden'}
        >
          <RowCard
            type="headPrincipal"
            headTitle={study.codigo}
            icon={
              <FaFlask size={"25px"} color={colorA} />
            }
            color={useColorModeValue("gray.600", "gray.400")}
          />
        </Box>
        <Box className="WrapAlignRow" p={"10px"} width={"100%"}>
          <RowCard
             headTitle={"Tipo"}
             data={
              study.tipo.length > 10
                ? study.tipo.substring(0, 10) + "..."
                : study.tipo
            }
            color={useColorModeValue("gray.600", "gray.400")}
          />

         

         <RowCard
            headTitle={"Fecha"}
            data={formatDate(study.created_at)}
            color={useColorModeValue("gray.600", "gray.400")}
          />
           <RowCard
            headTitle={"Confirmado"}
            data={study.confirmado ? <Badge colorScheme='green'>
              Confirmado
            </Badge> : <Badge colorScheme='yellow'>
              Pendiente
            </Badge> }
            color={useColorModeValue("gray.600", "gray.400")}
          />

        
        </Box>
      </Box>
    </Link>
  ));
 


};

export default function CardOverall_({
  title,
  content,
  type,
  toggleModal,
  loading,
  colorA,
}) {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const scrollSpeed = 2; 

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.scrollBehavior = "unset";
  };

  const handleMouseMove = (e) => {
    if (isMouseDown && containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * scrollSpeed;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    containerRef.current.style.scrollBehavior = "smooth";
  };
  return (
    <div style={{}}>
     <Title title={content.length === 0 ? " " : title} />
      <Box 
      boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
      backgroundColor={"#FFFF"} 
      borderRadius="20px"
      mt={'25px'}
      mb={'20px'}
      p={'6px'}
      
      >

      <Box
           ref={containerRef}
           width={"100%"}
           height={'auto'}
          px={'15px'}
          py={"25px"}
           borderRadius="20px"
           minH={"280px"}
           maxH={"280px"}
           overflowY="auto"
           overflowX="auto"
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
          // border="1px solid #ccc"
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
          }}
       // background={'red'}
           
      >
        <Box 
        
       
        >
          {loading ? (
            <div className="centerLoader">
              <CircularProgress value={80} size="80px" color="#137797" />
            </div>
          ) : content.length > 0  ? (
            <Grid
              gap={"20px"}
              templateColumns={{
                lg: "repeat(5,1fr)",
                md: "repeat(3,1fr)",
                sm: "repeat(1,1fr)",
              }}
            >
              { renderStudies(content, toggleModal, colorA,type)
               }
               
            </Grid>
          ) : (content.length === 0 && type === "other") ||
            (type === "informes" && !loading) ? (
            <>
              <NotFound desc={"No se encontraron los resultados"} />
            </>
          ) : content.length === 0 && type === "search" ? (
            <>
              <NotFound desc={"No se encontraron los resultados"} />
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
      </Box>

      
    </div>
  );
}

export function CardOverall_Infor({
  title,
  content,
  type,
  toggleModal,
  loading,
  colorA,
  handleSelectInforme,
}) {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const scrollSpeed = 2; // Ajusta la velocidad del desplazamiento horizontal

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.scrollBehavior = "unset";
  };

  const handleMouseMove = (e) => {
    if (isMouseDown && containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * scrollSpeed;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    containerRef.current.style.scrollBehavior = "smooth";
  };
  return (
    <div >
       <Title title={content.length === 0 ? " " : title} />
      <Box 
       boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
       backgroundColor={"#FFFF"} 
       borderRadius="20px"
       mt={'25px'}
       mb={'20px'}
       p={'6px'}
      
      > 
      <Box
           ref={containerRef}
           width={"100%"}
           height={'auto'}
          // m={"20px 30px 30px 20px"}
          // backgroundColor={"#FFFF"}
          // boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
           //py={'25px'}
          
           //height={'auto'}
          px={'15px'}
          py={"25px"}
           borderRadius="20px"
           minH={"280px"}
           maxH={"280px"}
           overflowY="auto"
           overflowX="auto"
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
          // border="1px solid #ccc"
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
          }}
      >
        <Box padding={{ lg: "0px", md: "0px", sm: "0%" }}>
          {loading ? (
            <div className="centerLoader">
              <CircularProgress value={80} size="80px" color="#137797" />
            </div>
          ) : content.length > 0 ? (
            <Grid
              gap={"20px"}
              templateColumns={{
                lg: "repeat(5,1fr)",
                md: "repeat(3,1fr)",
                sm: "repeat(1,1fr)",
              }}
            >
              { renderInformes(content, toggleModal, colorA,type,handleSelectInforme)
               }
               
            </Grid>
          ) : (content.length === 0 && type === "other") ||
            (type === "informes" && !loading) ? (
            <>
              <NotFound desc={"No se encontraron los resultados"} />
            </>
          ) : content.length === 0 && type === "search" ? (
            <>
              <NotFound desc={"No se encontraron los resultados"} />
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
      </Box>
      
    </div>
  );
}

export function CardOverall_Muestra({
  title,
  content,
  type,
  toggleModal,
  loading,
  colorA,
}) {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const scrollSpeed = 2; // Ajusta la velocidad del desplazamiento horizontal

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.scrollBehavior = "unset";
  };

  const handleMouseMove = (e) => {
    if (isMouseDown && containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * scrollSpeed;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    containerRef.current.style.scrollBehavior = "smooth";
  };
  return (
    <div>
    {/* <Heading size="md">
      {content.length === 0 ? " " : <>
      
      {title}
      <Separator marginTop={'2%'} backgroundColor={colorA} height={'2px'}></Separator>
      </>
      }
  
    </Heading>*/}
     <Title title={content.length === 0 ? " " : title} />
     <Separator marginTop={'2%'} backgroundColor={colorA} height={'2px'}></Separator>
     <Box 
      boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
      backgroundColor={"#FFFF"} 
      borderRadius="20px"
      mt={'25px'}
       mb={'20px'}
       p={'6px'}
      
      > 
      <Box
        ref={containerRef}
        width={"100%"}
        height={'auto'}
       px={'15px'}
       py={"25px"}
        borderRadius="20px"
        minH={"280px"}
        maxH={"280px"}
        overflowY="auto"
        overflowX="auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
       // border="1px solid #ccc"
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
       }}
>
        <Box padding={{ lg: "0px", md: "0px", sm: "0%" }}>
          {loading ? (
            <div className="centerLoader">
              <CircularProgress value={80} size="80px" color="#137797" />
            </div>
          ) : content.length > 0 ? (
            <Grid
              gap={"20px"}
              templateColumns={{
                lg: "repeat(5,1fr)",
                md: "repeat(3,1fr)",
                sm: "repeat(1,1fr)",
              }}
            >
              { renderMuestras(content, toggleModal, colorA,type)
               }
               
            </Grid>
          ) : (content.length === 0 && type === "other") ||
            (type === "informes" && !loading) ? (
            <>
              <NotFound desc={"No se encontraron los resultados"} />
            </>
          ) : content.length === 0 && type === "search" ? (
            <>
              <NotFound desc={"No se encontraron los resultados"} />
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
      </Box>
      
    </div>
  );
}
