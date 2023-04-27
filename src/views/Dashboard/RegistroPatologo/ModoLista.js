import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Grid,
  Link,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import { FaFlask } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import DatosMuestra from "./DatosMuestra";

const ModoLista = () => {
  const highPriorityColor = "#fc8181";
  const mediumPriorityColor = "#f6e05e";
  const lowPriorityColor = "#68d391";

  const highPriorityStudies = [
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      ci: "522642",
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      ci: "522642",
    },
  ];

  const mediumPriorityStudies = [
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "ematologia",
      paciente: "Javiera de castellanos",
      ci: "522642",
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      ci: "522642",
    },
  ];

  const lowPriorityStudies = [
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      ci: "522642",
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      ci: "522642",
    },
  ];

  const renderStudies = (studies, priorityColor) => {
    // const [showModal, setShowModal] = useState(false);

    // const [isOpen, setIsOpen] = useState(false);

    // const handleOpenModal = () => {
    //     setIsOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsOpen(false);
    // };

    return (
      <Box>
        <Center>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th
                  borderRadius="none"
                  borderBottom="3px solid"
                  borderBottomColor={"gray.500"}
                  textAlign="center"
                >
                  #Muestra
                </Th>
                <Th
                  borderRadius="none"
                  borderBottom="3px solid"
                  borderBottomColor={"gray.500"}
                  textAlign="center"
                >
                  Nombres y Apellidos
                </Th>
                <Th
                  borderRadius="none"
                  borderBottom="3px solid"
                  borderBottomColor={"gray.500"}
                  textAlign="center"
                >
                  RIF/Cédula
                </Th>
                <Th
                  borderRadius="none"
                  borderBottom="3px solid"
                  borderBottomColor={"gray.500"}
                  textAlign="center"
                >
                  Fecha de Recepción
                </Th>
                <Th
                  borderRadius="none"
                  borderBottom="3px solid"
                  borderBottomColor={"gray.500"}
                  textAlign="center"
                >
                  Tipo de estudio
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {studies &&
                studies.map((study) => (
                  <Tr key={study.nestudio}>
                    <Link
                      as="td"
                      margin={"10px"}
                      borderRadius="none"
                      borderBottom="1px solid"
                      borderBottomColor="gray.500"
                      //   onClick={() => seleccionarRegistro(pasientes)}
                    >
                      {study.nestudio}
                    </Link>
                    <Link
                      as="td"
                      margin={"10px"}
                      borderRadius="none"
                      borderBottom="1px solid"
                      borderBottomColor="gray.500"
                      //   onClick={() => seleccionarRegistro(pasientes)}
                    >
                      {study.paciente}
                    </Link>
                    <Link
                      as="td"
                      margin={"10px"}
                      borderRadius="none"
                      borderBottom="1px solid"
                      borderBottomColor="gray.500"
                      //   onClick={() => seleccionarRegistro(pasientes)}
                    >
                      {study.ci}
                    </Link>
                    <Link
                      as="td"
                      margin={"10px"}
                      borderRadius="none"
                      borderBottom="1px solid"
                      borderBottomColor="gray.500"
                      //   onClick={() => seleccionarRegistro(pasientes)}
                    >
                      {study.fecha}
                    </Link>
                    <Link
                      as="td"
                      margin={"10px"}
                      borderRadius="none"
                      borderBottom="1px solid"
                      borderBottomColor="gray.500"
                      //   onClick={() => seleccionarRegistro(pasientes)}
                    >
                      {pasientes.estudio}
                    </Link>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Center>
      </Box>
    );
  };
};

export default ModoLista;
