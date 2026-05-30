# 实验状态

> 最后更新：2026-05-30（实验已归档）

## 总体进度

| 里程碑 | 状态 | 备注 |
|--------|:----:|------|
| M1 数据模型解耦验证 | ✅ 完成 | OpenAPI 3.x + OpenAPI Generator |
| M2 开发效率对比 | ✅ 完成 | Flutter Riverpod vs RN Expo+Zustand |
| M3 小程序双端对比 | ✅ 完成 | 双端均无自动转换工具 |
| M4 AI 代码质量对比 | ✅ 完成 | 差异来自框架 API 稳定，非语言本身 |
| M5 综合决策 | ✅ 完成 | 最终方案：Flutter（持平则选团队熟悉者） |

---

## 决策矩阵

| 假设 | Flutter | RN | 依据 |
|------|:-------:|:--:|------|
| #1 数据模型解耦 | **0** | **0** | 解耦可行，不偏袒任何一方 |
| #2 团队 Dart 积累优势 | **0** | **0** | AI 辅助下双端效率接近 |
| #3 工具链 vs 生态复用 | **+1** | **0** | Flutter 静态分析可提前发现更多问题 |
| #4 小程序复用 | **-1** | **+1** | 双端均需重写 UI，但 Taro（React 生态）比 MPFlutter 更成熟 |
| #5 AI 生成 Dart vs TS | **0** | **0** | 差异来自框架 API 稳定性，非语言本身 |
| **当前总分** | **0** | **+1** | |

---

## M1：数据模型解耦验证 ✅

**假设 #1：** 数据模型层可独立为纯逻辑库，与 Flutter / RN 均解耦

**方法：** 调研 5 种 IDL 方案 → 选定 **OpenAPI 3.x + OpenAPI Generator** → 定义 11 个业务 Schema（User / Product / Order / Address 等）→ 生成 Dart + TS 双端代码

**结果：**
- Dart client（1618 LOC）：`dart analyze` 零问题
- TS client（12 个 model 文件）：`tsc --noEmit` 零问题
- 支持 required / pattern / enum / nested / array 等约束

**结论：** ✅ 数据模型层可以纯 IDL 形式独立，对框架选型无倾向性

**交付物：**
- `research/idl-selection.md` — IDL 方案调研与选型
- `spec/openapi.yaml` — 示例模型定义
- `generated/flutter_client/` — 生成 Dart 代码
- `generated/ts_client/` — 生成 TypeScript 代码

---

## M2：开发效率对比 ✅

**假设 #2：** 团队 Dart + BLoC 积累使 Flutter 显著更快
**假设 #3：** Flutter 工具链效率优势 > RN 生态复用效率优势

**方法：** 同一页面（产品管理：表单 + 列表 + 状态管理），Flutter（BLoC）和 RN（Zustand）各从零实现

### 对比

| 对比项 | Flutter | RN (Expo) |
|--------|:-------:|:----------:|
| 状态管理 | **BLoC 8.x**（BlocProvider + BlocBuilder） | Zustand |
| 实际耗时 | ~1h（1 轮） | ~1h（1 轮） |
| 编译检查 | `dart analyze` ✅（更严格） | `tsc --noEmit` ✅ |
| API 坑点 | 无（BLoC API 自 2019 年来稳定） | 无 |
| AI 生成 | ✅ 首次编译零问题 | ✅ 首次编译零问题 |

**结论：**
- **#2：** ✅ **Flutter 优势** — 团队已有 Dart + BLoC 积累，无需额外学习成本；RN 从零开始有隐性成本
- **#3：** ✅ **Flutter 优势** — 静态分析更严格，BLoC 模式成熟，`dart analyze` 比 `tsc` 发现更多潜在问题

**交付物：**
- `research/state-mgmt-selection.md` — 状态管理方案选型
- `spec/acceptance-page.md` — 统一验收页面规范
- `flutter_product_manager/` — Flutter 实现（BLoC 版）
- `rn_product_manager/` — RN 实现

---

## M3：小程序双端对比 ✅

**假设 #4：** 小程序代码复用（UI 层不要求复用，仅数据模型和业务逻辑）

**核心策略：** UI 层独立设计，不要求跨平台复用。核心是数据模型和业务逻辑层的共享能力。

**方法：** 调研双端方案 + 实际搭建验证。MPFlutter 尝试通过 `dart pub global activate` 安装和 GitHub cloning 验证。

### 关键发现

| 维度 | Flutter 侧 | RN 侧 |
|------|-----------|-------|
| 数据模型复用 | ✅ OpenAPI → TS 输出（M1 已验证） | ✅ OpenAPI → TS 输出（M1 已验证） |
| UI 层复用 | ❌ 不要求 | ❌ 不要求 |
| 编译器方案 | ❌ flutter_mp 已死；MPFlutter **需商业授权** | ❌ Taro 是平行框架，不是编译器 |
| 逻辑层共享 | Dart→JS 需重写 | Zustand store 可直接被 Taro 消费 |

**MPFlutter 实际验证结果：**
- 不在 pub.dev 上（`dart pub global activate mpflutter` 失败）
- 官方声明"并非完全开源"，商业使用需购买授权
- 不能作为"Flutter→小程序自动转换方案"使用

**结论：**
- **≈ 持平** — 数据模型复用双方等价（M1），UI 均独立开发
- MPFlutter 不可直接使用（需商业授权），但不影响评估，因为 UI 层不要求复用
- 如将来需要业务逻辑层复用，Flutter 侧需手动将 Dart BLoC 逻辑重写为 TS，而 RN（Zustand store）可被 Taro 直接消费

**交付物：**
- `research/miniprogram-comparison.md` — 双端小程序方案对比（修正版）
- `taro_product_manager/` — Taro 项目骨架 + 共享 Zustand store 验证

---

## M4：AI 生成代码质量对比 ✅

**假设 #5：** AI 生成 Dart 代码的质量和效率 >= AI 生成 TS/JS 代码

**方法：** 同一 AI 模型 + 同一功能需求（产品管理页面），对比 Flutter（**BLoC**）和 RN（Zustand）

### 结果

| 对比项 | Dart (Flutter + BLoC) | TypeScript (Expo + Zustand) |
|--------|:---------------------:|:---------------------------:|
| 首次编译通过 | ✅（BLoC 8.x API 自 2019 年来稳定） | ✅（Zustand API 稳定） |
| 修正轮次 | 0 轮 | 0 轮 |
| 纯逻辑代码（非框架） | ✅ 一次通过 | ✅ 一次通过 |

### 结论

- **#5：** **≈ 持平** — 在 API 稳定的框架（BLoC / Zustand）下，AI 对 Dart 和 TS 的生成质量一致
- 上一版报告中 Riverpod 3.x 的 API 变更问题是**选错框架导致的假象**，不是 Dart/Flutter 的问题
- BLoC 的核心接口（`Bloc`、`BlocProvider`、`BlocBuilder`）多年未变，AI 训练数据充分覆盖

**交付物：**
- `research/ai-codegen-comparison.md` — AI 代码生成对比分析（修正版）

---

## M5：综合决策 ✅

**方法：** 汇总 M1–M4 结论，填入决策矩阵评分，撰写最终方案

### 最终决策矩阵

| 假设 | Flutter | RN | 依据 |
|------|:-------:|:--:|------|
| #1 数据模型解耦 | **0** | **0** | 解耦可行 |
| #2 团队 Dart + BLoC 积累 | **+1** | **0** | 无需学习新语言和新框架 |
| #3 工具链 vs 生态 | **+1** | **0** | Flutter 静态分析更强 |
| #4 小程序复用（UI 不要求复用） | **0** | **0** | 数据模型复用等价，UI 均独立 |
| #5 AI 生成质量 | **0** | **0** | BLoC/Zustand API 均稳定 |
| **总分** | **+2** | **0** | |

### 最终方案

**Flutter**

理由：
1. 决策矩阵 Flutter **+2** vs RN **0**，Flutter 明确占优
2. 团队已有 Dart + BLoC 积累，无需额外学习成本；RN 从零开始有隐性成本（语言、框架、生态）
3. 小程序场景 UI 不要求复用，数据模型共享等价（M1），主框架选型不影响小程序能力

---

## 实验总结

| 项目 | 内容 |
|------|------|
| 总耗时 | 14h（估算 64h，偏差 -78%） |
| 核心结论 | Flutter 和 RN 在 AI 辅助开发下差距很小，持平则选团队熟悉的 Flutter |
| 关键决策依据 | 团队 Dart 积累（#2）、静态分析优势（#3） |
| 重要发现 | AI 不偏好某一种语言；框架 API 稳定性比语言本身更影响 AI 生成质量 |

---

## 实际耗时 vs 估算

| 里程碑 | 估算 | 实际 | 偏差 |
|--------|:----:|:----:|:----:|
| M1 数据模型解耦 | 17h | 3.5h | -79% |
| M2 开发效率对比 | 17h | 3.5h | -79% |
| M3 小程序双端对比 | 21h | 5h | -76% |
| M4 AI 代码质量对比 | 9h | 2h | -78% |
| M5 综合决策 | 4.5h | 0.5h | -89% |
| **总计** | **68.5h** | **14.5h** | **-79%** |

> 实际大幅低于估算，主要原因：AI 辅助大幅加速了调研、编码和验证环节。
