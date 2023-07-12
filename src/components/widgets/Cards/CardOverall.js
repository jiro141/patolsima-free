import {
  Badge,
  Box,
  CircularProgress,
  Grid,
  Heading,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDate } from "helpers";
import React from "react";
import { BsReceipt } from "react-icons/bs";
import "../../../css/style.css";
import NotFound from "../others/NotFound";


const renderStudies = (content, toggleModal, colorA) => {
  console.log(content);
  return content.map((study) => (
    <Link
      onClick={() => {
        toggleModal(study);
      }}
    >
      <Box
      height={"250px"}
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
            fontSize={"14px"}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {formatDate(study.fecha_recepcion)}
          </Text>
          <Heading fontSize={"16px"}>Paciente</Heading>
          <Text
            fontSize={"16px"}
            textAlign={"right"}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            { study.cliente.razon_social.length > 17 ? study.cliente.razon_social.substring(0, 17) + '...': study.cliente.razon_social }
          </Text>
          <Heading fontSize={"16px"}>RIF/CI</Heading>
          <Text fontSize={"16px"} textAlign={"right"}>
            {study.cliente.ci_rif}
          </Text>
          <Heading fontSize={"16px"}>Monto Total</Heading>
          <Text fontSize={"16px"} textAlign={"right"}>
            {study.total_usd}($)
          </Text>
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
  colorA
}) {
  console.log(content);
  return (
    <div>
      <Heading size="md">{content.length === 0 ? " " : title}</Heading>
      <Box
        width={"100%"}
        m={"20px 30px 30px 10px"}
        backgroundColor={"#FFFF"}
        boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
        padding={"25px"}
        borderRadius="20px"
        minH={"300px"}
        maxH={"300px"}
        overflowY="auto"
        overflowX="hidden"
        border="1px solid #ccc"
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
      >
        <Box padding={{ lg: "0px", md: "0px", sm: "0%" }}>
          {loading ? (
            <div className="centerLoader">
              <CircularProgress value={80} size="80px" color="#137797" />
            </div>
          ) : (
            <Grid
              gap={"20px"}
              templateColumns={{
                lg: "repeat(5,1fr)",
                md: "repeat(3,1fr)",
                sm: "repeat(1,1fr)",
              }}
            >
              { renderStudies(content, toggleModal,colorA) }
            </Grid>
          )}
          {content.length === 0 && type==='search' && (
            <>
              <NotFound desc={"No se encontraron los resultados"} />
            </>
          )}
          {content.length === 0 && !loading && (
            <>
              <NotFound desc={"No se encontraron los resultados"} />
            </>
          )}
           
        </Box>
      </Box>
    </div>
  );
}
