import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:uuid/uuid.dart';

void main() {
  runApp(const ProductManagerApp());
}

class ProductManagerApp extends StatelessWidget {
  const ProductManagerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '产品管理',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: Colors.blue,
        useMaterial3: true,
      ),
      home: BlocProvider(
        create: (_) => ProductBloc()..add(LoadProducts()),
        child: const ProductPage(),
      ),
    );
  }
}

// ---------- Model ----------

enum ProductCategory { electronics, clothing, food, books, other }

const categoryLabels = {
  ProductCategory.electronics: '电子',
  ProductCategory.clothing: '服装',
  ProductCategory.food: '食品',
  ProductCategory.books: '书籍',
  ProductCategory.other: '其他',
};

class Product {
  final String id;
  final String name;
  final double price;
  final ProductCategory category;
  final String description;

  Product({
    required this.id,
    required this.name,
    required this.price,
    required this.category,
    this.description = '',
  });
}

// ---------- BLoC ----------

sealed class ProductEvent {}

final class LoadProducts extends ProductEvent {}

final class AddProduct extends ProductEvent {
  final String name;
  final double price;
  final ProductCategory category;
  final String description;
  AddProduct({
    required this.name,
    required this.price,
    required this.category,
    this.description = '',
  });
}

final class DeleteProduct extends ProductEvent {
  final String id;
  DeleteProduct(this.id);
}

class ProductState {
  final List<Product> products;
  final bool isLoading;

  ProductState({this.products = const [], this.isLoading = false});

  ProductState copyWith({List<Product>? products, bool? isLoading}) {
    return ProductState(
      products: products ?? this.products,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class ProductBloc extends Bloc<ProductEvent, ProductState> {
  ProductBloc() : super(ProductState()) {
    on<LoadProducts>(_onLoadProducts);
    on<AddProduct>(_onAddProduct);
    on<DeleteProduct>(_onDeleteProduct);
  }

  Future<void> _onLoadProducts(LoadProducts event, Emitter<ProductState> emit) async {
    emit(state.copyWith(isLoading: true));
    await Future.delayed(const Duration(milliseconds: 500));
    emit(state.copyWith(isLoading: false));
  }

  Future<void> _onAddProduct(AddProduct event, Emitter<ProductState> emit) async {
    await Future.delayed(const Duration(milliseconds: 200));
    final product = Product(
      id: const Uuid().v4(),
      name: event.name,
      price: event.price,
      category: event.category,
      description: event.description,
    );
    emit(state.copyWith(products: [...state.products, product]));
  }

  void _onDeleteProduct(DeleteProduct event, Emitter<ProductState> emit) {
    emit(state.copyWith(
      products: state.products.where((p) => p.id != event.id).toList(),
    ));
  }
}

// ---------- UI ----------

class ProductPage extends StatelessWidget {
  const ProductPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('产品管理')),
      body: const Column(
        children: [
          ProductForm(),
          Expanded(child: ProductList()),
        ],
      ),
    );
  }
}

class ProductForm extends StatefulWidget {
  const ProductForm({super.key});

  @override
  State<ProductForm> createState() => _ProductFormState();
}

class _ProductFormState extends State<ProductForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _priceCtrl = TextEditingController();
  final _descCtrl = TextEditingController();
  ProductCategory _category = ProductCategory.electronics;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _priceCtrl.dispose();
    _descCtrl.dispose();
    super.dispose();
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) return;
    context.read<ProductBloc>().add(AddProduct(
          name: _nameCtrl.text.trim(),
          price: double.parse(_priceCtrl.text),
          category: _category,
          description: _descCtrl.text.trim(),
        ));
    _nameCtrl.clear();
    _priceCtrl.clear();
    _descCtrl.clear();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('产品创建成功')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('创建产品', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            TextFormField(
              controller: _nameCtrl,
              decoration: const InputDecoration(labelText: '名称'),
              validator: (v) =>
                  v == null || v.trim().isEmpty ? '请输入名称' : null,
            ),
            TextFormField(
              controller: _priceCtrl,
              decoration: const InputDecoration(labelText: '价格'),
              keyboardType: TextInputType.number,
              validator: (v) {
                if (v == null || v.isEmpty) return '请输入价格';
                final price = double.tryParse(v);
                if (price == null || price <= 0) return '价格必须大于 0';
                return null;
              },
            ),
            DropdownButtonFormField<ProductCategory>(
              value: _category,
              decoration: const InputDecoration(labelText: '分类'),
              items: ProductCategory.values
                  .map((c) => DropdownMenuItem(
                        value: c,
                        child: Text(categoryLabels[c]!),
                      ))
                  .toList(),
              onChanged: (v) => setState(() => _category = v!),
            ),
            TextFormField(
              controller: _descCtrl,
              decoration: const InputDecoration(labelText: '描述（选填）'),
              maxLines: 2,
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _submit,
              child: const Text('提交'),
            ),
            const Divider(height: 24),
          ],
        ),
      ),
    );
  }
}

class ProductList extends StatelessWidget {
  const ProductList({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ProductBloc, ProductState>(
      builder: (context, state) {
        if (state.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (state.products.isEmpty) {
          return const Center(child: Text('暂无产品'));
        }

        return Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text('产品列表',
                    style: Theme.of(context).textTheme.titleMedium),
              ),
            ),
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: state.products.length,
                itemBuilder: (context, index) {
                  final product = state.products[index];
                  return ListTile(
                    title: Text(product.name),
                    subtitle: Text(
                        '¥${product.price.toStringAsFixed(2)}  |  ${categoryLabels[product.category]}'),
                    trailing: IconButton(
                      icon: const Icon(Icons.delete_outline),
                      onPressed: () => context
                          .read<ProductBloc>()
                          .add(DeleteProduct(product.id)),
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8),
              child: Text('共 ${state.products.length} 项'),
            ),
          ],
        );
      },
    );
  }
}
