let manualAnnotateTutorial = false;

function seenImage(element) {
    var imgSrc = element.querySelector('img').src;
    document.getElementById('mainImage').src = imgSrc
    document.getElementById('mainImage').alt = element.querySelector('img').alt;

    var parentElement = element.parentNode;
    parentElement.classList.add('seen');    
    
    var annotationsDiv = element.parentElement.nextElementSibling;
    var chevronIcon = element.parentElement.querySelector('.fa-chevron-right');

    var isOpen = annotationsDiv.classList.contains('active');
    var openAnnotations = document.querySelectorAll('.uploaded-image-annotations.active');
    openAnnotations.forEach(function(annotation) {
        annotation.classList.remove('active');
    });

    var rotatedChevronIcons = document.querySelectorAll('.fa-chevron-right.rotate-right');
    rotatedChevronIcons.forEach(function(rotatedIcon) {
        rotatedIcon.classList.remove('rotate-right');
    });

    if (!isOpen) {
        annotationsDiv.classList.add("active");
        chevronIcon.classList.add('rotate-right');
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
var modal = document.querySelector("#manual-anotate-modal");
var modalBody = document.querySelector('#manual-anotate-modal .modal-body p');
var modalFooter = document.querySelector('#manual-anotate-modal .modal-footer p');
var call_backs = []

function nextManual() {
    if(step == 0) {
        modalBody.innerHTML = "Let's learn how to <b>manually annotate</b> an image.";
        modalFooter.textContent = "1 of 8";
        
        dropdown = document.getElementById("mtds-tool-dropdown-content");
        dropdown.classList.remove("show");
        
        modal.style.top = "45%";
        modal.style.left = "40%";

        document.getElementById('nextManual').style.display = 'block'

        if(call_backs.length!=0){
            document.querySelectorAll('mtds-tool-dropdown-content li').forEach((element) => {
                element.onclick = call_backs.pop()
            })
        }

        let back = document.getElementById('backManual');
        back.style.display = "none";

        step = 1;
    }
    else if(step == 1) {
        modalBody.innerHTML = "Select the appropriate microtubular defect from the provided dropdown menu.";
        modalFooter.textContent = "2 of 8";
    
        dropdown = document.getElementById("mtds-tool-dropdown-content");
        console.log(dropdown.classList)
        setTimeout(()=> {
        dropdown.classList.add("show");
        },1)
        console.log(dropdown.classList)

        let back = document.getElementById('backManual');
        back.style.display = "block";

        document.getElementById('nextManual').style.display = 'none'
        document.querySelectorAll('#mtds-tool-dropdown-content li').forEach((element) => {
            const call_back = element.onclick
            element.onclick = (e) => {
                nextManual()
                element.onclick = call_back
                element.click()
            }
            call_backs.push(call_back)
        })
        call_backs.reverse()

        modal.style.top = "30%";
        modal.style.left = "32%";

        step = 2;
    } else if(step == 2) {
        modalBody.innerHTML = "Now that you've selected the microtubular defect, it's time to annotate the image by placing annotations directly on the areas of interest. <br><br> Position your cursor over the area of the image where the defect is located. <b>Click on the image to place an annotation</b> at that precise point.";
        modalFooter.textContent = "3 of 8";

        dropdown = document.getElementById("mtds-tool-dropdown-content");
        dropdown.classList.remove("show");
        console.log(dropdown.classList)

        document.querySelectorAll('mtds-tool-dropdown-content li').forEach((element) => {
            element.onclick = call_backs.pop()
        })

        area = document.getElementById("mainImage")
        let call_back = area.onclick
        area.onclick = (event)=>{
            call_back(event)
            area.onclick = call_back
            nextManual()
        }

        document.getElementById('nextManual').style.display = 'none'

        document.querySelectorAll('mtds-tool-dropdown-content li').forEach((element) => {
            element.onclick = call_backs.pop()
        })

        modal.style.top = "16%";
        modal.style.left = "56%";

        step = 3;
    } else if(step == 3) {
        modalBody.innerHTML = "Once you've placed an annotation on the image, you can easily adjust its dynein arms by clicking on it. <br><br> Simply <b>click on the annotation<b> to cycle through the available dynein arms until you are satisfied.";
        modalFooter.textContent = "4 of 8";

        modal.style.top = "16%";
        modal.style.left = "56%";

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "initial";

        document.getElementById('nextManual').style.display = 'block'
        step = 4; 
    } else if(step == 4) {
        modalBody.innerHTML = "Annotations are automatically saved as you place them on the image. <br><br> You can also see them in the <b>annotation list</b> on the right side of the screen.";
        modalFooter.textContent = "5 of 8";

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "2px solid #006CEB";

        modal.style.top = "250px"
        modal.style.left = "300px"

        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop = "none";
        annotationInfo.style.borderBottom = "0.8px solid rgb(45, 45, 66)";

        step = 5;
    } else if(step == 5) {
        modalBody.innerHTML = "You can also see details about annotation by clicking on the annotation in the list or by clicking on the annotation on the image. <br><br> You can <b>change the annotation</b> by selecting the correct microtubular defect or dynein arms from the dropdown menu.";
        modalFooter.textContent = "6 of 8";

        modal.style.top = "310px"
        modal.style.left = "870px"

        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop = "0.8px solid #006CEB";
        annotationInfo.style.borderBottom = "0.8px solid #006CEB";

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "none";

        step = 6;
    } else if(step == 6) {
        modalBody.innerHTML = "You can delete an annotation by clicking on the <b>trash icon</b> in the list of annotations or by <b>right-clicking</b> on the annotation on the image.";
        modalFooter.textContent = "7 of 8";

        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop = "none";
        annotationInfo.style.borderBottom = "0.8px solid rgb(45, 45, 66)";

        modal.style.top = "16%";
        modal.style.left = "56%";

        var nextButton = document.getElementById('nextManual');
        nextButton.textContent = "Next";

        step = 7;
    } else if (step == 7) {
        modalBody.innerHTML = "You have successfully completed the tutorial. <br><br> Click on the <b>Done</b> button to continue.";
        modalFooter.textContent = "8 of 8";
        step = 8;

        var nextButton = document.getElementById('nextManual');
        nextButton.textContent = "Done";

        modal.style.top = "45%";
        modal.style.left = "40%";
        step = 8;
    } else if(step == 8) {
        closeManual();
    }
}

function closeManual() {
    var modal = document.querySelector("#manual-anotate-modal");
    modal.style.display = "none";

    dropdown = document.getElementById("mtds-tool-dropdown-content");
    dropdown.classList.remove('show')

    var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
    listAnnotations.style.border = "none";

    var annotationInfo = document.getElementById('annotation-info');
    annotationInfo.style.borderTop = "none";
    annotationInfo.style.borderBottom = "0.8px solid rgb(45, 45, 66)";
}

function backManual() {
    step -= 2;
    nextManual();
}