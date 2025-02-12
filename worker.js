document.addEventListener("DOMContentLoaded", function () {
    const selectedDiv = document.getElementById("selected");
    const storedImages = JSON.parse(localStorage.getItem("selectedImages")) || [];

    selectedDiv.innerHTML = ""; // Clear previous content

    if (storedImages.length > 0) {
        storedImages.forEach(src => {
            const img = document.createElement("label");
            img.src = src;
            img.alt = "Selected Image";
            selectedDiv.appendChild(img);
        });
    } else {
        selectedDiv.innerHTML = "<p>No images selected.</p>";
    }
});


function selectImage(event) {
    
    const img = event.target;

    // Toggle the 'checked' class
    img.classList.toggle('checked');

    // If the image is checked, append it to the selected div
    if (img.classList.contains('checked')) {
        const clonedImg = img.cloneNode(true);
        clonedImg.style.cursor = "default";
        selectedDiv.appendChild(clonedImg);
    } else {
        // Remove the image from selected div if unchecked
        const images = selectedDiv.getElementsByTagName('label');
        for (let i = 0; i < images.length; i++) {
            if (images[i].src === img.src) {
                selectedDiv.removeChild(images[i]);
                break;
            }
        }
    }
}


const selectedDiv = document.getElementById("selected");
 
function clean(){
    localStorage.clear(); 
    let childs = selectedDiv.getElementsByTagName('label');
        for (let i = 0; i <= childs.length; i++) {

            selectedDiv.removeChild(childs[0]);
        }
}

function goToSelectedPage(){
    
    let selectedImages = [];
    const images = selectedDiv.getElementsByTagName('label');
        for (let i = 0; i < images.length; i++) {
                selectedImages.push(images[i].textContent);
        }
    localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
    window.location.href="selected.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const selectedDiv = document.getElementById("selected");
    const storedImages = JSON.parse(localStorage.getItem("selectedImages")) || [];

    selectedDiv.innerHTML = ""; // Clear previous content

    if (storedImages.length > 0) {
        storedImages.forEach(src => {
            const img = document.createElement("label");
            img.src = src;
            img.alt = "Selected Image";
            selectedDiv.appendChild(img);
        });
    } else {
        selectedDiv.innerHTML = "<p>No images selected.</p>";
    }
});
