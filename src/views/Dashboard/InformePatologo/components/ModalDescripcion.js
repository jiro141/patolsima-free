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
import BalloonBlockEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ModalDescripcion = ({ titulo }) => {
    
    const editorConfiguration = {
        toolbar: {
            items: [
                'exportPDF', 'exportWord', '|',
                'findAndReplace', 'selectAll', '|',
                'heading', '|',
                'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                'bulletedList', 'numberedList', 'todoList', '|',
                'outdent', 'indent', '|',
                'undo', 'redo',
                // '-',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                'alignment', '|',
                'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                'textPartLanguage', '|',
                // 'sourceEditing', // break point
                'uploadImage', 'blockQuote', 'codeBlock',
                // '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
            ],
            shouldNotGroupWhenFull: true
        },
    };
    return (
        <>
            <Box marginTop={'-50px'}>
                <Text margin={'10px'} color={'gray.900'} fontSize={'20px'}>{titulo}</Text>
                <Box height={'sm'} maxH={'200px'} overflowY="scroll">
                    <CKEditor
                        height={'500px'}
                        editor={ClassicEditor}
                        data=""
                        config={editorConfiguration}
                        onReady={(editor) => {
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                        }}
                    />
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