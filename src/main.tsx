import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/reset.css'
import "@svgstore"
import { HashRouter } from 'react-router-dom'
import { ConfigProvider, Spin } from "antd";
import { Suspense } from 'react'
import theme from './theme.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme}>
    <Suspense fallback={<Spin className="suspense-loading" />}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </ConfigProvider>
)
