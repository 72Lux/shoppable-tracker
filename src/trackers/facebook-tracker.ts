import ITracker from "../types/ITracker";
import IProduct from "../types/IProduct";
const install = (tag:string)=>{
  if (document.getElementById("facebook-tracker-"+tag)) {
    return;
  }
  const noScriptFb = document.createElement('noscript');

  noScriptFb.innerHTML = `<img height="1" width="1" style="display:none" id="facebook-tracker-${tag}" 
       src="https://www.facebook.com/tr?id=${tag}&ev=PageView&noscript=1"/>`;
  document.head.insertBefore(noScriptFb, document.head.childNodes[0]);
  fbq('track', 'ViewContent');
}
const normalizeProduct = (product: IProduct) => {
  return {
    id: product.upc,
    quantity: product.qty ?? 1
  }
}
const subTotalReducer = (total: number, product: IProduct) => {
  return total + (product.price * product.qty)
}
export class FacebookTracker implements ITracker{
  private tag: string
  constructor(tag: string) {
    this.tag = tag
  }
  doInstall = () => {
    install(this.tag);
  }
  doViewItem = ( product: IProduct) => {
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
      value: product.price * product.qty??1
    });
  }
  doViewCart = ( products: IProduct[]) => {
    this.doInstall();
    //No such event on facebook pixel
  }
  doRemoveFromCart = (products: IProduct) => {
    this.doInstall();
    //No such event on facebook pixel
  }
  doBeginCheckout = ( products: IProduct[]) => {
    this.doInstall();
    fbq('track', 'InitiateCheckout', {
      content_ids: products.map(products => products.upc),
      contents: products.map(normalizeProduct),
      currency: "USD",
      num_items: products.length,
      value: products.reduce(subTotalReducer, 0),
    });
  }
  doAddShippingInfo = ( products: IProduct[]) => {
    this.doInstall();
    //No such event on facebook pixel
  }
  doAddPaymentInfo = ( products: IProduct[]) => {
    this.doInstall();
    fbq('track', 'AddPaymentInfo', {
      content_ids: products.map(products => products.upc),
      contents: products.map(normalizeProduct),
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
    });
  }
  doPurchase = ( products: IProduct[], transactionId: string) => {
    this.doInstall();
    fbq('track', 'Purchase', {
      content_ids: products.map(products => products.upc),
      contents: products.map(normalizeProduct),
      currency: "USD",
      value: products.reduce(subTotalReducer, 0),
    });
  }
  doRefund = ( products: IProduct[], transactionId: string) => {
    this.doInstall();
    //No such event on facebook pixel
  }
}