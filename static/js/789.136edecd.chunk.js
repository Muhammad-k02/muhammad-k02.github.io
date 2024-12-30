"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[789],{5991:(e,i,r)=>{r.d(i,{A:()=>b});var o=r(3287),t=r(6240),n=r(344),a=r(6446),s=r(7392),l=r(8951),d=r(8988),c=r(5043),p=r(2134),x=r(579);const b=()=>{const[e,i]=(0,c.useState)(null),r=(0,p.Zp)(),b=(0,t.A)(),g=(0,n.A)(b.breakpoints.down("sm")),h=()=>{i(null)};return(0,x.jsxs)(a.A,{sx:{position:"fixed",top:{xs:16,md:20},left:{xs:16,md:20},zIndex:1e3},children:[(0,x.jsx)(s.A,{onClick:e=>{i(e.currentTarget)},sx:{width:{xs:48,md:48},height:{xs:48,md:48},background:"rgba(255, 255, 255, 0.03)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"1px solid rgba(255, 255, 255, 0.1)",boxShadow:"\n            0 4px 30px rgba(0, 0, 0, 0.1),\n            0 0 10px rgba(255, 255, 255, 0.1),\n            0 0 20px rgba(255, 255, 255, 0.05)\n          ",color:"rgba(255, 255, 255, 0.9)",transition:"all 0.3s ease",animation:g?"none":"pulse 2s infinite","@keyframes pulse":{"0%":{boxShadow:"\n                0 4px 30px rgba(0, 0, 0, 0.1),\n                0 0 10px rgba(255, 255, 255, 0.1),\n                0 0 20px rgba(255, 255, 255, 0.05)\n              "},"50%":{boxShadow:"\n                0 4px 30px rgba(0, 0, 0, 0.15),\n                0 0 15px rgba(255, 255, 255, 0.15),\n                0 0 30px rgba(255, 255, 255, 0.1),\n                0 0 40px rgba(255, 255, 255, 0.05)\n              "},"100%":{boxShadow:"\n                0 4px 30px rgba(0, 0, 0, 0.1),\n                0 0 10px rgba(255, 255, 255, 0.1),\n                0 0 20px rgba(255, 255, 255, 0.05)\n              "}},"@media (hover: hover)":{"&:hover":{background:"rgba(255, 255, 255, 0.1)",transform:"scale(1.05)",boxShadow:"\n                0 4px 30px rgba(0, 0, 0, 0.2),\n                0 0 20px rgba(255, 255, 255, 0.2),\n                0 0 40px rgba(255, 255, 255, 0.1),\n                0 0 60px rgba(255, 255, 255, 0.05)\n              "}}},children:(0,x.jsx)(o.A,{sx:{fontSize:{xs:24,md:28}}})}),(0,x.jsx)(l.A,{anchorEl:e,open:Boolean(e),onClose:h,PaperProps:{sx:{background:"rgba(0, 0, 0, 0.8)",backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"12px",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.3)",minWidth:{xs:200,sm:220},"& .MuiList-root":{padding:"8px 0"}}},transformOrigin:{horizontal:"left",vertical:"top"},anchorOrigin:{horizontal:"left",vertical:"bottom"},children:[{label:"Home",link:"/"},{label:"Publications",link:"/publications"},{label:"Projects",link:"/projects"},{label:"Education",link:"/education"},{label:"Resume",link:"/resume"}].map((e=>(0,x.jsx)(d.A,{onClick:()=>{return i=e.link,r(i),void h();var i},sx:{fontFamily:"Montserrat",fontSize:{xs:"1rem",sm:"1.1rem"},color:"white",padding:{xs:"12px 24px",sm:"14px 28px"},minHeight:{xs:48,sm:56},transition:"background-color 0.3s","&:hover":{background:"rgba(255, 255, 255, 0.1)"}},children:e.label},e.link)))})]})}},3218:(e,i,r)=>{r.d(i,{A:()=>n});r(5043);var o=r(579);const t=(e,i)=>Math.floor(Math.random()*(e-i+1))+i,n=()=>{const e=Array.from({length:15},((e,i)=>({id:i,angle:t(45,95),speed:t(8,20),delay:t(1,25),x:t(0,80),y:t(0,25),travel:t(10,50),trail:t(1,5)}))),i=Array.from({length:35},((e,i)=>({id:i,x:t(0,100),y:t(0,100),opacity:t(0,100)/100,scale:t(0,3)})));return(0,o.jsxs)("div",{className:"star-background",children:[e.map((e=>(0,o.jsx)("div",{className:"geminid",style:{"--angle":e.angle,"--speed":e.speed,"--delay":e.delay,"--x":e.x,"--y":e.y,"--travel":e.travel,"--trail":e.trail},children:(0,o.jsx)("div",{className:"geminid__trail"})},e.id))),i.map((e=>(0,o.jsx)("div",{className:"star",style:{"--x":e.x,"--y":e.y,"--opacity":e.opacity,"--scale":e.scale}},e.id)))]})}},4789:(e,i,r)=>{r.r(i),r.d(i,{default:()=>F});var o=r(3438),t=r(4137),n=r(2110),a=r(6446),s=r(8757),l=r(5865),d=r(6494),c=r(1906),p=r(6600),x=r(7392),b=r(5316),g=r(1946),h=r(3546),u=r(5043),m=r(604),f=r(5991),k=r(3218);const y=[{id:"sensitive-media-analysis",title:"Sensitive Media Analysis",shortDescription:"Creating a Machine Learning Model for Media Violence Detection",fullDescription:"This study develops AI models to detect violence in digital media, addressing the lack of effective automated tools for identifying sensitive content online.",github:"https://github.com/Muhammad-k02/Sensitive-Media-Analysis",technologies:["Python","TensorFlow","OpenCV","MMLabs"]},{id:"minijs-parser",title:"Minijs Parser and Interpreter",shortDescription:"Natural Language Parsing Calculator",fullDescription:"Developed a front-end for a Scala-based interpreter/REPL for MiniJS, focusing on compilation toolchain and parsing techniques.",github:"https://github.com/Muhammad-k02/minijs-parser-and-interpreter",technologies:["Scala","Parser Combinators","EBNF"]},{id:"health-club-system",title:"Health Club Management System",shortDescription:"Comprehensive Membership Management Solution",fullDescription:"A software engineering project creating a robust system for health club membership registration, class management, and member tracking.",github:"https://github.com/Muhammad-k02/health-club-system",technologies:["Java","JavaFX","MySQL"]}],v=0,j=1,A=2,C=3,w=j,S={error:e=>{w>=v&&console.error("\ud83d\udd34 [ERROR]",e)},warn:e=>{w>=j&&console.warn("\ud83d\udfe0 [WARN]",e)},info:e=>{w>=A&&console.log("\ud83d\udd35 [INFO]",e)},debug:e=>{w>=C&&console.debug("\ud83d\udfe2 [DEBUG]",e)}};var E=r(579);const M=(0,g.P)(t.A),P=(0,g.P)(n.A),F=()=>{const[e,i]=(0,u.useState)(!1),[r,t]=(0,u.useState)(null);(0,u.useEffect)((()=>{console.log("Background Image:",m)}),[]);const n={backgroundImage:"url(".concat(m,")"),backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",minHeight:"100vh",width:"100%",position:"fixed",top:0,left:0,zIndex:-1},v=(0,u.useCallback)((e=>{S.info("Opening project dialog:",e.title),t(e),i(!0)}),[]),j=(0,u.useCallback)((()=>{S.info("Closing project dialog"),i(!1),t(null)}),[]);return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(k.A,{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-2,pointerEvents:"none"}}),(0,E.jsx)(a.A,{sx:n,style:{backgroundImage:"url(".concat(m,")"),backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}),(0,E.jsx)(a.A,{sx:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.6)",zIndex:-1}}),(0,E.jsxs)(s.A,{maxWidth:"lg",sx:{position:"relative",zIndex:3,backgroundColor:"transparent",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"50vh",padding:{xs:"20px",md:"40px"}},children:[(0,E.jsx)(f.A,{sx:{position:"fixed",top:0,left:0,width:"100%",zIndex:10}}),(0,E.jsx)(g.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},style:{width:"100%"},children:(0,E.jsx)(l.A,{variant:"h2",component:"h1",gutterBottom:!0,sx:{fontWeight:"normal",textAlign:"center",mb:6,fontSize:{xs:"2.5rem",md:"3.5rem"},color:"transparent",backgroundImage:"linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(230, 230, 225, 0.5) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",textShadow:"0 2px 4px rgba(0, 0, 0, 0.2)"},children:"Projects"})}),y.map(((e,i)=>(0,E.jsx)(P,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2*i},sx:{mb:4,background:"rgba(255, 255, 255, 0.08)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.15)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.15)",borderRadius:"16px",overflow:"hidden",transition:"all 0.3s ease","&:hover":{transform:"translateY(-4px)",boxShadow:"\n                  0 4px 30px rgba(0, 0, 0, 0.4),\n                  0 0 30px rgba(255, 255, 255, 0.3)\n                ",background:"rgba(255, 255, 255, 0.35)",backdropFilter:"blur(25px)",WebkitBackdropFilter:"blur(25px)",border:"1px solid rgba(255, 255, 255, 0.3)"}},children:(0,E.jsxs)(d.A,{sx:{textAlign:"center"},children:[(0,E.jsx)(l.A,{variant:"h5",component:"a",onClick:i=>{i.preventDefault(),v(e)},sx:{color:"#E6E6E1",textDecoration:"none",display:"block",mb:2,cursor:"pointer","&:hover":{color:"#90caf9"}},children:e.title}),(0,E.jsx)(l.A,{variant:"subtitle1",color:"textSecondary",gutterBottom:!0,children:e.technologies?e.technologies.join(" | "):"No technologies specified"}),(0,E.jsxs)(a.A,{sx:{position:"relative",mt:2},children:[(0,E.jsxs)(l.A,{variant:"body1",sx:{display:"inline",mr:1,color:"#E6E6E1"},children:[e.shortDescription?e.shortDescription.substring(0,150):"No description available","..."]}),(0,E.jsx)(c.A,{onClick:()=>v(e),sx:{color:"#90caf9",textTransform:"none",fontWeight:600,display:"inline",padding:"0 4px",minWidth:"auto",verticalAlign:"baseline","&:hover":{background:"rgba(144, 202, 249, 0.08)",textDecoration:"underline"}},children:"Read More \u2192"})]})]})},i)))]}),(0,E.jsx)(h.N,{children:e&&r&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(g.P.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:(0,E.jsx)(a.A,{sx:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)",zIndex:1299}})}),(0,E.jsx)(M,{open:e,onClose:j,maxWidth:"md",fullWidth:!0,sx:{zIndex:1300},PaperProps:{sx:{background:"rgba(255, 255, 255, 0.1)",backdropFilter:"blur(15px)",WebkitBackdropFilter:"blur(15px)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"16px"}},children:r&&(0,E.jsxs)(g.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.3},children:[(0,E.jsxs)(p.A,{sx:{textAlign:"center",color:"#E6E6E1",borderBottom:"1px solid rgba(255, 255, 255, 0.2)"},children:[r.title,(0,E.jsx)(x.A,{"aria-label":"close",onClick:j,sx:{position:"absolute",right:8,top:8,color:"#E6E6E1"},children:(0,E.jsx)(o.A,{})})]}),(0,E.jsxs)(b.A,{sx:{color:"#E6E6E1",textAlign:"center",py:3},children:[(0,E.jsx)(l.A,{variant:"body1",paragraph:!0,children:r.fullDescription||"No description available"}),(0,E.jsxs)(l.A,{variant:"subtitle1",sx:{mb:2},children:["Technologies: ",r.technologies?r.technologies.join(" | "):"No technologies specified"]}),r.github&&(0,E.jsx)(c.A,{variant:"outlined",href:r.github,target:"_blank",rel:"noopener noreferrer",sx:{color:"#90caf9",borderColor:"#90caf9","&:hover":{backgroundColor:"rgba(144, 202, 249, 0.1)",borderColor:"#90caf9"}},children:"View on GitHub"})]})]})})]})})]})}},604:(e,i,r)=>{e.exports=r.p+"static/media/file.4a1bee68d1716181a09c.png"}}]);
//# sourceMappingURL=789.136edecd.chunk.js.map