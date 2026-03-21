let z=1;

function openWindow(type){

let win=document.createElement("div");
win.className="window";
win.style.top="100px";
win.style.left="200px";
win.style.zIndex=z++;

let title=document.createElement("div");
title.className="titlebar";
title.innerHTML = type.toUpperCase() + "<span class='close'>X</span>";

let content=document.createElement("div");
content.className="content";

// ===== CONSOLE =====
if(type==="console"){
content.innerHTML = `
<div id="output">> system ready<br></div>
<div>
<span>> </span>
<input id="cmd" autocomplete="off" autofocus style="background:black;color:#0f0;border:none;outline:none;">
</div>
`;

setTimeout(()=>{
let input = content.querySelector("#cmd");
let output = content.querySelector("#output");

input.focus();

input.addEventListener("keydown",(e)=>{
if(e.key==="Enter"){
let val=input.value;
output.innerHTML += "> " + val + "<br>";
handleCommand(val, output);
input.value="";
content.scrollTop=content.scrollHeight;
}
});
},50);
}

// ===== PASSWORD CRACKER =====
if(type==="cracker"){
content.innerHTML = `
<div>Target IP:</div>
<input id="ip" value="192.168.0.1" style="width:100%;background:black;color:#0f0;border:1px solid #0f0;"><br><br>

<button id="start">START HACK</button>

<div id="log" style="margin-top:10px;"></div>
`;

setTimeout(()=>{
let btn=content.querySelector("#start");
let log=content.querySelector("#log");

btn.onclick=()=>{
log.innerHTML="";

let steps=[
"connecting...",
"bypassing firewall...",
"injecting payload...",
"decrypting passwords...",
"access granted"
];

steps.forEach((s,i)=>{
setTimeout(()=>{
log.innerHTML += s + "<br>";
content.scrollTop=content.scrollHeight;
}, i*800);
});
};
},50);
}

win.appendChild(title);
win.appendChild(content);
document.body.appendChild(win);

// CLOSE
title.querySelector(".close").onclick=()=>{
win.remove();
};

// DRAG
let offsetX,offsetY,drag=false;

title.onmousedown=(e)=>{
drag=true;
offsetX=e.clientX - win.offsetLeft;
offsetY=e.clientY - win.offsetTop;
};

document.onmouseup=()=>drag=false;

document.onmousemove=(e)=>{
if(drag){
win.style.left=(e.clientX-offsetX)+"px";
win.style.top=(e.clientY-offsetY)+"px";
}
};

}

// ===== COMMAND SYSTEM =====
function handleCommand(cmd, output){

cmd=cmd.toLowerCase();

if(cmd==="help"){
output.innerHTML += "commands: help, hack, scan, clear<br>";
}
else if(cmd==="hack"){
output.innerHTML += "access granted<br>";
}
else if(cmd==="scan"){
output.innerHTML += "scanning network...<br>";
}
else if(cmd==="clear"){
output.innerHTML="";
}
else{
output.innerHTML += "unknown command<br>";
}

}
