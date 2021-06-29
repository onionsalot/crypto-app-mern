import sendRequest from './send-request.js'
import { getToken } from "./users-service";
const BASE_URL = '/api/portfolios'

export function getAll() {
    return sendRequest(BASE_URL)
}

export function getOne(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

export function create(data) {
    return sendRequest(`${BASE_URL}/create`, 'POST', data)
}

export function addCoin(data, cid) {
    return sendRequest(`${BASE_URL}/${data.id}/add/${cid}`, 'PUT', data)
}

export function update(data, id) {
    return sendRequest(`${BASE_URL}/update/${id}`, 'PUT', data)
}

export function deleteOne(id) {
    return sendRequest(`${BASE_URL}/delete/${id}`, 'DELETE')
}