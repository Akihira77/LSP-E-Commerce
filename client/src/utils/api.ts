import axios, { AxiosRequestConfig } from "axios";
import { CreateUserParams, TProduct, UserLoginParams } from "./types.ts";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const config: AxiosRequestConfig = {
	withCredentials: true
};

export const postRegisterUser = (data: CreateUserParams) => {
	return axios.post(`${API_URL}/users/auth/register`, data, config);
};

export const postLoginUser = (data: UserLoginParams) => {
	return axios.post(`${API_URL}/users/auth/login`, data, config);
};

export const getAuthUser = () => {
	return axios.get(`${API_URL}/users/auth/status`, config);
};

export const getCategories = () => {
	return axios.get(`${API_URL}/categories`, config);
};

export const getAllProductsOrByCategory = (category?: string) => {
	if (!category) {
		return axios.get(`${API_URL}/products`, config);
	}

	return axios.get(`${API_URL}/products?categoryId=${category}`, config);
};

export const addtoCart = (productId: number, quantity: number) => {
	const payload = {
		productId,
		quantity
	};

	return axios.post(`${API_URL}/products/add-to-cart`, payload, config);
};

export const getMyCart = () => {
	return axios.get(`${API_URL}/products/cart/my-cart`, config);
};

export const getMyPreviewCart = () => {
	return axios.get(`${API_URL}/products/cart/preview`, config);
};

export const postCheckout = () => {
	return axios.post(`${API_URL}/transactions/checkout`, null, config);
};

export const putQuantityCartItem = (cartItemId: number, quantity: number) => {
	const payload = {
		cartItemId,
		quantity
	};

	return axios.put(`${API_URL}/products/cart`, payload, config);
};

export const removeItemInCart = (cartItemId: number) => {
	return axios.delete(`${API_URL}/products/cart/${cartItemId}`, config);
};

export const getAllCategories = () => {
	return axios.get(`${API_URL}/categories`, config);
};

export const adminGetProducts = () => {
	return axios.get(`${API_URL}/products/admin`, config);
};

export const getProductByid = (id: number) => {
	return axios.get(`${API_URL}/products/${id}`, config);
};

export const getInvoiceDetails = (id: number) => {
	return axios.get(`${API_URL}/transactions/${id}`, config);
};

export const adminGetAllUsers = () => {
	return axios.get(`${API_URL}/users/admin`, config);
};

export const adminGetAllTransactions = () => {
	return axios.get(`${API_URL}/transactions/admin`, config);
};

export const postProduct = (data: FormData) => {
	return axios.post(`${API_URL}/products/admin`, data, config);
};

export const putProduct = (data: FormData) => {
	return axios.put(`${API_URL}/products/admin`, data, config);
};

export const removeProduct = (productId: number) => {
	return axios.delete(`${API_URL}/products/admin/${productId}`, config);
};

export const getMyOrders = () => {
	return axios.get(`${API_URL}/transactions/my-orders`, config);
};
