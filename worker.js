const selectedDiv = document.getElementById("selected");
document.addEventListener("DOMContentLoaded", function () {
    const selectedDiv = document.getElementById("selected");
    const storedImages = JSON.parse(localStorage.getItem("selectedImages")) || [];
let count = 0;
    selectedDiv.innerHTML = ""; // Clear previous content

    if (storedImages.length > 0) {
        storedImages.forEach(src => {
            const img = document.createElement("label");
            img.textContent = src;
            img.alt = src;
            img.title = src;
            selectedDiv.appendChild(img);
            count++;
        });
    } else {
        selectedDiv.innerHTML = "<p>No images selected.</p>";
    }
    document.getElementById("teammake").innerText = `Team Make(${count})`;
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
    document.getElementById("teammake").innerText = `Team Make(${selectedDiv.children.length-1})`;
}



 
function clean(){
    localStorage.clear(); 

    let childs = selectedDiv.getElementsByTagName('label');
    let count=childs.length;
        for (let i = 0; i <= childs.length; i++) {

            selectedDiv.removeChild(childs[0]);
            count--;
        }
        document.getElementById("teammake").innerText = `Team Make(${count})`;
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


