//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class Order {
  /// Returns a new [Order] instance.
  Order({
    required this.id,
    required this.userId,
    this.items = const [],
    required this.total,
    required this.status,
    this.shippingAddress,
    this.createdAt,
    this.updatedAt,
  });

  String id;

  String userId;

  List<OrderItem> items;

  /// Minimum value: 0
  num total;

  OrderStatus status;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  Address? shippingAddress;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? createdAt;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? updatedAt;

  @override
  bool operator ==(Object other) => identical(this, other) || other is Order &&
    other.id == id &&
    other.userId == userId &&
    _deepEquality.equals(other.items, items) &&
    other.total == total &&
    other.status == status &&
    other.shippingAddress == shippingAddress &&
    other.createdAt == createdAt &&
    other.updatedAt == updatedAt;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (id.hashCode) +
    (userId.hashCode) +
    (items.hashCode) +
    (total.hashCode) +
    (status.hashCode) +
    (shippingAddress == null ? 0 : shippingAddress!.hashCode) +
    (createdAt == null ? 0 : createdAt!.hashCode) +
    (updatedAt == null ? 0 : updatedAt!.hashCode);

  @override
  String toString() => 'Order[id=$id, userId=$userId, items=$items, total=$total, status=$status, shippingAddress=$shippingAddress, createdAt=$createdAt, updatedAt=$updatedAt]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'id'] = this.id;
      json[r'userId'] = this.userId;
      json[r'items'] = this.items;
      json[r'total'] = this.total;
      json[r'status'] = this.status;
    if (this.shippingAddress != null) {
      json[r'shippingAddress'] = this.shippingAddress;
    } else {
      json[r'shippingAddress'] = null;
    }
    if (this.createdAt != null) {
      json[r'createdAt'] = this.createdAt!.toUtc().toIso8601String();
    } else {
      json[r'createdAt'] = null;
    }
    if (this.updatedAt != null) {
      json[r'updatedAt'] = this.updatedAt!.toUtc().toIso8601String();
    } else {
      json[r'updatedAt'] = null;
    }
    return json;
  }

  /// Returns a new [Order] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static Order? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        assert(json.containsKey(r'id'), 'Required key "Order[id]" is missing from JSON.');
        assert(json[r'id'] != null, 'Required key "Order[id]" has a null value in JSON.');
        assert(json.containsKey(r'userId'), 'Required key "Order[userId]" is missing from JSON.');
        assert(json[r'userId'] != null, 'Required key "Order[userId]" has a null value in JSON.');
        assert(json.containsKey(r'items'), 'Required key "Order[items]" is missing from JSON.');
        assert(json[r'items'] != null, 'Required key "Order[items]" has a null value in JSON.');
        assert(json.containsKey(r'total'), 'Required key "Order[total]" is missing from JSON.');
        assert(json[r'total'] != null, 'Required key "Order[total]" has a null value in JSON.');
        assert(json.containsKey(r'status'), 'Required key "Order[status]" is missing from JSON.');
        assert(json[r'status'] != null, 'Required key "Order[status]" has a null value in JSON.');
        return true;
      }());

      return Order(
        id: mapValueOfType<String>(json, r'id')!,
        userId: mapValueOfType<String>(json, r'userId')!,
        items: OrderItem.listFromJson(json[r'items']),
        total: num.parse('${json[r'total']}'),
        status: OrderStatus.fromJson(json[r'status'])!,
        shippingAddress: Address.fromJson(json[r'shippingAddress']),
        createdAt: mapDateTime(json, r'createdAt', r''),
        updatedAt: mapDateTime(json, r'updatedAt', r''),
      );
    }
    return null;
  }

  static List<Order> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <Order>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = Order.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, Order> mapFromJson(dynamic json) {
    final map = <String, Order>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = Order.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of Order-objects as value to a dart map
  static Map<String, List<Order>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<Order>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = Order.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'id',
    'userId',
    'items',
    'total',
    'status',
  };
}

