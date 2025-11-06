// Edit button functionality
let editButtons = document.getElementsByClassName("btn-edit");
let deleteButtons = document.getElementsByClassName("btn-delete");
let saveButtons = document.getElementsByClassName("btn-save");
let cancelButtons = document.getElementsByClassName("btn-cancel");

// Show edit form when edit button clicked
Array.from(editButtons).forEach(function(element) {
  element.addEventListener('click', function(){
    const editForm = this.parentNode.querySelector('.edit-form');
    editForm.style.display = 'block';
  });
});

// Hide edit form when cancel button clicked
Array.from(cancelButtons).forEach(function(element) {
  element.addEventListener('click', function(){
    const editForm = this.parentNode;
    editForm.style.display = 'none';
  });
});

// Save edited journal entry
Array.from(saveButtons).forEach(function(element) {
  element.addEventListener('click', function(){
    const entry = this.parentNode.parentNode;
    const name = entry.querySelector('.user-email').innerText;
    const oldMuseum = entry.querySelector('.museum-name').innerText;
    const oldArtPiece = entry.querySelector('.art-piece').innerText;
    const oldImageUrl = entry.querySelector('.image-url').innerText;
    
    const newMuseum = this.parentNode.querySelector('.edit-museum').value;
    const newArtPiece = this.parentNode.querySelector('.edit-artpiece').value;
    const newImageUrl = this.parentNode.querySelector('.edit-imageurl').value;
    const newNotes = this.parentNode.querySelector('.edit-notes').value;
    
    fetch('messages', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'museum': oldMuseum,
        'artPiece': oldArtPiece,
        'imageUrl': oldImageUrl,
        'museum': newMuseum,
        'artPiece': newArtPiece,
        'imageUrl': newImageUrl,
        'notes': newNotes
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

// Delete journal entry
Array.from(deleteButtons).forEach(function(element) {
  element.addEventListener('click', function(){
    const entry = this.parentNode;
    const name = entry.querySelector('.user-email').innerText;
    const museum = entry.querySelector('.museum-name').innerText;
    const artPiece = entry.querySelector('.art-piece').innerText;
    
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'museum': museum,
        'artPiece': artPiece
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});