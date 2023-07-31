import { React, useState } from "react";
import {
  Box,
  Text,
  Grid,
  Select,
  Input,
  Button,
  Table, Thead, Tbody, Tr, Th, Td
} from "@chakra-ui/react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor, { ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import CKEditorDefaultConfig from "api/ckeditor/ckeditorconfig";
import SaveButton from "components/widgets/Buttons/SaveButton";
import GeneralButton from "components/widgets/Buttons/GeneralButton";
import { updateInforme } from "api/controllers/informes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getInformesDetail } from "api/controllers/informes";
import { useEffect } from "react";
import { HistoryInformes } from "api/controllers/informes";
import { useRef } from "react";
import { postInformes } from "api/controllers/informes";


const ModalDescripcion = ({ titulo, idStudy, informeDetail, setShowModal, type, setInformeDetail, setShowModalGeneral, detailEstudio }) => {
  const [data, setdata] = useState([])
  const [dataResmicro, setdataResmicro] = useState('')
  const [History, setgetHistory] = useState([])

  useEffect(() => {
    const getHistory = async () => {
      const getData = await HistoryInformes(idStudy)
      console.log(getData);
      setgetHistory(getData)
    }
    getHistory()
  }, [])

  const handleSubmitData = async () => {


    if (type === 'create') {
      if (type === 'micro') {
        const newObj = {
          estudio: idStudy,
          descripcion_microscopica: data.data
        }
        const res = await postInformes(idStudy, newObj)
        if (res) {
          toast.success("¡El informe se ha creado con exito!", {
            autoClose: 1000,
          });
          setdataResmicro(res?.descripcion_microscopica)
          //setdata(res?.descripcion_microscopica)
          // setInformeDetail('')
          setShowModalGeneral(false)
          // setShowModal(false)
        } else {
          toast.error("¡Hubo un error al crear el informe!", {
            autoClose: 1000,
          });
        }
      }
      if (type === 'macro') {
        const newObj = {
          estudio: idStudy,
          descripcion_macroscopica: data.data
        }
        const res = await postInformes(idStudy, newObj)
        if (res) {
          toast.success("¡El informe se ha creado con exito!", {
            autoClose: 1000,
          });
          setShowModalGeneral(false)
          //setShowModal(false)
        } else {
          toast.error("¡Hubo un error al crear el informe!", {
            autoClose: 1000,
          });
        }
      }
      if (type === 'diag') {
        const newObj = {
          estudio: idStudy,
          diagnostico: data.data
        }
        const res = await postInformes(idStudy, newObj)
        if (res) {
          toast.success("¡El informe se ha creado con exito!", {
            autoClose: 1000,
          });
          setShowModalGeneral(false)
          // setShowModal(false)
        } else {
          toast.error("¡Hubo un error al crear el informe!", {
            autoClose: 1000,
          });
        }
      }
      if (type === 'notas') {
        const newObj = {
          estudio: idStudy,
          notas: data.data
        }
        const res = await postInformes(idStudy, newObj)
        if (res) {
          toast.success("¡El informe se ha creado con exito!", {
            autoClose: 1000,
          });
          setShowModalGeneral(false)
          //setShowModal(false)
        } else {
          toast.error("¡Hubo un error al crear el informe!", {
            autoClose: 1000,
          });
        }
      }
      if (type === 'bibli') {
        const newObj = {
          estudio: idStudy,
          bibliografia: data.data
        }
        const res = await postInformes(idStudy, newObj)
        console.log('res bibli ->')
        console.log(res)
        if (res) {
          toast.success("¡El informe se ha creado con exito!", {
            autoClose: 1000,
          });
          setShowModalGeneral(false)
          //setShowModal(false)
        } else {
          toast.error("¡Hubo un error al crear el informe!", {
            autoClose: 1000,
          });
        }
      }
    } else {
      if (type === 'micro') {
        const newObj = {
          estudio: idStudy,
          descripcion_microscopica: data.data
        }
        const res = await updateInforme(idStudy, newObj)
        if (res) {
          toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setdataResmicro(res?.descripcion_microscopica)
          //setdata(res?.descripcion_microscopica)
          // setInformeDetail('')
          setShowModalGeneral(false)
          // setShowModal(false)
        } else {
          toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
        }
      }
      if (type === 'macro') {
        const newObj = {
          estudio: idStudy,
          descripcion_macroscopica: data.data
        }
        const res = await updateInforme(idStudy, newObj)
        if (res) {
          toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModalGeneral(false)
          //setShowModal(false)
        } else {
          toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
        }
      }
      if (type === 'diag') {
        const newObj = {
          estudio: idStudy,
          diagnostico: data.data
        }
        const res = await updateInforme(idStudy, newObj)
        if (res) {
          toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModalGeneral(false)
          // setShowModal(false)
        } else {
          toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
        }
      }
      if (type === 'notas') {
        const newObj = {
          estudio: idStudy,
          notas: data.data
        }
        const res = await updateInforme(idStudy, newObj)
        if (res) {
          toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModalGeneral(false)
          //setShowModal(false)
        } else {
          toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
        }
      }
      if (type === 'bibli') {
        const newObj = {
          estudio: idStudy,
          bibliografia: data.data
        }
        const res = await updateInforme(idStudy, newObj)
        console.log('res bibli ->')
        console.log(res)
        if (res) {
          toast.success("¡El informe se ha actualizado con exito!", {
            autoClose: 1000,
          });
          setShowModalGeneral(false)
          //setShowModal(false)
        } else {
          toast.error("¡Hubo un error al actualizar el informe!", {
            autoClose: 1000,
          });
        }
      }
    }

  }

  useEffect(() => {
    //setInformeDetail('')
    const getDta = async () => {
      const res = await getInformesDetail(idStudy)
      setdataResmicro(res.descripcion_macroscopica
      );
    }
    getDta()
    return () => { }
  }, [data])

  //console.log(dataResmicro);

  const editorRef = useRef();
  console.log(editorRef.current)
  const editorConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'bulletedList',
        'numberedList',
        'imageInsert',
        'blockQuote',
        'undo',
        'redo',
      ],
    },
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:inline', 'imageStyle:block', 'linkImage'],
    },
  };
  return (
    <>
      <Box marginTop={'-50px'}  >
        <Text margin={'10px'} color={'gray.900'} fontSize={'20px'}>{titulo}</Text>
        <Box height={'md'} >
          <Box minH={'400px'} maxH={'200px'}
            sx={{
              "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
            overflowY="scroll">
            {
              type === 'micro' ?
                <>
                  <CKEditor

                    editor={Editor}
                    config={{ ...{ patolsima_informe_id: idStudy },...CKEditorDefaultConfig }}
                    data={
                      informeDetail?.descripcion_microscopica === null ? ' ' :
                        informeDetail?.descripcion_microscopica || dataResmicro
                    }
                    onReady={(editor) => {

                      editorRef.current = editor;
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(data);
                      setdata({ data })
                    }}
                  />

                </>


                : type === 'macro' ?
                  <CKEditor
                    editor={Editor}
                    config={{ ...{ patolsima_informe_id: idStudy }, ...CKEditorDefaultConfig }}
                    data={
                      informeDetail?.descripcion_macroscopica === null ? ' ' : informeDetail?.descripcion_macroscopica
                    }
                    onReady={(editor) => {
                      console.log("CKEditor5 React Component is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log('from other');
                      setdata({ data })
                    }}
                  /> : type === 'diag' ?
                    <CKEditor
                      editor={Editor}
                      config={{ ...{ patolsima_informe_id: idStudy }, ...CKEditorDefaultConfig }}
                      data={
                        informeDetail?.diagnostico === null ? ' ' : informeDetail?.diagnostico
                      }
                      onReady={(editor) => {
                        console.log("CKEditor5 React Component is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log('from other');
                        setdata({ data })
                      }}
                    /> : type === 'notas' ?
                      <CKEditor
                        editor={Editor}
                        config={{ ...{ patolsima_informe_id: idStudy }, ...CKEditorDefaultConfig }}
                        data={
                          informeDetail?.notas === null ? ' ' : informeDetail?.notas
                        }
                        onReady={(editor) => {
                          console.log("CKEditor5 React Component is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          console.log('from other');
                          setdata({ data })
                        }}
                      /> : type === 'bibli' ?
                        <CKEditor
                          editor={Editor}
                          config={{ ...{ patolsima_informe_id: idStudy }, ...CKEditorDefaultConfig }}
                          data={
                            informeDetail?.bibliografia === null ? ' ' : informeDetail?.bibliografia
                          }
                          onReady={(editor) => {
                            console.log("CKEditor5 React Component is ready to use!", editor);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log('from other');
                            setdata({ data })
                          }}
                        /> : type === 'register' ?

                          <Table variant="striped" colorScheme="teal">
                            <Thead>
                              <Tr>
                                <Th>ID</Th>
                                <Th>Fecha</Th>
                                <Th>Usuario</Th>
                                {/* <Th>Tipo</Th> */}
                                <Th>Descripción</Th>
                              </Tr>
                            </Thead>
                            {History && <Tbody>
                              {History.map((item) => (
                                <Tr key={item?.history_id}>
                                  <Td >{item?.history_id}</Td>
                                  <Td>{new Date(item?.history_date).toLocaleString()}+</Td>
                                  <Td>{item?.history_user}</Td>
                                  {/* <Td>{item?.history_type}</Td> */}
                                  <Td>{item?.history_change_reason}</Td>
                                </Tr>
                              ))}
                            </Tbody>}
                          </Table>
                          : type === 'notas2' ?
                            <Table variant="striped" colorScheme="teal">
                              <Thead>
                                <Tr>

                                </Tr>
                              </Thead>
                              {detailEstudio && <Tbody>
                                {detailEstudio.muestras.map((item) => (
                                  <Tr key={item?.id}>
                                    <Td >{item?.notas}</Td>

                                  </Tr>
                                ))}
                              </Tbody>}
                            </Table> : ''

            }
          </Box>
        </Box>
      </Box>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', border: '0px solid', width: '95%', marginBottom: '20px' }}>

        {type === 'register' || type === 'notas2' ?

          <></> :

          <SaveButton handleSubmit={handleSubmitData} />
        }
      </div>
    </>
  );
}
export default ModalDescripcion;


