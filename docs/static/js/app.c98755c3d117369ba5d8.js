webpackJsonp([1],{Bsyk:function(e,t){},DRxF:function(e,t){},NHnr:function(e,t,n){"use strict";function i(){var e=d.getWorldDirection();e.multiplyScalar(.3),_[87]&&d.position.add(e),_[65],_[83]&&d.position.add(e.multiplyScalar(-1)),_[68],d.setRotationFromQuaternion(new s.h(0,0,0,1)),d.rotateOnWorldAxis(new s.m(1,0,0),f),d.rotateOnWorldAxis(new s.m(0,1,0),v),a.render(l,d),window.requestAnimationFrame(g)}function o(e){b&&(v-=e.movementX/1e3,f-=e.movementY/1e3),b=e.offsetX,e.offsetY}Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),s=n("Ml+6"),a=void 0,l=void 0,d=void 0,c=void 0,u=void 0,h=void 0,f=-.8,v=0,m=[],p=new s.i,w=void 0,y=void 0,g=i,_=[],b=void 0,x={props:["world","selected"],watch:{world:function(e){!function(e){m=[],(d=new s.g(70,1,1,1e3)).position.z=50,d.position.y=50,d.rotation.x=-.8,l=new s.j;var t=new s.b(.2,.2,.2),n=new s.b(1,1,1),i=new s.b(2,2,2),o=new s.f({color:16777215,shading:s.k}),r=new s.f({color:16716049,shading:s.k}),a=new s.f({color:1179409,shading:s.k});y=new s.f({color:16776977,shading:s.k}),(u=new s.c(16777181,.5)).position.set(-10,300.75,500),l.add(u),h=new s.a(16777215,.5),l.add(h),c=new s.d,e.things.forEach(function(e){var l=void 0;(l=0===e.type.indexOf("StructureFrame",0)?new s.e(i,o):e.parent?new s.e(t,a):new s.e(n,r)).position.x=e.pos.x,l.position.y=e.pos.y,l.position.z=e.pos.z,c.add(l),e.mesh=l,m[e.mesh.uuid]=e}),l.add(c)}(e),window.requestAnimationFrame(i),!0},selected:function(e,t){t.mesh&&(t.mesh.material=w),w=e.mesh.material,e.mesh.material=y,t=e}},mounted:function(){window.onkeyup=function(e){_[e.keyCode]=!1},window.onkeydown=function(e){_[e.keyCode]=!0},(a=new s.n).setPixelRatio(window.devicePixelRatio),a.setSize(600,600),this.$el.appendChild(a.domElement),a.domElement.oncontextmenu=function(e){return!1},a.domElement.onmousedown=function(e){if(2===e.button)a.domElement.requestPointerLock(),document.addEventListener("mousemove",o,!1);else if(0===e.button){var t=new s.l(e.offsetX/e.target.clientWidth*2-1,-e.offsetY/e.target.clientHeight*2+1);console.log(t),p.setFromCamera(t,d);var n=p.intersectObjects(c.children);n.length&&document.bus.$emit("thing-selected",m[n[0].object.uuid])}return!1},a.domElement.onmouseup=function(e){return document.exitPointerLock(),document.removeEventListener("mousemove",o,!1),!1}}},L={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"level-view"})},staticRenderFns:[]},S=n("VU/8")(x,L,!1,function(e){n("i0r/")},"data-v-0b231b80",null).exports,F=n("Zrlr"),k=n.n(F),E=n("wxAW"),W=n.n(E),M=function(){function e(){k()(this,e)}return W()(e,null,[{key:"createWorldFromXML",value:function(e){var t={};t.dom=e,t.things=[];var n=e.querySelectorAll("ThingSaveData");return n.forEach(function(e){var n=e.querySelector("WorldPosition"),i=e.querySelector("CustomName"),o={id:1*e.querySelector("ReferenceId").innerHTML,dom:e,type:e.querySelector("PrefabName").innerHTML,name:i.innerHTML,pos:{x:1*n.querySelector("x").innerHTML,y:1*n.querySelector("y").innerHTML,z:1*n.querySelector("z").innerHTML}};t.things[o.id]=o}),t.things.forEach(function(e){var n=e.dom.querySelector("ParentReferenceId");n&&(e.parent=t.things[n.innerHTML])}),t.title=n.length+" loaded things.",t}}]),e}(),P={props:["world"],data:function(){return{loadWorld:function(e){var t=e.target,n=t.files[0],i=new FileReader;n&&(i.onload=function(e){var n=(new DOMParser).parseFromString(e.target.result,"text/xml"),i=M.createWorldFromXML(n);document.bus.$emit("world-loaded",i),t.value=""},i.readAsText(n))},saveWorld:function(){new XMLSerializer}}}},T={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"loadsave"}},[t("label",{staticClass:"button"},[t("input",{attrs:{type:"file",name:"file"},on:{change:this.loadWorld}}),this._v("\n    Load World\n  ")]),this._v(" "),t("div",{staticClass:"button",on:{click:this.saveWorld}},[this._v("\n    Save Copy of World\n  ")]),this._v(" "),t("div",[this.world?t("h3",[this._v(this._s(this.world.title))]):this._e()])])},staticRenderFns:[]},R=n("VU/8")(P,T,!1,function(e){n("TUn+")},"data-v-68356df6",null).exports,q={props:["players"],methods:{selectPlayer:function(e){document.bus.$emit("thing-selected",e)}}},C={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v("Players:")]),e._v(" "),n("ul",{staticClass:"player-list"},e._l(e.players,function(t){return n("li",{on:{click:function(n){e.selectPlayer(t)}}},[e._v("\n      "+e._s(t.name)+"\n    ")])}))])},staticRenderFns:[]},$=n("VU/8")(q,C,!1,function(e){n("Bsyk")},"data-v-0b3b7179",null).exports,H={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"inspector"},[t("h3",[this._v(this._s(this.thing.name))]),this._v(" "),t("ul",[t("li",[this._v(this._s(this.thing.type))]),this._v(" "),t("li",[this._v(this._s(this.thing.pos))])])])},staticRenderFns:[]},z=n("VU/8")({props:["thing"]},H,!1,function(e){n("DRxF")},"data-v-af93886e",null).exports,A=n("M4fF"),X={name:"app",data:function(){return{world:{},selected:{}}},computed:{players:function(){return Object(A.filter)(this.world.things,function(e){return e&&"Character"===e.type})}},created:function(){var e=this;document.bus.$on("world-loaded",function(t){e.world=t}),document.bus.$on("thing-selected",function(t){e.selected=t})},components:{LevelView3D:S,LevelLoadSave:R,PlayerList:$,ThingInspector:z}},D={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"left-panel"}},[t("LevelLoadSave",{attrs:{world:this.world}}),this._v(" "),t("PlayerList",{attrs:{players:this.players}})],1),this._v(" "),t("div",{attrs:{id:"center"}},[t("LevelView3D",{attrs:{world:this.world,selected:this.selected}})],1),this._v(" "),t("div",{attrs:{id:"right-panel"}},[t("ThingInspector",{attrs:{thing:this.selected}})],1)])},staticRenderFns:[]},O=n("VU/8")(X,D,!1,function(e){n("z54X")},null,null).exports;r.a.config.productionTip=!1,document.bus=new r.a,new r.a({el:"#app",template:"<App/>",components:{App:O}})},"TUn+":function(e,t){},"i0r/":function(e,t){},z54X:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.c98755c3d117369ba5d8.js.map