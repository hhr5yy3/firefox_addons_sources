const qrAvailable = !!document.getElementById("qr-code");
const seedLink = document.querySelector('#seed-link a[href^="otpauth://totp/"]');
const indexedAvailable = document.getElementById("indexed-secret");
if (qrAvailable && seedLink && showWarning()) {
  const seed = seedLink.getAttribute("href");
  if (seed) {
    const secret = new URL(seed).searchParams.get("secret");
    chrome.runtime.sendMessage({cmd: "set_otp", otpType: "totp", secret, platform: "zih"});
  }
} else if (!!indexedAvailable && showWarning()) {
  const cols = Array.from(indexedAvailable.querySelectorAll("tr:nth-of-type(2) td"));
  if (cols.length === 25) {
    const secret = cols.map((col) => col.innerText).reduce((acc, cur) => acc + cur, "");
    chrome.runtime.sendMessage({cmd: "set_otp", otpType: "iotp", secret, platform: "zih"});
  }
}
function showWarning() {
  return confirm("TUfast kann diesen 2-Faktor-Code für dich speichern und automatisch an den entsprechenden Stellen einfügen (=AutoLogin). Dies geht jedoch eigentlich gegen den Sinn eines zweiten Faktors.\n\nSPEICHERE DIR DEN CODE UND DIE RECOVERY CODES AUF JEDEN FALL AUCH AN EINER ANDEREN STELLE!\n\nSoll TUfast für dich die 2-Faktor-Authentifizierung übernehmen?");
}
