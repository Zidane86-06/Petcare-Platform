# PawCare Spring Boot Backend

## Requirements

- Java 21+
- Maven 3.9+
- PostgreSQL running locally

## Database

Create the PostgreSQL database before starting the app:

```sql
CREATE DATABASE petcare_platform;
```

The connection is configured in `src/main/resources/application.properties`.

## Run

```powershell
cd D:\petcare-platform\login-demo\backend
mvn spring-boot:run
```

The API will run at:

```text
http://localhost:8081/api
```

## Frontend

In another terminal:

```powershell
cd D:\petcare-platform\login-demo\frontend
npm install
npm start
```

The React app uses `VITE_API_URL=http://localhost:8081/api` by default.

## Demo Login

- Admin: `admin@pawcare.com` / `admin123`
- User: `mia@pawcare.com` / `user123`
