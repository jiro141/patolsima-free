import { React, useState, useEffect } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button
} from "@chakra-ui/react";
import { getStudiesDetail } from "api/controllers/estudios";
import { postInforme } from "api/controllers/informes";
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';

const ModalRegistro = ({ study, close }) => {
    const [studiesDetail, setStudiesDetail] = useState()
    const StudiesDetailGet = async () => {
        try {
            const estudiosDetail = await getStudiesDetail(study.id)
            setStudiesDetail(estudiosDetail)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        StudiesDetailGet();
    }, []);

    const formik = useFormik({
        initialValues: {
            estudio: study.id,
            descripcion_macroscopica: null,
            descripcion_microscopica: null,
            diagnostico: null,
            notas: null,
            bibliografia: null
        },
        validateOnChange: false,
        onSubmit: async (formData, { resetForm }) => { // se agregar resetForm para limpar los campos del formulario 
            // setIsloading(true);// cuando carga un paciente pasa a true
            try {
                const procesarInforme = await postInforme(formData);

            }
            catch (error) {
                console.log(error);
            }
            return;
        },
    });
    const fechaHora = studiesDetail?.created_at;
    const fecha = fechaHora ? fechaHora.split("T")[0] : "";
    return (
        <Box marginTop={'-50px'}>
            <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Información General</Text>
            <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Paciente</Text>
                        {studiesDetail ? (
                            <Text >{studiesDetail.paciente.nombres} {studiesDetail.paciente.apellidos}</Text>
                        ) : (
                            <Text fontSize={'14px'}>Loading...</Text>
                        )}
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Fecha</Text>
                        <Text >{fecha}</Text>
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Cedula de Identidad</Text>
                        {studiesDetail ? (
                            <Text >{studiesDetail.paciente.ci}</Text>
                        ) : (
                            <Text fontSize={'14px'}>Loading...</Text>
                        )}
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Medico Tratante</Text>
                        {studiesDetail ? (
                            <Text >{studiesDetail.medico_tratante.nombres} {studiesDetail.medico_tratante.apellidos}</Text>
                        ) : (
                            <Text fontSize={'14px'}>Loading...</Text>
                        )}
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Telefono</Text>
                        {studiesDetail ? (
                            <Text color={'gray.600'}>{studiesDetail.paciente.telefono_celular}</Text>
                        ) : (
                            <Text fontSize={'14px'}>Loading...</Text>
                        )}
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Telefono</Text>
                        {studiesDetail ? (
                            <Text >{studiesDetail.medico_tratante.telefono_celular}</Text>
                        ) : (
                            <Text fontSize={'14px'}>Loading...</Text>
                        )}
                    </Box>
                </Box>
            </Grid>
            <Text margin={'10px'} fontSize={'20px'}>Información de estudio</Text>
            <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text >Tipo de muestra</Text>
                        {studiesDetail ? (
                            <Text >{studiesDetail.codigo}</Text>
                        ) : (
                            <Text fontSize={'14px'}>Loading...</Text>
                        )}
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text >tipo de estudio</Text>
                        {studiesDetail ? (
                            <Text >{studiesDetail.tipo}</Text>
                        ) : (
                            <Text fontSize={'14px'}>Loading...</Text>
                        )}
                    </Box>
                </Box>
                {/* <Box>
                    <Box margin={'10px'}>
                        <Text textColor={'transparent'} >Tipo de muestra 3</Text>
                        <Text textColor={'transparent'}>26565462</Text>
                    </Box>
                    <Box margin={'10px'}>
                        <Text >Tipo de muestra 3</Text>
                        <Text>26565462</Text>
                    </Box>
                </Box> */}
            </Grid>
            <Grid margin={'30px 10px 20px 10px'} templateColumns={'repeat(3,1fr)'} gap={'20px'}>
                <Select color="gray.400" defaultValue="Informes anteriores">
                    <option hidden >Informes anteriores</option>
                    {studiesDetail ? (
                        studiesDetail.muestras.map((muestra, index) => (
                            <option key={index} value={muestra}>
                                {muestra}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading...</option>
                    )}
                </Select>
                <Select color="gray.400" defaultValue="Informes anteriores">
                    <option hidden>Anexos</option>
                    {studiesDetail ? (
                        studiesDetail.adjuntos.map((adjunto, index) => (
                            <option key={index} value={adjunto}>
                                {adjunto}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading...</option>
                    )}
                </Select>
                <Input
                    placeholder='Notas'
                    type="text"
                    name="notas"
                    value={studiesDetail?.notas}
                />
            </Grid>
            <Button
                marginBottom={{ lg: '-35px', md: '-8%', sm: '-10%' }}
                marginLeft={{ lg: '620px', md: '70%', sm: '77%' }}
                borderRadius={'20px'}
                bgColor={'#137797'}
                color='#ffff'
                onClick={() => {
                    formik.handleSubmit();
                    close();
                }}>
                Procesar
            </Button>
        </Box>
    );
}
export default ModalRegistro;