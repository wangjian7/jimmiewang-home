---
name: "decision-operations-maintainer"
description: "维护项目 decisions 与 operations 文档。需要新增架构决策、操作手册、脚本用法或踩坑记录时调用。"
---

# 决策与操作文档维护器

## 作用

本 skill 用于维护以下项目文档体系：
- `<project_root>/docs/decisions.md`
- `<project_root>/docs/operations.md`
- `<project_root>/docs/NAVIGATION.md`（如该项目存在此文件）

## 何时调用

在以下场景调用：
- 需要记录新的架构决策或技术选型
- 需要修订、替代已有技术决策
- 需要整理人工操作步骤、部署说明或脚本使用方式
- 需要沉淀踩坑记录、规避方式或经验结论
- 新增核心文档后需要同步更新文档导航

## 规则

### Decisions
- 所有新决策一律追加到“当前任务对应项目”的 `docs/decisions.md`
- 除非用户明确要求，否则不要改写历史决策
- 如果旧决策失效，应新增一条决策说明替代关系
- 优先使用结构化条目，建议包含：
  - 标题
  - 日期
  - 状态
  - 背景
  - 决策
  - 影响
  - 备选方案

### Operations
- 所有操作类说明应追加或补充到“当前任务对应项目”的 `docs/operations.md`
- 重点记录需要人工判断的步骤，不写成纯聊天说明
- 建议包含：
  - 场景
  - 前置条件
  - 执行步骤
  - 验证方式
  - 踩坑记录

### Navigation
- 若该项目存在 `docs/NAVIGATION.md`，新增核心文档后需同步更新
- 导航描述保持简短、易扫读

## 目录识别规则（避免认错目录）
- 以“用户正在操作/提及的项目根目录”为准，在该目录下寻找 `docs/`。
- 如果当前项目的 `docs/` 不存在，则在该项目根目录下创建 `docs/decisions.md` 与 `docs/operations.md`（使用统一模板）。
- 不要把不同项目的决策/操作文档写到同一个项目里；尤其不要默认写入 `jimmiewang.com/docs`。

## 输出风格
- 用语直接、可执行、偏文档化
- 优先写成可长期维护的内容，而不是一次性聊天话术
- 若无充分理由，尽量保持现有结构稳定

## 示例任务
- “把选择 Cloudflare 静态导出的原因记到 decisions”
- “把一次部署踩坑补到 operations”
- “追加一条新的架构决策”
- “新增操作文档后同步更新 NAVIGATION”
