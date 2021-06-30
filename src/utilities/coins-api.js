import sendRequest from './send-request.js'
import { getToken } from "./users-service";
const BASE_URL = '/api/coins'

export function getAll() {
    return sendRequest(BASE_URL)
}

export function getSearch() {
    return sendRequest(`${BASE_URL}/search`)
}

export function getOne(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

export function getDefault() {
    return sendRequest(`${BASE_URL}/searchDefault`)
}