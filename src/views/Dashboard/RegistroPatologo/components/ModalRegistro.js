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
import MainContext from "context/mainContext/MainContext";
import { useContext } from "react";
import { putInforme } from "api/controllers/informes";
import { Title } from "components/widgets/Texts";
//import { putInformes } from "api/controllers/informes";
import "../../../../css/style.css";
const ModalRegistro = ({ study, close }) => {
    const [studiesDetail, setStudiesDetail] = useState()
  const {detailMuestra,getMuestraDetail,loading,error} = useMuestraDetail({studyId:study.id})
  const [historyMap, setHistoryMap] = useState([]);
  const [changeFocus, setChangeFocus] = useState(false);
  const{informesp,hiddenInformessortp} = useContext(MainContext)
  
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

    console.log(detailMuestra?.notas);
    const formik = useFormik({
        initialValues: {
           // estudio: study?.id,
            notas:detailMuestra?.notas,
        },
        validateOnChange: false,
        onSubmit: async (formData, { resetForm }) => { // se agregar resetForm para limpar los campos del 
           const newObj={
            estudio: study.id,
            ...formData

           }
           
            try {
                
                const procesarInforme = await putInforme(study.id,newObj);
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
            //window.location.reload();
           // setShowModalGeneral(false)
        
        }
    }
    //const fechaHora = studiesDetail?.created_at;
   // const fecha = fechaHora ? fechaHora.split("T")[0] : "";
   //console.log(detailMuestra)
    return (
        <Box marginTop={'-50px'}>
           {/* <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Información General</Text>*/}
           <Title title={'Información General'} />
         {loading ?
         <p>cargando</p>
         :
         <>
           <Grid templateColumns={"repeat(3,1fr)"}>
                <Box>
                    <Box margin={'10px'}>
                        <Text fontSize={'17px'}>Paciente</Text>
                        {!hiddenInformessortp ?

<Badge>
<Text >{`${study?.estudio_paciente_name.length > 10 ? study?.estudio_paciente_name.substring(0, 10) + "..." : ''
}`}</Text>
</Badge>:
                            <Badge>
                            <Text >{`${study ? study?.paciente?.nombres : ''}
                            ${study ? study?.paciente?.apellidos : ''}
                            `}</Text>
                            </Badge>
                            
                        }
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
                        {!hiddenInformessortp ?
                            <Badge>
                            <Text >{study ? study?.estudio_paciente_ci
 : ''}</Text>
                            </Badge>:

<Badge>
<Text >{study ? study?.paciente?.ci : ''}</Text>
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
           {/* <Text margin={'10px'} fontSize={'20px'}>Información de estudio</Text>*/}
           <Box mt={'10px'}>
           <Title title={'Información de estudio'} />
           </Box>
          
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
             
                {changeFocus ?
                <Input
             
                //placeholder='Notas'
                type="text"
                name="notas"
                value={formik.values.notas}
                onChange={(e) =>
                    formik.setFieldValue("notas", e.target.value)
                  }
                  //onFocus={()=>setChangeFocus(false)}
                //value={study?.notas}
            />:
            <div className="chakra-input-style" onClick={()=>setChangeFocus(true)}>
 <p> {detailMuestra?.notas}</p>
            </div>
           

            
            }
               
            </Grid>
            <Box display={'flex'} justifyContent={'flex-end'} my={'-27px'}>
            <GeneralButton  text='Procesar' handleClick={formik.handleSubmit} />
            </Box>
           
           </>}
           
            
          
        </Box>
    );
}
export default ModalRegistro;