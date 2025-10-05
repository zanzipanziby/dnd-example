import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/'
import './styles/global.css'
import { MainLayout } from './layouts/MainLayout/MainLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MainLayout>
        <App />
      </MainLayout>
    </Provider>
  </StrictMode>
)
