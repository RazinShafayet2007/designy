import React from "react";

const Page = async () => {
    const { entitlement, profileName } = await SubscriptionEntitlementQuery();
    return (
        <div>Page</div>
    )
}

export default Page