const DEFAULT_CONFIG={memos:"https://demo.usememos.com/",emactionApi:"https://emaction-go.mintimate.cn",limit:10,creatorId:"1",domId:"#bber",authorName:""};function normalizeMemosUrl(e){if(typeof e!=="string"){return""}const t=e.trim();if(!t){return""}return t.endsWith("/")?t:`${t}/`}const bbMemo={...DEFAULT_CONFIG,...typeof bbMemos!=="undefined"?bbMemos:{}};bbMemo.memos=normalizeMemosUrl(bbMemo.memos);if(!bbMemo.memos||!bbMemo.domId){console.error("Memos配置不完整，请检查 memos 和 domId 参数")}function renderError(e){if(!AppState.bbDom){return}AppState.bbDom.innerHTML=`<div class="error">${e}</div>`}const Utils={loadCssCode(e){const t=document.createElement("style");t.type="text/css";t.rel="stylesheet";t.appendChild(document.createTextNode(e));document.head.appendChild(t)},getQueryVariable(t){const e=window.location.search.substring(1);const o=e.split("&");for(let e=0;e<o.length;e++){const r=o[e].split("=");if(r[0]===t){return decodeURIComponent(r[1])}}return false},async safeExecute(e,t="操作失败"){try{return await e()}catch(e){console.error(`${t}:`,e);throw e}}};const allCSS=`
/* 主容器 */
#bber {
  margin-top: 1rem;
  width: auto !important;
  min-height: 100vh;
  /* 确保容器有足够的内边距 */
  box-sizing: border-box;
}

/* 卡片瀑布流布局 */
.bb-timeline {
  position: relative;
  padding: 0;
  min-height: 100px;
}

.bb-timeline .memo-item {
  position: absolute;
  /* 移除固定宽度，由JS动态设置 */
  transition: all 0.3s ease, opacity 0.5s ease;
  opacity: 0;
}

.bb-timeline .bb-item {
  background: #fff;
  border-radius: 12px;
  padding: 0.6rem;
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.24), 0 7px 10px 0 rgba(0,0,0,0.19);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.bb-timeline .bb-item:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

/* 内容区域 */
.bb-cont {
  margin-bottom: 0.6rem;
  line-height: 1.5;
}

.bb-cont p {
  margin: 0.3rem 0;
  color: #333;
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
  background: #fff;
  border-color: #f0f0f0;
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
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
  margin-top: 0.75rem;
}

/* 信息区域 */
.bb-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
  font-size: 0.875rem;
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
  font-size: 0.875rem;
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

/* 加载动画 */
.loader {
  position: relative;
  width: 100%;
  margin: 3rem auto;
  text-align: center;
  z-index: 10;
}

.loader .circular {
  animation: rotate 2s linear infinite;
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.path {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
  stroke: #1976d2;
  stroke-width: 2;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

@keyframes dash {
  0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
}

/* 暗色主题 */
[data-user-color-scheme="dark"] .bb-cont p {
  color: var(--subtitle-color);
}

[data-user-color-scheme="dark"] .load-btn {
  color: var(--subtitle-color);
}

[data-user-color-scheme="dark"] .bb-timeline .bb-item {
  background: var(--board-bg-color);
  border-color: var(--line-color);
  color: var(--text-color);
}

[data-user-color-scheme="dark"] .tag-span {
  background: rgba(21, 137, 233, 0.2);
  color: var(--post-link-color);
}

[data-user-color-scheme="dark"] .bb-tool {
  border-top-color: var(--line-color);
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


/* 移动端响应式样式 */
@media (max-width: 768px) {
  #bber {
    margin-top: 0.5rem !important;
    padding: 0 10px !important;
  }
  
  .bb-timeline {
    padding: 0 !important;
  }
  
  .bb-timeline .bb-item {
    padding: 1rem !important;
    margin-bottom: 1rem !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
    width: 100% !important;
    box-sizing: border-box;
  }
  
  .bb-timeline .bb-item:hover {
    transform: none !important;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15) !important;
  }
  
  .bb-cont {
    margin-bottom: 1rem;
  }
  
  .tag-span {
    font-size: 0.8rem;
    padding: 0.15rem 0.3rem;
  }
  
  .bb-info {
    font-size: 0.8rem;
  }
  
  .bb-tool {
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }

/* 超小屏幕设备优化 */
@media (max-width: 480px) {
  #bber {
    padding: 0 5px !important;
  }
  
  .bb-timeline .bb-item {
    padding: 0.8rem !important;
    border-radius: 8px !important;
    width: 100% !important;
    box-sizing: border-box;
  }
  
  .bb-cont {
    margin-bottom: 0.8rem;
  }
  
  .bb-cont p {
    margin: 0.2rem 0;
    font-size: 0.95rem;
  }
  
  .tag-span {
    font-size: 0.75rem;
    padding: 0.1rem 0.25rem;
    margin: 0.1rem 0.1rem 0.1rem 0;
  }
  
  .bb-info {
    font-size: 0.75rem;
    margin-top: 0.3rem;
  }
  
  .datatime {
    font-size: 0.75rem;
  }
  
  .bb-tool {
    padding-top: 0.4rem;
    margin-top: 0.4rem;
  }
  
}

/* 列表长卡片布局覆盖 */
.memos-hero {
  max-width: 760px;
  margin: 0 auto 2.5rem;
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
  margin: 0.9rem 0 0;
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

[data-user-color-scheme="dark"] .datatime {
  color: var(--sec-text-color);
}

[data-user-color-scheme="dark"] .memo-head {
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

[data-user-color-scheme="dark"] .bb-timeline .bb-item {
  background: rgba(255, 255, 255, 0.015);
  border-color: rgba(255, 255, 255, 0.14);
}

[data-user-color-scheme="dark"] .bb-timeline .bb-item:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .memos-hero {
    margin-bottom: 2rem;
  }

  .memo-head {
    align-items: flex-start;
  }

  .bb-timeline .bb-item {
    padding: 0.9rem 0.95rem 0.8rem;
  }
}
`;Utils.loadCssCode(allCSS);const AppState={limit:bbMemo.limit,memos:bbMemo.memos,memosOpenId:null,mePage:1,offset:0,nextLength:0,nextDom:"",apiV1:"",bbDom:bbMemo.domId?document.querySelector(bbMemo.domId):null,isLoading:false,tageFilter:"",emactionApi:bbMemo.emactionApi};const load='<div class="bb-load"><button class="load-btn button-load">加载中……</button></div>';const loading=`<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>`;if(AppState.bbDom){Utils.safeExecute(()=>fetchStatus(),"初始化失败").catch(e=>{console.error("应用启动失败:",e);renderError(e.message||"加载失败，请刷新页面重试")})}async function fetchStatus(){if(!AppState.memos){throw new Error("请在 index.md 中配置 memos 地址")}const e=`${AppState.memos}api/v1/memos?pageSize=1`;const t=await fetch(e);if(!t.ok){throw new Error(`Memos API 探测失败，HTTP status: ${t.status}`)}const o=t.headers.get("content-type")||"";if(!o.includes("application/json")){throw new Error("Memos API 探测失败，返回的不是 JSON 数据")}AppState.apiV1="v1/";let r=Utils.getQueryVariable("memo")||"";if(r){getMemoOne(r)}else{newApiV1(AppState.apiV1)}}function getMemoOne(e){let t=`<iframe style="width:100%;height:100vh;" src="${e}" frameBorder="0"></iframe>`;let o=document.querySelector(".content")||document.querySelector(bbMemo.domId);o.innerHTML=t}function newApiV1(e){getFirstList(e);meNums(e);AppState.bbDom.innerHTML=loading}function bindLoadMoreButton(o){setTimeout(()=>{const e=document.querySelector("button.button-load");if(e&&!e.hasAttribute("data-bound")){e.setAttribute("data-bound","true");const t=function(e){e.preventDefault();e.stopPropagation();const t=e.target;t.textContent="";t.classList.add("loading");t.disabled=true;updateHTMl(AppState.nextDom);if(AppState.nextDom.memos.length===0||AppState.nextDom.memos.length<AppState.limit){t.classList.remove("loading");t.textContent="没有更多了";t.disabled=true}else{getNextList(o||AppState.apiV1)}};e.addEventListener("click",t);e._clickHandler=t}},100)}async function getFirstList(t){try{AppState.bbDom.insertAdjacentHTML("afterend",load);bindLoadMoreButton(t);const o=encodeURIComponent(`creator_id == ${bbMemo.creatorId}`);let e=AppState.memos+"api/"+t+"memos?creatorId="+bbMemo.creatorId+"&filter="+o+"&pageSize="+AppState.limit;const r=await fetch(e);if(!r.ok){throw new Error(`HTTP error! status: ${r.status}`)}const a=await r.json();updateHTMl(a);AppState.offset=a.nextPageToken;if(AppState.offset===""||!a.memos||a.memos.length===0){const i=document.querySelector("button.button-load");i.textContent="没有更多了";i.disabled=true;return}AppState.mePage++;getNextList(t)}catch(e){console.error("获取数据失败:",e);renderError(`加载失败：${e.message||"请刷新页面重试"}`)}}async function getNextList(t){try{if(AppState.isLoading)return;if(AppState.offset===""){const a=document.querySelector("button.button-load");a.textContent="没有更多了";a.disabled=true;return}AppState.isLoading=true;let e=AppState.memos+"api/"+t+"memos?creatorId="+bbMemo.creatorId+"&pageSize="+AppState.limit+"&pageToken="+AppState.offset;if(AppState.tageFilter){e=e+'&filter=tag in ["'+AppState.tageFilter+'"]'}const o=await fetch(e);if(!o.ok){throw new Error(`HTTP error! status: ${o.status}`)}const r=await o.json();AppState.nextDom=r;AppState.mePage++;AppState.offset=r.nextPageToken}catch(e){console.error("预加载下一页失败:",e)}finally{AppState.isLoading=false}}function meNums(e){let t=document.querySelector(".bb-load")}function getCreatorUsername(e=""){return e.split("/").pop()||""}function getAuthorDisplayName(e){return bbMemo.authorName||getCreatorUsername(e.creator)||"Memos"}async function updateHTMl(e){if(!e||!e.memos){console.error("数据格式错误");return}let g="",r="";const u=/#([^#\s!.,;:?"'()]+)(?= )/g,h=/\!\[(.*?)\]\((.*?)\)/g,v=/\[(.*?)\]\((.*?)\)/g,x=/<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g,y=/<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g,w=/<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g,k=/<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g,S=/<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g,A=/<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;if(typeof marked==="undefined"){console.error("marked库未加载");return}marked.setOptions({breaks:false,smartypants:false,langPrefix:"language-",headerIds:false,mangle:false});const L=e.memos;for(let f=0;f<L.length;f++){let e=L[f].name;let t=AppState.memos+e;let o=getAuthorDisplayName(L[f]);let r=L[f].content+" ";let s="";s+=r.replace(u,"").replace(h,"").replace(v,'<a class="primary" href="$2" target="_blank">$1</a>');let a=r.match(u);let i="";if(a){i=a.map(e=>{return`<span class='tag-span' onclick='getTypeOfMemos(this)'>${e}</span> `}).join("");s=i+s.trim()}s=marked.parse(s).replace(x,"<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>").replace(y,"<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>").replace(w,"<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>").replace(k,"<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>").replace(S,"<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>").replace(A,"<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>");let n=L[f].content.match(h)||"",l="";if(n){let t=n.length,o="";if(t!==1){let e=" grid grid-"+t}n.forEach(e=>{let t=e.replace(/!\[.*?\]\((.*?)\)/g,"$1");o+=`<figure class="gallery-thumbnail"><img class="img thumbnail-image" loading="lazy" decoding="async" src="${t}"/></figure>`});s+=`<div class="resimg${l}">${o}</div>`}if(L[f].resources&&L[f].resources.length>0){let a=L[f].resources;let i="",n="",l=0;for(let r=0;r<a.length;r++){let e=a[r].type.slice(0,5);let t=a[r].externalLink;let o=t?t:AppState.memos+"file/"+(a[r].publicId||a[r].name)+"/"+a[r].filename+"?thumbnail=1";if(e=="image"){i+=`<figure class="gallery-thumbnail"><img class="img thumbnail-image" src="${o}"/></figure>`;l=l+1}else if(e=="video"){i+=`<div class="video-wrapper"><video controls><source src="${o}" type="video/mp4"></video></div>`}else{n+=`<a target="_blank" rel="noreferrer" href="${o}">${a[r].name}</a>`}}if(i){let e="";e="grid grid-"+l;s+=`<div class="resimg ${e}">${i}</div>`}if(n){s+=`<p class="bb-source">${n}</p>`}}let d=AppState.memos.replace(/https\:\/\/(.*\.)?(.*)\..*/,"id-$2-");let m=`<emoji-reaction theme="system" class="reaction" endpoint="${AppState.emactionApi}" reacttargetid="${d+"memo-"+e}" style="line-height:normal;display:inline-flex;"></emoji-reaction>`;let c="";let b=L[f].displayTime||L[f].updateTime||L[f].createTime;let p=new Date(b).toLocaleString();g+=`<div data-id="memo-${e}" class="memo-item">
        <div class="bb-item">
          <div class="memo-head">
            <div class="memo-meta">
              <span class="memo-name">${o}</span>
              <a class="memo-time-link" href="${t}" target="_blank" rel="noreferrer">
                <time class="datatime" datetime="${b}">${p}</time>
              </a>
            </div>
          </div>
          <div class="bb-cont">
            ${s}
          </div>
          <div class="memo-foot bb-tool">${m}</div>
          <div class="bb-info">
            ${c}
          </div>
        </div>
      </div>`}const t=document.querySelector(".bb-timeline");let o=!!t;if(o){const a=document.createElement("div");a.innerHTML=g;const i=a.querySelectorAll(".memo-item");i.forEach(e=>{e.style.opacity="0";t.appendChild(e)});const n=document.querySelector("button.button-load");if(n){n.classList.remove("loading");n.textContent="加载更多";n.disabled=false;bindLoadMoreButton(AppState.apiV1)}}else{let e="<section class='bb-timeline'>";let t="</section>";r=e+g+t;let o=document.querySelector(".loader")||"";if(o)o.remove();AppState.bbDom.insertAdjacentHTML("beforeend",r);const n=document.querySelector("button.button-load");if(n){n.classList.remove("loading");n.textContent="加载更多";n.disabled=false;bindLoadMoreButton(AppState.apiV1)}}window.ViewImage&&ViewImage.init(".bb-cont img");window.Lately&&Lately.init({target:".datatime"});if(o){const i=document.querySelectorAll('.memo-item[style*="opacity: 0"]');i.forEach(e=>bindImageLoadEvents(e))}else{bindImageLoadEvents(document.querySelector(".bb-timeline"))}waitForImagesAndLayout(o)}function removeImagePlaceholder(e){e.style.backgroundImage="none";e.style.backgroundColor="transparent"}function bindImageLoadEvents(e){const t=e.querySelectorAll("img");let o=null;t.forEach(e=>{if(e.complete&&e.naturalHeight!==0){removeImagePlaceholder(e)}else{e.addEventListener("load",function(){removeImagePlaceholder(this);clearTimeout(o);o=setTimeout(()=>{initWaterfallLayout(false)},100)},{once:true});e.addEventListener("error",function(){removeImagePlaceholder(this);this.style.backgroundColor="#f0f0f0";this.style.backgroundImage="none";clearTimeout(o);o=setTimeout(()=>{initWaterfallLayout(false)},100)},{once:true})}})}function getTypeOfMemos(e){let t=`<div id="tag-list"></div>`;AppState.bbDom.insertAdjacentHTML("beforebegin",t);let o=e.innerHTML.replace("#","");let r=document.getElementById("tag-list");window.scrollTo({top:r.offsetTop-20,behavior:"smooth"});let a=`<span class='tag-span' onclick='reLoad()'>${e.innerHTML}</span>`;document.querySelector("#tag-list").innerHTML=a;let i=AppState.memos+"api/"+AppState.apiV1+"memos?creatorId="+bbMemo.creatorId+'&filter=tag in ["'+o+'"]&pageSize='+AppState.limit;AppState.tageFilter=o;AppState.mePage=1;fetchMemoDOM(i)}async function fetchMemoDOM(e){try{AppState.bbDom.innerHTML=loading;const t=await fetch(e);if(!t.ok){throw new Error(`HTTP error! status: ${t.status}`)}const o=await t.json();if(o){document.querySelector(bbMemo.domId).innerHTML="";const r=document.querySelector("button.button-load");updateHTMl(o);AppState.offset=o.nextPageToken;if(AppState.offset===""||!o.memos||o.memos.length===0){r.textContent="没有更多了";r.disabled=true;return}getNextList(AppState.apiV1)}else{alert("404 -_-!");setTimeout(reLoad(),1e3)}}catch(e){console.error("获取数据失败:",e);renderError(`加载失败：${e.message||"请刷新页面重试"}`)}}function reLoad(){let e=location.protocol+"//"+location.host+location.pathname;window.location.replace(e)}function initWaterfallLayout(e=false){const t=document.querySelector(".bb-timeline");if(!t)return;const o=t.querySelectorAll(".memo-item");if(o.length===0)return;const r=e?Array.from(o).filter(e=>e.style.opacity==="0"||e.style.opacity===""):Array.from(o);r.forEach(e=>{e.style.position="relative";e.style.width="100%";e.style.left="auto";e.style.top="auto";e.style.opacity="1"});t.style.height="auto"}function debounceWaterfall(){let e;return function(){clearTimeout(e);e=setTimeout(()=>{initWaterfallLayout(false)},150)}}const debouncedWaterfall=debounceWaterfall();window.addEventListener("resize",debouncedWaterfall);window.addEventListener("load",()=>{initWaterfallLayout();const t=new IntersectionObserver((e,o)=>{e.forEach(e=>{if(e.isIntersecting){const t=e.target;t.src=t.dataset.src;t.classList.remove("lazyload");o.unobserve(t)}})},{rootMargin:"100px 0px",threshold:.1});document.querySelectorAll("img.lazyload").forEach(e=>{t.observe(e)})});window.addEventListener("orientationchange",()=>{setTimeout(()=>{debouncedWaterfall()},300)});function waitForImagesAndLayout(e=false){const t=document.querySelector(".bb-timeline");if(!t)return;const o=e?t.querySelectorAll('.memo-item[style*="opacity: 0"], .memo-item:not([style])'):t.querySelectorAll(".memo-item");const r=[];o.forEach(e=>{const t=e.querySelectorAll("img");t.forEach(e=>r.push(e))});if(r.length===0){setTimeout(()=>{initWaterfallLayout(e);if(!e){window.addEventListener("resize",debouncedWaterfall)}},50);return}let a=0;const i=r.length;function n(){a++;if(a>=i){setTimeout(()=>{initWaterfallLayout(e);if(!e){window.addEventListener("resize",debouncedWaterfall)}},50)}}r.forEach(e=>{if(e.complete&&e.naturalHeight!==0){n()}else{e.addEventListener("load",n,{once:true});e.addEventListener("error",n,{once:true});setTimeout(()=>{if(!e.complete||e.naturalHeight===0){console.warn("图片加载超时，强制执行布局:",e.src);n()}},3e3)}});setTimeout(()=>{if(a<i){console.warn("部分图片加载超时，强制执行布局");initWaterfallLayout(e);if(!e){window.addEventListener("resize",debouncedWaterfall)}}},5e3)}