//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class OrderItem {
  /// Returns a new [OrderItem] instance.
  OrderItem({
    required this.productId,
    this.productName,
    required this.quantity,
    required this.price,
  });

  String productId;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? productName;

  /// Minimum value: 1
  int quantity;

  /// Minimum value: 0
  num price;

  @override
  bool operator ==(Object other) => identical(this, other) || other is OrderItem &&
    other.productId == productId &&
    other.productName == productName &&
    other.quantity == quantity &&
    other.price == price;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (productId.hashCode) +
    (productName == null ? 0 : productName!.hashCode) +
    (quantity.hashCode) +
    (price.hashCode);

  @override
  String toString() => 'OrderItem[productId=$productId, productName=$productName, quantity=$quantity, price=$price]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'productId'] = this.productId;
    if (this.productName != null) {
      json[r'productName'] = this.productName;
    } else {
      json[r'productName'] = null;
    }
      json[r'quantity'] = this.quantity;
      json[r'price'] = this.price;
    return json;
  }

  /// Returns a new [OrderItem] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static OrderItem? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        assert(json.containsKey(r'productId'), 'Required key "OrderItem[productId]" is missing from JSON.');
        assert(json[r'productId'] != null, 'Required key "OrderItem[productId]" has a null value in JSON.');
        assert(json.containsKey(r'quantity'), 'Required key "OrderItem[quantity]" is missing from JSON.');
        assert(json[r'quantity'] != null, 'Required key "OrderItem[quantity]" has a null value in JSON.');
        assert(json.containsKey(r'price'), 'Required key "OrderItem[price]" is missing from JSON.');
        assert(json[r'price'] != null, 'Required key "OrderItem[price]" has a null value in JSON.');
        return true;
      }());

      return OrderItem(
        productId: mapValueOfType<String>(json, r'productId')!,
        productName: mapValueOfType<String>(json, r'productName'),
        quantity: mapValueOfType<int>(json, r'quantity')!,
        price: num.parse('${json[r'price']}'),
      );
    }
    return null;
  }

  static List<OrderItem> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <OrderItem>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = OrderItem.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, OrderItem> mapFromJson(dynamic json) {
    final map = <String, OrderItem>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = OrderItem.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of OrderItem-objects as value to a dart map
  static Map<String, List<OrderItem>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<OrderItem>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = OrderItem.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'productId',
    'quantity',
    'price',
  };
}

