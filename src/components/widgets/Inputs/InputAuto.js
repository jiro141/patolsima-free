import React, { useContext, useState, useEffect } from "react";
import {
  FormControl,
  Input,
  FormErrorMessage,
  List,
  ListItem,
  Box
} from "@chakra-ui/react";
import "../../../css/style.css";

export default function InputAuto({
  errors,
  type,
  onChange,
  placeholder,
  name,
  searchValue,
  loading,
  resultSearch,
  handleSelectSearch,
  selectSearch,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchValue === '') {
      setIsOpen(false);
    }
  }, [searchValue]);

  const handleItemClick = (index) => {
    handleSelectSearch(index);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <FormControl isInvalid={errors} mb={3}>
        <Input
          isRequired
          placeholder={placeholder}
          name={name}
          value={searchValue}
          onChange={onChange}
          onClick={handleInputClick}
        />
        {errors && (
          <>
            <FormErrorMessage>{errors}</FormErrorMessage>
          </>
        )}
        {isOpen && resultSearch.length > 0 ? (
          <div className="autocompleteBox" style={{ width:'100%', position: "absolute", zIndex: 10, backgroundColor: "white", padding:'10px' }}>
            <List spacing={3} color={"gray.500"}>
              {resultSearch.slice(0, 1).map((data, index) => {
                const value = data.ci_rif ? `${data.ci_rif}` : `${data.ci}`;
                return (
                  <ListItem key={index} color={"gray.500"} onClick={() => handleItemClick(index)}>
                    {value}
                  </ListItem>
                );
              })}
            </List>
          </div>
        ) : null}
      </FormControl>
    </div>
  );
}
