(function(d){var e="1.4",j=this,c=j.Class,b=false;var i=(function(){$super()}).toString().indexOf("$super")>0;function h(l){return !i||/\B\$super\b/.test(l.toString())}function g(n,l,m){if(m===d){delete n[l]}else{n[l]=m}}function k(m,l){return Object.prototype.hasOwnProperty.call(m,l)?m[l]:d}function f(l){b=true;var m=new l;b=false;return m}var a=function(){};a.$noConflict=function(){try{g(j,"Class",c)}catch(l){j.Class=c}return a};a.$classyVersion=e;a.$extend=function(r){var p=this.prototype;var s=f(this);if(r.__include__){for(var q=0,o=r.__include__.length;q!=o;++q){var v=r.__include__[q];for(var l in v){var t=k(v,l);if(t!==d){s[l]=v[l]}}}}r.__classvars__=r.__classvars__||{};if(s.__classvars__){for(var u in s.__classvars__){if(!r.__classvars__[u]){var t=k(s.__classvars__,u);r.__classvars__[u]=t}}}for(var l in r){var t=k(r,l);if(l==="__include__"||t===d){continue}s[l]=typeof t==="function"&&h(t)?(function(n,w){return function(){var x=k(this,"$super");this.$super=p[w];try{return n.apply(this,arguments)}finally{g(this,"$super",x)}}})(t,l):t}var m=function(){if(b){return}var n=j===this?f(arguments.callee):this;if(n.__init__){n.__init__.apply(n,arguments)}n.$class=m;return n};for(var u in r.__classvars__){var t=k(r.__classvars__,u);if(t!==d){m[u]=t}}m.prototype=s;m.constructor=m;m.$extend=a.$extend;m.$withData=a.$withData;return m};a.$withData=function(n){var o=f(this);for(var l in n){var m=k(n,l);if(m!==d){o[l]=m}}return o};j.Class=a})();var PAD_CACHE={};function padBeginning(a,c,d){var b=d.length;if(b<a){if(!PAD_CACHE.hasOwnProperty(c)){PAD_CACHE[c]={}}return(PAD_CACHE[c][a-b]||(PAD_CACHE[c][a-b]=(new Array(a-b+1).join(c))))+d}return(b===a)?d:d.substring(b-a)}function padEnd(a,c,d){var b=d.length;if(b<a){if(!PAD_CACHE.hasOwnProperty(c)){PAD_CACHE[c]={}}return d+(PAD_CACHE[c][a-b]||(PAD_CACHE[c][a-b]=(new Array(a-b+1).join(c))))}return(b===a)?d:d.substring(0,a)}function hex2number(a){return parseInt(a,16)}function number2hex(b,a){return padBeginning(a,"0",b.toString(16))}var CFLink={baseReplyRegex:/\xF2([\s\S])\xF3(R)(\w{3})(\w{3})\xF4([\s\S]*)\xF5\xF5/,baseCFLinkRegex:/\xF2([\s\S])\xF3([QCTR])(\w{3})(\w{3})\xF4([\s\S]*)\xF5\xF5/,replyCallback:null,callbackAttachments:{},eventWatchers:{},nextWatcherID:1,nextUniqueID:1,interceptNetworkDialog:null,model:{LANBridge:"LANBridge",DINMOD4:"DIN-MOD4",MOD4:"MOD4",CFMini:"CFMini",SW16:"SW16",IRBlaster:"IRBlaster",HRY2:"MOD-HRY2",RY4:"MOD-RY4",LRY8:"MOD-LRY8",SSRY4:"MOD-SSRY4",IO8:"MOD-IO8",IR8:"MOD-IR8",COM4:"MOD-COM4"},getNextUniqueID:function(){return this.nextUniqueID++},getDevices:function(b,e){var d={};var a,g,f,c,h;for(c in b){if(b.hasOwnProperty(c)&&typeof(c)==="string"){g=b[c];if(g.hasOwnProperty("id")&&g.hasOwnProperty("type")){a=this._createDevice(g.id,g.type,e,g.modules);if(a!=null){d[c]=a}}}}return d},_createDevice:function(f,d,b){switch(d){case CFLink.model.LANBridge:return new CFLink.LANBridge(b,f,null);case CFLink.model.CFMini:return new CFLink.CFMini(b,f,null);case CFLink.model.SW16:return new CFLink.SW16(b,f,null);case CFLink.model.DINMOD4:if(arguments.length>3&&arguments[3] instanceof Array){var e=arguments[3];if(e.length===4){var c="DIN-MOD4:::,";for(var a=1;a<=4;a++){c+="M"+a+":"+e[a-1]+(a===4?"":",")}}CF.log("Creating DIN-MOD4 with premade module list: "+c);return new CFLink.DINMOD4(b,f,c)}return new CFLink.DINMOD4(b,f,null);case CFLink.model.IRBlaster:return new CFLink.IRBlaster(b,f,null)}return null},deviceRegistry:{},initializeDeviceRegistry:function(){this.deviceRegistry={};this.callbackAttachments={}},addDeviceToRegistry:function(a){if(CF.debug){CF.log("Added CFLink device "+a.serialNum+" ( "+a.model+" firmware v"+a.firmwareVer+")")}if(this.deviceRegistry[a.serialNum]!=null){if(CF.debug){CF.log("-> this device was already in our registry, removing...")}this.removeCallbacksByDevice(a);return false}this.deviceRegistry[a.serialNum]=a;return true},getDevice:function(d,a,e){var c,b=this.deviceRegistry,f=d+"."+a+"."+e;if(b.hasOwnProperty(f)){return b[f]}for(var g in b){if(b.hasOwnProperty(g)){c=b[g];if(c.systemName===d&&c.cflinkID===e){return c}}}c=this._createDevice(e,a,d);if(c!=null){b[f]=c}return c},getDeviceBySerialNumber:function(a){return this.deviceRegistry[a]},getDeviceForModule:function(c){for(var b in this.deviceRegistry){if(this.deviceRegistry.hasOwnProperty(b)){var a=this.deviceRegistry[b];if(a.hasOwnProperty("modules")&&a.modules.indexOf(c)!=-1){return a}}}return null},getDeviceForModulePort:function(d){for(var e in this.deviceRegistry){if(this.deviceRegistry.hasOwnProperty(e)){var a=this.deviceRegistry[e];if(a.hasOwnProperty("modules")){var b=a.modules;var c,f=b.length;for(c=0;c<f;c++){if(b[c].ownsPort(d)){return a}}}}}return null},buildNetworkRegistry:function(){},incomingData:function(d,f){if(f.length<12||f.charCodeAt(0)!==242||f.charCodeAt(2)!==243){if(CF.debug){CF.log("invalid CFLink packet: "+f)}return}if(CFLink.interceptNetworkDialog!=null){CFLink.interceptNetworkDialog(true,d,f)}if(f.charAt(3)==="R"){var e=CFLink.baseReplyRegex.exec(f);if(CFLink.replyCallback!==null){CFLink.replyCallback(e[1],e[3],e[4],e[5])}else{}}var a=CFLink.callbackAttachments;for(var c in a){if(a.hasOwnProperty(c)){var b=a[c];if(b!==undefined){if(b.regex.test(f)){b.callback(CFLink.baseCFLinkRegex.exec(f),b.regex,b.me)}}}}},buildMsg:function(a,b,c,e,g,d){if(CF.debug&&!this._buildMsgChecks(a,b,c,e,g)){return""}var f="\xF2"+String.fromCharCode(parseInt(b,16))+"\xF3"+c+e+g+"\xF4"+d+"\xF5\xF5";if(a!=null){CF.send(a,f);if(CFLink.interceptNetworkDialog!=null){CFLink.interceptNetworkDialog(false,a,f)}}return f},_buildMsgChecks:function(a,b,c,d,e){if(typeof(c)!=="string"||c.length!==1){CF.log("CFLink.buildMsg: invalid command type. Expected a single character string, got: "+c);return false}if(typeof(d)!=="string"||d.length!==3){CF.log("CFLink.buildMsg: invalid command target. Expected a 3-character string, got: "+d);return false}if(typeof(e)!=="string"||e.length!==3){CF.log("CFLink.buildMsg: invalid command. Expected a 3-character string, got: "+e);return false}return true},attachReplyCallbackByCFLinkID:function(c,b,a){this.callbackAttachments[c]={regex:new RegExp("^\\xF2\\x"+c+"\\xF3R"),callback:b,me:a}},attachReplyCallbackByCommand:function(b,c,a){this.callbackAttachments[b]={regex:new RegExp("\\xF3"+b+"\\xF4"),callback:c,me:a}},removeCallbackByCFLinkID:function(a){delete this.callbackAttachments[a]},removeCallbackByCommand:function(a){delete this.callbackAttachments[a]},removeCallbacksByDevice:function(c){var a=this.callbackAttachments;for(var b in a){if(a.hasOwnProperty(b)&&a[b].me===c){delete a[b]}}},watch:function(e,c,f,d){if(this.eventWatchers[e]===undefined){this.eventWatchers[e]={}}var b;if(c==null){b="all"}else{b=c._$cflinkUID;if(b==undefined){b="cflinkUID."+this.getNextUniqueID();c._$cflinkUID=b}}var a=this.eventWatchers[e];if(a[b]===undefined){a[b]=[]}a[b].push({callback:f,me:d,id:this.nextWatcherID});return this.nextWatcherID++},unwatch:function(g){for(var b in this.eventWatchers){if(this.eventWatchers.hasOwnProperty(b)){var a=this.eventWatchers[b];for(var d in a){if(a.hasOwnProperty(d)){var f=a[d],c,e=f.length;for(c=0;c<e;c++){if(f[c].id===g){f.splice(c,1);return}}}}}}},fire:function(b,e,d){var k=this.eventWatchers[b];if(k!==undefined){var g;if(e==null){g=undefined}else{g=e._$cflinkUID}var f,c,j,h;if(g!==undefined){h=k[g];if(h!==undefined){for(f=0,c=h.length;f<c;f++){if(j===undefined){j=[b,e];j.push.apply(j,d)}h[f].callback.apply(h[f].me,j)}}}h=k.all;if(h!==undefined){for(f=0,c=h.length;f<c;f++){if(j===undefined){j=[b,e];j.push.apply(j,d)}h[f].callback.apply(h[f].me,j)}}}}};CFLink.Device=Class.$extend({__init__:function(d,a,g,f,c,e,b){this.rs232Port=null;this.systemName=d;this.model=a;this.commandPrefix=g;this.cflinkID=f;this.serialNum=c;this.firmwareVer=e;this.protocolVer=b},__del__:function(){CFLink.removeCallbackByCFLinkID(this.cflinkID)},send:function(a,d,c,b){if(a==="Q"&&d==="WHO"){CFLink.buildMsg(this.systemName,this.cflinkID,"Q","CFX","WHO",c)}else{CFLink.buildMsg(this.systemName,this.cflinkID,a,b||this.commandPrefix,d,c)}},getCleanedModelName:function(){return this.model.replace(/[-\s]/,"")},queryConfig:function(){},rebootDevice:function(){this.send("T","RST","")},setCFLinkID:function(b){if(b!=this.cflinkID){this.cflinkID=b;var a=b.toUpperCase();if(this.serialNum!=null){a+=":"+this.serialNum}CFLink.attachReplyCallbackByCFLinkID(b,this.replyData,this);this.send("C","DID",a)}},sendCOMData:function(a){if(this.rs232Port!=null){if(a instanceof Array){a=String.fromCharCode.apply(null,a)}this.send("T","SPW",this.rs232Port.sendDataCommand(a))}},watchCOMPort:function(b,a){return CFLink.watch(CFLink.RS232Port.SERIAL_DATA_RECEIVED,this,function(c,e,d,f){if(d===this.rs232Port){b.apply(a,[this,f])}},this)},configureCOMPort:function(f,a,c,e,b,d){if(this.rs232Port!=null){this.send("C","SPC",this.rs232Port.configureCommand(f,a,c,e,b,d))}},unwatch:function(a){CFLink.unwatch(a)},replyData:function(d,c,b){switch(d[4]){case"WHO":d=d[5].split(":");b.serial=d[1];b.firmwareVer=d[2];b.protocolVer=d[3];CFLink.fire(CFLink.Device.INFO_RECEIVED,b,[]);break;case"DID":var e=d[5].split(":")[0];b.id=d[1].charCodeAt(0).toString(16);CFLink.removeCallbackByCFLinkID(e);CFLink.fire(CFLink.Device.ID_CHANGED,b,[e]);break;case"LDR":d=d[5].split(":");var a=(d[1]==="App_OK");CFLink.fire(CFLink.Device.REBOOTED,b,[a]);break;case"TGT":break;case"SPC":if(b.rs232Port!=null){b.rs232Port.readConfig(b,d[5])}break;case"SPR":if(b.rs232Port!=null){b.rs232Port.serialDataReceived(b,d[5])}break}}});CFLink.Device.ID_CHANGED="CFLinkDevice.IDChange";CFLink.Device.REBOOTED="CFLinkDevice.Reboot";CFLink.Device.INFO_RECEIVED="CFLinkDevice.InfoReceived";CFLink.Module=Class.$extend({__init__:function(b,g,f,a,h,c,e,j){this.systemName=b.systemName;this.deviceID=b.cflinkID;this.model=g;this.commandPrefix=f;this.moduleNum=a;this.moduleString="M"+this.moduleNum;this.IOPorts=[];this.COMPorts=[];this.IRPorts=[];this.Relays=[];var d;for(d=1;d<=h;d++){this.IOPorts.push(new CFLink.IOPort(b,d))}for(d=1;d<=c;d++){this.COMPorts.push(new CFLink.RS232Port(b.cflinkID,this.commandPrefix,d))}for(d=1;d<=e;d++){}for(d=1;d<=j;d++){this.Relays.push(new CFLink.RelayPort(this,d))}},ownsPort:function(a){return(this.IOPorts.indexOf(a)!=-1||this.COMPorts.indexOf(a)!=-1||this.IRPorts.indexOf(a)!=-1||this.Relays.indexOf(a)!=-1)},send:function(a,c,b){CFLink.buildMsg(this.systemName,this.deviceID,a,this.commandPrefix,c,b)},queryConfig:function(){if(this.IOPorts.length){this.send("Q","CFG",this.moduleString);this.send("Q","PRT",this.moduleString);this.send("Q","STA",this.moduleString)}if(this.COMPorts.length){this.send("Q","SPC",this.moduleString)}if(this.Relays.length){this.send("Q","STA",this.moduleString);this.send("Q","POS",this.moduleString)}},_sendPortCommand:function(m,f,k,j,g,a){var d,b,p;if(a===undefined){a="T"}switch(m){case"IOX":p=this.IOPorts;break;case"COM":p=this.COMPorts;break;case"RLY":p=this.Relays;break;case"IRX":p=this.IRPorts;break}if(k instanceof Array){var h,c=k.length,e;d="";for(h=0;h<c;h++){e=k[h];if(CF.debug&&(e<1||e>p.length)){CF.log("Warning: "+this.model+" "+m+" port number "+e+" is not in the range 1-"+p.length);continue}b=p[e-1];if(h>0){d=d+"|"+b[j].apply(b,g)}else{d=b[j].apply(b,g)}}this.send(a,f,this.moduleString+"|"+d)}else{if(CF.debug&&(k<1||k>p.length)){CF.log("Warning: "+this.model+" "+m+" port number "+k+" is not in the range 1-"+p.length);return}b=p[k-1];this.send(a,f,this.moduleString+"|"+b[j].apply(b,g))}},_checkValid:function(e,d,b,a){if(b instanceof Array){for(var c=0;c<b.length;c++){if(!this._checkValid(e,b[c],a)){return false}}}if(b<1||b>e.length){CF.log("Warning: "+this.model+"."+a+": invalid "+d+" index:"+b);return false}return true},_checkValidIOPort:function(b,a){return this._checkValid(this.IOPorts,"I/O port",b,a)},setIOPortValue:function(a,b){if(this._checkValidIOPort(a,"setIOPortValue")){this._sendPortCommand("IOX","SET",a,"setCommand",[(b===true||b===1||b==="1")])}},toggleIOPortValue:function(a){if(this._checkValidIOPort(a,"toggleIOPortValue")){this._sendPortCommand("IOX","SET",a,"toggleCommand",[])}},configureIOPort:function(a,d,b,c){if(this._checkValidIOPort(a,"configureIOPort")){this._sendPortCommand("IOX","PRT",a,"configureCommand",[d,b,c],"C")}},watchIOPorts:function(d,c,b){if(!(d instanceof Array)){d=[d]}var a=CFLink.getDeviceForModulePort(this);return CFLink.watch(CFLink.IOPort.VALUE_CHANGE,a,function(f,h,g,e,i){if(this.IOPorts.indexOf(g)!=-1&&(d==null||d.indexOf(g.portNumber)!=-1)){c.apply(b,[a,this,g.portNumber,e,i])}},this)},_checkValidRelay:function(b,a){return this._checkValid(this.Relays,"relay",b,a)},setRelayState:function(b,a){if(this._checkValidRelay(b,"setRelayState")){this._sendPortCommand("RLY","SET",b,"setCommand",[(a===true||a===1||a==="1")])}},toggleRelayState:function(a){if(this._checkValidRelay(a,"toggleRelayState")){this._sendPortCommand("RLY","SET",a,"toggleCommand",[])}},pulseRelayState:function(a,b){if(this._checkValidRelay(a,"pulseRelayState")){this._sendPortCommand("RLY","SET",a,"pulseCommand",[b])}},configureRelay:function(a,b){if(this._checkValidRelay(a,"configureRelay")){this._sendPortCommand("RLY","POS",a,"configureCommand",[b],"C")}},watchRelays:function(d,c,b){if(!(d instanceof Array)){d=[d]}if(!this._checkValidRelay(d,"watchRelays")){return 0}var a=CFLink.getDeviceForModulePort(this);return CFLink.watch(CFLink.IOPort.VALUE_CHANGE,a,function(f,h,g,e,i){if(this.Relays.indexOf(g)!=-1&&(d==null||d.indexOf(g.portNumber)!=-1)){c.apply(b,[a,this,g.portNumber,e,i])}},this)},unwatch:function(a){CFLink.unwatch(a)},sendCOMData:function(a,b){if(b instanceof Array){b=String.fromCharCode.apply(null,b)}if(this._checkValidCOM(a,"sendCOMData")){this._sendPortCommand("COM","SPW",a,"sendDataCommand",[b])}},configureCOMPort:function(b,g,a,d,f,c,e){this._sendPortCommand("IOX","SPC",b,"configureCommand",[g,a,d,f,c,e],"C")},watchCOMPorts:function(d,c,b){if(!(d instanceof Array)){d=[d]}var a=CFLink.getDeviceForModulePort(this);return CFLink.watch(CFLink.RS232Port.SERIAL_DATA_RECEIVED,a,function(e,g,f,h){if(this.COMPorts.indexOf(f)!=-1&&(d==null||d.indexOf(f.portNumber)!=-1)){c.apply(b,[a,this,f.portNumber,h])}},this)},handleMessage:function(c,d,b,a){switch(c){case"IOX":this.processIOPortReply(d,b,a);break;case"IRX":break;case"COM":this.processCOMPortReply(d,b,a);break;case"RLY":this.processRelayReply(d,b,a);break}},processIOPortReply:function(e,j,b){var k,c,f,a;switch(e){case"CFG":var d=j.split(":");this.IOEnabled=d[1];this.IOReportOnChange=d[2];this.IOReportInterval=parseInt(d[3],10);CFLink.fire(CFLink.Module.IO_CONFIGURATION_CHANGE,b,this);break;case"PRT":k=j.split("|");for(f=1,c=k.length;f<c;f++){var h=k[f].split(":");if(h.length>=4){a=parseInt(h[0].substring(1),10);this.IOPorts[a-1].portConfigurationReceived(b,h[1],h[2],h[3])}}CFLink.fire(CFLink.Module.IOPORT_CONFIGURATION_CHANGE,b,this);break;case"STA":case"CHA":k=j.split("|");c=k.length;for(f=0;f<c;f++){var g=k[f].split(":");a=parseInt(g[0].substring(1),10);if(a>0&&a<=this.IOPorts.length){this.IOPorts[a-1].portValueChanged(b,g[1],parseInt(g[2],10))}}break}},processCOMPortReply:function(d,h,b){var j,c,e,a;switch(d){case"SPC":j=h.split("|");for(e=1,c=j.length;e<c;e++){var f=j[e];var l=f.indexOf(":");if(l>0){a=parseInt(f.substring(1),10);this.COMPorts[a-1].readConfig(this,f.substring(l+1))}}CFLink.fire(CFLink.Module.COMPORT_CONFIGURATION_CHANGE,b,this);break;case"SPR":var k=h;var g=k.indexOf("|");if(g>0){a=parseInt(k.substring(g+2),10);g=k.indexOf(":",g);if(g>0){this.COMPorts[a-1].serialDataReceived(b,k.substring(g+1))}}break}},processRelayReply:function(f,e,d){var a,c,h,b,g;switch(f){case"STA":a=e.split("|");h=a.length;for(c=0;c<h;c++){data=a[c].split(":");if(data.length===2){b=parseInt(data[0].substring(1),10);if(b>=1&&b<=this.Relays.length){g=this.Relays[b-1];g.portValueChanged(d,g.mode,parseInt(data[1],10))}}}break;case"POS":a=e.split("|");h=a.length;for(c=0;c<h;c++){data=a[c].split(":");if(data.length===2){b=parseInt(data[0].substring(1),10);if(b>=1&&b<=this.Relays.length){g=this.Relays[b-1];g.powerOnStateReceived(this,g.mode,parseInt(data[1],10))}}}break;case"TGT":break}}});CFLink.Module.IO_CONFIGURATION_CHANGE="ModuleDevice_IOConfigurationChange";CFLink.Module.IOPORT_CONFIGURATION_CHANGE="ModuleDevice_IOPortConfigurationChange";CFLink.Module.COMPORT_CONFIGURATION_CHANGE="ModuleDevice_COMPortConfigurationChange";CFLink.IOPort=Class.$extend({deviceID:null,portNumber:null,portNumberString:null,mode:null,state:-1,minChange:null,powerOnState:null,__init__:function(c,a,e,b,d){this.systemName=c.systemName;this.deviceID=c.cflinkID;this.cflinkPrefix=c.commandPrefix;this.portNumber=a;this.portNumberString="P"+padBeginning(2,"0",String(a));this.mode=e||CFLink.IOPort.Mode.DRY_CONTACT;this.minChange=b||0;this.powerOnState=d||0;if(this.mode==CFLink.IOPort.Mode.LED_OUTPUT){this.state=CFLink.LEDPort.State.NOT_CHANGING}else{this.state=-1}},portConfigurationReceived:function(c,f,b,e,a){var d=!a&&(this.mode!==f||this.minChange!==b||this.powerOnState!==e);this.mode=f||CFLink.IOPort.Mode.DRY_CONTACT;this.minChange=b||0;this.powerOnState=e||0;if(d){CFLink.fire(CFLink.IOPort.CONFIGURATION_CHANGE,c,[this])}},powerOnStateReceived:function(a,b){if(this.powerOnState!==b){this.powerOnState=b;CFLink.fire(CFLink.IOPort.CONFIGURATION_CHANGE,a,[this])}},portValueChanged:function(b,d,c){if(this.mode!==d||this.state!==c){var a=this.state;this.mode=d;this.state=c;CFLink.fire(CFLink.IOPort.VALUE_CHANGE,b,[this,a,c])}},toggleCommand:function(){return this.portNumberString+":T"},setCommand:function(a){return this.portNumberString+(a?":1":":0")},configureCommand:function(c,a,b){if(c!==CFLink.IOPort.Mode.RESISTANCE_READING&&c!==CFLink.IOPort.Mode.VOLTAGE_READING){a=0;b=0}return[this.portNumberString,c||this.mode,a||this.minChange,b||this.powerOnState].join(":")}});CFLink.IOPort.Mode={DRY_CONTACT:"D",RESISTANCE_READING:"R",VOLTAGE_TRIGGER:"V",VOLTAGE_READING:"A",VIDEO_SENSING:"S",RELAY_CONTROL_OUTPUT:"E",LED_OUTPUT:"L"};CFLink.IOPort.VALUE_CHANGE="IOX_ValueChange";CFLink.IOPort.CONFIGURATION_CHANGE="IOX_ConfigChange";CFLink.LEDPort=CFLink.IOPort.$extend({__init__:function(c,a,b){this.$super(c,a,CFLink.IOPort.Mode.LED_OUTPUT);this.backlight=b;this.state=CFLink.LEDPort.State.NOT_CHANGING;this.level=0},updateLEDState:function(a,b,c){if(this.state!==b||this.level!==c){this.state=b;this.level=c;CFLink.fire(CFLink.LEDPort.STATE_CHANGE,a,[this,b,c])}},pulseLEDCommand:function(a){return this.portNumberString+":P:"+a},rampLEDCommand:function(b,a){return this.portNumberString+":R:"+b+":"+a},blinkLEDCommand:function(e,a,c,d,b){return this.portNumberString+":B:"+e+":"+a+":"+c+":"+d+":"+b},dimLEDCommand:function(e,a,c,d,b){return this.portNumberString+":D:"+e+":"+a+":"+c+":"+d+":"+b}});CFLink.LEDPort.State={UNKNOWN:"?",NOT_CHANGING:"X",BLINKING:"B",PULSING:"P",RAMPING:"R",DIMMING:"D"};CFLink.LEDPort.STATE_CHANGE="LED_StateChange";CFLink.RelayPort=CFLink.IOPort.$extend({__init__:function(b,a){this.$super(b,a,CFLink.IOPort.Mode.RELAY_CONTROL_OUTPUT)},setCommand:function(a){return this.portNumberString+(a?":1":":0")},toggleCommand:function(){return this.portNumberString+":T"},pulseCommand:function(a){return this.portNumberString+":P:"+a},configureCommand:function(){return this.portNumberString+":"+this.powerOnState}});CFLink.RelayPort.PowerOn={OPEN:"0",CLOSED:"1",RESUME:"L"};CFLink.RS232Port=Class.$extend({__init__:function(b,d,c,a){this.systemName=b;this.deviceID=d;this.cflinkPrefix=c||"CFX";this.portNum=a;this.mode=(a==null)?"232":"PGM";this.baud=115200;this.dataBits=8;this.stopBits=1;this.parity="N";this.flowControl=0},readConfig:function(c,b){var a=b.split(":");if(a.length>=6){this.mode=a[0];this.baud=parseInt(a[1],10);this.dataBits=parseInt(a[2],10);this.parity=a[3];this.stopBits=parseInt(a[4],10);this.flowControl=parseInt(a[5],10);CFLink.fire(CFLink.RS232Port.CONFIGURATION_CHANGE,c,[this])}},reconfigurePort:function(){CFLink.buildMsg(this.systemName,this.deviceID,"C",this.cflinkPrefix,"SPC",this.configureCommand())},serialDataReceived:function(a,b){CFLink.fire(CFLink.RS232Port.SERIAL_DATA_RECEIVED,a,[this,b])},setMode:function(b){var a=(this.portNum!==undefined)?CFLink.RS232Port.Valid.Modes_COM.indexOf(b):CFLink.RS232Port.Valid.Modes.indexOf(b);if(a&&this.mode!==b){this.mode=b;this.reconfigurePort()}},setBaud:function(a){if(CFLink.RS232Port.Valid.Bauds.indexOf(a)!==-1&&this.baud!==a){this.baud=a;this.reconfigurePort()}},setParity:function(a){if(CFLink.RS232Port.Valid.Parity.indexOf(a)!==-1){if(this.parity!==a){this.parity=a;this.reconfigurePort()}}else{CF.log("Warning: trying to set invalid parity ("+a+") on RS232 port of device "+this.deviceID)}},setStopBits:function(a){if(CFLink.RS232Port.Valid.StopBits.indexOf(a)!==-1&&this.stopBits!==a){this.stopBits=a;this.reconfigurePort()}},setFlowControl:function(b){var a=b?1:0;if(this.flowControl!==b){this.flowControl=a;this.reconfigurePort()}},sendDataCommand:function(a){if(this.portNum==null){return a}return this.portNum+":"+a},configureCommand:function(f,a,c,e,b,d){if(this.portNum==null){return[f||this.mode,a||this.baud,c||this.dataBits,e||this.parity,b||this.stopBits,d||this.flowControl].join(":")}return[this.portNum,f||this.mode,a||this.baud,c||this.dataBits,e||this.parity,b||this.stopBits,d||this.flowControl].join(":")}});CFLink.RS232Port.Valid={Modes:["OFF","PGM","232"],Modes_COM:["OFF","232","485H","4XXF"],Parity:["N","E","O"],Bauds:[100,300,600,1200,2400,4800,9600,14400,19200,38400,57600,115200,128000,256000],StopBits:[1,2]};CFLink.RS232Port.CONFIGURATION_CHANGE="RS232_ConfigurationChange";CFLink.RS232Port.SERIAL_DATA_RECEIVED="RS232_SerialDataReceived";CFLink.LANBridge=CFLink.Device.$extend({__init__:function(c,f,e){var b,g,a=(e==null);if(a){g=["","","",""]}else{g=e.split(":")}this.$super(c,"LANBridge","LAN",f,g[1],g[2],g[3]);this.ipAddress=g[4];this.subnetMask="255.255.255.0";this.gateway=null;this.dns=null;this.macAddress=g[5];this.DHCPEnabled=1;this.slots=[];this.schedules=[];this.time=Date.now();this.rs232Port=new CFLink.RS232Port(c,f,"LAN");this.broadcastEnabled=0;this.slots[0]=new CFLink.LANBridge.Slot(c,f,"LAN",1,true,"cflink");this.slots[1]=new CFLink.LANBridge.Slot(c,f,"LAN",2,true,"pgm");this.slots[2]=new CFLink.LANBridge.Slot(c,f,"LAN",3,true,"udp","b","255.255.255.255",10207);for(b=3;b<=20;b++){this.slots[b]=new CFLink.LANBridge.Slot(c,f,"LAN",b+1,false)}CFLink.attachReplyCallbackByCFLinkID(f,this.replyData,this);if(a){this.send("Q","WHO","")}this.send("Q","CFG","");this.send("Q","TME","");for(b=1;b<=20;b++){if(b<=3||b>=11){var d=String(b);this.send("Q","SLT",d);this.send("Q","SUB",d)}}},getInfo:function(){this.send("Q","WHO","")},setCFLinkID:function(c){this.$super(c);var a,b;for(a=0,b=this.slots.length;a<b;a++){this.slots[a].deviceID=c}this.rs232Port.deviceID=c},setDHCP:function(a){this.send("C","DHC",a?1:0)},setIP:function(a){this.send("C","IP4",a)},setSubnetMask:function(a){this.send("C","SNM",a)},setGateway:function(a){this.send("C","GTW",a)},setBroadcasting:function(a){this.send("C","UDB",a?1:0)},setTime:function(d,g,b,f,a,h,c,e){this.send("C","TME",d+":"+g+":"+b+":"+f+":"+a+":"+h+":"+c+":"+e)},getSlot:function(a){return this.slots[a]},sendData:function(a,b){if(a===2){this.send("T","SPW",b)}else{if(a===1||(a>=11&&a<=20)){this.send("T","SND",String(a)+":"+b)}}},replyData:function(e,c,b){var a;switch(e[4]){case"CFG":a=e[5].split(":");if(a.length>=12){b.ipAddress=a[0];b.subnetMask=a[1];b.gateway=a[2];b.dns=a[3];b.DHCPEnabled=parseInt(a[4],10);b.rs232Port.readConfig(b,a.slice(5,11).join(":"));b.broadcastEnabled=parseInt(a[11],10);b.slotsEnabled=parseInt(a[12],10);CFLink.fire(CFLink.LANBridge.CONFIGURATION_CHANGE,b,[])}break;case"SLT":a=e[5].split(":");if(a[1]=="UDP"&&a.length>=5){b.slots[a[0]].readConfig(b,a[1],a[2],a[3],a[4])}else{if(a[1]=="TCP"&&a.length>=8){b.slots[a[0]].readConfig(b,a[1],a[2],a[3],a[4],a[5],a[6],a[7])}else{if(a[1]=="OFF"&&a.length>=2){b.slots[a[0]].readConfig(b,a[1])}}}break;case"SUB":a=e[5].split(":");var f=b.slots[a[0]].subscription;f.targetSlot=a[1];f.cflinkID=a[2];f.module=a[3];f.txCommandName=a[4];f.rxCommandName=a[5];break;case"UDB":var d=parseInt(e[5],10);if(d!==b.broadcastEnabled){b.broadcastEnabled=d;CFLink.fire(CFLink.LANBridge.CONFIGURATION_CHANGE,this,[])}break;case"SPC":b.rs232Port.readConfig(b,e[5]);break;case"WHO":a=e[5].split(":");b.serial=a[1];b.firmwareVer=a[2];b.protocolVer=a[3];b.ipAddress=a[4];b.macAddress=a[5];CFLink.fire(CFLink.Device.INFO_RECEIVED,b,[]);break;default:this.$super(e,c,b);break}}});CFLink.LANBridge.Slot=Class.$extend({__init__:function(l,g,j,d,f,h,e,i,c,k,a,b){this.systemName=l;this.deviceID=g;this.cflinkPrefix=j;this.slotNum=padBeginning(2,"0",String(d));this.enabled=f||true;this.type=h||"OFF";this.mode=e||"";this.ipAddress=i||"0.0.0.0";this.port=c||0;this.timeout=k||0;this.maxConnections=a||0;this.echo=b||false;this.subscription={targetSlot:undefined,cflinkID:undefined,module:undefined,txCommandName:undefined,rxCommandName:undefined}},readConfig:function(a,f,e,g,d,i,b,c){var h=(this.type!==f);this.type=f;if(this.mode!=="OFF"){h|=(this.mode!==e||this.ipAddress!==g||this.port!==d||this.enabled!==true);this.enabled=true;this.mode=e;this.ipAddress=g;this.port=d;if(f==="TCP"){h|=(this.timeout!==i||this.maxConnections!==b||this.echo!==c);this.timeout=i;this.maxConnections=b;this.echo=c}}else{h=(this.enabled!==false);this.enabled=false}if(h){CFLink.fire(CFLink.LANBridge.Slot.CONFIGURATION_CHANGE,a,[this])}},configureForTCP:function(g,d,b,e,c,a){var f=padBeginning(2,"0",String(this.slotNum))+":"+g+":"+d+":"+b+":"+e+":"+c+":"+((a===0||a===false)?"1":"0");CFLink.buildMsg(this.systemName,this.deviceID,"C",this.cflinkPrefix,"SLT",f)},configureForUDP:function(d,b,a){var c=[padBeginning(2,"0",String(this.slotNum)),d,b,a].join(":");CFLink.buildMsg(this.systemName,this.deviceID,"C",this.cflinkPrefix,"SLU",c)},disableSlot:function(){CFLink.buildMsg(this.systemName,this.deviceID,"C",this.cflinkPrefix,"SLO","")},unbridge:function(){var a=this.slotNum;if(!(a===2||(a>=11&&a<=20))){CFLink.buildMsg(this.systemName,this.deviceID,"C",this.cflinkPrefix,"SUB",a+":0")}else{if(CF.debug){CF.log("Disallowed change: trying to unsubscribe slot "+slotNumber+" of device ID "+this.deviceID)}}},bridge:function(a,d,c,b,e){if(a!=null){var f=[this.slotNum,a,d,c,b,e].join(":");CFLink.buildMsg(this.systemName,this.deviceID,"C",this.cflinkPrefix,"SUB",f)}else{CF.log("Error: invalid target slot while bridging slot "+this.slotNum+" of device "+this.deviceID)}}});CFLink.LANBridge.Slot.CONFIGURATION_CHANGE="CommSlot_ConfigChange";CFLink.LANBridge.CONFIGURATION_CHANGE="LANBridge_ConfigChange";CFLink.DINMOD4=CFLink.Device.$extend({__init__:function(a,e,b){this.rs232Port=new CFLink.RS232Port(a,e);this.digitalInput=new CFLink.IOPort(this,1,CFLink.IOPort.Mode.DRY_CONTACT,0,0);this.modules=[null,null,null,null];var d,c;if(b==null){c=[];d=["","","",""]}else{c=b.split(",");d=(c.length>0)?c[0].split(":"):["","","",""]}this.$super(a,"DIN-MOD4","MOD",e,d[1],d[2],d[3]);this._instantiateModules(c);CFLink.attachReplyCallbackByCFLinkID(e,this.replyData,this);if(b==null||d[1]===""){this.send("Q","WHO","")}this.queryConfig()},getModule:function(a){if(a>=1&&a<=this.modules.length){return this.modules[a-1]}return null},_makeModule:function(d,g,h,e,c,b,f){var a=this.modules[h-1];if(a!=null){if(a.model==d){if(CF.debug){CF.log("Auto-instantiated module "+d+" in DIN-MOD4 "+this.cflinkID+" slot "+h+" was found.")}return a}if(CF.debug){CF.log("Warning: module in DIN-MOD4 ID "+this.cflinkID+" expected to be "+a.model+", but actually found a "+d+".")}}return new CFLink.Module(this,d,g,h,e,c,b,f)},_instantiateModules:function(d){for(var b=1;b<d.length;b++){var a=d[b].split(":");var e=parseInt(a[0].charAt(1),10);var c=this.modules[e-1];switch(a[1]){case"MOD-IR8":c=this._makeModule("IR8","IRX",e,0,0,8,0);break;case"MOD-IO8":c=this._makeModule("IO8","IOX",e,8,0,0,0);break;case"MOD-COM4":c=this._makeModule("COM4","COM",e,0,4,0,0);break;case"MOD-LRY8":c=this._makeModule("LRY8","RLY",e,0,0,0,8);break;case"MOD-SSRY4":c=this._makeModule("SSRY4","RLY",e,0,0,0,4);break;case"MOD-RY4":c=this._makeModule("RY4","RLY",e,0,0,0,4);break;case"MOD-HRY2":c=this._makeModule("HRY2","RLY",e,0,0,0,2);break}if(c!=null){this.modules[e-1]=c;c.queryConfig()}}},queryConfig:function(){this.send("Q","SPC","")},_handleModuleMessage:function(d,e,c,b){if(c!=null&&c.length&&c.charAt(0)==="M"){var f=parseInt(c.charAt(1),10);if(f>0&&f<=b.modules.length){var a=b.modules[f-1];if(a!==undefined){a.handleMessage(d,e,c,b)}}}},replyData:function(d,c,b){var f,a;switch(d[3]){case"MOD":switch(d[4]){case"CHA":case"STA":f=d[5].split(":");if(f.length===2&&f[0]==="P01"){b.digitalInput.portValueChanged(b,CFLink.IOPort.Mode.DRY_CONTACT,parseInt(f[1],10))}break;case"WHO":b._instantiateModules(d[5].split(","));this.$super(d,c,b);break;default:this.$super(d,c,b);break}break;case"IOX":case"COM":case"IRX":b._handleModuleMessage(d[3],d[4],d[5],b);break;case"RLY":var e=d[5].split(",");for(a=0;a<e.length;a++){b._handleModuleMessage(d[3],d[4],e[a],b)}break;default:this.$super(d,c,b);break}},getDigitalInputState:function(){return this.digitalInput.state},watchOnboardDigitalInput:function(b,a){return CFLink.watch(CFLink.IOPort.VALUE_CHANGE,this,function(d,f,e,c,g){if(e==this.digitalInput){b.apply(a,[this,e.portNumber,c,g])}},this)},unwatch:function(a){CFLink.unwatch(a)}});CFLink.CFMini=CFLink.Device.$extend({__init__:function(c,f,d){var b,e,a=(d==null);if(a){e=["","","",""]}else{e=d.split(":")}this.$super(c,"CFMini","MIN",f,e[1],e[2],e[3]);this.rs232Port=new CFLink.RS232Port(c,f);this.IOEnabled=1;this.IOReportOnChange=1;this.IOReportInterval=0;this.IOPorts=[];this.Relays=[];this.IRPorts=[];for(b=1;b<=4;b++){this.IOPorts.push(new CFLink.IOPort(this,b))}for(b=1;b<=4;b++){this.Relays.push(new CFLink.RelayPort(this,b))}for(b=1;b<=8;b++){this.IRPorts.push(new CFLink.IOPort(this,b))}CFLink.attachReplyCallbackByCFLinkID(f,this.replyData,this);if(a){this.send("Q","WHO","")}this.send("Q","SPC","");CFLink.buildMsg(this.systemName,this.cflinkID,"Q","IOX","CFG","");CFLink.buildMsg(this.systemName,this.cflinkID,"Q","IOX","PRT","");CFLink.buildMsg(this.systemName,this.cflinkID,"Q","IOX","STA","");CFLink.buildMsg(this.systemName,this.cflinkID,"Q","RLY","STA","");CFLink.buildMsg(this.systemName,this.cflinkID,"Q","RLY","POS","")},getIOPort:function(a){return this.IOPorts[a-1]},_sendPortCommand:function(m,f,k,j,g,a){var d,b,p;if(a===undefined){a="T"}switch(m){case"IOX":p=this.IOPorts;break;case"RLY":p=this.Relays;break;case"IRX":p=this.IRPorts;break}if(k instanceof Array){var h,c=k.length,e;d="";for(h=0;h<c;h++){e=k[h];if(CF.debug&&(e<1||e>p.length)){CF.log("Warning: CFMini "+m+" port number "+e+" is not in the range 1-"+p.length);continue}b=p[e-1];if(h>0){d=d+"|"+b[j].apply(b,g)}else{d=b[j].apply(b,g)}}this.send(a,f,d,m)}else{if(CF.debug&&(k<1||k>p.length)){CF.log("Warning: "+this.model+" "+m+" port number "+k+" is not in the range 1-"+p.length);return}b=p[k-1];this.send(a,f,b[j].apply(b,g),m)}},_checkValid:function(e,d,b,a){if(b instanceof Array){for(var c=0;c<b.length;c++){if(!this._checkValid(e,b[c],a)){return false}}}if(b<1||b>e.length){CF.log("Warning: "+this.model+"."+a+": invalid "+d+" index:"+b);return false}return true},configureInputOutputs:function(a,g,f){var d=(a||false)?1:0;var c=(g||false)?1:0;var b=Math.floor(Math.max(0,Math.min(f,99999)));CFLink.buildMsg(this.systemName,this.cflinkID,"C","IOX","CFG",d+":"+c+":"+b)},_checkValidIO:function(b,a){if(b<=1||b>this.IOPorts.length){CF.log("Warning: CFMini "+a+": invalid I/O port index ("+b+")");return false}return true},_checkOutputIO:function(c,b){var a=this.IOPorts[c-1];if(a.mode!==CFLink.IOPort.Mode.RELAY_CONTROL_OUTPUT&&a.mode!==CFLink.IOPort.Mode.LED_OUTPUT){CF.log("Warning: CFMini "+b+": port "+c+" is not configured for output");return false}return true},configureIOPort:function(a,d,b,c){if(this._checkValidIO(a,"configureIOPort")){this._sendPortCommand("IOX","PRT",a,"configureCommand",[d,b,c],"C")}},setIOPortValue:function(a,b){if(this._checkValidIO(a,"setIOPortValue")&&this._checkOutputIO(a,"setIOPortValue")){this._sendPortCommand("IOX","SET",a,"setCommand",[(b===true||b===1||b==="1")])}},toggleIOPortValue:function(a){if(this._checkValidIO(a,"toggleIOPortValue")&&this._checkOutputIO(a,"toggleIOPortValue")){this._sendPortCommand("IOX","SET",a,"toggleCommand",[])}},watchIOPorts:function(c,b,a){if(!(c instanceof Array)){c=[c]}return CFLink.watch(CFLink.IOPort.VALUE_CHANGE,this,function(e,g,f,d,h){if(this.IOPorts.indexOf(f)!=-1&&(c==null||c.indexOf(f.portNumber)!=-1)){b.apply(a,[this,f.portNumber,d,h])}},this)},unwatch:function(a){CFLink.unwatch(a)},_checkValidRelay:function(b,a){if(b<1||b>this.Relays.length){CF.log("Warning: CFMini "+a+": invalid relay index ("+b+")");return false}return true},getRelayPort:function(a){return this.Relays[a-1]},setRelayState:function(a,b){if(this._checkValidRelay(a,"setRelayState")){this._sendPortCommand("RLY","SET",a,"setCommand",[(b===true||b===1||b==="1")])}},toggleRelayState:function(a){if(this._checkValidRelay(a,"toggleRelayState")){this._sendPortCommand("RLY","SET",a,"toggleCommand",[])}},pulseRelayState:function(a,b){if(this._checkValidRelay(a,"pulseRelayState")){this._sendPortCommand("RLY","SET",a,"pulseCommand",[b])}},getRelayState:function(a){if(this._checkValidRelay(a,"getRelayState")){return this.Relays[a-1].state}return 0},watchRelays:function(c,b,a){if(!(c instanceof Array)){c=[c]}return CFLink.watch(CFLink.IOPort.VALUE_CHANGE,this,function(e,g,f,d,h){if((f instanceof CFLink.RelayPort)&&(c==null||c.indexOf(f.portNumber)!=-1)){b.apply(a,[this,f.portNumber,d,h])}},this)},replyData:function(f,o,j){var g,d,p,a;switch(f[4]){case"SPC":j.rs232Port.readConfig(j,f[5]);break;case"CFG":p=f[5].split(":");if(p.length>=4){var h=parseInt(p[1],10);var e=parseInt(p[2],10);var q=parseInt(p[3],10);if(j.IOEnabled!==h||j.IOReportOnChange!==e||j.IOReportInterval!==q){j.IOEnabled=h;j.IOReportOnChange=e;j.IOReportInterval=q;CFLink.fire(CFLink.CFMini.CONFIGURATION_CHANGE,j,[])}}break;case"PRT":p=f[5].split("|");d=p.length;if(d>=5){for(g=0;g<d;g++){var m=p[g].split(":");if(m.length>=4){a=parseInt(m[0].substring(1),10);if(a>0&&a<=j.IOPorts.length){j.IOPorts[a-1].portConfigurationReceived(j,m[1],m[2],m[3])}}}}break;case"STA":case"CHA":p=f[5].split("|");d=p.length;var b=(f[3]!=="IOX");var c=b?j.Relays:j.IOPorts;for(g=0;g<d;g++){var l=p[g].split(":");a=parseInt(l[0].substring(1),10)-1;if(a>=0&&a<c.length){if(b){c[a].portValueChanged(j,CFLink.IOPort.Mode.RELAY_CONTROL_OUTPUT,parseInt(l[1],10))}else{c[a].portValueChanged(j,l[1],parseInt(l[2],10))}}}break;case"POS":p=f[5].split("|");d=p.length;for(g=0;g<d;g++){var k=p[g].split(":");a=parseInt(k[0].substring(1),10);if(a>0&&a<=j.Relays.length){j.Relays[a-1].powerOnStateReceived(k[1])}}break;default:this.$super(f,o,j);break}}});CFLink.CFMini.CONFIGURATION_CHANGE="Mini_ConfigurationUpdated";CFLink.IRBlaster=CFLink.Device.$extend({__init__:function(b,e,c){var d,a=(c==null);if(a){d=["","","",""]}else{d=c.split(":")}this.$super(b,"IRBlaster","IRB",e,d[1],d[2],d[3]);CFLink.attachReplyCallbackByCFLinkID(e,this.replyData,this);if(a){this.send("Q","WHO","")}},sendDatabaseCode:function(b,d,a,c){this.send("T","SND",b+":DBA:"+d+":"+a+":"+c)},sendRawCode:function(b,a){this.send("T","SND",b+":RAW:"+a)},sendCFCode:function(b,a){this.send("T","SND",b+":STR:"+a)},watchIncomingIR:function(a,c,b){return CFLink.watch(CFLink.IRBlaster.IR_CODE_RECEIVED,this,function(d,e,f,g){if(f==a||a==CFLink.IRBlaster.BOTH){c.apply(b,[e,f,g])}},this)},unwatch:function(a){CFLink.unwatch(a)},replyData:function(c,b,a){if(c[4]==="RCV"){CFLink.fire(CFLink.IRBlaster.IR_CODE_RECEIVED,a,c[5].split(":"))}else{this.$super(c,b,a)}}});CFLink.IRBlaster.IR_CODE_RECEIVED="IRBlaster_IRCodeReceived";CFLink.IRBlaster.Port={INTERNAL:"P01",EXTERNAL:"P02",BOTH:"PZZ"};CFLink.IRBlaster.Format={DB:"DBA",Memory:"MEM",Raw:"RAW",CF:"STR"};CFLink.SW16=CFLink.Device.$extend({__init__:function(c,f,d){var b,e,a=(d==null);if(a){e=["","","",""]}else{e=d.split(":")}this.$super(c,"SW16","SWX",f,e[1],e[2],e[3]);this.dryContacts=[];this.LEDs=[];this.backlightLEDs=[];this.enabled=1;for(b=0;b<16;b++){this.dryContacts[b]=-1;this.LEDs.push(new CFLink.LEDPort(this,b+1,false))}for(b=1;b<=4;b++){this.backlightLEDs.push(new CFLink.LEDPort(this,b,true))}CFLink.attachReplyCallbackByCFLinkID(f,this.replyData,this);if(a){this.send("Q","WHO","")}this.readStatus()},getDryContactState:function(a){return this.dryContacts[a-1]},getDryContactStates:function(){return new Array(this.dryContacts)},getLED:function(a){return this.LEDs[a-1]},getBacklightLED:function(a){return this.backlightLEDs[a-1]},readStatus:function(){this.send("Q","STA","");this.send("Q","LED","");this.send("Q","BKL","")},_processReplyData:function(c,e){var b=c.split("|");var d,g,a,f=b.length;for(a=0;a<f;a++){d=b[a].split(":");g=parseInt(d[0].substring(1),10)-1;e(g,d)}},replyData:function(d,b,a){var f,c,e;switch(d[4]){case"STA":a._processReplyData(d[5],function(h,g){f=parseInt(g[1],10);if(a.dryContacts[h]!==f){a.dryContacts[h]=f;CFLink.fire(CFLink.SW16.DRY_CONTACT_CHANGE,a,[h+1,f])}});break;case"CHA":c=d[5].split(":");e=parseInt(c[0].substring(1),10)-1;f=parseInt(c[1],10);if(f!==a.dryContacts[e]){a.dryContacts[e]=f;CFLink.fire(CFLink.SW16.DRY_CONTACT_CHANGE,a,[e+1,f])}break;case"LED":a._processReplyData(d[5],function(h,g){a.LEDs[h].updateLEDState(a,g[1],parseInt(g[2],10))});break;case"BKL":a._processReplyData(d[5],function(h,g){a.backlightLEDs[h].updateLEDState(a,g[1],parseInt(g[2],10))});break;default:this.$super(d,b,a);break}},_sendLEDCommand:function(j,h,e,f){var c,a,k=(j==="LED")?this.LEDs:this.backlightLEDs;if(h instanceof Array){var g,b=h.length,d;c="";for(g=0;g<b;g++){d=h[g];if(CF.debug&&(d<1||d>k.length)){CF.log("Warning: SW16 "+(j=="LED"?"LED":"Backlight LED")+" number "+d+" is not in the range 1-"+k.length);continue}a=k[d-1];if(g>0){c=c+"|"+a[e].apply(a,f)}else{c=a[e].apply(a,f)}}this.send("T",j,c)}else{if(CF.debug&&(h<1||h>k.length)){CF.log("Warning: SW16 "+(j=="LED"?"LED":"Backlight LED")+" number "+h+" is not in the range 1-"+k.length);return}a=k[h-1];this.send("T",j,a[e].apply(a,f))}},toggleLED:function(a){this._sendLEDCommand("LED",a,"toggleCommand",[])},setLED:function(b,a){this._sendLEDCommand("LED",b,"setCommand",[(a===true||a===1||a==="1")])},pulseLED:function(a,b){this._sendLEDCommand("LED",a,"pulseLEDCommand",[b])},rampLED:function(a,c,b){this._sendLEDCommand("LED",a,"rampLEDCommand",[c,b])},dimLED:function(b,f,a,c,e,d){this._sendLEDCommand("LED",b,"dimLEDCommand",[f,a,c,e,d])},blinkLED:function(c,f,b,a,d,e){this._sendLEDCommand("LED",c,"blinkLEDCommand",[f,b,a,d,e])},toggleBacklightLED:function(a){this._sendLEDCommand("BKL",a,"toggleCommand",[])},setBacklightLED:function(b,a){this._sendLEDCommand("BKL",b,"setCommand",[(a===true||a===1||a==="1")])},pulseBacklightLED:function(a,b){this._sendLEDCommand("BKL",a,"pulseLEDCommand",[b])},rampBacklightLED:function(a,c,b){this._sendLEDCommand("BKL",a,"rampLEDCommand",[c,b])},dimBacklightLED:function(b,f,a,c,e,d){this._sendLEDCommand("BKL",b,"dimLEDCommand",[f,a,c,e,d])},blinkBacklightLED:function(c,f,b,a,d,e){this._sendLEDCommand("BKL",c,"blinkLEDCommand",[f,b,a,d,e])},watchContacts:function(b,c,a){return CFLink.watch(CFLink.SW16.DRY_CONTACT_CHANGE,this,function(d,e,g,f){if(b==null||b.hasOwnProperty(g)){c.apply(a,[this,g,f])}},this)},unwatchContacts:function(a){CFLink.unwatch(a)}});CFLink.SW16.DRY_CONTACT_CHANGE="SW16_DryContactChange";