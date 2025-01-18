
        // Function to check if a link is a PDF
function isPDF(url) {
  return url.toLowerCase().endsWith('.pdf');
}
// alert("");
// Find all links on the page
const links = document.querySelectorAll('a');

// Iterate over the links and add button for PDF links
links.forEach(link => {
  console.log(link.href);
  if (isPDF(link.href)) {

    // Create a <style> element to contain your CSS rules
const styleElement = document.createElement('style');
// Define your CSS rules
const cssRules = `
  .my_ext-flip {
    display: inline-block !important;
    background-color: #fff !important;
    border: none !important;
    color: #dd2e44 !important;
    text-align: center !important;
    text-decoration: none !important;
    font-size: 16px !important;
    cursor: pointer !important;
    border-radius: 8px !important;
    padding: 5px 10px !important;
    transition-duration: 0.4s !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-content: center !important;
    align-items: center !important;
    justify-content: center !important;
    border: solid 1px !important;
    font-weight: 600 !important;
    max-height: 55px !important;
  }
  .my_ext-flip img {
    vertical-align: middle !important;
    margin-right: 10px !important;
    width:33px !important;
    max-height: 33px !important;
  }
  .my_ext-flip:hover {
    background-color: #e3e3e3 !important;
    color: #dd2e44 !important;
  }
`;
// Set the CSS rules to the <style> element
styleElement.textContent = cssRules;
// Append the <style> element to the document
document.head.appendChild(styleElement);




    const button = document.createElement('button');
    button.innerText = 'Open with ';
    button.setAttribute("class","my_ext-flip");
    button.setAttribute("data-back","Ilovepdf2.com");
    button.setAttribute("data-front","Open With");
    button.onclick = () => window.open("https://ilovepdf2.com/open_pdf_files/?fileurl="+link.href); // Open link in a new tab
    
    const img = document.createElement('img');
img.src = 'https://ilovepdf2.com/wp-content/uploads/2024/03/i-love-pdf-2ools.png'; // Replace 'path_to_your_image.jpg' with the actual path to your image
img.width = '50';
img.height = '50';
button.insertBefore(img, button.firstChild);

    if (window.location.hostname !== 'ilovepdf2.com') {
    link.parentNode.insertBefore(button, link.nextSibling);
    }
  }
});