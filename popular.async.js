webpackJsonp([1],{235:function(n,t,e){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}function u(n){var t=n.banners,e=n.playlists,r=n.handleLoadPlaylist;return(0,l.default)(d,{data:e,banners:t,onLoadPlaylist:r})}Object.defineProperty(t,"__esModule",{value:!0});var a=e(219),l=r(a),o=e(3),i=(r(o),e(225)),c=e(125),s=e(224),f=r(s),d=(0,f.default)({loader:function(){return e.e(9).then(e.bind(null,586))},loading:function(){return null}}),p=function(n){return n.app.banners},y=function(n){return n.playlist.data.slice(0,6)},b=function(n){return n.store.playlists},P=(0,i.createSelector)(b,y,function(n,t){return t.map(function(t){return n.filter(function(n){return n.id===t}).pop()})}),_=function(n){return(0,i.createSelector)(p,P,function(n,t){return{banners:n,playlists:t}})(n)},h=function(n){return{handleLoadPlaylist:function(t){n({type:"playlist/sync/one",payload:t.id})}}};t.default=(0,c.connect)(_,h)(u),n.exports=t.default}});