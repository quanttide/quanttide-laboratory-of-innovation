# quanttide_models.model.Order

## Load the model package
```dart
import 'package:quanttide_models/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** |  | 
**userId** | **String** |  | 
**items** | [**List<OrderItem>**](OrderItem.md) |  | [default to const []]
**total** | **num** |  | 
**status** | [**OrderStatus**](OrderStatus.md) |  | 
**shippingAddress** | [**Address**](Address.md) |  | [optional] 
**createdAt** | [**DateTime**](DateTime.md) |  | [optional] 
**updatedAt** | [**DateTime**](DateTime.md) |  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


