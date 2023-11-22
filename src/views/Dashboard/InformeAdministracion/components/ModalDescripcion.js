import { React, useContext, useState } from "react";
import {
  Box,
  Text,
  Grid,
  Select,
  Input,
  Button,
  Table, Thead, Tbody, Tr, Th, Td, Link
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
import { formatDate } from "helpers";
import InputOverall from "components/widgets/Inputs/InputOverall";
import EditButton from "components/widgets/Buttons/EditButton";
import '../../../../css/style.css'
import MainContext from "context/mainContext/MainContext";
import AddIHQModal from "components/widgets/Modals/AddIHQModal";


const ModalDescripcion = ({ titulo, idStudy, informeDetail, setShowModal, type, setInformeDetail, setShowModalGeneral, detailEstudio }) => {
  const [data, setdata] = useState([])
  const [dataResmicro, setdataResmicro] = useState('')
  const [History, setgetHistory] = useState([])
  const [enableEditResult, setEnableEditResult] = useState(false)
  const { setIdResultEdit, setIdStudyEdit } = useContext(MainContext)
  const [dataResultP, setdataResultP] = useState('')
  const [dataResultR, setdataResultR] = useState('')
  const [dataResultd, setdataResultd] = useState('')

  useEffect(() => {
    const getHistory = async () => {
      const getData = await HistoryInformes(idStudy)
      // console.log(getData);
      setgetHistory(getData)
    }
    getHistory()
  }, [])

  const handleEditResult = (idResult, idStudy, procedimiento, reaccion, observaciones) => {
    setIdResultEdit(idResult);
    setIdStudyEdit(idStudy);
    setdataResultP(procedimiento)
    setdataResultR(reaccion)
    setdataResultd(observaciones)
    setEnableEditResult(true)
  }
  const toggleModal = () => {
    setEnableEditResult(!enableEditResult)
  }

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
        // console.log('res bibli ->')
        // console.log(res)
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
        // console.log('res bibli ->')
        // console.log(res)
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
      if (type === 'anexos') {
        const newObj = {
          estudio: idStudy,
          anexos: data.data
        }
        const res = await updateInforme(idStudy, newObj)
        // console.log('res anexos ->')
        // console.log(res)
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
      if (type === 'muestra') {
        const newObj = {
          estudio: idStudy,
          anexos: data.data
        }
        const res = await updateInforme(idStudy, newObj)
        // console.log('res anexos ->')
        // console.log(res)
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
  // console.log(editorRef.current)
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
        <Box  >
          <Box minH={'280px'} maxH={'auto'}
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
                    config={{ ...{ patolsima_informe_id: idStudy }, ...CKEditorDefaultConfig }}
                    data={
                      informeDetail?.descripcion_microscopica === null ? ' ' :
                        informeDetail?.descripcion_microscopica || dataResmicro
                    }
                    onReady={(editor) => {

                      editorRef.current = editor;
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      // console.log(data);
                      setdata({ data })
                    }}
                  />

                </>
                :
                type === 'muestra' ?
                  <>
                    <CKEditor

                      editor={Editor}
                      config={{ ...{ patolsima_informe_id: idStudy }, ...CKEditorDefaultConfig }}
                      data={
                        informeDetail?.muestra_recibida === null ? ' ' :
                          informeDetail?.muestra_recibida || dataResmicro
                      }
                      onReady={(editor) => {

                        editorRef.current = editor;
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log(data);
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
                        // console.log('from other');
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
                            setdata({ data })
                          }}
                        /> : type === 'anexos' ?
                          <CKEditor
                            editor={Editor}
                            config={{ ...{ patolsima_informe_id: idStudy }, ...CKEditorDefaultConfig }}
                            data={
                              informeDetail?.anexos === null ? ' ' : informeDetail?.anexos
                            }
                            onReady={(editor) => {
                              console.log("CKEditor5 React Component is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
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
                                      <Td style={{ fontSize: '13.5px' }} >{item?.history_id}</Td>
                                      <Td style={{ fontSize: '13.5px' }} >{formatDate(item?.history_date)}</Td>
                                      <Td style={{ fontSize: '13.5px' }} >{item?.history_user}</Td>
                                      {/* <Td>{item?.history_type}</Td> */}
                                      <Td style={{ fontSize: '13.5px' }} >{item?.history_change_reason}</Td>
                                    </Tr>
                                  ))}
                                </Tbody>}
                              </Table>
                              : type === 'notas2' ?
                                <Table variant="striped" colorScheme="teal">
                                  <Thead>
                                    <Tr>

                                      <Th>Tipo de muestra</Th>
                                      <Th>Notas</Th>
                                    </Tr>
                                  </Thead>
                                  {detailEstudio && <Tbody>
                                    {detailEstudio.muestras.map((item) => (
                                      <Tr key={item?.id}>

                                        <Td style={{ fontSize: '13.5px' }} >{item?.tipo_de_muestra}</Td>
                                        <Td style={{ fontSize: '13.5px' }}>{item?.notas}</Td>

                                      </Tr>
                                    ))}
                                  </Tbody>}
                                </Table> : type === 'resultadosI' ?

                                  <Table variant="striped" colorScheme="teal">
                                    <Thead>
                                      <Tr>

                                        <Th>Procedimiento</Th>
                                        <Th>reaccion</Th>
                                        <Th>Diagnostico </Th>
                                        <Th> </Th>
                                      </Tr>
                                    </Thead>
                                    {informeDetail && <Tbody>
                                      {informeDetail?.resultados_inmunostoquimica.map((item) => (
                                        <Tr key={item?.id}>



                                          <Td style={{ fontSize: '13.5px' }} >


                                            {item.procedimiento}



                                          </Td>
                                          <Td style={{ fontSize: '13.5px' }} >{item.reaccion}</Td>
                                          <Td style={{ fontSize: '13.5px' }}>{item.diagnostico_observaciones}</Td>

                                          <Td style={{ fontSize: '13.5px' }}>
                                            <EditButton handleClick={() => handleEditResult(item.id, idStudy, item.procedimiento, item.reaccion, item.diagnostico_observaciones)} /></Td>

                                        </Tr>
                                      ))}
                                    </Tbody>}
                                  </Table> :

                                  ''

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
      <AddIHQModal showModal={enableEditResult} setEnableEditResult={setEnableEditResult} type={'edit'} toggleModal={toggleModal}
        dataResultP={dataResultP}
        setdataResultP={setdataResultP}
        dataResultR={dataResultR}
        dataResultd={dataResultd}
        idStudy={idStudy}
        setShowModalG={setShowModal}
      />
    </>
  );
}
export default ModalDescripcion;


