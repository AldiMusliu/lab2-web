import ky, { type Options } from "ky"

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ""

const client = ky.create({
  headers: {
    "Content-Type": "application/json",
  },
})

function toUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${API_BASE_URL}${path}`
}

async function parseResponse<T>(responsePromise: Promise<Response>): Promise<T> {
  const response = await responsePromise

  if (response.status === 204) {
    return undefined as T
  }

  const contentType = response.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const httpClient = {
  get: <T>(path: string, config?: Options) =>
    parseResponse<T>(client.get(toUrl(path), config)),
  post: <T>(path: string, json?: unknown, config?: Options) =>
    parseResponse<T>(client.post(toUrl(path), { ...config, json })),
  put: <T>(path: string, json?: unknown, config?: Options) =>
    parseResponse<T>(client.put(toUrl(path), { ...config, json })),
  patch: <T>(path: string, json?: unknown, config?: Options) =>
    parseResponse<T>(client.patch(toUrl(path), { ...config, json })),
  delete: <T>(path: string, config?: Options) =>
    parseResponse<T>(client.delete(toUrl(path), config)),
}
