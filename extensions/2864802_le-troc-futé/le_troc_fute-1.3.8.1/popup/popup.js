async function switchToTrocFuteAfterLoggingIntoVinted (){
    const toggleSwitch = document.getElementById("switch_to_troc_fute_after_logging_into_vinted");
    // Get initial state from storage
    const result = await browser.storage.local.get("switch_to_troc_fute_after_logging_into_vinted");
    const switchState = result["switch_to_troc_fute_after_logging_into_vinted"] || false;

    // Set initial UI state
    toggleSwitch.checked = switchState;

    // Listen for switch changes
    toggleSwitch.addEventListener("change", async () => {
        const isChecked = toggleSwitch.checked;
        // Save state to storage
        await browser.storage.local.set({ "switch_to_troc_fute_after_logging_into_vinted": isChecked });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await switchToTrocFuteAfterLoggingIntoVinted();
});
