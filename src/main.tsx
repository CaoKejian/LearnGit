import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/reset.css'
import "@svgstore"
import { HashRouter } from 'react-router-dom'
import { Spin } from "antd";
import { Suspense } from 'react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  (() => {
    return (
      <Suspense fallback={<Spin className="suspense-loading" />}>
        <HashRouter>
          <App />
        </HashRouter>
      </Suspense>
    )
  })()
)
