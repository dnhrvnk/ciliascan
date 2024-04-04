var explainedAI = false;

const annot_callback = document.querySelector('#btn-run-annotation').onclick;

document.querySelector('#btn-run-annotation').onclick = () => {
    annot_callback()
    document.querySelector('#btn-run-annotation').onclick = annot_callback
    nextStep()
    document.querySelector('#nextStep').style.display='block'
}

function startInboarding() {
    if(explainedAI == false) {
        let welcome = document.querySelector('#welcome-to-run-annotation');
        welcome.style.display = "flex";
        let dropdown = document.querySelector('#run-annotation');
        dropdown.style.display = "block"
        let btn_run_annotation = document.querySelector('#btn-run-annotation');
        btn_run_annotation.style.backgroundColor = "#006CEB";
    }
    explainedAI = true;
}

function inboarding() {
    let welcome = document.querySelector('#welcome-to-run-annotation');
    welcome.style.display = "none";

    openModal();

    let dropdown = document.querySelector('#run-annotation');
        dropdown.style.display = "block";

    let btn_run_annotation = document.querySelector('#btn-run-annotation');
    btn_run_annotation.style.backgroundColor = "#006CEB";   
    
    document.getElementById('mainImage').src = "../images/Tv17.png";

    let btn = document.querySelector('#dropdownMenuButton');
    btn.classList.remove('pulse');
    let dot = document.querySelector('.notification-dot');
    dot.style.display = "none";
}

function stopInboarding() {
    let welcome = document.querySelector('#welcome-to-run-annotation');
    welcome.style.display = "none";

    let btn = document.querySelector('#dropdownMenuButton');
    btn.classList.remove('pulse');
    let dot = document.querySelector('.notification-dot');
    dot.style.display = "none";
}


var modal_a = document.getElementById("modal");
var btn = document.querySelector(".button-common");
var span = document.getElementsByClassName("close")[0];

function openModal() {
  modal_a.style.display = "block";
}

function closeModal() {
    modal_a.style.display = "none";
  
    var mainImage = document.getElementById('mainImage');
    mainImage.style.border = "none";
  
    let dropdown = document.querySelector('#run-annotation');
    dropdown.style.display = "none";
    
    let btn_run_annotation = document.querySelector('#btn-run-annotation');
    btn_run_annotation.style.backgroundColor = "transparent";

    var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
    listAnnotations.style.border = "none";

    let chips = document.querySelectorAll('.chip');
    for (var i = 0; i < chips.length; i++) { 
        chips[i].style.border = "none";
    }

    var annotationInfo = document.getElementById('annotation-info');
    annotationInfo.style.borderTop= "none";
    annotationInfo.style.borderBottom = "0.8px solid rgb(45, 45, 66)";
}

var currentStep = 1;
var annot_callbacks = []
function nextStep() {
    
    var modalBody = modal_a.querySelector('.modal-body p');
    var modalFooter = modal_a.querySelector('.modal-footer p');

    if(currentStep == 0) {
        modalBody.innerHTML = 'To activate automatic annotation, simply select "<b>Run Annotation</b>" in dropdown menu. <br><br>Our AI technology will then swiftly analyze the current image, highlighting celia for further review.';
        modalFooter.textContent = "1 of 8";

        let dropdown = document.querySelector('#run-annotation');
        dropdown.style.display = "block";

        let btn_run_annotation = document.querySelector('#btn-run-annotation');
        btn_run_annotation.style.backgroundColor = "#006CEB";

        currentStep = 1;
    }
    else if(currentStep == 1) {
        modalBody.innerHTML = "This is the <b>image</b> with the annotated cilia.";
        
        let back = document.getElementById('backStep');
        back.style.display = "block";

        var mainImage = document.getElementById('mainImage');
        mainImage.style.border = "5px solid #006CEB";
        
        let dropdown = document.querySelector('#run-annotation');
        dropdown.style.display = "none";
    
        let btn_run_annotation = document.querySelector('#btn-run-annotation');
        btn_run_annotation.style.backgroundColor = "transparent";

        let modal = document.getElementById('modal');
        modal.style.top = "150px"
        modal.style.left = "850px"

        modalFooter.textContent = "2 of 8";
        
        currentStep = 2;
    } else if(currentStep == 2) {
        modalBody.innerHTML = "This is <b>list of annotations</b> for the image.";
        modalFooter.textContent = "3 of 8";
        
        var mainImage = document.getElementById('mainImage');
        mainImage.style.border = "none";

        let modal = document.getElementById('modal');
        modal.style.top = "250px"
        modal.style.left = "300px"

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "2px solid #006CEB";

        currentStep = 3;
    } else if(currentStep == 3) {
        modalBody.innerHTML = "This is the <b>confidence level</b> of the annotated cilia. <br><br> If the confidence level is <b>high</b>, the annotation is likely accurate. <br><br> If the confidence level is <b>low</b>, the annotation may not be accurate and needs to be revalidated.";
        modalFooter.textContent = "4 of 8";

        let chips = document.querySelectorAll('.chip');
        for (var i = 0; i < chips.length; i++) { 
            chips[i].style.border = "2px solid #006CEB";
        }

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "none";

        document.getElementById('nextStep').style.display = 'block'

        document.querySelectorAll('.table-annotations tr').forEach((element) => {
            element.onclick = row_click_callback(element)
        })

        currentStep = 4;   
    } else if(currentStep == 4) {
        modalBody.innerHTML = "Select an annotation to <b>view the details</b> and <b>edit the annotation</b> by clicking on the row.";
        modalFooter.textContent = "5 of 8";

        document.getElementById('nextStep').style.display = 'none'

        document.querySelectorAll('.table-annotations tr').forEach((element) => {
            const call_back = element.onclick
            element.onclick = () => {
                console.log(call_back)
                call_back()
                nextStep()
                element.onclick = call_back
            }
        })

        let chips = document.querySelectorAll('.chip');
        for (var i = 0; i < chips.length; i++) { 
            chips[i].style.border = "none";
        }

        currentStep = 5;
    } else if(currentStep == 5) {
        modalBody.innerHTML = "Here are details of the selected annotation. <br><br> You can <b>edit the annotation</b> by selecting the correct microtubular defect or dynein arms from the dropdown menu.";
        modalFooter.textContent = "6 of 8";

        let modal = document.getElementById('modal');
        modal.style.top = "310px"
        modal.style.left = "870px"

        document.getElementById('nextStep').style.display = 'block'

        document.querySelectorAll('.table-annotations tr').forEach((element) => {
            element.onclick = row_click_callback(element)
        })


        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop = "0.8px solid #006CEB";
        annotationInfo.style.borderBottom = "0.8px solid #006CEB";

        currentStep = 6;
    } else if(currentStep == 6) {
        modalBody.innerHTML = "";
        modalFooter.textContent = "7 of 8";

        let modal = document.getElementById('modal');
        modal.style.top = "150px"
        modal.style.left = "850px"

        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop= "none";
        annotationInfo.style.borderBottom = "0.8px solid rgb(45, 45, 66)";


        currentStep = 7;
    } else if (currentStep == 7) {
        modalBody.innerHTML = "You have successfully completed the tutorial. <br><br> Click on the <b>Done</b> button to continue.";
        modalFooter.textContent = "8 of 8";

        let modal = document.getElementById('modal');
        modal.style.top = "40%"
        modal.style.left = "40%"

        currentStep = 8;
        var nextButton = document.getElementById('nextStep');
        nextButton.style.display = "block";
        nextButton.textContent = "Done";
    } else if(currentStep == 8) {
        closeModal();
    }
}

function backStep() {
    currentStep -= 2;
    nextStep();

    if(currentStep < 8) {
        var nextButton = document.getElementById('nextStep');
        nextButton.textContent = "Next";
    }

    if(currentStep == 5) {
        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop = "none";
        annotationInfo.style.borderBottom = "none";

        let modal = document.getElementById('modal');
        modal.style.top = "250px"
        modal.style.left = "300px"
    }
    else if(currentStep == 3) {
        let chips = document.querySelectorAll('.chip');
        for (var i = 0; i < chips.length; i++) { 
            chips[i].style.border = "none";
        }
    } else if(currentStep == 1) {
        let back = document.getElementById('backStep');
        back.style.display = "none";

        let dropdown = document.querySelector('#run-annotation');
        dropdown.style.display = "block";

        let btn_run_annotation = document.querySelector('#btn-run-annotation');
        btn_run_annotation.style.backgroundColor = "#006CEB";

        let modal = document.getElementById('modal');
        modal.style.top = "250px";
        modal.style.left = "550px";

        let image = document.getElementById('mainImage');
        image.style.border = "none";
    } else if(currentStep == 2) {
        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "none";
    }
}