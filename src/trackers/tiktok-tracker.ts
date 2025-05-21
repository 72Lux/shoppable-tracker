import ITracker from "../types/ITracker";
import IProduct from "../types/IProduct";
import TiktokPixel from 'tiktok-pixel';
const normalizeProduct = (product: IProduct) => {
  return {
    content_id: product.upc,
    content_name: product.name,
    quantity: product.qty,
    price: product.price,
  }
}
const subTotalReducer = (total: number, product: IProduct) => {
  return total + (product.price * product.qty)
}

export class TikTokTracker implements ITracker {
  private tag: string

  constructor(tag: string) {
    this.tag = tag
  }

  doInstall = () => {
    TiktokPixel.init(this.tag, {}, {debug:false});
    TiktokPixel.pageView();
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
  }
  doViewItem = (product: IProduct) => {
    this.doInstall();
  }
  doAddToCart = (product: IProduct) => {
    this.doInstall();
    TiktokPixel.track('AddToCart', {
      contents: [normalizeProduct(product)],
      content_type: 'product',
      currency: 'USD',
      value: product.price * product.qty
    })
  }

  doTrackLinkOff = (products: IProduct[]) => {
    // TikTok doesn't support link-out events directly
    // console.info(`[TikTokTracker] link_off event not supported. Destination: ${destination}`);
  };

  doViewCart = (products: IProduct[]) => {
    this.doInstall();
    //No such event on tiktok pixel
  }
  doRemoveFromCart = (products: IProduct) => {
    this.doInstall();
  }
  doBeginCheckout = (products: IProduct[]) => {
    this.doInstall();
    TiktokPixel.track('InitiateCheckout', {})
  }
  doAddShippingInfo = (products: IProduct[]) => {
    this.doInstall();
  }
  doAddPaymentInfo = (products: IProduct[]) => {
    this.doInstall();
    TiktokPixel.track('AddPaymentInfo', {})
  }
  doPurchase = (products: IProduct[], transactionId: string) => {
    this.doInstall();
    TiktokPixel.track('PlaceAnOrder', {})

  }
  doRefund = (products: IProduct[], transactionId: string) => {
    this.doInstall();
    //No such event on facebook pixel
  }
}