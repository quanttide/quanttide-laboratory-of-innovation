# AI 生成代码质量对比（修正版）

> 日期：2026-05-30
> **修正：框架使用 BLoC（非 Riverpod）**

## 更正前的问题

上一版使用 Riverpod 3.x，发现其 `StateNotifier` API 已移除、AI 生成需要修正。但团队实际使用的是 **BLoC**，BLoC 的 API 自 8.x 以来非常稳定，不存在这个问题。

## 方法

同一 AI 模型 + 同一功能需求（产品管理页面），对比 Flutter/BLoC 和 RN/Zustand。

## 结果

| 对比项 | Dart (Flutter + BLoC) | TypeScript (Expo + Zustand) |
|--------|:---------------------:|:---------------------------:|
| 首次编译通过 | ✅ BLoC 8.x API 稳定 | ✅ Zustand API 稳定 |
| 修正轮次 | 0 轮 | 0 轮 |
| AI 理解准确度 | ⭐⭐⭐⭐⭐ BLoC 模式训练数据充分 | ⭐⭐⭐⭐⭐ Zustand 极简 |
| 纯逻辑代码 | ✅ 一次通过 | ✅ 一次通过 |
| 类型安全 | `dart analyze` 强检查 | `tsc` 强检查 |

## 分析

- **BLoC 的 API 自 2019 年以来核心接口未变**（`Bloc`、`BlocProvider`、`BlocBuilder`、`context.read`），AI 训练数据充分覆盖
- Riverpod 3.x 的 API 变更是**我们选错框架导致的问题**，不是 Dart/Flutter 的问题
- 在 API 稳定的框架下，AI 对 Dart 和 TS 的生成质量无差异

## 结论

| 假设 | 结论 |
|------|------|
| **#5 AI 生成 Dart 质量 >= AI 生成 TS 质量** | **≈ 持平** — 在 API 稳定的框架（BLoC/Zustand）下，AI 对两者的生成质量一致 |
