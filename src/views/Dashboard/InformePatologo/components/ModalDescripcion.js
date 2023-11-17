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
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import CKEditorDefaultConfig from "api/ckeditor/ckeditorconfig";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateInforme } from "api/controllers/informes";

const ModalDescripcion = ({ titulo, idStudy }) => {
    // console.log(titulo, 'titulo');
    const [editorData, setEditorData] = useState('');
    let field_name;
    const initialValues = {
        estudio: idStudy,
    };
    // console.log(initialValues);
    // console.log(initialValues);
    switch (titulo) {
        case 'Descripción macroscópica':
            field_name = 'descripcion_macroscopica';
            break;
        case 'Descripción microscópica':
            field_name = 'descripcion_microscopica';
            break;
        case 'Diagnóstico':
            field_name = 'diagnostico';
            break;
        case 'Notas':
            field_name = 'notas';
            break;
        case 'Bibliografía':
            field_name = 'bibliografia';
            break;
        case 'Anexos':
            field_name = 'anexos';
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
            formData[field_name] = editorData;

            console.log(formData);
            try {
                const enviarInforme = await updateInforme(idStudy, formData);
                // Lógica adicional después de enviar el informe
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <>
            <Box marginTop={'-50px'}>
                <Text margin={'10px'} color={'gray.900'} fontSize={'20px'}>{titulo}</Text>
                <Box height={'sm'} maxH={'200px'} overflowY="scroll">
                    <CKEditor
                        height={'500px'}
                        editor={Editor}
                        data={editorData}
                        config={{ ...{ patolsima_informe_id: idStudy }, ...CKEditorDefaultConfig }}
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
