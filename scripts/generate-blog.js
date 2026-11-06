<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F8F7F2">
<title>Mai Thị Thanh Hiền – Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet">

<style>
  --bg:#F8F7F2;--grey:#F2F2F2;--green:#2E5905;--ink:#1D2618;
  --line:rgba(29,38,24,.15);color-scheme:light
}
@media(prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --bg:#1D2618;--grey:#26331f;--green:#9cc96b;--ink:#F8F7F2;
    --line:rgba(248,247,242,.2);color-scheme:dark
  }
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:90px}
body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif;line-height:1.7}
h1,h2,h3,h4{font-family:'Playfair Display',Georgia,serif;font-weight:400;line-height:1.15;margin:0}
nav{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:14px;padding:14px 5vw;background:var(--bg);border-bottom:1px solid var(--line)}
nav .links{display:flex;gap:18px;flex-wrap:wrap}
nav a{color:var(--ink);text-decoration:none;font-size:13px;transition:color .2s}
nav a:hover{color:var(--green)}
.lang{display:flex;gap:4px}
.lang button{border:1px solid var(--line);background:none;color:var(--ink);padding:4px 9px;cursor:pointer;font-size:12px}
.lang button.on{background:var(--green);color:#fff;border-color:var(--green)}
section{padding:86px 5vw;max-width:1200px;margin:0 auto;animation:up .7s both}
@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.eyebrow{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--green);margin-bottom:18px}
.hero{display:grid;grid-template-columns:1.5fr 1fr;gap:6vw;align-items:center;min-height:80vh}
.hero h1{font-size:clamp(52px,7.5vw,100px);line-height:1;letter-spacing:-.015em}
.hero h1 span{display:block}
.hero h1 span+span{margin-left:.35em;font-style:italic;color:var(--green)}
.hero p.intro{max-width:54ch;margin:0 0 12px}
.hero p.role{font-size:17px;color:var(--green);margin:22px 0 18px}
.btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
.btn{padding:11px 22px;border:1px solid var(--green);color:var(--green);text-decoration:none;background:none;cursor:pointer;font:inherit;font-size:14px;transition:.25s}
.btn.fill,.btn:hover{background:var(--green);color:#fff}
.btn.fill:hover{opacity:.85}
.photo{aspect-ratio:3/4;background:var(--grey);border:1px solid var(--line);display:grid;place-items:center;font-family:'Playfair Display',serif;font-size:64px;color:var(--green);margin-top:30px}
.cols{display:grid;grid-template-columns:1fr 2fr;gap:6vw}
h2{font-size:clamp(34px,4.5vw,56px)}
.cols p{margin:0 0 16px;max-width:60ch}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;margin-top:38px}
.card{border:1px solid var(--line);background:var(--grey);transition:transform .3s,border-color .3s}
.card:hover{transform:translateY(-4px);border-color:var(--green)}
button.card{display:block;text-align:left;color:inherit;font:inherit;cursor:pointer;padding:0;width:100%}
.card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
.card .b{padding:20px}
.card h3{font-size:22px;margin:7px 0 9px}
.card p{margin:0;font-size:14px;opacity:.85}
.ph{aspect-ratio:16/10;background:repeating-linear-gradient(45deg,var(--bg),var(--bg) 10px,var(--grey) 10px,var(--grey) 20px);display:grid;place-items:center;font-size:12px;opacity:.7}
.blog-date{font-size:12px!important;color:var(--green);margin-bottom:8px!important}
.blog-empty{margin-top:28px;opacity:.7}
.article-read{color:var(--green)!important;font-size:13px!important;margin-top:18px!important}
.education-school{margin-top:34px;padding:22px 0;border-top:2px solid var(--green);border-bottom:1px solid var(--line)}
.education-school h3{font-family:Inter,system-ui,sans-serif;font-size:clamp(19px,2.4vw,25px);font-weight:600;color:var(--green);line-height:1.45}
.education-major{font-size:15px;margin:12px 0 0;max-width:850px}
.education-grid{display:grid;grid-template-columns:1fr 1fr;gap:42px 6vw;margin-top:38px}
.education-block h3{font-family:Inter,system-ui,sans-serif;font-size:17px;font-weight:600;margin-bottom:12px}
.education-item{padding:10px 0;border-top:1px solid var(--line);font-size:14px}
.education-group{margin-top:28px}
.education-group:first-child{margin-top:0}
.education-group h4{font-family:Inter,system-ui,sans-serif;font-size:15px;font-weight:600;margin-bottom:8px}
.education-group ul{padding-left:19px;margin:0}
.education-group li{padding:5px 0;font-size:14px}
.modal{position:fixed;inset:0;z-index:10;background:rgba(29,38,24,.65);display:grid;place-items:center;padding:20px}
.sheet{background:var(--bg);max-width:760px;width:100%;max-height:90vh;overflow:auto;padding:clamp(22px,5vw,40px);animation:up .35s both}
.sheet h3{font-size:clamp(27px,4vw,36px);margin-bottom:10px}
.sheet p{margin:0 0 12px;opacity:.88}
.sheet>img{width:100%;max-height:420px;object-fit:cover;display:block;margin:22px 0}
.blog-content{margin-top:26px;line-height:1.85;overflow-wrap:anywhere}
.blog-content h1,.blog-content h2,.blog-content h3{margin:24px 0 12px}
.blog-content p{margin:0 0 16px}
.blog-content img{max-width:100%;height:auto}
.blog-content ul,.blog-content ol{padding-left:24px}
.blog-content a,.project-links a{color:var(--green)}
.blog-content blockquote{border-left:3px solid var(--green);margin:20px 0;padding-left:16px;opacity:.8}
.project-links{display:flex;gap:16px;flex-wrap:wrap;margin-top:22px}
.project-links a{text-underline-offset:4px;font-size:14px}
.row{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid var(--line)}
.row span:last-child{color:var(--green)}
.lnk{color:var(--green);text-decoration:underline;text-underline-offset:4px;word-break:break-all;text-align:right}
footer{padding:30px 5vw;border-top:1px solid var(--line);font-size:13px;opacity:.7}
@media(max-width:850px){
  nav{align-items:flex-start;flex-wrap:wrap}
  nav .links{gap:10px 14px}
  .hero,.cols,.education-grid{grid-template-columns:1fr}
  .hero{min-height:0}
  section{padding:60px 5vw}
  .photo{max-width:320px}
}
@media(max-width:520px){
  nav{padding:12px 5vw}
  nav .links{order:3;width:100%}
  nav a{font-size:12px}
  .lang{margin-left:auto}
  .hero h1{font-size:clamp(48px,14vw,72px)}
  .education-grid{gap:28px}
}
</style>
</head>

<body>
<div id="root"></div>

<script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/htm@3.1.1/dist/htm.js"></script>

<script>
const { useState } = React;
const html = htm.bind(React.createElement);

const NAME = "Mai Thị Thanh Hiền";
const NAME_LINES = ["Mai Thị", "Thanh Hiền"];

const LINKS = {
  email: "mailto:mhien0795work@gmail.com",
  linkedin: "https://www.linkedin.com/in/mai-th%E1%BB%8B-thanh-hi%E1%BB%81n-undefined-3a9797449/",
  cv: "https://canva.link/07kr50fe60xbvp3"
};

const CONTENT = {
  vi: {
    nav:["Trang chủ","Giới thiệu","Học vấn","Hoạt động","Dự án","Góc nhỏ","Liên hệ"],
    hello:"Xin chào, mình là",
    role:"Sinh viên Hàn Quốc học | Kinh tế, Chính trị & Ngoại giao Hàn Quốc",
    intro:[
      "Mình là sinh viên năm cuối ngành Hàn Quốc học tại Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM, chuyên ngành Kinh tế, Chính trị và Ngoại giao Hàn Quốc.",
      "Mình quan tâm đến vai trò IT Comtor Hàn–Việt, lĩnh vực Logistics và định hướng phát triển sự nghiệp tại các doanh nghiệp Hàn Quốc."
    ],
    b1:"Xem chi tiết",b2:"Liên hệ",
    aboutT:"Giới thiệu",
    about:[
      "Mình là sinh viên năm cuối ngành Hàn Quốc học tại Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM, chuyên ngành Kinh tế, Chính trị và Ngoại giao Hàn Quốc.",
      "Mình quan tâm đến vai trò IT Comtor Hàn–Việt, lĩnh vực Logistics và định hướng phát triển sự nghiệp tại các doanh nghiệp Hàn Quốc."
    ],
    educationT:"Học vấn",languageT:"Chứng chỉ ngôn ngữ",itT:"Kiến thức IT & kinh doanh",
    skillsT:"Kỹ năng chuyên môn",officeT:"Hành chính văn phòng & Tài liệu",webT:"Phát triển web với AI hỗ trợ",
    school:"Trường Đại học Khoa học Xã hội và Nhân văn",
    major:"Ngành Hàn Quốc học – Chuyên ngành Kinh tế, Chính trị và Ngoại giao",
    langs:["Tiếng Hàn – TOPIK cấp 4","Tiếng Việt – Bản ngữ","Tiếng Anh – B2 in Progress"],
    it:["TOPCIT cấp 2","Kiến thức cơ bản về IT và thương mại quốc tế","Giao tiếp trong kinh doanh"],
    office:[
      "Microsoft Word, Excel, PowerPoint (MOS)",
      "Soạn thảo tài liệu kinh doanh",
      "Tổng hợp thông tin và lập báo cáo",
      "Biên bản họp và tài liệu hành chính",
      "Sắp xếp, lưu trữ và quản lý hồ sơ"
    ],
    web:[
      "Hiểu biết cơ bản về cấu trúc website và frontend qua thực hành xây dựng portfolio."
    ],
    expT:"Hoạt động",projT:"Dự án",more:"Xem chi tiết",
    blogT:"Góc nhỏ",blogEmpty:"Chưa có bài viết nào.",blogBack:"Quay lại",
    activityEmpty:"Chưa có hoạt động nào.",projectEmpty:"Chưa có dự án nào.",
    articleMore:"Đọc chi tiết",contactT:"Liên hệ",
    overview:"Tổng quan",details:"Chi tiết",close:"Đóng",projectLink:"Xem dự án",githubLink:"GitHub",
    cs:[
      ["Email","mhien0795work@gmail.com",LINKS.email,0],
      ["LinkedIn","Xem hồ sơ LinkedIn",LINKS.linkedin,1],
      ["CV","Xem CV trên Canva",LINKS.cv,1]
    ]
  },
  en: {
    nav:["Home","About","Education","Activities","Projects","Little Notes","Contact"],
    hello:"Hello, I’m",
    role:"Korean Studies Student | Korean Economics, Politics & Diplomacy",
    intro:[
      "I am a senior Korean Studies student at the University of Social Sciences and Humanities, VNU-HCM, specializing in Korean Economics, Politics and Diplomacy.",
      "I am interested in Korean–Vietnamese IT communication, logistics, and building a career in Korean companies."
    ],
    b1:"View Details",b2:"Contact Me",
    aboutT:"About Me",
    about:[
      "I am a senior Korean Studies student at the University of Social Sciences and Humanities, VNU-HCM, specializing in Korean Economics, Politics and Diplomacy.",
      "I am interested in Korean–Vietnamese IT communication, logistics, and building a career in Korean companies."
    ],
    educationT:"Education",languageT:"Language Certificates",itT:"IT & Business Knowledge",
    skillsT:"Professional Skills",officeT:"Office Administration & Documentation",webT:"AI-Assisted Web Development",
    school:"University of Social Sciences and Humanities, VNU-HCM",
    major:"Korean Studies – Specialization in Korean Economics, Politics and Diplomacy",
    langs:["Korean – TOPIK Level 4","Vietnamese – Native","English – B2 in Progress"],
    it:["TOPCIT Level 2","Basic knowledge of IT and international trade","Business communication"],
    office:[
      "Microsoft Word, Excel, PowerPoint (MOS)",
      "Business document drafting",
      "Information compilation and report preparation",
      "Meeting minutes and administrative documents",
      "Document organization, filing and record management"
    ],
    web:["Basic understanding of website structure and frontend development through hands-on portfolio building."],
    expT:"Activities",projT:"Projects",more:"View Details",
    blogT:"Little Notes",blogEmpty:"No posts yet.",blogBack:"Back",
    activityEmpty:"No activities yet.",projectEmpty:"No projects yet.",
    articleMore:"Read more",contactT:"Contact",
    overview:"Overview",details:"Details",close:"Close",projectLink:"View Project",githubLink:"GitHub",
    cs:[
      ["Email","mhien0795work@gmail.com",LINKS.email,0],
      ["LinkedIn","View LinkedIn profile",LINKS.linkedin,1],
      ["CV","View CV on Canva",LINKS.cv,1]
    ]
  },
  ko: {
    nav:["홈","소개","학력","활동","프로젝트","작은 기록","연락처"],
    hello:"안녕하세요, 저는",
    role:"한국학 전공 학생 | 한국 경제·정치·외교",
    intro:[
      "저는 호찌민시 국가대학교 인문사회과학대학 한국학과 4학년으로, 한국 경제·정치·외교를 전공하고 있습니다.",
      "한–베 IT 커뮤니케이션과 물류 분야에 관심이 있으며, 한국 기업에서 커리어를 쌓고 싶습니다."
    ],
    b1:"자세히 보기",b2:"연락하기",
    aboutT:"소개",
    about:[
      "저는 호찌민시 국가대학교 인문사회과학대학 한국학과 4학년으로, 한국 경제·정치·외교를 전공하고 있습니다.",
      "한–베 IT 커뮤니케이션과 물류 분야에 관심이 있으며, 한국 기업에서 커리어를 쌓고 싶습니다."
    ],
    educationT:"학력",languageT:"어학 자격",itT:"IT 및 비즈니스 지식",
    skillsT:"실무 역량",officeT:"사무 행정 및 문서 업무",webT:"AI 활용 웹 개발",
    school:"호찌민시 국가대학교 인문사회과학대학",
    major:"한국학 전공 – 한국 경제·정치·외교 분야",
    langs:["한국어 – TOPIK 4급","베트남어 – 모국어","영어 – B2 준비 중"],
    it:["TOPCIT 2등급","IT 및 국제무역 기초 지식","비즈니스 커뮤니케이션"],
    office:[
      "Microsoft Word, Excel, PowerPoint (MOS)",
      "비즈니스 문서 작성",
      "정보 취합 및 보고서 작성",
      "회의록 및 행정 문서 작성",
      "문서 정리, 파일링 및 기록 관리"
    ],
    web:["포트폴리오 제작 실습을 통해 웹사이트 구조와 프론트엔드 기초 지식을 습득했습니다."],
    expT:"활동",projT:"프로젝트",more:"자세히 보기",
    blogT:"작은 기록",blogEmpty:"아직 게시된 글이 없습니다.",blogBack:"돌아가기",
    activityEmpty:"아직 활동이 없습니다.",projectEmpty:"아직 프로젝트가 없습니다.",
    articleMore:"자세히 보기",contactT:"연락처",
    overview:"개요",details:"상세 내용",close:"닫기",projectLink:"프로젝트 보기",githubLink:"GitHub",
    cs:[
      ["이메일","mhien0795work@gmail.com",LINKS.email,0],
      ["LinkedIn","LinkedIn 프로필 보기",LINKS.linkedin,1],
      ["CV","Canva에서 CV 보기",LINKS.cv,1]
    ]
  }
};

const IDS=["home","about","education","activities","projects","blog","contact"];

const Nav=({c,lang,setLang})=>html`
  <nav>
    <b style=${{fontFamily:"'Playfair Display',serif",fontSize:18}}>MTTH</b>
    <div class="links">
      ${IDS.map((id,i)=>html`<a key=${id} href=${"#"+id}>${c.nav[i]}</a>`)}
    </div>
    <div class="lang">
      ${["vi","en","ko"].map(l=>html`
        <button key=${l} class=${lang===l?"on":""} onClick=${()=>setLang(l)}>${l.toUpperCase()}</button>
      `)}
    </div>
  </nav>
`;

const Hero=({c})=>html`
  <section id="home" class="hero">
    <div>
      <div class="eyebrow">${c.hello}</div>
      <h1>${NAME_LINES.map(l=>html`<span key=${l}>${l}</span>`)}</h1>
      <p class="role">${c.role}</p>
      ${c.intro.map((p,i)=>html`<p key=${i} class="intro">${p}</p>`)}
      <div class="btns">
        <a class="btn fill" href="#projects">${c.b1}</a>
        <a class="btn" href="#contact">${c.b2}</a>
      </div>
    </div>
    <div class="photo">HT</div>
  </section>
`;

const About=({c})=>html`
  <section id="about">
    <div class="cols">
      <div><div class="eyebrow">01</div><h2>${c.aboutT}</h2></div>
      <div>${c.about.map((p,i)=>html`<p key=${i}>${p}</p>`)}</div>
    </div>
  </section>
`;

const Education=({c,data,skills,lang})=>{
  const e=data||{};
  const localized=e[lang]||e.vi||{};
  const school=localized.school||c.school;
  const major=localized.major||c.major;
  const language=localized.language?.length?localized.language:c.langs;
  const it=localized.it?.length?localized.it:c.it;
  return html`
    <section id="education">
      <div class="eyebrow">02</div>
      <h2>${c.educationT}</h2>
      <div class="education-school">
        <h3>${school}</h3>
        <p class="education-major">${major}</p>
      </div>
      <div class="education-grid">
        <div class="education-block">
          <h3>${c.languageT}</h3>
          ${language.map((item,i)=>html`<div class="education-item" key=${i}>${item}</div>`)}
          <div class="education-group">
            <h4>${c.itT}</h4>
            <ul>${it.map((item,i)=>html`<li key=${i}>${item}</li>`)}</ul>
          </div>
        </div>
        <div class="education-block">
          <h3>${c.skillsT}</h3>
          ${skills.length>0?skills.map((group,i)=>html`
            <div class="education-group" key=${i}>
              <h4>${group.title}</h4>
              <ul>${group.items.map((item,j)=>html`<li key=${j}>${item}</li>`)}</ul>
            </div>
          `):html`
            <div class="education-group">
              <h4>${c.officeT}</h4>
              <ul>${c.office.map((item,i)=>html`<li key=${i}>${item}</li>`)}</ul>
            </div>
            <div class="education-group">
              <h4>${c.webT}</h4>
              <ul>${c.web.map((item,i)=>html`<li key=${i}>${item}</li>`)}</ul>
            </div>
          `}
        </div>
      </div>
    </section>
  `;
};

const ArticleDetail=({item,close,c})=>{
  if(!item)return null;
  return html`
    <div class="modal" onClick=${close}>
      <article class="sheet" onClick=${e=>e.stopPropagation()}>
        <p class="blog-date">${item.date||""}</p>
        <h3>${item.title||""}</h3>
        ${item.description?html`<p>${item.description}</p>`:null}
        ${item.thumbnail?html`<img src=${item.thumbnail} alt=${item.title||""}/>`:null}
        <div class="blog-content" dangerouslySetInnerHTML=${{__html:item.body||"<p></p>"}}></div>
        <div class="btns"><button class="btn" onClick=${close}>${c.blogBack}</button></div>
      </article>
    </div>
  `;
};

const ArticleSection=({id,number,title,items,loading,empty,open,more})=>html`
  <section id=${id}>
    <div class="eyebrow">${number}</div>
    <h2>${title}</h2>
    ${loading?html`<p class="blog-empty">Loading...</p>`:
      items.length===0?html`<p class="blog-empty">${empty}</p>`:html`
        <div class="grid">
          ${items.map((item,i)=>html`
            <button class="card" key=${item.slug||i} onClick=${()=>open(item)}>
              ${item.thumbnail?html`<img src=${item.thumbnail} alt=${item.title||""} loading="lazy"/>`:html`<div class="ph">${title}</div>`}
              <div class="b">
                <p class="blog-date">${item.date||""}</p>
                <h3>${item.title||"Untitled"}</h3>
                ${item.description?html`<p>${item.description}</p>`:null}
                <p class="article-read">${more} →</p>
              </div>
            </button>
          `)}
        </div>
      `}
  </section>
`;

const Projects=({c,items,loading,open})=>html`
  <section id="projects">
    <div class="eyebrow">04</div>
    <h2>${c.projT}</h2>
    ${loading?html`<p class="blog-empty">Loading...</p>`:
      items.length===0?html`<p class="blog-empty">${c.projectEmpty}</p>`:html`
        <div class="grid">
          ${items.map((project,i)=>{
            const translated=project[window.currentPortfolioLang]||project.vi||{};
            return html`
              <button class="card" key=${project.slug||i} onClick=${()=>open(project)}>
                ${project.thumbnail?html`<img src=${project.thumbnail} alt=${translated.title||""} loading="lazy"/>`:html`<div class="ph">${c.projT}</div>`}
                <div class="b">
                  <h3>${translated.title||"Untitled"}</h3>
                  <p>${translated.subtitle||""}</p>
                  <p class="article-read">${c.more} →</p>
                </div>
              </button>
            `;
          })}
        </div>
      `}
  </section>
`;

const ProjectDetail=({project,close,c,lang})=>{
  if(!project)return null;
  const t=project[lang]||project.vi||{};
  return html`
    <div class="modal" onClick=${close}>
      <article class="sheet" onClick=${e=>e.stopPropagation()}>
        <h3>${t.title||""}</h3>
        ${t.subtitle?html`<p>${t.subtitle}</p>`:null}
        ${project.thumbnail?html`<img src=${project.thumbnail} alt=${t.title||""}/>`:null}
        <h4>${c.details}</h4>
        <ul>${(t.details||[]).map((item,i)=>html`<li key=${i}>${item}</li>`)}</ul>
        <div class="project-links">
          ${project.url?html`<a href=${project.url} target="_blank" rel="noopener noreferrer">${c.projectLink}</a>`:null}
          ${project.github?html`<a href=${project.github} target="_blank" rel="noopener noreferrer">${c.githubLink}</a>`:null}
        </div>
        <div class="btns"><button class="btn" onClick=${close}>${c.blogBack}</button></div>
      </article>
    </div>
  `;
};

const Blog=({c,posts,loading,open})=>html`
  <section id="blog">
    <div class="eyebrow">05</div>
    <h2>${c.blogT}</h2>
    ${loading?html`<p class="blog-empty">Loading...</p>`:
      posts.length===0?html`<p class="blog-empty">${c.blogEmpty}</p>`:html`
        <div class="grid">
          ${posts.map((post,i)=>html`
            <button class="card" key=${post.slug||i} onClick=${()=>open(post)}>
              ${post.thumbnail?html`<img src=${post.thumbnail} alt=${post.title||""} loading="lazy"/>`:html`<div class="ph">Blog</div>`}
              <div class="b">
                <p class="blog-date">${post.date||""}</p>
                <h3>${post.title||""}</h3>
                <p>${post.description||""}</p>
              </div>
            </button>
          `)}
        </div>
      `}
  </section>
`;

const Contact=({c})=>html`
  <section id="contact">
    <div class="cols">
      <div><div class="eyebrow">06</div><h2>${c.contactT}</h2></div>
      <div>
        ${c.cs.map(([a,b,h,nt])=>html`
          <div class="row" key=${a}>
            <span>${a}</span>
            <a class="lnk" href=${h} target=${nt?"_blank":null} rel=${nt?"noopener noreferrer":null}>${b}</a>
          </div>
        `)}
      </div>
    </div>
  </section>
`;

function App(){
  const [lang,setLang]=useState("vi");
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [activities,setActivities]=useState([]);
  const [activitiesLoading,setActivitiesLoading]=useState(true);
  const [projectPosts,setProjectPosts]=useState([]);
  const [projectsLoading,setProjectsLoading]=useState(true);
  const [educationData,setEducationData]=useState(null);
  const [skillData,setSkillData]=useState([]);
  const [selectedArticle,setSelectedArticle]=useState(null);
  const [selectedPost,setSelectedPost]=useState(null);
  const [selectedProject,setSelectedProject]=useState(null);

  const c=CONTENT[lang];
  window.currentPortfolioLang=lang;

  React.useEffect(()=>{
    const load=(url,setter,setLoadingState)=>{
      fetch(url,{cache:"no-store"})
        .then(response=>{if(!response.ok)throw new Error("Cannot load "+url);return response.json();})
        .then(data=>setter(data))
        .catch(error=>{console.error(error);setter(url==="/education-index.json"?{}:[]);})
        .finally(()=>{if(setLoadingState)setLoadingState(false);});
    };
    load("/blog-index.json",data=>setPosts(Array.isArray(data)?data:[]),setLoading);
    load("/activities-index.json",data=>setActivities(Array.isArray(data)?data:[]),setActivitiesLoading);
    load("/project-index.json",data=>setProjectPosts(Array.isArray(data)?data:[]),setProjectsLoading);
    load("/education-index.json",data=>setEducationData(data||{}));
    load("/skill-index.json",data=>setSkillData(Array.isArray(data)?data:[]));
  },[]);

  const localizedSkills=skillData.map(group=>{
    const translated=group[lang]||group.vi||{};
    return {title:translated.title||"",items:translated.items||[]};
  });

  document.documentElement.lang=lang;

  return html`
    <${Nav} c=${c} lang=${lang} setLang=${setLang}/>
    <${Hero} c=${c}/>
    <${About} c=${c}/>
    <${Education} c=${c} data=${educationData} skills=${localizedSkills} lang=${lang}/>
    <${ArticleSection}
      id="activities" number="03" title=${c.expT}
      items=${activities} loading=${activitiesLoading}
      empty=${c.activityEmpty} open=${setSelectedArticle} more=${c.articleMore}
    />
    <${Projects} c=${c} items=${projectPosts} loading=${projectsLoading} open=${setSelectedProject}/>
    <${Blog} c=${c} posts=${posts} loading=${loading} open=${setSelectedPost}/>
    <${Contact} c=${c}/>
    <footer>© 2026 ${NAME}</footer>
    <${ArticleDetail} item=${selectedArticle} close=${()=>setSelectedArticle(null)} c=${c}/>
    <${ArticleDetail} item=${selectedPost} close=${()=>setSelectedPost(null)} c=${c}/>
    <${ProjectDetail} project=${selectedProject} close=${()=>setSelectedProject(null)} c=${c} lang=${lang}/>
  `;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
</script>
</body>
</html>
