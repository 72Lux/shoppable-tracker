import ITracker from "../types/ITracker";
import IProduct from "../types/IProduct";
export declare class FacebookTracker implements ITracker {
    private tag;
    constructor(tag: string);
    doInstall: () => void;
    doViewItem: (product: IProduct) => void;
    doAddToCart: (product: IProduct) => void;
    doTrackLinkOff: (products: IProduct[]) => void;
    doViewCart: (products: IProduct[]) => void;
    doRemoveFromCart: (products: IProduct) => void;
    doBeginCheckout: (products: IProduct[]) => void;
    doAddShippingInfo: (products: IProduct[]) => void;
    doAddPaymentInfo: (products: IProduct[]) => void;
    doPurchase: (products: IProduct[], transactionId: string) => void;
    doRefund: (products: IProduct[], transactionId: string) => void;
}
