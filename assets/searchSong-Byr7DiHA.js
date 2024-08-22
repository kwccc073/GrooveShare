import{aa as L,ab as T,_ as h,x as a,$ as v,a0 as B,c,a5 as V,a1 as $,W as w,ag as F,aq as K,a9 as C,J as y,ao as M,ai as N}from"./index-tF3WnsXk.js";import{b as q}from"./breadcrumbs-BrApQjfA.js";import{V as D}from"./VDataTableServer-DHzS6YaE.js";import"./filter-DUy3X3Jp.js";import"./VMenu-BSnXu6uC.js";const E={__name:"searchSong",setup(H){const k=T(),{apiAuth:A}=N(),n=h(),I=n.account,f=a(n.saving),g=a(10),o=a([{key:"createdAt",order:"desc"}]),r=a(1),p=a([]),U=[{title:"演唱/演奏者",align:"center",sortable:!0,key:"singer"},{title:"歌名",align:"center",sortable:!0,key:"songTitle"},{title:"曲風",align:"center",sortable:!0,key:"songStyle"},{title:"BPM",align:"center",sortable:!0,key:"BPM"},{title:"建立者",align:"center",sortable:!1,key:"editor"},{title:"",align:"center",sortable:!1,key:"action"}],m=a(!0),S=a(0),i=a(""),s=async u=>{var e,t,d,x;u&&(r.value=1),m.value=!0;try{const{data:l}=await A.get("/song/all",{params:{page:r.value,itemsPerPage:g.value,sortBy:((e=o.value[0])==null?void 0:e.key)||"createdAt",sortOrder:((t=o.value[0])==null?void 0:t.order)||"desc",search:i.value}});p.value.splice(0,p.value.length,...l.result.data),S.value=l.result.total}catch(l){console.log(l),k({text:((x=(d=l==null?void 0:l.response)==null?void 0:d.data)==null?void 0:x.message)||"發生錯誤",snackbarProps:{color:"red"}})}m.value=!1};s();const b=a(!1),P=async u=>{if(!n.isLogin){alert("請先登入帳號");return}b.value=!0;const e=await n.saveSong(u);k({text:e.text,snackbarProps:{color:e.color}}),f.value=n.saving,b.value=!1};return(u,e)=>(v(),B(w,null,[c(V(q)),c(D,{id:"table","fixed-header":"","items-per-page":g.value,"onUpdate:itemsPerPage":[e[3]||(e[3]=t=>g.value=t),e[6]||(e[6]=t=>s(!1))],"sort-by":o.value,"onUpdate:sortBy":[e[4]||(e[4]=t=>o.value=t),e[7]||(e[7]=t=>s(!1))],page:r.value,"onUpdate:page":[e[5]||(e[5]=t=>r.value=t),e[8]||(e[8]=t=>s(!1))],items:p.value,headers:U,loading:m.value,"items-length":S.value,search:i.value,hover:""},{top:$(()=>[c(F,{label:"搜尋（請輸入演唱/演奏者、歌名或曲風）",modelValue:i.value,"onUpdate:modelValue":e[0]||(e[0]=t=>i.value=t),"append-icon":"mdi-magnify",onClickAppend:e[1]||(e[1]=t=>s(!0)),onKeydown:e[2]||(e[2]=K(t=>s(!0),["enter"]))},null,8,["modelValue"])]),"item.action":$(({item:t})=>[V(I)!==t.editor?(v(),B(w,{key:0},[f.value.includes(t._id)?(v(),C(y,{key:0,elevation:"0","prepend-icon":" mdi-cards-heart",onClick:d=>P(t._id)},null,8,["onClick"])):(v(),C(y,{key:1,elevation:"0","prepend-icon":" mdi-cards-heart-outline",onClick:d=>P(t._id),loading:b.value},null,8,["onClick","loading"]))],64)):M("",!0),c(y,{elevation:"0","prepend-icon":" mdi-file-eye-outline",to:"/songs/"+t._id},null,8,["to"])]),_:2},1032,["items-per-page","sort-by","page","items","loading","items-length","search"])],64))}},G=L(E,[["__scopeId","data-v-05e27140"]]);export{G as default};
