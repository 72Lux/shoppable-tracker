"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleTracker = void 0;
// @ts-ignore
const ga_gtag_1 = require("ga-gtag");
const normalizeProduct = (product, index) => {
    return {
        item_id: product.upc,
        item_name: product.name,
        affiliation: product.merchant,
        index: index,
        item_brand: product.brand,
        item_category: product.category,
        item_variant: [product.color, product.size].join(", "),
        price: product.price,
        quantity: product.qty
    };
};
const subTotalReducer = (total, product) => {
    return total + (product.price * product.qty);
};
class GoogleTracker {
    constructor(tag) {
        this.doInstall = () => {
            (0, ga_gtag_1.install)(this.tag);
        };
        this.doViewItem = (product) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "view_item", {
                currency: "USD",
                value: product.price * product.qty,
                items: [normalizeProduct(product, 0)]
            });
        };
        this.doAddToCart = (product) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "add_to_cart", {
                currency: "USD",
                value: product.price * product.qty,
                items: [normalizeProduct(product, 0)]
            });
        };
        this.doTrackLinkOff = (products, destination) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "link_off", {
                destination,
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map((product, i) => normalizeProduct(product, i)),
            });
        };
        this.doViewCart = (products) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "view_cart", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doRemoveFromCart = (product) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "remove_from_cart", {
                currency: "USD",
                value: product.price * product.qty,
                items: [normalizeProduct(product, 0)]
            });
        };
        this.doBeginCheckout = (products) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "begin_checkout", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doAddShippingInfo = (products) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "add_shipping_info", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doAddPaymentInfo = (products) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "add_payment_info", {
                currency: "USD",
                payment_type: "Credit Card",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doPurchase = (products, transactionId) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "purchase", {
                currency: "USD",
                transaction_id: transactionId,
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doRefund = (products, transactionId) => {
            this.doInstall();
            (0, ga_gtag_1.gtag)("event", "refund", {
                currency: "USD",
                transaction_id: transactionId,
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.tag = tag;
    }
}
exports.GoogleTracker = GoogleTracker;
//# sourceMappingURL=google-tracker.js.map