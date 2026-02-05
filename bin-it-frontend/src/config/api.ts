import { getDevServerHost } from "../utils/network";

const HOST = getDevServerHost();

export const API_BASE_URL = `http://${HOST}:8080`;
