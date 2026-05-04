const DEFAULT_CONFIG={memos:"https://demo.usememos.com/",emactionApi:"https://emaction-go.mintimate.cn",limit:10,creatorId:"1",domId:"#bber",authorName:""};function normalizeMemosUrl(e){if(typeof e!=="string"){return""}const t=e.trim();if(!t){return""}return t.endsWith("/")?t:`${t}/`}const bbMemo={...DEFAULT_CONFIG,...typeof bbMemos!=="undefined"?bbMemos:{}};bbMemo.memos=normalizeMemosUrl(bbMemo.memos);if(!bbMemo.memos||!bbMemo.domId){console.error("Memos配置不完整，请检查 memos 和 domId 参数")}function renderError(e){if(!AppState.bbDom){return}AppState.bbDom.innerHTML=`<div class="error">${e}</div>`}const Utils={loadCssCode(e){const t=document.createElement("style");t.type="text/css";t.rel="stylesheet";t.appendChild(document.createTextNode(e));document.head.appendChild(t)},getQueryVariable(t){const e=window.location.search.substring(1);const o=e.split("&");for(let e=0;e<o.length;e++){const r=o[e].split("=");if(r[0]===t){return decodeURIComponent(r[1])}}return false},async safeExecute(e,t="操作失败"){try{return await e()}catch(e){console.error(`${t}:`,e);throw e}}};const allCSS=`
/* 主容器 */
#bber {
  margin-top: 1rem;
  width: auto !important;
  min-height: 100vh;
  /* 确保容器有足够的内边距 */
  box-sizing: border-box;
}

/* 内容区域 */
.bb-cont {
  margin-bottom: 0;
  line-height: 1.85;
  font-size: 15px;
  letter-spacing: 0.01em;
}

.bb-cont p {
  margin: 0.5rem 0;
  color: inherit;
}

.bb-cont img {
  border-radius: 8px;
  max-width: 100%;
  max-height: 400px;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease;
  /* 添加最小高度避免布局跳跃 */
  min-height: 120px;
  background-color: #f5f5f5;
  /* 图片加载时的占位样式 */
  background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.bb-cont img:hover {
  transform: scale(1.02);
}

/* 标签样式 */
.tag-span {
  display: inline-block;
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.2rem 0.4rem;
  border-radius: 12px;
  font-size: 0.875rem;
  margin: 0.2rem 0.2rem 0.2rem 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-span:hover {
  background: #bbdefb;
}

#tag-list .tag-span {
  background: rgba(25, 118, 210, 0.1);
  border: 1px solid #1976d2;
  position: relative;
}

/* 亮色模式特定样式 */
[data-user-color-scheme="light"] .bb-timeline .bb-item {
  background: rgba(255, 255, 255, 0.78);
  border-color: rgba(120, 120, 120, 0.22);
  color: #333;
}

[data-user-color-scheme="light"] .bb-cont p {
  color: #333;
}

[data-user-color-scheme="light"] .bb-info {
  color: #666;
}

[data-user-color-scheme="light"] .bb-info a {
  color: #666;
}

[data-user-color-scheme="light"] .bb-tool {
  border-top-color: #f0f0f0;
}

[data-user-color-scheme="light"] .datacount {
  color: #666;
}

[data-user-color-scheme="light"] .datacount:hover {
  color: #1976d2;
}

/* 工具栏 */
.bb-tool {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0;
  border-top: none;
  margin-top: 0;
  opacity: 0.78;
  transform-origin: left center;
  font-size: 12px;
}

/* 信息区域 */
.bb-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
  font-size: 12px;
  color: #666;
}

.bb-info a {
  text-decoration: none;
  color: #666;
}

.bb-info a:hover {
  color: var(--post-link-color);
}

.datatime {
  font-size: 10px;
  letter-spacing: 0.12em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace;
}

/* 加载按钮 - 风琴样式 */
.bb-load {
  position: relative;
  width: 100%;
  margin: 2rem 0;
  z-index: 10;
}

.bb-load button {
  width: 100%;
  padding: 0.5rem 0;
  background: transparent;
  color: #666;
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.bb-load button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.6s ease;
}

.bb-load button:hover {
  border-color: #667eea;
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-1px);
}

.bb-load button:hover::before {
  left: 100%;
}

.bb-load button:active {
  transform: translateY(0);
  transition: transform 0.1s;
}

.bb-load button:disabled {
  background: transparent;
  color: #ccc;
  border-color: #f0f0f0;
  cursor: not-allowed;
  transform: none;
}

.bb-load button:disabled::before {
  display: none;
}

/* 加载中动画 */
.bb-load button.loading {
  pointer-events: none;
  border-style: solid;
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
  color: #667eea;
}

.bb-load button.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid transparent;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: button-spin 1s linear infinite;
}

@keyframes button-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 图片网格 */
.resimg {
  margin: 0.4rem 0;
}

.resimg img {
  max-height: 300px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease;
  /* 添加最小高度避免布局跳跃 */
  min-height: 120px;
  background-color: #f5f5f5;
  border-radius: 8px;
  /* 图片加载时的占位样式 */
  background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 15px 15px;
  background-position: 0 0, 0 7.5px, 7.5px -7.5px, -7.5px 0px;
}

.resimg img:hover {
  transform: scale(1.02);
}

.resimg.grid {
  display: grid;
  gap: 0.3rem;
  grid-template-columns: repeat(3, 1fr);
}

.resimg.grid-1 {
  grid-template-columns: repeat(1, 1fr);
}

.resimg.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.resimg.grid-4 {
  grid-template-columns: repeat(2, 1fr);
}

.resimg figure {
  margin: 0;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  max-height: 250px;
}

.resimg.grid figure.gallery-thumbnail {
  max-height: 200px;
}

.resimg.grid figure.gallery-thumbnail > img.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

/* 视频容器 */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  margin: 0.75rem 0;
  border-radius: 8px;
  overflow: hidden;
}

.video-wrapper iframe,
.video-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.github-repo-card {
  display: block;
  margin: 0.9rem 0 0.3rem;
  width: min(100%, 540px);
  padding: 0.72rem 0.82rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(120, 120, 120, 0.2);
  background: rgba(255, 255, 255, 0.03);
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.github-repo-card:hover {
  transform: translateY(-1px);
  border-color: rgba(120, 120, 120, 0.34);
  background: rgba(255, 255, 255, 0.05);
}

.github-repo-card__header,
.github-repo-card__top,
.github-repo-card__owner,
.github-repo-card__title,
.github-repo-card__meta {
  display: flex;
}

.github-repo-card__header,
.github-repo-card__top {
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.github-repo-card__owner,
.github-repo-card__title {
  min-width: 0;
  gap: 0.75rem;
}

.github-repo-card__owner {
  align-items: flex-start;
}

.github-repo-card__title {
  flex-direction: column;
  gap: 0.2rem;
}

.github-repo-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.12rem 0.4rem;
  border: 1px solid rgba(120, 120, 120, 0.22);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.github-repo-card__name,
.github-repo-card__repo {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.github-repo-card__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 18px;
  width: 18px;
  color: #666;
  line-height: 1;
  transform: translateY(1px);
}

.github-repo-card__mark-icon {
  display: block;
  width: 13px;
  height: 13px;
}

.github-repo-card__body,
.github-repo-card__desc {
  color: #666;
  font-size: 12px;
  line-height: 1.65;
}

.github-repo-card__meta {
  flex-wrap: wrap;
  gap: 0.42rem 0.75rem;
  margin-top: 0.55rem;
  color: #777;
  font-size: 10px;
  letter-spacing: 0.04em;
}

.github-repo-card__arrow {
  color: #777;
  font-size: 12px;
  line-height: 1;
}

.github-repo-card.is-loading .github-repo-card__body,
.github-repo-card.is-error .github-repo-card__desc {
  color: #888;
}

/* 加载动画 */
.loader {
  position: relative;
  width: 100%;
  margin: 2.75rem auto;
  display: grid;
  place-items: center;
  z-index: 10;
}

.loader-frame {
  width: min(30vmin, 140px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
}

.loader-frame svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.loader-path {
  stroke: currentColor;
  stroke-width: 4.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.12;
  fill: none;
}

.loader-particle {
  fill: currentColor;
}

/* 暗色主题 */
[data-user-color-scheme="dark"] .bb-cont p {
  color: var(--subtitle-color);
}

[data-user-color-scheme="dark"] .load-btn {
  color: var(--subtitle-color);
}

[data-user-color-scheme="dark"] .bb-timeline .bb-item {
  background: rgba(255, 255, 255, 0.015);
  border-color: rgba(255, 255, 255, 0.14);
  color: var(--text-color);
}

[data-user-color-scheme="dark"] .tag-span {
  background: rgba(21, 137, 233, 0.2);
  color: var(--post-link-color);
}

[data-user-color-scheme="dark"] .bb-tool {
  border-top-color: transparent;
}

[data-user-color-scheme="dark"] .bb-info {
  color: var(--sec-text-color);
}

[data-user-color-scheme="dark"] .bb-info a {
  color: var(--sec-text-color);
}

[data-user-color-scheme="dark"] .bb-info a:hover {
  color: var(--post-link-color);
}

[data-user-color-scheme="dark"] .datacount {
  color: var(--sec-text-color);
}

[data-user-color-scheme="dark"] .datacount:hover {
  color: var(--post-link-color);
}

:root {
  --start-smile-border-color-default: #e5e5e5;
  --start-smile-border-color-hover-default: #cccccc;
  --start-smile-bg-color-default: #ffffff;
  --start-smile-svg-fill-color-default: #333333;
  --reaction-got-not-reacted-bg-color-default: #ffffff;
  --reaction-got-not-reacted-bg-color-hover-default: #f2f2f2;
  --reaction-got-not-reacted-border-color-default: #e5e5e5;
  --reaction-got-not-reacted-text-color-default: #333333;
  --reaction-got-reacted-bg-color-default: #f2f2f2;
  --reaction-got-reacted-bg-color-hover-default: #e5e5e5;
  --reaction-got-reacted-border-color-default: #42b983;
  --reaction-got-reacted-text-color-default: #42b983;
  --reaction-available-popup-bg-color-default: #ffffff;
  --reaction-available-popup-border-color-default: #dddddd;
  --reaction-available-popup-box-shadow-default: 0 4px 6px rgba(0,0,0,.04);
  --reaction-available-emoji-reacted-bg-color-default: #388bfd1a;
  --reaction-available-emoji-bg-color-hover-default: #f2f2f2;
  --reaction-available-emoji-z-index-default: 100;
  --reaction-available-mask-z-index-default: 80;
}

.reaction-got-reacted {
    background-color: var(--reaction-got-not-reacted-bg-color, var(--reaction-got-not-reacted-bg-color-default));
    border-width: 1px;
    border-style: solid;
    border-color: var(--reaction-got-not-reacted-border-color, var(--reaction-got-not-reacted-border-color-default));
    color: var(--reaction-got-not-reacted-text-color, var(--reaction-got-not-reacted-text-color-default));
}

/* 暗色主题变量覆盖 */
[data-user-color-scheme="dark"] {
  --start-smile-border-color-default: #3b3d42;
  --start-smile-border-color-hover-default: #3b3d42;
  --start-smile-bg-color-default: transparent;
  --start-smile-svg-fill-color-default: #ffffff;
  --reaction-got-not-reacted-bg-color-default: transparent;
  --reaction-got-not-reacted-bg-color-hover-default: #272727;
  --reaction-got-not-reacted-border-color-default: #3b3d42;
  --reaction-got-not-reacted-text-color-default: #ffffff;
  --reaction-got-reacted-bg-color-default: #272727;
  --reaction-got-reacted-bg-color-hover-default: #272727;
  --reaction-got-reacted-border-color-default: #42b983;
  --reaction-got-reacted-text-color-default: #42b983;
  --reaction-available-popup-bg-color-default: #161b22;
  --reaction-available-popup-border-color-default: #30363d;
  --reaction-available-popup-box-shadow-default: 0 4px 6px rgba(0,0,0,.04);
  --reaction-available-emoji-reacted-bg-color-default: #388bfd1a;
  --reaction-available-emoji-bg-color-hover-default: #30363d;

}

/* 列表长卡片布局覆盖 */
.memos-hero {
  max-width: 760px;
  margin: 0 auto 2rem;
}

.memos-hero h1 {
  margin: 0;
  color: #1b1b1b;
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.memos-hero p {
  margin: 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.7;
}

.bb-timeline {
  position: static;
  max-width: 760px;
  margin: 0 auto;
}

.bb-timeline .memo-item {
  position: relative;
  width: 100% !important;
  left: auto !important;
  top: auto !important;
  opacity: 1;
  padding: 0;
}

.bb-timeline .memo-item:not(:last-child) {
  margin-bottom: 1.35rem;
}

.bb-timeline .bb-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(120, 120, 120, 0.22);
  border-radius: 0;
  box-shadow: none;
  padding: 0.9rem 1.1rem 0.8rem;
}

.bb-timeline .bb-item:hover {
  box-shadow: none;
  transform: none;
  border-color: rgba(120, 120, 120, 0.32);
}

.memo-head {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid rgba(120, 120, 120, 0.16);
}

.memo-meta {
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.memo-name {
  display: block;
  color: #222;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.05em;
}

.memo-time-link {
  color: inherit;
  text-decoration: none;
}

.memo-time-link:hover {
  color: var(--post-link-color);
}

.memo-foot {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-top: 0.7rem;
  margin-bottom: 0;
}

.bb-cont {
  margin-bottom: 0;
  line-height: 1.85;
  font-size: 15px;
  letter-spacing: 0.01em;
}

.bb-cont p {
  margin: 0.5rem 0;
  color: inherit;
}

.bb-tool {
  justify-content: flex-start;
  padding-top: 0;
  border-top: none;
  margin-top: 0;
  opacity: 0.78;
  transform: none;
  transform-origin: left center;
  font-size: 12px;
}

.bb-info {
  margin-top: 0;
  font-size: 12px;
  color: inherit;
}

.datatime {
  color: #777;
  white-space: nowrap;
  font-size: 10px;
  letter-spacing: 0.12em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace;
}

[data-user-color-scheme="light"] .memos-hero h1 {
  color: #1b1b1b;
}

[data-user-color-scheme="light"] .memos-hero p {
  color: #666;
}

[data-user-color-scheme="light"] .memo-name {
  color: #1f1f1f;
}

[data-user-color-scheme="light"] .datatime {
  color: #7a7a7a;
}

[data-user-color-scheme="light"] .bb-timeline .bb-item {
  background: rgba(255, 255, 255, 0.78);
  border-color: rgba(120, 120, 120, 0.22);
}

[data-user-color-scheme="light"] .memo-head {
  border-bottom-color: rgba(120, 120, 120, 0.16);
}

[data-user-color-scheme="light"] .github-repo-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(120, 120, 120, 0.2);
}

[data-user-color-scheme="light"] .github-repo-card:hover {
  border-color: rgba(120, 120, 120, 0.34);
}

[data-user-color-scheme="light"] .github-repo-card__desc,
[data-user-color-scheme="light"] .github-repo-card__body {
  color: #666;
}

[data-user-color-scheme="light"] .github-repo-card__meta,
[data-user-color-scheme="light"] .github-repo-card__arrow,
[data-user-color-scheme="light"] .github-repo-card__mark {
  color: #777;
}

[data-user-color-scheme="light"] .bb-timeline .bb-item:hover {
  border-color: rgba(120, 120, 120, 0.34);
}

[data-user-color-scheme="dark"] .memo-name {
  color: var(--text-color);
}

[data-user-color-scheme="dark"] .memos-hero h1 {
  color: #f2f2f2;
}

[data-user-color-scheme="dark"] .memos-hero p {
  color: rgba(220, 220, 220, 0.7);
}

[data-user-color-scheme="dark"] .loader {
  color: rgba(255, 255, 255, 0.9);
}

[data-user-color-scheme="dark"] .datatime {
  color: var(--sec-text-color);
}

[data-user-color-scheme="dark"] .memo-head {
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

[data-user-color-scheme="dark"] .github-repo-card {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.12);
}

[data-user-color-scheme="dark"] .github-repo-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.035);
}

[data-user-color-scheme="dark"] .github-repo-card__desc,
[data-user-color-scheme="dark"] .github-repo-card__body {
  color: var(--sec-text-color);
}

[data-user-color-scheme="dark"] .github-repo-card__meta,
[data-user-color-scheme="dark"] .github-repo-card__arrow,
[data-user-color-scheme="dark"] .github-repo-card__badge,
[data-user-color-scheme="dark"] .github-repo-card__mark {
  color: rgba(255, 255, 255, 0.72);
}

[data-user-color-scheme="dark"] .github-repo-card__badge {
  border-color: rgba(255, 255, 255, 0.14);
}

[data-user-color-scheme="dark"] .bb-timeline .bb-item {
  background: rgba(255, 255, 255, 0.015);
  border-color: rgba(255, 255, 255, 0.14);
}

[data-user-color-scheme="dark"] .bb-timeline .bb-item:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

[data-user-color-scheme="light"] .loader {
  color: #222;
}

@media (max-width: 768px) {
  .memos-hero {
    margin-bottom: 2rem;
  }

  .memo-head {
    align-items: flex-start;
  }

  .github-repo-card {
    width: 100%;
    padding: 0.7rem 0.8rem;
  }

  .github-repo-card__top {
    align-items: flex-start;
  }

  .github-repo-card__owner {
    align-items: flex-start;
  }

  .github-repo-card__mark {
    flex-basis: 18px;
    width: 18px;
  }

  .github-repo-card__mark-icon {
    width: 12px;
    height: 12px;
  }

  .bb-timeline .bb-item {
    padding: 0.9rem 0.95rem 0.8rem;
  }
}
`;Utils.loadCssCode(allCSS);const AppState={limit:bbMemo.limit,memos:bbMemo.memos,offset:0,nextDom:null,apiV1:"",bbDom:bbMemo.domId?document.querySelector(bbMemo.domId):null,isLoading:false,tageFilter:"",emactionApi:bbMemo.emactionApi};const load='<div class="bb-load"><button class="load-btn button-load">加载中……</button></div>';const loading=`
  <div class="loader" aria-label="加载中">
    <div class="loader-frame">
      <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <g class="loader-group">
          <path class="loader-path"></path>
        </g>
      </svg>
    </div>
  </div>
`;function initLoaderAnimation(e=document){const s=e.querySelector(".loader:not([data-loader-ready])");if(!s){return}s.setAttribute("data-loader-ready","true");const l=s.querySelector(".loader-group");const c=s.querySelector(".loader-path");if(!l||!c){return}const d={particleCount:28,trailSpan:.31,durationMs:5300,rotationDurationMs:28e3,pulseDurationMs:4400,strokeWidth:4.2,roseA:9.2,roseABoost:.6,roseBreathBase:.72,roseBreathBoost:.28,roseScale:3.25};const t="http://www.w3.org/2000/svg";c.setAttribute("stroke-width",String(d.strokeWidth));const m=Array.from({length:d.particleCount},()=>{const e=document.createElementNS(t,"circle");e.setAttribute("class","loader-particle");l.appendChild(e);return e});const p=e=>(e%1+1)%1;const b=(e,t)=>{const o=e*Math.PI*2;const r=d.roseA+t*d.roseABoost;const a=r*(d.roseBreathBase+t*d.roseBreathBoost)*Math.cos(3*o);return{x:50+Math.cos(o)*a*d.roseScale,y:50+Math.sin(o)*a*d.roseScale}};const u=(r,a=240)=>Array.from({length:a+1},(e,t)=>{const o=b(t/a,r);return`${t===0?"M":"L"} ${o.x.toFixed(2)} ${o.y.toFixed(2)}`}).join(" ");const g=performance.now();const h=e=>{if(!s.isConnected){return}const t=e-g;const i=t%d.durationMs/d.durationMs;const o=t%d.pulseDurationMs/d.pulseDurationMs;const r=o*Math.PI*2;const n=.52+(Math.sin(r+.55)+1)/2*.48;const a=-(t%d.rotationDurationMs/d.rotationDurationMs)*360;l.setAttribute("transform",`rotate(${a} 50 50)`);c.setAttribute("d",u(n));m.forEach((e,t)=>{const o=t/Math.max(d.particleCount-1,1);const r=b(p(i-o*d.trailSpan),n);const a=Math.pow(1-o,.56);e.setAttribute("cx",r.x.toFixed(2));e.setAttribute("cy",r.y.toFixed(2));e.setAttribute("r",(.7+a*1.9).toFixed(2));e.setAttribute("opacity",(.05+a*.95).toFixed(3))});requestAnimationFrame(h)};requestAnimationFrame(h)}if(AppState.bbDom){Utils.safeExecute(()=>fetchStatus(),"初始化失败").catch(e=>{console.error("应用启动失败:",e);renderError(e.message||"加载失败，请刷新页面重试")})}async function fetchStatus(){if(!AppState.memos){throw new Error("请在 index.md 中配置 memos 地址")}const e=`${AppState.memos}api/v1/memos?pageSize=1`;const t=await fetch(e);if(!t.ok){throw new Error(`Memos API 探测失败，HTTP status: ${t.status}`)}const o=t.headers.get("content-type")||"";if(!o.includes("application/json")){throw new Error("Memos API 探测失败，返回的不是 JSON 数据")}AppState.apiV1="v1/";let r=Utils.getQueryVariable("memo")||"";if(r){getMemoOne(r)}else{newApiV1(AppState.apiV1)}}function getMemoOne(e){let t=`<iframe style="width:100%;height:100vh;" src="${e}" frameBorder="0"></iframe>`;let o=document.querySelector(".content")||document.querySelector(bbMemo.domId);o.innerHTML=t}function newApiV1(e){getFirstList(e);AppState.bbDom.innerHTML=loading;initLoaderAnimation(AppState.bbDom)}function buildMemosUrl({apiV1:e,pageToken:t="",tagName:o=""}={}){const r=new URLSearchParams({creatorId:bbMemo.creatorId,pageSize:String(AppState.limit)});if(t){r.set("pageToken",t)}if(o){r.set("filter",`tag in ["${o}"]`)}else{r.set("filter",`creator_id == ${bbMemo.creatorId}`)}return`${AppState.memos}api/${e}memos?${r.toString()}`}function bindLoadMoreButton(o){setTimeout(()=>{const e=document.querySelector("button.button-load");if(e&&!e.hasAttribute("data-bound")){e.setAttribute("data-bound","true");const t=function(e){e.preventDefault();e.stopPropagation();const t=e.target;t.textContent="";t.classList.add("loading");t.disabled=true;if(!AppState.nextDom||!Array.isArray(AppState.nextDom.memos)){t.classList.remove("loading");t.textContent="没有更多了";t.disabled=true;return}updateHTMl(AppState.nextDom);if(AppState.nextDom.memos.length===0||AppState.nextDom.memos.length<AppState.limit){t.classList.remove("loading");t.textContent="没有更多了";t.disabled=true}else{getNextList(o||AppState.apiV1)}};e.addEventListener("click",t);e._clickHandler=t}},100)}async function getFirstList(e){try{AppState.bbDom.insertAdjacentHTML("afterend",load);bindLoadMoreButton(e);const t=buildMemosUrl({apiV1:e});const o=await fetch(t);if(!o.ok){throw new Error(`HTTP error! status: ${o.status}`)}const r=await o.json();updateHTMl(r);AppState.offset=r.nextPageToken;if(AppState.offset===""||!r.memos||r.memos.length===0){const a=document.querySelector("button.button-load");a.textContent="没有更多了";a.disabled=true;return}getNextList(e)}catch(e){console.error("获取数据失败:",e);renderError(`加载失败：${e.message||"请刷新页面重试"}`)}}async function getNextList(e){try{if(AppState.isLoading)return;if(AppState.offset===""){const a=document.querySelector("button.button-load");a.textContent="没有更多了";a.disabled=true;return}AppState.isLoading=true;const t=buildMemosUrl({apiV1:e,pageToken:AppState.offset,tagName:AppState.tageFilter});const o=await fetch(t);if(!o.ok){throw new Error(`HTTP error! status: ${o.status}`)}const r=await o.json();AppState.nextDom=r;AppState.offset=r.nextPageToken}catch(e){console.error("预加载下一页失败:",e)}finally{AppState.isLoading=false}}function getCreatorUsername(e=""){return e.split("/").pop()||""}function getAuthorDisplayName(e){return bbMemo.authorName||getCreatorUsername(e.creator)||"Memos"}function escapeHtml(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function normalizeGithubRepoPath(e=""){const t=e.split("/").filter(Boolean);if(t.length<2){return null}const o=t[0];const r=t[1].replace(/\.git$/i,"");return o&&r?`${o}/${r}`:null}function parseGithubRepoUrl(e=""){try{const t=new URL(e);const o=t.hostname.replace(/^www\./i,"").toLowerCase();if(o!=="github.com"){return null}const r=normalizeGithubRepoPath(t.pathname);if(!r){return null}const a=t.pathname.split("/").filter(Boolean);if(a.length>2&&!a[1].endsWith(".git")){return null}const[i,n]=r.split("/");return{owner:i,repo:n,fullName:r,url:`https://github.com/${r}`}}catch(e){return null}}function wrapGithubRepoLinks(e=""){const t=/(^|[\s>])https?:\/\/(?:www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(?:\.git)?(?=\/?(?:[?#)\]\s<]|$))/gi;return e.replace(t,(e,t,o,r)=>{const a=r.replace(/\.git$/i,"");const i=`https://github.com/${o}/${a}`;return`${t}[${o}/${a}](${i})`})}function createGithubRepoCardSkeleton(e,t){return`<a class="github-repo-card is-loading" href="${escapeHtml(t)}" target="_blank" rel="noreferrer" data-github-repo="${escapeHtml(e.fullName)}" data-github-url="${escapeHtml(t)}">
    <span class="github-repo-card__header">
      <span class="github-repo-card__badge">GitHub</span>
      <span class="github-repo-card__name">${escapeHtml(e.fullName)}</span>
    </span>
    <span class="github-repo-card__body">正在加载仓库信息…</span>
  </a>`}const GITHUB_BRANCH_ICON=`<svg class="github-repo-card__mark-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38c-.4.4-.86.61-1.38.63c-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72c0 1.11.89 2 2 2c1.11 0 2-.89 2-2c0-.53-.2-1-.53-1.36c.09-.06.48-.41.59-.47c.25-.11.56-.17.94-.17c1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2c0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2c0-.65.55-1.2 1.2-1.2c.65 0 1.2.55 1.2 1.2c0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2c0-.65.55-1.2 1.2-1.2c.65 0 1.2.55 1.2 1.2c0 .65-.55 1.2-1.2 1.2z"/></svg>`;function renderGithubRepoCard(e,t,o){const r=e.full_name||o;const a=e.description?escapeHtml(e.description):"没有简介";const i=e.language?escapeHtml(e.language):"Unknown";const n=Number(e.stargazers_count||0).toLocaleString();const s=Number(e.forks_count||0).toLocaleString();const l=e.updated_at?new Date(e.updated_at).toLocaleDateString():"";return`<span class="github-repo-card__top">
      <span class="github-repo-card__owner">
        <span class="github-repo-card__mark" aria-hidden="true">${GITHUB_BRANCH_ICON}</span>
        <span class="github-repo-card__title">
          <span class="github-repo-card__repo">${escapeHtml(r)}</span>
          <span class="github-repo-card__desc">${a}</span>
        </span>
      </span>
      <span class="github-repo-card__arrow" aria-hidden="true">↗</span>
    </span>
    <span class="github-repo-card__meta">
      <span>★ ${n}</span>
      <span>⑂ ${s}</span>
      <span>${i}</span>
      ${l?`<span>更新于 ${escapeHtml(l)}</span>`:""}
    </span>`}const githubRepoCache=new Map;async function fetchGithubRepoMeta(e,t){const o=`${e}/${t}`;if(githubRepoCache.has(o)){return githubRepoCache.get(o)}const r=fetch(`https://api.github.com/repos/${e}/${t}`,{headers:{Accept:"application/vnd.github+json"}}).then(async e=>{if(!e.ok){throw new Error(`GitHub API 请求失败: ${e.status}`)}return e.json()}).catch(e=>{githubRepoCache.delete(o);throw e});githubRepoCache.set(o,r);return r}async function hydrateGithubRepoCards(e=document){const t=e.querySelectorAll?.("[data-github-repo]")||[];if(!t.length){return}await Promise.all(Array.from(t).map(async t=>{const o=t.dataset.githubRepo;const e=t.dataset.githubUrl||t.href;if(!o){return}const[r,a]=o.split("/");if(!r||!a){return}try{const i=await fetchGithubRepoMeta(r,a);t.classList.remove("is-loading","is-error");t.innerHTML=renderGithubRepoCard(i,e,o);t.href=i.html_url||e;t.setAttribute("aria-label",`GitHub 仓库 ${o}`)}catch(e){console.warn(`加载 GitHub 仓库失败: ${o}`,e);t.classList.add("is-error");t.innerHTML=`<span class="github-repo-card__top">
          <span class="github-repo-card__title">
            <span class="github-repo-card__repo">${escapeHtml(o)}</span>
            <span class="github-repo-card__desc">GitHub 信息加载失败，点击可直接访问仓库</span>
          </span>
          <span class="github-repo-card__arrow" aria-hidden="true">↗</span>
        </span>
        <span class="github-repo-card__meta">
          <span>${escapeHtml(o)}</span>
        </span>`}}))}async function updateHTMl(e){if(!e||!e.memos){console.error("数据格式错误");return}let g="",r="";const h=/#([^#\s!.,;:?"'()]+)(?= )/g,f=/\!\[(.*?)\]\((.*?)\)/g,v=/\[(.*?)\]\((.*?)\)/g,x=/<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g,w=/<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g,y=/<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g,_=/<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g,k=/<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g,A=/<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;if(typeof marked==="undefined"){console.error("marked库未加载");return}marked.setOptions({breaks:false,smartypants:false,langPrefix:"language-",headerIds:false,mangle:false});const S=e.memos;for(let u=0;u<S.length;u++){let e=S[u].name;let t=AppState.memos+e;let o=getAuthorDisplayName(S[u]);let r=S[u].content+" ";let l="";l+=wrapGithubRepoLinks(r).replace(h,"").replace(f,"").replace(v,'<a class="primary" href="$2" target="_blank">$1</a>');let a=r.match(h);let i="";if(a){i=a.map(e=>{return`<span class='tag-span' onclick='getTypeOfMemos(this)'>${e}</span> `}).join("");l=i+l.trim()}l=marked.parse(l).replace(x,"<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>").replace(w,"<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>").replace(y,"<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>").replace(_,"<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>").replace(k,"<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>").replace(A,"<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>").replace(/<a([^>]*?)href="(https?:\/\/(?:www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(?:\.git)?\/?)"([^>]*)>(.*?)<\/a>/gi,(e,t,o)=>{const r=parseGithubRepoUrl(o);if(!r){return e}return createGithubRepoCardSkeleton(r,r.url)});let n=S[u].content.match(f)||"",s="";if(n){let t=n.length,o="";if(t!==1){let e=" grid grid-"+t}n.forEach(e=>{let t=e.replace(/!\[.*?\]\((.*?)\)/g,"$1");o+=`<figure class="gallery-thumbnail"><img class="img thumbnail-image" loading="lazy" decoding="async" src="${t}"/></figure>`});l+=`<div class="resimg${s}">${o}</div>`}if(S[u].resources&&S[u].resources.length>0){let a=S[u].resources;let i="",n="",s=0;for(let r=0;r<a.length;r++){let e=a[r].type.slice(0,5);let t=a[r].externalLink;let o=t?t:AppState.memos+"file/"+(a[r].publicId||a[r].name)+"/"+a[r].filename+"?thumbnail=1";if(e=="image"){i+=`<figure class="gallery-thumbnail"><img class="img thumbnail-image" src="${o}"/></figure>`;s=s+1}else if(e=="video"){i+=`<div class="video-wrapper"><video controls><source src="${o}" type="video/mp4"></video></div>`}else{n+=`<a target="_blank" rel="noreferrer" href="${o}">${a[r].name}</a>`}}if(i){let e="";e="grid grid-"+s;l+=`<div class="resimg ${e}">${i}</div>`}if(n){l+=`<p class="bb-source">${n}</p>`}}let c=AppState.memos.replace(/https\:\/\/(.*\.)?(.*)\..*/,"id-$2-");let d=`<emoji-reaction theme="system" class="reaction" endpoint="${AppState.emactionApi}" reacttargetid="${c+"memo-"+e}" style="line-height:normal;display:inline-flex;"></emoji-reaction>`;let m="";let p=S[u].displayTime||S[u].updateTime||S[u].createTime;let b=new Date(p).toLocaleString();g+=`<div data-id="memo-${e}" class="memo-item">
        <div class="bb-item">
          <div class="memo-head">
            <div class="memo-meta">
              <span class="memo-name">${o}</span>
              <a class="memo-time-link" href="${t}" target="_blank" rel="noreferrer">
                <time class="datatime" datetime="${p}">${b}</time>
              </a>
            </div>
          </div>
          <div class="bb-cont">
            ${l}
          </div>
          <div class="memo-foot bb-tool">${d}</div>
          <div class="bb-info">
            ${m}
          </div>
        </div>
      </div>`}const t=document.querySelector(".bb-timeline");let o=!!t;if(o){const i=document.createElement("div");i.innerHTML=g;const n=i.querySelectorAll(".memo-item");n.forEach(e=>{t.appendChild(e)});hydrateGithubRepoCards(t);const s=document.querySelector("button.button-load");if(s){s.classList.remove("loading");s.textContent="加载更多";s.disabled=false;bindLoadMoreButton(AppState.apiV1)}}else{let e="<section class='bb-timeline'>";let t="</section>";r=e+g+t;let o=document.querySelector(".loader")||"";if(o)o.remove();AppState.bbDom.insertAdjacentHTML("beforeend",r);hydrateGithubRepoCards(AppState.bbDom);const s=document.querySelector("button.button-load");if(s){s.classList.remove("loading");s.textContent="加载更多";s.disabled=false;bindLoadMoreButton(AppState.apiV1)}}window.ViewImage&&ViewImage.init(".bb-cont img");window.Lately&&Lately.init({target:".datatime"});const a=document.querySelector(".bb-timeline");if(a){bindImageLoadEvents(a)}}function removeImagePlaceholder(e){e.style.backgroundImage="none";e.style.backgroundColor="transparent"}function bindImageLoadEvents(e){const t=e.querySelectorAll("img");t.forEach(e=>{if(e.complete&&e.naturalHeight!==0){removeImagePlaceholder(e)}else{e.addEventListener("load",function(){removeImagePlaceholder(this)},{once:true});e.addEventListener("error",function(){removeImagePlaceholder(this);this.style.backgroundColor="#f0f0f0";this.style.backgroundImage="none"},{once:true})}})}function getTypeOfMemos(e){let t=`<div id="tag-list"></div>`;AppState.bbDom.insertAdjacentHTML("beforebegin",t);let o=e.innerHTML.replace("#","");let r=document.getElementById("tag-list");window.scrollTo({top:r.offsetTop-20,behavior:"smooth"});let a=`<span class='tag-span' onclick='reLoad()'>${e.innerHTML}</span>`;document.querySelector("#tag-list").innerHTML=a;AppState.tageFilter=o;fetchMemoDOM(buildMemosUrl({apiV1:AppState.apiV1,tagName:o}))}async function fetchMemoDOM(e){try{AppState.bbDom.innerHTML=loading;initLoaderAnimation(AppState.bbDom);const t=await fetch(e);if(!t.ok){throw new Error(`HTTP error! status: ${t.status}`)}const o=await t.json();if(o){document.querySelector(bbMemo.domId).innerHTML="";const r=document.querySelector("button.button-load");updateHTMl(o);AppState.offset=o.nextPageToken;if(AppState.offset===""||!o.memos||o.memos.length===0){r.textContent="没有更多了";r.disabled=true;return}getNextList(AppState.apiV1)}else{alert("404 -_-!");setTimeout(reLoad(),1e3)}}catch(e){console.error("获取数据失败:",e);renderError(`加载失败：${e.message||"请刷新页面重试"}`)}}function reLoad(){let e=location.protocol+"//"+location.host+location.pathname;window.location.replace(e)}window.addEventListener("load",()=>{const t=new IntersectionObserver((e,o)=>{e.forEach(e=>{if(e.isIntersecting){const t=e.target;t.src=t.dataset.src;t.classList.remove("lazyload");o.unobserve(t)}})},{rootMargin:"100px 0px",threshold:.1});document.querySelectorAll("img.lazyload").forEach(e=>{t.observe(e)})});