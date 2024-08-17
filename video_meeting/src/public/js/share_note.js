//handle share note
const share_note =  document.getElementById('share_note');

share_note.addEventListener('click', openShareNote);

// open share note
function openShareNote() {
    window.open('/share_note', 'popupWindow', 'width=800,height=600');
}

