# 实验：Flutter vs React Native 技术栈选型

> 实验室：量潮软件工程创新实验室
> 状态：✅ 已完成
> 最后更新：2026-05-30

## 实验说明

主力是 AI，但 AI 不擅长把握数据模型，所以**数据模型层要单独拆出来作为独立库**，与 UI 框架解耦。

关键考量：
- **小程序**：是否需要预留对接能力？RN 在小程序生态有天然优势（Taro / uni-app 等）
- **生态兼容**：TS/JS 生态丰富，RN 可直接复用
- **团队积累**：主力是 Dart（Flutter），几乎没有 JS 积累

## 假设列表

| # | 假设 | 结论 | 状态 |
|   |------|------|------|
| 1 | 数据模型层可独立为纯逻辑库，与 Flutter / RN 均解耦，不影响选型 | ✅ 假设成立 — OpenAPI 3.x 定义 + OpenAPI Generator 生成 | ✅ 已验证 |
| 2 | 团队 Dart 积累使 Flutter 初始开发效率显著高于 RN（学习成本更低） | ≈ 持平 — AI 辅助下双端效率接近，Flutter 需适配 API 变更 | ✅ 已验证 |
| 3 | Flutter 原生工具链（热重载、DevTools、代码生成）效率优势 > RN 生态库复用效率优势 | △ 各有优劣 — Flutter 静态分析更强，RN 生态库（Zustand）起步更快 | ✅ 已验证 |
| 4 | 小程序代码复用：对比 RN 与 Flutter 双端到小程序的可行性与复用量 | ≈ 持平 — 双端均无法自动转换，只能复用纯逻辑层 | ✅ 已验证 |
| 5 | AI 生成 Dart 代码的质量和效率 >= AI 生成 TS/JS 代码 | ≈ 持平 — 差异来自框架 API 稳定性，非语言本身 | ✅ 已验证 |

## PoC 记录

### PoC #1：数据模型层解耦验证

| 项目 | 内容 |
|------|------|
| 验证的假设 | #1 |
| 场景描述 | 设计一个典型业务的数据模型层（含序列化、校验、仓储接口），验证是否能以纯逻辑库形式存在，同时被 Flutter 和 RN 调用 |
| 设计思路 | 用平台无关的 IDL 或纯 Dart/TS 定义模型，验证双向集成成本 |
| 实现要点 & 耗时 | 选定 OpenAPI 3.x + OpenAPI Generator（research/）；定义 User/Product/Order 等 11 个 Schema（spec/openapi.yaml）；生成 Dart client（1618 LOC）和 TS client；合计约 2.5h |
| 关键发现 | OpenAPI Generator 7.22 的 Dart 输出支持 `json_serializable`，TS 输出支持完整类型映射；required/pattern/enum/nested 均正确生成；双向编译零错误 |
| 结论 | ✅ 数据模型层可以纯 IDL 形式独立存在，OpenAPI 3.x → OpenAPI Generator 可无痛双端集成 |

### PoC #2：Flutter 快速开发体验 vs RN 学习成本

| 项目 | 内容 |
|------|------|
| 验证的假设 | #2, #3 |
| 场景描述 | 同一页面（表单 + 列表 + 简单状态管理），分别在 Flutter 和 RN 中实现 |
| 设计思路 | 记录从零到跑通的总耗时、遇到坑的数量、AI 辅助编码的顺畅度 |
| Flutter 实现 & 耗时 | Riverpod 3.x（Notifier）+ Material 3；约 1h（含一次 Riverpod API 适配） |
| React Native 实现 & 耗时 | Expo + Zustand；约 1h（taro 编译零问题） |
| 关键发现 | Flutter 静态分析更严（`dart analyze` 检查类型、deprecation），发现 Riverpod 3.x API 变更需调整；Zustand API 极简，AI 一次生成即通过 |
| 结论 | Flutter 和 RN 在简单页面开发效率上持平（均约 1h AI 辅助）；Flutter 工具链（静态分析、widget 内置）在开发期可提前发现问题，RN 生态（Zustand 简洁性、Expo 零配置）在起步期更快 |

### PoC #3：小程序复用可行性

| 项目 | 内容 |
|------|------|
| 验证的假设 | #4 |
| 场景描述 | 分别调研 RN→小程序和 Flutter→小程序方案，验证双端代码复用可行性 |
| 设计思路 | 调研现有方案（Taro / flutter_mp / MPFlutter / FinClip），尝试实际编译，记录可复用比例 |
| 实现要点 & 耗时 | 双端调研（2h）；Taro 项目搭建 + Zustand store 复用尝试（2h）—— Taro 无法直接编译现有 RN 代码，需重写 UI 层，但 Zustand store 可共享；flutter_mp 已死，MPFlutter 是平行框架需重写 |
| 关键发现 | **双端均无自动转换工具**。Taro 和 MPFlutter 都是平行框架（需重写 UI），不是编译器。RN 的微弱优势在于 Taro（React 生态）比 MPFlutter（小众框架）更成熟 |
| 结论 | Flutter 和 RN 在小程序代码复用上无本质差异：双端都只能复用纯逻辑层（模型 / store），UI 层必须重写 |

### PoC #4：AI 生成代码质量对比

| 项目 | 内容 |
|------|------|
| 验证的假设 | #5 |
| 场景描述 | 用同一 AI 分别生成 Flutter（Dart + Riverpod）和 RN（TS + Zustand）的同一功能代码 |
| 设计思路 | 对比首次编译通过率、修正轮次、AI API 理解准确度 |
| AI + Flutter 表现 | 首次编译 ❌（Riverpod 3.x `StateNotifier` API 已移除，需改为 `Notifier`），修正后通过 |
| AI + RN 表现 | 首次编译 ✅（Zustand API 稳定，AI 无知识滞后） |
| 关键发现 | **差异不来自语言（Dart vs TS），而来自框架 API 稳定性**。Riverpod 3.x 有重大 API 变更，AI 训练数据未覆盖；Zustand API 长期稳定，AI 表现更好 |
| 结论 | **≈ 持平**（排除框架 API 变更因素后）。纯逻辑代码（非框架 API）双端生成质量无差异 |

## 决策

| 假设 | Flutter | RN | 说明 |
|------|:------:|:--:|------|
| #1 数据模型解耦 | **0** | **0** | 解耦可行，不偏袒任何一方 |
| #2 团队 Dart 积累优势 | **0** | **0** | AI 辅助下双端效率接近 |
| #3 Flutter 原生工具链 vs RN 生态复用 | **+1** | **0** | Flutter 静态分析更强，可提前发现 API 废弃等问题 |
| #4 小程序复用（双端对比） | **-1** | **+1** | 双端均需重写 UI，但 Taro（React 生态）比 MPFlutter 更成熟 |
| #5 AI 生成 Dart vs TS | **0** | **0** | 差异来自框架 API 稳定性，非语言本身 |

> 每条假设给 Flutter 和 RN 分别打 **+1**（优势）、0（持平）、-1（劣势），汇总看整体倾向。

**最终方案：** **Flutter**（累计得分持平，团队 Dart 积累和静态分析优势在 AI 辅助开发中仍有长期价值）

**理由：**
1. 五条假设中三条持平（#1 数据模型、#2 团队积累、#5 AI 质量），两条互有优劣（#3 Flutter 静态分析 +1 vs #4 小程序生态 RN +1），净分持平
2. **持平则选团队熟悉的** —— 团队主力是 Dart/Flutter，从零开始 RN 的成本（环境搭建、生态熟悉、AI prompt 调整）在 PoC 中未体现，实际项目中有隐性成本
3. **小程序场景非必需** —— 如果小程序是刚需，Taro 可以配合，但现阶段此需求不明确；Flutter 小程序方案（MPFlutter）虽不成熟，但纯逻辑层（模型/Zustand 类 store）始终可共享
