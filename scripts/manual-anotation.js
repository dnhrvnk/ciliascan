let manualAnnotateTutorial = false;

function seenImage(element) {
    var imgSrc = element.querySelector('img').src;
    document.getElementById('mainImage').src = imgSrc
    document.getElementById('mainImage').alt = element.querySelector('img').alt;

    var parentElement = element.parentNode;
    parentElement.classList.add('seen');    
    
    var annotationsDiv = element.parentElement.nextElementSibling;
    var chevronIcon = element.parentElement.querySelector('.chevron-icon');

    var isOpen = annotationsDiv.classList.contains('active');
    var openAnnotations = document.querySelectorAll('.uploaded-image-annotations.active');
    openAnnotations.forEach(function(annotation) {
        annotation.classList.remove('active');
    });

    var rotatedChevronIcons = document.querySelectorAll('.chevron-icon.rotate');
    rotatedChevronIcons.forEach(function(rotatedIcon) {
        rotatedIcon.classList.remove('rotate');
    });

    if (!isOpen) {
        annotationsDiv.classList.add("active");
        chevronIcon.classList.add('rotate');
    }

    annot_space = document.getElementById('image-annotations');
    var annotations = annot_space.querySelectorAll(`div`)
    for (var i = 0; i < annotations.length; i++) {
        annotations[i].style.display = "none";
    }
    var annotations = annot_space.querySelectorAll(`[id$="${element.querySelector('img').alt}"]`)
    for (var i = 0; i < annotations.length; i++) {
        annotations[i].style.display = "block";
    }
    
    if (!manualAnnotateTutorial) {
        let tutorial = document.querySelector('#manual-anotate-modal');
        tutorial.style.display = "flex";
        manualAnnotateTutorial = true;
    }
}

var step = 1;
function nextManual() {
    console.log("aaa");

    
    var modalBody = document.querySelector('#manual-anotate-modal .modal-body p');
    var modalFooter = document.querySelector('#manual-anotate-modal .modal-footer p');

    if(step == 0) {
        modalBody.innerHTML = 'Lets learn how to manually annotate an image.';
        modalFooter.textContent = "1 of 8";
        step = 1;
    }
    else if(step == 1) {
        modalBody.innerHTML = "Select the appropriate microtubular defect from the provided dropdown menu.";
        modalFooter.textContent = "2 of 8";
        step = 2;
    } else if(step == 2) {
        modalBody.innerHTML = "Now that you've selected the microtubular defect, it's time to annotate the image by placing annotations directly on the areas of interest. <br><br> Position your cursor over the area of the image where the defect is located. <b>Click on the image to place an annotation</b> at that precise point.";
        modalFooter.textContent = "3 of 8";
        step = 3;
    } else if(step == 3) {
        modalBody.innerHTML = "Once you've placed an annotation on the image, you can easily adjust its dynein arms by clicking on it. <br><br> Simply <b>click on the annotation<b> to cycle through the available dynein arms until you are satisfied.";
        modalFooter.textContent = "4 of 8";
        step = 4; 
    } else if(step == 4) {
        modalBody.innerHTML = "Annotations are automatically saved as you place them on the image. <br><br> You can also see them in the <b>annotation list</b> on the right side of the screen.";
        modalFooter.textContent = "5 of 8";
        step = 5;
    } else if(step == 5) {
        modalBody.innerHTML = "You can also see details about annotation by clicking on the annotation in the list or by clicking on the annotation on the image. <br><br> You can <b>change the annotation</b> by selecting the correct microtubular defect or dynein arms from the dropdown menu.";
        modalFooter.textContent = "6 of 8";
        step = 6;
    } else if(step == 6) {
        modalBody.innerHTML = "You can delete an annotation by clicking on the <b>trash icon</b> in the list of annotations or by <b>right-clicking</b> on the annotation on the image.";
        modalFooter.textContent = "7 of 8";
        step = 7;
    } else if (step == 7) {
        modalBody.innerHTML = "You have successfully completed the tutorial. <br><br> Click on the <b>Done</b> button to continue.";
        modalFooter.textContent = "8 of 8";
        step = 8;
        var nextButton = document.getElementById('nextManual');
        nextButton.textContent = "Done";
    } else if(step == 8) {
        nextButton.onclick = closeModal();
    }
}

