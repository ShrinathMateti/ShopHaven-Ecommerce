import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './Shop.css'
import ShopApplicationWrapper from './pages/ShopApplicationWrapper'
import { Provider } from 'react-redux'
import store  from './store/store'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}>   
      <ShopApplicationWrapper />
    </RouterProvider>
    </Provider>
)