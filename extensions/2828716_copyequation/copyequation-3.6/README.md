## Information

This extension allows you to copy equations from ChatGPT and Wikipedia into Word (aka. the MathML format) and as LaTeX. It supports both the white and dark mode of the ChatGPT GUI and the [Darkreader extension](https://chromewebstore.google.com/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh) for the Wikipedia website (and the ChatGPT one if you're really into that). If you wanna use multiline pasting into MS Word, you can only do this on Windows using the [PasteEquation Extension](https://github.com/Foxxey/PasteEquation) (and having this extension installed as well of course).

## Installation

If you're using Firefox visit https://addons.mozilla.org/addon/copyequation/. It also works for the Android version of Firefox which is the only mobile version this extension supports. For desktop Chromium-based browsers follow these steps to download and install the extension:

### Step 1: Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/Foxxey/ChatGPT-LaTeX-MathML-Copy.git
```

### Step 2: Navigate to the Extension Page

Open your Chromium-based browser (Chrome, Edge, Brave etc.) and go to the extensions page by entering the following URL in the address bar:

```url
chrome://extensions
```

Make sure the "Developer mode" is turned on.

### Step 3: Load the Extension

Click on the "Load unpacked" button and select the directory where you cloned the repository. This will load the extension into your browser.

## How to Use

After installing the extension, visit ChatGPT or Wikipedia. When you see a mathematical expression, right-click on it. You should see an option to copy either the LaTeX or Word/MathML data. Alternatively you can click on one of the icons next to where it says "ChatGPT" to copy a whole message with the equations (Word/MathML for this "multiline" option only works on Windows using a [MS Word Extension](https://github.com/Foxxey/PasteEquation)). Now you can paste it into Word or your favorite TeX distribution. Have fun!

![HowTo](https://github.com/Foxxey/CopyEquation/assets/66215329/36c32793-9779-4a0f-a48a-5ebe57b8da91)

If you encounter any issues or have suggestions, feel free to contribute by submitting a [pull request](https://github.com/Foxxey/Karteikarte.com-Import-Script/pulls). If you do please update the manifest.json by adding 1 to the minor version.
