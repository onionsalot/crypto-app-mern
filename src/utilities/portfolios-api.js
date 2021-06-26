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
