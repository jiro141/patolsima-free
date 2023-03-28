import React from "react";
import {
    Box,
    SimpleGrid,
    Text,
    useColorModeValue,
    Badge,
    Heading,
    Grid
} from "@chakra-ui/react";

const Dashboard = () => {
    const highPriorityColor = "red.400";
    const mediumPriorityColor = "yellow.400";
    const lowPriorityColor = "green.400";

    const highPriorityStudies = [
        {
            name: "Estudio 1",
            priority: "alta",
            date: "Marzo 20, 2022",
            description: "Este es un estudio de prioridad alta.",
        },
        {
            name: "Estudio 2",
            priority: "alta",
            date: "Abril 1, 2022",
            description: "Este es otro estudio de prioridad alta.",
        },
    ];

    const mediumPriorityStudies = [
        {
            name: "Estudio 3",
            priority: "media",
            date: "Mayo 5, 2022",
            description: "Este es un estudio de prioridad media.",
        },
        {
            name: "Estudio 4",
            priority: "media",
            date: "Junio 10, 2022",
            description: "Este es otro estudio de prioridad media.",
        },
    ];

    const lowPriorityStudies = [
        {
            name: "Estudio 5",
            priority: "baja",
            date: "Julio 15, 2022",
            description: "Este es un estudio de prioridad baja.",
        },
        {
            name: "Estudio 6",
            priority: "baja",
            date: "Agosto 20, 2022",
            description: "Este es otro estudio de prioridad baja.",
        },
    ];

    const renderStudies = (studies, priorityColor) => {
        return studies.map((study) => (
            <Grid
                templateColumns={'repeat(3,1fr)'}
                templateRows='repeat(1, 1fr)'
                gap={'20px'}
                key={study.name}
                bg={useColorModeValue("gray.100", "gray.800")}
                p={3}
                rounded="md"
                boxShadow="md"
            >
                
                    <Box d="grid" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme={priorityColor}>
                            {study.priority}
                        </Badge>
                        <Text
                            ml={2}
                            fontSize="sm"
                            color={useColorModeValue("gray.600", "gray.400")}
                        >
                            {study.date}
                        </Text>
                    </Box>

                    <Box mt={2}>
                        <Heading size="sm" mb={2}>
                            {study.name}
                        </Heading>
                        <Text color={useColorModeValue("gray.600", "gray.400")}>
                            {study.description}
                        </Text>
                    </Box>
        
            </Grid>
        ));
    };

    return (
        <SimpleGrid mt={'100px'} columns={1} spacing={4}>
            <Box>
                <Heading size="md" mb={4}>
                    Prioridad Alta
                </Heading>
                {renderStudies(highPriorityStudies, highPriorityColor)}
            </Box>

            <Box>
                <Heading size="md" mb={4}>
                    Prioridad Media
                </Heading>
                {renderStudies(mediumPriorityStudies, mediumPriorityColor)}
            </Box>

            <Box>
                <Heading size="md" mb={4}>
                    Prioridad Baja
                </Heading>
                {renderStudies(lowPriorityStudies, lowPriorityColor)}
            </Box>
        </SimpleGrid>
    );
};

export default Dashboard;
