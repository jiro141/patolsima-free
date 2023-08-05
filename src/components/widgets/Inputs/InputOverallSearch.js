import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function InputOverallSearch({locale, onChangeInformes,onChangeFacturas,onChangeInformesP,onChangelistInformesP}) {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };
  return (
      <div
      className='div-estilo'
      style={{
      
        border: `1.6px solid ${isFocused ? "#137798" : "#ccc"}`,
       
      }}
    >
      <FaSearch style={{ marginRight: "10px", color: "#137798" }} />
      {locale==='/admin/Facturacion' ?
      <input
        type="text"
        placeholder="Buscar ..."
        onChange={onChangeFacturas}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className='input-estilo '
      />: locale==='/admin/RegistroPatologo' ?
      <input
      type="text"
      placeholder="Buscar ..."
      onChange={onChangeInformesP}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className='input-estilo '
      id="miInput"
    />: locale==='/admin/Informe' ?
    <input
    type="text"
    placeholder="Buscar..."
    onChange={onChangelistInformesP}
    onFocus={handleFocus}
    onBlur={handleBlur}
    className='input-estilo '
  />:

      <input
      type="text"
      placeholder="Buscar..."
      onChange={onChangeInformes}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className='input-estilo '
    />
    
    }
    </div>
  )
}
