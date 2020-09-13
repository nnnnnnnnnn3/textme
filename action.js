
let words =['how', 'are', 'you']

window.onload = function () {
    let copyParentNode = this.parentNode
    document.getElementById('test').addEventListener('click', function(event) { 
        this.parentNode=copyParentNode
        if(event.target.id=='test'){
            deleteAllClassToDivs(event.target.id);
        }
    });
    document.getElementById('test').addEventListener('keyup', function(e) {
    var parent = document.getElementById("test");
    var range = document.createRange();
    var selection = window.getSelection();
    var number = window.getSelection().anchorNode.parentNode.id;

    let pos = getCaret();

    convertirEnSpans(event);
    agregarIds();

    setCaret(pos);
    if (e.which === 32) {
            getMenu();
    }
  });

    document.getElementById('test').addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
        deleteAllClassToDivs(event.target.id, false);
                
    });

    function getMenu() {
        let way ={}
        let suggestions = ['word1', 'word2', 'word3'];
        let items = document.querySelectorAll("#test > span");
        let idLast = -1000;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.addEventListener("click", function (event) {
                console.log(event.target.id)
                if (idLast === event.target.id) {
                    return true;
                }
                currentSelection = window.getSelection();
                currentRange = currentSelection.getRangeAt(0);
                currentNode = currentRange.startContainer;

                idLast = event.target.id;

                deleteAllClassToDivs(event.target.id);
                let newBox = document.createElement("span");
                for (let a = 0; a < suggestions.length; a++) {
                    newBox.className = 'nuevo';
                    newBox.classList.add(event.target.id);
                    newBox.style.left = this.offsetLeft + 'px';
                    newBox.style.top = document.getElementById(idLast).offsetTop+20 + 'px';

                    var newDiv = document.createElement("div");
                    newDiv.classList.add('divBorder');
                    newDiv.appendChild(document.createTextNode(suggestions[a]));
                    newDiv.addEventListener('click', function(event) { 
                       way={item:idLast, newValue:event.target.innerHTML}
                        deleteAllClassToDivs(event.target.id);
                        document.getElementById(way.item).classList.remove("err");
                       document.getElementById(way.item).innerHTML=way.newValue
                    });
                    newBox.appendChild(newDiv);
                }
                copyParentNode = this.parentNode
                this.parentNode.appendChild(newBox);
            });
        }
    }


    function deleteAllClassToDivs(idDivCurrent, second) {
        let rootElements = document.querySelectorAll(".nuevo");
        let selected = document.querySelectorAll(".selected");

        if (!second) {
            for (let i = 0; i < rootElements.length; i++) {
                rootElements[i].remove()
            }
        }
        for (let i = 0; i < selected.length; i++) {
            selected[i].classList.remove('selected');
        }
        for (let i = 0; i < rootElements.length; i++) {
            if (!rootElements[i].classList.contains(idDivCurrent)) {
                rootElements[i].remove()
            }
        }
    }

    function getCaret() {
    var caretOffset = 0;
    if (window.getSelection) {
      var range = window.getSelection().getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(test);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    }
  }

    function setCaret(offset) {

    let nodeSpans = test.getElementsByTagName('span');
    var temp = 0;
    for (var i = 0; i < nodeSpans.length; i++) {
      let len = (nodeSpans[i].innerText || nodeSpans[i].textContent).length;
      if (temp + len >= offset) {
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(nodeSpans[i].childNodes[0], offset - temp);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        break;
      }
      else {
        temp += len;
      }
    }
  }

    function convertirEnSpans(event) {
    deleteAllClassToDivs(event.target.id);
    let text = test.innerText || test.textContent;
    var wordsWithSpan = text.split(/\s/ugmi).map(function(c) {
      if (c.length > 0) {
          if (event.which === 32) {
            return words.indexOf(c) == -1 ? `<span class="word err">${c}</span>` : `<span class="word">${c}</span>`
          }
          return  `<span class="word">${c}</span>`
      }else return c;
    }).join('<span>&nbsp;</span>'); // non-breaking space
    test.innerHTML = wordsWithSpan;
  }

    function agregarIds() { // agregamos ids para saber en que nodo esta en cursor
        let nodeSpans = test.getElementsByClassName('word');
        for (var i = 0; i < nodeSpans.length; i++) {
            nodeSpans[i].id = "word" + i; // ids are not allowed to start with a digit
        }
    }
}
