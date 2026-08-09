export function getApiErrorMessage(error: unknown, fallback: string) {
  if (typeof error !== "object" || error === null || !("data" in error)) {
    return fallback
  }

  const data = (error as { data?: unknown }).data
  if (typeof data !== "object" || data === null || !("message" in data)) {
    return fallback
  }

  const message = (data as { message?: unknown }).message
  return typeof message === "string" ? message : fallback
}
