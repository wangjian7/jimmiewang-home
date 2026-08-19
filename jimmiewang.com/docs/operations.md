# Operations

本文件用于记录需要人工判断的操作步骤、脚本调用方式与踩坑记录。

## 使用规则
- 记录所有不适合只靠代码表达的操作流程。
- 优先写清楚前置条件、执行步骤、验证方式、常见失败点。
- 同一类操作应持续补充到同一章节，避免散落。

## 维护模板

### 操作项名称
- 场景:
  - 待补充
- 前置条件:
  - 待补充
- 执行步骤:
  - 待补充
- 验证方式:
  - 待补充
- 踩坑记录:
  - 待补充

## 已记录操作

### Cloudflare Pages 新建项目构建配置
- 场景:
  - 首次将 `jimmiewang.com` 通过 GitHub 接入 Cloudflare Pages 并创建新 Page 项目。
- 前置条件:
  - 代码已推送到 GitHub。
  - Cloudflare 已连接对应 Git 仓库。
  - `jimmiewang.com/next.config.ts` 已配置 `output: "export"`。
- 执行步骤:
  - 在 Cloudflare Pages 新建项目时，选择项目路径为 `jimmiewang.com`。
  - `架构预设` 选择 `Next.js (Static HTML Export)`。
  - `构建命令` 填写 `npx next build`。
  - `输出目录` 填写 `out`。
  - `路径` 填写 `jimmiewang.com`。
  - 保存并触发部署。
- 验证方式:
  - 构建日志中应显示静态页面构建完成。
  - Cloudflare 校验输出目录时不应再报 `jimmiewang.com/out not found`。
  - 本地执行 `npm run build` 后，`jimmiewang.com/out/` 应存在。
- 踩坑记录:
  - 若 `next.config.ts` 未开启 `output: "export"`，即使 `next build` 成功，也不会生成 `out` 目录。
  - 若 Cloudflare 仍报缺少 `out`，通常是 GitHub 上还是旧提交，需先 push 最新配置再重新部署。
