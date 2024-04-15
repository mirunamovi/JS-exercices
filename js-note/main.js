
'use strict'
  
const pageBody = document.body;
const title = document.getElementById('title');
const description = document.getElementById('description');
const icons = document.getElementById('icons');
const color = document.getElementById('color');
const newNote = document.getElementById('creating-note');
const submit = document.getElementById('submit');

let isToggled = false;
let noteStored = [];

const template = document.querySelector('template').content;
const h3 = template.querySelector('h2');
const p = template.querySelector('p');
const element = template.querySelector('.note-area-content');

let isClicked = false;
let checkedIcon_prev = null;
let checkedIcons_prev = null;




document.addEventListener('DOMContentLoaded', function () {
  init();
});

function init() {
  getStoredData();
  noteStored.forEach(function (note) {
    renderNote(note);

  });  
  bindEvents(); 

}

function toggle(x){
  if(isToggled && x){
    return;
  }
  if(!isToggled && !x){
    return;
  }
  changeInputOnToggleState(title, newNote, icons, color);
  isToggled = !isToggled;

}

function changeInputOnToggleState(title, newNote, icons, color) {
  if (isToggled) {
      title.style.display = 'none';

      color.style.display = 'none';

      newNote.style.height = '73px';
      newNote.style.border = '2px solid black';
      newNote.style.borderRadius = '11px';
      newNote.style.padding = '10px';


      icons.style.display = 'none';
  } else {
      title.style.display = 'block';
      title.style.border = 'none';
      title.style.paddingBottom = '30px';

      color.style.display = 'block';
      color.style.width = '100px';
      color.style.selfItems = 'flex-start';
      color.style.color = '#ffffff';

      newNote.style.height = 'auto';
      newNote.style.border = '2px solid black';
      newNote.style.borderRadius = '11px';

      title.style.paddingTop = '20px';
      icons.style.display = 'block';
      icons.style.paddingBottom = '10px';
  }
}

function getNodeData(){
  if(title.value !== '' && description.value !== ''){

    const titleNode = title.value;
    const descriptionNode = description.value;
    const idNode = guid();
    const colorNode = color.value;
    const checkedNode = false;

    const noteData = { idNode, titleNode, descriptionNode, colorNode, checkedNode};
    resetInputFields()
    return noteData;
  }
  else {
    return null;
  }
  
}

function guid() {
  function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
 return 'a' + _p8() + _p8(true) + _p8(true) + _p8();

}

function resetInputFields() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  //todocontainer.innerhtml='';
}

function saveNode(){
  console.log("SaveNode");
  const note = getNodeData();
  if (note) {
    noteStored.push(note);
    localStorage.setItem('notes', JSON.stringify(noteStored));
    renderNote(note);
  }
  

}

function renderNote(data) {
  const template = document.getElementById('noteTemplate');
  const templateContent = template.content;

  const newNoteElement = document.importNode(templateContent, true);
  console.log(newNoteElement);
  // const todoElement = todoTemplate.content.cloneNode(true);

  const noteContainer = newNoteElement.querySelector('.note-container');
  const noteCard = newNoteElement.querySelector('.note-area-content');
  const titleElement = newNoteElement.querySelector('.note-area-content-title');
  const bodyElement = newNoteElement.querySelector('.note-area-content-body');

  noteContainer.id = data.idNode;
  titleElement.textContent = data.titleNode;
  bodyElement.textContent = data.descriptionNode;
  noteCard.style.backgroundColor = data.colorNode;

  if(data.checkedNode){
    noteCard.style.border = '5px solid green';
  }


  document.querySelector('#notes').appendChild(newNoteElement); //todocontainer.querySelector('#notes').appendChild(newNoteElement);
  document.querySelector('#' + data.idNode).addEventListener('click', handleElementClick);
  document.querySelector('#' + data.idNode).querySelector('.fa-trash').addEventListener('click', handleDeleteClick);
  document.querySelector('#' + data.idNode).querySelector('.fa-edit').addEventListener('click', handleEditClick);
  document.querySelector('#' + data.idNode).querySelector('.fa-circle-check').addEventListener('click', handleCheckClick);
}

function handleDeleteClick(ev){
  ev.stopPropagation();
  let deleteBtn = ev.target;
  deleteNode(deleteBtn);
}

function handleEditClick(ev){
  ev.stopPropagation();
  let editBtn = ev.target;
  console.log('is clicked');

  // editNode(editBtn);
  openDialog(editBtn);
}

function handleCheckClick(ev) {
  ev.stopPropagation();
  let checkBtn = ev.target;
 checkedNode(checkBtn);
  
}

function checkedNode(checkBtn){
  const clickedNote = checkBtn.parentNode.parentNode;
  const idNoteToCheck = clickedNote.id;
  const noteToCheck = noteStored.find(({idNode}) => idNode === idNoteToCheck);
  noteToCheck.checkedNode = !noteToCheck.checkedNode;
  localStorage.setItem('notes', JSON.stringify(noteStored)); 
  location.reload();
}


function openDialog(editBtn){
  const clickedNote = editBtn.parentNode.parentNode.parentNode;
  const idNoteToEdit = clickedNote.id;
  const noteToEdit = noteStored.find(({idNode}) => idNode === idNoteToEdit);


  const backdrop = document.getElementsByClassName('modal-backdrop')[0];
  const dialog = document.getElementsByClassName('dialog')[0];

  const titleInput = document.querySelector('[title]');
  const descriptionInput = document.querySelector('[description]');
  const colorInput = document.querySelector('[color]');

  const cancel = document.querySelector('.cancel');
  const confirm = document.querySelector('.confirm');

  backdrop.style.display = 'block'; 
  dialog.style.display = 'flex'; 
  
  titleInput.value = noteToEdit.titleNode;
  descriptionInput.value = noteToEdit.descriptionNode;
  colorInput.value = noteToEdit.colorNode;

  cancel.addEventListener('click', handleCancelClick);
  confirm.addEventListener('click', handleConfirmClick);

  function handleCancelClick(ev){
    ev.stopPropagation();
    backdrop.style.display = 'none'; 
    dialog.style.display = 'none';   
  }

  function handleConfirmClick(ev){
    ev.stopPropagation();
    noteToEdit.titleNode = titleInput.value;
    noteToEdit.descriptionNode = descriptionInput.value;
    noteToEdit.colorNode = colorInput.value;
    localStorage.setItem('notes', JSON.stringify(noteStored));  
    backdrop.style.display = 'none'; 
    dialog.style.display = 'none';
    location.reload();
  }
}





function deleteNode(deleteBtn){
  const clickedNote = deleteBtn.parentNode.parentNode.parentNode;
  const idNoteToDelete = clickedNote.id;
  const noteToDelete = noteStored.find(({idNode}) => idNode === idNoteToDelete);

  noteStored.splice(noteStored.indexOf(noteToDelete), 1);

  const nodeToDelete = document.getElementById(idNoteToDelete);
  document.querySelector('#notes').removeChild(nodeToDelete);

  localStorage.setItem('notes', JSON.stringify(noteStored));  
}

function getStoredData() {
  noteStored = JSON.parse(localStorage.getItem('notes') || '[]');
}



function handleElementClick(ev){
  ev.stopPropagation();  // sa nu faca click pe body

  let v = ev.target.parentNode;
  if(v.id === "footer"){
    v = ev.target.parentNode.parentNode;
  }

 const checkedIcon = v.querySelector('.hid');
 const checkedIcons = v.querySelectorAll('.hidd');

  if((checkedIcon_prev != null) && (checkedIcons_prev != null) &&(checkedIcon != null) && (checkedIcons != null))  {
    checkedIcon_prev.style.display = 'none';
    for( let value of checkedIcons_prev){
      value.style.display = 'none';
    }


  }
  checkedIcon_prev = checkedIcon;
  checkedIcon.style.display = 'block'; 
  checkedIcons_prev = checkedIcons;
  for( let value of checkedIcons){
    value.style.display = 'inline';
  }

}


function bindEvents(){
  newNote.addEventListener('click', handleNewNoteClick); 
  pageBody.addEventListener('click', handlePageBodyClick);
  submit.addEventListener('click', handleSubmitClick);

  function handleNewNoteClick(ev){
      ev.stopPropagation();
      toggle(true);
  }

  function handlePageBodyClick(ev){
    ev.stopPropagation();
    if((checkedIcon_prev != null) && (checkedIcons_prev != null)) {
      checkedIcon_prev.style.display = 'none';
      for( let value of checkedIcons_prev){
        value.style.display = 'none';
      }
    }
    toggle(false);
  }

  function handleSubmitClick(ev){
    ev.stopPropagation();
    saveNode();
    toggle(false);
  } 
  
}



