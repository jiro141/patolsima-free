import { React, useState, useEffect } from "react";
import {
  Box,
  Text,
  Grid,
  Select,
  Input,
  Button,
  Badge,
  Textarea,
} from "@chakra-ui/react";
import { getStudiesDetail } from "api/controllers/estudios";
import { postInformes } from "api/controllers/informes";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
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
import EditButton from "components/widgets/Buttons/EditButton";
import { putStudiesDetail } from "api/controllers/estudios";
import { CheckButton } from "components/widgets/Buttons/EditButton";
const ModalRegistro = ({ study, close }) => {
  const [dataNotes, setdataNotes] = useState([]);
  const { detailMuestra, getMuestraDetail, loading, error } = useMuestraDetail({
    studyId: study.id,
  });
  const [historyMap, setHistoryMap] = useState([]);
  const [changeFocus, setChangeFocus] = useState(false);

  const { hiddenInformessortp } = useContext(MainContext);

  useEffect(() => {
    getMuestraDetail();
  }, []);
  console.log(detailMuestra);

  useEffect(() => {
    const historyInformes = async () => {
      if (detailMuestra) {
        const res = await lastInformes(detailMuestra?.paciente?.id);
        setHistoryMap(res);
      }
    };
    historyInformes();
    return () => {};
  }, []);

  console.log(detailMuestra);
  const formik = useFormik({
    initialValues: {
      // estudio: study?.id,
      notas: detailMuestra?.notas,
      descripcion_macroscopica: null,
      descripcion_microscopica: null,
      diagnostico: null,
      bibliografia: null,
    },
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      // se agregar resetForm para limpar los campos del
      const newObj = {
        estudio: study.id,
        ...formData,
      };

      try {
        const procesarInforme = await postInformes(newObj);
        console.log(procesarInforme);
        if (procesarInforme) {
          toast.success("¡El informe se ha procesado con exito!", {
            autoClose: 1000,
          });
        } else {
          toast.error("¡No es posible procesar este informe,verifica si ya lo haz procesado previamente o si no cumple con los requerimientos!", {
            autoClose: 5000,
          });
        }
        console.log(procesarInforme);
      } catch (error) {
        console.log(error);
      }
      return;
    },
  });



const handlePutStudies=async()=>{
    const newObj={
        paciente_id:detailMuestra?.paciente?.id,
        medico_tratante_id:detailMuestra?.medico_tratante?.id ? detailMuestra?.medico_tratante?.id : null,
        patologo_id:detailMuestra?.patologo?.id,
        notas:formik.values.notas
    }
  const res= await putStudiesDetail(detailMuestra.id,newObj)
  console.log(res);
}

  return (
    <Box marginTop={"-50px"}>
      {/* <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Información General</Text>*/}
      <Title title={"Información General"} />
      {loading ? (
        <p>cargando</p>
      ) : (
        <>
          <Grid templateColumns={"repeat(3,1fr)"}>
            <Box>
              <Box margin={"10px"}>
                <Text fontSize={"17px"}>Paciente</Text>
                {!hiddenInformessortp ? (
                  <Badge>
                    <Text>{`${
                      study?.estudio_paciente_name.length > 10
                        ? study?.estudio_paciente_name.substring(0, 10) + "..."
                        : ""
                    }`}</Text>
                  </Badge>
                ) : (
                  <Badge>
                    <Text>{`${study ? study?.paciente?.nombres : ""}
                            ${study ? study?.paciente?.apellidos : ""}
                            `}</Text>
                  </Badge>
                )}
              </Box>
              
            </Box>
            <Box>
              <Box margin={"10px"}>
                <Text fontSize={"17px"}>Cedula de Identidad</Text>
                {!hiddenInformessortp ? (
                  <Badge>
                    <Text>{study ? study?.estudio_paciente_ci : ""}</Text>
                  </Badge>
                ) : (
                  <Badge>
                    <Text>{study ? study?.paciente?.ci : ""}</Text>
                  </Badge>
                )}
              </Box>
            </Box>
            <Box>
              <Box margin={"10px"}>
                <Text fontSize={"17px"}>Telefono</Text>
                {
                  <Badge>
                    <Text color={"gray.600"}>
                      {detailMuestra
                        ? detailMuestra?.paciente?.telefono_celular
                        : ""}
                    </Text>
                  </Badge>
                }
              </Box>
            </Box>
          </Grid>
          <Separator></Separator>
          {/* <Text margin={'10px'} fontSize={'20px'}>Información de estudio</Text>*/}

          <Grid templateColumns={"repeat(3,1fr)"}>
            <Box margin={"10px"}>
              <Text fontSize={"17px"}>Medico Tratante</Text>
              {detailMuestra?.medico_tratante ? (
                <Badge>
                  <Text>{`${
                    detailMuestra ? detailMuestra?.medico_tratante?.nombres : ""
                  }
                            ${
                              detailMuestra
                                ? detailMuestra?.medico_tratante?.apellidos
                                : ""
                            }
                            `}</Text>
                </Badge>
              ) : (
                <Badge>
                  <Text>Indefinido</Text>
                </Badge>
              )}
            </Box>
            <Box margin={"10px"}>
              <Text fontSize={"17px"}>Telefono</Text>
              {detailMuestra?.medico_tratante ? (
                <Badge>
                  <Text>{`${
                    detailMuestra
                      ? detailMuestra?.medico_tratante?.telefono_celular
                      : ""
                  }
                           
                            `}</Text>
                </Badge>
              ) : (
                <Badge>
                  <Text>Indefinido</Text>
                </Badge>
              )}
            </Box>
            <Box margin={"10px"}>
              <Text fontSize={"17px"}>Especialidad</Text>
              {detailMuestra?.medico_tratante ? (
                <Badge>
                  <Text>{`${
                    detailMuestra
                      ? detailMuestra?.medico_tratante?.especialidad
                      : ""
                  }
                           
                            `}</Text>
                </Badge>
              ) : (
                <Badge>
                  <Text>Indefinido</Text>
                </Badge>
              )}
            </Box>
          </Grid>

          <Box mt={"10px"}>
            <Title title={"Información de estudio"} />
          </Box>

          <Grid templateColumns={"repeat(3,1fr)"}>
            <Box>
              <Box margin={"10px"}>
                <Text>Tipo de muestra</Text>
                {detailMuestra ? (
                  <Badge>
                    <Text>{detailMuestra.codigo}</Text>
                  </Badge>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box>
              <Box margin={"10px"}>
                <Text>Tipo de estudio</Text>
                {detailMuestra ? (
                  <Badge>
                    <Text>{detailMuestra.tipo}</Text>
                  </Badge>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box margin={"10px"}>
              <Text>Muestras</Text>
              {detailMuestra ? (
                <Select 
                disabled={detailMuestra?.muestras?.length>0 ? false :true}
                width={"100%"} color="gray.400" defaultValue="Muestras">
                  <option hidden colorScheme="gray.400">
                    Muestras
                  </option>
                  {detailMuestra?.muestras?.map((estudio, index) => (
                    <option key={index} value={estudio}>
                      {estudio.tipo_de_muestra}- #{estudio.estudio}
                    </option>
                  ))}
                </Select>
              ) : (
                <Badge>
                  <Text>Indefinido</Text>
                </Badge>
              )}
            </Box>
          </Grid>

          <Grid
            margin={"30px 10px 20px 10px"}
            templateColumns={"repeat(2,1fr)"}
            gap={"20px"}
          >
            <Box>
              <Select
                width={"100%"}
                color="gray.400"
                defaultValue="Informes anteriores"
                disabled={historyMap ? false :true}
              >
                <option hidden colorScheme="gray.400">
                  Informes anteriores
                </option>
                {historyMap &&
                  historyMap?.map((estudio, index) => (
                    <option key={index} value={estudio.estudio_id}>
                      {estudio.estudio_codigo}
                    </option>
                  ))}
              </Select>
              <Select
                mt={"5px"}
                color="gray.400"
                defaultValue="Informes anteriores"
                disabled={detailMuestra?.adjuntos?.length>0 ? false :true}
              >
                <option hidden>Anexos</option>
                {detailMuestra ? (
                  detailMuestra?.adjuntos?.map((adjunto, index) => (
                    <option key={index} value={adjunto}>
                      {adjunto.file_name}
                    </option>
                  ))
                ) : (
                  <option disabled></option>
                )}
              </Select>
            </Box>

            { 
              <div
                className="chakra-input-style"
               // onClick={() => setChangeFocus(true)}
              >
                <Box display={"flex"} justifyContent={"space-between"}>
                  <p> {detailMuestra?.notas}</p>
                  
                </Box>
              </div>
            }
          </Grid>
          <Box display={"flex"} justifyContent={"flex-end"} my={"-27px"}>
            <GeneralButton text="Procesar" handleClick={formik.handleSubmit} />
          </Box>
        </>
      )}
    </Box>
  );
};
export default ModalRegistro;
