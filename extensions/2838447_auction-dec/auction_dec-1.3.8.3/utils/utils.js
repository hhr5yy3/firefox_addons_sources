function fetchIPAddress() {
   fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
         browser.storage.local.set({ ip_address: data.ip });
         browser.storage.local.get("ip_address", function (result) {
            console.log(result.ip_address);
         });
      })
      .catch((error) => {
         console.log("Error" + error);
      });
}
