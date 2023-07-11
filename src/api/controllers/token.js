import Axios from "api/authApi";
import { handleLogout } from "components/Navbars/AdminNavbarLinks";
import { useHistory  } from "react-router-dom";

/*export async function handleTokenRefresh() {
  // Verificar si hay un token de acceso almacenado en el LocalStorage
  const access_token = localStorage.getItem("access");
//   console.log(access_token);

  if (access_token) {
    // Obtener la fecha de expiración del token de acceso almacenada en el LocalStorage
    const expirationTime = localStorage.getItem("accessExpiration");

    if (expirationTime && Date.now() < Number(expirationTime)) {
      // El token de acceso todavía es válido, no es necesario hacer nada
    //   console.log("Token de acceso válido");
    } else {
      // El token de acceso ha expirado, intentar obtener un nuevo token de refresco
    //   console.log("Token de acceso expirado");

      const refresh_token = localStorage.getItem("refresh");

      if (refresh_token) {
        try {
          // Enviar una solicitud al endpoint '/token/refresh' para obtener un nuevo token de acceso
          const response = await Axios.post("/token/refresh", {
            refresh_token,
          });
          console.log(response);

          const new_access_token = response.data.access_token;
          const new_refresh_token = response.data.refresh_token;

          // Guardar el nuevo token de acceso y el nuevo token de refresco en el LocalStorage
          localStorage.setItem("access", new_access_token);
          localStorage.setItem("refresh", new_refresh_token);

          // Calcular y guardar la nueva fecha de expiración del token de acceso en el LocalStorage
          const new_access_expiration =
            Date.now() + 2 * 60 * 60 * 1000; // Tiempo actual + 2 horas
          localStorage.setItem(
            "accessExpiration",
            new_access_expiration.toString()
          );

          console.log("Nuevo token de acceso obtenido");
        } catch (error) {
          console.error(
            "Error al obtener un nuevo token de acceso:",
            error
          );
        }
      } else {
        // console.error(
        //   "No se encontró el token de refresco en el LocalStorage"
        // );
      }
    }
  } else {
    console.error("No se encontró el token de acceso en el LocalStorage");
  }
}*/


export const handleTokenRefresh=async()=>{
  console.log('entrada ')
  const history= useHistory();

  const fetchRefreshToken= async () => {
   console.log('funcionnn ')
    const refresh =  window.localStorage.getItem("refresh");
    try {
      const response = await Axios.post('/token/refresh/',{refresh}); 
      //console.log(response.data.access)
       window.localStorage.setItem('newAcessToken', response.data.access);     
    } catch (error) {
      console.log(error);
    }
  };
  fetchRefreshToken();

//time : 2 * 60 * 60 * 1000
  const interval = setInterval(() => {
   
    fetchRefreshToken();
    //handleLogout()
   // window.localStorage.removeItem('access')
  // window.localStorage.removeItem('refresh')
   //history.push("/Auth/SignIn");
   //history.push("/Auth/SignIn");
  console.log('ejecutaanddo')
  },5000);
  
 
  return () => clearInterval(interval);
}