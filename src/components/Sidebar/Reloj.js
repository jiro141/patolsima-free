import { useEffect, useRef } from "react";

export  function Reloj() {
  const h1 = useRef();
  const ti = () => {
    const fechahora = new Date();
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return fechahora.toLocaleString("en-US", options);
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
export default Reloj;
