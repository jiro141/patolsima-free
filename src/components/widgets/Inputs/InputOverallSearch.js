import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function InputOverallSearch({locale, onChangeInformes,onChangeFacturas}) {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };
  return (
      <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1.6px solid ${isFocused ? "#137798" : "#ccc"}`,
        borderRadius: "4px",
        padding: "10px",
        transition: "border-color 0.3s ease",
        width:'60%'
      }}
    >
      <FaSearch style={{ marginRight: "10px", color: "#137798" }} />
      {locale==='/admin/Facturacion' ?
      <input
        type="text"
        placeholder="Buscar..."
        onChange={onChangeFacturas}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          width: "100%",
        }}
      />:

      <input
      type="text"
      placeholder="Buscar..."
      onChange={onChangeInformes}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        width: "100%",
      }}
    />
    
    }
    </div>
  )
}
