let dragged;
let id;
let index;
let indexDrop;
let list;
const TAB_KEY = 9;

  document.addEventListener("dragstart", ({target}) => {
      dragged = target;
      id = target.id;
      list = target.parentNode.children;
      for(let i = 0; i < list.length; i += 1) {
        if(list[i] === dragged){
          index = i;
        }
      }
  });

  document.addEventListener("dragover", (event) => {
      event.preventDefault();
  });

  document.addEventListener("drop", ({target}) => {
   if(target.parentNode.className == "editable-list" && target.id !== id) {
      dragged.remove( dragged );
      for(let i = 0; i < list.length; i += 1) {
        if(list[i] === target){
          indexDrop = i;
        }
      }
      if(index > indexDrop) {
        target.before( dragged );
      } else {
       target.after( dragged );
      }
    }
  });

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function moveCursorToEnd(el) {
  el.focus();
  document.execCommand('selectAll', false, null);
  document.getSelection().collapseToEnd();
}
function addTabListener(el) {
  el.addEventListener('keydown', (e) => {
    var code = e.keyCode || e.which;
    if (code == TAB_KEY) {
      console.log("Tab pressed", e.target);
      e.preventDefault(); // Stop treating it like an actual tab
      let parent = e.target;
      let ol = document.createElement('ol');
      ol.classList.add("editable-list");
      let li = document.createElement('li');
      ol.appendChild(li);

      var range = window.getSelection().getRangeAt(0); 
      /*
      // if the range is in #myDiv ;)
      if(range.startContainer.parentNode.id==='myDiv') {
        // delete whatever is on the range
        range.deleteContents();
        // place your span
        range.insertNode(newElement);
      }*/
      console.log(range.commonAncestorContainer);
      range.deleteContents();
      insertAfter(ol, range.commonAncestorContainer);
      //parent.appendChild(ol);
      //moveCursorToEnd(li);
    }
  });
}

window.addEventListener('DOMContentLoaded', (event) => {


  var lists = document.querySelector('.editable-list-container');
  addTabListener(lists);
  
});