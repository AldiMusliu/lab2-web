import ky, { type Options } from "ky"

import { getStoredAccessToken, useSessionStore } from "@/stores/session.store"

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ""

const client = ky.create({
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = getStoredAccessToken()

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`)
        }
      },
    ],
  },
  throwHttpErrors: false,
})

function toUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${API_BASE_URL}${path}`
}

async function parseResponse<T>(
  responsePromise: Promise<Response>
): Promise<T> {
  const response = await responsePromise
  const contentType = response.headers.get("content-type") ?? ""
  const hasJson = contentType.includes("application/json")

  if (response.status === 204) {
    return undefined as T
  }

  const data = hasJson
    ? await response.json().catch(() => undefined)
    : undefined

  if (!response.ok) {
    if (response.status === 401) {
      useSessionStore.getState().reset()
    }

    throw (
      data ??
      new Error(response.statusText || `Request failed with ${response.status}`)
    )
  }

  if (!hasJson) {
    return undefined as T
  }

  return data as T
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

export function getHttpErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  if (error && typeof error === "object") {
    const record = error as Record<string, unknown>

    for (const key of ["message", "error", "detail"]) {
      if (typeof record[key] === "string") {
        return record[key]
      }
    }
  }

  return fallback
}
