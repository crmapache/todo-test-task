import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './components/App'
import { GlobalStyle } from './styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
)
