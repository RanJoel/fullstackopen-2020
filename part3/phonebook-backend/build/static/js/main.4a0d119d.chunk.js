(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(1),o=n(14),i=n.n(o),a=n(3),s=n(4),u=n.n(s),f="/api/persons",d=function(){return u.a.get(f).then((function(e){return e.data}))},j=function(e){return u.a.post(f,e).then((function(e){return e.data}))},b=function(e,t){return u.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},l=function(e){return u.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},m=function(e){var t=e.newName,n=e.newNumber,c=e.persons,o=e.setNewName,i=e.setNewNumber,a=e.setPersons,s=e.setMessage,u=function(e,t){t(e.target.value)};return Object(r.jsxs)("form",{children:[Object(r.jsxs)("div",{children:["name:"," ",Object(r.jsx)("input",{value:t,onChange:function(e){return u(e,o)}})]}),Object(r.jsxs)("div",{children:["number:"," ",Object(r.jsx)("input",{value:n,onChange:function(e){return u(e,i)}})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault();var r=c.filter((function(e){return e.name===t}));if(r&&0!==r.length){if(window.confirm("".concat(t," is already added to phonebook, replace the old number with a new one?"))){var u={name:t,number:n};b(r[0].id,u).then((function(e){a(c.map((function(t){return t.id!==r[0].id?t:e}))),s({text:"Updated ".concat(r[0].name),type:"notify"}),setTimeout((function(){s({})}),5e3)})).catch((function(e){s({text:"Information of ".concat(r[0].name," has already been removed from server"),type:"error"}),setTimeout((function(){s({})}),5e3),a(c.filter((function(e){return e.id!==r[0].id})))}))}}else j({name:t,number:n}).then((function(e){s({text:"Added ".concat(t),type:"notify"}),a(c.concat(e))})).catch((function(e){s({text:"".concat(e.response.data.error),type:"error"})})),o(""),i(""),setTimeout((function(){s({})}),5e3)},children:"add"})})]})},h=function(e){var t=e.persons,n=e.nameFilter,c=e.setPersons,o=e.setMessage,i=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return Object(r.jsx)(r.Fragment,{children:i.map((function(e,n){return Object(r.jsxs)("div",{children:[e.name," ",e.number," ",Object(r.jsx)("button",{onClick:function(){return function(e,n){window.confirm("Delete ".concat(e," ?"))&&l(n).then((function(e){c(t.filter((function(e){return e.id!==n})))})).catch((function(r){o({text:"Information of ".concat(e," has already been removed from server"),type:"error"}),setTimeout((function(){o({})}),5e3),c(t.filter((function(e){return e.id!==n})))}))}(e.name,e.id)},children:"delete"})]},n)}))})},p=function(e){var t=e.nameFilter,n=e.setFilter;return Object(r.jsxs)("div",{children:["filter shown with:"," ",Object(r.jsx)("input",{value:t,onChange:function(e){n(e.target.value)}})]})},O=function(e){var t=e.message,n=e.type;return void 0===t?null:Object(r.jsx)("div",{className:"error"===n?"error":"notify",children:t})},x=function(){var e=Object(c.useState)([]),t=Object(a.a)(e,2),n=t[0],o=t[1],i=Object(c.useState)(""),s=Object(a.a)(i,2),u=s[0],f=s[1],j=Object(c.useState)(""),b=Object(a.a)(j,2),l=b[0],x=b[1],v=Object(c.useState)(""),w=Object(a.a)(v,2),y=w[0],g=w[1],N=Object(c.useState)({}),k=Object(a.a)(N,2),C=k[0],F=k[1];return Object(c.useEffect)((function(){d().then((function(e){o(e)}))}),[]),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(O,{message:C.text,type:C.type}),Object(r.jsx)(p,{nameFilter:y,setFilter:g}),Object(r.jsx)("h3",{children:"add a new"}),Object(r.jsx)(m,{newName:u,newNumber:l,persons:n,setNewName:f,setNewNumber:x,setPersons:o,setMessage:F}),Object(r.jsx)("h3",{children:"Numbers"}),Object(r.jsx)(h,{persons:n,nameFilter:y,setPersons:o,setMessage:F})]})};n(37);i.a.render(Object(r.jsx)(x,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.4a0d119d.chunk.js.map