//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class PageResponse {
  /// Returns a new [PageResponse] instance.
  PageResponse({
    this.items = const [],
    required this.total,
    required this.page,
    required this.size,
  });

  List<User> items;

  /// Minimum value: 0
  int total;

  /// Minimum value: 1
  int page;

  /// Minimum value: 1
  int size;

  @override
  bool operator ==(Object other) => identical(this, other) || other is PageResponse &&
    _deepEquality.equals(other.items, items) &&
    other.total == total &&
    other.page == page &&
    other.size == size;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (items.hashCode) +
    (total.hashCode) +
    (page.hashCode) +
    (size.hashCode);

  @override
  String toString() => 'PageResponse[items=$items, total=$total, page=$page, size=$size]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'items'] = this.items;
      json[r'total'] = this.total;
      json[r'page'] = this.page;
      json[r'size'] = this.size;
    return json;
  }

  /// Returns a new [PageResponse] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static PageResponse? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        assert(json.containsKey(r'items'), 'Required key "PageResponse[items]" is missing from JSON.');
        assert(json[r'items'] != null, 'Required key "PageResponse[items]" has a null value in JSON.');
        assert(json.containsKey(r'total'), 'Required key "PageResponse[total]" is missing from JSON.');
        assert(json[r'total'] != null, 'Required key "PageResponse[total]" has a null value in JSON.');
        assert(json.containsKey(r'page'), 'Required key "PageResponse[page]" is missing from JSON.');
        assert(json[r'page'] != null, 'Required key "PageResponse[page]" has a null value in JSON.');
        assert(json.containsKey(r'size'), 'Required key "PageResponse[size]" is missing from JSON.');
        assert(json[r'size'] != null, 'Required key "PageResponse[size]" has a null value in JSON.');
        return true;
      }());

      return PageResponse(
        items: User.listFromJson(json[r'items']),
        total: mapValueOfType<int>(json, r'total')!,
        page: mapValueOfType<int>(json, r'page')!,
        size: mapValueOfType<int>(json, r'size')!,
      );
    }
    return null;
  }

  static List<PageResponse> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PageResponse>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PageResponse.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, PageResponse> mapFromJson(dynamic json) {
    final map = <String, PageResponse>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = PageResponse.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of PageResponse-objects as value to a dart map
  static Map<String, List<PageResponse>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<PageResponse>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = PageResponse.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'items',
    'total',
    'page',
    'size',
  };
}

