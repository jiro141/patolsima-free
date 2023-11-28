import React, { useState } from "react";
import {
    FormControl,
    Input,
    FormErrorMessage,
    List,
    ListItem,
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
    setsearchci,
}) {
    console.log(resultSearch, ' valor de ci');
    // Estado local para controlar la visibilidad del list item
    const [isListItemVisible, setIsListItemVisible] = useState(true);

    const handleListItemClick = (index) => {
        // Realiza la acción deseada al hacer clic en el ListItem, como seleccionar o manipular datos
        handleSelectSearch(index);

        // Oculta el ListItem después de hacer clic
        setIsListItemVisible(false);
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
                />
                {errors && (
                    <>
                        <FormErrorMessage>{errors}</FormErrorMessage>
                    </>
                )}
                {resultSearch.length > 0 && isListItemVisible ? (
                    <div className="autocompleteBox" style={{ width: '100%', position: "absolute", zIndex: 10, backgroundColor: "white", padding: '10px' }}>
                        <List spacing={3} color={"gray.500"}>
                            {resultSearch.slice(0, 1).map((data, index) => {
                                return (
                                    <ListItem key={index} color={"gray.500"} onClick={() => handleListItemClick(index)}>
                                        {data.ci_rif ? `${data.ci_rif}` : `${data.ci}`}
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
