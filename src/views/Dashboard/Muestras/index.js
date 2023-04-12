import React from "react";
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
    ModalCloseButton,
    Button,
    Flex,
} from "@chakra-ui/react";
import { FaFlask } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import DatosMuestra from './DatosMuestra'

const Dashboard = () => {
    const highPriorityColor = "#fc8181";
    const mediumPriorityColor = "#f6e05e";
    const lowPriorityColor = "#68d391";

    const highPriorityStudies = [
        {
            nestudio: "B:010-2023",
            fecha: "15/03/2023",
            estudio: "Biopcia",
            paciente: "Javiera de castellanos",
        },
        {
            nestudio: "B:010-2023",
            fecha: "15/03/2023",
            estudio: "Biopcia",
            paciente: "Javiera de castellanos",
        },
    ];

    const mediumPriorityStudies = [
        {
            nestudio: "B:010-2023",
            fecha: "15/03/2023",
            estudio: "ematologia",
            paciente: "Javiera de castellanos",
        },
        {
            nestudio: "B:010-2023",
            fecha: "15/03/2023",
            estudio: "Biopcia",
            paciente: "Javiera de castellanos",
        },
    ];

    const lowPriorityStudies = [
        {
            nestudio: "B:010-2023",
            fecha: "15/03/2023",
            estudio: "Biopcia",
            paciente: "Javiera de castellanos",
        },
        {
            nestudio: "B:010-2023",
            fecha: "15/03/2023",
            estudio: "Biopcia",
            paciente: "Javiera de castellanos",
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


        return studies.map((study) => (
            <Flex flexDirection={'row 7'}>
                <Box key={study.nestudio}>
                    <Box
                        borderTopLeftRadius={'16px'}
                        borderTopRightRadius={'16px'}
                        backgroundColor={priorityColor}>
                        <Link>
                            <Badge
                                textAlign={'center'}
                                background={'none'}
                                color={'#FFFF'}
                                padding={'10px'}
                                fontSize={'18px'}>
                                {study.nestudio}
                                <Icon
                                    border={'solid'}
                                    borderColor={priorityColor}
                                    marginTop={'-25%'}
                                    marginLeft={'90%'}
                                    height={'50px'}
                                    width={'50px'}
                                    padding={'5px'}
                                    borderRadius={'50%'}
                                    as={FaFlask}
                                    backgroundColor={'#FFFF'}
                                    color={priorityColor} />
                            </Badge>
                            {/* <Modal isOpen={isOpen} onClose={handleCloseModal}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalCloseButton />
                                    <DatosMuestra isOpen={isOpen} onClose={handleCloseModal} />
                                </ModalContent>
                            </Modal> */}
                        </Link>
                    </Box>
                    <Box p={'20px 10px'}>
                        <Heading size="sm">Fecha de ingreso</Heading>
                        <Text textAlign={'right'}
                            ml={2}
                            color={useColorModeValue("gray.600", "gray.400")}
                        >
                            {study.fecha}
                        </Text>
                        <Heading size="sm">Estudio</Heading>
                        <Text textAlign={'right'}
                            color={useColorModeValue("gray.600", "gray.400")}>
                            {study.estudio}
                        </Text>
                        <Heading size="sm">Paciente</Heading>
                        <Text textAlign={'right'} >
                            {study.paciente}
                        </Text>
                    </Box>
                </Box>
            </Flex>
        ));
    };


    return (
        <SimpleGrid mt={'100px'} columns={1} spacing={4}>
            <SimpleGrid columns={1}>
                <Box>
                    <Heading borderBottom='solid' borderColor={highPriorityColor} size="md" mb={4}>
                        Prioridad Alta
                    </Heading>
                    {renderStudies(highPriorityStudies, highPriorityColor)}
                </Box>
            </SimpleGrid>
            <SimpleGrid columns={1}>
                <Box>
                    <Heading borderBottom='solid' borderColor={mediumPriorityColor} size="md" mb={4}>
                        Prioridad Media
                    </Heading>
                    {renderStudies(mediumPriorityStudies, mediumPriorityColor)}
                </Box>
            </SimpleGrid>
            <SimpleGrid columns={1}>
                <Box>
                    <Heading borderBottom='solid' borderColor={lowPriorityColor} size="md" mb={4}>
                        Prioridad Baja
                    </Heading>
                    {renderStudies(lowPriorityStudies, lowPriorityColor)}
                </Box>
            </SimpleGrid>
        </SimpleGrid>
    );
};







export default Dashboard;
