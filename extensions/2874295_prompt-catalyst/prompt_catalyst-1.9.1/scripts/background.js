chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyzeImage') {
        handleAnalyzeImage(request, sendResponse);
        return true; // Keep the messaging channel open for async response
    } else if (request.action === 'updateCustomBackground') {
        // Forward the message to all extension pages
        chrome.runtime.sendMessage(request);
        // Store in local storage
        chrome.storage.local.set({
            customBackgroundImage: request.imageUrl
        }, () => {
            // Send response after storage is complete
            sendResponse({ success: true });
        });
        return true; // Keep the messaging channel open for async response
    }
});
function dataURLToBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error('Invalid Data URL');
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('upload-background.html')) {
        // Inject necessary scripts
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['upload-background.js']
        }).catch(err => console.error('Script injection error:', err));
    }
});

async function handleAnalyzeImage(request, sendResponse) {
    try {
        // Extract data from the request
        const dataUrl = request.dataUrl;
        const fileName = request.fileName;
        const fileType = request.fileType;

        // Convert Data URL to Blob
        const blob = dataURLToBlob(dataUrl);

        // Create a new File object
        const file = new File([blob], fileName, { type: fileType });

        // Refresh the token before making the request
        await refreshToken();

        // Get the new auth token
        const { authToken } = await new Promise((resolve, reject) => {
            chrome.storage.local.get(['authToken'], (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve({ authToken: result.authToken });
                }
            });
        });

        const headers = {};
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }

        // Revalidate premium status before processing image
        const premiumResponse = await fetch('https://catalystmedia.ai/promptcatalystfreedemo/test-premium', {
            method: 'GET',
            headers: headers,
        });

        const premiumData = await premiumResponse.json();
        
        // Update stored premium status if changed
        const isPremiumUser = premiumData.is_premium || false;
        chrome.storage.local.set({ isPremiumUser }, () => {
            console.log(`Revalidated premium status for image analysis: ${isPremiumUser}`);
        });

        // Create FormData and append the file
        const formData = new FormData();
        formData.append('image', file);

        // Send image to backend
        const response = await fetch('https://catalystmedia.ai/promptcatalystfreedemo/analyze-image', {
            method: 'POST',
            headers: headers,
            body: formData
        });

        // Read the response data once
        const responseData = await response.json();

        // Check status codes using the stored response data
        if (response.status === 401) {
            chrome.storage.local.remove(['authToken', 'isPremiumUser'], () => {
                console.log('Session expired. Please log in again.');
            });
            sendResponse({ error: 'Session expired. Please log in again.' });
            return;
        }

        if (response.status === 429) {
    console.warn('Rate limit reached:', responseData.error);
    sendResponse({ 
        showUpgrade: true, // This is the key flag
        error: null, // Set error to null to prevent showing error message
        message: responseData.error || 'Rate limit reached. Please upgrade to Premium for higher limits.'
    });
    return;
}

        if (!response.ok) {
            throw new Error(responseData.error || 'Failed to analyze image');
        }


        // Success case - use the stored response data
        sendResponse({ 
            prompts: responseData.prompts, 
            message: responseData.message,
            success: true 
        });

        // Store the results immediately
        chrome.storage.local.set({
            lastImageAnalysis: {
                prompts: responseData.prompts,
                fileName: request.fileName,
                timestamp: Date.now()
            }
        });

     } catch (error) {
        console.error('Error processing image:', error);
        if (error.message && (
            error.message.includes('limit') || 
            error.message.includes('maximum') ||
            error.message.includes('reached the maximum number')
        )) {
            sendResponse({ 
                error: 'limitReached',
                showUpgrade: true,
                message: 'You\'ve reached the maximum number of image analyses. Upgrade to Premium for higher limits!'
            });
        } else {
            sendResponse({ 
                error: error.message || 'Error: Could not analyze image.',
                success: false
            });
        }
    }
}
async function refreshToken() {
    try {
        const { authToken } = await new Promise((resolve, reject) => {
            chrome.storage.local.get(['authToken'], (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve({ authToken: result.authToken });
                }
            });
        });

        if (!authToken) {
            throw new Error('No auth token found');
        }

        const response = await fetch('https://catalystmedia.ai/promptcatalystfreedemo/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: authToken })
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        
        // Store the new token
        await new Promise((resolve, reject) => {
            chrome.storage.local.set({ authToken: data.token }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });

        console.log('Token refreshed successfully');
    } catch (error) {
        console.error('Error refreshing token:', error);
        // If refresh fails, clear the stored token and update UI
        chrome.storage.local.remove(['authToken', 'isPremiumUser'], () => {
            isLoggedIn = false;
            isPremiumUser = false;
            updateUIForLoginStatus();
        });
    }
}
    
// Function to send a message to the popup
function sendMessageToPopup(message) {
    chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
            // Popup is not open, which is fine
            console.log('No popup open to receive message.');
        } else {
            console.log('Message sent to popup successfully.');
        }
    });
}