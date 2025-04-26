import React from 'react'

import { ThemeProvider } from "./components/themeProvider"
import Layout from './Layout'
import CanvasView from './CanvasView'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <CanvasView />
      </Layout>
    </ThemeProvider>
  )
}

export default App
