import React from 'react'
import {
    Button,
    Input,
    Text,
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    CloseButton,
    Link,
    Box,
    Center,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
  } from "@chakra-ui/react";


/*export default function FilteredDataModal({isOpenModal,isToggleModal}) {
  return (
    <Modal
    size={"5xl"}
    maxWidth="100%"
    isOpen={isOpenModal}
    onClose={isToggleModal}
  >
    <ModalOverlay />
    <ModalContent
      minH={"500px"}
      borderRadius={"20px"}
      bg="#ffff"
      // maxHeight="80vh" // Establece el máximo alto del modal
      // overflowY="auto" // Genera scroll cuando el contenido excede el alto máximo
    >
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
          onClick={isToggleModal}
        >
          <CloseButton />
        </Button>
      </ModalHeader>
      <ModalBody marginTop={"-5%"}>
        <Box>
          <Box>
            <Box bg="none" py={4} mb={4}>
              <Grid templateColumns={"1fr 2fr"} maxW="container.lg">
                <Text
                  margin={"auto"}
                  fontWeight={"bold"}
                  color="gray.500"
                  fontSize={"24px"}
                >
                  {" "}
                  Buscar Registro
                </Text>
                <Input
                  focusBorderColor="transparent"
                  border={"none"}
                  borderRadius="none"
                  borderBottom="1px solid"
                  borderBottomColor={"gray.500"}
                  placeholder="Buscar..."
                  size="lg"
                  value={Busqueda}
                  onChange={handleBusquedaChange}
                />
              </Grid>
            </Box>
            <Center>
              <Box
                width={"100%"}
                maxH={"400px"}
                overflowY={"auto"}
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "5px", // Ancho del scroll
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#89bbcc",
                    borderRadius: "10px", // Color del scroll
                  },
                }}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        borderRadius="none"
                        borderBottom="3px solid"
                        borderBottomColor={"gray.500"}
                        textAlign="center"
                      >
                        Nombre
                      </Th>
                      <Th
                        borderRadius="none"
                        borderBottom="3px solid"
                        borderBottomColor={"gray.500"}
                        textAlign="center"
                      >
                        Apellidos
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
                        Teléfono
                      </Th>
                      <Th
                        borderRadius="none"
                        borderBottom="3px solid"
                        borderBottomColor={"gray.500"}
                        textAlign="center"
                      >
                        Correo
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {pacientes &&
                      pacientes?.map((pacientes) => (
                        <Tr key={pacientes.id}>
                          <Link
                            paddingX={"10px"}
                            as="td"
                            margin={"10px"}
                            borderRadius="none"
                            borderBottom="1px solid"
                            borderBottomColor="gray.500"
                            onClick={() => seleccionarRegistro(pacientes)}
                          >
                            {pacientes.nombres}
                          </Link>
                          <Link
                            paddingX={"10px"}
                            as="td"
                            margin={"10px"}
                            borderRadius="none"
                            borderBottom="1px solid"
                            borderBottomColor="gray.500"
                            onClick={() => seleccionarRegistro(pacientes)}
                          >
                            {pacientes.apellidos}
                          </Link>
                          <Link
                            paddingX={"10px"}
                            as="td"
                            margin={"10px"}
                            borderRadius="none"
                            borderBottom="1px solid"
                            borderBottomColor="gray.500"
                            onClick={() => seleccionarRegistro(pacientes)}
                          >
                            {pacientes.ci}
                          </Link>
                          <Link
                            paddingX={"10px"}
                            as="td"
                            margin={"10px"}
                            borderRadius="none"
                            borderBottom="1px solid"
                            borderBottomColor="gray.500"
                            onClick={() => seleccionarRegistro(pacientes)}
                          >
                            {pacientes.telefono_celular}
                          </Link>
                          <Link
                            paddingX={"10px"}
                            as="td"
                            margin={"10px"}
                            borderRadius="none"
                            borderBottom="1px solid"
                            borderBottomColor="gray.500"
                            onClick={() => seleccionarRegistro(pacientes)}
                          >
                            {pacientes.email}
                          </Link>
                          <Link
                            paddingX={"10px"}
                            as="td"
                            margin={"10px"}
                            borderRadius="none"
                            borderBottom="1px solid"
                            borderBottomColor="gray.500"
                            onClick={() =>
                              toggleModalConfirmacion(pacientes)
                            }
                          >
                            <BsFillTrashFill color="#137797" />
                          </Link>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Box>
            </Center>
          </Box>
        </Box>
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}*/
