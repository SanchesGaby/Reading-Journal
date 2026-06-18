# Reading Journal

Aplicacao full stack para diario de leitura com visual de scrapbook.

## Stack

- Frontend: React, TypeScript, Vite, Material UI, Axios, react-pageflip
- Backend: ASP.NET Core 8, API REST em memoria, Swagger
- Infra: Dockerfiles para frontend/backend e `docker-compose.yml`

Os dados ficam em memoria para facilitar a demonstracao do projeto. Ao reiniciar a API, as paginas cadastradas sao limpas.

## Rodando com Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger

## Rodando localmente

Backend:

```bash
cd backend/ReadingJournal.Api
dotnet restore
dotnet run --urls http://localhost:8080
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Crie `frontend/.env` a partir de `.env.example` se precisar mudar a URL da API.
