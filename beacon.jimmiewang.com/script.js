const registryData = {
  metrics: [
    { label: "活跃项目", value: 7, note: "其中 3 个在持续迭代" },
    { label: "Agents", value: 5, note: "2 个存在 skill 未同步" },
    { label: "Skills", value: 18, note: "核心 skill 已形成复用体系" },
    { label: "可爬资源", value: 9, note: "3 个需要登录或浏览器态" },
    { label: "Datasets", value: 6, note: "2 个尚未被前端消费" },
    { label: "Workflows", value: 8, note: "4 条已自动化，2 条半自动" }
  ],
  spotlight: [
    {
      title: "trip.jimmiewang.com",
      detail: "消费航班、照片与行程数据，是当前最成熟的能力展示层"
    },
    {
      title: "China Eastern / ceair",
      detail: "提供航班价格与直飞信息，是 trip 项目的核心航班 source"
    },
    {
      title: "Playwright + Mac Mini launchd",
      detail: "负责真实浏览器抓取与每日定时执行，补足云端抓取的不稳定"
    },
    {
      title: "D1 flight_quotes",
      detail: "沉淀为结构化时间序列数据，可继续衍生趋势、提醒与观察器"
    }
  ],
  insights: [
    {
      level: "warning",
      title: "两个 Agent 的 skill 清单不一致",
      detail: "Hermes Main 有 18 个预期 skills，但实际同步仅 15 个，存在能力漂移。"
    },
    {
      level: "info",
      title: "qtfm.cn 的采集能力尚未产品化",
      detail: "已经能通过 skill 爬取音频资源，但还没有沉淀成 dataset 或站点入口。"
    },
    {
      level: "critical",
      title: "部分高价值 source 依赖浏览器态",
      detail: "ceair、Trip 类 source 存在登录、风控或页面反爬，需要记录成功条件。"
    }
  ],
  ideas: [
    {
      title: "把 Source 变成能力目录",
      detail: "为每个 source 标注 access mode、anti-bot level、成功抓取方式，让它从“经验”变成“资产”。"
    },
    {
      title: "给 Agent 增加同步健康度",
      detail: "把 expected skills、actual skills 与 sync status 做成热力图，优先暴露断层。"
    },
    {
      title: "让 Dataset 进入灵感视图",
      detail: "找出已经存在但没有页面消费的数据资产，作为下一批产品化入口。"
    }
  ],
  gaps: [
    {
      title: "ceair 采集仍需真实浏览器环境",
      detail: "自动化稳定性依赖 Playwright 与网络环境，不宜只记录为“有这个 source”。"
    },
    {
      title: "skills 版本与同步路径未统一",
      detail: "需要把 canonical path、synced_to、last_synced_at 作为一等字段收录。"
    },
    {
      title: "workflow 的 owner 和失败模式尚未标准化",
      detail: "当前知道流程在跑，但不够容易定位谁维护、哪里容易挂。"
    }
  ],
  entities: [
    {
      id: "project-trip",
      kind: "project",
      name: "trip.jimmiewang.com",
      status: "active",
      summary: "旅行与航班观察站点，已经承载行程、航班价格、抓取调度与运维视图。",
      tags: ["Next.js", "Cloudflare Pages", "D1", "Playwright"],
      related: ["source-ceair", "source-qtfm", "infra-macmini", "workflow-flight-scrape", "dataset-flight-quotes"],
      updatedAt: "今天 15:00",
      meta: ["workspace: /nextcloud/jimmiewang/trip.jimmiewang.com", "prod: Cloudflare Pages", "mode: active"],
      actions: ["补一个 Source 视图入口", "把 qtfm 资产接进 registry", "增加 dataset 消费关系"]
    },
    {
      id: "project-registry",
      kind: "project",
      name: "beacon.jimmiewang.com",
      status: "experimental",
      summary: "工作空间能力资产总控台原型，用来统一展示项目、能力与关系。",
      tags: ["Static HTML", "Registry", "Prototype"],
      related: ["agent-hermes", "skill-dashboard", "workflow-registry-sync"],
      updatedAt: "刚刚",
      meta: ["workspace: 当前目录", "mode: prototype", "goal: discoverability"],
      actions: ["继续补 links 模型", "接 projects.yaml", "加 agent/source 两个独立视图"]
    },
    {
      id: "project-audio",
      kind: "project",
      name: "Audio Resource Mining",
      status: "partial",
      summary: "围绕音频抓取、资源整理与二次加工的实验项目，目前更多依赖 skill 与手工流程。",
      tags: ["Audio", "Crawler", "Dataset"],
      related: ["source-qtfm", "agent-hermes", "workflow-audio-mining"],
      updatedAt: "昨天",
      meta: ["state: idea in progress", "surface: no UI", "risk: source stability"],
      actions: ["沉淀 dataset 结构", "补统一命名", "挑一个产品入口"]
    },
    {
      id: "agent-hermes",
      kind: "agent",
      name: "Hermes Main",
      status: "partial",
      summary: "工作空间主调度 Agent，负责跨项目上下文整合、技能调用与资料归档。",
      tags: ["Orchestrator", "Hermes", "Workspace"],
      related: ["skill-dashboard", "skill-trip-update", "project-trip", "project-registry"],
      updatedAt: "今天",
      meta: ["expected skills: 18", "actual skills: 15", "sync status: partial"],
      actions: ["对齐 skills 目录", "补 last_synced_at", "拆 agent health 视图"]
    },
    {
      id: "agent-trae",
      kind: "agent",
      name: "Trae Local",
      status: "active",
      summary: "本地 IDE Agent，适合快速开发、代码改动与文档维护，但 skill 同步依赖手工管理。",
      tags: ["IDE", "Local", "Coding"],
      related: ["skill-dashboard", "skill-trip-update", "project-trip"],
      updatedAt: "今天",
      meta: ["runtime: local", "strength: coding", "risk: skill drift"],
      actions: ["同步缺失 skill", "增加 sync report", "链接到 registry 首页"]
    },
    {
      id: "skill-dashboard",
      kind: "skill",
      name: "jimmie-project-dashboard",
      status: "active",
      summary: "当前用于项目清单查询的 skill，是升级为 Beacon 能力地图的起点。",
      tags: ["Skill", "Dashboard", "Projects"],
      related: ["agent-hermes", "agent-trae", "project-registry"],
      updatedAt: "今天",
      meta: ["source: ~/.trae/skills", "current scope: projects", "next scope: registry"],
      actions: ["扩成多维 registry", "支持 links 查询", "增加 source/agent 视图"]
    },
    {
      id: "skill-trip-update",
      kind: "skill",
      name: "trip-update-d1",
      status: "active",
      summary: "直接修改 trip 行程 D1 的 skill，说明你已经把部分项目能力包装成可复用工具。",
      tags: ["Skill", "D1", "Trip"],
      related: ["agent-hermes", "agent-trae", "project-trip"],
      updatedAt: "今天",
      meta: ["type: project skill", "mode: operational", "value: reuse"],
      actions: ["纳入 skill inventory", "记录适用 agent", "关联数据模型"]
    },
    {
      id: "source-ceair",
      kind: "source",
      name: "China Eastern / ceair",
      status: "active",
      summary: "当前最有价值的航班价格 source，可用于直飞航班价格追踪，但依赖真实浏览器态。",
      tags: ["Flight", "Browser-only", "Anti-bot medium"],
      related: ["project-trip", "infra-macmini", "workflow-flight-scrape", "dataset-flight-quotes"],
      updatedAt: "今天 15:00",
      meta: ["access: browser", "auth: no login sometimes", "risk: anti-bot"],
      actions: ["记录成功抓取条件", "补 source health", "加入可复用资源榜单"]
    },
    {
      id: "source-qtfm",
      kind: "source",
      name: "qtfm.cn",
      status: "experimental",
      summary: "音频资源来源，已经能通过 skill 采集，但还没有标准化成 workflow 与 dataset。",
      tags: ["Audio", "Skill-based", "Content source"],
      related: ["project-trip", "project-audio", "workflow-audio-mining"],
      updatedAt: "本周",
      meta: ["collection: skill", "state: exploratory", "productized: no"],
      actions: ["定义 dataset", "记录反爬策略", "找一个消费场景"]
    },
    {
      id: "infra-macmini",
      kind: "infra",
      name: "Mac Mini launchd",
      status: "active",
      summary: "承接生产抓取任务的关键基础设施，负责运行 Playwright 并把结果写回远端 D1。",
      tags: ["Infra", "Scheduler", "Playwright"],
      related: ["project-trip", "source-ceair", "workflow-flight-scrape"],
      updatedAt: "今天 15:02",
      meta: ["schedule: 09:00/15:00", "host: Mac Mini", "role: production scraping"],
      actions: ["纳入 infra 总览", "显示任务健康度", "关联日志入口"]
    },
    {
      id: "infra-cloudflare",
      kind: "infra",
      name: "Cloudflare Stack",
      status: "active",
      summary: "承载 Pages、D1、R2 等线上能力，是多个项目的基础云设施。",
      tags: ["Pages", "D1", "R2", "Infra"],
      related: ["project-trip", "dataset-flight-quotes", "workflow-flight-scrape"],
      updatedAt: "本周",
      meta: ["type: cloud", "scope: shared infra", "availability: high"],
      actions: ["补 infra inventory", "列出使用项目", "增加成本/绑定视图"]
    },
    {
      id: "dataset-flight-quotes",
      kind: "dataset",
      name: "flight_quotes",
      status: "active",
      summary: "按时间记录航班价格快照的数据资产，已经具备继续做趋势、提醒和比价的可能。",
      tags: ["D1", "Time series", "Flights"],
      related: ["project-trip", "source-ceair", "workflow-flight-scrape"],
      updatedAt: "今天 15:00",
      meta: ["storage: D1", "type: structured data", "surface: flights UI"],
      actions: ["抽象成 registry dataset", "记录 owner workflow", "寻找二次产品机会"]
    },
    {
      id: "workflow-flight-scrape",
      kind: "workflow",
      name: "Flight Price Scrape",
      status: "active",
      summary: "从 ceair 页面抓取价格，经 Playwright 渲染后写入 D1，再由 trip 网站读取展示。",
      tags: ["Workflow", "Scheduled", "Scrape"],
      related: ["source-ceair", "infra-macmini", "dataset-flight-quotes", "project-trip"],
      updatedAt: "今天 15:02",
      meta: ["trigger: launchd", "mode: automated", "output: D1"],
      actions: ["记录失败模式", "补 owner", "输出 health 信号"]
    },
    {
      id: "workflow-audio-mining",
      kind: "workflow",
      name: "Audio Mining Pipeline",
      status: "blocked",
      summary: "面向音频资源的采集与整理流程雏形，目前只有 source 能力，没有完整沉淀链路。",
      tags: ["Workflow", "Audio", "Blocked"],
      related: ["source-qtfm", "project-audio", "agent-hermes"],
      updatedAt: "本周",
      meta: ["trigger: manual", "state: blocked", "missing: dataset + UI"],
      actions: ["先建 dataset", "再定义 workflow steps", "找最小展示页面"]
    }
  ]
};

const kindLabels = {
  all: "全部能力",
  project: "Projects",
  agent: "Agents",
  skill: "Skills",
  source: "Sources",
  infra: "Infra",
  dataset: "Datasets",
  workflow: "Workflows"
};

const state = {
  activeKind: "all",
  activeEntityId: "project-trip"
};

const metricsGrid = document.querySelector("#metrics-grid");
const spotlightFlow = document.querySelector("#spotlight-flow");
const insightGrid = document.querySelector("#insight-grid");
const kindFilter = document.querySelector("#kind-filter");
const entityGrid = document.querySelector("#entity-grid");
const ideaList = document.querySelector("#idea-list");
const gapList = document.querySelector("#gap-list");

const detailStatus = document.querySelector("#detail-status");
const detailName = document.querySelector("#detail-name");
const detailSummary = document.querySelector("#detail-summary");
const detailMeta = document.querySelector("#detail-meta");
const detailTags = document.querySelector("#detail-tags");
const detailRelations = document.querySelector("#detail-relations");
const detailActions = document.querySelector("#detail-actions");

function renderMetrics() {
  metricsGrid.innerHTML = registryData.metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <div class="metric-label">${metric.label}</div>
          <div class="metric-value">${metric.value}</div>
          <div class="metric-note">${metric.note}</div>
        </article>
      `
    )
    .join("");
}

function renderSpotlight() {
  spotlightFlow.innerHTML = registryData.spotlight
    .map(
      (item) => `
        <div class="flow-node">
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </div>
      `
    )
    .join("");
}

function renderInsights() {
  insightGrid.innerHTML = registryData.insights
    .map(
      (item) => `
        <article class="insight-card">
          <span class="insight-level">${item.level}</span>
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderKinds() {
  const kinds = ["all", "project", "agent", "skill", "source", "infra", "dataset", "workflow"];
  kindFilter.innerHTML = kinds
    .map(
      (kind) => `
        <button
          class="kind-pill ${state.activeKind === kind ? "active" : ""}"
          data-kind="${kind}"
        >
          ${kindLabels[kind]}
        </button>
      `
    )
    .join("");

  kindFilter.querySelectorAll("[data-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeKind = button.dataset.kind;
      renderKinds();
      renderEntities();
    });
  });
}

function getVisibleEntities() {
  if (state.activeKind === "all") {
    return registryData.entities;
  }

  return registryData.entities.filter((entity) => entity.kind === state.activeKind);
}

function renderEntities() {
  const visibleEntities = getVisibleEntities();
  const hasActiveEntity = visibleEntities.some((entity) => entity.id === state.activeEntityId);

  if (!hasActiveEntity && visibleEntities.length > 0) {
    state.activeEntityId = visibleEntities[0].id;
  }

  entityGrid.innerHTML = visibleEntities
    .map(
      (entity) => `
        <button
          type="button"
          class="entity-card ${entity.id === state.activeEntityId ? "active" : ""}"
          data-id="${entity.id}"
          aria-pressed="${entity.id === state.activeEntityId}"
          aria-label="查看 ${entity.name} 详情"
        >
          <div class="entity-topline">
            <span class="entity-kind">${kindLabels[entity.kind]}</span>
            <span class="status-pill status-${entity.status}">${entity.status}</span>
          </div>
          <h3>${entity.name}</h3>
          <p>${entity.summary}</p>
          <div class="entity-meta">
            ${entity.meta.slice(0, 2).map((item) => `<span class="mini-tag">${item}</span>`).join("")}
          </div>
          <div class="tag-row entity-meta">
            ${entity.tags.slice(0, 3).map((tag) => `<span class="mini-tag">${tag}</span>`).join("")}
          </div>
        </button>
      `
    )
    .join("");

  entityGrid.querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.activeEntityId = card.dataset.id;
      renderEntities();
      renderDetail();
    });
  });

  renderDetail();
}

function renderIdeas() {
  ideaList.innerHTML = registryData.ideas
    .map(
      (item) => `
        <article class="idea-item">
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");

  gapList.innerHTML = registryData.gaps
    .map(
      (item) => `
        <article class="gap-item">
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderDetail() {
  const entity = registryData.entities.find((item) => item.id === state.activeEntityId);
  if (!entity) return;

  const relatedEntities = entity.related
    .map((id) => registryData.entities.find((item) => item.id === id))
    .filter(Boolean);

  detailStatus.textContent = entity.status;
  detailName.textContent = entity.name;
  detailSummary.textContent = entity.summary;
  detailMeta.innerHTML = entity.meta.map((item) => `<span class="mini-tag">${item}</span>`).join("");
  detailTags.innerHTML = entity.tags.map((tag) => `<span class="mini-tag">${tag}</span>`).join("");
  detailRelations.innerHTML = relatedEntities
    .map((item) => `<span class="relation-pill">${item.name}</span>`)
    .join("");
  detailActions.innerHTML = entity.actions
    .map((action) => `<button class="action-chip">${action}</button>`)
    .join("");
}

function bindHeroButtons() {
  document.querySelectorAll("[data-focus-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeKind = button.dataset.focusKind;
      renderKinds();
      renderEntities();
      document.querySelector(".map-section").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

renderMetrics();
renderSpotlight();
renderInsights();
renderKinds();
renderEntities();
renderIdeas();
bindHeroButtons();
