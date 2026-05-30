# 小程序双端对比调研

> 日期：2026-05-30
> 对应 TODO：M3-1, M3-2

## 核心发现

**现有 RN / Flutter 代码都无法自动转换到微信小程序。** 两个方向都不是"编译器"，都需要重写 UI 层。

---

## RN → 小程序

| 方案 | 类型 | 可行性 |
|------|------|--------|
| **Taro 4.x** | 跨平台框架（非编译器） | 需用 Taro API 重写 UI，不支持直接转换现有 RN 代码 |
| **uni-app** | 基于 Vue 的跨端框架 | 不能消费 React 代码 |
| **共享 Zustand store** | 纯 TS 逻辑复用 | ✅ 可行，zustand store 可提取为共享包 |

**结论：** RN → 小程序没有自动转换路径。如果用 Taro 从头写，可共享业务逻辑层（store / 模型），UI 层需重写。

---

## Flutter → 小程序

| 方案 | 类型 | 可行性 |
|------|------|--------|
| **flutter_mp** | 编译器 | ❌ 已死，仓库404 |
| **MPFlutter** | 平行框架（非编译器） | 需用 MPFlutter API 重写 UI，只能共享纯 Dart 模型 |
| **FinClip** | 小程序容器 | 不能编译 Flutter，只可宿主嵌入标准小程序 |
| **Flutter Web + WebView** | 嵌入方案 | UI 可复用但无法调用微信原生 API，性能差 |
| **共享 Dart 模型** | 纯逻辑复用 | ✅ 可行（已通过 OpenAPI Generator 解决） |

**结论：** Flutter → 小程序也没有自动转换路径。MPFlutter 需重写且社区小，Flutter Web 嵌入有严重局限性。

---

## 双端对比

| 维度 | RN → 小程序 | Flutter → 小程序 |
|------|:----------:|:----------------:|
| **自动转换工具** | ❌ 无 | ❌ 无 |
| **跨端框架** | Taro（React API） | MPFlutter（Flutter-like API） |
| **框架接近度** | ⭐⭐⭐⭐ Taro 的 JSX 与 RN 相似 | ⭐⭐ MPFlutter API 与标准 Flutter 有差异 |
| **逻辑层复用** | 可共享 Zustand store + TS 模型 | 可共享 Dart 模型 |
| **UI 层复用** | 0%（需重写） | 0%（需重写） |
| **社区成熟度** | ⭐⭐⭐⭐ Taro 生态成熟 | ⭐⭐ MPFlutter 社区小 |

---

## 最终判断

**小程序场景下 RN 和 Flutter 没有本质差异**——两者都需要为小程序单独编写 UI 层。

RN 的微弱优势仅在于 Taro（React 生态）比 MPFlutter（小众框架）更成熟，如果你最初就用 Taro 而非 RN 从头开发，可以一次编码双端运行。但这对于已有 RN 代码的迁移来说没有帮助。

如果小程序是刚需，最务实的方案是：
1. 数据模型层：通过 OpenAPI Generator 的 TS 输出复用（M1 已验证）
2. UI 层：使用微信原生或 Taro 单独开发
3. 业务逻辑层：提取 Zustand store（RN 侧）为共享包
