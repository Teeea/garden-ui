import axios from "axios";

export const http = axios.create({
  baseURL: 'http://106.15.44.45:8000/',
});

export const getRecordByBookList = (id, type) => http.get(`/book-list/${id}/records?type=${type}`);