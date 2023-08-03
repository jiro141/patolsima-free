import React, { useContext } from "react";
import {
  Link,
  Box,
  Center,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";
import { formatDate } from "helpers";
import MainContext from "context/mainContext/MainContext";

export function TH({ thData }) {
  return (
    <Tr>
      {thData.map((item, index) => (
        <Th borderRadius="none"
          borderBottom="3px solid"
          borderBottomColor={"gray.500"}
          textAlign="center"

          key={index}
        >
          {item.value}</Th>
      ))}
    </Tr>
  );
}
export function TR({
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
  // title = "pruebas",
}) {
  return (
    <Tbody >
      {tBodyData &&
        tBodyData?.map((pacients) => (
          <Tr key={pacients.id}>
            <Link
              paddingX={"10px"}
              as="td"
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.nombres}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.apellidos}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.ci}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.telefono_celular}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.email}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() =>
                handleSelectIcon(pacients)
              }
            >
              <BsFillTrashFill color="#137797" />
            </Link>
          </Tr>
        ))}
    </Tbody>
  );
}
export function TRM({
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
  // title = "pruebas",
}) {
  return (
    <Tbody >
      {tBodyData &&
        tBodyData?.map((medics) => (
          <Tr key={medics.id}>
            <Link
              paddingX={"10px"}
              as="td"
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.nombres}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.apellidos}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.especialidad}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.telefono_celular}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.email}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() =>
                handleSelectIcon(medics)
              }
            >
              <BsFillTrashFill color="#137797" />
            </Link>
          </Tr>
        ))}
    </Tbody>
  );
}
export function TRF({
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
  // title = "pruebas",
}) {
  const { setidSelectItem, setEnablefactModalDetails } = useContext(MainContext)
  console.log(tBodyData);
  const handleClickItem = (bills) => {
    console.log('cliking items');
    setidSelectItem(bills)
    setEnablefactModalDetails(true)
  }
  return (
    <Tbody >
      {tBodyData &&
        tBodyData?.map((bills) => (
          <Tr key={bills.id}>
            <Link
              paddingX={"10px"}
              as="td"
              style={{ width: '15%' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              textAlign={'center'}
              onClick={() => handleClickItem(bills)}
            >
              {formatDate(bills.fecha_recepcion)}

            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              style={{ width: '15%' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              textAlign={'center'}
              onClick={() => handleClickItem(bills)}
            >
              {bills.fecha_impresion ? formatDate(bills.fecha_impresion) : ''}
            </Link>
            <Link
              //paddingX={"10px"}
              as="td"
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleClickItem(bills)}
            >
              {bills.cliente.razon_social.length > 17 ? bills.cliente.razon_social.substring(0, 17) + '...' : bills.cliente.razon_social}
            </Link>
            <Link
              // paddingX={"10px"}
              as="td"
              // style={{ width: '15%' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              textAlign={'center'}
              onClick={() => handleClickItem(bills)}
            >
              {bills.cliente.ci_rif}
            </Link>

            <Link
              paddingX={"10px"}
              as="td"
              style={{ width: '15%' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              textAlign={'center'}
              onClick={() => handleClickItem(bills)}
            >
              {bills.total_usd}

            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              style={{ width:'15%' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              textAlign={'center'}
              onClick={() => handleClickItem(bills)}
            >
              {bills.total_bs}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() =>

                handleSelectIcon(bills)
              }
            >
              <BsFillTrashFill color="#137797" />
            </Link>
          </Tr>
        ))}
    </Tbody>
  );
}

export function TRI({
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
  // handleClickItem
  // title = "pruebas",
}) {
  const { setSelectInfor, setEnableInforModalDetails } = useContext(MainContext)
 // console.log(tBodyData);

  console.log(tBodyData);
  const handleClickItem = (bills) => {
    console.log('cliking items informes');
    setSelectInfor(bills)
    setEnableInforModalDetails(true)
  }
  return (
    <Tbody >
      {tBodyData &&
        tBodyData?.map((bills) => (
          <Tr key={bills.id}>
            <Link
              paddingX={"10px"}
              as="td"
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.estudio_id)}
              fontSize={'14px'}
            >
              {bills.estudio_codigo}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              style={{ fontSize: '13px' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.estudio_id)}
              fontSize={'14px'}
            >
              {formatDate(bills.created_at)}

            </Link>
            <Link
              //paddingX={"10px"}
              as="td"
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.estudio_id)}
              fontSize={'14px'}
            >

              {bills?.estudio_paciente_name.length > 10
                ? bills?.estudio_paciente_name.substring(0, 15) + "..."
                : bills?.estudio_paciente_name}
            </Link>
            <Link
              // paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.estudio_id)}
              fontSize={'14px'}
            >
              {bills.estudio_paciente_ci}
            </Link>


            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.estudio_id)}
              fontSize={'14px'}
            >
              {bills.estudio_tipo}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.estudio_id)}
              fontSize={'14px'}
            >
              {bills.estudio_patologo_name}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
             /* onClick={() =>
                handleSelectIcon(bills)
              }*/
            >
             {/* <BsFillTrashFill color="#137797" />*/}
            </Link>
          </Tr>
        ))}
    </Tbody>
  );
}



export function TABLE_PACIENTS({
  thData,
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
}) {
  return (
    <Table variant="simple">
      <Thead>
        <TH thData={thData} />
      </Thead>

      <TR
        tBodyData={tBodyData}
        handleSelectTBody={handleSelectTBody}
        handleSelectIcon={handleSelectIcon}
      />

    </Table>
  );
}

export function TABLE_MEDICOS({
  thData,
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
}) {
  return (
    <Table variant="simple">
      <Thead>
        <TH thData={thData} />
      </Thead>
      <TRM
        tBodyData={tBodyData}
        handleSelectTBody={handleSelectTBody}
        handleSelectIcon={handleSelectIcon}
      />

    </Table>
  );
}

export function TABLE_FACTURAS({
  thData,
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
  setAbonarSend
}) {
  return (
    <Table variant="simple">
      <Thead>
        <TH thData={thData} />
      </Thead>
      <TRF
        tBodyData={tBodyData}
        handleSelectTBody={handleSelectTBody}
        handleSelectIcon={handleSelectIcon}
        setAbonarSend={setAbonarSend}
      />
    </Table>
  );
}

export function TABLE_INFORMES({
  thData,
  tBodyData,
  handleSelectTBody,
  handleSelectIcon,
}) {
  return (
    <Table variant="simple">
      <Thead>
        <TH thData={thData} />
      </Thead>
      <TRI
        tBodyData={tBodyData}
        handleSelectTBody={handleSelectTBody}
        handleSelectIcon={handleSelectIcon}
      />
    </Table>
  );
}


