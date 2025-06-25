
const selectedDiv = document.getElementById("selected");
// document.addEventListener("DOMContentLoaded", function () {

//     const storedImages = JSON.parse(localStorage.getItem("selectedImages")) || [];

//     selectedDiv.innerHTML = ""; // Clear previous content

//     if (storedImages.length > 0) {
//         storedImages.forEach(src => {
//             const img = document.createElement("label");
//             img.textContent = src;
//             // img.alt = "Selected Image";
//             selectedDiv.appendChild(img);
//         });
//     } else {
//         selectedDiv.innerHTML = "<p>No images selected.</p>";
//     }
// });

function addChildInSelectedItem(src, index) {
    const img = document.createElement("label");
    img.textContent = src;
    img.alt = src;
    img.title = src;
    img.draggable = true;
    img.ondragstart = dragStart;
    img.ondragend = removeImage;
    img.id = "label-" + index;
    img.ondragstart = dragStart;
    selectedDiv.appendChild(img);
}

document.addEventListener("DOMContentLoaded", function () {

    const storedImages = JSON.parse(localStorage.getItem("selectedImages")) || [];

    selectedDiv.innerHTML = ""; // Clear previous content

    if (storedImages.length > 0) {
        storedImages.forEach((src, index) => {
            addChildInSelectedItem(src, index);
        });
    } else {
        selectedDiv.innerHTML = "<p>No images selected.</p>";
    }
});

// Drag Start
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    setTimeout(() => {
        event.target.style.opacity = "15"; // Make dragged item slightly transparent
    }, 0);
    event.target.ondragend = removeImage; //
}

// Allow Drop
function allowDrop(event) {
    event.preventDefault();
}

// Drop Image and Sort into Table
function dropImage(event) {
    event.preventDefault();
    const imageId = event.dataTransfer.getData("text");
    const draggedImage = document.getElementById(imageId);

    if (draggedImage) {
        const clonedImage = draggedImage.cloneNode(true);
        clonedImage.style.width = "80px"; // Adjust image size inside table
        clonedImage.style.cursor = "default";
        clonedImage.onclick = `clean(${draggedImage.id})`;
        clonedImage.ondragend = removeImage;
        const table = document.getElementById("imageTable");
        const newRow = document.createElement("tr");
        const redColumn = document.createElement("td");
        const blueColumn = document.createElement("td");

        redColumn.className = "red-column";
        // redColumn.classList.add("drop-zone");
        blueColumn.className = "blue-column";
        // blueColumn.classList.add("drop-zone");

        redColumn.ondragover = allowDrop;
        redColumn.ondrop = dropImage;
        blueColumn.ondragover = allowDrop;
        blueColumn.ondrop = dropImage;
        selectedDiv.removeChild(draggedImage);
        // Determine drop target and assign image to correct column
        if (event.target.className === 'red-column') {
            if (document.querySelectorAll('tr td.red-column').length > 0 && !document.querySelectorAll('tr td.red-column')[document.querySelectorAll('tr td.red-column').length - 1].querySelector('label')) {
                for (let i = 0; i < document.querySelectorAll('tr td.red-column').length; i++) {
                    if (!document.querySelectorAll('tr td.red-column')[i].querySelector('label')) {
                        document.querySelectorAll('tr td.red-column')[i].appendChild(clonedImage);
                        // selectedDiv.removeChild(clonedImage);
                        redColumn.onclick = `clean(${draggedImage.id})`
                        break;
                    }
                }

            }
            else {
                redColumn.onclick = `clean(${draggedImage.id})`
                redColumn.appendChild(clonedImage);
                newRow.appendChild(redColumn);
                newRow.appendChild(blueColumn);
                table.appendChild(newRow);
            }
        } else {
            if (document.querySelectorAll('tr td.blue-column').length > 0 && !document.querySelectorAll('tr td.blue-column')[document.querySelectorAll('tr td.blue-column').length - 1].querySelector('label')) {
                for (let i = 0; i < document.querySelectorAll('tr td.blue-column').length; i++) {
                    if (!document.querySelectorAll('tr td.blue-column')[i].querySelector('label')) {
                        document.querySelectorAll('tr td.blue-column')[i].appendChild(clonedImage);
                        // selectedDiv.removeChild(clonedImage);
                        blueColumn.onclick = `clean(${draggedImage.id})`
                        break;
                    }
                }
            }
            else {
                blueColumn.onclick
                    = `clean(${draggedImage.id})`
                blueColumn.appendChild(clonedImage);
                newRow.appendChild(redColumn);
                newRow.appendChild(blueColumn);
                table.appendChild(newRow);
            }
        }

    }
}

//
function removeImage(event) {
    const draggedImage = event.target;
    if (!draggedImage.parentElement) return;
    const parentTd = draggedImage.closest("td");
    const parentTr = parentTd.closest("tr");

    if (parentTd && draggedImage) {
        addChildInSelectedItem(draggedImage.title, draggedImage.id.split('-')[1]);
        parentTd.removeChild(draggedImage); // Remove the image

        // Remove row if both columns are empty
        if (parentTr.querySelectorAll("td").length === parentTr.querySelectorAll("td:empty").length) {
            parentTr.remove();
        }
    }
}