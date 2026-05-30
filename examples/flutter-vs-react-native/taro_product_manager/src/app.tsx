import { useProductStore } from './store/productStore'

export default function App({ children }: any) {
  useProductStore.getState().loadProducts()
  return children
}
