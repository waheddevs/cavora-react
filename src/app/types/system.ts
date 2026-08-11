export type DatabaseStatus =
  "connected" | "connecting" | "disconnecting" | "disconnected"

export interface SystemHealth {
  checks: {
    application: "up"
    database: DatabaseStatus
  }
  environment: string
  service: "cavora-server"
  status: "ok" | "degraded"
  timestamp: string
}

export interface OpenApiDocument {
  openapi: string
  info: {
    title: string
    version: string
    description?: string
  }
  servers?: Array<{
    url: string
    description?: string
  }>
  paths: Record<string, unknown>
  components?: Record<string, unknown>
  tags?: Array<{
    name: string
    description?: string
  }>
}
