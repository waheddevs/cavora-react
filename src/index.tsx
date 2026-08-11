import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "app/App"
import { store } from "app/store/store"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@emotion/react"
import theme from "app/MaterialTheme"
import "css/index.css"
import { BrowserRouter as Router } from "react-router-dom"
import { SweetAlertProvider } from "app/contexts/SweetAlertContext"
import AuthProvider from "app/contexts/AuthProvider"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AuthProvider>
              <SweetAlertProvider>
                <App />
              </SweetAlertProvider>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
