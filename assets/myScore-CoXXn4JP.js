import{aa as V,_ as I,ab as A,x as n,$ as k,a0 as U,c as i,a5 as w,a1 as y,W as L,ag as T,ar as F,a9 as S,J as p,as as K,ai as M}from"./index-f-olW6ep.js";import{b as D}from"./breadcrumbs-DzJv4WMW.js";import{V as E}from"./VDataTableServer-CDVJeecj.js";import"./filter-C6iHwVKS.js";import"./VMenu-CNcLGIwE.js";const H={__name:"myScore",setup(J){const f=I();K();const g=A(),{apiAuth:P}=M(),m=n(10),u=n([{key:"createdAt",order:"desc"}]),c=n(1),v=n([]),$=[{title:"演唱/演奏者",align:"center",sortable:!0,key:"singer"},{title:"歌名",align:"center",sortable:!0,key:"songTitle"},{title:"曲風",align:"center",sortable:!0,key:"songStyle"},{title:"BPM",align:"center",sortable:!0,key:"BPM"},{title:"公開",align:"center",sortable:!1,key:"isPublic"},{title:"",align:"center",sortable:!1,key:"action"}],b=n(!0),x=n(0),d=n(""),l=async r=>{var t,e,a,s;r&&(c.value=1),b.value=!0;try{const{data:o}=await P.get("/song/my",{params:{page:c.value,itemsPerPage:m.value,sortBy:((t=u.value[0])==null?void 0:t.key)||"createdAt",sortOrder:((e=u.value[0])==null?void 0:e.order)||"desc",search:d.value,user:f.account}});v.value.splice(0,v.value.length,...o.result.data),x.value=o.result.total}catch(o){console.log(o),g({text:((s=(a=o==null?void 0:o.response)==null?void 0:a.data)==null?void 0:s.message)||"發生錯誤",snackbarProps:{color:"red"}})}b.value=!1};l();const B=r=>{},C=(r,t)=>{var e,a;try{f.account===t?(alert("確定要刪除歌曲嗎？"),P.delete("/song/"+r),g({text:"刪除歌曲成功",snackbarProps:{color:"green"}}),l()):alert("非原作者，無權限刪除")}catch(s){console.log(s),g({text:((a=(e=s==null?void 0:s.response)==null?void 0:e.data)==null?void 0:a.message)||"刪除歌曲發生錯誤",snackbarProps:{color:"red"}})}};return(r,t)=>(k(),U(L,null,[i(w(D)),i(E,{id:"table",class:"v-data-table-server","items-per-page":m.value,"onUpdate:itemsPerPage":[t[3]||(t[3]=e=>m.value=e),t[6]||(t[6]=e=>l(!1))],"sort-by":u.value,"onUpdate:sortBy":[t[4]||(t[4]=e=>u.value=e),t[7]||(t[7]=e=>l(!1))],page:c.value,"onUpdate:page":[t[5]||(t[5]=e=>c.value=e),t[8]||(t[8]=e=>l(!1))],items:v.value,headers:$,loading:b.value,"items-length":x.value,search:d.value,hover:""},{top:y(()=>[i(T,{label:"請搜尋演唱/演奏者、歌名或曲風",modelValue:d.value,"onUpdate:modelValue":t[0]||(t[0]=e=>d.value=e),"append-icon":"mdi-magnify",onClickAppend:t[1]||(t[1]=e=>l(!0)),onKeydown:t[2]||(t[2]=F(e=>l(!0),["enter"]))},null,8,["modelValue"])]),"item.isPublic":y(({value:e})=>[e?(k(),S(p,{key:0,elevation:"0",icon:"mdi-lock-open-variant",onClick:a=>B(e)},null,8,["onClick"])):(k(),S(p,{key:1,elevation:"0",icon:"mdi-lock",onClick:a=>B(e)},null,8,["onClick"]))]),"item.action":y(({item:e})=>[i(p,{elevation:"0","prepend-icon":" mdi-file-eye-outline",to:"/songs/"+e._id},null,8,["to"]),i(p,{elevation:"0","prepend-icon":" mdi-trash-can-outline",onClick:a=>C(e._id,e.editor)},null,8,["onClick"])]),_:2},1032,["items-per-page","sort-by","page","items","loading","items-length","search"])],64))}},j=V(H,[["__scopeId","data-v-dbaedbef"]]);export{j as default};
