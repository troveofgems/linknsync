import "./PricingCards.css";
export const PricingCards = () => {
    return (
        <>
            <div className="frame">
                <div className="plan basic">
                    <div className="title">Free</div>
                    <div className="price">$0<span>per month</span></div>
                    <div className="lines">
                        <div className="line pricingCardLine1"></div>
                        <div className="line pricingCardLine2"></div>
                        <div className="line pricingCardLine3"></div>
                        <div className="line pricingCardLine4"></div>
                    </div>
                </div>
                <div className="plan pro">
                    <div className="title">Pro</div>
                    <div className="price">$25<span>per month</span></div>
                    <div className="lines">
                        <div className="line pricingCardLine1"></div>
                        <div className="line pricingCardLine2"></div>
                        <div className="line pricingCardLine3"></div>
                        <div className="line pricingCardLine4"></div>
                    </div>
                </div>

                <div className="plan premium">
                    <div className="title">Enterprise</div>
                    <div className="price enterprisePrice">Contact Us</div>
                    <div className="lines">
                        <div className="line pricingCardLine1"></div>
                        <div className="line pricingCardLine2"></div>
                        <div className="line pricingCardLine3"></div>
                        <div className="line pricingCardLine4"></div>
                    </div>
                </div>
                <div className="datas">
                    <div className="data users">
                        <div className="text">
                            <span className="left">4 Users</span>
                            <span className="right">Enterprise Team</span>
                        </div>
                        <div className="line">
                            <div className="fill"></div>
                        </div>
                    </div>
                    <div className="data gb">
                        <div className="text">
                            <span className="left">5 Properties</span>
                            <span className="right">Unlimited Properties</span>
                        </div>
                        <div className="line">
                            <div className="fill"></div>
                        </div>
                    </div>
                    <div className="data projects">
                        <div className="text">
                            <span className="left">Daily Sync @ Midnight</span>
                            <span className="right">Hourly Sync</span>
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