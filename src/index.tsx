// @ts-ignore
import {gtag, install} from 'ga-gtag';
import {IProduct} from "./types/IProduct";
import ITracker from "./types/ITracker";
const normalizeProduct = (product: IProduct, index: number) => {
  return {
    item_id: product.upc,
    item_name: product.name,
    affiliation: product.merchant,
    index: index,
    item_brand: product.brand,
    item_category: product.category,
    item_variant: [product.color, product.size].join(", "),
    price: product.price,
    quantity: product.qty ?? 1
  }
}
const subTotalReducer = (total: number, product: IProduct) => {
  return total + (product.price * product.qty)
}
export class GoogleAnalytics4Tracker implements ITracker{
  doInstall = (measurementId: string) => {
    install(measurementId);
  }
  doViewItem = (products: IProduct[]) => {
    gtag("event", "view_item", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doAddToCart = (products: IProduct[]) => {
    gtag("event", "add_to_cart", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doViewCart = (products: IProduct[]) => {
    gtag("event", "view_cart", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doRemoveFromCart = (products: IProduct[]) => {
    gtag("event", "remove_from_cart", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doBeginCheckout = (products: IProduct[]) => {
    gtag("event", "begin_checkout", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doAddShippingInfo = (products: IProduct[]) => {
    gtag("event", "add_shipping_info", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doAddPaymentInfo = (products: IProduct[]) => {
    gtag("event", "add_payment_info", {
      currency: "USD",
      payment_type: "Credit Card",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doPurchase = (products: IProduct[], transactionId: string) => {
    gtag("event", "purchase", {
      currency: "USD",
      transaction_id: transactionId,
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doRefund = (products: IProduct[], transactionId: string) => {
    gtag("event", "refund", {
      currency: "USD",
      transaction_id: transactionId,
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
}


















