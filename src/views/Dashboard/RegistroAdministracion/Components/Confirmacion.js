import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Button,

} from "@chakra-ui/react";



const Confirmacion = ({ nombres, eliminar, close, id,especialidad }) => {
    console.log(id);
    //tamaños de modal
    // console.log(nombres);
    return (
        <Box marginTop={"20px"}>
            <Text textAlign={'center'}>{`¿Desea eliminar a ${nombres}${especialidad ? ` (${especialidad})` : ''}?`}</Text>
            <Grid gap={"10px"} templateColumns={"repeat(2,1fr)"}>
                <Button
                    marginX={'10px'}
                    marginY={'30px'}
                    color={'whiteAlpha.900'}
                    borderColor={'gray.400'}
                    background={'#137797'}
                    borderRadius={'20px'}
                    onClick={() => {
                        eliminar(id);
                        close();
                    }}
                >Si</Button>
                <Button
                    marginX={'10px'}
                    marginY={'30px'}
                    border={'solid'}
                    color={'#137797'}
                    borderColor={'#137797'}
                    background={'none'}
                    borderRadius={'20px'}
                    onClick={close}>No</Button>
            </Grid>
        </Box>
    );
}
export default Confirmacion;