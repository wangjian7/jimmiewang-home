---
name: catalog-player-normalize
description: >-
  离线批量为 cardhobby commodity_details 回填 catalog_player 规范英文名。
  读取球员名为空的详情（默认约 1000 条），由当前对话 LLM 从 title/属性归一球员名后写回。
  在用户提到 catalog_player、球员规范名、批量翻译球员、players-export/apply、
  或离线补球员名时使用。
---

# catalog_player 离线归一（skill）

## 作用

对**已 enrich** 的 `commodity_details` 做离线操作（不打卡淘 API）：

1. 导出 `catalog_player` 为空的候选行（title + 可选属性 Player）
2. **本对话中的 LLM** 产出规范英文球员名
3. 写回 `catalog_player` / `catalog_player_source`

目标支撑后续「系列 × 球员」成交均价 / 高低价。多人卡 / 多张 lot **不填名**（decision **0033**）。

## 何时调用

- 用户要补 `catalog_player` / 球员规范名
- 用户说「导出一千条交给 LLM 再更新」
- 用户提到 `players-export` / `players-apply`

## 固定目录

按当前机器选一处：

```bash
# Osaka（开发）
cd /Users/wangjian/nextcloud/jimmiewang/cardhobby.jimmiewang.com

# Tokyo（生产）
cd /Volumes/KS/repo/jimmie-home/cardhobby.jimmiewang.com

source .venv/bin/activate
export PYTHONPATH=src
```

临时文件写在**当前项目**下 `tmp/`（例如 `tmp/players_export.jsonl`）。在 Tokyo 跑时勿用开发机 `~/nextcloud/...` 路径。

先确保迁移（含 `009_catalog_player.sql`）：

```bash
cardhobby db-migrate
```

## 标准流程（必须按序）

### 1. 导出候选

```bash
cardhobby players-export --limit 1000 --out tmp/players_export.jsonl
# 可选：--sport Soccer
# 默认跳过 title 含 lot/打包/多人 等提示的行；若要包含加 --include-lots
```

每行 JSON 字段：`commodity_id`, `title`, `player_attr`, `catalog_sport`, `catalog_manufacturer`, `catalog_set`, `catalog_year`。

### 2. LLM 归一（本 skill 核心）

Agent **读取** `tmp/players_export.jsonl`（可分块，例如每批 50～100 条），对每条输出：

| 字段 | 规则 |
|------|------|
| `commodity_id` | 原样 |
| `catalog_player` | **规范英文名**（如 `Lionel Messi`, `Kobe Bryant`）；称号映射（小飞侠→Kobe Bryant，C罗→Cristiano Ronaldo） |
| 多人 / 多张 lot / 无法唯一确定 | `catalog_player`: `null` |
| 已有干净 `player_attr` 英文名 | 可直接规范化沿用 |

**禁止**：

- 用中文当 `catalog_player`
- 多人 lot 硬猜一个「主球员」
- 改动 title / 其它 catalog_* 列

写出结果文件，例如 `tmp/players_apply.jsonl`，每行：

```json
{"commodity_id": 123, "catalog_player": "Lionel Messi"}
{"commodity_id": 456, "catalog_player": null}
```

大文件时分多轮：读一块 → 写一块 append → 再下一块；最后一次性 apply 或分段 apply。

### 3. 写回数据库

```bash
cardhobby players-apply tmp/players_apply.jsonl
```

- 有名字 → `catalog_player_source=llm`
- `null` → `catalog_player` 空且 `source=skip`（避免反复导出）
- 已有 `catalog_player` 的行跳过（幂等）

### 4. 验证

```bash
# 抽样
python - <<'PY'
from sqlalchemy import text
from cardhobby.db import engine
with engine.connect() as c:
    print(c.execute(text("""
      select catalog_player_source, count(*) from commodity_details
      where scrape_status='ready' group by 1 order by 2 desc
    """)).fetchall())
    print(c.execute(text("""
      select catalog_player, count(*) from commodity_details
      where catalog_player is not null
      group by 1 order by 2 desc limit 15
    """)).fetchall())
PY
```

向用户汇报：导出条数、写入条数、跳过/null 条数、若干样例。

## 口径提醒

- 检索主键用英文规范名；中文/称号只作输入线索
- 不参与价统计的多人/lot：输出 `null` 即可，**不必**单独打标列（0033）
- 本流程是 **skill + 对话 LLM**，不是 enrich 同步，也不是必须上 n8n

## 可选后续（本 skill 不做除非用户要求）

- 把高频称号写入别名表，下次优先词典
- enrich 时顺带写 attr 归一
- `/sold` 筛 `catalog_player` + 系列均价 API
