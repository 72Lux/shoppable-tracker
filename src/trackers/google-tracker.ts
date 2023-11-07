import ITracker from "../types/ITracker";
import IProduct from "../types/IProduct";
import {gtag, install} from "ga-gtag";
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
export class GoogleTracker implements ITracker{
  private tag: string
  constructor(tag: string) {
    this.tag = tag
  }
  doInstall = () => {
    install(this.tag);
  }
  doViewItem = (product: IProduct) => {
    this.doInstall();
    gtag("event", "view_item", {
      currency: "USD",
      value: product.price * product.qty??1,
      items: [normalizeProduct(product,0)]
    });
  }
  doAddToCart = (product: IProduct) => {
    this.doInstall();
    gtag("event", "add_to_cart", {
      currency: "USD",
      value: product.price * product.qty??1,
      items: [normalizeProduct(product,0)]
    });
  }
  doViewCart = ( products: IProduct[]) => {
    this.doInstall();
    gtag("event", "view_cart", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doRemoveFromCart = ( product: IProduct) => {
    this.doInstall();
    gtag("event", "remove_from_cart", {
      currency: "USD",
      value: product.price * product.qty??1,
      items: [normalizeProduct(product,0)]
    });
  }
  doBeginCheckout = ( products: IProduct[]) => {
    this.doInstall();
    gtag("event", "begin_checkout", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doAddShippingInfo = ( products: IProduct[]) => {
    this.doInstall();
    gtag("event", "add_shipping_info", {
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doAddPaymentInfo = ( products: IProduct[]) => {
    this.doInstall();
    gtag("event", "add_payment_info", {
      currency: "USD",
      payment_type: "Credit Card",
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doPurchase = ( products: IProduct[], transactionId: string) => {
    this.doInstall();
    gtag("event", "purchase", {
      currency: "USD",
      transaction_id: transactionId,
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
  doRefund = ( products: IProduct[], transactionId: string) => {
    this.doInstall();
    gtag("event", "refund", {
      currency: "USD",
      transaction_id: transactionId,
      value: products.reduce(subTotalReducer, 0),
      items: products.map(normalizeProduct)
    });
  }
}