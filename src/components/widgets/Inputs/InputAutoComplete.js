import React from "react";
import { FormControl, Input, FormErrorMessage,List,ListItem, Box} from "@chakra-ui/react";
import '../../../css/style.css'

export default function InputAutoComplete({
  errors,
  type,
  onChange,
  placeholder,
  name,
  searchValue,
  loading,
  resultSearch,
  handleSelectSearch,
  selectSearch
}) {
  //console.log(resultSearch[0].nombres)
  return (
    <div>
 <FormControl isInvalid={errors} mb={3}>
      <Input
      defaultValue={'25841893'}
        isRequired
        placeholder={placeholder}
        type={"number"}
        name={name}
        value={searchValue}
        onChange={onChange}
      />
      {errors && (
        <>
          <FormErrorMessage>{errors}</FormErrorMessage>
        </>
      )}

{resultSearch  && !selectSearch && 
        resultSearch?.length > 0
        ?
       <div  className="autocompleteBox" onClick={handleSelectSearch}>
        <List spacing={3}  color={"gray.500"}>
            {resultSearch.map((data,index)=>{
                return(
                    <ListItem  color={"gray.500"}>
   
                    {`${data.ci}`}
                  </ListItem>
                )
            })}
 

  
</List>
       </div>

        : ''
      }
     
    </FormControl>

  
    </div>
   
  );
}
