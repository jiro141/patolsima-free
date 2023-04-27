import { useEffect, useState } from 'react';
import Cliente from './Cliente';
import {Box} from "@chakra-ui/react";

function MostrarCliente({ registroSeleccionado }) {
    return (
      <Box>
        {registroSeleccionado && (
          <Cliente
            Nombre={registroSeleccionado.name}
            Apellido={registroSeleccionado.username}
            // Cedula={registroSeleccionado.address.zipcode}
            Telefono={registroSeleccionado.phone}
            email={registroSeleccionado.email}
          />
        )}
      </Box>
    );
  }
export default MostrarCliente;