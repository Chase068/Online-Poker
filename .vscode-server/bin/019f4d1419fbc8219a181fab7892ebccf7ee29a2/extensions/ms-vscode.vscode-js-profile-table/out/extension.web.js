(()=>{var e,t,n,r,o,i,s,a,c,l,u,d,f,h={808:(e,t)=>{t.endianness=function(){return"LE"},t.hostname=function(){return"undefined"!=typeof location?location.hostname:""},t.loadavg=function(){return[]},t.uptime=function(){return 0},t.freemem=function(){return Number.MAX_VALUE},t.totalmem=function(){return Number.MAX_VALUE},t.cpus=function(){return[]},t.type=function(){return"Browser"},t.release=function(){return"undefined"!=typeof navigator?navigator.appVersion:""},t.networkInterfaces=t.getNetworkInterfaces=function(){return{}},t.arch=function(){return"javascript"},t.platform=function(){return"browser"},t.tmpdir=t.tmpDir=function(){return"/tmp"},t.EOL="\n",t.homedir=function(){return"/"}},97:e=>{"use strict";function t(e){if("string"!=typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function n(e,t){for(var n,r="",o=0,i=-1,s=0,a=0;a<=e.length;++a){if(a<e.length)n=e.charCodeAt(a);else{if(47===n)break;n=47}if(47===n){if(i===a-1||1===s);else if(i!==a-1&&2===s){if(r.length<2||2!==o||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2))if(r.length>2){var c=r.lastIndexOf("/");if(c!==r.length-1){-1===c?(r="",o=0):o=(r=r.slice(0,c)).length-1-r.lastIndexOf("/"),i=a,s=0;continue}}else if(2===r.length||1===r.length){r="",o=0,i=a,s=0;continue}t&&(r.length>0?r+="/..":r="..",o=2)}else r.length>0?r+="/"+e.slice(i+1,a):r=e.slice(i+1,a),o=a-i-1;i=a,s=0}else 46===n&&-1!==s?++s:s=-1}return r}var r={resolve:function(){for(var e,r="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var s;i>=0?s=arguments[i]:(void 0===e&&(e=process.cwd()),s=e),t(s),0!==s.length&&(r=s+"/"+r,o=47===s.charCodeAt(0))}return r=n(r,!o),o?r.length>0?"/"+r:"/":r.length>0?r:"."},normalize:function(e){if(t(e),0===e.length)return".";var r=47===e.charCodeAt(0),o=47===e.charCodeAt(e.length-1);return 0!==(e=n(e,!r)).length||r||(e="."),e.length>0&&o&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return t(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,n=0;n<arguments.length;++n){var o=arguments[n];t(o),o.length>0&&(void 0===e?e=o:e+="/"+o)}return void 0===e?".":r.normalize(e)},relative:function(e,n){if(t(e),t(n),e===n)return"";if((e=r.resolve(e))===(n=r.resolve(n)))return"";for(var o=1;o<e.length&&47===e.charCodeAt(o);++o);for(var i=e.length,s=i-o,a=1;a<n.length&&47===n.charCodeAt(a);++a);for(var c=n.length-a,l=s<c?s:c,u=-1,d=0;d<=l;++d){if(d===l){if(c>l){if(47===n.charCodeAt(a+d))return n.slice(a+d+1);if(0===d)return n.slice(a+d)}else s>l&&(47===e.charCodeAt(o+d)?u=d:0===d&&(u=0));break}var f=e.charCodeAt(o+d);if(f!==n.charCodeAt(a+d))break;47===f&&(u=d)}var h="";for(d=o+u+1;d<=i;++d)d!==i&&47!==e.charCodeAt(d)||(0===h.length?h+="..":h+="/..");return h.length>0?h+n.slice(a+u):(a+=u,47===n.charCodeAt(a)&&++a,n.slice(a))},_makeLong:function(e){return e},dirname:function(e){if(t(e),0===e.length)return".";for(var n=e.charCodeAt(0),r=47===n,o=-1,i=!0,s=e.length-1;s>=1;--s)if(47===(n=e.charCodeAt(s))){if(!i){o=s;break}}else i=!1;return-1===o?r?"/":".":r&&1===o?"//":e.slice(0,o)},basename:function(e,n){if(void 0!==n&&"string"!=typeof n)throw new TypeError('"ext" argument must be a string');t(e);var r,o=0,i=-1,s=!0;if(void 0!==n&&n.length>0&&n.length<=e.length){if(n.length===e.length&&n===e)return"";var a=n.length-1,c=-1;for(r=e.length-1;r>=0;--r){var l=e.charCodeAt(r);if(47===l){if(!s){o=r+1;break}}else-1===c&&(s=!1,c=r+1),a>=0&&(l===n.charCodeAt(a)?-1==--a&&(i=r):(a=-1,i=c))}return o===i?i=c:-1===i&&(i=e.length),e.slice(o,i)}for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!s){o=r+1;break}}else-1===i&&(s=!1,i=r+1);return-1===i?"":e.slice(o,i)},extname:function(e){t(e);for(var n=-1,r=0,o=-1,i=!0,s=0,a=e.length-1;a>=0;--a){var c=e.charCodeAt(a);if(47!==c)-1===o&&(i=!1,o=a+1),46===c?-1===n?n=a:1!==s&&(s=1):-1!==n&&(s=-1);else if(!i){r=a+1;break}}return-1===n||-1===o||0===s||1===s&&n===o-1&&n===r+1?"":e.slice(n,o)},format:function(e){if(null===e||"object"!=typeof e)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return function(e,t){var n=t.dir||t.root,r=t.base||(t.name||"")+(t.ext||"");return n?n===t.root?n+r:n+"/"+r:r}(0,e)},parse:function(e){t(e);var n={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return n;var r,o=e.charCodeAt(0),i=47===o;i?(n.root="/",r=1):r=0;for(var s=-1,a=0,c=-1,l=!0,u=e.length-1,d=0;u>=r;--u)if(47!==(o=e.charCodeAt(u)))-1===c&&(l=!1,c=u+1),46===o?-1===s?s=u:1!==d&&(d=1):-1!==s&&(d=-1);else if(!l){a=u+1;break}return-1===s||-1===c||0===d||1===d&&s===c-1&&s===a+1?-1!==c&&(n.base=n.name=0===a&&i?e.slice(1,c):e.slice(a,c)):(0===a&&i?(n.name=e.slice(1,s),n.base=e.slice(1,c)):(n.name=e.slice(a,s),n.base=e.slice(a,c)),n.ext=e.slice(s,c)),a>0?n.dir=e.slice(0,a-1):i&&(n.dir="/"),n},sep:"/",delimiter:":",win32:null,posix:null};r.posix=r,e.exports=r},132:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.once=t.toggleInSet=t.removeFromSet=t.addToSet=t.binarySearch=void 0,t.binarySearch=function(e,t){let n=0,r=e.length-1;for(;n<=r;){const o=(n+r)/2|0,i=t(e[o]);if(i<0)n=o+1;else{if(!(i>0))return o;r=o-1}}return-(n+1)},t.addToSet=(e,t)=>{const n=new Set([...e,t]);return n.add(t),n},t.removeFromSet=(e,t)=>{const n=new Set([...e]);return n.delete(t),n},t.toggleInSet=(e,t)=>{const n=new Set([...e]);return n.has(t)?n.delete(t):n.add(t),n};const n=Symbol("unset");t.once=e=>{let t=n;return()=>(t===n&&(t=e()),t)}},85:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.bundlePage=void 0;const r=n(412);t.bundlePage=async(e,t)=>{const n=(0,r.makeNonce)();return`<!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="UTF-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1.0">\n      ${(0,r.nonceHeader)(n)}\n      <title>Profile Custom Editor</title>\n    </head>\n    <body>\n      <script type="text/javascript" nonce="${n}">\n        ${Object.entries(t).map((([e,t])=>`globalThis.${e} = ${JSON.stringify(t)}`)).join(";")}\n      <\/script>\n      <script nonce="${n}" src="${e}"><\/script>\n    </body>\n    </html>\n  `}},639:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.categorize=void 0,t.categorize=(e,t)=>(e.functionName=e.functionName||"(anonymous)",e.lineNumber<0?0:e.url.includes("node_modules")||!t?2:1)},49:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CpuProfileAnnotations=void 0;const r=n(496),o=n(561),i=n(127),s=n(65);class a extends i.ProfileAnnotations{constructor(){super(...arguments),this.data=new Map}set(e,t,n){var i;let s=this.data.get((0,o.lowerCaseInsensitivePath)(e));s||(s=[],this.data.set((0,o.lowerCaseInsensitivePath)(e),s));let a=0;for(;a<s.length&&s[a].position.line<t.line;)a++;if((null===(i=s[a])||void 0===i?void 0:i.position.line)===t.line){const e=s[a];t.character<e.position.character&&(e.position=new r.Position(t.line,t.character)),e.data.aggregateTime+=n.aggregateTime,e.data.selfTime+=n.selfTime,e.data.ticks+=n.ticks}else s.splice(a,0,{position:new r.Position(t.line,t.character),data:{aggregateTime:n.aggregateTime,selfTime:n.selfTime,ticks:n.ticks}})}getLensesForFile(e){var t,n;return this.expandForFile(e),null!==(n=null===(t=this.data.get((0,o.lowerCaseInsensitivePath)(e)))||void 0===t?void 0:t.map((({position:e,data:t})=>{if(0===t.aggregateTime&&0===t.selfTime)return[];const n=new r.Range(e,e);return[new r.CodeLens(n,{title:`${s.decimalFormat.format(t.selfTime/1e3)}ms Self Time, ${s.decimalFormat.format(t.aggregateTime/1e3)}ms Total`,command:""}),new r.CodeLens(n,{title:"Clear",command:"extension.jsProfileVisualizer.table.clearCodeLenses"})]})).reduce(((e,t)=>[...e,...t]),[]))&&void 0!==n?n:[]}}t.CpuProfileAnnotations=a},65:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.decimalFormat=void 0,t.decimalFormat=new Intl.NumberFormat(void 0,{maximumFractionDigits:2,minimumFractionDigits:2})},577:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.CpuProfileEditorProvider=void 0;const s=i(n(496)),a=n(85),c=n(650),l=n(79),u=n(802),d=n(49),f=n(864);t.CpuProfileEditorProvider=class{constructor(e,t,n={}){this.lens=e,this.bundle=t,this.extraConsts=n,this.onDidChangeCustomDocument=(new s.EventEmitter).event}async openCustomDocument(e){const t=await s.workspace.fs.readFile(e),n=JSON.parse((new TextDecoder).decode(t)),r=new l.ReadonlyCustomDocument(e,(0,f.buildModel)(n)),o=new d.CpuProfileAnnotations,i=r.userData.rootPath;for(const e of r.userData.locations)o.add(i,e);return this.lens.registerLenses(o),r}async resolveCustomEditor(e,t){t.webview.onDidReceiveMessage((t=>{var n;switch(t.type){case"openDocument":return void(0,c.openLocation)({rootPath:null===(n=e.userData)||void 0===n?void 0:n.rootPath,viewColumn:t.toSide?s.ViewColumn.Beside:s.ViewColumn.Active,callFrame:t.callFrame,location:t.location});case"reopenWith":return void(0,u.reopenWithEditor)(e.uri,t.viewType,t.requireExtension);default:console.warn(`Unknown request from webview: ${JSON.stringify(t)}`)}})),t.webview.options={enableScripts:!0},t.webview.html=await(0,a.bundlePage)(t.webview.asWebviewUri(this.bundle),{MODEL:e.userData,...this.extraConsts})}async saveCustomDocument(){}async revertCustomDocument(){}async backupCustomDocument(){return{id:"",delete:()=>{}}}saveCustomDocumentAs(e,t){return s.workspace.fs.copy(e.uri,t,{overwrite:!0})}}},864:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.buildModel=void 0;const r=n(639),o=n(460),i=n(561),s=(e,t)=>{const n=t[e];if(n.aggregateTime)return n.aggregateTime;let r=n.selfTime;for(const e of n.children)r+=s(e,t);return n.aggregateTime=r};t.buildModel=e=>{var t,n,a;if(!e.timeDeltas||!e.samples)return{nodes:[],locations:[],samples:e.samples||[],timeDeltas:e.timeDeltas||[],rootPath:null===(t=e.$vscode)||void 0===t?void 0:t.rootPath,duration:e.endTime-e.startTime};const{samples:c,timeDeltas:l}=e,u=(e=>{var t;if(e.$vscode)return e.$vscode.locations;let n=0;const r=new Map,o=e=>{const t=[e.functionName,e.url,e.scriptId,e.lineNumber,e.columnNumber].join(":"),o=r.get(t);if(o)return o.id;const s=n++;return r.set(t,{id:s,callFrame:e,location:{lineNumber:e.lineNumber+1,columnNumber:e.columnNumber+1,source:{name:(0,i.maybeFileUrlToPath)(e.url),path:(0,i.maybeFileUrlToPath)(e.url),sourceReference:0}}}),s};for(const n of e.nodes)n.locationId=o(n.callFrame),n.positionTicks=null===(t=n.positionTicks)||void 0===t?void 0:t.map((e=>({...e,startLocationId:o({...n.callFrame,lineNumber:e.line-1,columnNumber:0}),endLocationId:o({...n.callFrame,lineNumber:e.line,columnNumber:0})})));return[...r.values()].sort(((e,t)=>e.id-t.id)).map((e=>({locations:[e.location],callFrame:e.callFrame})))})(e),d=u.map(((t,n)=>{const i=(0,o.getBestLocation)(e,t.locations);return{id:n,selfTime:0,aggregateTime:0,ticks:0,category:(0,r.categorize)(t.callFrame,i),callFrame:t.callFrame,src:i}})),f=new Map,h=e=>{let t=f.get(e);return void 0===t&&(t=f.size,f.set(e,t)),t},m=new Array(e.nodes.length);for(let t=0;t<e.nodes.length;t++){const r=e.nodes[t],o=h(r.id);m[o]={id:o,selfTime:0,aggregateTime:0,locationId:r.locationId,children:(null===(n=r.children)||void 0===n?void 0:n.map(h))||[]};for(const e of r.positionTicks||[])e.startLocationId&&(d[e.startLocationId].ticks+=e.ticks)}for(const e of m)for(const t of e.children)m[t].parent=e.id;const p=e.endTime-e.startTime;let v=p-l[0];for(let e=0;e<l.length-1;e++){const t=l[e+1];m[h(c[e])].selfTime+=t,v-=t}m.length&&(m[h(c[l.length-1])].selfTime+=v,l.push(v));for(let e=0;e<m.length;e++){const t=m[e],n=d[t.locationId];n.aggregateTime+=s(e,m),n.selfTime+=t.selfTime}return{nodes:m,locations:d,samples:c.map(h),timeDeltas:l,rootPath:null===(a=e.$vscode)||void 0===a?void 0:a.rootPath,duration:p}}},354:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.DownloadFileProvider=void 0;const s=i(n(496));class a{async provideTextDocumentContent(e){return s.window.withProgress({location:s.ProgressLocation.Notification,title:`Retrieving ${e.query}...`},(async()=>{try{const t=await fetch(e.query,{}),n=await t.text();return t.ok?n:`Unexpected ${t.status} from ${e.query}: ${n}`}catch(e){return e.message}}))}}t.DownloadFileProvider=a,a.scheme="js-viz-download"},505:(e,t,n)=>{"use strict";n.r(t),n.d(t,{HeapSnapshotEditorProvider:()=>f});var r=n(496);const o=(e,t)=>t.method===e,i=(e,t)=>{const n=new Array(e.length);for(let r=0;r<e.length;r++){const o=e[r];n[r]=t(o,r),o.free()}return n},s=e=>i(e,(e=>({name:e.name(),childrenLen:e.children_len,id:e.id,index:e.index,retainedSize:Number(e.retained_size),selfSize:Number(e.self_size),type:e.typ,retainsIndex:e.retains_index,edgeType:e.edge_typ}))),a=async()=>{const e=await n.e(9).then(n.bind(n,9)),{decode_bytes:t,init_panic_hook:r}=await e.default;return r(),t};var c,l;class u{constructor(e,t){this.uri=e,this.value=t}dispose(){this.value.dispose()}}const d=null!==(c=(l=globalThis).__jsHeapSnapshotWorkers)&&void 0!==c?c:l.__jsHeapSnapshotWorkers=new class{constructor(){this.workers=new Map}async create(e){let t=this.workers.get(e.with({query:""}).toString());if(!t){const n=await(async e=>{const t=new r.EventEmitter,n=Promise.all([r.workspace.fs.readFile(e),a()]).then((([e,t])=>t(e)));return{postMessage:e=>((e,t)=>e.then((e=>{if(o("getClassGroups",t))return i(e.get_class_groups(...t.args,!1),((e,t)=>({name:e.name(),index:t,retainedSize:Number(e.retained_size),selfSize:Number(e.self_size),childrenLen:e.children_len})));if(o("getClassChildren",t))return s(e.class_children(...t.args));if(o("getNodeChildren",t))return s(e.node_children(...t.args));if(o("getRetainers",t))return s(e.get_all_retainers(...t.args));throw new Error(`unknown method ${t.method}`)})).then((e=>({id:t.id,result:{ok:e}}))).catch((e=>({id:t.id,result:{err:e.stack||e.message||String(e)}}))))(n,e).then((e=>t.fire(e))),onMessage:t.event,terminate:()=>n.then((e=>e.free()))}})(e);t={worker:n,rc:0},this.workers.set(e.toString(),t)}return t.rc++,t.closer&&(clearTimeout(t.closer),t.closer=void 0),{worker:t.worker,dispose:()=>{--t.rc||(t.closer=setTimeout((()=>{t.worker.terminate(),this.workers.delete(e.toString())}),5e3))}}}};class f{constructor(e,t={}){this.bundle=e,this.extraConsts=t,this.onDidChangeCustomDocument=(new r.EventEmitter).event}async openCustomDocument(e){const t=await d.create(e);return new u(e,t)}async resolveCustomEditor(e,t){t.webview.onDidReceiveMessage((t=>{switch(t.type){case"reopenWith":return n=e.uri.with({query:t.withQuery}),o=t.viewType,i=t.requireExtension,s=t.toSide,void(i&&!r.extensions.all.some((e=>e.id===i))?r.commands.executeCommand("workbench.extensions.action.showExtensionsWithIds",[i]):r.commands.executeCommand("vscode.openWith",n,o,s?r.ViewColumn.Beside:r.ViewColumn.Active));case"callGraph":return void e.value.worker.postMessage(t.inner);default:console.warn(`Unknown request from webview: ${JSON.stringify(t)}`)}var n,o,i,s}));const n=e.value.worker.onMessage((e=>{t.webview.postMessage({method:"graphRet",message:e})}));t.onDidDispose((()=>{n.dispose()})),t.webview.options={enableScripts:!0},t.webview.html=await(async(e,t)=>{const n=function(e=32){let t="";for(let n=0;n<e;n++)t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(62*Math.random())];return t}();return`<!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="UTF-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1.0">\n      ${(e=>`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${e}';">`)(n)}\n      <title>Profile Custom Editor</title>\n    </head>\n    <body>\n      <script type="text/javascript" nonce="${n}">\n        ${Object.entries(t).map((([e,t])=>`globalThis.${e} = ${JSON.stringify(t)}`)).join(";")}\n      <\/script>\n      <script nonce="${n}" src="${e}"><\/script>\n    </body>\n    </html>\n  `})(t.webview.asWebviewUri(this.bundle),{SNAPSHOT_URI:t.webview.asWebviewUri(e.uri).toString(),DOCUMENT_URI:e.uri.toString(),...this.extraConsts})}async saveCustomDocument(){}async revertCustomDocument(){}async backupCustomDocument(){return{id:"",delete:()=>{}}}saveCustomDocumentAs(e,t){return r.workspace.fs.copy(e.uri,t,{overwrite:!0})}}},460:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getBestLocation=void 0;const r=n(59);t.getBestLocation=(e,t=[])=>{var n;if(!(null===(n=e.$vscode)||void 0===n?void 0:n.rootPath))return t[0];for(const n of t){const t=(0,r.addRelativeDiskPath)(e.$vscode.rootPath,n);if(t.relativePath)return t}return t[0]}},583:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.decimalFormat=void 0,t.decimalFormat=new Intl.NumberFormat(void 0,{maximumFractionDigits:0,minimumFractionDigits:0})},849:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.HeapProfileEditorProvider=void 0;const s=i(n(496)),a=n(85),c=n(650),l=n(79),u=n(802),d=n(227),f=n(970),h=n(242);t.HeapProfileEditorProvider=class{constructor(e,t,n={}){this.lens=e,this.bundle=t,this.extraConsts=n,this.onDidChangeCustomDocument=(new s.EventEmitter).event}async openCustomDocument(e){const t=await s.workspace.fs.readFile(e),n=JSON.parse((new TextDecoder).decode(t)),r=new l.ReadonlyCustomDocument(e,(0,f.buildModel)(n)),o=(0,h.createTree)(r.userData),i=[o];let a=[o];for(;a.length;){const e=a.pop();e&&(i.push(e),a=a.concat(Object.values(e.children)))}const c=new d.HeapProfileAnnotations,u=r.userData.rootPath;for(const e of i)c.add(u,e);return this.lens.registerLenses(c),r}async resolveCustomEditor(e,t){t.webview.onDidReceiveMessage((t=>{switch(t.type){case"openDocument":return void(0,c.openLocation)({rootPath:void 0,viewColumn:t.toSide?s.ViewColumn.Beside:s.ViewColumn.Active,callFrame:t.callFrame,location:t.location});case"reopenWith":return void(0,u.reopenWithEditor)(e.uri,t.viewType,t.requireExtension);default:console.warn(`Unknown request from webview: ${JSON.stringify(t)}`)}})),t.webview.options={enableScripts:!0},t.webview.html=await(0,a.bundlePage)(t.webview.asWebviewUri(this.bundle),{MODEL:e.userData,...this.extraConsts})}async saveCustomDocument(){}async revertCustomDocument(){}async backupCustomDocument(){return{id:"",delete:()=>{}}}saveCustomDocumentAs(e,t){return s.workspace.fs.copy(e.uri,t,{overwrite:!0})}}},227:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.HeapProfileAnnotations=void 0;const r=n(496),o=n(561),i=n(127),s=n(583);class a extends i.ProfileAnnotations{constructor(){super(...arguments),this.data=new Map}set(e,t,n){var i;let s=this.data.get((0,o.lowerCaseInsensitivePath)(e));s||(s=[],this.data.set((0,o.lowerCaseInsensitivePath)(e),s));let a=0;for(;a<s.length&&s[a].position.line<t.line;)a++;if((null===(i=s[a])||void 0===i?void 0:i.position.line)===t.line){const e=s[a];t.character<e.position.character&&(e.position=new r.Position(t.line,t.character)),e.data.totalSize+=n.totalSize,e.data.selfSize+=n.selfSize}else s.splice(a,0,{position:new r.Position(t.line,t.character),data:{totalSize:n.totalSize,selfSize:n.selfSize}})}getLensesForFile(e){var t,n;return this.expandForFile(e),null!==(n=null===(t=this.data.get((0,o.lowerCaseInsensitivePath)(e)))||void 0===t?void 0:t.map((({position:e,data:t})=>{if(0===t.totalSize&&0===t.selfSize)return[];const n=new r.Range(e,e);return[new r.CodeLens(n,{title:`${s.decimalFormat.format(t.selfSize/1e3)}kB Self Size, ${s.decimalFormat.format(t.totalSize/1e3)}kB Total Size`,command:""}),new r.CodeLens(n,{title:"Clear",command:"extension.jsProfileVisualizer.table.clearCodeLenses"})]})).reduce(((e,t)=>[...e,...t]),[]))&&void 0!==n?n:[]}}t.HeapProfileAnnotations=a},970:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.buildModel=void 0;const r=n(460),o=n(561);t.buildModel=e=>{var t;let n=[e.head];const i=(e=>{if(e.$vscode)return e.$vscode.locations;let t=0;const n=new Map,r=e=>{const r=[e.functionName,e.url,e.scriptId,e.lineNumber,e.columnNumber].join(":"),i=n.get(r);if(i)return i.id;const s=t++;return n.set(r,{id:s,callFrame:e,location:{lineNumber:e.lineNumber+1,columnNumber:e.columnNumber+1,source:{name:(0,o.maybeFileUrlToPath)(e.url),path:(0,o.maybeFileUrlToPath)(e.url),sourceReference:0}}}),s};let i=[e.head];for(;i.length;){const e=i.pop();if(e){const{callFrame:t}=e;e.locationId=r(t),i=i.concat(e.children)}}return[...n.values()].sort(((e,t)=>e.id-t.id)).map((e=>({locations:[e.location],callFrame:e.callFrame})))})(e);for(;n.length;){const t=n.pop();t&&(t.locationId&&(t.src=(0,r.getBestLocation)(e,i[t.locationId].locations)),n=n.concat(t.children))}return{head:e.head,samples:e.samples,rootPath:null===(t=e.$vscode)||void 0===t?void 0:t.rootPath}}},242:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createTree=t.TreeNode=void 0;const r=n(639);class o{static root(){return new o({id:-1,selfSize:0,children:[],callFrame:{functionName:"(root)",lineNumber:-1,columnNumber:-1,scriptId:"0",url:""}})}get id(){return this.node.id}get callFrame(){return this.node.callFrame}get src(){return this.node.src}constructor(e,t){this.node=e,this.parent=t,this.children={},this.totalSize=0,this.selfSize=0,this.childrenSize=0,this.category=(0,r.categorize)(e.callFrame,void 0)}toJSON(){return{category:this.category,children:this.children,childrenSize:this.childrenSize,selfSize:this.selfSize,totalSize:this.totalSize,id:this.id,callFrame:this.callFrame,src:this.src}}}t.TreeNode=o;const i=(e,t)=>{const n=new o(e,t);e.children.forEach((e=>{const t=i(e,n);n.children[t.id]=t,n.childrenSize++})),n.selfSize=e.selfSize,n.totalSize=e.selfSize;for(const e in n.children)n.totalSize+=n.children[e].totalSize;return n};t.createTree=e=>{const t=o.root();for(const n of e.head.children){const e=i(n,t);t.children[e.id]=e,t.childrenSize++}for(const e in t.children)t.totalSize+=t.children[e].totalSize;return t}},59:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addRelativeDiskPath=void 0;const r=n(561);t.addRelativeDiskPath=(e,t)=>t.source.path&&0===t.source.sourceReference?{...t,relativePath:(0,r.properRelative)(e,t.source.path)}:t},412:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.nonceHeader=t.makeNonce=void 0;t.makeNonce=function(e=32){let t="";for(let n=0;n<e;n++)t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(62*Math.random())];return t},t.nonceHeader=e=>`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${e}';">`},650:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.getCandidateDiskPaths=t.openLocation=void 0;const s=n(808),a=n(97),c=i(n(496)),l=n(354),u=n(561),d=async e=>{try{const t=p(e);return 0===t.type||await c.workspace.fs.stat(t.uri),!0}catch{return!1}};t.openLocation=async({rootPath:e,location:t,viewColumn:n,callFrame:r})=>{t&&await h(e,t,n)||r&&await m(r,n)||c.window.showErrorMessage("Could not find the file in your workspace")};const f=async(e,t,n,r)=>{const o=new c.Position(Math.max(0,t-1),Math.max(0,n-1));await c.window.showTextDocument(e,{viewColumn:r,selection:new c.Range(o,o)})},h=async(e,n,r)=>{const o=(0,t.getCandidateDiskPaths)(e,n.source),i=(await Promise.all(o.map(d))).findIndex((e=>e));if(-1===i)return!1;const s=p(o[i]);if(0===s.type)return await(a=s,c.commands.executeCommand(a.command,...a.args)),!0;var a;const l=await c.workspace.openTextDocument(s.uri);return await f(l,n.lineNumber,n.columnNumber,r),!0},m=async({url:e,lineNumber:t,columnNumber:n},r)=>{var o,i;let u;try{u=new URL(e)}catch{return!1}if("http:"!==u.protocol&&"https:"!==u.protocol)return!1;const d=(0,a.resolve)(null!==(i=null===(o=c.workspace.workspaceFolders)||void 0===o?void 0:o[0].uri.fsPath)&&void 0!==i?i:(0,s.tmpdir)(),u.pathname.slice(1)||"index.js"),h=await c.workspace.openTextDocument(c.Uri.file(d).with({scheme:l.DownloadFileProvider.scheme,query:e}));return await f(h,t+1,n+1,r),!0},p=e=>{const t=null==e?void 0:e.match(/^command:([\w\.]+)(?:\?(.*))?/);if(t){const[e,n]=t.slice(1),r=n?JSON.parse(decodeURIComponent(n)):[];return{type:0,command:e,args:Array.isArray(r)?r:[r]}}return(null==e?void 0:e.match(/\w\w+:/))?{type:1,uri:c.Uri.parse(e||""),isFile:!1}:{type:1,uri:c.Uri.file(e||""),isFile:!0}};t.getCandidateDiskPaths=(e,t)=>{var n;if(!t.path)return[];const r=p(t.path),o=[t.path];if(!e||0===r.type||!r.isFile)return o;for(const r of null!==(n=c.workspace.workspaceFolders)&&void 0!==n?n:[])o.push((0,a.resolve)(r.uri.fsPath,(0,u.properRelative)(e,t.path)));return o}},561:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.isWindowsPath=t.maybeFileUrlToPath=t.lowerCaseInsensitivePath=t.getCaseSensitivePaths=t.setCaseSensitivePaths=t.properRelative=void 0;const s=i(n(97));t.properRelative=function(e,t){var n,r;return(null===(n=s.posix)||void 0===n?void 0:n.isAbsolute(e))?s.posix.relative(e,t):(null===(r=s.win32)||void 0===r?void 0:r.isAbsolute(e))?s.win32.relative(e,t):s.relative(e,t)};let a="undefined"!=typeof process&&"win32"!==process.platform;t.setCaseSensitivePaths=function(e){a=e},t.getCaseSensitivePaths=function(){return a},t.lowerCaseInsensitivePath=function(e){return a?e:e.toLowerCase()},t.maybeFileUrlToPath=function(e){return e.startsWith("file:///")?(e=e.replace("file:///",""),"/"===(e=decodeURIComponent(e))[0]||e.match(/^[A-Za-z]:/)||(e="/"+e),(0,t.isWindowsPath)(e)&&(e=e[0].toLowerCase()+e.substr(1)),e):e},t.isWindowsPath=e=>/^[A-Za-z]:/.test(e)},127:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ProfileAnnotations=t.getBasename=void 0;const r=n(496),o=n(132),i=n(650),s=/[^/\\]+$/;t.getBasename=e=>{var t,n;return null!==(n=null===(t=s.exec(e))||void 0===t?void 0:t[0])&&void 0!==n?n:e},t.ProfileAnnotations=class{constructor(){this.basenamesToExpand=new Map}add(e,n){var s;const a=(0,o.once)((()=>{this.set(n.callFrame.url,new r.Position(Math.max(0,n.callFrame.lineNumber),Math.max(0,n.callFrame.columnNumber)),n);const t=n.src;if(t&&0===t.source.sourceReference&&t.source.path&&t.source.path!==n.callFrame.url)for(const o of(0,i.getCandidateDiskPaths)(e,t.source))this.set(o,new r.Position(Math.max(0,t.lineNumber-1),Math.max(0,t.columnNumber-1)),n)}));this.addExpansionFn((0,t.getBasename)(n.callFrame.url),a),(null===(s=n.src)||void 0===s?void 0:s.source.path)&&this.addExpansionFn((0,t.getBasename)(n.src.source.path),a)}addExpansionFn(e,t){let n=this.basenamesToExpand.get(e);n||(n=[],this.basenamesToExpand.set(e,n)),n.push(t)}expandForFile(e){const n=(0,t.getBasename)(e),r=this.basenamesToExpand.get(n);if(r){for(const e of r)e();this.basenamesToExpand.delete(n)}}}},21:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ProfileCodeLensProvider=void 0;const r=n(496),o=n(354),i=n(561);t.ProfileCodeLensProvider=class{constructor(){this.changeEmitter=new r.EventEmitter,this.onDidChangeCodeLenses=this.changeEmitter.event}registerLenses(e){return r.commands.executeCommand("setContext","jsProfileVisualizer.hasCodeLenses",!0),this.lenses=e,{dispose:()=>{this.lenses===e&&this.clear()}}}clear(){this.lenses&&(this.lenses=void 0,r.commands.executeCommand("setContext","jsProfileVisualizer.hasCodeLenses",!1),this.changeEmitter.fire())}provideCodeLenses(e){var t,n;const r=null===(t=this.lenses)||void 0===t?void 0:t.getLensesForFile((0,i.lowerCaseInsensitivePath)(e.uri.fsPath));if(r)return r;return(e.uri.scheme===o.DownloadFileProvider.scheme?null===(n=this.lenses)||void 0===n?void 0:n.getLensesForFile(e.uri.query):void 0)||[]}}},79:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ReadonlyCustomDocument=void 0,t.ReadonlyCustomDocument=class{constructor(e,t){this.uri=e,this.userData=t}dispose(){}}},802:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.reopenWithEditor=void 0;const s=i(n(496));t.reopenWithEditor=function(e,t,n,r){n&&!s.extensions.all.some((e=>e.id===n))?s.commands.executeCommand("workbench.extensions.action.showExtensionsWithIds",[n]):s.commands.executeCommand("vscode.openWith",e,t,r?s.ViewColumn.Beside:s.ViewColumn.Active)}},920:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const s=i(n(496)),a=n(577),c=n(354),l=n(505),u=n(849),d=n(21);t.activate=function(e){const t=new d.ProfileCodeLensProvider;e.subscriptions.push(s.window.registerCustomEditorProvider("jsProfileVisualizer.cpuprofile.table",new a.CpuProfileEditorProvider(t,s.Uri.joinPath(e.extensionUri,"out","cpu-client.bundle.js")),{webviewOptions:{retainContextWhenHidden:!0}}),s.window.registerCustomEditorProvider("jsProfileVisualizer.heapprofile.table",new u.HeapProfileEditorProvider(t,s.Uri.joinPath(e.extensionUri,"out","heap-client.bundle.js")),{webviewOptions:{retainContextWhenHidden:!0}}),s.window.registerCustomEditorProvider("jsProfileVisualizer.heapsnapshot.table",new l.HeapSnapshotEditorProvider(s.Uri.joinPath(e.extensionUri,"out","heapsnapshot-client.bundle.js"))),s.workspace.registerTextDocumentContentProvider("js-viz-download",new c.DownloadFileProvider),s.languages.registerCodeLensProvider("*",t),s.commands.registerCommand("extension.jsProfileVisualizer.table.clearCodeLenses",(()=>t.clear())))},t.deactivate=function(){}},496:e=>{"use strict";e.exports=require("vscode")}},m={};function p(e){var t=m[e];if(void 0!==t)return t.exports;var n=m[e]={id:e,loaded:!1,exports:{}};return h[e].call(n.exports,n,n.exports,p),n.loaded=!0,n.exports}p.m=h,p.c=m,p.d=(e,t)=>{for(var n in t)p.o(t,n)&&!p.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},p.f={},p.e=e=>Promise.all(Object.keys(p.f).reduce(((t,n)=>(p.f[n](e,t),t)),[])),p.u=e=>e+".extension.web.js",p.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),p.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),p.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),p.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;p.g.importScripts&&(e=p.g.location+"");var t=p.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var r=n.length-1;r>-1&&!e;)e=n[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),p.p=e})(),(()=>{var e={179:1};p.f.i=(t,n)=>{e[t]||importScripts(p.p+p.u(t))};var t=self.webpackChunkvscode_js_profile_table=self.webpackChunkvscode_js_profile_table||[],n=t.push.bind(t);t.push=t=>{var[r,o,i]=t;for(var s in o)p.o(o,s)&&(p.m[s]=o[s]);for(i&&i(p);r.length;)e[r.pop()]=1;n(t)}})(),u={},d={392:function(){return{"./v8_heap_parser_bg.js":{__wbindgen_string_new:function(t,n){return void 0===e&&(e=p.c[568].exports),e.h4(t,n)},__wbindgen_object_drop_ref:function(e){return void 0===t&&(t=p.c[568].exports),t.ug(e)},__wbg_classgroup_new:function(e){return void 0===n&&(n=p.c[568].exports),n.Aw(e)},__wbg_node_new:function(e){return void 0===r&&(r=p.c[568].exports),r.ks(e)},__wbg_retainernode_new:function(e){return void 0===o&&(o=p.c[568].exports),o.zD(e)},__wbg_new_abda76e883ba8a5f:function(){return void 0===i&&(i=p.c[568].exports),i.a2()},__wbg_stack_658279fe44541cf6:function(e,t){return void 0===s&&(s=p.c[568].exports),s.KM(e,t)},__wbg_error_f851667af71bcfc6:function(e,t){return void 0===a&&(a=p.c[568].exports),a.iX(e,t)},__wbindgen_throw:function(e,t){return void 0===c&&(c=p.c[568].exports),c.Or(e,t)},__wbindgen_string_get:function(e,t){return void 0===l&&(l=p.c[568].exports),l.qt(e,t)}}}}},f={9:[392]},p.w={},p.f.wasm=function(e,t){(f[e]||[]).forEach((function(n,r){var o=u[n];if(o)t.push(o);else{var i,s=d[n](),a=fetch(p.p+""+{9:{392:"84b6bc62673660f3ffa2"}}[e][n]+".module.wasm");i=s&&"function"==typeof s.then&&"function"==typeof WebAssembly.compileStreaming?Promise.all([WebAssembly.compileStreaming(a),s]).then((function(e){return WebAssembly.instantiate(e[0],e[1])})):"function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(a,s):a.then((function(e){return e.arrayBuffer()})).then((function(e){return WebAssembly.instantiate(e,s)})),t.push(u[n]=i.then((function(e){return p.w[n]=(e.instance||e).exports})))}}))};var v=p(920);module.exports=v})();