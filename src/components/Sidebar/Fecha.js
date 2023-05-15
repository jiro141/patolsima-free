import { useEffect, useRef } from "react";

export  function Fecha() {
  const h1 = useRef();
  const ti = () => {
    const fechahora = new Date();
    const mes = fechahora.getMonth();
    const dia = fechahora.getDate();
    const ano = fechahora.getFullYear();
    
    return `${dia}/${mes+1}/${ano}`;
  };
  
  useEffect(() => {
    const cl = setInterval(() => {
      h1.current.innerHTML = `${ti()}`;
    }, 1000);
    return () => clearInterval(cl);
  }, []);
  return (
    <div>
      <h1 ref={h1}>{ti()}</h1>
    </div>
  );
}
export default Fecha