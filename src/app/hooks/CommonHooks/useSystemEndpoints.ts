import {
  useGetSystemHealthQuery,
  useLazyGetOpenApiDocumentQuery,
} from "app/api/systemApi"
import { resolveApiUrl } from "app/api/baseApi"
import { getApiErrorMessage } from "app/api/apiErrors"
import { useNotifications } from "app/contexts/SweetAlertContext"

export function useSystemEndpoints() {
  /* API HOOKS */
  const healthQuery = useGetSystemHealthQuery(undefined, {
    pollingInterval: 60_000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const [getOpenApiDocument, openApiState] = useLazyGetOpenApiDocumentQuery()

  /* DOMAIN HOOKS */
  const { notifyError } = useNotifications()

  /* DERIVED DATA */
  const isOperational = healthQuery.data?.status === "ok"
  const serviceStatus = healthQuery.isLoading
    ? "Checking service..."
    : isOperational
      ? "All systems operational"
      : healthQuery.data?.status === "degraded"
        ? "Service is degraded"
        : "Service status unavailable"

  /* HANDLERS */
  const handleOpenApiDocs = () => {
    window.open(resolveApiUrl("/docs"), "_blank", "noopener,noreferrer")
  }

  const handleDownloadOpenApi = async () => {
    try {
      const document = await getOpenApiDocument().unwrap()
      const blob = new Blob([JSON.stringify(document, null, 2)], {
        type: "application/json",
      })
      const downloadUrl = URL.createObjectURL(blob)
      const link = window.document.createElement("a")
      link.href = downloadUrl
      link.download = `cavora-openapi-${document.info.version}.json`
      link.click()
      URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      await notifyError({
        title: "API specification unavailable",
        message: getApiErrorMessage(
          error,
          "The API specification could not be prepared. Please return shortly.",
        ),
      })
    }
  }

  return {
    health: healthQuery.data,
    isOperational,
    serviceStatus,
    isHealthChecking: healthQuery.isFetching,
    isOpenApiLoading: openApiState.isFetching,
    handleOpenApiDocs,
    handleDownloadOpenApi,
  }
}
