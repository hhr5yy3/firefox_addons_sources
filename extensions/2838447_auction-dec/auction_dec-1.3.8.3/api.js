function sendEventToApi(eventData) {
    const apiEndpoint = 'https://dec.autosrealm.com/api/events';
    // const apiEndpoint = 'http://127.0.0.1/api/events'; // local
    setTimeout(function () {
        console.log(eventData, "eventData");
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(response => response.json())
            .then(data => console.log('Event logged:', data))
            .catch(error => console.error('Error:', error));
    }, 3000);
}

async function sendImageToApi(imageUri) {
    const apiUrl = 'https://dec.autosrealm.com/api/events/upload';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({image: imageUri})
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Image successfully sent to API:', data);
            return data;
        } else {
            console.error('Error sending image to API:', response.status);
            throw new Error('Failed to send image');
        }
    } catch (error) {
        console.error('Error sending image to API:', error);
        throw error;
    }
}

function base64ToBlob(base64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64Data.split(',')[1]);  // Extract the base64 data after the comma
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}

async function sendImageToPaperless(eventData, imageUri) {
    const paperlessApiUrl = 'https://log.cloudsrealm.com/api/documents/post_document/';
    const apiToken = '89a3284bc391a72668a74c9c87ebf5a010b028b7';

    try {
        const contentType = imageUri.split(';')[0].split(':')[1];
        const imageBlob = base64ToBlob(imageUri, contentType);

        const formData = new FormData();
        formData.append('document', imageBlob, `userId-${eventData.username}-${eventData.timestamp}.png`);

        const response = await fetch(paperlessApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${apiToken}`,  // Paperless API authorization token
            },
            body: formData  // Send the image as multipart/form-data
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Image successfully sent to Paperless API:', data);
            return data;
        } else {
            console.error('Error sending image to Paperless API:', response.statusText);
            throw new Error('Failed to send image to Paperless');
        }
    } catch (error) {
        console.error('Error sending image to Paperless API:', error);
        throw error;
    }
}