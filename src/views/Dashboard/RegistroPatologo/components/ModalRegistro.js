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
  CircularProgress,
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
import '../../../../css/style.css'
import WrapContentDetail from "components/widgets/Cards/WrapContentDetail";
import BadgeDetail from "components/widgets/Cards/BadgeDetail";

const ModalRegistro = ({ study, close }) => {
  const [dataNotes, setdataNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const { detailMuestra, getMuestraDetail, loading, error } = useMuestraDetail({
    studyId: study.id,
  });
  const [historyMap, setHistoryMap] = useState([]);
  const [changeFocus, setChangeFocus] = useState(false);

  const { hiddenInformessortp } = useContext(MainContext);

  useEffect(() => {
    getMuestraDetail();
  }, []);
  // console.log(detailMuestra);

  useEffect(() => {
    const historyInformes = async () => {
      if (detailMuestra) {
        const res = await lastInformes(detailMuestra?.paciente?.id);
        setHistoryMap(res);
      }
    };
    historyInformes();
    return () => { };
  }, []);

  // console.log(detailMuestra);
  // console.log(study);
  const formik = useFormik({
    initialValues: {
      notas: null,
      descripcion_macroscopica: null,
      descripcion_microscopica: null,
      diagnostico: null,
      bibliografia: null,
    },
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      const newObj = {
        estudio: study.id,
        ...formData,
      };

      try {
        const procesarInforme = await postInformes(newObj);
        // console.log(procesarInforme);
        if (procesarInforme) {
          toast.success("¡El informe se ha procesado con exito!", {
            autoClose: 1000,
          });
          // history.push('/admin/RegistroPatologo');
          window.location.reload();
        } else {
          toast.error("¡No es posible procesar este informe,verifica si ya lo haz procesado previamente o si no cumple con los requerimientos!", {
            autoClose: 5000,
          });
          // window.location.reload();
        }
        // console.log(procesarInforme);
      } catch (error) {
        console.log(error);
      }
      return;
    },
  });
  // console.log(editedNotes);
  const formik2 = useFormik({
    initialValues: {
      patologo_id: 1,
      notas: editedNotes,
    },
    onSubmit: async (values) => {
      try {
        const newObj = {
          notas: values.notas
        };
        const res = await putStudiesDetail(detailMuestra.id, newObj);
        console.log(res);
        if (res) {
          toast.success("¡Se actualizo las notas con exitos!", {
            autoClose: 1000,
          });
          window.location.reload();
        } else {
          toast.error("¡No se ha podido actualizar las notas del estudio!", {
            autoClose: 5000,
          });
        }
        // console.log(res);
        setEditMode(false);
      } catch (error) {
        console.error(error);
      }
    },
  });



  const handlePutStudies = async () => {
    const newObj = {
      paciente_id: detailMuestra?.paciente?.id,
      medico_tratante_id: detailMuestra?.medico_tratante?.id ? detailMuestra?.medico_tratante?.id : null,
      patologo_id: detailMuestra?.patologo?.id,
      notas: formik.values.notas
    }
    const res = await putStudiesDetail(detailMuestra.id, newObj)
    console.log(res);
  }

  return (
    <Box marginTop={"-50px"}>
      {/* <Text margin={'10px'} color={'gray.900'} fontSize={'20px'} >Información General</Text>*/}
      <Title title={"Información General"} />
      {loading ? (
        <div className="centerLoader">
          <CircularProgress
            value={80}
            size="80px"
            color="#137797"
          />
        </div>
      ) : (
        <>


          <Separator
            marginTop={"8px"}
            width={"70%"}
            backgroundColor={"#89bbcc"}
            color={"#89bbcc"}
          ></Separator>
          <WrapContentDetail>
            <BadgeDetail
              title={'Paciente'}
              content={study && study}
              text={`${study?.paciente?.nombres.length > 9
                ? study?.paciente?.nombres.substring(0, 10) +
                "..."
                : study?.paciente?.nombres
                }

                          ${study?.paciente?.apellidos.length > 9
                  ? study?.paciente?.apellidos.substring(
                    0,
                    3
                  ) + "..."
                  : study?.paciente?.apellidos
                }`}
            />
            <BadgeDetail
              title={'CI/RIF'}
              content={study && study}
              text={study?.paciente?.ci}
            />
            <BadgeDetail
              title={'Telefono'}
              content={study && study}
              text={study?.paciente?.telefono_celular}
            />

          </WrapContentDetail>

          <WrapContentDetail>
            <BadgeDetail
              title={'Medico T.'}
              content={study && study}
              text={study?.medico_tratante ? `${study?.medico_tratante?.nombres.length > 9
                ? study?.medico_tratante?.nombres.substring(0, 9) +
                "..."
                : study?.medico_tratante?.nombres
                }

                          ${study?.medico_tratante?.apellidos.length > 9
                  ? study?.medico_tratante?.apellidos.substring(
                    0,
                    3
                  ) + "..."
                  : study?.medico_tratante?.apellidos
                }` : 'Indefinido'}
            />
            <BadgeDetail
              title={'Especialidad'}
              content={study && study}
              text={study?.medico_tratante ? study?.medico_tratante?.especialidad : 'Indefinido'}
            />
            <BadgeDetail
              title={'Telefono'}
              content={study && study}
              text={study?.medico_tratante ? study?.medico_tratante?.telefono_celular : 'Indefinido'}
            />

          </WrapContentDetail>

          <Box mt={"10px"}>
            <Title title={"Información de estudio"} />
            <Separator
              marginTop={"8px"}
              width={"70%"}
              backgroundColor={"#89bbcc"}
              color={"#89bbcc"}
            ></Separator>
          </Box>


          <WrapContentDetail>
            <BadgeDetail
              title={'Estudio #'}
              content={detailMuestra && detailMuestra}
              text={detailMuestra?.codigo}
            />
            <BadgeDetail
              title={'Patologo'}
              content={detailMuestra && detailMuestra}
              text={detailMuestra?.patologo ? `${detailMuestra?.patologo?.nombres.length > 9
                ? detailMuestra?.patologo?.nombres.substring(0, 9) +
                "..."
                : detailMuestra?.patologo?.nombres
                }

                          ${detailMuestra?.patologo?.apellidos.length > 9
                  ? detailMuestra?.patologo?.apellidos.substring(
                    0,
                    3
                  ) + "..."
                  : detailMuestra?.patologo?.apellidos
                }` : 'Indefinido'}
            />
            <BadgeDetail
              title={'Tipo de estudio'}
              content={detailMuestra && detailMuestra}
              text={detailMuestra?.tipo}
            />
          </WrapContentDetail>


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
                disabled={historyMap ? false : true}
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
                disabled={detailMuestra?.adjuntos?.length > 0 ? false : true}
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

            {/* {editMode ? (
              <Box>
                {editMode ? (
                  <form onSubmit={formik2.handleSubmit}>
                    <Textarea
                      id="notas"
                      name="notas"
                      value={formik2.values.notas !== '' ? editedNotes : detailMuestra?.notas}
                      onChange={(e) => {
                        formik2.handleChange(e);
                        setEditedNotes(e.target.value);
                      }}
                      onBlur={formik2.handleBlur}
                      placeholder="Editar notas"
                    />
                    <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
                      <Button type="submit">Guardar cambios</Button>
                    </Box>
                  </form>
                ) : (
                  <Box
                    className="chakra-input-style"
                    onClick={() => setEditMode(true)}
                  >
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <p>{detailMuestra?.notas}</p>
                    </Box>
                  </Box>
                )}
              </Box> */}
            
              <Box>
                <Box
                  className="chakra-input-style"
                  onClick={() => {
                    setEditedNotes(detailMuestra?.notas); // Conservar el contenido existente al cambiar al modo de edición
                    setEditMode(true);
                  }}
                >
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <p>{detailMuestra?.notas}</p>
                  </Box>
                </Box>
                {/* <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
                  <Button isDisabled={true} onClick={() => {
                    handlePutStudies(); // Llamar a la función de actualización aquí
                    setEditMode(false); // Cambiar al modo de visualización después de guardar los cambios
                  }}>Guardar cambios</Button>
                </Box> */}
              </Box>
 
          </Grid>
          <Box display={"flex"} justifyContent={"flex-end"} my={"-27px"}>
            <GeneralButton text="Procesar" handleClick={formik.handleSubmit} />
          </Box>
        </>
      )
      }
    </Box >
  );
};
export default ModalRegistro;
