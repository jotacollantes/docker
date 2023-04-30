# Para descargar una imagen desde docker-hub:
docker pull hello-world
# Para correr la imagen en un contenedor:
docker container run hello-world

# Para hace un listado de todos los contenedores
docker container ls -a
# Para borrar todos los contenedores detenidos:
docker container prune 
# Para borrar los contenedores por id:
docker container rm 730fc4d9df16

# Para borrar una imagen en especifico
docker image rm feb5d9fea6a5

# Para caorrer un contenedor de forma detach (liberla la consola) haciendo binding del puerto 80 del equipo con el puerto 80 del contenedor;
docker container run -d -p 80:80 docker/getting-started

# Para hacer stop del container
docker container stop <container-id>

# Para correr un contenedor con start
docker container start <container-id>

# Para eliminar un contenedor que esta en ejecucion o de manera forzada:
docker container rm -f <container-id>

# Para Descargar Postgres
docker pull postgres

# Para Correr el contenedor de Postgres con varables de entorno, de forma detach y publicacion de puerto:
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -dp 5432:5432 postgres

# Mismo Comando pero multilinea:
docker container run --name postgres-alpha -e POSTGRES_PASSWORD=mypass1 -dp 5432:5432 postgres

# Para ejecutar otra instancia se necesita cambiar de nombre al contenedor y cambiar solo el puerto local
docker container run \
--name postgres-beta \ 
-e POSTGRES_PASSWORD=mypass1 \
-dp 5433:5432 \
postgres:14-alpine3.17

# Para correr mariadb:
docker container run --name mariadb-alpha -e MARIADB_RANDOM_ROOT_PASSWORD=yes -dp 3306:3306 mariadb:jammy

# Para ver los logs
docker container logs <container-id>

# Para dar seguimiento a los contenedores:
docker container logs --follow <container-id>

# Para correr mariadb con varias variables de entorno:
docker container run --name world-db -e MARIADB_USER=jota -e MARIADB_PASSWORD=123123123 -e MARIADB_ROOT_PASSWORD=mypass1 -e MARIADB_DATABASE=world-db -dp 3306:3306 mariadb:jammy

# Para crear un volumen
docker volume create world-db

# para ver la lista de volumenes
docker volume ls

# para ver la informacion a detalle de un volumen
docker volume inspect world-db

# Para correr mariadb con varias variables de entorno y que los datos sean persistente en un volumen:
# -v world-db(Filesystem local):/var/lib/mysql(Filesystem del contenedor)
docker container run --name world-db -e MARIADB_USER=jota -e MARIADB_PASSWORD=123123123 -e MARIADB_ROOT_PASSWORD=mypass1 -e MARIADB_DATABASE=world-db -dp 3306:3306 -v world-db:/var/lib/mysql mariadb:jammy


# Para Descargar phpmyadmin:5.2.0-apache
docker pull phpmyadmin:5.2.0-apache
# Usage with arbitrary server
docker run --name phpmyadmin -d -e PMA_ARBITRARY=1 -p 8080:80 phpmyadmin:5.2.0-apache

# Para ver las redes en docker
docker network ls

# Para crear una red en docker
docker network create world-app

# Para conectar un contenedor a una red
docker network connect world-app <container-id>

# para inspeccionar una red
docker network inspect world-app

# Para asignar el network desde el inicio
docker container run --name world-db -e MARIADB_USER=jota -e MARIADB_PASSWORD=123123123 -e MARIADB_ROOT_PASSWORD=mypass1 -e MARIADB_DATABASE=world-db -dp 3306:3306 -v world-db:/var/lib/mysql --network world-app mariadb:jammy

docker run --name phpmyadmin -d -e PMA_ARBITRARY=1 -p 8080:80 --network world-app phpmyadmin:5.2.0-apache


# Para crear un contenedor mapeando el working directory del host con una carpeta en especifico del contenedor en este caso /app.
# -w /app especifico el directorio dentro del contenedor
# -v "$(pwd)":/app hago el binding volume del directorio actual donde se ecuentra ubicado dentro de la terminal en el host local hacia el directorio /app del contenedor
# node:16-alpine3.16 Imagen a descargar 
# sh -c "yarn install && yarn start:dev" una vez montado el contenedor se ejecuta los comandos

docker container run --name nest-app -w /app -dp 80:3000 -v "$(pwd)":/app node:16-alpine3.16 sh -c "yarn install && yarn start:dev"


# Para entrar a una terminal interactiva de un contenedor
docker exec -it <container-id> /bin/sh


# para levantar un archivo .yaml
# Ubicado en el path donde esta el archivo
docker compose up
# De manera detach
docker compose up -d

# para remover contenedores y volumes creado en el docker compose
docker compose down
# Para ver los logs
docker compose logs -f

# Para crear una imagen, el comando se debe de ejecutar donde esta guardado el Dockerfile. El . significa que el Dockerfile se encuentra grabado donde se esta ejecutando el comando
docker build --tag cron-ticker .

# Para renombrar el tag de una imagen
# docker image source<imagen:tag> destino<imagen:tag>
docker image tag cron-ticker:1.0.0 cron-ticker:bufalo
# Si no se especifica el :latest se asume esto
docker image tag cron-ticker jotacollantes/cron-ticker:tagname

# Para crear una sesion en Docker hub
docker login

# Para subir una imagen a docker hub
docker push jotacollantes/cron-ticker:mapache


# Para crear imagenes compatibles en multiples plataformas
# Para ver los constructores
docker buildx ls


# Para crear un builder
docker buildx create --name mybuilder --driver docker-container --bootstrap

# Para hacer swith al nuevo builder
docker buildx use mybuilder

# Para inspeccionar el buildx
docker buildx inspect

# Para crear una imagen usando las arquitecturas especificadas en --platform
# Primera linea en el docker file: FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16
# El mismo comando sirve si la primera linea es FROM node:19.2-alpine3.16 osea sin el --platform
docker buildx build --platform linux/amd64,linux/arm64 -t jotacollantes/cron-ticker:latest --push .

# para borrar un builder primero hay que pasarse a otro
docker buildx use default

# para borrar un builder
docker buildx rm mybuilder 
