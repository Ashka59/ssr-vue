import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../entry-server.js";
import "node:path";
import "vue-router";
const _sfc_main = {
  data() {
    return {
      items: []
    };
  },
  mounted() {
    fetch("api/items").then((response) => response.json()).then((data) => this.items = data);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "about" }, _attrs))}><h1>This is an about page</h1><ul><!--[-->`);
  ssrRenderList($data.items, (item) => {
    _push(`<li>${ssrInterpolate(item)}</li>`);
  });
  _push(`<!--]--></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AboutView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AboutView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AboutView as default
};
