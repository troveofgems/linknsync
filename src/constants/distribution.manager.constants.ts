const DISTRIBUTION_MANAGER_LIST = [
    "Track",
    "Expedia",
    "VRBO",
    "Guesty",
    "Streamline",
    "Individual Owner"
];

// DO NOT CHANGE ANYTHING BELOW
interface OptionListDef {
    value: string;
    name: string;
}

const _buildDistributionManagerList =
    (dmList: string[]) =>
        dmList
            .map((item => ({
                name: item,
                value: item.toLowerCase().replaceAll(" ", "-")
            })));

export const distributionManagers: OptionListDef[] = _buildDistributionManagerList(DISTRIBUTION_MANAGER_LIST);