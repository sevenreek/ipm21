let dragged;
let id;
let index;
let indexDrop;
let list;

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
   if(target.className == "dropzone" && target.id !== id) {
       dragged.remove( dragged );
      for(let i = 0; i < list.length; i += 1) {
        if(list[i] === target){
          indexDrop = i;
        }
      }
      console.log(index, indexDrop);
      if(index > indexDrop) {
        target.before( dragged );
      } else {
       target.after( dragged );
      }
    }
  });

editor.addEventListener('keydown', (e) => {
  var code = e.keyCode || e.which;
  if (code == TAB_KEY) {
    e.preventDefault(); // Stop treating it like an actual tab
    let parent = e.target;
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    ul.appendChild(li);
    parent.appendChild(ul);
    moveCursorToEnd(li);
  } else if (code == ENTER_KEY) {
    e.preventDefault(); // Stop treating it like an actual line feed
    let parent = e.target;
    let li = document.createElement('li');
    parent.appendChild(li);
    moveCursorToEnd(li);
  }
});

function moveCursorToEnd(el) {
  el.focus();
  document.execCommand('selectAll', false, null);
  document.getSelection().collapseToEnd();
}