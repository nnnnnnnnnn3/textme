function getMenu() {
    let way = {}
    let suggestions = ['word1', 'word2', 'word3'];
    let items = document.querySelectorAll("#test > span");
    let idLast = -1000;
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item.addEventListener("click", function (event) {
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
                newBox.style.top = document.getElementById(idLast).offsetTop + 20 + 'px';

                let newDiv = document.createElement("div");
                newDiv.classList.add('divBorder');
                newDiv.appendChild(document.createTextNode(suggestions[a]));
                newDiv.addEventListener('click', function (event) {
                    way = { item: idLast, newValue: event.target.innerHTML }
                    deleteAllClassToDivs(event.target.id);
                    document.getElementById(way.item).classList.remove("err");
                    document.getElementById(way.item).innerHTML = way.newValue
                });
                newBox.appendChild(newDiv);
            }
            copyParentNode = this.parentNode
            this.parentNode.appendChild(newBox);
        });
    }
}
