import React from "react";
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

export function TH({ thData }) {
  console.log(thData)
  return (
    <Tr >
          {thData.map((item, index) => (
            <Th   borderRadius="none"
            
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
