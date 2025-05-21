import IProduct from "./types/IProduct";
import TrackerConfig from "./types/TrackerConfig";
export declare class GoogleAnalytics4Tracker {
    doInstall: (measurementId: string) => void;
    doViewItem: (products: IProduct[]) => void;
    doAddToCart: (products: IProduct[]) => void;
    doTrackLinkOff: (products: IProduct[]) => void;
    doViewCart: (products: IProduct[]) => void;
    doRemoveFromCart: (products: IProduct[]) => void;
    doBeginCheckout: (products: IProduct[]) => void;
    doAddShippingInfo: (products: IProduct[]) => void;
    doAddPaymentInfo: (products: IProduct[]) => void;
    doPurchase: (products: IProduct[], transactionId: string) => void;
    doRefund: (products: IProduct[], transactionId: string) => void;
}
export declare class Tracker {
    private trackers;
    constructor(trackerConfigs: TrackerConfig[]);
    doInstall: (product: IProduct) => void;
    doViewItem: (product: IProduct) => void;
    doAddToCart: (product: IProduct) => void;
    doTrackLinkOff: (products: IProduct[]) => void;
    doViewCart: (products: IProduct[]) => void;
    doRemoveFromCart: (product: IProduct) => void;
    doBeginCheckout: (products: IProduct[]) => void;
    doAddShippingInfo: (products: IProduct[]) => void;
    doAddPaymentInfo: (products: IProduct[]) => void;
    doPurchase: (products: IProduct[], transactionId: string) => void;
    doRefund: (products: IProduct[], transactionId: string) => void;
}
