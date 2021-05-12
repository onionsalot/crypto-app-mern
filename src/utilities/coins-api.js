import sendRequest from './send-request.js'
import { getToken } from "./users-service";
const BASE_URL = '/api/coins'

export function getAll() {
    return sendRequest(BASE_URL)
}