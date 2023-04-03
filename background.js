// This is the background script for the extension

// Listen for messages
chrome.runtime.onMessage.addListener(receiver);

// A "global" variable to store the word selected by the user
var word;

// Get the message from the content script
function receiver(request, sender, sendResponse) {
  // Save the word
  word = request.word;
}