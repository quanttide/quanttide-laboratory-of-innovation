//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class Address {
  /// Returns a new [Address] instance.
  Address({
    required this.province,
    required this.city,
    this.district,
    required this.detail,
    this.postalCode,
  });

  String province;

  String city;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? district;

  String detail;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? postalCode;

  @override
  bool operator ==(Object other) => identical(this, other) || other is Address &&
    other.province == province &&
    other.city == city &&
    other.district == district &&
    other.detail == detail &&
    other.postalCode == postalCode;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (province.hashCode) +
    (city.hashCode) +
    (district == null ? 0 : district!.hashCode) +
    (detail.hashCode) +
    (postalCode == null ? 0 : postalCode!.hashCode);

  @override
  String toString() => 'Address[province=$province, city=$city, district=$district, detail=$detail, postalCode=$postalCode]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'province'] = this.province;
      json[r'city'] = this.city;
    if (this.district != null) {
      json[r'district'] = this.district;
    } else {
      json[r'district'] = null;
    }
      json[r'detail'] = this.detail;
    if (this.postalCode != null) {
      json[r'postalCode'] = this.postalCode;
    } else {
      json[r'postalCode'] = null;
    }
    return json;
  }

  /// Returns a new [Address] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static Address? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        assert(json.containsKey(r'province'), 'Required key "Address[province]" is missing from JSON.');
        assert(json[r'province'] != null, 'Required key "Address[province]" has a null value in JSON.');
        assert(json.containsKey(r'city'), 'Required key "Address[city]" is missing from JSON.');
        assert(json[r'city'] != null, 'Required key "Address[city]" has a null value in JSON.');
        assert(json.containsKey(r'detail'), 'Required key "Address[detail]" is missing from JSON.');
        assert(json[r'detail'] != null, 'Required key "Address[detail]" has a null value in JSON.');
        return true;
      }());

      return Address(
        province: mapValueOfType<String>(json, r'province')!,
        city: mapValueOfType<String>(json, r'city')!,
        district: mapValueOfType<String>(json, r'district'),
        detail: mapValueOfType<String>(json, r'detail')!,
        postalCode: mapValueOfType<String>(json, r'postalCode'),
      );
    }
    return null;
  }

  static List<Address> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <Address>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = Address.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, Address> mapFromJson(dynamic json) {
    final map = <String, Address>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = Address.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of Address-objects as value to a dart map
  static Map<String, List<Address>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<Address>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = Address.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'province',
    'city',
    'detail',
  };
}

