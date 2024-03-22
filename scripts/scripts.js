function seenImage(element) {
    var imgSrc = element.querySelector('img').src;
    document.getElementById('mainImage').src = imgSrc

    var parentElement = element.parentNode;
    console.log(parentElement)
    parentElement.classList.add('seen');    
    //toggleEye(parentElement.querySelector('.fa-eye-slash'));
}

/*function toggleEye(element) {
    var mainImageSrc = document.getElementById('mainImage').src;
    var clickedImageSrc = element.closest('.uploaded-image').querySelector('img').src;

    if (element.classList.contains('fa-eye')) {
        element.classList.remove('fa-eye');
        element.classList.add('fa-eye-slash');
        
        var parentElement = element.closest('.uploaded-image');
        parentElement.classList.remove('seen');
        
        if (mainImageSrc == clickedImageSrc) {
            document.getElementById('mainImage').src = "";
        }
    } else {
        element.classList.remove('fa-eye-slash');
        element.classList.add('fa-eye');
        
        var parentElement = element.closest('.uploaded-image');
        parentElement.classList.add('seen');

        document.getElementById('mainImage').src = clickedImageSrc;
    }   
}*/

function searchImages() {
    var searchTerm = document.querySelector('.search').value.toLowerCase();
    var images = document.querySelectorAll('.uploaded-image');
    var found = false;

    images.forEach(function(image) {
        var annotation = image.querySelector('.uploaded-image-img-p p').innerText.toLowerCase();
        if (annotation.includes(searchTerm)) {
            image.style.display = 'flex';
            found = true;
        } else {
            image.style.display = 'none';
        }
    });

    var noAnnotationMessage = document.getElementById('noAnnotationMessage');
    if (!found) {
        noAnnotationMessage.style.display = 'block';
    } else {
        noAnnotationMessage.style.display = 'none';
    }
}

function clearSearch() {
    document.querySelector('.search').value = '';
    searchImages();
}

function toggleCollapsible(element) {
    var content = element.nextElementSibling;
    var icon = element.querySelector('.chevron-icon');
    element.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
    icon.classList.toggle('rotate');
}

function toggleAnnotations(element) {
    var annotationsDiv = element.parentElement.parentElement.nextElementSibling;
    var chevronIcon = element.parentElement.querySelector('.chevron-icon');
    annotationsDiv.classList.toggle("active");
    chevronIcon.classList.toggle('rotate');
}

function rotateArrow() {
    var selectElement = document.getElementById("mtds");
    selectElement.classList.add("select-focused");
}

document.getElementById("mtds").addEventListener("blur", function() {
    var selectElement = document.getElementById("mtds");
    selectElement.classList.remove("select-focused");
});


/*document.addEventListener('DOMContentLoaded', function() {
    var uploadedImagesContainer = document.querySelector('.uploaded-images');
    var contextMenuButton = null;

    uploadedImagesContainer.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default context menu
        var target = event.target.closest('.uploaded-image');
        if (target) {
            contextMenuButton = document.createElement('button');
            contextMenuButton.textContent = 'Unsee image';
            contextMenuButton.style.position = 'absolute';
            contextMenuButton.style.left = event.clientX + 'px';
            contextMenuButton.style.top = event.clientY + 'px'; 
            document.body.appendChild(contextMenuButton);

            // Optionally, you can add an event listener to the button for further interactions
            contextMenuButton.addEventListener('click', function() {
                document.body.removeChild(contextMenuButton);
            });

            // Close the button if clicked elsewhere on the document
            document.body.addEventListener('click', closeContextMenuButton);
        }
    });

    function closeContextMenuButton(event) {
        if (!uploadedImagesContainer.contains(event.target)) {
            // Click occurred outside of the .uploaded-images container
            // Remove the context menu button
            if (contextMenuButton) {
                document.body.removeChild(contextMenuButton);
                contextMenuButton = null;
            }
            document.body.removeEventListener('click', closeContextMenuButton);
        }
    }
});*/





