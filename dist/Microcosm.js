!function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(5);n.Store=r;var i=e(4);n.Microscope=i;var u=e(3);n.Microcosm=u,n["default"]=u},function(t){"use strict";t.exports=function(t,n){var e=void 0===arguments[0]?{}:arguments[0],r=void 0===arguments[2]?{}:arguments[2],i=Object.keys(e);return i.reduce(function(t,r){return t[r]=n(e[r],r),t},r)}},function(t,n,e){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t};Object.defineProperty(n,"__esModule",{value:!0});var i=r(e(1)),u=function(t,n){return""+t+"-"+n};n.identify=u,n["default"]=function(t,n){return i(t,function(t,e){return u(n,e)})}},function(t,n,e){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},i=function(){function t(t,n){for(var e in n){var r=n[e];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(t,n)}return function(n,e,r){return e&&t(n.prototype,e),r&&t(n,r),n}}(),u=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")},o=r(e(7)),s=r(e(8)),c=r(e(2)),a=r(e(1)),f=e(10).Dispatcher,l=function(){function t(n){u(this,t),this._seed=n||{},this._heart=o(),this._dispatcher=new f,this._dispatcher.register(this._enqueue.bind(this))}return i(t,{listen:{get:function(){return this._heart.listen}},ignore:{get:function(){return this._heart.ignore}},_enqueue:{value:function(t){for(var n in this.stores)this.stores[n].send(t);this._heart.beat()}},addActions:{value:function(t){this.actions=a(t,s(this._dispatcher))}},addStores:{value:function(t){var n=this,e=a(this.actions,c);this.stores=a(t,function(t,r){return new t(e,n._seed[r],n)})}},serialize:{value:function(){return a(this.stores,function(t){return t.serialize()})}}}),t}();t.exports=l},function(t,n,e){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},i=function(t,n){var e={};for(var r in t)n.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},u=r(e(11)),o=u.createClass({displayName:"Microscope",propTypes:{flux:u.PropTypes.object.isRequired},getDefaultProps:function(){return{element:"div"}},tick:function(){this.forceUpdate()},componentDidMount:function(){this.props.flux.listen(this.tick)},componentWillUnmount:function(){this.props.flux.ignore(this.tick)},render:function(){var t=this.props,n=t.children,e=t.element,r=t.flux,o=i(t,["children","element","flux"]),s=u.Children.map(n,function(t){var n=t.type.query,e=n?n(r.stores):null;return u.addons.cloneWithProps(t,e)});return u.createElement(e,o,s)}});t.exports=o},function(t){"use strict";var n=function(){function t(t,n){for(var e in n){var r=n[e];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(t,n)}return function(n,e,r){return e&&t(n.prototype,e),r&&t(n,r),n}}(),e=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")},r=function(){function t(n,r){e(this,t),this._tasks=this.register(n),this.state=this.getInitialState(r)}return n(t,{getInitialState:{value:function(){}},register:{value:function(){}},all:{get:function(){return this.state}},send:{value:function(t){var n=t.type,e=t.body;this._tasks&&n in this._tasks&&this._tasks[n].call(this,e)}},toJSON:{value:function(){return this.state}},serialize:{value:function(){return void 0}}}),t}();t.exports=r},function(t,n,e){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},i=r(e(9));t.exports=function(t,n,e){return i(e).then(function(e){return t.dispatch({type:n,body:e}),e})}},function(t){"use strict";t.exports=function(){var t=[],n=null,e=function(){for(var n=0;n<t.length;n++)t[n]()};return{ignore:function(n){t=t.filter(function(t){return t!==n})},listen:function(n){t=t.concat(n)},beat:function(){t.length>0&&(cancelAnimationFrame(n),n=requestAnimationFrame(e))}}}},function(t,n,e){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},i=r(e(6)),u=r(e(1)),o=e(2).identify;t.exports=function(t){return function(n,e){return u(n,function(n,r){var u=o(e,r);return function(){for(var e=arguments.length,r=Array(e),o=0;e>o;o++)r[o]=arguments[o];return i(t,u,n.apply(void 0,r))}},{})}}},function(t){"use strict";t.exports=function(t){return t instanceof Promise?t:Promise.resolve(t)}},function(t){t.exports=flux},function(t){t.exports=react/addons}]);
//# sourceMappingURL=Microcosm.js.map