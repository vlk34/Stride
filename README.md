## Run backend
```
.\mvnw.cmd spring-boot:run
```
## Create JAR
```
.\mvnw.cmd clean package
```

## .env template for backend
```
SECRET=token
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stride
DB_USER=user
DB_PASSWORD=password
REDIS_ENABLE=true
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_EXPIRE=60
```
