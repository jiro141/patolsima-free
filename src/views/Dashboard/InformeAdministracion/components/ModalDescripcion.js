import { React, useState } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button
} from "@chakra-ui/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import CKEditorConfig from "api/ckeditor/ckeditorconfig";


const ModalDescripcion = () => {

    return (
        <>
            <Box marginTop={'-50px'}>
                <Text margin={'10px'} color={'gray.900'} fontSize={'20px'}>Descripción</Text>
                <Box height={'sm'}>
                    <Box minH={'400px'} maxH={'200px'}  overflowY="scroll">
                        <CKEditor
                            editor={Editor}
                            config={CKEditorConfig}
                            data=""
                            onReady={(editor) => {
                                console.log("CKEditor5 React Component is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                            }}
                        />
                    </Box>
                </Box>
                <Button
                    marginBottom={{ lg: '-8%', md: '-8%', sm: '-10%' }}
                    marginLeft={{ lg: '5%', md: '70%', sm: '77%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Descartar
                </Button>
                <Button
                    marginBottom={{ lg: '-3%', md: '-8%', sm: '-10%' }}
                    marginLeft={{ lg: '88%', md: '70%', sm: '77%' }}
                    borderRadius={'20px'}
                    bgColor={'#137797'}
                    color='#ffff'>
                    Guardar
                </Button>
            </Box>
        </>
    );
}
export default ModalDescripcion;