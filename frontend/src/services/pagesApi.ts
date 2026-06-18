import { api } from './api';
import type { ImageUrlPayload, PageDetails, PageImage, PageListItem, PagePayload, Quote, QuotePayload } from '../types/page';

export async function getPages() {
  const { data } = await api.get<PageListItem[]>('/pages');
  return data;
}

export async function getPage(id: string) {
  const { data } = await api.get<PageDetails>(`/pages/${id}`);
  return data;
}

export async function createPage(payload: PagePayload) {
  const { data } = await api.post<PageDetails>('/pages', payload);
  return data;
}

export async function updatePage(id: string, payload: PagePayload) {
  const { data } = await api.put<PageDetails>(`/pages/${id}`, payload);
  return data;
}

export async function deletePage(id: string) {
  await api.delete(`/pages/${id}`);
}

export async function uploadPageImage(pageId: string, file: File) {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post<PageImage>(`/pages/${pageId}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function addPageImageUrl(pageId: string, payload: ImageUrlPayload) {
  const { data } = await api.post<PageImage>(`/pages/${pageId}/images`, payload);
  return data;
}

export async function getPageImages(pageId: string) {
  const { data } = await api.get<PageImage[]>(`/pages/${pageId}/images`);
  return data;
}

export async function createQuote(payload: QuotePayload) {
  const { data } = await api.post<Quote>('/quotes', payload);
  return data;
}

export async function deleteQuote(id: string) {
  await api.delete(`/quotes/${id}`);
}
