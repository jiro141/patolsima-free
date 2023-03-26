# Como correrlo con Docker

1. Instala Docker y Docker Compose.
2. Sigue los pasos para correr el repositorio `patolsima-api` en Docker (README.md de ese repo). Esto es necesario porque la configuracion de Docker de este repositorio es dependiente del repositorio de la API (para poder generar la red entre los contenedores llamada `frontend`).
3. En este repo ejecuta `docker compose build` para construir la imagen.
4. Luego de que la imagen esta lista puedes usar `docker compose up` para ejecutar el servidor web.

**Nota importante:** Cada vez que actualices un archito tendras que detener (Ctrl+C) el servidor de React y volver a ejectuar el paso 4 para que los cambios se compilen.

**Nota importante 2:** Cada vez que se a;ada una dependencia nueva (paquete) al repositorio se debe construir de nuevo la imagen de docker porque la configuracion de los paquetes no es persistente.

