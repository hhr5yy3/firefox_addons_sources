var kahootgpt=()=>{var e=!1,l=!1,d=!1,B=!1;let p="",u="",h="",m="",g="",f=!1;function x(e,t){k("<strong>"+t.toString()+" Error!</strong> "+e.toString(),"#f66358")}function b(e){H=e.toString(),k("<strong>KahootGPT Settings!</strong> Your OpenAI key has been updated.","#46a8f5")}function y(e){U="true"===e.toString(),k("<strong>KahootGPT Settings!</strong> Highlight answer set to <u><i>"+e.toString()+"</i></u>.","#46a8f5")}function w(e){W="true"===e.toString(),k("<strong>KahootGPT Settings!</strong> Import answer set to <u><i>"+e.toString()+"</i></u>.","#46a8f5")}function v(e){$=e.toString(),_.innerHTML=`Edit settings in PopUp - Model:&nbsp;<b>${$}</b>`,k("<strong>KahootGPT Settings!</strong> Model set to <u><i>"+e.toString()+"</i></u>.","#46a8f5")}async function k(e,t,o,n,i,r,a,s){e=e.replace(/(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi,()=>`<a href="${o}">${s||o}</a>`);var c=Date.now().toString(),l=document.createElement("kgpt-alert-"+c);l.innerHTML=`
<div id="alert-${c}">
    ${e}
</div>
<style>
kgpt-alert-${c} {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 100;
  animation: fadeinout 3s;
  opacity: 0;
}

#alert-${c} {
  border-radius: 15px;
  padding: 10px 20px;
  background-color: ${t};
  color: white;
  transition: 300ms;
  border: solid 1px #fff;
  box-shadow: #959da52e 0px 8px 24px;
}

@keyframes fadeinout {
    0% {
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
`,document.body.appendChild(l),await O(5e3),document.body.removeChild(l)}chrome.runtime.onMessage.addListener((e,t,o)=>{var n=e.type||{},i=e.value||{};switch(n){case"initialize":l="true"===i.toString(),S.style.display="flex",T.addEventListener("click",async()=>{(l=await chrome.runtime.sendMessage("is_paid"))?N():(T.style.boxShadow="none",q.style.background="#ff9494",I.style.fill="#ff9494",E.innerHTML="Get PRO in popup",E.style.color="#ff9494")}),k("<strong>KahootGPT Initialized!</strong> ContentScript initialized connection to PopupScript.","#2eb886");var r=e.key||{},a=e.hl||{},s=e.im||{},c=e.md||{};b(r),y(a),w(s),v(c),o({value:"initialized",success:!0});break;case"autotap":k("<strong>KahootGPT Info!</strong> Auto-hoist set to <u><i>"+(d="true"===i.toString()).toString()+"</i></u>","#46a8f5"),o({value:"autotap-"+i.toString(),success:!0});break;case"ping":k("<strong>KahootGPT Connected!</strong> ContentScript connected to PopupScript.","#2eb886");r=e.key||{},a=e.hl||{},s=e.im||{},c=e.md||{};b(r),y(a),w(s),v(c),k("<strong>KahootGPT Settings!</strong> All settings updated <u><i>.","#46a8f5"),o({value:d.toString(),success:!0});break;case"query":""===p||f?o({success:!1}):(f=!0,o({q:p,r:u,b:h,y:m,g:g,success:!0}));break;case"error":x(i.toString(),"KahootGPT");break;case"setapikey":b(i);break;case"sethighlight":y(i);break;case"setimport":w(i);break;case"setModel":v(i)}o({value:d.toString(),success:!0})});setInterval(()=>{d!=o&&N();var t="";try{t=document.querySelector('[data-functional-selector="block-title"]').textContent}catch(e){t=""}if(t!==p){var e=document.querySelectorAll('[data-functional-selector^="question-choice-text-"]');p=t;try{u=e[0].textContent}catch(e){u=""}try{h=e[1].textContent}catch(e){h=""}try{m=e[2].textContent}catch(e){m=""}try{g=e[3].textContent}catch(e){g=""}f=!1,X()}},25);let O=t=>new Promise(e=>setTimeout(e,t)),K=((e=document.createElement("kahoot-gpt")).innerHTML=`
<kahoot-gpt-in-site>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <style id="insitecss">
        html {
            background: #1e1e1e;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            color: #b7b7b7;
            text-align: center;
        }

        body {
            font-family: "Segoe UI", Tahoma, sans-serif;
            font-size: 75%;
        }

        h1 {
            font-size: 2em;
            margin-block-start: 0.67em;
            margin-block-end: 0.67em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
        }

        h3 {
            margin-top: 5px;
            margin-bottom: 15px;
            text-align: center;
        }

        h4 {
            font-size: 12px;
        }

        .chkbox {
            margin-top: 5px;
            display: block;
            cursor: pointer;
            width: 25px;
            height: 25px;
            border: 3px solid #ffffff00;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 0px 0px 2px #fff;
        }

        .chkbox div {
            width: 60px;
            height: 60px;
            background-color: #fff;
            top: -52px;
            left: -52px;
            position: relative;
            transform: rotateZ(45deg);
            z-index: 100;
        }

        .chkbox input[type=checkbox]:checked+div {
            left: -10px;
            top: -10px;
        }

        .chkbox input[type=checkbox] {
            position: absolute;
            left: 50px;
            visibility: hidden;
        }

        .transition {
            transition: 300ms ease;
        }

        .text>* {
            margin: 0;
        }

        #KahootGPT {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            position: relative;
            color: #b7b7b7;
            text-decoration: none;
            z-index: 2;
            font-size: 15px;
        }

        .container {
            position: fixed;
            border: solid 2px white;
            border-radius: 20px;
            padding: 5px;
            background: #1e1e1e;
            width: 300px;
            height: 215px;
            display: none;
            justify-content: center;
            animation: fadein 500ms;
            left: 10px;
            top: 10px;
            overflow: hidden;
            transition: height 200ms;
        }

        .container.active {
            height: 25px;
        }

        @keyframes fadein {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .title {
            cursor: move;
            font-weight: bold;
            font-size: large;
            margin-bottom: 10px;
        }

        .hide {
            position: absolute;
            right: 5px;
            top: 5px;
            width: fit-content;
            height: fit-content;
            background: transparent;
            color: #fff;
            border: none;
            border-radius: 20px;
            display: flex;
            transition: 200ms;
        }

        .hide.active {
            transform: rotate(180deg);
        }

        .main {
            display: block;
        }

        .autoclick {
            float: left;
            margin-top: 8px;
        }

        .toggle {
            display: grid;
            align-items: center;
            background-color: #525252;
            width: 75px;
            height: 75px;
            border-radius: 50%;
            margin-left: 6px;
            transition: 300ms;
        }

        .checkbox {
            display: grid;
            align-items: center;
            border: none;
            margin: auto;
            background-color: #525252;
            box-shadow: 0 4px 4px -2px #000;
            width: 90%;
            height: 90%;
            border-radius: 50%;
            cursor: pointer;
        }

        .checkbox:hover .power-icon {
            fill: #8871ad !important;
            filter: drop-shadow(0px 0px 3px #8871ade7);
        }

        .power-icon {
            width: 19px;
            height: 19px;
            align-items: center;
            margin: auto;
            fill: #b7b7b7;
            transition: 200ms;
        }

        #autoclick-status {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: x-small;
            font-weight: bold;
            width: 95px;
            transform: translateX(-4px);
        }

        .question-cont {
            float: left;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            width: 200px;
            height: 35px;
            background-color: white;
            margin: 0;
            box-shadow: 0 2px 10px -2px #fff;
            transition: 500ms;
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
        }

        .question-cont:hover {
            box-shadow: none;
        }

        .question-kgpt {
            margin: 0 !important;
            outline: none !important;
            border: none !important;
            padding: 10px !important;
            width: 130px !important;
            height: 15px !important;
            background: transparent !important;
            font-size: 12px !important;
            color: #000 !important;
        }

        .question-kgpt::-webkit-scrollbar {
            width: 0px;
        }

        .search-icon {
            fill: #9d86c3;
            padding-top: 2px;
            cursor: pointer;
            transition: 200ms;
        }

        .search-icon:hover {
            scale: 1.15;
        }

        .options {
            margin-top: 10px;
            width: 102px;
            display: grid;
            grid-template-columns: 100px 100px;
            grid-template-rows: 50px 50;
        }

        .option {
            transition: 450ms;
        }

        .option:hover {
            box-shadow: none;
        }

        .triangle {
            border-top-left-radius: 10px;
            background-color: #ff3355;
            box-shadow: 0 -3px 10px 0px #ff3355;
        }

        .rhombus {
            border-top-right-radius: 10px;
            background-color: #45a3e5;
            box-shadow: 0 -3px 10px 0px #45a3e5;
        }

        .circle {
            border-bottom-left-radius: 10px;
            background-color: #eb670f;
            box-shadow: 0 3px 10px 0px #eb670f;
        }

        .square {
            border-bottom-right-radius: 10px;
            background-color: #66bf39;
            box-shadow: 0 3px 10px 0px #66bf39;
        }

        .answer {
            width: 80px !important;
            height: 31px !important;
            background-color: transparent !important;
            outline: none !important;
            border: none !important;
            resize: none !important;
            color: white !important;
            font-weight: bold !important;
            padding: 10px !important;
            transition: 200ms !important;
            scrollbar-width: 0 !important;
            font-size: 9px !important;
        }

        .answer::-webkit-scrollbar {
            width: 0px;
        }

        .answer::placeholder {
            color: #dbdbdb;
        }

        .answer:active {
            border: 5px white;
        }

        .clear {
            float: right;
            font-family: monospace, Geneva, Tahoma, sans-serif;
            cursor: pointer;
            font-size: medium;
            background: #381272;
            color: white;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            border: none;
            outline: none;
            height: 35px;
            width: 94px;
            box-shadow: 0 2px 10px -2px #5b29a7;
            transition: 150ms;
            font-size: 12px;
        }

        .clear:hover {
            box-shadow: none;
        }

        .clear:active {
            background: #321066;
        }

        .feeter {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 11px;
            width: 100%;
            left: 0px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        kahoot-gpt-in-site {
            z-index: 100;
            top: 0px;
            left: 0px;
            position: fixed;
            user-select: none;
        }
    </style>

    <meta charset="UTF-8">
    <div class="container" id="container">
        <div>
            <div class="title" id="containerheader"><span id="KahootGPT" title="KahootGPT">There is an error</span>
            <button class="hide">
                <span class="material-symbols-outlined">
                    expand_more
                </span>
            </button>
            </div>

            <div class="kahootinfo">
                <div class="question-cont">
                    <input class="question-kgpt" id="question-kgpt" type="text" placeholder="Type question here..."
                        title="Question">
                    <search title="Search">
                        <svg class="search-icon" id="search-icon" width="30" height="30" viewBox="0 0 30 30">
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23
                        17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031
                        25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971
                        18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C
                        8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                            </path>
                        </svg>
                    </search>
                </div>
                <button class="clear" id="clear" title="Clear">CLEAR ALL</button>
                <div class="main">
                    <div class="autoclick">
                        <div class="toggle" id="toggle">
                            <button class="checkbox" id="checkbox" title="Toggle Auto-hoist">
                                <svg class="power-icon" id="power-icon">
                                    <path d="M 16.8886 5.1769 c -0.7324 -1.1361 -1.7323 -2.1051 -2.8909 -2.8023 c -0.2167 -0.1304
                                            -0.4868 -0.1341 -0.7071 -0.0096 c -0.2201 0.1245 -0.3564 0.3579 -0.3564 0.6108 v 1.4516 c 0
                                            0.2189 0.1023 0.4254 0.2765 0.5581 c 1.5547 1.1843 2.4827 3.051 2.4827 4.9933 c 0 3.4558
                                            -2.8115 6.2673 -6.2673 6.2673 c -3.4558 0 -6.2673 -2.8115 -6.2673 -6.2673 c 0 -1.9424 0.9281
                                            -3.8091 2.4827 -4.9933 c 0.1742 -0.1327 0.2765 -0.3392 0.2765 -0.5581 V 2.9759 c 0 -0.253
                                            -0.1362 -0.4863 -0.3563 -0.6108 c -0.2203 -0.1245 -0.4904 -0.1208 -0.7071 0.0096 c -1.1588
                                            0.6972 -2.1584 1.6662 -2.891 2.8023 c -0.923 1.4315 -1.4109 3.0919 -1.4109 4.8019 c 0 2.3701
                                            0.923 4.5984 2.599 6.2744 c 1.6761 1.676 3.9043 2.599 6.2744 2.599 c 2.3701 0 4.5984 -0.923
                                            6.2744 -2.599 c 1.6759 -1.676 2.599 -3.9043 2.599 -6.2744 C 18.2995 8.2688 17.8116 6.6084
                                            16.8886 5.1769 z M 8.6065 10.7767 h 1.6395 c 0.3629 0 0.658 -0.2953 0.658 -0.6581 V 0.6581 c
                                            0 -0.3629 -0.2951 -0.6581 -0.658 -0.6581 h -1.6395 c -0.3629 0 -0.6581 0.2952 -0.6581 0.6581
                                            v 9.4606 C 7.9484 10.4815 8.2437 10.7767 8.6065 10.7767 z">
                                    </path>
                                </svg>
                            </button>
                        </div>

                        <h3 id="autoclick-status">Auto-hoist is OFF</h3>
                    </div>
                    <div class="options">
                        <div class="option triangle">
                            <textarea class="answer" id="answer-triangle" type="text" placeholder="Type answer here..."
                                title="Answer"></textarea>
                        </div>
                        <div class="option rhombus">
                            <textarea class="answer" id="answer-rhombus" type="text" placeholder="Type answer here..."
                                title="Answer"></textarea>
                        </div>
                        <div class="option circle">
                            <textarea put class="answer" id="answer-circle" type="text"
                                placeholder="Type answer here..." title="Answer"></textarea>
                        </div>
                        <div class="option square">
                            <textarea class="answer" id="answer-square" type="text" placeholder="Type answer here..."
                                title="Answer"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="feeter" id="feeter">Edit settings in PopUp
            </div>
        </div>
    </div>
</kahoot-gpt-in-site>
`,document.documentElement.appendChild(e),document.querySelector(".hide")),S=document.getElementById("container"),T=document.getElementById("checkbox"),q=document.getElementById("toggle"),I=document.getElementById("power-icon"),E=document.getElementById("autoclick-status"),r=document.getElementById("question-kgpt");var e=document.getElementById("search-icon"),j=document.getElementById("clear");let s=document.getElementById("answer-triangle"),c=document.getElementById("answer-rhombus"),P=document.getElementById("answer-circle"),z=document.getElementById("answer-square"),a=document.querySelector(".triangle"),A=document.querySelector(".rhombus"),C=document.querySelector(".circle"),G=document.querySelector(".square"),_=document.getElementById("feeter");var H,o=!1,U=!1,W=!1,$="gpt-3.5-turbo-0125";let F=["text-davinci-003","text-davinci-002","text-davinci-001"],J=["o1-mini","o1-preview","gpt-4o-mini","gpt-4o","gpt-4-turbo","gpt-4","gpt-3.5-turbo-0125","gpt-3.5-turbo-1106"];function N(){B||(alert("MUST READ:\nKahootGPT will move the correct answer to the top half of the screen. Just spam click the top half of your screen."),B=!0),o?(T.style.boxShadow="0 4px 4px -2px #000",q.style.background="#525252",I.style.fill="#b7b7b7",E.innerHTML="Auto-hoist OFF",E.style.color="#b7b7b7"):(T.style.boxShadow="none",q.style.background="#9d86c3",I.style.fill="#9d86c3",E.innerHTML="Auto-hoist ON",E.style.color="#864cbf"),k("<strong>KahootGPT Info!</strong> Auto-hoist set to <u><i>"+(d=o=!o).toString()+"</i></u>","#46a8f5")}function M(){""!==r.value&&(a.style.border="none",A.style.border="none",C.style.border="none",G.style.border="none",""===s.value&&""===c.value&&""===P.value&&""===z.value?async function(o){await chrome.storage.local.get(["max"],async function(e){var t=()=>{F.includes($)?L(!1,{max_tokens:256,prompt:'Only respond with 4 concise answers (if there is a definite answer, only reply with one) in json format with "one", "two", "three", "four" or "one" as the key if only one answer (make sure the answers are in quotes) to the following question: '+o+"\n"}).then(e=>{V(e.choices[0].text,e)}):J.includes($)?L(!0,{max_tokens:$.startsWith("o1")?void 0:256,messages:[{role:$.startsWith("o1")?"user":"system",content:'Only respond with 4 concise answers (if there is a definite answer, only reply with one) in json format with "one", "two", "three", "four" or "one" as the key if only one answer to the following question, be concise:'},{role:"user",content:o}]}).then(e=>{V(e.choices[0].message.content,e)}):x("Selected model does not exist.","Model")};!0===e.max&&!1!==(e=await R({queryType:"answerOnly",question:o}))?V(e.completion,e):t()})}(r.value):async function(o,n,i,r,a){await chrome.storage.local.get(["max"],async function(e){var t=()=>{var e=`
Question:
"${o}"

Options:
${n?'a. "':""}${n}${n?'"':""}
${i?'b. "':""}${i}${i?'"':""}
${r?'c. "':""}${r}${r?'"':""}
${a?'d. "':""}${a}${a?'"':""}

Reply in JSON format:
{
    "answer": "${n?"a/":""}${i?"b/":""}${r?"c/":""}${a?"d":""}"
}
        `;F.includes($)?L(!1,{max_tokens:16,prompt:e}).then(e=>{D(e.choices[0].text,e)}):J.includes($)?L(!0,{max_tokens:$.startsWith("o1")?void 0:16,messages:[{role:"user",content:e}]}).then(e=>{D(e.choices[0].message.content,e)}):x("Selected model does not exist.","Model")};!0===e.max&&!1!==(e=await R({queryType:"answerWithAnswer",query:o,triangle:n||" ",rhombus:i||" ",circle:r||" ",square:a||" "}))?D(e.completion,e):t()})}(r.value,s.value||"",c.value||"",P.value||"",z.value||""))}async function R(n){return new Promise((t,o)=>{chrome.storage.local.get(["email","accessToken"],async e=>{fetch("https://api.kahootgpt.itsmarsss.com/api/queryGPT",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e.email,accessToken:e.accessToken,...n})}).then(e=>e.json()).then(e=>{t(e)}).catch(e=>{o(!1)})})})}async function L(e,t){return await new Promise(e=>setTimeout(e,l?100:200)),(await fetch(`https://api.openai.com/v1/${e?"chat/":""}completions`,{method:"POST",headers:{Authorization:"Bearer "+H,"Content-Type":"application/json"},body:JSON.stringify({model:$,...t,temperature:$.startsWith("o1")?1:.7,top_p:1,frequency_penalty:0,presence_penalty:0,response_format:$.startsWith("o1")?void 0:{type:"json_object"}})})).json()}function V(e,t){try{e.startsWith("```json")&&(e=e.slice(7,-3));var o=JSON.parse(e),n=o.one||o.answer||"",i=o.two||"",r=o.three||"",a=o.four||"";s.value=n,c.value=i,P.value=r,z.value=a}catch(e){t?.error?.message?x(t.error.message,"OpenAI"):t?.error&&x(t.error,"KahootGPT"),x("Unknown",e.toString())}}function D(e,t){try{var o,n;switch(e.startsWith("```json")&&(e=e.slice(7,-3)),JSON.parse(e).answer){case"b":n=A,o=1;break;case"c":o=2,n=C;break;case"d":o=3,n=G;break;default:o=0,n=a}n.style.border="4px solid gold",r=o,r=document.querySelectorAll('[data-functional-selector^="answer-"]')[r],d&&(r.click(),r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="50%",r.style.border="4px solid gold"),k("<strong>KahootGPT Info!</strong> Clicked best answer according to OpenAI.","#46a8f5"),U&&(i=o,document.querySelectorAll('[data-functional-selector^="answer-"]')[i].style.border="4px solid gold",l||k("<strong>KahootGPT Warn!</strong> Highlighted best answer according to OpenAI: Buy Auto-hoist in popup!","#ffa92b"))}catch(e){t?.error?.message?x(t.error.message,"OpenAI"):t?.error&&x(t.error,"KahootGPT"),x("Unknown",e.toString())}var i,r}function X(){var e,t,o,n,i;W&&(i=""===p||f?{success:!1}:(f=!0,{q:p,r:u,b:h,y:m,g:g,success:!0})).success&&(e=i.q||"",t=i.r||"",o=i.b||"",n=i.y||"",i=i.g||"",r.value=e,s.value=t,c.value=o,P.value=n,z.value=i,M())}K.addEventListener("click",()=>{S.classList.toggle("active"),K.classList.toggle("active")||setTimeout(()=>{oe()},250)}),r.addEventListener("keypress",e=>{"Enter"===e.key&&M()}),e.addEventListener("click",()=>{M()}),j.addEventListener("click",()=>{a.style.border="none",A.style.border="none",C.style.border="none",G.style.border="none",r.value="",s.value="",c.value="",P.value="",z.value=""});var t,Y,Z,n,i,e=chrome.runtime.getManifest();function Q(e){e.preventDefault(),n=e.clientX,i=e.clientY,document.onmouseup=te,document.onmousemove=ee}function ee(e){e.preventDefault(),Y=n-e.clientX,Z=i-e.clientY,n=e.clientX,i=e.clientY,t.style.top=t.offsetTop-Z+"px",t.style.left=t.offsetLeft-Y+"px",oe()}function te(){document.onmouseup=null,document.onmousemove=null}function oe(){var e=window.innerWidth,t=window.innerHeight,o=S.getBoundingClientRect(),n=o.width,i=o.height,r=o.left,o=o.top,e=e-n,n=t-i;S.style.left=Math.max(Math.min(r,e),0)+"px",S.style.top=Math.max(Math.min(o,n),0)+"px"}document.getElementById("KahootGPT").innerHTML="KahootGPT v"+e.version+" (drag me)",X(),t=document.getElementById("container"),i=n=Z=Y=0,document.getElementById(t.id+"header")?document.getElementById(t.id+"header").onmousedown=Q:t.onmousedown=Q,window.addEventListener("resize",()=>{oe()})};kahootgpt();