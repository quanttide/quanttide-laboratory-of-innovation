# 状态管理方案选定

> 日期：2026-05-30
> 对应 TODO：M2-3

## Flutter 侧

| 方案 | 复杂度 | AI 兼容性 | PoC 适用性 |
|------|:------:|:---------:|:----------:|
| Riverpod | 中 | ⭐⭐⭐⭐⭐ | ✅ 选定 |
| BLoC | 高 | ⭐⭐⭐⭐ | ❌ 过重 |
| Provider | 低 | ⭐⭐⭐⭐ | ❌ 即将被 Riverpod 取代 |
| GetX | 低 | ⭐⭐⭐ | ❌ 非官方，争议大 |

**选定：Riverpod** — `flutter_riverpod`，AI 训练数据充分，API 设计现代，原生支持 `async` 和依赖注入。

## React Native 侧

| 方案 | 复杂度 | AI 兼容性 | PoC 适用性 |
|------|:------:|:---------:|:----------:|
| Zustand | 低 | ⭐⭐⭐⭐⭐ | ✅ 选定 |
| Redux Toolkit | 中 | ⭐⭐⭐⭐ | ❌ 样板代码多，PoC 对比不公平 |
| Jotai | 低 | ⭐⭐⭐⭐ | ❌ 生态小于 Zustand |
| Context + useReducer | 低 | ⭐⭐⭐⭐ | ❌ 不适合复杂状态 |

**选定：Zustand** — API 极简，AI 生成质量高，与 Riverpod 的"单文件 store"模式对应，对比公平。
