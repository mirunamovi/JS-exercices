
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
      title.style.border = 'none';
      title.style.paddingBottom = '30px';
      newNote.style.height = 'auto';
      newNote.style.border = '2px solid black';
      newNote.style.borderRadius = '11px';
      title.style.paddingTop = '20px';
      icons.style.display = 'block';
      icons.style.paddingBottom = '10px';
  }
}

function getNodeData(){

  const titleNode = title.value;
  const descriptionNode = description.value;
  const idNode = guid();
  const noteData = { idNode, titleNode, descriptionNode};

  resetInputFields()
  
  return noteData;
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
}

function saveNode(){
  console.log("SaveNode");
  const note = getNodeData();
  if (note) {
    noteStored.push(note);
    localStorage.setItem('notes', JSON.stringify(noteStored));
  }
  renderNote(note);

}

function renderNote(data) {
  const template = document.getElementById('noteTemplate');
  const templateContent = template.content;

  const newNoteElement = document.importNode(templateContent, true);

  const idElement = newNoteElement.querySelector('.note-area-content');
  const titleElement = newNoteElement.querySelector('.note-area-content-title');
  const bodyElement = newNoteElement.querySelector('.note-area-content-body');

 

  idElement.id = data.idNode;
  titleElement.textContent = data.titleNode;
  bodyElement.textContent = data.descriptionNode;

  document.querySelector('#notes').appendChild(newNoteElement);
  document.querySelector('#' + data.idNode).addEventListener('click', handleElementClick);

}

function getStoredData() {
  noteStored = JSON.parse(localStorage.getItem('notes') || '[]');
}

function renderStoredNotes() {
  noteStored.forEach(function (note) {
      renderNote(note);
  });
}

function handleElementClick(ev){
  ev.stopPropagation();  // sa nu faca click pe body

  let v = ev.target.parentNode;
  if(v.id === "footer"){
    v = ev.target.parentNode.parentNode;
  }
  console.log(v);

  // console.log(ev.target);
  // console.log(ev.target.parentNode.parentNode);

 const checkedIcon = v.querySelector('.hid');
 const checkedIcons = v.querySelectorAll('.hidd');

 //console.log(checkedIcon);
 //console.log(checkedIcon_prev);
  if((checkedIcon_prev != null) && (checkedIcons_prev != null) &&(checkedIcon != null) && (checkedIcons != null))  {
    checkedIcon_prev.style.display = 'none';
    // checkedIcons_prev.style.display = 'none';
    for( let value of checkedIcons_prev){
      value.style.display = 'none';
    }


  }
  checkedIcon_prev = checkedIcon;
  checkedIcon.style.display = 'block'; 
  checkedIcons_prev = checkedIcons;
  // checkedIcons[1].style.display = 'block'; 
  for( let value of checkedIcons){
    value.style.display = 'inline';
  }
  // checkedIcons.map((value) => {value.style.display = 'block';})

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
    if((checkedIcon_prev != null) && (checkedIcons_prev != null)) {
      checkedIcon_prev.style.display = 'none';
      // checkedIcons_prev.style.display = 'none';
      for( let value of checkedIcons_prev){
        value.style.display = 'none';
      }
    }
    ev.stopPropagation();
    toggle(false);
  }

  function handleSubmitClick(ev){
    ev.stopPropagation();
    saveNode();
    toggle(false);
  } 
  


  
}

