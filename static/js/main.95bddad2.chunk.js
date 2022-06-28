(this.webpackJsonptodo16v2=this.webpackJsonptodo16v2||[]).push([[0],{126:function(t,e,a){},127:function(t,e,a){},153:function(t,e,a){"use strict";a.r(e);var r,n,s=a(0),c=a.n(s),i=a(35),o=a.n(i),u=(a(126),function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,219)).then((function(e){var a=e.getCLS,r=e.getFID,n=e.getFCP,s=e.getLCP,c=e.getTTFB;a(t),r(t),n(t),s(t),c(t)}))}),d=(a(127),a(28)),l=a(15),b=a.n(l),f=a(22),p=a(27),j=a(97),h=a.n(j).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"f3f54432-d8c8-49d7-98bb-7ebfd06f7be2"}}),O=function(){return h.get("todo-lists")},v=function(t){return h.post("todo-lists",{title:t})},x=function(t){return h.delete("todo-lists/".concat(t))},m=function(t,e){return h.put("todo-lists/".concat(t),{title:e})},g=function(t){return h.get("todo-lists/".concat(t,"/tasks"))},k=function(t,e){return h.delete("todo-lists/".concat(t,"/tasks/").concat(e))},C=function(t,e){return h.post("todo-lists/".concat(t,"/tasks"),{title:e})},y=function(t,e,a){return h.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},I=function(t){return h.post("auth/login",t)},T=function(){return h.get("auth/me")},w=function(){return h.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(r||(r={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(n||(n={}));var S=function(t,e){t.messages.length?e(U({error:t.messages[0]})):e(U({error:"Some error occurred"})),e(M({status:"failed"}))},A=function(t,e){e(U({error:t.message?t.message:"Some error occurred"})),e(M({status:"failed"}))},F=a(19),E=Object(F.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.value}},extraReducers:function(t){t.addCase(V.fulfilled,(function(t){t.isLoggedIn=!0})).addCase(W.fulfilled,(function(t){t.isLoggedIn=!1}))}}),L=E.reducer,P=E.actions.setIsLoggedInAC,V=Object(F.b)("auth/login",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(M({status:"loading"})),t.prev=1,t.next=4,I(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(M({status:"succeeded"})),t.abrupt("return");case 10:return S(r.data,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),n=t.t0,A(n,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:[n.message],fieldsErrors:void 0}));case 19:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),W=Object(F.b)("auth/logout",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(M({status:"loading"})),t.prev=1,t.next=4,w();case 4:if(0!==(r=t.sent).data.resultCode){t.next=11;break}return a.dispatch(M({status:"succeeded"})),a.dispatch(K()),t.abrupt("return");case 11:return S(r.data,a.dispatch),t.abrupt("return",a.rejectWithValue({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(1),A(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({}));case 19:case"end":return t.stop()}}),t,null,[[1,15]])})));return function(e,a){return t.apply(this,arguments)}}()),N=Object(F.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatusAC:function(t,e){t.status=e.payload.status},setAppErrorAC:function(t,e){t.error=e.payload.error}},extraReducers:function(t){return t.addCase(z.fulfilled,(function(t){t.isInitialized=!0}))}}),R=N.reducer,D=N.actions,M=D.setAppStatusAC,U=D.setAppErrorAC,z=Object(F.b)("app/initializeApp",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(M({status:"loading"})),t.prev=2,t.next=5,T();case 5:if(0!==(s=t.sent).data.resultCode){t.next=11;break}r(P({value:!0})),r(M({status:"succeeded"})),t.next=13;break;case 11:return S(s.data,r),t.abrupt("return",n({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),A(t.t0,r),t.abrupt("return",n({}));case 19:return t.prev=19,t.abrupt("return");case 22:case"end":return t.stop()}}),t,null,[[2,15,19,22]])})));return function(e,a){return t.apply(this,arguments)}}()),q=Object(F.c)({name:"todoLists",initialState:[],reducers:{changeTodolistFilterAC:function(t,e){var a=e.payload,r=a.id,n=a.filter,s=t.findIndex((function(t){return t.id===r}));t[s].filter=n},changeTodolistEntityStatusAC:function(t,e){var a=e.payload,r=a.id,n=a.status,s=t.findIndex((function(t){return t.id===r}));t[s].entityStatus=n},resetTodolistsAC:function(t,e){return[]}},extraReducers:function(t){return t.addCase(_.fulfilled,(function(t,e){return e.payload.todolists.map((function(t){return Object(p.a)(Object(p.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})).addCase(G.fulfilled,(function(t,e){return t.filter((function(t){return t.id!==e.payload.id}))})).addCase(Y.fulfilled,(function(t,e){t.unshift(Object(p.a)(Object(p.a)({},e.payload.todolist),{},{entityStatus:"idle",filter:"all"}))})).addCase($.fulfilled,(function(t,e){var a=e.payload,r=a.id,n=a.title,s=t.findIndex((function(t){return t.id===r}));t[s].title=n}))}}),B=q.reducer,H=q.actions,Z=H.changeTodolistFilterAC,J=H.changeTodolistEntityStatusAC,K=H.resetTodolistsAC,_=Object(F.b)("todolists/fetchTodolists",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(M({status:"loading"})),t.prev=2,t.next=5,O();case 5:return s=t.sent,r(M({status:"succeeded"})),t.next=9,s.data;case 9:return t.sent.forEach((function(t){return r(X(t.id))})),console.log(s.data),t.abrupt("return",{todolists:s.data});case 15:return t.prev=15,t.t0=t.catch(2),A(t.t0,r),t.abrupt("return",n({}));case 19:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e,a){return t.apply(this,arguments)}}()),G=Object(F.b)("todolists/removeTodolist",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(M({status:"loading"})),r(J({id:e,status:"loading"})),t.prev=3,t.next=6,x(e);case 6:if(0!==(s=t.sent).data.resultCode){t.next=12;break}return r(M({status:"succeeded"})),t.abrupt("return",{id:e});case 12:return S(s.data,r),t.abrupt("return",n({}));case 14:t.next=20;break;case 16:return t.prev=16,t.t0=t.catch(3),A(t.t0,r),t.abrupt("return",n({}));case 20:case"end":return t.stop()}}),t,null,[[3,16]])})));return function(e,a){return t.apply(this,arguments)}}()),Y=Object(F.b)("todolists/addTodolist",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(M({status:"loading"})),t.prev=2,t.next=5,v(e);case 5:if(0!==(s=t.sent).data.resultCode){t.next=11;break}return r(M({status:"succeeded"})),t.abrupt("return",{todolist:s.data.data.item});case 11:return S(s.data,r),t.abrupt("return",n({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),A(t.t0,r),t.abrupt("return",n({}));case 19:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e,a){return t.apply(this,arguments)}}()),$=Object(F.b)("todolists/changeTodolistTitle",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(M({status:"loading"})),t.prev=2,t.next=5,m(e.id,e.title);case 5:if(0!==(s=t.sent).data.resultCode){t.next=11;break}return r(M({status:"succeeded"})),t.abrupt("return",e);case 11:return S(s.data,r),t.abrupt("return",n({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),A(t.t0,r),t.abrupt("return",n({}));case 19:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e,a){return t.apply(this,arguments)}}()),Q=Object(F.c)({name:"tasks",initialState:{},reducers:{},extraReducers:function(t){t.addCase(Y.fulfilled,(function(t,e){t[e.payload.todolist.id]=[]})).addCase(G.fulfilled,(function(t,e){delete t[e.payload.id]})).addCase(_.fulfilled,(function(t,e){console.log("action",e),e.payload.todolists.forEach((function(e){return t[e.id]=[]}))})).addCase(X.fulfilled,(function(t,e){t[e.payload.todolistId]=e.payload.tasks})).addCase(tt.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));-1!==r&&a.splice(r,1)})).addCase(et.fulfilled,(function(t,e){t[e.payload.todoListId].unshift(e.payload)})).addCase(at.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));-1!==r&&(a[r]=Object(p.a)(Object(p.a)({},a[r]),e.payload.model))}))}}).reducer,X=Object(F.b)("tasks/fetchTasks",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(M({status:"loading"})),t.next=3,g(e);case 3:return r=t.sent,n=r.data.items,a.dispatch(M({status:"succeeded"})),t.abrupt("return",{tasks:n,todolistId:e});case 7:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),tt=Object(F.b)("tasks/removeTask",function(){var t=Object(f.a)(b.a.mark((function t(e,a){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(M({status:"loading"})),t.next=3,k(e.todolistId,e.taskId);case 3:return a.dispatch(M({status:"succeeded"})),t.abrupt("return",Object(p.a)({},e));case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),et=Object(F.b)("tasks/addTask",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n,s,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(M({status:"loading"})),t.prev=2,t.next=5,C(e.todolistId,e.title);case 5:if(0!==(s=t.sent).data.resultCode){t.next=12;break}return c=s.data.data.item,r(M({status:"succeeded"})),t.abrupt("return",c);case 12:return S(s.data,r),t.abrupt("return",n({}));case 14:t.next=20;break;case 16:return t.prev=16,t.t0=t.catch(2),A(t.t0,r),t.abrupt("return",n({}));case 20:case"end":return t.stop()}}),t,null,[[2,16]])})));return function(e,a){return t.apply(this,arguments)}}()),at=Object(F.b)("tasks/updateTask",function(){var t=Object(f.a)(b.a.mark((function t(e,a){var r,n,s,c,i,o,u,d,l,f;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=a.dispatch,n=a.getState,s=a.rejectWithValue,c=e.taskId,i=e.model,o=e.todolistId,u=n(),d=u.tasks[o].find((function(t){return t.id===c}))){t.next=6;break}return t.abrupt("return",s({}));case 6:return l=Object(p.a)({deadline:d.deadline,description:d.description,priority:d.priority,startDate:d.startDate,title:d.title,status:d.status},i),t.prev=7,t.next=10,y(o,c,l);case 10:if(0!==(f=t.sent).data.resultCode){t.next=15;break}return t.abrupt("return",e);case 15:return S(f.data,r),t.abrupt("return",s({}));case 17:t.next=23;break;case 19:return t.prev=19,t.t0=t.catch(7),A(t.t0,r),t.abrupt("return",s({}));case 23:case"end":return t.stop()}}),t,null,[[7,19]])})));return function(e,a){return t.apply(this,arguments)}}()),rt=a(99),nt=a(98),st=Object(rt.a)({tasks:Q,todolists:B,app:R,auth:L}),ct=Object(F.a)({reducer:st,middleware:function(t){return t().prepend(nt.a)}}),it=d.c;window.store=ct;var ot=a(207),ut=a(215),dt=a(13),lt=a(200),bt=a(208),ft=a(196),pt=a(1),jt=c.a.memo((function(t){var e=t.addItem,a=t.disabled,r=void 0!==a&&a;console.log("AddItemForm called");var n=Object(s.useState)(""),c=Object(dt.a)(n,2),i=c[0],o=c[1],u=Object(s.useState)(null),d=Object(dt.a)(u,2),l=d[0],b=d[1],f=function(){""!==i.trim()?(e(i),o("")):b("Title is required")};return Object(pt.jsxs)("div",{children:[Object(pt.jsx)(lt.a,{variant:"outlined",disabled:r,error:!!l,value:i,onChange:function(t){o(t.currentTarget.value)},onKeyPress:function(t){null!==l&&b(null),13===t.charCode&&f()},label:"Title",helperText:l}),Object(pt.jsx)(bt.a,{color:"primary",onClick:f,disabled:r,children:Object(pt.jsx)(ft.a,{})})]})})),ht=a(107),Ot=c.a.memo((function(t){console.log("EditableSpan called");var e=Object(s.useState)(!1),a=Object(dt.a)(e,2),r=a[0],n=a[1],c=Object(s.useState)(t.value),i=Object(dt.a)(c,2),o=i[0],u=i[1];return r?Object(pt.jsx)(lt.a,{value:o,onChange:function(t){u(t.currentTarget.value)},autoFocus:!0,onBlur:function(){n(!1),t.onChange(o)}}):Object(pt.jsx)("span",{onDoubleClick:function(){n(!0),u(t.value)},children:t.value})})),vt=a(209),xt=a(197),mt=a(202),gt=c.a.memo((function(t){var e=Object(s.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),a=Object(s.useCallback)((function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.task.id,a?r.Completed:r.New,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(s.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(pt.jsxs)("div",{className:t.task.status===r.Completed?"is-done":"",children:[Object(pt.jsx)(mt.a,{checked:t.task.status===r.Completed,color:"primary",onChange:a}),Object(pt.jsx)(Ot,{value:t.task.title,onChange:n}),Object(pt.jsx)(bt.a,{onClick:e,children:Object(pt.jsx)(xt.a,{})})]},t.task.id)})),kt=c.a.memo((function(t){t.demo;var e=Object(ht.a)(t,["demo"]);console.log("Todolist called");var a=Object(s.useCallback)((function(t){e.addTask(t,e.todolist.id)}),[e.addTask,e.todolist.id]),n=Object(s.useCallback)((function(t){e.changeTodolistTitle(e.todolist.id,t)}),[e.todolist.id,e.changeTodolistTitle]),c=Object(s.useCallback)((function(){return e.changeFilter("all",e.todolist.id)}),[e.todolist.id,e.changeFilter]),i=Object(s.useCallback)((function(){return e.changeFilter("active",e.todolist.id)}),[e.todolist.id,e.changeFilter]),o=Object(s.useCallback)((function(){return e.changeFilter("completed",e.todolist.id)}),[e.todolist.id,e.changeFilter]),u=e.tasks;return"active"===e.todolist.filter&&(u=e.tasks.filter((function(t){return t.status===r.New}))),"completed"===e.todolist.filter&&(u=e.tasks.filter((function(t){return t.status===r.Completed}))),Object(pt.jsxs)("div",{children:[Object(pt.jsxs)("h3",{children:[Object(pt.jsx)(Ot,{value:e.todolist.title,onChange:n}),Object(pt.jsx)(bt.a,{onClick:function(){e.removeTodolist(e.todolist.id)},disabled:"loading"===e.todolist.entityStatus,children:Object(pt.jsx)(xt.a,{})})]}),Object(pt.jsx)(jt,{addItem:a,disabled:"loading"===e.todolist.entityStatus}),Object(pt.jsx)("div",{children:u.map((function(t){return Object(pt.jsx)(gt,{task:t,todolistId:e.todolist.id,removeTask:e.removeTask,changeTaskTitle:e.changeTaskTitle,changeTaskStatus:e.changeTaskStatus},t.id)}))}),Object(pt.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(pt.jsx)(vt.a,{variant:"all"===e.todolist.filter?"outlined":"text",onClick:c,color:"inherit",children:"All"}),Object(pt.jsx)(vt.a,{variant:"active"===e.todolist.filter?"outlined":"text",onClick:i,color:"primary",children:"Active"}),Object(pt.jsx)(vt.a,{variant:"completed"===e.todolist.filter?"outlined":"text",onClick:o,color:"secondary",children:"Completed"})]})]})})),Ct=a(14),yt=function(t){var e=t.demo,a=void 0!==e&&e,r=Object(d.c)((function(t){return t.todolists})),n=Object(d.c)((function(t){return t.tasks})),c=it((function(t){return t.auth.isLoggedIn})),i=Object(d.b)(),o=Object(Ct.g)();Object(s.useEffect)((function(){c?i(_()):o("/login")}),[c]);var u=Object(s.useCallback)((function(t,e){var a=tt({taskId:t,todolistId:e});i(a)}),[]),l=Object(s.useCallback)((function(t,e){var a=et({title:t,todolistId:e});i(a)}),[]),b=Object(s.useCallback)((function(t,e,a){var r=at({taskId:t,model:{status:e},todolistId:a});i(r)}),[]),f=Object(s.useCallback)((function(t,e,a){var r=at({taskId:t,model:{title:e},todolistId:a});i(r)}),[]),p=Object(s.useCallback)((function(t,e){var a=Z({id:e,filter:t});i(a)}),[]),j=Object(s.useCallback)((function(t){var e=G(t);i(e)}),[]),h=Object(s.useCallback)((function(t,e){var a=$({id:t,title:e});i(a)}),[]),O=Object(s.useCallback)((function(t){var e=Y(t);i(e)}),[i]);return Object(pt.jsxs)(pt.Fragment,{children:[Object(pt.jsx)(ot.a,{container:!0,style:{padding:"20px"},children:Object(pt.jsx)(jt,{addItem:O})}),Object(pt.jsx)(ot.a,{container:!0,spacing:3,children:r.map((function(t){var e=n[t.id];return Object(pt.jsx)(ot.a,{item:!0,children:Object(pt.jsx)(ut.a,{style:{padding:"10px"},children:Object(pt.jsx)(kt,{todolist:t,tasks:e,removeTask:u,changeFilter:p,addTask:l,changeTaskStatus:b,removeTodolist:j,changeTaskTitle:f,changeTodolistTitle:h,demo:a})})},t.id)}))})]})},It=a(211),Tt=a(212),wt=a(210),St=a(214),At=a(213),Ft=a(199),Et=a(204),Lt=a(203),Pt=c.a.forwardRef((function(t,e){return Object(pt.jsx)(Lt.a,Object(p.a)({elevation:6,ref:e,variant:"filled"},t))}));function Vt(){var t=Object(d.c)((function(t){return t.app.error})),e=Object(d.b)(),a=function(t,a){"clickaway"!==a&&e(U({error:null}))};return Object(pt.jsx)(Et.a,{open:null!==t,autoHideDuration:6e3,onClose:a,children:Object(pt.jsx)(Pt,{onClose:a,severity:"error",sx:{width:"100%"},children:t})})}var Wt=a(205),Nt=a(217),Rt=a(216),Dt=a(194),Mt=a(106),Ut=function(){var t=Object(d.b)(),e=it((function(t){return t.auth.isLoggedIn})),a=Object(Mt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password.trim()?t.password.trim().length<=3&&(e.password="Must be 3 characters or more"):e.password="Required",e},onSubmit:function(){var e=Object(f.a)(b.a.mark((function e(a,r){var n,s,c,i,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(V(a));case 2:n=e.sent,V.rejected.match(n)&&(null===(s=n.payload)||void 0===s||null===(c=s.fieldsErrors)||void 0===c?void 0:c.length)&&(o=null===(i=n.payload)||void 0===i?void 0:i.fieldsErrors[0],r.setFieldError(o.field,o.error));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()});return e?Object(pt.jsx)(Ct.a,{to:"/"}):Object(pt.jsx)(ot.a,{container:!0,justifyContent:"center",children:Object(pt.jsx)(ot.a,{item:!0,justifyContent:"center",children:Object(pt.jsxs)(Wt.a,{children:[Object(pt.jsxs)(Dt.a,{children:[Object(pt.jsxs)("p",{children:["To log in get registered",Object(pt.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(pt.jsx)("p",{children:"or use common test account credentials:"}),Object(pt.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(pt.jsx)("p",{children:"Password: free"})]}),Object(pt.jsx)("form",{onSubmit:a.handleSubmit,children:Object(pt.jsxs)(Rt.a,{children:[Object(pt.jsx)(lt.a,Object(p.a)({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&Object(pt.jsx)("div",{style:{color:"red"},children:a.errors.email}),Object(pt.jsx)(lt.a,Object(p.a)({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.email&&Object(pt.jsx)("div",{style:{color:"red"},children:a.errors.password}),Object(pt.jsx)(Nt.a,{label:"Remember me",control:Object(pt.jsx)(mt.a,Object(p.a)({checked:a.values.rememberMe},a.getFieldProps("rememberMe")))}),Object(pt.jsx)(vt.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})})]})})})},zt=a(218);var qt=function(t){var e=t.demo,a=void 0!==e&&e,r=Object(d.c)((function(t){return t.app.status})),n=it((function(t){return t.app.isInitialized})),c=it((function(t){return t.auth.isLoggedIn})),i=Object(d.b)();return Object(s.useEffect)((function(){i(z())}),[]),n?Object(pt.jsxs)("div",{className:"App",children:[Object(pt.jsx)(Vt,{}),Object(pt.jsxs)(It.a,{position:"static",children:[Object(pt.jsxs)(Tt.a,{children:[Object(pt.jsx)(bt.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(pt.jsx)(Ft.a,{})}),Object(pt.jsx)(wt.a,{variant:"h6",children:"News"}),c&&Object(pt.jsx)(vt.a,{color:"inherit",onClick:function(){return i(W())},children:"LogOUT"})]}),"loading"===r&&Object(pt.jsx)(At.a,{})]}),Object(pt.jsx)(St.a,{fixed:!0,children:Object(pt.jsxs)(Ct.d,{children:[Object(pt.jsx)(Ct.b,{path:"/",element:Object(pt.jsx)(yt,{demo:a})}),Object(pt.jsx)(Ct.b,{path:"/login",element:Object(pt.jsx)(Ut,{})}),Object(pt.jsx)(Ct.b,{path:"/404",element:Object(pt.jsx)("h1",{style:{textAlign:"center"},children:"404: PAGE NOT FOUND"})}),Object(pt.jsx)(Ct.b,{path:"/*",element:Object(pt.jsx)(Ct.a,{to:"/404"})})]})})]}):Object(pt.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(pt.jsx)(zt.a,{})})},Bt=a(55);o.a.render(Object(pt.jsx)(c.a.StrictMode,{children:Object(pt.jsx)(Bt.a,{children:Object(pt.jsx)(d.a,{store:ct,children:Object(pt.jsx)(qt,{})})})}),document.getElementById("root")),u()}},[[153,1,2]]]);
//# sourceMappingURL=main.95bddad2.chunk.js.map