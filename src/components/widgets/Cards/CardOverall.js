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
import React from "react";
import { BsFillFileEarmarkRichtextFill, BsReceipt } from "react-icons/bs";
import "../../../css/style.css";
import NotFound from "../others/NotFound";
import RowCard from "./RowCard";

const renderStudies = (content, toggleModal, colorA, type) => {
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
          <RowCard
            type={"headPrincipal"}
            headTitle={"  "}
            icon={<BsReceipt size={"25px"} color={colorA} />}
            color={useColorModeValue("gray.600", "gray.400")}
          />
        </Box>
        <Box p={"10px"}>
          <RowCard
            headTitle={"Fecha"}
            data={formatDate(study.fecha_recepcion)}
            color={useColorModeValue("gray.600", "gray.400")}
          />

          <RowCard
            headTitle={"Paciente"}
            data={
              study.cliente.razon_social.length > 17
                ? study.cliente.razon_social.substring(0, 17) + "..."
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

const renderInformes = (content, toggleModal, colorA) => {
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
          padding={"15px"}
          paddingBottom={"0px"}
          minH={"15px"}
          marginV={"5px"}
        >
          <RowCard
            type="headPrincipal"
            headTitle={study.estudio_codigo}
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
               study.estudio_patologo_name.length > 17
                 ? study.estudio_patologo_name.substring(0, 17) + "..."
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

          <RowCard
            headTitle={"Prioridad"}
            data={
              <Badge>
          { study.estudio_prioridad}
              </Badge>
             
            }
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
          ) : content.length > 0 ? (
            <Grid
              gap={"20px"}
              templateColumns={{
                lg: "repeat(5,1fr)",
                md: "repeat(3,1fr)",
                sm: "repeat(1,1fr)",
              }}
            >
              {type === "informes"
                ? renderInformes(content, toggleModal, colorA)
                : renderStudies(content, toggleModal, colorA)}
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
    </div>
  );
}
