# AI 生成代码质量对比

> 日期：2026-05-30
> 对应 TODO：M4

## 方法

使用同一 AI 模型（Claude 3.7 Sonnet），对同一功能需求分别生成 Dart（Flutter）和 TypeScript（React Native）代码，对比：

1. **首次运行成功率**：生成代码是否能无修改通过编译检查
2. **修正轮次**：从生成到通过编译需要的迭代次数
3. **生成速度**：从发出 prompt 到拿到可用代码的时间
4. **代码质量**：是否使用了最佳实践、有无冗余代码

## 测试场景

产品管理页面（表单 + 列表 + 状态管理），同 M2 验收规范。

## 结果

| 对比项 | Dart (Flutter + Riverpod 3.x) | TypeScript (Expo + Zustand) |
|--------|:-----------------------------:|:---------------------------:|
| 首次编译通过 | ❌ 否 | ✅ 是 |
| 修正轮次 | 1 轮（`StateNotifier` → `Notifier` API） | 0 轮 |
| 修复耗时 | ~5 分钟 | 0 |
| AI 理解准确度 | ⭐⭐⭐⭐ 生成了旧版 API，但逻辑正确 | ⭐⭐⭐⭐⭐ API 选择正确 |
| 代码冗余 | 较少（自动生成 import / dispose） | 较少 |
| 状态管理复杂度 | ⭐⭐⭐ Riverpod 3.x 多了一个 Provider 声明层 | ⭐⭐⭐⭐⭐ Zustand 一个 `create` 搞定 |

## 分析

**Dart 的问题不在于语言本身**，而在于 Riverpod 3.x 在 2026 年 4-5 月有一次 API 重大变更（`StateNotifier` 被移除、改为 `Notifier`），AI 的训练数据尚未覆盖最新 API。这说明：

- AI 对 **高频更新的框架 API** 存在知识滞后
- 这不是 Dart vs TS 的问题，而是 Riverpod vs Zustand 的生态成熟度差异
- Zustand 的 API 从 4.x 到 5.x 保持了极好的向后兼容性，API 稳定性更高

**二次评估：** 如果排除框架 API 变更因素（例如 Flutter 使用更稳定的 BLoC，或 Riverpod 的 API 稳定后），两者的 AI 生成质量应无实质差异。

## 补充测试

额外测试：用 AI 生成纯逻辑代码（日期格式化、价格计算、数据校验函数），不涉及框架 API：

| 对比项 | Dart | TypeScript |
|--------|:----:|:----------:|
| 纯函数生成 | ✅ 一次通过 | ✅ 一次通过 |
| 类型安全 | ✅ 强类型，`dart analyze` 检查严格 | ✅ 强类型，`tsc` 检查 |
| 生成质量 | 同等 | 同等 |

## 结论

| 假设 | 结论 |
|------|------|
| **#5 AI 生成 Dart 质量 >= AI 生成 TS 质量** | **≈ 持平**，但依赖于框架 API 的稳定性。在 API 稳定框架（Zustand）上 AI 表现更好；Flutter 框架 API 变更频繁会导致 AI 知识滞后 |

## 建议

- 如果选 Flutter，选择 API 更稳定的状态管理方案（如 BLoC，其 API 自 8.x 以来变化很小），或等待 Riverpod API 固化后再使用 AI 辅助
- 如果 AI 是主力开发者，框架的 API 稳定性比语言本身的 AI 生成质量更影响效率
