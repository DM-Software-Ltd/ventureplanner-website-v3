// Fetch and format plan data from JSON
(async function() {
    try {
        const response = await fetch('/static/data/plans.json');
        const PLAN_DATA_UNFORMATTED = await response.json();

        // Format the data the same way as before
        window.PLAN_DATA = Object
            .keys(PLAN_DATA_UNFORMATTED)
            .flatMap(planKey => {
                const planTypeGroup = PLAN_DATA_UNFORMATTED[planKey];
                const planTypeLabel = planTypeGroup.label;
                return Object.keys(planTypeGroup.subTypes)
                    .map(subTypeKey => {
                        const subType = planTypeGroup.subTypes[subTypeKey];
                        return {
                            ...subType,
                            planType: planTypeLabel,
                            planKey: planKey,
                            subTypeKey: subType.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        };
                    });
            });

        // Dispatch event to notify when data is loaded
        window.dispatchEvent(new Event('planDataLoaded'));
    } catch (error) {
        console.error('Error loading plan data:', error);
    }
})();
