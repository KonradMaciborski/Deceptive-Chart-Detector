# Chrome Plugin for Image Manipulation Detection

This Chrome extension allows users to select images on a web 
page and send them to an API that checks if the image is a 
potentially manipulated chart. The plugin provides feedback on whether 
the image is a chart and if it is manipulated or not, 
helping users identify potentially 
deceptive visualizations.

## Features
- **Image Selection**: Selects any image on a web page.
- **Manipulation Detection**: Sends the image to an API for manipulation analysis.
- **Feedback**: Displays results indicating whether the image is a deceptive chart.
- **Interactive UI**: Visual indicators for different stages of the analysis process.

## How to Install

Follow the steps below to install and use the Chrome extension:

### 1. Download the Plugin Files
Download or clone the repository containing the plugin files. The directory should contain the following:
- `manifest.json` (Chrome Extension Manifest)
- `background.js` (Background script)

### 2. Install the Extension in Chrome
2. Open Google Chrome.
2. Navigate to `chrome://extensions/` in your address bar.
3. Turn on **Developer Mode** (top right).
4. Click **Load unpacked** and select the directory where the plugin files are stored.

This will install the extension and it will be active in your browser.

### 3. Using the Extension

- Once the extension is installed, simply navigate to any web page that contains images.
- Hover over any image, and a button will appear that says "Kliknij aby sprawdzić pod kątem manipulacji" ("Click here to check for tampering").
- Click the button to send the image to the API for analysis.
- Wait for the results. The button will show a spinning animation while the image is being processed.
- If the image is found to be manipulated, the button will allow you to open the manipulated image in a new tab. If the image is not manipulated, the button will show a success message.
