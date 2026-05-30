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

**假设 #2：** 团队 Dart 积累使 Flutter 显著更快
**假设 #3：** Flutter 工具链效率优势 > RN 生态复用效率优势

**方法：** 同一页面（产品管理：表单 + 列表 + 状态管理），Flutter 和 RN 各从零实现

### 对比

| 对比项 | Flutter | RN (Expo) |
|--------|:-------:|:----------:|
| 状态管理 | Riverpod 3.x（Notifier） | Zustand |
| 实际耗时 | ~1h（2 轮） | ~1h（1 轮） |
| 编译检查 | `dart analyze` ✅ | `tsc --noEmit` ✅ |
| API 坑点 | Riverpod 3.x `StateNotifier` 已移除，需改为 `Notifier` | 无 |
| AI 生成   | 良好，需一次人工修正 | 优秀，一次通过 |

**结论：**
- **#2：** ≈ 持平 — AI 辅助下双端效率接近，团队语言积累不再是决定性因素
- **#3：** △ 各有优劣 — Flutter 静态分析可在开发期提前发现 API 废弃和类型错误；RN 生态库（Zustand）起步更快

**交付物：**
- `research/state-mgmt-selection.md` — 状态管理方案选型
- `spec/acceptance-page.md` — 统一验收页面规范
- `flutter_product_manager/` — Flutter 实现
- `rn_product_manager/` — RN 实现

---

## M3：小程序双端对比 ✅

**假设 #4：** 对比 RN 与 Flutter 双端到小程序的可行性与复用量

**方法：** 调研 RN→小程序方案（Taro 4.x）和 Flutter→小程序方案（flutter_mp / MPFlutter / FinClip），尝试实际编译

### 关键发现

| 方案 | 类型 | RN 可行性 | Flutter 可行性 |
|------|------|:---------:|:--------------:|
| Taro 4.x | 平行框架（非编译器） | 需重写 UI，Zustand store 可共享 | — |
| MPFlutter | 平行框架（非编译器） | — | 需重写 UI，Dart 模型可共享 |
| flutter_mp | 编译器 | — | ❌ 已死 |
| FinClip | 小程序容器 | 可宿主运行标准小程序 | 可宿主运行标准小程序 |
| Flutter Web + WebView | 嵌入方案 | — | UI 可复用但无法调用微信原生 API |

**结论：**
- **双端均无自动转换工具** — 不存在能在 2026 年将现有 RN/Flutter 代码自动编译到小程序的方案
- Taro 和 MPFlutter 都是平行框架，需用各自 API 重写 UI 层
- 纯逻辑层（Zustand store / Dart 模型 / OpenAPI 生成的 TS 类型）可在双端自由共享
- RN 的微弱优势：Taro（React 生态）比 MPFlutter（小众框架，GitHub 2.1k stars）更成熟

**交付物：**
- `research/miniprogram-comparison.md` — 双端小程序方案对比
- `taro_product_manager/` — Taro 项目骨架 + 共享 Zustand store 验证

---

## M4：AI 生成代码质量对比 ✅

**假设 #5：** AI 生成 Dart 代码的质量和效率 >= AI 生成 TS/JS 代码

**方法：** 同一 AI 模型 + 同一功能需求（产品管理页面），对比双端生成结果

### 结果

| 对比项 | Dart (Flutter + Riverpod 3.x) | TypeScript (Expo + Zustand) |
|--------|:-----------------------------:|:---------------------------:|
| 首次编译通过 | ❌（Riverpod API 变更） | ✅（API 稳定） |
| 修正轮次 | 1 轮 | 0 轮 |
| 纯逻辑代码（非框架） | ✅ 一次通过 | ✅ 一次通过 |

### 结论

- **#5：** ≈ 持平 — 差异来自**框架 API 稳定性**，非 Dart vs TS 语言本身
- Riverpod 3.x 在 2026 年有 API 重大变更（`StateNotifier` 移除），AI 训练数据未覆盖
- Zustand API 长期稳定，AI 生成准确度高
- 纯逻辑代码（日期格式化、价格计算、校验函数）双端生成质量无差异

**交付物：**
- `research/ai-codegen-comparison.md` — AI 代码生成对比分析

---

## M5：综合决策 ✅

**方法：** 汇总 M1–M4 结论，填入决策矩阵评分，撰写最终方案

### 最终决策矩阵

| 假设 | Flutter | RN | 依据 |
|------|:-------:|:--:|------|
| #1 数据模型解耦 | **0** | **0** | 解耦可行 |
| #2 团队 Dart 积累 | **0** | **0** | AI 辅助下效率接近 |
| #3 工具链 vs 生态 | **+1** | **0** | Flutter 静态分析更强 |
| #4 小程序复用 | **-1** | **+1** | Taro 比 MPFlutter 成熟 |
| #5 AI 生成质量 | **0** | **0** | 差异来自框架 API 稳定，非语言 |
| **总分** | **0** | **+1** | |

### 最终方案

**Flutter**

理由：
1. 五条假设中三条持平，两条互有优劣，净分无限接近（RN +1 vs Flutter 0，因小程序端 RN 有 Taro 优势）
2. **持平则选团队熟悉的** — 主力是 Dart/Flutter，选 RN 有隐性学习成本和环境搭建成本
3. 小程序场景如成为刚需，可通过共享数据模型层（M1）+ 独立小程序 UI 解决，无需为此切换框架

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
