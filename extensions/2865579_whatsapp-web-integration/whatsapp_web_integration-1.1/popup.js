document.getElementById('openWhatsapp').addEventListener('click', function() {
    chrome.tabs.create({ url: "https://web.whatsapp.com" });
  });
  
  // Load contacts from storage
  chrome.storage.sync.get('quickContacts', function(data) {
    const contacts = data.quickContacts || [];
    const contactsDiv = document.getElementById('contacts');
    
    contacts.forEach(contact => {
      const contactButton = document.createElement('button');
      contactButton.textContent = contact.name;
      contactButton.style.backgroundColor = '#075E54';
      contactButton.style.marginTop = '5px';
      contactButton.onclick = function() {
        chrome.tabs.create({ url: `https://web.whatsapp.com/send?phone=${contact.phone}` });
      };
      contactsDiv.appendChild(contactButton);
    });
  });
  