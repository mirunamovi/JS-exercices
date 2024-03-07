
'use strict'
  
const pageBody = document.body;
const title = document.getElementById('title');
const description = document.getElementById('description');
const icons = document.getElementById('icons');
const newNote = document.getElementById('creating-note');
const submit = document.getElementById('submit');
let isToggled = false;
let noteStored = [];
const template = document.querySelector('template').content;
const h3 = template.querySelector('h2');
const p = template.querySelector('p');
const element = template.querySelector('.note-area-content');

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
  changeInputOnToggleState(title, newNote, icons);
  isToggled = !isToggled;
  console.log(isToggled);

}

function changeInputOnToggleState(title, newNote, icons) {
  if (isToggled) {
      title.style.display = 'none';
      newNote.style.height = '46px';
      icons.style.display = 'none';
  } else {
      title.style.display = 'block';
      newNote.style.height = '138px';
      icons.style.display = 'block';
  }
}

function getNodeData(){

  const titleNode = title.value;
  const descriptionNode = description.value;

  const noteData = { titleNode, descriptionNode};

  resetInputFields()
  
  return noteData;
}

function resetInputFields() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
}

function saveNode(){
  console.log("SaveNode");
  const note = getNodeData();
  if (note) {
    noteStored.push(note);
    localStorage.setItem('notes', JSON.stringify(noteStored));
  }
}

function renderNote(data) {
  const template = document.getElementById('noteTemplate');
  const templateContent = template.content;

  const newNoteElement = document.importNode(templateContent, true);

  const titleElement = newNoteElement.querySelector('.note-area-content-title');
  const bodyElement = newNoteElement.querySelector('.note-area-content-body');

  titleElement.textContent = data.titleNode;
  bodyElement.textContent = data.descriptionNode;

  document.querySelector('#notes').appendChild(newNoteElement);
}



function getStoredData() {
  noteStored = JSON.parse(localStorage.getItem('notes') || '[]');
}

function renderStoredNotes() {
  noteStored.forEach(function (note) {
      renderNote(note);
  });
}

function bindEvents(){
  newNote.addEventListener('click', handleNewNoteClick); 
  pageBody.addEventListener('click', handlePageBodyClick);
  submit.addEventListener('click', handleSubmitClick);

  function handleNewNoteClick(ev){
      console.log("Hello2");
      ev.stopPropagation();
      toggle(true);
  }

  function handlePageBodyClick(ev){
    console.log("Hello3");
    ev.stopPropagation();
    toggle(false);
  }

  function handleSubmitClick(ev){
    ev.stopPropagation();
    saveNode();
    toggle(false);
  }  

}

