---
name: "trip-update-d1"
description: "直接修改 trip 行程在本地或生产 D1 的内容。需要按某一天、某个 section 局部更新 TRANSPORT、STAY、NOTES、ITINERARY、PHOTOS 时调用。"
---

# Trip D1 更新器

## 作用

本 skill 用于直接修改 `trip.jimmiewang.com` 的行程数据源，不通过页面手工录入，而是直接更新本地或生产 Cloudflare D1 里的 `trips.plan_json`。

适用 section 包括：
- `TRANSPORT`
- `STAY`
- `NOTES`
- `ITINERARY`
- `PHOTOS`
- 以及某一天的 `city`、`dateLabel`、`flight`、`stay` 等字段

## 何时调用

在以下场景调用：
- 用户要求“直接改数据库 / 直接改 D1”
- 用户希望先改本地 D1 预览，再同步到生产 D1
- 用户要修改某个 trip 的某一天、某个 section 的内容
- 用户希望不经过页面，而是直接批量补充航班、酒店、备注、行程条目、照片元数据

## 数据位置

当前项目的数据模型不是拆表明细更新，而是：
- D1 表：`trips`
- 主键字段：`slug`
- 主要内容字段：`plan_json`

因此所有更新都必须遵循“读整份 JSON -> 局部修改 -> 写回整份 JSON”的方式。

## 固定执行目录与 Wrangler 约束

- 本 skill 的默认执行目录固定为：
  - `/Users/wangjian/nextcloud/jimmiewang/trip.jimmiewang.com`
- 不要在仓库根目录 `/Users/wangjian/nextcloud/jimmiewang` 执行 `npm run wrangler ...`，因为该目录没有当前项目的 `package.json`。
- 不要假设系统全局安装了 `wrangler`；当前项目应始终使用本地依赖，通过以下形式调用：
  - `npm run wrangler -- whoami`
  - `npm run wrangler -- login`
  - `npm run wrangler -- d1 execute ...`
- 不要直接使用 `wrangler ...` 裸命令，除非已经明确确认用户本机全局安装并希望那样执行。

## 生产鉴权规则

- 生产环境默认使用用户本机已登录的 Wrangler OAuth 会话，不使用 `CLOUDFLARE_API_TOKEN` 方案。
- 如果发现未登录、登录态失效，或无法确认登录态，先让用户手动执行：
  - `cd /Users/wangjian/nextcloud/jimmiewang/trip.jimmiewang.com`
  - `npm run wrangler -- login`
- 登录后优先让用户执行：
  - `npm run wrangler -- whoami`
- 只有确认 `whoami` 返回 Cloudflare 账号信息后，才继续执行远端 D1 更新。
- 不要指导用户把 Cloudflare API Token 粘贴到终端或对话中作为常规方案。
- 若用户此前暴露过 token，完成任务后应提醒其尽快 rotate / 删除该 token。

## 核心原则

### 一律局部更新
- 不要凭空重建整份 `plan_json`
- 不要只根据用户一句话覆盖整天内容
- 必须先读取当前 D1 中已有的 `plan_json`
- 仅修改用户指定的 `day` 与 `section`
- 未提及的 section 必须保持原样

### 严禁误擦除其他内容
- 改 `TRANSPORT` 时，不得擦掉 `ITINERARY`、`STAY`、`NOTES`、`PHOTOS`
- 改 `NOTES` 时，不得覆盖 `flights`、`hotels`、`schedule`
- 改 `ITINERARY` 时，不得改坏同一天已有航班、酒店、照片
- 若用户表达不清，先读取现状并在结果中明确说明将保留哪些内容

### 先本地后远端
- 若用户未明确要求直接改生产，优先先改 `--local`
- 涉及生产数据时，先做备份，再改 `--remote`
- 生产更新后必须回读验证

### 环境必须明确
- 每次执行前都必须明确目标环境是 `local` 还是 `remote`
- 如果用户没有明确说明环境，必须先向用户确认，不能自行假设
- 只有在用户明确说“生产 / remote / 线上”时，才允许直接改生产 D1
- 只有在用户明确说“本地 / local”时，才允许只改本地 D1

## 标准流程

### 1. 确认目标
至少确认：
- `slug`
- 目标环境：`local` 或 `remote`
- 目标 `day id` 或明确日期
- 目标 `section`
- 用户要新增、替换、追加还是删除

如果缺少“目标环境”，先提问确认，再继续后续步骤。

### 2. 读取当前内容
优先读取：
- `SELECT slug, updated_at FROM trips WHERE slug = ?`
- `SELECT plan_json FROM trips WHERE slug = ?`

读取后要解析 JSON，并定位对应的 `day`。

### 3. 备份
更新前必须备份原始 `plan_json`：
- 本地：保存到项目可追踪位置或临时文件
- 远端：至少导出一份原始 `plan_json` 到临时文件

若是高风险更新，建议同时记录 `updated_at`。

### 4. 局部修改
只改指定字段：
- `TRANSPORT` -> `flights`
- `STAY` -> `hotels`
- `NOTES` -> `notes`
- `ITINERARY` -> `schedule`
- `PHOTOS` -> `photos`

常见映射：
- `TRANSPORT` 允许同时更新 `flight`
- `STAY` 允许同时更新 `stay`
- 修改结构化数组时，优先保留已有 `id`
- 新增项必须生成稳定、唯一的 `id`

### 5. 写回 D1
将更新后的完整 `plan_json` 写回：
- `UPDATE trips SET plan_json = ?, updated_at = ? WHERE slug = ?`

如果记录不存在，再根据场景决定是否允许 `INSERT`。除非用户明确要求，不要擅自新建 trip。

### 6. 回读验证
写回后必须再次查询：
- `updated_at`
- 目标 `day`
- 目标 `section`

确认：
- 新内容已生效
- 非目标 section 仍然存在
- JSON 没损坏

## 环境规则

### 未指定环境时
- 先问用户要改 `local` 还是 `remote`
- 不要因为“通常先本地后远端”就自动开始改本地
- 只有当用户明确要求“先本地试一下”时，才执行本地更新

### 本地 D1
- 使用 `npx wrangler d1 execute <db_name> --local ...`
- 本地 sqlite 通常位于 `.wrangler/state/v3/d1/...`
- 可以使用 Python 脚本直接修改本地 sqlite，但修改后必须回读验证

### 生产 D1
- 固定先进入目录：
  - `cd /Users/wangjian/nextcloud/jimmiewang/trip.jimmiewang.com`
- 先确认登录态：
  - `npm run wrangler -- whoami`
- 若未登录，先让用户手动执行：
  - `npm run wrangler -- login`
- 使用 `npm run wrangler -- d1 execute <db_name> --remote ...`
- 执行前先备份远端原始 `plan_json`
- 推荐先生成 SQL 文件，再执行 `--file`
- 执行后必须回读验证
- 不要默认切换到 `CLOUDFLARE_API_TOKEN` 方案
- 若遇到 Wrangler 默认日志目录权限问题，可将日志路径改到项目内，例如：
  - `WRANGLER_LOG_PATH="/Users/wangjian/nextcloud/jimmiewang/trip.jimmiewang.com/.tmp/wrangler-debug.log"`

## 推荐实现方式

优先顺序：
1. 在 `/Users/wangjian/nextcloud/jimmiewang/trip.jimmiewang.com` 目录执行 `npm run wrangler -- whoami`，确认登录态
2. `npm run wrangler -- d1 execute` 读取远端/本地数据
3. 用短脚本解析和局部修改 `plan_json`
4. 生成明确的 `UPDATE` SQL
5. 执行 SQL
6. 回读验证

不要直接手写超长 SQL 字符串并在终端 heredoc 中拼接中文 JSON，容易损坏内容。
若使用 `--file` 导入 SQL 且内容中包含中文，优先生成 ASCII 安全版本（例如将 JSON 中的中文转成 `\uXXXX`），避免 Wrangler 导入时触发 ByteString 编码报错。

## 操作约束

- 未经用户要求，不要直接改生产
- 未经用户确认，不要默认改本地
- 改生产前，最好先在本地 D1 预演
- 不要删除临时备份，除非用户明确要求
- 如果要删除临时脚本或备份文件，必须先征得用户同意
- 如果用户指定“只改某 section”，不要顺手改别的字段文案
- 若生产更新依赖 Wrangler 登录态，必须先确认用户已在项目目录手动完成 `npm run wrangler -- login`

## 回答模板

完成后应明确告诉用户：
- 改的是本地还是生产
- 改的是哪个 `slug`
- 改的是哪一天、哪个 section
- 是否已回读验证
- 是否保留了其他 section
- 备份文件在哪里

## 示例任务

- “把 `au-2026-09-30` 的 `d-0930` 交通改成 3 条真实航班，先改本地 D1”
- “把生产 D1 里 `10/1` 的 `STAY` 改成 Hilton，并保留原 itinerary”
- “给 `NOTES` 追加一段提醒，不要覆盖原备注”
- “把某天的 `ITINERARY` 增加 2 条安排，但不要动已有航班和酒店”
