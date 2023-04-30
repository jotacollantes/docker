# 1. Crear volumen para hacer persistente la BD

docker volume create postgres-db

# 2. Montar la imagen de postgres así
docker container run -d --name postgres-db -e POSTGRES_PASSWORD=123456 -v postgres-db:/var/lib/postgresql/data postgres:15.1

# 3. Tomar pgAdmin de aquí
docker container run --name pgAdmin -e PGADMIN_DEFAULT_PASSWORD=123456 -e PGADMIN_DEFAULT_EMAIL=superman@google.com -dp 8080:80 dpage/pgadmin4:6.17

# 4. Crear red
docker network create postgres-net

# 5. Conectar ambos contenedores
docker network connect postgres-net <container-id-postgres>
docker network connect postgres-net <container-id-pgadmin>

# 6, Para verificar network configurada con los contenedores
docker network inspect postgres-net