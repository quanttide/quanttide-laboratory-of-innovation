import { View, Text, Input, Button, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import { useProductStore } from '../../store/productStore'

export default function Index() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const { products, isLoading, addProduct, deleteProduct } = useProductStore()

  const handleSubmit = async () => {
    if (!name.trim()) return
    const p = parseFloat(price)
    if (isNaN(p) || p <= 0) return
    await addProduct({ name: name.trim(), price: p, category: 'other', description: description.trim() })
    setName('')
    setPrice('')
    setDescription('')
  }

  return (
    <ScrollView>
      <View>
        <Input placeholder="名称" value={name} onInput={(e) => setName(e.detail.value)} />
        <Input placeholder="价格" type="number" value={price} onInput={(e) => setPrice(e.detail.value)} />
        <Input placeholder="描述（选填）" value={description} onInput={(e) => setDescription(e.detail.value)} />
        <Button onClick={handleSubmit}>提交</Button>
      </View>

      {isLoading ? (
        <Text>加载中...</Text>
      ) : products.length === 0 ? (
        <Text>暂无产品</Text>
      ) : (
        <View>
          {products.map((p) => (
            <View key={p.id}>
              <Text>{p.name} - ¥{p.price.toFixed(2)}</Text>
              <Button onClick={() => deleteProduct(p.id)}>删除</Button>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}
