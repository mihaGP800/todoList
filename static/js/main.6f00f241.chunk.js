(this.webpackJsonptodo16v2=this.webpackJsonptodo16v2||[]).push([[0],{126:function(t,e,a){},127:function(t,e,a){},153:function(t,e,a){"use strict";a.r(e);var r,n,s=a(0),i=a.n(s),c=a(35),o=a.n(c),u=(a(126),function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,218)).then((function(e){var a=e.getCLS,r=e.getFID,n=e.getFCP,s=e.getLCP,i=e.getTTFB;a(t),r(t),n(t),s(t),i(t)}))}),d=(a(127),a(32)),l=a(97),p=a(19),b=a(99),f=a(15),j=a.n(f),h=a(22),O=a(27),x=a(98),m=a.n(x).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"f3f54432-d8c8-49d7-98bb-7ebfd06f7be2"}}),v=function(){return m.get("todo-lists")},k=function(t){return m.post("todo-lists",{title:t})},g=function(t){return m.delete("todo-lists/".concat(t))},C=function(t,e){return m.put("todo-lists/".concat(t),{title:e})},y=function(t){return m.get("todo-lists/".concat(t,"/tasks"))},w=function(t,e){return m.delete("todo-lists/".concat(t,"/tasks/").concat(e))},T=function(t,e){return m.post("todo-lists/".concat(t,"/tasks"),{title:e})},I=function(t,e,a){return m.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},S=function(t){return m.post("auth/login",t)},A=function(){return m.get("auth/me")},E=function(){return m.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(r||(r={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(n||(n={}));var L=function(t){return t.auth.isLoggedIn},F=function(t,e){t.messages.length?e(B({error:t.messages[0]})):e(B({error:"Some error occurred"})),e(q({status:"failed"}))},P=function(t,e){e(B({error:t.message?t.message:"Some error occurred"})),e(q({status:"failed"}))},V=Object(p.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.value}},extraReducers:function(t){t.addCase(R.fulfilled,(function(t){t.isLoggedIn=!0})).addCase(D.fulfilled,(function(t){t.isLoggedIn=!1}))}}),W=V.reducer,N=V.actions.setIsLoggedInAC,R=Object(p.b)("auth/login",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(q({status:"loading"})),t.prev=1,t.next=4,S(e);case 4:if(0!==(r=t.sent).data.resultCode){t.next=10;break}return a.dispatch(q({status:"succeeded"})),t.abrupt("return");case 10:return F(r.data,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),n=t.t0,P(n,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:[n.message],fieldsErrors:void 0}));case 19:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e,a){return t.apply(this,arguments)}}()),D=Object(p.b)("auth/logout",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(q({status:"loading"})),t.prev=1,t.next=4,E();case 4:if(0!==(r=t.sent).data.resultCode){t.next=11;break}return a.dispatch(q({status:"succeeded"})),a.dispatch(Y()),t.abrupt("return");case 11:return F(r.data,a.dispatch),t.abrupt("return",a.rejectWithValue({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(1),P(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({}));case 19:case"end":return t.stop()}}),t,null,[[1,15]])})));return function(e,a){return t.apply(this,arguments)}}()),M=Object(p.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatusAC:function(t,e){t.status=e.payload.status},setAppErrorAC:function(t,e){t.error=e.payload.error}},extraReducers:function(t){return t.addCase(H.fulfilled,(function(t){t.isInitialized=!0}))}}),z=M.reducer,U=M.actions,q=U.setAppStatusAC,B=U.setAppErrorAC,H=Object(p.b)("app/initializeApp",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n,s;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(q({status:"loading"})),t.prev=2,t.next=5,A();case 5:if(0!==(s=t.sent).data.resultCode){t.next=11;break}r(N({value:!0})),r(q({status:"succeeded"})),t.next=13;break;case 11:return F(s.data,r),t.abrupt("return",n({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),P(t.t0,r),t.abrupt("return",n({}));case 19:return t.prev=19,t.abrupt("return");case 22:case"end":return t.stop()}}),t,null,[[2,15,19,22]])})));return function(e,a){return t.apply(this,arguments)}}()),Z=Object(p.c)({name:"todoLists",initialState:[],reducers:{changeTodolistFilterAC:function(t,e){var a=e.payload,r=a.id,n=a.filter,s=t.findIndex((function(t){return t.id===r}));t[s].filter=n},changeTodolistEntityStatusAC:function(t,e){var a=e.payload,r=a.id,n=a.status,s=t.findIndex((function(t){return t.id===r}));t[s].entityStatus=n},resetTodolistsAC:function(t,e){return[]}},extraReducers:function(t){return t.addCase($.fulfilled,(function(t,e){return e.payload.todolists.map((function(t){return Object(O.a)(Object(O.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})).addCase(Q.fulfilled,(function(t,e){return t.filter((function(t){return t.id!==e.payload.id}))})).addCase(X.fulfilled,(function(t,e){t.unshift(Object(O.a)(Object(O.a)({},e.payload.todolist),{},{entityStatus:"idle",filter:"all"}))})).addCase(tt.fulfilled,(function(t,e){var a=e.payload,r=a.id,n=a.title,s=t.findIndex((function(t){return t.id===r}));t[s].title=n}))}}),J=Z.reducer,K=Z.actions,_=K.changeTodolistFilterAC,G=K.changeTodolistEntityStatusAC,Y=K.resetTodolistsAC,$=Object(p.b)("todolists/fetchTodolists",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n,s;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(q({status:"loading"})),t.prev=2,t.next=5,v();case 5:return s=t.sent,r(q({status:"succeeded"})),t.next=9,s.data;case 9:return t.sent.forEach((function(t){return r(at(t.id))})),t.abrupt("return",{todolists:s.data});case 14:return t.prev=14,t.t0=t.catch(2),P(t.t0,r),t.abrupt("return",n({}));case 18:case"end":return t.stop()}}),t,null,[[2,14]])})));return function(e,a){return t.apply(this,arguments)}}()),Q=Object(p.b)("todolists/removeTodolist",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n,s;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(q({status:"loading"})),r(G({id:e,status:"loading"})),t.prev=3,t.next=6,g(e);case 6:if(0!==(s=t.sent).data.resultCode){t.next=12;break}return r(q({status:"succeeded"})),t.abrupt("return",{id:e});case 12:return F(s.data,r),t.abrupt("return",n({}));case 14:t.next=20;break;case 16:return t.prev=16,t.t0=t.catch(3),P(t.t0,r),t.abrupt("return",n({}));case 20:case"end":return t.stop()}}),t,null,[[3,16]])})));return function(e,a){return t.apply(this,arguments)}}()),X=Object(p.b)("todolists/addTodolist",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n,s;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(q({status:"loading"})),t.prev=2,t.next=5,k(e);case 5:if(0!==(s=t.sent).data.resultCode){t.next=11;break}return r(q({status:"succeeded"})),t.abrupt("return",{todolist:s.data.data.item});case 11:return F(s.data,r),t.abrupt("return",n({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),P(t.t0,r),t.abrupt("return",n({}));case 19:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e,a){return t.apply(this,arguments)}}()),tt=Object(p.b)("todolists/changeTodolistTitle",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n,s;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(q({status:"loading"})),t.prev=2,t.next=5,C(e.id,e.title);case 5:if(0!==(s=t.sent).data.resultCode){t.next=11;break}return r(q({status:"succeeded"})),t.abrupt("return",e);case 11:return F(s.data,r),t.abrupt("return",n({}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(2),P(t.t0,r),t.abrupt("return",n({}));case 19:case"end":return t.stop()}}),t,null,[[2,15]])})));return function(e,a){return t.apply(this,arguments)}}()),et=Object(p.c)({name:"tasks",initialState:{},reducers:{},extraReducers:function(t){t.addCase(X.fulfilled,(function(t,e){t[e.payload.todolist.id]=[]})).addCase(Q.fulfilled,(function(t,e){delete t[e.payload.id]})).addCase($.fulfilled,(function(t,e){e.payload.todolists.forEach((function(e){return t[e.id]=[]}))})).addCase(at.fulfilled,(function(t,e){t[e.payload.todolistId]=e.payload.tasks})).addCase(rt.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));-1!==r&&a.splice(r,1)})).addCase(nt.fulfilled,(function(t,e){t[e.payload.todoListId].unshift(e.payload)})).addCase(st.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));-1!==r&&(a[r]=Object(O.a)(Object(O.a)({},a[r]),e.payload.model))}))}}).reducer,at=Object(p.b)("tasks/fetchTasks",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(q({status:"loading"})),t.next=3,y(e);case 3:return r=t.sent,n=r.data.items,a.dispatch(q({status:"succeeded"})),t.abrupt("return",{tasks:n,todolistId:e});case 7:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),rt=Object(p.b)("tasks/removeTask",function(){var t=Object(h.a)(j.a.mark((function t(e,a){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(q({status:"loading"})),t.next=3,w(e.todolistId,e.taskId);case 3:return a.dispatch(q({status:"succeeded"})),t.abrupt("return",Object(O.a)({},e));case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),nt=Object(p.b)("tasks/addTask",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n,s,i;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(q({status:"loading"})),t.prev=2,t.next=5,T(e.todolistId,e.title);case 5:if(0!==(s=t.sent).data.resultCode){t.next=12;break}return i=s.data.data.item,r(q({status:"succeeded"})),t.abrupt("return",i);case 12:return F(s.data,r),t.abrupt("return",n({}));case 14:t.next=20;break;case 16:return t.prev=16,t.t0=t.catch(2),P(t.t0,r),t.abrupt("return",n({}));case 20:case"end":return t.stop()}}),t,null,[[2,16]])})));return function(e,a){return t.apply(this,arguments)}}()),st=Object(p.b)("tasks/updateTask",function(){var t=Object(h.a)(j.a.mark((function t(e,a){var r,n,s,i,c,o,u,d,l,p;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=a.dispatch,n=a.getState,s=a.rejectWithValue,i=e.taskId,c=e.model,o=e.todolistId,u=n(),d=u.tasks[o].find((function(t){return t.id===i}))){t.next=6;break}return t.abrupt("return",s({}));case 6:return l=Object(O.a)({deadline:d.deadline,description:d.description,priority:d.priority,startDate:d.startDate,title:d.title,status:d.status},c),t.prev=7,t.next=10,I(o,i,l);case 10:if(0!==(p=t.sent).data.resultCode){t.next=15;break}return t.abrupt("return",e);case 15:return F(p.data,r),t.abrupt("return",s({}));case 17:t.next=23;break;case 19:return t.prev=19,t.t0=t.catch(7),P(t.t0,r),t.abrupt("return",s({}));case 23:case"end":return t.stop()}}),t,null,[[7,19]])})));return function(e,a){return t.apply(this,arguments)}}()),it=Object(b.a)({tasks:et,todolists:J,app:z,auth:W});var ct=d.c,ot=a(210),ut=a(211),dt=a(207),lt=a(209),pt=a(208),bt=a(213),ft=a(212),jt=a(198),ht=a(203),Ot=a(201),xt=a(1),mt=i.a.forwardRef((function(t,e){return Object(xt.jsx)(Ot.a,Object(O.a)({elevation:6,ref:e,variant:"filled"},t))}));function vt(){var t=Object(d.c)((function(t){return t.app.error})),e=Object(d.b)(),a=function(t,a){"clickaway"!==a&&e(B({error:null}))};return Object(xt.jsx)(ht.a,{open:null!==t,autoHideDuration:6e3,onClose:a,children:Object(xt.jsx)(mt,{onClose:a,severity:"error",sx:{width:"100%"},children:t})})}var kt=a(14),gt=a(217),Ct=function(t){return t.app.isInitialized},yt=function(t){return t.app.status},wt=function(t){return t.todolists},Tt=function(t){return t.tasks},It=a(206),St=a(13),At=a(199),Et=a(195),Lt=i.a.memo((function(t){var e=t.addItem,a=t.disabled,r=void 0!==a&&a,n=Object(s.useState)(""),i=Object(St.a)(n,2),c=i[0],o=i[1],u=Object(s.useState)(null),d=Object(St.a)(u,2),l=d[0],p=d[1],b=function(){""!==c.trim()?(e(c),o("")):p("Title is required")};return Object(xt.jsxs)("div",{children:[Object(xt.jsx)(At.a,{variant:"outlined",disabled:r,error:!!l,value:c,onChange:function(t){o(t.currentTarget.value)},onKeyPress:function(t){null!==l&&p(null),13===t.charCode&&b()},label:"Title",helperText:l}),Object(xt.jsx)(dt.a,{color:"primary",onClick:b,disabled:r,style:{marginLeft:"5px"},children:Object(xt.jsx)(Et.a,{})})]})})),Ft=i.a.memo((function(t){var e=Object(s.useState)(!1),a=Object(St.a)(e,2),r=a[0],n=a[1],i=Object(s.useState)(t.value),c=Object(St.a)(i,2),o=c[0],u=c[1];return r?Object(xt.jsx)(At.a,{value:o,onChange:function(t){u(t.currentTarget.value)},autoFocus:!0,onBlur:function(){n(!1),t.onChange(o)}}):Object(xt.jsx)("span",{onDoubleClick:function(){n(!0),u(t.value)},children:t.value})})),Pt=a(196),Vt=a(202),Wt=i.a.memo((function(t){var e=Object(s.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),a=Object(s.useCallback)((function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.task.id,a?r.Completed:r.New,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(s.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(xt.jsxs)("div",{className:t.task.status===r.Completed?"is-done":"",style:{display:"flex",alignItems:"center"},children:[Object(xt.jsx)(Vt.a,{checked:t.task.status===r.Completed,color:"primary",onChange:a}),Object(xt.jsx)(Ft,{value:t.task.title,onChange:n}),Object(xt.jsx)(dt.a,{onClick:e,children:Object(xt.jsx)(Pt.a,{fontSize:"small"})})]},t.task.id)})),Nt=a(214),Rt=i.a.memo((function(t){var e=Object(s.useCallback)((function(e){t.addTask(e,t.todolist.id)}),[t.addTask,t.todolist.id]),a=Object(s.useCallback)((function(e){t.changeTodolistTitle(t.todolist.id,e)}),[t.todolist.id,t.changeTodolistTitle]),n=Object(s.useCallback)((function(e){return t.changeFilter(e,t.todolist.id)}),[t.todolist.id,t.changeFilter]),i=t.tasks;"active"===t.todolist.filter&&(i=t.tasks.filter((function(t){return t.status===r.New}))),"completed"===t.todolist.filter&&(i=t.tasks.filter((function(t){return t.status===r.Completed})));var c=function(e,a,r){return Object(xt.jsx)(pt.a,{variant:t.todolist.filter===e?"outlined":"text",onClick:function(){return n(e)},color:r,children:a})};return Object(xt.jsx)(It.a,{item:!0,style:{width:"350px"},children:Object(xt.jsxs)(Nt.a,{style:{width:"100%",padding:"10px",position:"relative"},children:[Object(xt.jsx)("h3",{children:Object(xt.jsx)(Ft,{value:t.todolist.title,onChange:a})}),Object(xt.jsx)(dt.a,{onClick:function(){t.removeTodolist(t.todolist.id)},size:"small",disabled:"loading"===t.todolist.entityStatus,style:{position:"absolute",top:"0",right:"0"},children:Object(xt.jsx)(Pt.a,{})}),Object(xt.jsx)(Lt,{addItem:e,disabled:"loading"===t.todolist.entityStatus}),i.map((function(e){return Object(xt.jsx)(Wt,{task:e,todolistId:t.todolist.id,removeTask:t.removeTask,changeTaskTitle:t.changeTaskTitle,changeTaskStatus:t.changeTaskStatus},e.id)})),i.length?Object(xt.jsxs)("div",{style:{paddingTop:"10px"},children:[c("all","All","inherit"),c("active","Active","primary"),c("completed","Completed","secondary")]}):Object(xt.jsx)("span",{style:{display:"inline-block",padding:"10px",color:"grey"},children:"no tasks"})]})})})),Dt=function(){var t=ct(wt),e=ct(Tt),a=ct(L),r=Object(d.b)(),n=Object(kt.g)();Object(s.useEffect)((function(){a?r($()):n("/login")}),[a]);var i=Object(s.useCallback)((function(t,e){r(rt({taskId:t,todolistId:e}))}),[]),c=Object(s.useCallback)((function(t,e){r(nt({title:t,todolistId:e}))}),[]),o=Object(s.useCallback)((function(t,e,a){r(st({taskId:t,model:{status:e},todolistId:a}))}),[]),u=Object(s.useCallback)((function(t,e,a){r(st({taskId:t,model:{title:e},todolistId:a}))}),[]),l=Object(s.useCallback)((function(t,e){r(_({id:e,filter:t}))}),[]),p=Object(s.useCallback)((function(t){r(Q(t))}),[]),b=Object(s.useCallback)((function(t,e){r(tt({id:t,title:e}))}),[]),f=Object(s.useCallback)((function(t){r(X(t))}),[r]);return Object(xt.jsxs)(xt.Fragment,{children:[Object(xt.jsx)(It.a,{container:!0,style:{padding:"20px"},children:Object(xt.jsx)(Lt,{addItem:f})}),Object(xt.jsx)(It.a,{container:!0,spacing:5,children:t.map((function(t){var a=e[t.id];return Object(xt.jsx)(Rt,{todolist:t,tasks:a,removeTask:i,changeFilter:l,addTask:c,changeTaskStatus:o,removeTodolist:p,changeTaskTitle:u,changeTodolistTitle:b},t.id)}))})]})},Mt=a(204),zt=a(216),Ut=a(215),qt=a(194),Bt=a(106),Ht=function(){var t=Object(d.b)(),e=ct(L),a=Object(Bt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password.trim()?t.password.trim().length<=3&&(e.password="Must be 3 characters or more"):e.password="Required",e},onSubmit:function(){var e=Object(h.a)(j.a.mark((function e(a,r){var n,s,i,c,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(R(a));case 2:n=e.sent,R.rejected.match(n)&&(null===(s=n.payload)||void 0===s||null===(i=s.fieldsErrors)||void 0===i?void 0:i.length)&&(o=null===(c=n.payload)||void 0===c?void 0:c.fieldsErrors[0],r.setFieldError(o.field,o.error));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()});return e?Object(xt.jsx)(kt.a,{to:"/"}):Object(xt.jsx)(It.a,{container:!0,justifyContent:"center",children:Object(xt.jsx)(It.a,{item:!0,justifyContent:"center",children:Object(xt.jsxs)(Mt.a,{children:[Object(xt.jsxs)(qt.a,{children:[Object(xt.jsxs)("p",{children:["To log in get registered",Object(xt.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(xt.jsx)("p",{children:"or use common test account credentials:"}),Object(xt.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(xt.jsx)("p",{children:"Password: free"})]}),Object(xt.jsx)("form",{onSubmit:a.handleSubmit,children:Object(xt.jsxs)(Ut.a,{children:[Object(xt.jsx)(At.a,Object(O.a)({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&Object(xt.jsx)("div",{style:{color:"red"},children:a.errors.email}),Object(xt.jsx)(At.a,Object(O.a)({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.email&&Object(xt.jsx)("div",{style:{color:"red"},children:a.errors.password}),Object(xt.jsx)(zt.a,{label:"Remember me",control:Object(xt.jsx)(Vt.a,Object(O.a)({checked:a.values.rememberMe},a.getFieldProps("rememberMe")))}),Object(xt.jsx)(pt.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})})]})})})};var Zt,Jt=function(t){var e=ct(yt),a=ct(Ct),r=ct(L),n=Object(d.b)();return Object(s.useEffect)((function(){n(H())}),[]),a?Object(xt.jsxs)("div",{className:"App",children:[Object(xt.jsx)(vt,{}),Object(xt.jsxs)(ot.a,{position:"static",children:[Object(xt.jsxs)(ut.a,{children:[Object(xt.jsx)(dt.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(xt.jsx)(jt.a,{})}),Object(xt.jsx)(lt.a,{variant:"h6",children:"News"}),r&&Object(xt.jsx)(pt.a,{color:"inherit",onClick:function(){return n(D())},children:"LogOUT"})]}),"loading"===e&&Object(xt.jsx)(ft.a,{})]}),Object(xt.jsx)(bt.a,{fixed:!0,children:Object(xt.jsxs)(kt.d,{children:[Object(xt.jsx)(kt.b,{path:"/",element:Object(xt.jsx)(Dt,{})}),Object(xt.jsx)(kt.b,{path:"/login",element:Object(xt.jsx)(Ht,{})}),Object(xt.jsx)(kt.b,{path:"/404",element:Object(xt.jsx)("h1",{style:{textAlign:"center"},children:"404: PAGE NOT FOUND"})}),Object(xt.jsx)(kt.b,{path:"/*",element:Object(xt.jsx)(kt.a,{to:"/404"})})]})})]}):Object(xt.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(xt.jsx)(gt.a,{})})},Kt=a(54);o.a.render(Object(xt.jsx)(i.a.StrictMode,{children:Object(xt.jsx)(Kt.a,{children:Object(xt.jsx)(d.a,{store:Object(p.a)({reducer:it,middleware:function(t){return t().prepend(l.a)},preloadedState:Zt}),children:Object(xt.jsx)(Jt,{})})})}),document.getElementById("root")),u()}},[[153,1,2]]]);
//# sourceMappingURL=main.6f00f241.chunk.js.map