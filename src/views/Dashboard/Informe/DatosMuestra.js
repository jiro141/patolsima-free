import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Heading,
    Grid,
    Box,
    Text,
    FormControl,
    FormLabel,
    Select,
    Textarea 
} from "@chakra-ui/react";

const DatosMuestra = ({ isOpen, onClose, title, body }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Heading>Información General</Heading>
                    <Grid templateColumns={'repeat (3,1fr)'}>
                        <Box>
                            <Text>Pasiente</Text>
                            <Text>Amelia Amigón Jordan</Text>
                            <Text>fecha de Nacimiento</Text>
                            <Text>15/03/2003</Text>
                        </Box>
                        <Box>
                            <Text>Cedula de identidad</Text>
                            <Text>2149546</Text>
                            <Text>Médico tratante</Text>
                            <Text>José Solmeon</Text>
                        </Box>
                        <Box>
                            <Text>Telefono</Text>
                            <Text>0414043943</Text>
                            <Text>Telefono</Text>
                            <Text>04140430</Text>
                        </Box>
                    </Grid>
                    <Heading>Información de Estudio</Heading>
                    <Grid templateColumns={'repeat (3,1fr)'}>
                        <Box>
                            <Text>Número de muestra</Text>
                            <Text>B:018-2023</Text>
                            <Text>Tipo de muestra</Text>
                            <Text>Estómago</Text>
                        </Box>
                        <Box>
                            <Text>Tipo de estomago</Text>
                            <Text>Biopcia</Text>
                            <Text>Tipo muestra 2</Text>
                            <Text>estomago 2</Text>
                        </Box>
                        <Box>
                            <Text></Text>
                            <Text></Text>
                            <Text>Tipo muestra 2</Text>
                            <Text>04140430</Text>
                        </Box>
                    </Grid>
                    <Grid templateColumns={'repeat (3,1fr)'}>
                        <FormControl id="previous-reports">
                            <Select placeholder="Informes Anteriores">
                                <option value="report1">Informe 1</option>
                                <option value="report2">Informe 2</option>
                                <option value="report3">Informe 3</option>
                            </Select>
                        </FormControl>
                        <FormControl id="previous-reports">
                            <Select placeholder="Anexos">
                                <option value="report1">Informe 1</option>
                                <option value="report2">Informe 2</option>
                                <option value="report3">Informe 3</option>
                            </Select>
                        </FormControl>
                        <Textarea placeholder="Escriba aquí" size="lg" mt={2} />
                    </Grid>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default DatosMuestra;
