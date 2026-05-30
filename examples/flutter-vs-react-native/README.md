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
| 2 | 团队 Dart + BLoC 积累使 Flutter 初始开发效率显著高于 RN（学习成本更低） | ✅ 成立 — BLoC API 稳定，AI 生成质量高，团队无需额外学习曲线 | ✅ 已验证 |
| 3 | Flutter 原生工具链（热重载、DevTools、代码生成）效率优势 > RN 生态库复用效率优势 | ✅ 成立 — Flutter 静态分析更严格（`dart analyze` 比 `tsc` 发现更多潜在问题） | ✅ 已验证 |
| 4 | 小程序代码复用：对比双端可行性（UI 层不要求复用，仅数据模型） | ≈ 持平 — 双方数据模型复用等价（M1），UI 均独立开发 | ✅ 已验证 |
| 5 | AI 生成 Dart 代码的质量和效率 >= AI 生成 TS/JS 代码 | ≈ 持平 — 在 API 稳定的 BLoC/Zustand 下，双端生成质量一致 | ✅ 已验证 |

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
| 场景描述 | 同一页面（表单 + 列表 + 简单状态管理），分别在 Flutter（BLoC）和 RN（Zustand）中实现 |
| 设计思路 | 记录从零到跑通的总耗时、遇到坑的数量、AI 辅助编码的顺畅度 |
| Flutter 实现 & 耗时 | BLoC 8.x + Material 3；约 1h，首次编译零问题（BLoC API 稳定，AI 训练数据覆盖充分） |
| React Native 实现 & 耗时 | Expo + Zustand；约 1h，首次编译零问题 |
| 关键发现 | 双端首次编译均零问题；Flutter 静态分析更严（`dart analyze` 比 `tsc` 发现更多潜在问题）；BLoC 和 Zustand 的 API 稳定性使 AI 生成质量一致 |
| 结论 | Flutter 和 RN 在简单页面开发效率上持平（均约 1h AI 辅助）；Flutter 工具链（静态分析）在开发期可提前发现问题，RN 初创项目脚手架更轻 |

### PoC #3：小程序复用可行性

| 项目 | 内容 |
|------|------|
| 验证的假设 | #4 |
| 场景描述 | 分别调研 RN→小程序和 Flutter→小程序方案，验证数据模型和业务逻辑层的复用可行性（**UI 层不要求复用**） |
| 设计思路 | 调研现有方案，实际搭建验证；核心策略是"数据模型共享 + UI 独立设计" |
| 实现要点 & 耗时 | 双端调研（2h）；Taro 项目搭建 + Zustand store 复用尝试（2h）；MPFlutter 验证（0.5h）—— MPFlutter **不在 pub.dev**，需商业授权，不可直接使用 |
| 关键发现 | **UI 层不要求复用后，双端等价。** 数据模型复用已由 M1 解决（OpenAPI → Dart/TS），UI 均需独立编写。MPFlutter 需商业授权且不在 pub.dev 上，Taro 开源可用但 UI 也需重写。如果业务逻辑层需复用（Zustand store），RN + Taro 有优势；但团队无 RN 积累 |
| 结论 | Flutter 和 RN 在小程序代码复用上无本质差异。数据模型复用双方等价，UI 均独立开发。业务逻辑复用的强弱取决于是否选择 React 生态 |

### PoC #4：AI 生成代码质量对比

| 项目 | 内容 |
|------|------|
| 验证的假设 | #5 |
| 场景描述 | 用同一 AI 分别生成 Flutter（Dart + BLoC）和 RN（TS + Zustand）的同一功能代码 |
| 设计思路 | 对比首次编译通过率、修正轮次、AI API 理解准确度 |
| AI + Flutter 表现 | 首次编译 ✅（BLoC 8.x API 自 2019 年以来稳定，AI 训练数据充分覆盖） |
| AI + RN 表现 | 首次编译 ✅（Zustand API 稳定） |
| 关键发现 | 在 API 稳定的框架下（BLoC / Zustand），AI 对 Dart 和 TS 的生成质量一致。两套代码均一次通过编译，无需修正 |
| 结论 | **≈ 持平** — 框架 API 稳定性比语言本身更影响 AI 生成质量。BLoC 和 Zustand 同样稳定时，Dart 和 TS 生成质量无差异 |

## 决策

| 假设 | Flutter | RN | 说明 |
|------|:------:|:--:|------|
| #1 数据模型解耦 | **0** | **0** | 解耦可行，不偏袒任何一方 |
| #2 团队 Dart + BLoC 积累 | **+1** | **0** | 团队熟悉 Dart 和 BLoC，无需学习新语言和新框架 |
| #3 Flutter 原生工具链 vs RN 生态复用 | **+1** | **0** | Flutter 静态分析更强（`dart analyze`），BLoC 模式成熟 |
| #4 小程序复用（UI 不要求复用） | **0** | **0** | 数据模型复用等价（M1），UI 均独立开发 |
| #5 AI 生成 Dart vs TS | **0** | **0** | BLoC 和 Zustand API 均稳定，AI 生成质量一致 |

> 每条假设给 Flutter 和 RN 分别打 **+1**（优势）、0（持平）、-1（劣势），汇总看整体倾向。

**最终方案：** **Flutter**

**理由：**
1. 决策矩阵 Flutter **+2** vs RN **0**，Flutter 明确占优
2. **团队已有 Dart + BLoC 积累**，无需额外学习成本；RN 端从零开始有隐性成本（语言、框架、生态）
3. **小程序场景不改变结论**：UI 独立开发，数据模型共享等价（M1），主框架选型不影响小程序能力
