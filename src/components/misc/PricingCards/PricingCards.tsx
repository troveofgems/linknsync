import "./PricingCards.css";
export const PricingCards = () => {
    return (
        <>
            <div className="frame lg:mt-0 lg:mb-0 lg:m-0">
                <div className="plan basic">
                    <div className="title">Free</div>
                    <div className="price text-muted-foreground">$0<span>per month</span></div>
                </div>
                <div className="plan pro">
                    <div className="title">Pro</div>
                    <div className="price">$50<span>per month</span></div>
                </div>

                <div className="plan premium">
                    <div className="title text-black">Enterprise</div>
                    <div className="price enterprisePrice">Contact Us</div>
                </div>
                <div className="datas">
                    <div className="data users">
                        <div className="text flex flex-row justify-between">
                            <span className="left text-amber-700">3 Users</span>
                            <span className="text-amber-700 pl-4">5 Users</span>
                            <span className="right text-amber-700">Enterprise Team</span>
                        </div>
                        <div className="line">
                            <div className="fill"></div>
                        </div>
                    </div>
                    <div className="data gb">
                        <div className="text flex flex-row justify-between">
                            <span className="left text-amber-700">3 Properties</span>
                            <span className="text-amber-700 pl-4">50 Properties</span>
                            <span className="right text-amber-700">Unlimited Properties</span>
                        </div>
                        <div className="line">
                            <div className="fill"></div>
                        </div>
                    </div>
                    <div className="data projects">
                        <div className="text flex flex-row justify-between">
                            <span className="left text-amber-700">Daily Sync</span>
                            <span className="text-amber-700">Hourly Sync</span>
                            <span className="right text-amber-700">Hourly Sync</span>
                        </div>
                        <div className="line">
                            <div className="fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}