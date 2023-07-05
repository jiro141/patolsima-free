import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Button,

} from "@chakra-ui/react";
import GeneralButton from "components/widgets/Buttons/GeneralButton";



const Confirmacion = ({ nombres, eliminar, close, id,especialidad }) => {
    return (
        <Box marginTop={"20px"}>
            <Text textAlign={'center'}>{`¿Desea eliminar a ${nombres}${especialidad ? ` (${especialidad})` : ''}?`}</Text>
            <Grid gap={"10px"} templateColumns={"repeat(2,1fr)"}>         
                <GeneralButton text="Si" handleClick={()=>console.log('eliminando')} />
                <GeneralButton text="No" type="outline" handleClick={close} />

            </Grid>
        </Box>
    );
}
export default Confirmacion;