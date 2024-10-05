document.getElementById('saveBtn').addEventListener('click', function() {
  const note = document.getElementById('noteInput').value;
  
  // Save the note in Chrome's local storage
  if (note) {
    chrome.storage.local.get({notes: []}, function(data) {
      const updatedNotes = [...data.notes, note];
      chrome.storage.local.set({notes: updatedNotes}, function() {
        document.getElementById('noteInput').value = ''; // Clear input after saving
        displayNotes(); // Update the displayed notes
      });
    });
  }
});

function displayNotes() {
  chrome.storage.local.get({notes: []}, function(data) {
    const notesDiv = document.getElementById('savedNotes');
    notesDiv.innerHTML = ''; // Clear old notes

    data.notes.forEach((note, index) => {
      const noteElement = document.createElement('div');
      noteElement.textContent = `${index + 1}. ${note}`;
      notesDiv.appendChild(noteElement);
    });
  });
}

// Load saved notes when the popup is opened
document.addEventListener('DOMContentLoaded', displayNotes);
