import { create } from 'zustand'

export type ProductCategory = 'electronics' | 'clothing' | 'food' | 'books' | 'other'

export interface Product {
  id: string
  name: string
  price: number
  category: ProductCategory
  description: string
}

interface ProductStore {
  products: Product[]
  isLoading: boolean
  loadProducts: () => Promise<void>
  addProduct: (input: Omit<Product, 'id'>) => Promise<void>
  deleteProduct: (id: string) => void
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: true,
  loadProducts: async () => {
    await new Promise((r) => setTimeout(r, 500))
    set({ isLoading: false })
  },
  addProduct: async (input) => {
    await new Promise((r) => setTimeout(r, 200))
    set((s) => ({
      products: [...s.products, { id: crypto.randomUUID(), ...input }],
    }))
  },
  deleteProduct: (id) => {
    set((s) => ({
      products: s.products.filter((p) => p.id !== id),
    }))
  },
}))

export { useProductStore }
