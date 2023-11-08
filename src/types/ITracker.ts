import IProduct from "./IProduct";

export default interface ITracker {
  doInstall(): void

  doViewItem(products: IProduct): void

  doAddToCart(products: IProduct): void

  doViewCart(products: IProduct[]): void

  doRemoveFromCart(products: IProduct): void

  doBeginCheckout(products: IProduct[]): void

  doAddShippingInfo(products:IProduct[]): void

  doAddPaymentInfo(products:IProduct[]): void

  doPurchase(products:IProduct[], transactionId: string): void

  doRefund(products:IProduct[], transactionId: string): void
}