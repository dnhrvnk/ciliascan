var explainedAI = false;	

function inboarding(element) {
    if(explainedAI) {
        seenImage(element);
    }
    else {
        explainedAI = true;
        openModal();
        seenImage(element);

        var dropdown = document.getElementById('run-annotation');
        var dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdownMenu.style.display = 'block';
    }
}

var modal = document.getElementById("modal");
var btn = document.querySelector(".button-common");
var span = document.getElementsByClassName("close")[0];

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function seenImage(element) {
    var imgSrc = element.querySelector('img').src;
    document.getElementById('mainImage').src = imgSrc

    var parentElement = element.parentNode;
    console.log(parentElement)
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
}

var currentStep = 1;

function nextStep() {
    
    var modalBody = document.querySelector('.modal-body p');
    var modalFooter = document.querySelector('.modal-footer p');

    if(currentStep == 0) {
        modalBody.innerHTML = 'To activate automatic annotation, simply select "<b>Run Annotation</b>" in dropdown menu. <br><br>Our AI technology will then swiftly analyze the current image, highlighting celia for further review.';
        modalFooter.textContent = "1 of 8";
        
        currentStep = 1;
    }
    else if(currentStep == 1) {
        console.log(currentStep, "aaa");
        modalBody.innerHTML = "This is the <b>image with the annotated cilia.";

        var mainImage = document.getElementById('mainImage');
        mainImage.style.border = "5px solid #006CEB";

        modalFooter.textContent = "2 of 8";
        
        currentStep = 2;
    } else if(currentStep == 2) {
        modalBody.innerHTML = "This is <b>list of annotations</b> for the image.";
        modalFooter.textContent = "3 of 8";
        
        var mainImage = document.getElementById('mainImage');
        mainImage.style.border = "none";

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "2px solid #006CEB";

        currentStep = 3;
    } else if(currentStep == 3) {
        modalBody.innerHTML = "This is the <b>confidence level</b> of the annotated cilia. <br><br> If the confidence level is <b>high</b>, the annotation is likely accurate. <br><br> If the confidence level is <b>low</b>, the annotation may not be accurate and needs to be revalidated.";
        modalFooter.textContent = "4 of 8";

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "none";

        currentStep = 4;   
    } else if(currentStep == 4) {
        modalBody.innerHTML = "Select an annotation to <b>view the details</b> and <b>edit the annotation</b> by clicking on the row.";
        modalFooter.textContent = "5 of 8";

        currentStep = 5;
    } else if(currentStep == 5) {
        modalBody.innerHTML = "Here are details of the selected annotation. <br><br> You can <b>edit the annotation</b> by selecting the correct microtubular defect or dynein arms from the dropdown menu.";
        modalFooter.textContent = "6 of 8";

        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.border = "2px solid #006CEB";

        currentStep = 6;
    } else if(currentStep == 6) {
        modalBody.innerHTML = "You can select annotation by clicking on the image as well.";
        modalFooter.textContent = "7 of 8";

        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.border = "none";

        currentStep = 7;
    } else if (currentStep == 7) {
        modalBody.innerHTML = "You have successfully completed the tutorial. <br><br> Click on the <b>Next</b> button to continue.";
        modalFooter.textContent = "8 of 8";

        currentStep = 8;
        var nextButton = document.getElementById('nextButton');
        nextButton.textContent = "Done";
    }
}

function backStep() {
    currentStep -= 2;
    console.log(currentStep)
    nextStep();
}