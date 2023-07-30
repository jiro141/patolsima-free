import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import CloseButtonL from "../Buttons/CloseButton";
import InputSearch from "../Inputs/InputSearch";
import { TABLE_FACTURAS, TABLE_INFORMES, TABLE_MEDICOS, TABLE_PACIENTS } from "../Tables";
import "../../../css/style.css";
import NotFound from "../others/NotFound";
import { useContext } from "react";
import MainContext from "context/mainContext/MainContext";

export default function FilteredDataModal({
  isOpenModal,
  isToggleModal,
  Busqueda,
  handleBusquedaChange,
  thData,
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
  loading,
  type,
  setAbonarSend

}) {

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
          <CloseButtonL handleModal={isToggleModal} />
        </ModalHeader>
        <ModalBody marginTop={"-5%"}>
          <Box>
            <Box>
              <InputSearch
                SearchValue={Busqueda}
                title={"Buscar Registro"}
                handleChange={handleBusquedaChange}
              />

              <Center>
                {type === 'medics' ?
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
                    {loading ? (
                      <div className="centerLoader">
                        <CircularProgress
                          value={80}
                          size="80px"
                          color="#137797"
                        />
                      </div>
                    ) : tBodyData && tBodyData.length > 0 ? (
                      <TABLE_MEDICOS
                        thData={thData}
                        tBodyData={tBodyData}
                        handleSelectTBody={handleSelectTBody}
                        handleSelectIcon={handleSelectIcon}
                      />
                    ) : (
                      <NotFound desc={"No se encontraron los resultados"} />
                    )}
                  </Box>
                  : type === 'facturas' ?
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
                      {loading ? (
                        <div className="centerLoader">
                          <CircularProgress
                            value={80}
                            size="80px"
                            color="#137797"
                          />
                        </div>
                      ) : tBodyData && tBodyData.length > 0 ? (
                        <TABLE_FACTURAS
                          thData={thData}
                          tBodyData={tBodyData}
                          handleSelectTBody={handleSelectTBody}
                          handleSelectIcon={handleSelectIcon}
                          setAbonarSend={setAbonarSend}

                        />
                      ) : (
                        <NotFound desc={"No se encontraron los resultados"} />
                      )}
                    </Box>
                    : type === 'informes' ?
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
                        {loading ? (
                          <div className="centerLoader">
                            <CircularProgress
                              value={80}
                              size="80px"
                              color="#137797"
                            />
                          </div>
                        ) : tBodyData && tBodyData.length > 0 ? (
                          <TABLE_INFORMES
                            thData={thData}
                            tBodyData={tBodyData}
                            handleSelectTBody={handleSelectTBody}
                            handleSelectIcon={handleSelectIcon}
                          />
                        ) : (
                          <NotFound desc={"No se encontraron los resultados"} />
                        )}
                      </Box> :


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
                        {loading ? (
                          <div className="centerLoader">
                            <CircularProgress
                              value={80}
                              size="80px"
                              color="#137797"
                            />
                          </div>
                        ) : tBodyData && tBodyData.length > 0 ? (
                          <TABLE_PACIENTS
                            thData={thData}
                            tBodyData={tBodyData}
                            handleSelectTBody={handleSelectTBody}
                            handleSelectIcon={handleSelectIcon}
                          />
                        ) : (
                          <NotFound desc={"No se encontraron los resultados"} />
                        )}
                      </Box>
                }
              </Center>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
