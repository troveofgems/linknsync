import "./InfoCards.css";
import Link from "next/link";
export const InfoCards = () => {
    return (
        <section id={"info-cards-user-types"}>
            <div className="container infoCardContainer">
                <div className="box">
                    <span></span>
                    <div className="content">
                        <h2 className={"text-2xl"}>Primary Listing Agents</h2>
                        <p>
                            Create and manage your Organization, Users, and Properties. Link an ICal to your property
                            to set a baseline calendar for all users.
                        </p>
                        {/*<Link href={"#"} className={"button-87"}>
                            Learn More
                        </Link>*/}
                    </div>
                </div>
                <div className="box">
                    <span></span>
                    <div className="content">
                        <h2 className={"text-2xl"}>Assistant Listing Agents</h2>
                        <p>
                            Access and view your Organization&#39;s properties. Link your ICals to their respective
                            property to create a layered ICal view across all users.
                        </p>
                        {/*<Link href={"#"} className={"button-87"}>
                            Learn More
                        </Link>*/}
                    </div>
                </div>
                <div className="box">
                    <span></span>
                    <div className="content">
                        <h2 className={"text-2xl"}>Referring Listing Agents</h2>
                        <p>
                            View a list of properties you&#39;ve been granted access to through an Organization. View
                            availability and send Primary Listing Agents Booking Requests.
                        </p>
                        {/*<Link href={"#"} className={"button-87"}>
                            Learn More
                        </Link>*/}
                    </div>
                </div>
            </div>
        </section>
    );
};
