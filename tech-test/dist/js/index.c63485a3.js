(function(e){function t(t){for(var s,r,u=t[0],o=t[1],l=t[2],c=0,d=[];c<u.length;c++)r=u[c],i[r]&&d.push(i[r][0]),i[r]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);m&&m(t);while(d.length)d.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],s=!0,u=1;u<a.length;u++){var o=a[u];0!==i[o]&&(s=!1)}s&&(n.splice(t--,1),e=r(r.s=a[0]))}return e}var s={},i={index:0},n=[];function r(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=s,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(a,s,function(t){return e[t]}.bind(null,s));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],o=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var m=o;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"1bf9":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var s=a("2b0e"),i=a("5f5b"),n=(a("f9e3"),a("2dd8"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("header",[a("Header")],1),a("main",[a("Main")],1)])}),r=[],u=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"header-container"}},[s("div",{staticClass:"logo-container"},[s("img",{attrs:{src:a("f60c")}})]),s("div",{staticClass:"title-container"},[s("span",{staticClass:"description"},[e._v("Technical Test")])])])}],l=(a("ccf4"),a("2877")),m={},c=Object(l["a"])(m,u,o,!1,null,"78c332de",null),d=c.exports,p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{attrs:{id:"form-page-container"}},[a("b-container",[a("b-row",[a("div",{staticClass:"form-container"},[e._l(e.formFields,function(t,s){return a("form",{staticClass:"page",class:e.pagePosition(s),on:{submit:function(t){return t.preventDefault(),e.nextPage()}}},[a("div",{staticClass:"page-title"},[e._v(e._s(t.title))]),a("div",{staticClass:"page-description"},[e._v(e._s(t.description))]),e._l(t.data,function(s){return a("b-input-group",{class:"about-you"===t.name?"full-height":""},[a("label",{directives:[{name:"show",rawName:"v-show",value:"summary"!==t.name,expression:"page.name !== 'summary'"}],staticClass:"input-label"},[e._v(e._s(s.label))]),a("span",{directives:[{name:"show",rawName:"v-show",value:s.required,expression:"input.required"}],staticClass:"required-identifier"},[e._v("*")]),"checkbox"===s.type&&"about-you"!==t.name?a("input",{directives:[{name:"show",rawName:"v-show",value:"summary"!==t.name,expression:"page.name !== 'summary'"},{name:"model",rawName:"v-model",value:e.submittedData[s.name],expression:"submittedData[input.name]"}],staticClass:"form-control tech-input",attrs:{name:s.name,required:s.required,pattern:s.pattern,title:s.title,type:"checkbox"},domProps:{checked:Array.isArray(e.submittedData[s.name])?e._i(e.submittedData[s.name],null)>-1:e.submittedData[s.name]},on:{keyup:function(a){"git_profile"===t.name&&e.searchGithub(a)},change:function(t){var a=e.submittedData[s.name],i=t.target,n=!!i.checked;if(Array.isArray(a)){var r=null,u=e._i(a,r);i.checked?u<0&&e.$set(e.submittedData,s.name,a.concat([r])):u>-1&&e.$set(e.submittedData,s.name,a.slice(0,u).concat(a.slice(u+1)))}else e.$set(e.submittedData,s.name,n)}}}):"radio"===s.type&&"about-you"!==t.name?a("input",{directives:[{name:"show",rawName:"v-show",value:"summary"!==t.name,expression:"page.name !== 'summary'"},{name:"model",rawName:"v-model",value:e.submittedData[s.name],expression:"submittedData[input.name]"}],staticClass:"form-control tech-input",attrs:{name:s.name,required:s.required,pattern:s.pattern,title:s.title,type:"radio"},domProps:{checked:e._q(e.submittedData[s.name],null)},on:{keyup:function(a){"git_profile"===t.name&&e.searchGithub(a)},change:function(t){return e.$set(e.submittedData,s.name,null)}}}):"about-you"!==t.name?a("input",{directives:[{name:"show",rawName:"v-show",value:"summary"!==t.name,expression:"page.name !== 'summary'"},{name:"model",rawName:"v-model",value:e.submittedData[s.name],expression:"submittedData[input.name]"}],staticClass:"form-control tech-input",attrs:{name:s.name,required:s.required,pattern:s.pattern,title:s.title,type:s.type},domProps:{value:e.submittedData[s.name]},on:{keyup:function(a){"git_profile"===t.name&&e.searchGithub(a)},input:function(t){t.target.composing||e.$set(e.submittedData,s.name,t.target.value)}}}):e._e(),a("textarea",{directives:[{name:"show",rawName:"v-show",value:"about-you"===t.name,expression:"page.name === 'about-you'"},{name:"model",rawName:"v-model",value:e.submittedData[s.name],expression:"submittedData[input.name]"}],staticClass:"form-control tech-input",attrs:{name:s.name,required:s.required},domProps:{value:e.submittedData[s.name]},on:{input:function(t){t.target.composing||e.$set(e.submittedData,s.name,t.target.value)}}}),a("div",{directives:[{name:"show",rawName:"v-show",value:"summary"===t.name,expression:"page.name === 'summary'"}],attrs:{id:"final-summary"}},[a("div",{staticClass:"summary-item"},[a("span",{staticClass:"summary-label"},[e._v("Name: ")]),a("span",{staticClass:"summary-value"},[e._v(e._s(e.submittedData.first_name)+" "+e._s(e.submittedData.last_name))])]),a("div",{staticClass:"summary-item"},[a("span",{staticClass:"summary-label"},[e._v("Email: ")]),a("span",{staticClass:"summary-value"},[e._v(e._s(e.submittedData.email))])]),a("div",{staticClass:"summary-item"},[a("span",{staticClass:"summary-label"},[e._v("Phone: ")]),a("span",{staticClass:"summary-value"},[e._v(e._s(e.submittedData.phone_number))])]),a("div",{staticClass:"summary-item"},[a("span",{staticClass:"summary-label"},[e._v("Live in the uk: ")]),a("span",{staticClass:"summary-value"},[e._v(e._s(e.submittedData.live_in_uk))])]),a("div",{staticClass:"summary-item"},[a("span",{staticClass:"summary-label"},[e._v("Git Profile: ")]),a("span",{staticClass:"summary-value"},[e._v(e._s(e.submittedData.git_profile))])]),a("div",{staticClass:"summary-item"},[a("span",{staticClass:"summary-label"},[e._v("CV attached: ")]),a("span",{staticClass:"summary-value"},[e._v(e._s(e.submittedData.cv))])]),a("div",{staticClass:"summary-item"},[a("span",{staticClass:"summary-label"},[e._v("Cover letter attached: ")]),a("span",{staticClass:"summary-value"},[e._v(e._s(e.submittedData.cover_letter))])]),a("div",{staticClass:"summary-item"},[a("span",{staticClass:"summary-label"},[e._v("About you: ")]),a("span",{staticClass:"summary-value"},[e._v(e._s(e.submittedData.about_you))])])])])}),"git_profile"===t.name?a("div",{attrs:{id:"githubResults"}},[e._l(e.github.response,function(t){return a("div",{staticClass:"row github-hit",class:e.github.selectedId===t.id?"selected":"",on:{click:function(a){return e.saveGithubProfile(t.id,t.html_url)}}},[a("b-col",{attrs:{sm:"2"}},[a("img",{staticClass:"github-avatar",attrs:{src:t.avatar_url}})]),a("b-col",{attrs:{sm:"10"}},[a("div",{staticClass:"login-name"},[e._v(e._s(t.login))]),a("div",{staticClass:"html-url"},[e._v(e._s(t.html_url))])])],1)}),a("div",{directives:[{name:"show",rawName:"v-show",value:!1===e.github.searching&&!1===e.github.showValidationError,expression:"github.searching === false && github.showValidationError === false"}],staticClass:"searchMessage"},[0===e.github.response.length&&""!==e.github.searchTerm?a("span",[e._v("\n\t\t\t\t\t\t\t\t\tUnfortunately, the username specified did not return any results\n\t\t\t\t\t\t\t\t")]):""===e.github.searchTerm?a("span",[e._v("\n\t\t\t\t\t\t\t\t\tPlease use the search box to find your profile by typing in your username\t\n\t\t\t\t\t\t\t\t")]):e._e()]),a("div",{directives:[{name:"show",rawName:"v-show",value:!0===e.github.searching,expression:"github.searching === true"}],staticClass:"please-wait"},[a("i",{staticClass:"rotate fas fa-spinner"}),a("br"),a("span",[e._v("SEARCHING")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.github.showValidationError,expression:"github.showValidationError"}],attrs:{id:"githubValidationError"}},[a("span",{staticClass:"validationErrorMessage"},[e._v("Please use the search box above to find your username and select your profile to continue")]),a("input",{attrs:{type:"button",value:"OK"},on:{click:function(t){return e.hideGithubMessage()}}})])],2):e._e(),a("button",{staticClass:"btn btn-success next-button",attrs:{type:"submit"},on:{click:function(a){"summary"===t.name&&e.submitData()}}},["summary"!==t.name?a("i",{staticClass:"fas fa-chevron-right"}):a("div",[e._v("FINISH")])]),a("button",{directives:[{name:"show",rawName:"v-show",value:0!==s,expression:"index !== 0"}],staticClass:"btn btn-info prev-button",on:{click:function(t){return t.preventDefault(),e.prevPage()}}},[a("i",{staticClass:"fas fa-chevron-left"})])],2)}),a("div",{directives:[{name:"show",rawName:"v-show",value:e.finished,expression:"finished"}],attrs:{id:"final"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.finalise.dataSending,expression:"finalise.dataSending"}],staticClass:"finalMessage"},[a("i",{staticClass:"rotate fas fa-spinner"}),a("br"),a("span",[e._v("THANK YOU!")]),a("span",[e._v("Please wait while your information is submitted")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.finalise.dataSubmitted,expression:"finalise.dataSubmitted"}],staticClass:"finalMessage"},[a("span",[e._v(e._s(e.response.message))]),a("span",[e._v(e._s(e.response.description))])])])],2),a("br")])],1)],1)},h=[],v=(a("7f7f"),[{name:"your-details",title:"About you",description:"Let us know who you are and how to contact you",data:[{element:"input",name:"first_name",label:"First name",type:"text",required:!0,pattern:"[A-Za-z ]+",dataTarget:"first_name"},{element:"input",name:"last_name",label:"Last name",type:"text",required:!1,pattern:"[A-Za-z ]+",dataTarget:"last_name"},{element:"input",name:"email",label:"Email",type:"email",required:!0,pattern:"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$",dataTarget:"email"},{element:"input",name:"phone_number",label:"Phone number",type:"tel",required:!1,dataTarget:"phone_number"},{element:"input",name:"live_in_uk",label:"Do you live in the uk?",type:"checkbox",required:!0,dataTarget:"live_in_uk"}]},{name:"git_profile",title:"Git profile",description:"Search for your profile and add it to the form",data:[{element:"input",name:"git_profile",label:"Git profile",type:"search",required:!1,dataTarget:"git_profile",title:"Please search for and select your github profile before continuing"}]},{name:"add-files",title:"Add your CV and Cover Letter",description:"Upload the most recent version of your CV and cover letter",data:[{element:"input",name:"cv",label:"Upload CV",type:"file",required:!0},{element:"input",name:"cover_letter",label:"Upload Cover Letter",type:"file",required:!0}]},{name:"about-you",title:"About you",description:"Give us a brief description about yourself",data:[{element:"input",name:"about_you",label:"About you",type:"text",required:!0,dataTarget:"about_you"}]},{name:"summary",title:"Almost there",description:"Please check your details below. If you're happy, click FINISH",data:[{element:"div",name:"summary",label:"summary",type:"text",required:!1,dataTarget:""}]}]),b=a("bc3a"),f=a.n(b),g={data:function(){return{formFields:v,dataReady:!1,currentPage:0,submittedData:{first_name:"",last_name:"",email:"",phone_number:"",live_in_uk:!1,git_profile:"",cv:"",cover_letter:"",about_you:""},github:{searchTerm:"",response:{},apiProtect:null,selectedId:null,searching:!1,showValidationError:!1},finished:!1,finalise:{dataSending:!1,dataSubmitted:!1},response:{message:"",description:""}}},mounted:function(){this.dataReady=!0},methods:{pagePosition:function(e){var t="";return e===this.currentPage?t="active":e<this.currentPage?t="prev":e>this.currentPage&&(t="next"),t},nextPage:function(){""===this.submittedData.git_profile&&"git_profile"===v[this.currentPage].name?(this.github.showValidationError=!0,this.selectedId):this.currentPage<v.length-1&&this.currentPage++},prevPage:function(){0!==this.currentPage&&this.currentPage--},searchGithub:function(e){var t=this;clearTimeout(this.github.apiProtect),this.github.searchTerm=e.target.value,""!==e.target.value?(this.github.searching=!0,this.github.showValidationError=!1):this.github.searching=!1,t.github.response=[],this.github.apiProtect=setTimeout(function(){f.a.get("https://api.github.com/search/users?q="+e.target.value).then(function(e){t.github.response=e.data.items,t.github.searching=!1})},1e3)},hideGithubMessage:function(){this.github.showValidationError=!1,this.github.selectedId=null},saveGithubProfile:function(e,t){this.github.selectedId=e,this.submittedData.git_profile=t},submitData:function(){var e=this;this.finished=!0,this.finalise.dataSending=!0,f()({method:"POST",url:"https://recruitment-submissions.netsells.co.uk/api/vacancies/javascript-developer/submissions/",headers:{"X-Requested-With":"XMLHttpRequest"},data:e.submittedData}).then(function(e){console.log(e)})}}},y=g,_=(a("cff9"),Object(l["a"])(y,p,h,!1,null,"77710039",null)),w=_.exports,C={name:"app",components:{Header:d,Main:w}},x=C,D=Object(l["a"])(x,n,r,!1,null,null,null),P=D.exports;s["default"].use(i["a"]),s["default"].config.productionTip=!1,new s["default"]({render:function(e){return e(P)}}).$mount("#app")},a478:function(e,t,a){},ccf4:function(e,t,a){"use strict";var s=a("1bf9"),i=a.n(s);i.a},cff9:function(e,t,a){"use strict";var s=a("a478"),i=a.n(s);i.a},f60c:function(e,t,a){e.exports=a.p+"img/netsells-logo.5c7b1c02.png"}});
//# sourceMappingURL=index.c63485a3.js.map