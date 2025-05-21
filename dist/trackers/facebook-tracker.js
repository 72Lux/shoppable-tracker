"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookTracker = void 0;
const normalizeProduct = (product) => {
    return {
        id: product.upc,
        quantity: product.qty
    };
};
const subTotalReducer = (total, product) => {
    return total + (product.price * product.qty);
};
class FacebookTracker {
    constructor(tag) {
        this.doInstall = () => {
            if (document.getElementById("facebook-tracker-" + this.tag)) {
                return;
            }
            const fbScript = document.createElement("script");
            fbScript.innerHTML = `!function(f,b,e,v,n,t,s)     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?    n.callMethod.apply(n,arguments):n.queue.push(arguments)};    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';    n.queue=[];t=b.createElement(e);t.async=!0;    t.src=v;s=b.getElementsByTagName(e)[0];    s.parentNode.insertBefore(t,s)}(window, document,'script',    'https://connect.facebook.net/en_US/fbevents.js');    fbq('init', '${this.tag}');    fbq('track', 'PageView');`;
            document.head.insertBefore(fbScript, document.head.childNodes[0]);
            // <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=245936138167934&ev=PageView&noscript=1"/></noscript>
            const noScriptFb = document.createElement('noscript');
            noScriptFb.id = "facebook-tracker-" + this.tag;
            noScriptFb.innerHTML = `<img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=${this.tag}&ev=PageView&noscript=1"/>`;
            document.head.insertBefore(noScriptFb, document.head.childNodes[0]);
            fbq('track', 'ViewContent');
            // const fbScript = document.createElement("script");
            // fbScript.async = true;
            // fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
            // fbScript.innerHTML = "";
            // document.head.insertBefore(fbScript, document.head.childNodes[document.head.childNodes.length-1]);
            // fbq('init', this.tag);
            // fbq('track', 'PageView');
            // const noScriptFb = document.createElement('noscript');
            // noScriptFb.id = "facebook-tracker-" + this.tag;
            // noScriptFb.innerHTML = `<img height="1" width="1" style="display:none"
            //    src="https://www.facebook.com/tr?id=${this.tag}&ev=PageView&noscript=1"/>`;
            // document.head.insertBefore(noScriptFb, document.head.childNodes[0]);
            // fbq('track', 'ViewContent');
        };
        this.doViewItem = (product) => {
            this.doInstall();
            fbq('track', 'ViewContent', {
                contents: [normalizeProduct(product)],
                content_type: 'product',
                content_ids: [product.upc],
                content_name: product.name
            });
        };
        this.doAddToCart = (product) => {
            this.doInstall();
            fbq('track', 'AddToCart', {
                contents: [normalizeProduct(product)],
                content_type: 'product',
                content_ids: [product.upc],
                content_name: product.name,
                currency: 'USD',
                value: product.price * product.qty
            });
        };
        this.doTrackLinkOff = (products) => {
            this.doInstall();
            fbq('trackCustom', 'LinkOffCheckout', {
                content_ids: products.map(p => p.upc),
                contents: products.map(normalizeProduct),
                value: products.reduce(subTotalReducer, 0),
                currency: "USD"
            });
        };
        this.doViewCart = (products) => {
            this.doInstall();
            //No such event on facebook pixel
        };
        this.doRemoveFromCart = (products) => {
            this.doInstall();
            //No such event on facebook pixel
        };
        this.doBeginCheckout = (products) => {
            this.doInstall();
            fbq('track', 'InitiateCheckout', {
                content_ids: products.map(products => products.upc),
                contents: products.map(normalizeProduct),
                currency: "USD",
                num_items: products.length,
                value: products.reduce(subTotalReducer, 0),
            });
        };
        this.doAddShippingInfo = (products) => {
            this.doInstall();
            //No such event on facebook pixel
        };
        this.doAddPaymentInfo = (products) => {
            this.doInstall();
            fbq('track', 'AddPaymentInfo', {
                content_ids: products.map(products => products.upc),
                contents: products.map(normalizeProduct),
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
            });
        };
        this.doPurchase = (products, transactionId) => {
            this.doInstall();
            fbq('track', 'Purchase', {
                content_ids: products.map(products => products.upc),
                contents: products.map(normalizeProduct),
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
            });
        };
        this.doRefund = (products, transactionId) => {
            this.doInstall();
            //No such event on facebook pixel
        };
        this.tag = tag;
    }
}
exports.FacebookTracker = FacebookTracker;
//# sourceMappingURL=facebook-tracker.js.map