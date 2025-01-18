// background.js
let connectionStartTime = null
let currentProxyIP = null // Thêm biến để lưu trữ địa chỉ IP của proxy

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'applyProxySettings') {
    applyProxySettings(message.proxyServer, (success) => {
      sendResponse({ success })
    })
  } else if (message.action === 'getProxyStatus') {
    sendResponse({ status: getProxyStatus(), connectTime: getConnectTime() })
  } else if (message.action === 'disableProxy') {
    disableProxy()
  } else if (message.action === 'getProxyIP') {
    sendResponse({ proxyIP: getProxyIP() })
  }
  return true
})

chrome.proxy.settings.onChange.addListener(function (details) {
  if (details.levelOfControl === 'controlled_by_this_extension') {
    if (details.value.mode === 'fixed_servers') {
      if (
        details.value.rules.singleProxy &&
        details.value.rules.singleProxy.scheme === 'http'
      ) {
        // Ghi nhận thời gian khi kết nối bắt đầu
        connectionStartTime = new Date()
        currentProxyIP = details.value.rules.singleProxy.host // Lưu địa chỉ IP của proxy
        updateConnectTime()
      }
    }
  } else {
    // Đặt thời gian kết nối về null khi ngắt kết nối
    connectionStartTime = null
    currentProxyIP = null
    updateConnectTime()
  }

  // Gửi tin nhắn về trạng thái kết nối
  // chrome.runtime.sendMessage({
  //   action: 'updateProxyStatus',
  //   status: getProxyStatus(),
  //   connectTime: getConnectTime()
  // })
})

function applyProxySettings(proxyServer, callback) {
  chrome.proxy.settings.set(
    {
      value: {
        mode: 'fixed_servers',
        rules: {
          singleProxy: {
            scheme: 'http',
            host: proxyServer,
            port: 3128
          },
          bypassList: ['localhost', 'api.vpnrice.com', 'hatscripts.github.io']
        }
      },
      scope: 'regular'
    },
    () => {
      callback(true)
    }
  )
}

function disableProxy() {
  chrome.proxy.settings.clear({ scope: 'regular' }, function () {
    chrome.storage.local.remove('currentProxy', function () {
    })
  })
}

function getProxyStatus() {
  return connectionStartTime ? 'Connected' : 'Disconnected'
}

function updateConnectTime() {
  let currentTime = new Date()
  let connectTime = ((currentTime - connectionStartTime) / 1000).toFixed(2)

  // Thực hiện bất kỳ xử lý cụ thể nào liên quan đến việc cập nhật thời gian kết nối ở đây
  // Ví dụ: lưu trữ thời gian kết nối vào một biến global, ghi vào cơ sở dữ liệu, hiển thị thông báo, vv.
}

function getConnectTime() {
  if (connectionStartTime) {
    // Tính thời gian kết nối tính đến hiện tại
    let currentTime = new Date()
    return ((currentTime - connectionStartTime) / 1000).toFixed(2) // Đổi thành giây và làm tròn đến 2 chữ số thập ph
  }
}
