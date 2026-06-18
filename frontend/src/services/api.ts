import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
});

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Nao foi possivel conectar com a API. Confirme se ela esta rodando em http://localhost:8080.';
    }

    const detail = error.response.data?.detail ?? error.response.data?.title;
    if (typeof detail === 'string') {
      return detail;
    }

    if (error.response.status === 400) {
      return 'Algum campo foi recusado pela API. Revise os valores informados.';
    }
  }

  return 'Ocorreu um erro inesperado.';
}
