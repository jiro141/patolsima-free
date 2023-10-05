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
          fontSize={{ lg: "12px", sm: '11px', md: '12px' }}
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
          <Tr key={pacients.id} style={{ fontSize: '13.5px' }}>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.nombres}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.apellidos}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.ci}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.telefono_celular}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(pacients)}
            >
              {pacients.email}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
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
          <Tr key={medics.id}  >
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.nombres}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.apellidos}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.especialidad}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.telefono_celular}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(medics)}
            >
              {medics.email}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
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
  // console.log(tBodyData);
  const handleClickItem = (bills) => {
    // console.log('cliking items');
    setidSelectItem(bills)
    setEnablefactModalDetails(true)
  }
  return (
    <Tbody >
      {tBodyData &&
        tBodyData?.map((bills) => (
          <Tr key={bills.id}>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
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
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
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
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleClickItem(bills)}
            >
              {bills.cliente.razon_social.length > 17 ? bills.cliente.razon_social.substring(0, 17) + '...' : bills.cliente.razon_social}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
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
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
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
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
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
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
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

  // console.log(tBodyData);
  const handleClickItem = (bills) => {
    // console.log('cliking items informes');
    setSelectInfor(bills)
    setEnableInforModalDetails(true)
  }
  // console.log(tBodyData, 'hola tbody');
  return (

    <Tbody >
      {tBodyData &&
        tBodyData?.map((bills) => (
          <Tr key={bills.id} >
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"

              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.id ? bills.id : bills.estudio_id)}
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
            >
              {bills.codigo ? bills.codigo : bills.estudio_codigo}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              //style={{ fontSize: '13px' }}
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.id ? bills.id : bills.estudio_id)}
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
            >
              {formatDate(bills.created_at)}

            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              // margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.id ? bills.id : bills.estudio_id)}
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
            >

              {bills?.paciente ? ((bills?.paciente.nombres > 5 + bills?.paciente.apellidos.length > 5) ? (bills?.paciente.nombres + ' ' + bills?.paciente.apellidos.substring(0, 5) + "...")
                : bills?.paciente.nombres + ' ' + bills?.paciente.apellidos) : bills?.estudio_paciente_name.length > 10
                ? bills?.estudio_paciente_name.substring(0, 15) + "..."
                : bills?.estudio_paciente_name}
            </Link>
            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.id ? bills.id : bills.estudio_id)}
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
            >
              {bills?.paciente ? bills?.paciente.ci : bills?.estudio_paciente_ci}
            </Link>


            <Link
              paddingX={{ lg: "10px", sm: '0px', md: '10px' }}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.id ? bills.id : bills.estudio_id)}
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
            >
              {bills.tipo ? bills.tipo : bills.estudio_tipo}
            </Link>
            <Link
              paddingX={"10px"}
              as="td"
              margin={"10px"}
              borderRadius="none"
              borderBottom="1px solid"
              borderBottomColor="gray.500"
              onClick={() => handleSelectTBody(bills.id ? bills.id : bills.estudio_id)}
              fontSize={{ sm: '11.5px', lg: '14px', md: '14px' }}
            >
              {bills.patologo ? (bills.patologo.nombres + ' ' + bills.patologo.apellidos) : bills.estudio_patologo_name}
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

export function WrapTables({ children }) {
  return (
    <Box
      width={"100%"}
      maxH={"400px"}
      overflowY={"auto"}
      sx={{
        "&::-webkit-scrollbar": {
          height: '8px',
          width: "8px", // Ancho del scroll
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#89bbcc",
          height: '8px',
          width: "8px", // Ancho del scroll
          borderRadius: "5px", // Color del scroll
        },
      }}
    >{children}</Box>
  )
}


