import { React, useState, useEffect } from "react";
import {
    Box,
    Text,
    Grid,
    Select,
    Input,
    Button,
    Badge
} from "@chakra-ui/react";
import { getStudiesDetail } from "api/controllers/estudios";
import { postInformes } from "api/controllers/informes";
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { Separator } from "components/Separator/Separator";
import GeneralButton from "components/widgets/Buttons/GeneralButton";
import { useMuestraDetail } from "hooks/MuestrasPatologo/useMuestraDetail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "helpers";
import { lastInformes } from "api/controllers/informes";
import { completeInforme } from "api/controllers/informes";
//import { putInformes } from "api/controllers/informes";

const ModalRegistro = ({ study, close }) => {
    const [studiesDetail, setStudiesDetail] = useState()
  const {detailMuestra,getMuestraDetail,loading,error} = useMuestraDetail({studyId:study.id})
  const [historyMap, setHistoryMap] = useState([]);

   /* const StudiesDetailGet = async () => {
        try {
            const estudiosDetail = await getStudiesDetail(study.id)
            console.log(estudiosDetail)
            setStudiesDetail(estudiosDetail)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        StudiesDetailGet();
    }, []);*/
    useEffect(() => {
     getMuestraDetail()
      
    }, [])
    
    useEffect(() => {
        const historyInformes=async()=>{
            if(detailMuestra){
                const res= await lastInformes(detailMuestra?.paciente?.id)
                setHistoryMap(res);
            }
        
        }
        historyInformes()
      return () => {

      }
    }, [])

    console.log(detailMuestra.notas);
    const formik = useFormik({
        initialValues: {
            //estudio: study.id,
            notas: detailMuestra.notas,
            descripcion_macroscopica:null,
            descripcion_microscopica:null,
            diagnostico:null,
        },
        validateOnChange: false,
        onSubmit: async (formData, { resetForm }) => { // se agregar resetForm para limpar los campos del 
           const newObj={
            estudio: study.id,
           ...formData

           }
           
            try {
                
                const procesarInforme = await postInformes(newObj);
                if(procesarInforme){
                    toast.success("¡El informe se ha procesado con exito!", {
                        autoClose: 1000,
                      });
                }else{
                    toast.error("¡No es posible procesar este informe!", {
                        autoClose: 1000,
                      });
                }
                console.log(procesarInforme)

            }
            catch (error) {
                console.log(error);
            }
            return;
        },
    });

    const handleProcesar=async()=>{
        const res= await completeInforme(detailMuestra?.id)
        console.log(res);
        if(res){
            window.location.reload();
           // setShowModalGeneral(false)
        
        }
    }
    //const fechaHora = studiesDetail?.created_at;
   // const fecha = fechaHora ? fechaHora.split("T")[0] : "";
   //console.log(detailMuestra)
    return (
        <Box marginTop={'-50px'}>
            <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Información General</Text>
           
         {loading ?
         <p>cargando</p>
         :
         <>
           <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Paciente</Text>
                        { (
                            <Badge>
                            <Text >{`${detailMuestra ? detailMuestra?.paciente?.nombres : ''}
                            ${detailMuestra ? detailMuestra?.paciente?.apellidos : ''}
                            `}</Text>
                            </Badge>
                            
                        )}
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Fecha</Text>
                        <Badge>
                        <Text >{detailMuestra ? '07/03/1998' : ''}</Text>
                        </Badge>
                        
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Cedula de Identidad</Text>
                        {
                            <Badge>
                            <Text >{detailMuestra ? detailMuestra?.paciente?.ci : ''}</Text>
                            </Badge>
                            
                        }
                    </Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Medico Tratante</Text>
                        {
                            <Badge>
                            <Text >{`${detailMuestra ? detailMuestra?.medico_tratante?.nombres : ''}
                            ${detailMuestra ? detailMuestra?.medico_tratante?.apellidos : ''}
                            `}</Text>
                            </Badge>
                            
                        }
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Telefono</Text>
                        {
                            <Badge>
                    <Text color={'gray.600'}>{detailMuestra ? detailMuestra?.paciente?.telefono_celular : ''}</Text>
                            </Badge>
                        }
                    </Box>
                  
                </Box>
            </Grid>
            <Separator></Separator>
            <Text margin={'10px'} fontSize={'20px'}>Información de estudio</Text>
            <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text >Tipo de muestra</Text>
                        {detailMuestra ? (
                           <Badge>
                            <Text >{detailMuestra.codigo}</Text>
                           </Badge> 
                        ) : (
                            ''
                        )}
                    </Box>
                </Box>
                <Box>
                    <Box margin={'10px'}>
                        <Text >Tipo de estudio</Text>
                        {detailMuestra ? (
                            <Badge>
                        <Text >{detailMuestra.tipo}</Text>
                            </Badge>
                            
                        ) : (
                           ''
                        )}
                    </Box>
                </Box>
               
            </Grid>
            <Grid margin={'30px 10px 20px 10px'} templateColumns={'repeat(3,1fr)'} gap={'20px'}>
            <Select width={'100%'} color="gray.400" defaultValue="Informes anteriores">
                            <option hidden colorScheme="gray.400">Informes anteriores</option>
                            {historyMap.map((estudio, index) => (
        <option key={index} value={estudio.estudio_id}>
          {estudio.estudio_tipo} - {estudio.estudio_codigo}
        </option>
      ))}
                            { /*<option value=""></option>
                            <option value=""></option>*/}
                        </Select>
                <Select color="gray.400" defaultValue="Informes anteriores">
                    <option hidden>Anexos</option>
                    {/*studiesDetail ? (
                        studiesDetail.adjuntos.map((adjunto, index) => (
                            <option key={index} value={adjunto}>
                                {adjunto}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading...</option>
                    )*/}
                </Select>
              {detailMuestra && <Input
                    //placeholder='Notas'
                    type="text"
                    name="notas"
                    value={detailMuestra?.notas}
                    onChange={(e) =>
                        formik.setFieldValue("notas", e.target.value)
                      }
                    //value={studiesDetail?.notas}
                />}
               
            </Grid>
            <Box display={'flex'} justifyContent={'flex-end'} my={'-27px'}>
            <GeneralButton  text='Procesar' handleClick={handleProcesar} />
            </Box>
           
           </>}
           
            
          
        </Box>
    );
}
export default ModalRegistro;