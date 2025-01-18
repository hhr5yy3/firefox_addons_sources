function internalState() {
  let integrations
  let activeTabId = null
  let defaultIntegrations = {
    hasPageAction: true,
    hasContextMenu: false,
    hasHotKey: true,
  }

  const isIntegrationEnabled = (integration) => {
    let enabled = false

    if (integrations
      && integration in integrations
      && integrations[integration] === true
    ) {
      enabled = true
    }

    return enabled
  }

  const setIntegrations = (specs) => {
    integrations = specs
  }

  const setIntegrationState = (integration, isEnabled) => {
    integrations[integration] = isEnabled
  }

  const getActiveTab = () => {
    return activeTabId
  }

  const setActiveTab = (tabId) => {
    activeTabId = tabId
  }

  const getDefaultIntegrations = () => {
    return defaultIntegrations
  }

  return Object.freeze({
    getDefaultIntegrations,
    setIntegrations,
    isIntegrationEnabled,
    setIntegrationState,
    getActiveTab,
    setActiveTab,
  })
}
