"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TikTokTracker = void 0;
const tiktok_pixel_1 = __importDefault(require("tiktok-pixel"));
const normalizeProduct = (product) => {
    return {
        content_id: product.upc,
        content_name: product.name,
        quantity: product.qty,
        price: product.price,
    };
};
const subTotalReducer = (total, product) => {
    return total + (product.price * product.qty);
};
class TikTokTracker {
    constructor(tag) {
        this.doInstall = () => {
            tiktok_pixel_1.default.init(this.tag, {}, { debug: false });
            tiktok_pixel_1.default.pageView();
            //     if (document.getElementById("tiktok-tracker-" + this.tag)) {
            //       return;
            //     }
            //
            //     const ttScript = document.createElement("script");
            //     ttScript.id = "tiktok-tracker-" + this.tag
            //     ttScript.innerHTML = `
            // !function (w, d, t) {
            //   w.TiktokAnalyticsObject = t;
            //   var ttq = w[t] = w[t] || [];
            //   ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
            //   ttq.setAndDefer = function (t, e) {
            //     t[e] = function () {
            //       t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            //     }
            //   };
            //   for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
            //   ttq.instance = function (t) {
            //     for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
            //     return e
            //   };
            //   ttq.load = function (e, n) {
            //     var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
            //     ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {};
            //     var o = document.createElement("script");
            //     o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
            //     var a = document.getElementsByTagName("script")[0];
            //     a.parentNode.insertBefore(o, a)
            //   };
            //
            //
            //   ttq.load('${this.tag}');
            //   ttq.page();
            // }(window, document, 'ttq'); `;
            //     document.head.insertBefore(ttScript, document.head.childNodes[0]);
        };
        this.doViewItem = (product) => {
            this.doInstall();
        };
        this.doAddToCart = (product) => {
            this.doInstall();
            tiktok_pixel_1.default.track('AddToCart', {
                contents: [normalizeProduct(product)],
                content_type: 'product',
                currency: 'USD',
                value: product.price * product.qty
            });
        };
        this.doTrackLinkOff = (products, destination) => {
            // TikTok doesn't support link-out events directly
            console.info(`[TikTokTracker] link_off event not supported. Destination: ${destination}`);
        };
        this.doViewCart = (products) => {
            this.doInstall();
            //No such event on tiktok pixel
        };
        this.doRemoveFromCart = (products) => {
            this.doInstall();
        };
        this.doBeginCheckout = (products) => {
            this.doInstall();
            tiktok_pixel_1.default.track('InitiateCheckout', {});
        };
        this.doAddShippingInfo = (products) => {
            this.doInstall();
        };
        this.doAddPaymentInfo = (products) => {
            this.doInstall();
            tiktok_pixel_1.default.track('AddPaymentInfo', {});
        };
        this.doPurchase = (products, transactionId) => {
            this.doInstall();
            tiktok_pixel_1.default.track('PlaceAnOrder', {});
        };
        this.doRefund = (products, transactionId) => {
            this.doInstall();
            //No such event on facebook pixel
        };
        this.tag = tag;
    }
}
exports.TikTokTracker = TikTokTracker;
//# sourceMappingURL=tiktok-tracker.js.map