import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const FormConfirmationPopup = ({ formData, onConfirm, onBack }) => {
  return (
    <Box bg="#F9FAFB" p="4" rounded="md">
      <Text fontSize="2xl" fontWeight="semibold" mb="4">Confirmar datos</Text>
      <Text mb="4">Por favor, revisa los datos introducidos y confirma que son correctos:</Text>
      <Box mb="4">
        <Text fontSize="lg" fontWeight="semibold" color="#718096" mb="2">Estación 1:</Text>
        <Text>{formData.station1.name}, {formData.station1.email}, {formData.station1.phone}</Text>
      </Box>
      <Box mb="4">
        <Text fontSize="lg" fontWeight="semibold" color="#718096" mb="2">Estación 2:</Text>
        <Text>{formData.station2.name}, {formData.station2.email}, {formData.station2.phone}</Text>
      </Box>
      <Box mb="4">
        <Text fontSize="lg" fontWeight="semibold" color="#718096" mb="2">Estación 3:</Text>
        <Text>{formData.station3.name}, {formData.station3.email}, {formData.station3.phone}</Text>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button colorScheme="green" onClick={onConfirm}>Confirmar</Button>
        <Button colorScheme="gray" onClick={onBack}>Regresar</Button>
      </Box>
    </Box>
  );
};

export default FormConfirmationPopup;
