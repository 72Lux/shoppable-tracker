"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAnalytics4Tracker = void 0;
// @ts-ignore
const ga_gtag_1 = require("ga-gtag");
const normalizeProduct = (product, index) => {
    var _a;
    return {
        item_id: product.upc,
        item_name: product.name,
        affiliation: product.merchant,
        index: index,
        item_brand: product.brand,
        item_category: product.category,
        item_variant: [product.color, product.size].join(", "),
        price: product.price,
        quantity: (_a = product.qty) !== null && _a !== void 0 ? _a : 1
    };
};
const subTotalReducer = (total, product) => {
    return total + (product.price * product.qty);
};
class GoogleAnalytics4Tracker {
    constructor() {
        this.doInstall = (measurementId) => {
            (0, ga_gtag_1.install)(measurementId);
        };
        this.doViewItem = (products) => {
            (0, ga_gtag_1.gtag)("event", "view_item", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doAddToCart = (products) => {
            (0, ga_gtag_1.gtag)("event", "add_to_cart", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doViewCart = (products) => {
            (0, ga_gtag_1.gtag)("event", "view_cart", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doRemoveFromCart = (products) => {
            (0, ga_gtag_1.gtag)("event", "remove_from_cart", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doBeginCheckout = (products) => {
            (0, ga_gtag_1.gtag)("event", "begin_checkout", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doAddShippingInfo = (products) => {
            (0, ga_gtag_1.gtag)("event", "add_shipping_info", {
                currency: "USD",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doAddPaymentInfo = (products) => {
            (0, ga_gtag_1.gtag)("event", "add_payment_info", {
                currency: "USD",
                payment_type: "Credit Card",
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doPurchase = (products, transactionId) => {
            (0, ga_gtag_1.gtag)("event", "purchase", {
                currency: "USD",
                transaction_id: transactionId,
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
        this.doRefund = (products, transactionId) => {
            (0, ga_gtag_1.gtag)("event", "refund", {
                currency: "USD",
                transaction_id: transactionId,
                value: products.reduce(subTotalReducer, 0),
                items: products.map(normalizeProduct)
            });
        };
    }
}
exports.GoogleAnalytics4Tracker = GoogleAnalytics4Tracker;
//# sourceMappingURL=index.js.map