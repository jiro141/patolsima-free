import React, { useState } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button
} from "@chakra-ui/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateInforme } from "api/controllers/informes";

const ModalDescripcion = ({ titulo, idStudy }) => {
    const [editorData, setEditorData] = useState('');
    // console.log(editorData);
    const initialValues = {
        estudio: idStudy,
    };
    console.log(initialValues);
    // console.log(initialValues);
    switch (titulo) {
        case 'Descripción macroscópica':
            initialValues.descripcion_macroscopica = editorData;
            break;
        case 'Descripción microscópica':
            initialValues.descripcion_microscopica = editorData;
            break;
        case 'Diagnóstico':
            initialValues.diagnostico = editorData;
            break;
        case 'Notas':
            initialValues.notas = editorData;
            break;
        case 'Bibliografía':
            initialValues.bibliografia = editorData;
            break;
        default:
            break;
    }

    const validationSchema = Yup.object({
        // descripcion_macroscopica: Yup.string().required('La descripción macroscópica es requerida'),
        // Agrega otras validaciones para los demás campos si es necesario
    });
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (formData) => {
            console.log(formData);
            try {
                const enviarInforme = await updateInforme(idStudy, formData);
                // Lógica adicional después de enviar el informe
            } catch (error) {
                console.log(error);
            }
        },
    });

    const editorConfiguration = {
        // Configuración del editor CKEditor
    };

    return (
        <>
            <Box marginTop={'-50px'}>
                <Text margin={'10px'} color={'gray.900'} fontSize={'20px'}>{titulo}</Text>
                <Box height={'sm'} maxH={'200px'} overflowY="scroll">
                    <CKEditor
                        height={'500px'}
                        editor={ClassicEditor}
                        data={editorData}
                        config={editorConfiguration}
                        onReady={(editor) => {
                            // Lógica adicional cuando el editor está listo
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setEditorData(data);
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
                    color='#ffff'
                    onClick={formik.handleSubmit}>
                    Guardar
                </Button>
            </Box>
        </>
    );
}

export default ModalDescripcion;
