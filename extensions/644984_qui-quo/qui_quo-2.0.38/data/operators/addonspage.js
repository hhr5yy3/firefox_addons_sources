async function highlightCurrentAddonInTable() {
    const {addonGuid} = await getStorageDataAsync('addonGuid');
    console.log(addonGuid);
    if (addonGuid) {
        const currentPluginNameCell = document.querySelector(`tr[addon-id="${addonGuid}"] > td.plugin-name`);
        if (currentPluginNameCell) {
            const usedHere = document.querySelector('#used-here > div');
            if (usedHere) {
                currentPluginNameCell.appendChild(usedHere);
                return;
            }
        }
    }
    console.log(`Can't highlight plugin which is used here! Data: ${addonGuid}`);
}
highlightCurrentAddonInTable().then();
