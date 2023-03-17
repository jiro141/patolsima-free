import { useEffect, useRef } from "react";

export  function Reloj() {
  const h1 = useRef();
  const ti = () => {
    const fechahora = new Date();
    const hora = fechahora.getHours();
    const minuto = fechahora.getMinutes();
    return `${hora}:${minuto}`;
  };
  
  useEffect(() => {
    const cl = setInterval(() => {
      h1.current.innerHTML = `${ti()}`;
    }, 1000);
    console.log("asd");
    return () => clearInterval(cl);
  }, []);
  console.log("asdsss");
  return (
    <div>
      <h1 ref={h1}>{ti()}</h1>
    </div>
  );
}
export default Reloj