!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).mapboxGlDrawPassingMode={})}(this,(function(e){"use strict";const t="add",o="move",n="pointer",i="none",r="polygon",s="line_string",a="point",l="Feature",u="Polygon",c="LineString",d="Point",p="simple_select",h="draw.create",g="feature",f="vertex",y="true",m="false";function C(e){const t=e.featureTarget;return!!t&&(!!t.properties&&t.properties.meta===f)}function v(e){return 27===e.keyCode}function M(e){return 13===e.keyCode}const S={onSetup:function(){const e=this.newFeature({type:l,properties:{},geometry:{type:d,coordinates:[]}});return this.addFeature(e),this.clearSelectedFeatures(),this.updateUIClasses({mouse:t}),this.activateUIButton(a),this.setActionableState({trash:!0}),{point:e}},stopDrawingAndRemove:function(e){this.deleteFeature([e.point.id],{silent:!0}),this.changeMode(p)}};S.onTap=S.onClick=function(e,t){this.updateUIClasses({mouse:o}),e.point.updateCoordinate("",t.lngLat.lng,t.lngLat.lat),this.map.fire(h,{features:[e.point.toGeoJSON()]}),this.changeMode(p,{featureIds:[e.point.id]})},S.onStop=function(e){this.activateUIButton(),e.point.getCoordinate().length||this.deleteFeature([e.point.id],{silent:!0})},S.toDisplayFeatures=function(e,t,o){const n=t.properties.id===e.point.id;if(t.properties.active=n?y:m,!n)return o(t)},S.onTrash=S.stopDrawingAndRemove,S.onKeyUp=function(e,t){if(v(t)||M(t))return this.stopDrawingAndRemove(e,t)};const{onSetup:I,onClick:k,...w}=S,x={originOnSetup:I,originOnClick:k,...w};function F(e,t){return!!e.lngLat&&(e.lngLat.lng===t[0]&&e.lngLat.lat===t[1])}x.onSetup=function(e){const t=this.originOnSetup();return t.callBack=e,t},x.onTap=x.onClick=function(e,t){this.updateUIClasses({mouse:o}),e.point.updateCoordinate("",t.lngLat.lng,t.lngLat.lat),"function"==typeof e.callBack?e.callBack(e.point.toGeoJSON()):this.map.fire("draw.passing-create",{features:[e.point.toGeoJSON()]}),this.changeMode(p,{},{silent:!0})},x.onMouseMove=function(e,o){this.updateUIClasses({mouse:t}),e.point.updateCoordinate(o.lngLat.lng,o.lngLat.lat)},x.onStop=function(e){this.activateUIButton(),this.deleteFeature([e.point.id],{silent:!0})};var V={enable(e){setTimeout((()=>{e.map&&e.map.doubleClickZoom&&e._ctx&&e._ctx.store&&e._ctx.store.getInitialConfigValue&&e._ctx.store.getInitialConfigValue("doubleClickZoom")&&e.map.doubleClickZoom.enable()}),0)},disable(e){setTimeout((()=>{e.map&&e.map.doubleClickZoom&&e.map.doubleClickZoom.disable()}),0)}};function U(e,t,o,n){return{type:l,properties:{meta:f,parent:e,coord_path:o,active:n?y:m},geometry:{type:d,coordinates:t}}}const P={onSetup:function(e){const o=(e=e||{}).featureId;let n,i,r="forward";if(o){if(n=this.getFeature(o),!n)throw new Error("Could not find a feature with the provided featureId");let t=e.from;if(t&&"Feature"===t.type&&t.geometry&&"Point"===t.geometry.type&&(t=t.geometry),t&&"Point"===t.type&&t.coordinates&&2===t.coordinates.length&&(t=t.coordinates),!t||!Array.isArray(t))throw new Error("Please use the `from` property to indicate which point to continue the line from");const s=n.coordinates.length-1;if(n.coordinates[s][0]===t[0]&&n.coordinates[s][1]===t[1])i=s+1,n.addCoordinate(i,...n.coordinates[s]);else{if(n.coordinates[0][0]!==t[0]||n.coordinates[0][1]!==t[1])throw new Error("`from` should match the point at either the start or the end of the provided LineString");r="backwards",i=0,n.addCoordinate(i,...n.coordinates[0])}}else n=this.newFeature({type:l,properties:{},geometry:{type:c,coordinates:[]}}),i=0,this.addFeature(n);return this.clearSelectedFeatures(),V.disable(this),this.updateUIClasses({mouse:t}),this.activateUIButton(s),this.setActionableState({trash:!0}),{line:n,currentVertexPosition:i,direction:r}},clickAnywhere:function(e,o){if(e.currentVertexPosition>0&&F(o,e.line.coordinates[e.currentVertexPosition-1])||"backwards"===e.direction&&F(o,e.line.coordinates[e.currentVertexPosition+1]))return this.changeMode(p,{featureIds:[e.line.id]});this.updateUIClasses({mouse:t}),e.line.updateCoordinate(e.currentVertexPosition,o.lngLat.lng,o.lngLat.lat),"forward"===e.direction?(e.currentVertexPosition++,e.line.updateCoordinate(e.currentVertexPosition,o.lngLat.lng,o.lngLat.lat)):e.line.addCoordinate(0,o.lngLat.lng,o.lngLat.lat)},clickOnVertex:function(e){return this.changeMode(p,{featureIds:[e.line.id]})},onMouseMove:function(e,t){e.line.updateCoordinate(e.currentVertexPosition,t.lngLat.lng,t.lngLat.lat),C(t)&&this.updateUIClasses({mouse:n})}};P.onTap=P.onClick=function(e,t){if(C(t))return this.clickOnVertex(e,t);this.clickAnywhere(e,t)},P.onKeyUp=function(e,t){M(t)?this.changeMode(p,{featureIds:[e.line.id]}):v(t)&&(this.deleteFeature([e.line.id],{silent:!0}),this.changeMode(p))},P.onStop=function(e){V.enable(this),this.activateUIButton(),void 0!==this.getFeature(e.line.id)&&(e.line.removeCoordinate(`${e.currentVertexPosition}`),e.line.isValid()?this.map.fire(h,{features:[e.line.toGeoJSON()]}):(this.deleteFeature([e.line.id],{silent:!0}),this.changeMode(p,{},{silent:!0})))},P.onTrash=function(e){this.deleteFeature([e.line.id],{silent:!0}),this.changeMode(p)},P.toDisplayFeatures=function(e,t,o){const n=t.properties.id===e.line.id;if(t.properties.active=n?y:m,!n)return o(t);t.geometry.coordinates.length<2||(t.properties.meta=g,o(U(e.line.id,t.geometry.coordinates["forward"===e.direction?t.geometry.coordinates.length-2:1],""+("forward"===e.direction?t.geometry.coordinates.length-2:1),!1)),o(t))};const{onSetup:b,onMouseMove:L,...O}=P,B={originOnSetup:b,originOnMouseMove:L,...O};B.onSetup=function(e){const t=this.originOnSetup();return t.callBack=e,t},B.onMouseMove=function(e,o){this.updateUIClasses({mouse:t}),this.originOnMouseMove(e,o)},B.onStop=function(e){const t=e.line;this.updateUIClasses({mouse:i}),V.enable(this),this.activateUIButton(),void 0!==this.getFeature(t.id)&&(t.removeCoordinate(`${e.currentVertexPosition}`),t.isValid()&&("function"==typeof e.callBack?e.callBack(t.toGeoJSON()):this.map.fire("draw.passing-create",{features:[t.toGeoJSON()]})),this.deleteFeature([t.id],{silent:!0}),this.changeMode(p,{},{silent:!0}))};const _={onSetup:function(){const e=this.newFeature({type:l,properties:{},geometry:{type:u,coordinates:[[]]}});return this.addFeature(e),this.clearSelectedFeatures(),V.disable(this),this.updateUIClasses({mouse:t}),this.activateUIButton(r),this.setActionableState({trash:!0}),{polygon:e,currentVertexPosition:0}},clickAnywhere:function(e,o){if(e.currentVertexPosition>0&&F(o,e.polygon.coordinates[0][e.currentVertexPosition-1]))return this.changeMode(p,{featureIds:[e.polygon.id]});this.updateUIClasses({mouse:t}),e.polygon.updateCoordinate(`0.${e.currentVertexPosition}`,o.lngLat.lng,o.lngLat.lat),e.currentVertexPosition++,e.polygon.updateCoordinate(`0.${e.currentVertexPosition}`,o.lngLat.lng,o.lngLat.lat)},clickOnVertex:function(e){return this.changeMode(p,{featureIds:[e.polygon.id]})},onMouseMove:function(e,t){e.polygon.updateCoordinate(`0.${e.currentVertexPosition}`,t.lngLat.lng,t.lngLat.lat),C(t)&&this.updateUIClasses({mouse:n})}};_.onTap=_.onClick=function(e,t){return C(t)?this.clickOnVertex(e,t):this.clickAnywhere(e,t)},_.onKeyUp=function(e,t){v(t)?(this.deleteFeature([e.polygon.id],{silent:!0}),this.changeMode(p)):M(t)&&this.changeMode(p,{featureIds:[e.polygon.id]})},_.onStop=function(e){this.updateUIClasses({mouse:i}),V.enable(this),this.activateUIButton(),void 0!==this.getFeature(e.polygon.id)&&(e.polygon.removeCoordinate(`0.${e.currentVertexPosition}`),e.polygon.isValid()?this.map.fire(h,{features:[e.polygon.toGeoJSON()]}):(this.deleteFeature([e.polygon.id],{silent:!0}),this.changeMode(p,{},{silent:!0})))},_.toDisplayFeatures=function(e,t,o){const n=t.properties.id===e.polygon.id;if(t.properties.active=n?y:m,!n)return o(t);if(0===t.geometry.coordinates.length)return;const i=t.geometry.coordinates[0].length;if(!(i<3)){if(t.properties.meta=g,o(U(e.polygon.id,t.geometry.coordinates[0][0],"0.0",!1)),i>3){const n=t.geometry.coordinates[0].length-3;o(U(e.polygon.id,t.geometry.coordinates[0][n],`0.${n}`,!1))}if(i<=4){const e=[[t.geometry.coordinates[0][0][0],t.geometry.coordinates[0][0][1]],[t.geometry.coordinates[0][1][0],t.geometry.coordinates[0][1][1]]];if(o({type:l,properties:t.properties,geometry:{coordinates:e,type:c}}),3===i)return}return o(t)}},_.onTrash=function(e){this.deleteFeature([e.polygon.id],{silent:!0}),this.changeMode(p)};const{onSetup:A,onMouseMove:T,...G}=_,J={originOnSetup:A,originOnMouseMove:T,...G};J.onSetup=function(e){const t=this.originOnSetup();return t.callBack=e,t},J.onMouseMove=function(e,o){this.updateUIClasses({mouse:t}),this.originOnMouseMove(e,o)},J.onStop=function(e){const t=e.line||e.polygon;this.updateUIClasses({mouse:i}),V.enable(this),this.activateUIButton(),void 0!==this.getFeature(t.id)&&(t.removeCoordinate(`${e.currentVertexPosition}`),t.isValid()&&("function"==typeof e.callBack?e.callBack(t.toGeoJSON()):this.map.fire("draw.passing-create",{features:[t.toGeoJSON()]})),this.deleteFeature([t.id],{silent:!0}),this.changeMode(p,{},{silent:!0}))},e.passing_draw_line_string=B,e.passing_draw_point=x,e.passing_draw_polygon=J,Object.defineProperty(e,"__esModule",{value:!0})}));
