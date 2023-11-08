import ITracker from "../types/ITracker";
import IProduct from "../types/IProduct";

const normalizeProduct = (product: IProduct) => {
  return {
    id: product.upc,
    quantity: product.qty ?? 1
  }
}
const subTotalReducer = (total: number, product: IProduct) => {
  return total + (product.price * product.qty)
}

export class FacebookTracker implements ITracker {
  private tag: string

  constructor(tag: string) {
    this.tag = tag
  }

  doInstall = () => {
    if (document.getElementById("facebook-tracker-" + this.tag)) {
      return;
    }
    const fbScript = document.createElement("script");
    fbScript.async = true;
    fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
    fbScript.innerHTML = "";
    document.head.insertBefore(fbScript, document.head.childNodes[document.head.childNodes.length-1]);
    fbq('init', this.tag);
    fbq('track', 'PageView');
    const noScriptFb = document.createElement('noscript');
    noScriptFb.id = "facebook-tracker-" + this.tag;
    noScriptFb.innerHTML = `<img height="1" width="1" style="display:none" 
       src="https://www.facebook.com/tr?id=${this.tag}&ev=PageView&noscript=1"/>`;
    document.head.insertBefore(noScriptFb, document.head.childNodes[0]);
    fbq('track', 'ViewContent');
  }
  doViewItem = (product: IProduct) => {
    this.doInstall();
    fbq('track', 'ViewContent', {
      contents: [normalizeProduct(product)],
      content_type: 'product',
      content_ids: [product.upc],
      content_name: product.name
    });
  }
  doAddToCart = (product: IProduct) => {
    this.doInstall();
    fbq('track', 'AddToCart', {
      contents: [normalizeProduct(product)],
      content_type: 'product',
      content_ids: [product.upc],
      content_name: product.name,
      currency: 'USD',
      value: product.price * product.qty ?? 1
    });
  }
  doViewCart = (products: IProduct[]) => {
    this.doInstall();
    //No such event on facebook pixel
  }
  doRemoveFromCart = (products: IProduct) => {
    this.doInstall();
    //No such event on facebook pixel
  }
  doBeginCheckout = (products: IProduct[]) => {
    this.doInstall();
    fbq('track', 'InitiateCheckout', {
      content_ids: products.map(products => products.upc),
      contents: products.map(normalizeProduct),
      currency: "USD",
      num_items: products.length,
      value: products.reduce(subTotalReducer, 0),
    });
  }
  doAddShippingInfo = (products: IProduct[]) => {
    this.doInstall();
    //No such event on facebook pixel
  }
  doAddPaymentInfo = (products: IProduct[]) => {
    this.doInstall();
    fbq('track', 'AddPaymentInfo', {
      content_ids: products.map(products => products.upc),
      contents: products.map(normalizeProduct),
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
    });
  }
  doPurchase = (products: IProduct[], transactionId: string) => {
    this.doInstall();
    fbq('track', 'Purchase', {
      content_ids: products.map(products => products.upc),
      contents: products.map(normalizeProduct),
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
    });
  }
  doRefund = (products: IProduct[], transactionId: string) => {
    this.doInstall();
    //No such event on facebook pixel
  }
}