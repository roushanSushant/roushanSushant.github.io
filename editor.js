(() => {
 const $ = s => document.querySelector(s);
 const initial = JSON.parse(JSON.stringify(window.PORTFOLIO_DATA || {}));
 let state = JSON.parse(JSON.stringify(initial));
 const storageKey = "sushant-portfolio-editor-v1";
 try { const saved=localStorage.getItem(storageKey); if(saved) state=JSON.parse(saved); } catch(e){}
 const labels = {
  name:"Full name",shortName:"Short display name",headline:"Homepage headline",intro:"Homepage introduction",location:"Location",degree:"Current degree",undergraduate:"Undergraduate degree",about:"About paragraph",interests:"Research interests",email:"Email address",linkedin:"LinkedIn URL",github:"GitHub URL",cv:"CV file path",notice:"Contact / verification note",
  title:"Title",organization:"Organisation / institution",date:"Date or period",category:"Category / tag",summary:"Short summary",role:"Your role / contribution",details:"Details, methods and learning",evidence:"Source documents / evidence",image:"Image path (optional)",link:"Related link (optional)",status:"Publication status",quote:"Testimonial quote",person:"Person's name",permission:"Permission to publish",author:"Author / supervisor",position:"Role / designation"
 };
 const multiline = new Set(["intro","about","interests","summary","role","details","evidence","quote","notice"]);
 const arrays = new Set(["projects","experience","fieldwork","internships","testimonials","research"]);
 const blank = {title:"New entry",organization:"",date:"",category:"",summary:"",role:"",details:"",evidence:"",image:"",link:"",status:"draft"};
 function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));$("#status").textContent="Draft saved in this browser. Download the data file to publish it."; }catch(e){$("#status").textContent="Could not save a browser draft; use Download updated portfolio-data.js.";}}
 function field(name,value,wide=false){
  const wrap=document.createElement("div");wrap.className="field"+(wide?" wide":"");
  const lab=document.createElement("label");lab.textContent=labels[name]||name;wrap.append(lab);
  let input;
  if(name==="status"){input=document.createElement("select");["draft","published","idea","planned","completed"].forEach(v=>{let o=document.createElement("option");o.value=v;o.textContent=v[0].toUpperCase()+v.slice(1);input.append(o)});input.value=value||"draft";}
  else if(multiline.has(name)){input=document.createElement("textarea");input.value=value??"";}
  else {input=document.createElement("input");input.type=name==="email"?"email":"text";input.value=value??"";}
  input.addEventListener("input",()=>{wrap.dispatchEvent(new CustomEvent("valuechange",{bubbles:true,detail:{name,value:input.value}}))});
  input.addEventListener("change",()=>{wrap.dispatchEvent(new CustomEvent("valuechange",{bubbles:true,detail:{name,value:input.value}}))});
  wrap.append(input);
  if(name==="image") {const small=document.createElement("small");small.textContent="Upload the image to assets/photos/ on GitHub, then enter the relative path.";wrap.append(small);}
  if(name==="status") {const small=document.createElement("small");small.textContent="Use Draft while role, dates or claims still need verification.";wrap.append(small);}
  return wrap;
 }
 function renderProfile(root){
  const card=document.createElement("div");card.className="item-card";const head=document.createElement("div");head.className="item-head";head.innerHTML="<h2>Profile, introduction and contact links</h2><span>Changes affect the homepage</span>";card.append(head);
  const grid=document.createElement("div");grid.className="fields";
  Object.entries(state.profile||{}).forEach(([key,value])=>{const f=field(key,value,["intro","about","interests","notice"].includes(key));f.addEventListener("valuechange",e=>{state.profile[key]=e.detail.value;persist()});grid.append(f)});
  card.append(grid);root.append(card);
 }
 function renderSkills(root){
  const card=document.createElement("div");card.className="item-card";card.innerHTML="<div class='item-head'><h2>Skills list</h2><button type='button' id='addSkill'>+ Add skill</button></div><div id='skillFields' class='fields'></div>";root.append(card);
  const target=card.querySelector("#skillFields");
  (state.skills||[]).forEach((skill,i)=>{const f=field("skill",typeof skill==="string"?skill:skill.title,true);const input=f.querySelector("input,textarea");input.addEventListener("input",()=>{state.skills[i]=input.value;persist()});const del=document.createElement("button");del.type="button";del.textContent="Remove";del.className="secondary";del.onclick=()=>{state.skills.splice(i,1);persist();render()};f.append(del);target.append(f)});
  card.querySelector("#addSkill").onclick=()=>{state.skills.push("New skill");persist();render()};
 }
 function renderArray(root,key){
  const items=state[key]||[];
  if(!items.length){const msg=document.createElement("p");msg.className="notice";msg.textContent="No entries yet. Select “+ Add item” to create the first one.";root.append(msg);}
  items.forEach((item,i)=>{
   const card=document.createElement("div");card.className="item-card";
   const head=document.createElement("div");head.className="item-head";const title=document.createElement("h2");title.textContent=item.title||item.person||`Entry ${i+1}`;const del=document.createElement("button");del.type="button";del.textContent="Delete entry";del.onclick=()=>{if(confirm("Delete this entry?")){state[key].splice(i,1);persist();render()}};head.append(title,del);card.append(head);
   const grid=document.createElement("div");grid.className="fields";
   const common=["title","organization","date","category","summary","role","details","evidence","image","link","status"];
   const special=key==="testimonials"?["person","position","quote","permission"]: [];
   const keys=[...new Set([...common,...special,...Object.keys(item)])].filter(k=>k!=="undefined");
   keys.forEach(k=>{const val=item[k]??"";const wide=["summary","role","details","evidence","quote","permission"].includes(k);const f=field(k,val,wide);f.addEventListener("valuechange",e=>{item[k]=e.detail.value;title.textContent=item.title||item.person||`Entry ${i+1}`;persist()});grid.append(f)});
   card.append(grid);root.append(card);
  });
 }
 function render(){
  const key=$("#collection").value;const root=$("#editor");root.innerHTML="";
  $("#addItem").style.display=key==="profile"?"none":"inline-block";
  if(key==="profile")renderProfile(root);
  else if(key==="skills")renderSkills(root);
  else if(arrays.has(key))renderArray(root,key);
  else root.innerHTML="<p>Choose a section to edit.</p>";
 }
 $("#collection").addEventListener("change",render);
 $("#addItem").addEventListener("click",()=>{const key=$("#collection").value;if(!arrays.has(key))return;state[key]=state[key]||[];state[key].push({...blank,...(key==="testimonials"?{quote:"",person:"",position:"",permission:"Confirm permission before publishing"}:{})});persist();render()});
 $("#exportData").addEventListener("click",()=>{const content="window.PORTFOLIO_DATA = "+JSON.stringify(state,null,2)+";\n";download("portfolio-data.js",content,"text/javascript");$("#status").textContent="Downloaded portfolio-data.js. Upload it to your GitHub repository, replacing the existing file."});
 $("#resetData").addEventListener("click",()=>{if(confirm("Discard this browser's saved draft and reload the original data from the currently deployed file?")){localStorage.removeItem(storageKey);state=JSON.parse(JSON.stringify(initial));render();$("#status").textContent="Unsaved browser edits were reset."}});
 $("#importFile").addEventListener("change",async e=>{const file=e.target.files[0];if(!file)return;try{let t=await file.text();if(file.name.endsWith(".js"))t=t.replace(/^\s*window\.PORTFOLIO_DATA\s*=\s*/,"").replace(/;\s*$/,"");const parsed=JSON.parse(t);if(!parsed.profile||!Array.isArray(parsed.projects))throw new Error("This does not look like a portfolio data file.");state=parsed;persist();render();$("#status").textContent="Imported backup successfully."}catch(err){$("#status").textContent="Could not import file: "+err.message}e.target.value=""});
 function download(name,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url)}
 render();
})();