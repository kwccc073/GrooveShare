import{s as I,A as Le,o as f,bf as De,aw as E,av as O,bF as V,aA as se,x as C,aZ as re,B as ce,p as L,D as B,ay as Be,t as R,m as F,a as ue,g as T,u as x,c as m,bG as Te,aE as q,aR as J,b as xe,aF as Ne,K as _e,d as Re,e as je,br as Ke,f as oe,aH as Fe,bh as Ge,bv as He,z as de,l as ve,i as Ue,bs as $e,aS as ze,L as We,j as Ze,k as qe,bH as Je,bi as Xe,bj as Qe,bw as Ye,W as X,b4 as Q,as as Y,r as j,b2 as et,v as ee,aX as tt,bI as at,bE as nt,T as lt,bJ as te,bK as it,G as ae,bL as ne,b7 as st,Z as rt,bp as le,bM as ct,bB as ie}from"./index-CWikNf2Y.js";function Vt(){const e=I(!1);return Le(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:f(()=>e.value?void 0:{transition:"none !important"}),isBooted:De(e)}}const K=Symbol.for("vuetify:list");function Pt(){const e=E(K,{hasPrepend:I(!1),updateHasPrepend:()=>null}),s={hasPrepend:I(!1),updateHasPrepend:l=>{l&&(s.hasPrepend.value=l)}};return O(K,s),e}function ut(){return E(K,null)}const G=e=>{const s={activate:l=>{let{id:t,value:n,activated:a}=l;return t=V(t),e&&!n&&a.size===1&&a.has(t)||(n?a.add(t):a.delete(t)),a},in:(l,t,n)=>{let a=new Set;if(l!=null)for(const i of se(l))a=s.activate({id:i,value:!0,activated:new Set(a),children:t,parents:n});return a},out:l=>Array.from(l)};return s},fe=e=>{const s=G(e);return{activate:t=>{let{activated:n,id:a,...i}=t;a=V(a);const u=n.has(a)?new Set([a]):new Set;return s.activate({...i,id:a,activated:u})},in:(t,n,a)=>{let i=new Set;if(t!=null){const u=se(t);u.length&&(i=s.in(u.slice(0,1),n,a))}return i},out:(t,n,a)=>s.out(t,n,a)}},ot=e=>{const s=G(e);return{activate:t=>{let{id:n,activated:a,children:i,...u}=t;return n=V(n),i.has(n)?a:s.activate({id:n,activated:a,children:i,...u})},in:s.in,out:s.out}},dt=e=>{const s=fe(e);return{activate:t=>{let{id:n,activated:a,children:i,...u}=t;return n=V(n),i.has(n)?a:s.activate({id:n,activated:a,children:i,...u})},in:s.in,out:s.out}},vt={open:e=>{let{id:s,value:l,opened:t,parents:n}=e;if(l){const a=new Set;a.add(s);let i=n.get(s);for(;i!=null;)a.add(i),i=n.get(i);return a}else return t.delete(s),t},select:()=>null},ye={open:e=>{let{id:s,value:l,opened:t,parents:n}=e;if(l){let a=n.get(s);for(t.add(s);a!=null&&a!==s;)t.add(a),a=n.get(a);return t}else t.delete(s);return t},select:()=>null},ft={open:ye.open,select:e=>{let{id:s,value:l,opened:t,parents:n}=e;if(!l)return t;const a=[];let i=n.get(s);for(;i!=null;)a.push(i),i=n.get(i);return new Set(a)}},H=e=>{const s={select:l=>{let{id:t,value:n,selected:a}=l;if(t=V(t),e&&!n){const i=Array.from(a.entries()).reduce((u,v)=>{let[g,S]=v;return S==="on"&&u.push(g),u},[]);if(i.length===1&&i[0]===t)return a}return a.set(t,n?"on":"off"),a},in:(l,t,n)=>{let a=new Map;for(const i of l||[])a=s.select({id:i,value:!0,selected:new Map(a),children:t,parents:n});return a},out:l=>{const t=[];for(const[n,a]of l.entries())a==="on"&&t.push(n);return t}};return s},me=e=>{const s=H(e);return{select:t=>{let{selected:n,id:a,...i}=t;a=V(a);const u=n.has(a)?new Map([[a,n.get(a)]]):new Map;return s.select({...i,id:a,selected:u})},in:(t,n,a)=>{let i=new Map;return t!=null&&t.length&&(i=s.in(t.slice(0,1),n,a)),i},out:(t,n,a)=>s.out(t,n,a)}},yt=e=>{const s=H(e);return{select:t=>{let{id:n,selected:a,children:i,...u}=t;return n=V(n),i.has(n)?a:s.select({id:n,selected:a,children:i,...u})},in:s.in,out:s.out}},mt=e=>{const s=me(e);return{select:t=>{let{id:n,selected:a,children:i,...u}=t;return n=V(n),i.has(n)?a:s.select({id:n,selected:a,children:i,...u})},in:s.in,out:s.out}},gt=e=>{const s={select:l=>{let{id:t,value:n,selected:a,children:i,parents:u}=l;t=V(t);const v=new Map(a),g=[t];for(;g.length;){const h=g.shift();a.set(h,n?"on":"off"),i.has(h)&&g.push(...i.get(h))}let S=u.get(t);for(;S;){const h=i.get(S),w=h.every(o=>a.get(o)==="on"),c=h.every(o=>!a.has(o)||a.get(o)==="off");a.set(S,w?"on":c?"off":"indeterminate"),S=u.get(S)}return e&&!n&&Array.from(a.entries()).reduce((w,c)=>{let[o,r]=c;return r==="on"&&w.push(o),w},[]).length===0?v:a},in:(l,t,n)=>{let a=new Map;for(const i of l||[])a=s.select({id:i,value:!0,selected:new Map(a),children:t,parents:n});return a},out:(l,t)=>{const n=[];for(const[a,i]of l.entries())i==="on"&&!t.has(a)&&n.push(a);return n}};return s},M=Symbol.for("vuetify:nested"),ge={id:I(),root:{register:()=>null,unregister:()=>null,parents:C(new Map),children:C(new Map),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:C(!1),selectable:C(!1),opened:C(new Set),activated:C(new Set),selected:C(new Map),selectedValues:C([])}},It=L({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean},"nested"),Mt=e=>{let s=!1;const l=C(new Map),t=C(new Map),n=B(e,"opened",e.opened,c=>new Set(c),c=>[...c.values()]),a=f(()=>{if(typeof e.activeStrategy=="object")return e.activeStrategy;if(typeof e.activeStrategy=="function")return e.activeStrategy(e.mandatory);switch(e.activeStrategy){case"leaf":return ot(e.mandatory);case"single-leaf":return dt(e.mandatory);case"independent":return G(e.mandatory);case"single-independent":default:return fe(e.mandatory)}}),i=f(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;if(typeof e.selectStrategy=="function")return e.selectStrategy(e.mandatory);switch(e.selectStrategy){case"single-leaf":return mt(e.mandatory);case"leaf":return yt(e.mandatory);case"independent":return H(e.mandatory);case"single-independent":return me(e.mandatory);case"classic":default:return gt(e.mandatory)}}),u=f(()=>{if(typeof e.openStrategy=="object")return e.openStrategy;switch(e.openStrategy){case"list":return ft;case"single":return vt;case"multiple":default:return ye}}),v=B(e,"activated",e.activated,c=>a.value.in(c,l.value,t.value),c=>a.value.out(c,l.value,t.value)),g=B(e,"selected",e.selected,c=>i.value.in(c,l.value,t.value),c=>i.value.out(c,l.value,t.value));ce(()=>{s=!0});function S(c){const o=[];let r=c;for(;r!=null;)o.unshift(r),r=t.value.get(r);return o}const h=Be("nested"),w={id:I(),root:{opened:n,activatable:R(e,"activatable"),selectable:R(e,"selectable"),activated:v,selected:g,selectedValues:f(()=>{const c=[];for(const[o,r]of g.value.entries())r==="on"&&c.push(o);return c}),register:(c,o,r)=>{o&&c!==o&&t.value.set(c,o),r&&l.value.set(c,[]),o!=null&&l.value.set(o,[...l.value.get(o)||[],c])},unregister:c=>{if(s)return;l.value.delete(c);const o=t.value.get(c);if(o){const r=l.value.get(o)??[];l.value.set(o,r.filter(d=>d!==c))}t.value.delete(c),n.value.delete(c)},open:(c,o,r)=>{h.emit("click:open",{id:c,value:o,path:S(c),event:r});const d=u.value.open({id:c,value:o,opened:new Set(n.value),children:l.value,parents:t.value,event:r});d&&(n.value=d)},openOnSelect:(c,o,r)=>{const d=u.value.select({id:c,value:o,selected:new Map(g.value),opened:new Set(n.value),children:l.value,parents:t.value,event:r});d&&(n.value=d)},select:(c,o,r)=>{h.emit("click:select",{id:c,value:o,path:S(c),event:r});const d=i.value.select({id:c,value:o,selected:new Map(g.value),children:l.value,parents:t.value,event:r});d&&(g.value=d),w.root.openOnSelect(c,o,r)},activate:(c,o,r)=>{if(!e.activatable)return w.root.select(c,!0,r);h.emit("click:activate",{id:c,value:o,path:S(c),event:r});const d=a.value.activate({id:c,value:o,activated:new Set(v.value),children:l.value,parents:t.value,event:r});d&&(v.value=d)},children:l,parents:t}};return O(M,w),w.root},St=(e,s)=>{const l=E(M,ge),t=Symbol(re()),n=f(()=>e.value!==void 0?e.value:t),a={...l,id:n,open:(i,u)=>l.root.open(n.value,i,u),openOnSelect:(i,u)=>l.root.openOnSelect(n.value,i,u),isOpen:f(()=>l.root.opened.value.has(n.value)),parent:f(()=>l.root.parents.value.get(n.value)),activate:(i,u)=>l.root.activate(n.value,i,u),isActivated:f(()=>l.root.activated.value.has(V(n.value))),select:(i,u)=>l.root.select(n.value,i,u),isSelected:f(()=>l.root.selected.value.get(V(n.value))==="on"),isIndeterminate:f(()=>l.root.selected.value.get(n.value)==="indeterminate"),isLeaf:f(()=>!l.root.children.value.get(n.value)),isGroupActivator:l.isGroupActivator};return!l.isGroupActivator&&l.root.register(n.value,l.id.value,s),ce(()=>{!l.isGroupActivator&&l.root.unregister(n.value)}),s&&O(M,a),a},Et=()=>{const e=E(M,ge);O(M,{...e,isGroupActivator:!0})},bt=L({opacity:[Number,String],...F(),...ue()},"VListItemSubtitle"),ht=T()({name:"VListItemSubtitle",props:bt(),setup(e,s){let{slots:l}=s;return x(()=>m(e.tag,{class:["v-list-item-subtitle",e.class],style:[{"--v-list-item-subtitle-opacity":e.opacity},e.style]},l)),{}}}),wt=Te("v-list-item-title"),kt=L({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:q,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:q,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,subtitle:[String,Number],title:[String,Number],value:null,onClick:J(),onClickOnce:J(),...xe(),...F(),...Ne(),..._e(),...Re(),...je(),...Ke(),...ue(),...oe(),...Fe({variant:"text"})},"VListItem"),Ot=T()({name:"VListItem",directives:{Ripple:Ge},props:kt(),emits:{click:e=>!0},setup(e,s){let{attrs:l,slots:t,emit:n}=s;const a=He(e,l),i=f(()=>e.value===void 0?a.href.value:e.value),{activate:u,isActivated:v,select:g,isSelected:S,isIndeterminate:h,isGroupActivator:w,root:c,parent:o,openOnSelect:r}=St(i,!1),d=ut(),b=f(()=>{var y;return e.active!==!1&&(e.active||((y=a.isActive)==null?void 0:y.value)||(c.activatable.value?v.value:S.value))}),k=f(()=>e.link!==!1&&a.isLink.value),p=f(()=>!e.disabled&&e.link!==!1&&(e.link||a.isClickable.value||!!d&&(c.selectable.value||c.activatable.value||e.value!=null))),P=f(()=>e.rounded||e.nav),U=f(()=>e.color??e.activeColor),Se=f(()=>({color:b.value?U.value??e.baseColor:e.baseColor,variant:e.variant}));de(()=>{var y;return(y=a.isActive)==null?void 0:y.value},y=>{y&&o.value!=null&&c.open(o.value,!0),y&&r(y)},{immediate:!0});const{themeClasses:be}=ve(e),{borderClasses:he}=Ue(e),{colorClasses:we,colorStyles:ke,variantClasses:pe}=$e(Se),{densityClasses:Ae}=ze(e),{dimensionStyles:Ce}=We(e),{elevationClasses:Ve}=Ze(e),{roundedClasses:Pe}=qe(P),Ie=f(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),N=f(()=>({isActive:b.value,select:g,isSelected:S.value,isIndeterminate:h.value}));function $(y){var D;n("click",y),p.value&&((D=a.navigate)==null||D.call(a,y),!w&&(c.activatable.value?u(!v.value,y):(c.selectable.value||e.value!=null)&&g(!S.value,y)))}function Me(y){(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),$(y))}return x(()=>{const y=k.value?"a":e.tag,D=t.title||e.title!=null,Ee=t.subtitle||e.subtitle!=null,z=!!(e.appendAvatar||e.appendIcon),Oe=!!(z||t.append),W=!!(e.prependAvatar||e.prependIcon),_=!!(W||t.prepend);return d==null||d.updateHasPrepend(_),e.activeColor&&Je("active-color",["color","base-color"]),Xe(m(y,{class:["v-list-item",{"v-list-item--active":b.value,"v-list-item--disabled":e.disabled,"v-list-item--link":p.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!_&&(d==null?void 0:d.hasPrepend.value),"v-list-item--slim":e.slim,[`${e.activeClass}`]:e.activeClass&&b.value},be.value,he.value,we.value,Ae.value,Ve.value,Ie.value,Pe.value,pe.value,e.class],style:[ke.value,Ce.value,e.style],href:a.href.value,tabindex:p.value?d?-2:0:void 0,onClick:$,onKeydown:p.value&&!k.value&&Me},{default:()=>{var Z;return[Ye(p.value||b.value,"v-list-item"),_&&m("div",{key:"prepend",class:"v-list-item__prepend"},[t.prepend?m(j,{key:"prepend-defaults",disabled:!W,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var A;return[(A=t.prepend)==null?void 0:A.call(t,N.value)]}}):m(X,null,[e.prependAvatar&&m(Q,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&m(Y,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),m("div",{class:"v-list-item__spacer"},null)]),m("div",{class:"v-list-item__content","data-no-activator":""},[D&&m(wt,{key:"title"},{default:()=>{var A;return[((A=t.title)==null?void 0:A.call(t,{title:e.title}))??e.title]}}),Ee&&m(ht,{key:"subtitle"},{default:()=>{var A;return[((A=t.subtitle)==null?void 0:A.call(t,{subtitle:e.subtitle}))??e.subtitle]}}),(Z=t.default)==null?void 0:Z.call(t,N.value)]),Oe&&m("div",{key:"append",class:"v-list-item__append"},[t.append?m(j,{key:"append-defaults",disabled:!z,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var A;return[(A=t.append)==null?void 0:A.call(t,N.value)]}}):m(X,null,[e.appendIcon&&m(Y,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&m(Q,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),m("div",{class:"v-list-item__spacer"},null)])]}}),[[Qe("ripple"),p.value&&e.ripple]])}),{activate:u,isActivated:v,isGroupActivator:w,isSelected:S,list:d,select:g}}}),pt=L({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...F(),...oe()},"VDivider"),Lt=T()({name:"VDivider",props:pt(),setup(e,s){let{attrs:l,slots:t}=s;const{themeClasses:n}=ve(e),{textColorClasses:a,textColorStyles:i}=et(R(e,"color")),u=f(()=>{const v={};return e.length&&(v[e.vertical?"height":"width"]=ee(e.length)),e.thickness&&(v[e.vertical?"borderRightWidth":"borderTopWidth"]=ee(e.thickness)),v});return x(()=>{const v=m("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},n.value,a.value,e.class],style:[u.value,i.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":!l.role||l.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${l.role||"separator"}`},null);return t.default?m("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[v,m("div",{class:"v-divider__content"},[t.default()]),v]):v}),{}}}),At=L({id:String,...tt(at({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:nt}}),["absolute"])},"VMenu"),Dt=T()({name:"VMenu",props:At(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:l}=s;const t=B(e,"modelValue"),{scopeId:n}=lt(),a=re(),i=f(()=>e.id||`v-menu-${a}`),u=C(),v=E(te,null),g=I(0);O(te,{register(){++g.value},unregister(){--g.value},closeParents(r){setTimeout(()=>{!g.value&&!e.persistent&&(r==null||r&&!it(r,u.value.contentEl))&&(t.value=!1,v==null||v.closeParents())},40)}});async function S(r){var k,p,P;const d=r.relatedTarget,b=r.target;await rt(),t.value&&d!==b&&((k=u.value)!=null&&k.contentEl)&&((p=u.value)!=null&&p.globalTop)&&![document,u.value.contentEl].includes(b)&&!u.value.contentEl.contains(b)&&((P=le(u.value.contentEl)[0])==null||P.focus())}de(t,r=>{r?(v==null||v.register(),document.addEventListener("focusin",S,{once:!0})):(v==null||v.unregister(),document.removeEventListener("focusin",S))});function h(r){v==null||v.closeParents(r)}function w(r){var d,b,k;if(!e.disabled)if(r.key==="Tab"||r.key==="Enter"&&!e.closeOnContentClick){if(r.key==="Enter"&&(r.target instanceof HTMLTextAreaElement||r.target instanceof HTMLInputElement&&r.target.closest("form")))return;r.key==="Enter"&&r.preventDefault(),ct(le((d=u.value)==null?void 0:d.contentEl,!1),r.shiftKey?"prev":"next",P=>P.tabIndex>=0)||(t.value=!1,(k=(b=u.value)==null?void 0:b.activatorEl)==null||k.focus())}else["Enter"," "].includes(r.key)&&e.closeOnContentClick&&(t.value=!1,v==null||v.closeParents())}function c(r){var b;if(e.disabled)return;const d=(b=u.value)==null?void 0:b.contentEl;d&&t.value?r.key==="ArrowDown"?(r.preventDefault(),ie(d,"next")):r.key==="ArrowUp"&&(r.preventDefault(),ie(d,"prev")):["ArrowDown","ArrowUp"].includes(r.key)&&(t.value=!0,r.preventDefault(),setTimeout(()=>setTimeout(()=>c(r))))}const o=f(()=>ae({"aria-haspopup":"menu","aria-expanded":String(t.value),"aria-owns":i.value,onKeydown:c},e.activatorProps));return x(()=>{const r=ne.filterProps(e);return m(ne,ae({ref:u,id:i.value,class:["v-menu",e.class],style:e.style},r,{modelValue:t.value,"onUpdate:modelValue":d=>t.value=d,absolute:!0,activatorProps:o.value,"onClick:outside":h,onKeydown:w},n),{activator:l.activator,default:function(){for(var d=arguments.length,b=new Array(d),k=0;k<d;k++)b[k]=arguments[k];return m(j,{root:"VMenu"},{default:()=>{var p;return[(p=l.default)==null?void 0:p.call(l,...b)]}})}})}),st({id:i,ΨopenChildren:g},u)}});export{Dt as V,Lt as a,Ot as b,Et as c,St as d,ut as e,Pt as f,Mt as g,It as m,Vt as u};
