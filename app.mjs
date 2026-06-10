const icon = (name, size = 20) => {
  const paths = {
    home: '<path d="M3 10.8 12 3l9 7.8V21h-6v-6H9v6H3V10.8Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4m8-4v4M3 10h18"/>',
    sparkle: '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c.8-5 3.5-7 8-7s7.2 2 8 7"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 13h4"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    source: '<path d="M6 3h9l4 4v14H6V3Z"/><path d="M14 3v5h5M9 13h6m-6 4h6"/>',
    filter: '<path d="M4 6h16M7 12h10m-7 6h4"/>',
    shield: '<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    send: '<path d="m3 4 18 8-18 8 4-8-4-8Zm4 8h14"/>',
    thumbs: '<path d="M8 11v10H4V11h4Zm0 9h8a3 3 0 0 0 3-2.4l1-5A3 3 0 0 0 17 9h-3l1-4c.3-1.5-1.8-2-2.5-.8L8 11v9Z"/>',
    edit: '<path d="m4 20 4.5-1L19 8.5 15.5 5 5 15.5 4 20Z"/><path d="m13.5 7 3.5 3.5"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.chevron}</svg>`;
};

const go = (target, label, className = "button primary") =>
  `<button class="${className}" data-go="${target}">${label}${className.includes("icon-only") ? "" : icon("chevron", 18)}</button>`;

const header = (title, back = "home", action = "") => `
  <header class="page-header">
    <button class="icon-button" data-go="${back}" aria-label="返回">${icon("back")}</button>
    <h1>${title}</h1>
    <div class="header-action">${action}</div>
  </header>`;

const tag = (text, tone = "") => `<span class="tag ${tone}">${text}</span>`;
const progress = (label, value, hint) => `
  <div class="metric-row">
    <div><strong>${label}</strong><span>${hint}</span></div>
    <div class="metric-track"><i style="width:${value}%"></i></div>
  </div>`;

const bottomNav = (active) => `
  <nav class="bottom-nav">
    ${[
      ["home", "home", "首页"],
      ["schedule", "calendar", "日程"],
      ["ai-home", "sparkle", "AI 助手"],
      ["profile", "user", "我的"],
    ]
      .map(
        ([route, glyph, label]) => `
          <button data-go="${route}" class="${active === route ? "active" : ""}">
            ${icon(glyph, 21)}<span>${label}</span>
          </button>`,
      )
      .join("")}
  </nav>`;

const shell = (content, active = "", className = "") =>
  `<div class="screen ${className}"><div class="screen-scroll">${content}</div>${active ? bottomNav(active) : ""}</div>`;

const courseCard = (time, title, meta, tone = "") => `
  <button class="course-card ${tone}" data-go="course-detail">
    <span class="course-time">${time}</span>
    <span class="course-copy"><strong>${title}</strong><small>${meta}</small></span>
    ${icon("chevron", 18)}
  </button>`;

const noticeCard = (badge, title, meta, important = false) => `
  <button class="notice-card" data-go="notification-detail">
    <span class="notice-dot ${important ? "important" : ""}"></span>
    <span class="notice-copy">${tag(badge, important ? "red" : "")}<strong>${title}</strong><small>${meta}</small></span>
    ${icon("chevron", 18)}
  </button>`;

const dayTabs = () => `
  <div class="day-tabs">
    ${[
      ["周一", "09"],
      ["周二", "10"],
      ["周三", "11"],
      ["今天", "12"],
      ["周五", "13"],
    ]
      .map(([d, n], i) => `<button class="${i === 3 ? "active" : ""}"><span>${d}</span><strong>${n}</strong></button>`)
      .join("")}
  </div>`;

const routes = {
  home: {
    number: "01",
    title: "今日校园首页",
    group: "信息聚合",
    links: ["timetable", "notifications", "notification-detail", "course-detail", "ai-home"],
    render: () =>
      shell(
        `
        <section class="hero">
          <div><p class="eyebrow light">6 月 12 日 · 第 16 周 周五</p><h1>早上好，林同学</h1><p>今天有 3 节课和 2 项待办</p></div>
          <button class="hero-avatar" data-go="profile">林</button>
        </section>
        <section class="content-stack raised">
          <div class="section-heading"><div><p class="section-kicker">NEXT CLASS</p><h2>下一节课程</h2></div><button data-go="timetable">全部课表</button></div>
          <button class="next-class" data-go="course-detail">
            <span class="time-block"><strong>10:10</strong><small>距上课 42 分钟</small></span>
            <span class="course-copy"><strong>数据可视化原理与应用</strong><small>${icon("pin", 14)} 雅安校区 · 10-B209</small><small>李志勇老师</small></span>
            ${icon("chevron", 18)}
          </button>
          <div class="section-heading"><div><p class="section-kicker">TODAY</p><h2>今日待办</h2></div><button data-go="schedule">查看日程</button></div>
          <div class="todo-card"><span class="check-ring">${icon("check", 15)}</span><div><strong>提交创新创业项目报名表</strong><small>今天 18:00 截止 · 教务处</small></div>${tag("重要", "red")}</div>
          <div class="section-heading"><div><p class="section-kicker">NOTICE</p><h2>重要通知</h2></div><button data-go="notifications">全部通知</button></div>
          ${noticeCard("教务", "2026 年暑期社会实践报名通知", "校团委 · 2 小时前", true)}
          <button class="service-card">
            <span class="promo-label">推广</span>
            <span class="service-icon">研</span>
            <span><strong>考研自习室座位预约</strong><small>与“暑期备考”相关的校园服务</small></span>
            <button class="mini-close" aria-label="关闭推广">${icon("close", 14)}</button>
          </button>
        </section>`,
        "home",
      ),
  },
  timetable: {
    number: "02",
    title: "全部课表",
    group: "信息聚合",
    links: ["home", "course-detail"],
    render: () =>
      shell(`
        ${header("全部课表")}
        <section class="page-content">
          <div class="semester-row"><div><p class="section-kicker">2025—2026</p><h2>第二学期 · 第 16 周</h2></div>${tag("本周", "green")}</div>
          ${dayTabs()}
          <div class="timeline">
            <div class="timeline-slot"><span>08:10</span>${courseCard("1–2 节", "习近平新时代中国特色社会主义思想概论", "雅教区 1-303 · 易惠文", "soft")}</div>
            <div class="timeline-slot"><span>10:10</span>${courseCard("3–4 节", "数据可视化原理与应用", "雅教区 10-B209 · 李志勇", "brand")}</div>
            <div class="timeline-slot"><span>14:20</span>${courseCard("5–6 节", "数字逻辑", "雅教区 10-A203 · 刘明丹", "orange")}</div>
            <div class="timeline-slot"><span>16:20</span>${courseCard("7–8 节", "毛泽东思想和中国特色社会主义理论体系", "雅教区 1-303 · 易惠文", "purple")}</div>
          </div>
        </section>`, "schedule"),
  },
  notifications: {
    number: "03",
    title: "通知中心",
    group: "信息聚合",
    links: ["home", "notification-detail"],
    render: () =>
      shell(`
        ${header("通知中心")}
        <section class="page-content">
          <div class="search-box">${icon("filter", 18)}<span>搜索通知、部门或关键词</span></div>
          <div class="chips"><button class="active">全部</button><button>重要</button><button>教务</button><button>活动</button></div>
          <div class="section-heading"><h2>今天</h2><button>全部已读</button></div>
          ${noticeCard("重要", "2026 年暑期社会实践报名通知", "校团委 · 2 小时前", true)}
          ${noticeCard("教务", "关于第 16 周考试安排的提醒", "教务处 · 4 小时前", true)}
          <div class="section-heading"><h2>本周</h2></div>
          ${noticeCard("活动", "图书馆读书分享会开放报名", "图书馆 · 昨天")}
          ${noticeCard("校园", "雅安校区部分区域临时停水通知", "后勤管理处 · 2 天前")}
          ${noticeCard("教务", "大学生创新创业训练计划结题安排", "教务处 · 3 天前")}
        </section>`, "home"),
  },
  "notification-detail": {
    number: "04",
    title: "通知详情",
    group: "信息聚合",
    links: ["notifications", "schedule"],
    render: () =>
      shell(`
        ${header("通知详情", "notifications")}
        <article class="page-content article">
          <div class="article-meta">${tag("重要", "red")}<span>校团委 · 2026-06-12 08:30</span></div>
          <h1>2026 年暑期社会实践报名通知</h1>
          <p class="article-lead">面向全校学生开放，团队申报截止时间为 6 月 18 日 18:00。</p>
          <div class="deadline-card"><span>${icon("clock", 20)}</span><div><small>报名截止</small><strong>6 月 18 日 周四 18:00</strong></div>${go("schedule", "添加到日程", "button compact")}</div>
          <h2>申报要求</h2>
          <p>每支团队由 5–12 名学生组成，需围绕乡村振兴、生态文明或社会服务等方向开展实践，并由一名校内教师指导。</p>
          <h2>报名流程</h2>
          <ol><li>下载并填写团队申报表</li><li>联系学院团委完成初审</li><li>在截止时间前提交电子材料</li></ol>
          <div class="source-card">${icon("source", 22)}<div><strong>信息来源：四川农业大学校团委</strong><small>更新时间：2026-06-12 08:30</small></div>${icon("chevron", 18)}</div>
          ${go("schedule", "添加截止时间到日程")}
        </article>`),
  },
  "course-detail": {
    number: "05",
    title: "课程详情",
    group: "课程体验",
    links: ["timetable", "course-experience"],
    render: () =>
      shell(`
        ${header("课程详情", "timetable")}
        <section class="page-content">
          <div class="course-hero-card"><p class="section-kicker light">今天 · 3–4 节</p><h1>数据可视化原理与应用</h1><div class="course-meta-grid"><span>${icon("clock", 16)}10:10–11:50</span><span>${icon("pin", 16)}10-B209</span><span>${icon("user", 16)}李志勇</span><span>${icon("calendar", 16)}1–16 周</span></div></div>
          <div class="info-card"><div class="section-heading"><h2>考核方式</h2>${tag("课程信息")}</div><div class="score-split"><span><strong>40%</strong><small>平时作业</small></span><span><strong>20%</strong><small>课堂展示</small></span><span><strong>40%</strong><small>期末项目</small></span></div></div>
          <button class="experience-entry" data-go="course-experience"><div><p class="section-kicker">VERIFIED EXPERIENCE</p><h2>课程体验档案</h2><p>基于 86 份在校学生结构化反馈</p></div><span class="score-badge">4.4<small>/ 5</small></span>${icon("chevron")}</button>
          <div class="info-card"><h2>本周任务</h2><div class="todo-card plain"><span class="check-ring"></span><div><strong>完成可视化项目选题</strong><small>6 月 15 日前 · 课程平台提交</small></div></div></div>
        </section>`),
  },
  "course-experience": {
    number: "06",
    title: "课程体验档案",
    group: "课程体验",
    links: ["course-detail", "experience-filter", "experience-publish"],
    render: () =>
      shell(`
        ${header("课程体验档案", "course-detail")}
        <section class="page-content">
          <div class="experience-summary"><div><p class="section-kicker light">86 份已验证反馈</p><h1>数据可视化原理与应用</h1><p>最近更新于 2026 春季学期</p></div><strong>4.4<small>/ 5</small></strong></div>
          <div class="trust-note">${icon("shield", 21)}<div><strong>仅评价课程体验</strong><p>不评价教师人格；内容经过学生身份验证与审核。</p></div></div>
          <div class="info-card metrics"><div class="section-heading"><h2>结构化体验</h2><button data-go="experience-filter">筛选</button></div>${progress("课程难度", 68, "中等偏难")}${progress("作业量", 54, "每两周一次")}${progress("课堂互动", 82, "互动较多")}${progress("点名频率", 38, "偶尔点名")}</div>
          <div class="info-card"><div class="section-heading"><h2>常见考核方式</h2></div><div class="tag-cloud">${tag("小组项目 72%", "green")}${tag("课堂展示 58%")}${tag("期末报告 46%")}</div></div>
          <div class="review-card"><div><strong>物联网工程 · 2026 春</strong>${tag("已验证", "green")}</div><p>课程项目工作量不小，但每次作业都有明确反馈。建议提前确定数据集，期末会轻松很多。</p><small>有帮助 23 · 举报</small></div>
          ${go("experience-publish", "贡献我的课程体验")}
        </section>`),
  },
  "experience-filter": {
    number: "07",
    title: "课程体验筛选",
    group: "课程体验",
    links: ["course-experience", "experience-publish"],
    render: () =>
      shell(`
        ${header("筛选课程体验", "course-experience", "<button class='text-button'>重置</button>")}
        <section class="page-content">
          <div class="filter-block"><h2>学期</h2><div class="choice-grid"><button class="selected">2026 春</button><button>2025 秋</button><button>2025 春</button><button>全部学期</button></div></div>
          <div class="filter-block"><h2>学生专业</h2><div class="choice-grid"><button class="selected">物联网工程</button><button>计算机科学</button><button>数据科学</button><button>全部专业</button></div></div>
          <div class="filter-block"><h2>体验标签</h2><div class="tag-cloud selectable">${tag("项目实践多", "green")}${tag("反馈及时")}${tag("适合零基础")}${tag("需要组队")}${tag("期末任务集中")}</div></div>
          <div class="sample-warning">${icon("source", 20)}<p>当前条件下共有 <strong>28</strong> 份反馈。样本较少时，结论仅供参考。</p></div>
          <div class="review-card"><div><strong>物联网工程 · 2026 春</strong>${tag("已验证", "green")}</div><p>项目实践很多，能真正做出可展示的作品。需要主动和组员协调进度。</p><small>有帮助 18 · 举报</small></div>
          ${go("course-experience", "应用筛选")}
        </section>`),
  },
  "experience-publish": {
    number: "08",
    title: "发布课程体验",
    group: "课程体验",
    links: ["course-experience"],
    render: () =>
      shell(`
        ${header("贡献课程体验", "course-experience")}
        <section class="page-content form-page">
          <div class="trust-note">${icon("shield", 21)}<div><strong>匿名发布，身份已验证</strong><p>页面不会展示姓名和学号；内容提交后进入审核。</p></div></div>
          <label><span>课程难度</span><div class="scale-choice"><button>轻松</button><button class="selected">适中</button><button>较难</button></div></label>
          <label><span>作业量</span><div class="scale-choice"><button>较少</button><button class="selected">适中</button><button>较多</button></div></label>
          <label><span>主要考核方式</span><div class="tag-cloud selectable">${tag("小组项目", "green")}${tag("课堂展示", "green")}${tag("期末报告")}${tag("闭卷考试")}</div></label>
          <label><span>给后来同学的经验</span><textarea>建议提前确定项目数据集，每周预留固定时间推进，小组展示前多做一次演练。</textarea><small>请聚焦课程体验，不评价教师人格。</small></label>
          <label class="confirm-row"><input type="checkbox" checked /><span>我确认内容真实，并同意社区审核规范</span></label>
          <button class="button primary" data-toast="已提交审核，感谢你的贡献">提交体验${icon("send", 18)}</button>
        </section>`),
  },
  "ai-home": {
    number: "09",
    title: "AI 校园助手首页",
    group: "AI 与日程",
    links: ["home", "ai-answer", "ai-clarify"],
    render: () =>
      shell(`
        <section class="ai-hero"><div class="ai-orb">${icon("sparkle", 32)}</div><p class="eyebrow light">可信校园信息助手</p><h1>有什么校园问题<br/>想一起解决？</h1><p>重要回答会标注来源，不确定时我会明确告诉你。</p></section>
        <section class="content-stack ai-stack">
          <button class="prompt-input" data-go="ai-answer"><span>问校历、办事流程或活动…</span>${icon("send", 20)}</button>
          <div class="section-heading"><h2>常用问题</h2></div>
          <div class="quick-prompts"><button data-go="ai-answer">${icon("source", 18)}补办学生证需要什么材料？</button><button data-go="ai-answer">${icon("calendar", 18)}这学期期末考试从哪天开始？</button></div>
          <button class="plan-entry" data-go="ai-clarify"><span class="plan-icon">${icon("calendar", 24)}</span><span><strong>基于我的课表规划任务</strong><small>先生成建议，确认后才会加入日程</small></span>${icon("chevron", 18)}</button>
          <div class="info-card"><div class="section-heading"><h2>最近咨询</h2></div><button class="history-row" data-go="ai-answer"><span>图书馆暑假开放时间</span><small>昨天</small></button><button class="history-row" data-go="ai-answer"><span>创新创业项目报名流程</span><small>周一</small></button></div>
        </section>`, "ai-home", "ai-screen"),
  },
  "ai-answer": {
    number: "10",
    title: "校园信息问答",
    group: "AI 与日程",
    links: ["ai-home", "ai-clarify"],
    render: () =>
      shell(`
        ${header("校园信息问答", "ai-home")}
        <section class="page-content chat-page">
          <div class="user-bubble">补办学生证需要什么材料？</div>
          <div class="assistant-row"><span class="small-orb">${icon("sparkle", 17)}</span><div class="assistant-bubble"><div class="answer-mode">${icon("shield", 16)}严谨模式 · 校园办事流程</div><p>根据学生工作部最新办事指南，你需要准备：</p><ol><li>本人身份证或校园卡</li><li>一张近期免冠证件照</li><li>学生证补办申请表</li></ol><p>在学院完成初审后，前往综合服务大厅办理。通常需 5 个工作日。</p><div class="source-inline">${icon("source", 18)}<span><strong>学生工作部办事指南</strong><small>更新于 2026-05-20</small></span>${icon("chevron", 16)}</div><div class="answer-feedback"><span>这个回答有帮助吗？</span><button>${icon("thumbs", 16)}有帮助</button><button>信息有误</button></div></div></div>
          <button class="follow-up" data-go="ai-clarify">帮我规划本周办理时间${icon("chevron", 17)}</button>
          <div class="chat-input"><span>继续追问…</span>${icon("send", 19)}</div>
        </section>`),
  },
  "ai-clarify": {
    number: "11",
    title: "AI 追问与条件补充",
    group: "AI 与日程",
    links: ["ai-home", "plan-preview"],
    render: () =>
      shell(`
        ${header("规划学习任务", "ai-home")}
        <section class="page-content chat-page">
          <div class="assistant-row"><span class="small-orb">${icon("sparkle", 17)}</span><div class="assistant-bubble"><p>没问题。我会避开你的课表，先确认几个条件，再生成可调整的日程建议。</p></div></div>
          <div class="question-card"><span>1 / 3</span><h2>数据可视化项目什么时候截止？</h2><button class="answer-option selected">${icon("calendar", 18)}6 月 18 日 周四 18:00</button><button class="answer-option">选择其他时间</button></div>
          <div class="question-card"><span>2 / 3</span><h2>你更习惯什么时候完成重要任务？</h2><div class="choice-grid"><button>上午</button><button class="selected">下午</button><button>晚上</button><button>都可以</button></div></div>
          <div class="question-card"><span>3 / 3</span><h2>单次专注多久比较合适？</h2><div class="choice-grid"><button>30 分钟</button><button class="selected">60 分钟</button><button>90 分钟</button></div></div>
          ${go("plan-preview", "生成日程建议")}
          <p class="privacy-hint">${icon("lock", 15)}只读取本周课表与已选择偏好，不会自动写入日程。</p>
        </section>`),
  },
  "plan-preview": {
    number: "12",
    title: "日程建议预览",
    group: "AI 与日程",
    links: ["ai-clarify", "plan-confirm"],
    render: () =>
      shell(`
        ${header("日程建议预览", "ai-clarify")}
        <section class="page-content">
          <div class="preview-intro"><span class="ai-orb small">${icon("sparkle", 22)}</span><div><p class="section-kicker">AI SUGGESTION</p><h2>已生成 4 个专注时段</h2><p>避开已有课程，并在截止日前预留了调整时间。</p></div></div>
          <div class="basis-card"><strong>建议依据</strong><span>${tag("本周课表")}${tag("下午优先")}${tag("60 分钟专注")}</span></div>
          <div class="plan-day"><div><strong>今天 · 周五</strong><small>预计完成 35%</small></div><div class="plan-item"><span>15:00</span><div><strong>确定项目主题与数据集</strong><small>60 分钟 · 无冲突</small></div><button>${icon("edit", 16)}</button></div></div>
          <div class="plan-day"><div><strong>6 月 14 日 · 周日</strong><small>预计完成 70%</small></div><div class="plan-item"><span>14:30</span><div><strong>完成数据清洗与图表草稿</strong><small>90 分钟 · 无冲突</small></div><button>${icon("edit", 16)}</button></div></div>
          <div class="plan-day"><div><strong>6 月 16 日 · 周二</strong><small>预计完成 100%</small></div><div class="plan-item warning"><span>16:30</span><div><strong>完成报告与演示检查</strong><small>与社团活动相邻 30 分钟</small></div><button>${icon("edit", 16)}</button></div></div>
          <div class="trust-note">${icon("shield", 20)}<div><strong>预览不会修改你的日程</strong><p>请确认或调整建议后再加入。</p></div></div>
          ${go("plan-confirm", "确认并加入日程")}
        </section>`),
  },
  "plan-confirm": {
    number: "13",
    title: "确认加入日程",
    group: "AI 与日程",
    links: ["plan-preview", "schedule"],
    render: () =>
      shell(`
        <section class="success-page">
          <div class="success-mark">${icon("check", 38)}</div>
          <p class="section-kicker">ADDED TO SCHEDULE</p>
          <h1>已加入 4 个日程</h1>
          <p>所有任务均可在日程中心修改或删除。AI 建议来源会被保留，方便你回顾。</p>
          <div class="success-summary"><div><strong>4</strong><span>专注时段</span></div><div><strong>5h</strong><span>计划投入</span></div><div><strong>6/18</strong><span>任务截止</span></div></div>
          ${go("schedule", "查看我的日程")}
          ${go("ai-home", "返回 AI 助手", "button secondary")}
        </section>`),
  },
  schedule: {
    number: "14",
    title: "日程中心",
    group: "AI 与日程",
    links: ["home", "ai-home", "profile"],
    render: () =>
      shell(`
        ${header("我的日程", "home", "<button class='icon-button'>" + icon("plus", 19) + "</button>")}
        <section class="page-content">
          <div class="semester-row"><div><p class="section-kicker">JUNE 2026</p><h2>6 月 12 日 · 周五</h2></div>${tag("今天", "green")}</div>
          ${dayTabs()}
          <div class="agenda">
            <div class="agenda-item class"><span>10:10</span><div><strong>数据可视化原理与应用</strong><small>10-B209 · 课程</small></div></div>
            <div class="agenda-item ai"><span>15:00</span><div><strong>确定项目主题与数据集</strong><small>${icon("sparkle", 13)} AI 建议 · 60 分钟</small></div><button>${icon("edit", 16)}</button></div>
            <div class="agenda-item important"><span>18:00</span><div><strong>提交创新创业项目报名表</strong><small>来自教务通知 · 截止时间</small></div></div>
          </div>
          <div class="info-card"><div class="section-heading"><h2>本周进度</h2><span>7 / 10</span></div><div class="big-progress"><i style="width:70%"></i></div><p class="muted">已完成 7 项任务，还有 3 项待完成。</p></div>
        </section>`, "schedule"),
  },
  profile: {
    number: "15",
    title: "我的与隐私设置",
    group: "个人与隐私",
    links: ["home", "schedule", "ai-home"],
    render: () =>
      shell(`
        <section class="profile-hero"><div class="profile-avatar">林</div><div><p class="section-kicker light">物联网工程 · 2023 级</p><h1>林同学</h1><p>已验证在校学生</p></div>${icon("chevron", 18)}</section>
        <section class="content-stack raised">
          <div class="profile-stats"><div><strong>12</strong><span>完成待办</span></div><div><strong>3</strong><span>体验贡献</span></div><div><strong>8</strong><span>AI 问答</span></div></div>
          <div class="section-heading"><div><p class="section-kicker">PRIVACY CONTROL</p><h2>AI 数据与隐私</h2></div></div>
          <div class="privacy-card"><div>${icon("calendar", 20)}<span><strong>本周课表</strong><small>用于避开上课时间</small></span><label class="switch"><input type="checkbox" checked><i></i></label></div><div>${icon("clock", 20)}<span><strong>时间偏好</strong><small>用于生成个性化建议</small></span><label class="switch"><input type="checkbox" checked><i></i></label></div><button>${icon("edit", 18)}查看与修改 AI 使用的数据${icon("chevron", 17)}</button><button class="danger">${icon("close", 18)}删除 AI 个性化数据${icon("chevron", 17)}</button></div>
          <div class="section-heading"><h2>设置</h2></div>
          <div class="settings-list"><button>${icon("bell", 19)}通知偏好${icon("chevron", 17)}</button><button>${icon("shield", 19)}隐私与内容审核${icon("chevron", 17)}</button><button>${icon("source", 19)}关于产品与信息来源${icon("chevron", 17)}</button></div>
        </section>`, "profile"),
  },
};

const flowChecks = {
  information: ["home", "notifications", "notification-detail", "schedule"],
  courseExperience: ["timetable", "course-detail", "course-experience", "experience-filter", "experience-publish"],
  aiPlanning: ["ai-home", "ai-answer", "ai-clarify", "plan-preview", "plan-confirm", "schedule"],
};

globalThis.__campusAssistantPrototype = { routes, flowChecks };

if (typeof document !== "undefined") {
  const app = document.querySelector("#app");
  const screenList = document.querySelector("#screen-list");
  const screenIndex = document.querySelector("#screen-index");
  const screenTitle = document.querySelector("#screen-title");

  function currentRoute() {
    const hash = location.hash.replace("#/", "");
    return routes[hash] ? hash : "home";
  }

  function navigate(target) {
    location.hash = `#/${target}`;
  }

  function renderScreenList(active) {
    screenList.innerHTML = Object.entries(routes)
      .map(
        ([key, route]) => `<button data-go="${key}" class="${active === key ? "active" : ""}"><span>${route.number}</span><div><strong>${route.title}</strong><small>${route.group}</small></div></button>`,
      )
      .join("");
  }

  function render() {
    const key = currentRoute();
    const route = routes[key];
    app.innerHTML = route.render();
    screenIndex.textContent = `${route.number} / 15`;
    screenTitle.textContent = route.title;
    renderScreenList(key);
    document.querySelector(".screen-scroll")?.scrollTo(0, 0);
  }

  document.addEventListener("click", (event) => {
    const goTarget = event.target.closest("[data-go]");
    if (goTarget) navigate(goTarget.dataset.go);

    const flowTarget = event.target.closest("[data-start-flow]");
    if (flowTarget) navigate(flowChecks[flowTarget.dataset.startFlow][0]);

    const selectable = event.target.closest(".chips button, .choice-grid button, .scale-choice button");
    if (selectable) {
      selectable.parentElement.querySelectorAll("button").forEach((node) => node.classList.remove("selected", "active"));
      selectable.classList.add(selectable.closest(".chips") ? "active" : "selected");
    }

    const toastTarget = event.target.closest("[data-toast]");
    if (toastTarget) {
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = toastTarget.dataset.toast;
      document.querySelector(".device").append(toast);
      setTimeout(() => toast.remove(), 2400);
    }

    const closePromo = event.target.closest(".mini-close");
    if (closePromo) {
      event.preventDefault();
      event.stopPropagation();
      closePromo.closest(".service-card").remove();
    }
  });

  window.addEventListener("hashchange", render);
  render();
}
