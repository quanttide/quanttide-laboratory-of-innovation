//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class ProductCategory {
  /// Instantiate a new enum with the provided [value].
  const ProductCategory._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const electronics = ProductCategory._(r'electronics');
  static const clothing = ProductCategory._(r'clothing');
  static const food = ProductCategory._(r'food');
  static const books = ProductCategory._(r'books');
  static const other = ProductCategory._(r'other');

  /// List of all possible values in this [enum][ProductCategory].
  static const values = <ProductCategory>[
    electronics,
    clothing,
    food,
    books,
    other,
  ];

  static ProductCategory? fromJson(dynamic value) => ProductCategoryTypeTransformer().decode(value);

  static List<ProductCategory> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <ProductCategory>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = ProductCategory.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [ProductCategory] to String,
/// and [decode] dynamic data back to [ProductCategory].
class ProductCategoryTypeTransformer {
  factory ProductCategoryTypeTransformer() => _instance ??= const ProductCategoryTypeTransformer._();

  const ProductCategoryTypeTransformer._();

  String encode(ProductCategory data) => data.value;

  /// Decodes a [dynamic value][data] to a ProductCategory.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  ProductCategory? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'electronics': return ProductCategory.electronics;
        case r'clothing': return ProductCategory.clothing;
        case r'food': return ProductCategory.food;
        case r'books': return ProductCategory.books;
        case r'other': return ProductCategory.other;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [ProductCategoryTypeTransformer] instance.
  static ProductCategoryTypeTransformer? _instance;
}

