import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// ---------- Model ----------

type ProductCategory = 'electronics' | 'clothing' | 'food' | 'books' | 'other';

const categoryLabels: Record<ProductCategory, string> = {
  electronics: '电子',
  clothing: '服装',
  food: '食品',
  books: '书籍',
  other: '其他',
};

const categories = Object.keys(categoryLabels) as ProductCategory[];

interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
}

// ---------- Store ----------

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: true,
  loadProducts: async () => {
    await new Promise((r) => setTimeout(r, 500));
    set({ isLoading: false });
  },
  addProduct: async (input) => {
    await new Promise((r) => setTimeout(r, 200));
    set((s) => ({
      products: [...s.products, { id: uuidv4(), ...input }],
    }));
  },
  deleteProduct: (id) => {
    set((s) => ({
      products: s.products.filter((p) => p.id !== id),
    }));
  },
}));

// ---------- Form ----------

function ProductForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<ProductCategory>('electronics');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addProduct = useProductStore((s) => s.addProduct);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = '请输入名称';
    const p = parseFloat(price);
    if (!price || isNaN(p) || p <= 0) e.price = '价格必须大于 0';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await addProduct({ name: name.trim(), price: p, category, description: description.trim() });
    setName('');
    setPrice('');
    setDescription('');
    onSubmit();
  };

  const p = parseFloat(price);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>创建产品</Text>
      <TextInput
        style={styles.input}
        placeholder="名称"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <TextInput
        style={styles.input}
        placeholder="价格"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      {errors.price && <Text style={styles.error}>{errors.price}</Text>}
      <View style={styles.categoryRow}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, category === c && styles.chipActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextActive]}>
              {categoryLabels[c]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="描述（选填）"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>提交</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- Product List Item ----------

function ProductItem({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: () => void;
}) {
  return (
    <View style={styles.productItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productSub}>
          ¥{product.price.toFixed(2)}  |  {categoryLabels[product.category]}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>删除</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- Main Page ----------

export default function App() {
  const { products, isLoading, loadProducts, deleteProduct } = useProductStore();
  const [showSuccess, setShowSuccess] = useState(false);

  // Load on mount
  useState(() => { loadProducts(); });

  const handleDelete = (id: string) => {
    Alert.alert('确认删除', '确定要删除该产品吗？', [
      { text: '取消', style: 'cancel' },
      { text: '删除', style: 'destructive', onPress: () => deleteProduct(id) },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>产品管理</Text>
        <ProductForm onSubmit={() => setShowSuccess(true)} />
        {showSuccess && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>产品创建成功</Text>
          </View>
        )}
        {isLoading ? (
          <ActivityIndicator size="large" style={{ margin: 32 }} />
        ) : products.length === 0 ? (
          <Text style={styles.emptyText}>暂无产品</Text>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>产品列表</Text>
            {products.map((p) => (
              <ProductItem
                key={p.id}
                product={p}
                onDelete={() => handleDelete(p.id)}
              />
            ))}
            <Text style={styles.count}>共 {products.length} 项</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ---------- Styles ----------

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, marginTop: 48 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  error: { color: '#e53935', fontSize: 13, marginBottom: 4 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chipActive: { backgroundColor: '#1976d2', borderColor: '#1976d2' },
  chipText: { fontSize: 14, color: '#333' },
  chipTextActive: { color: '#fff' },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: { fontSize: 16, fontWeight: '500' },
  productSub: { fontSize: 14, color: '#666', marginTop: 2 },
  deleteBtn: { paddingLeft: 16 },
  deleteText: { color: '#e53935', fontSize: 14 },
  successBanner: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  successText: { color: '#2e7d32', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 32, fontSize: 16 },
  count: { textAlign: 'center', color: '#999', marginTop: 8, fontSize: 14 },
});
