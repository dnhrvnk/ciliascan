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
var area_callback = undefined

function nextManual() {
    if(step == 0) {
        modalBody.innerHTML = "Poďme sa naučiť ako <b>ručne anotovať</b> obrázok.";
        modalFooter.textContent = "1 z 8";
        
        dropdown = document.getElementById("mtds-tool-dropdown-content");
        dropdown.classList.remove("show");
        
        modal.style.top = "45%";
        modal.style.left = "40%";

        document.getElementById('nextManual').style.display = 'block'

        if(call_backs.length!=0){
            document.querySelectorAll('#mtds-tool-dropdown-content li').forEach((element) => {
                element.onclick = call_backs.pop()
            })
        }

        let back = document.getElementById('backManual');
        back.style.display = "none";

        step = 1;
    }
    else if(step == 1) {
        modalBody.innerHTML = "Z rozbaľovacieho zoznamu vyberte príslušnú príchuť sušienky.";
        modalFooter.textContent = "2 z 8";
    
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

        
        if(area_callback) {
            document.getElementById("mainImage").onclick = area_callback
        }

        step = 2;
    } else if(step == 2) {
        modalBody.innerHTML ="Teraz, keď ste vybrali príchuť sušienky, môžete začať označovať sušienky na obrázku. <br><br> Umiestnite kurzor nad oblasť obrázka, kde sa nachádza sušienka danej príchute. <b>Kliknutím na obrázok umiestnite označenie</b> presne na dané miesto.";
        modalFooter.textContent = "3 z 8";

        dropdown = document.getElementById("mtds-tool-dropdown-content");
        dropdown.classList.remove("show");
        console.log(dropdown.classList)

        document.querySelectorAll('#mtds-tool-dropdown-content li').forEach((element) => {
            console.log(element.onclick)
        })

        area = document.getElementById("mainImage")
        area_callback = area.onclick
        area.onclick = (event)=>{
            area_callback(event)
            area.onclick = area_callback
            nextManual()
        }

        document.getElementById('nextManual').style.display = 'none'

        document.querySelectorAll('#mtds-tool-dropdown-content li').forEach((element) => {
            element.onclick = call_backs.pop()
        })

        modal.style.top = "16%";
        modal.style.left = "56%";

        step = 3;
    } else if(step == 3) {
        modalBody.innerHTML = "Po umiestnení označenia môžete ľahko upraviť typ kúskov sušienky kliknutím na označenie. <br><br> Jednoducho <b>kliknite na označenie<b> a klikajte dokým nebudete spokojný so značkou typu kúskov.";
        modalFooter.textContent = "4 z 8";

        modal.style.top = "16%";
        modal.style.left = "56%";

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "initial";

        document.getElementById('nextManual').style.display = 'block'
        step = 4; 
    } else if(step == 4) {
        modalBody.innerHTML = "Označenia sa automaticky ukladajú, keď ich umiestnite na obrázok. <br><br> Môžete ich tiež vidieť v <b>zozname označení</b> na pravej strane obrazovky."; 
        modalFooter.textContent = "5 z 8";

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "2px solid #006CEB";

        modal.style.top = "250px"
        modal.style.left = "300px"

        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop = "none";
        annotationInfo.style.borderBottom = "0.8px solid rgb(45, 45, 66)";

        step = 5;
    } else if(step == 5) {
        modalBody.innerHTML = "Podrobnosti o označení si môžete pozrieť aj kliknutím na riadok v zozname alebo kliknutím na označenie na obrázku. <br><br> Označenie môžete <b>zmeniť</b> výberom správnej príchute sušienky alebo typu kúskov z rozbaľovacieho zoznamu.";
        modalFooter.textContent = "6 z 8";

        modal.style.top = "310px"
        modal.style.left = "870px"

        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop = "0.8px solid #006CEB";
        annotationInfo.style.borderBottom = "0.8px solid #006CEB";

        var listAnnotations = document.querySelector('.uploaded-image-annotations.active');
        listAnnotations.style.border = "none";

        step = 6;
    } else if(step == 6) {
        modalBody.innerHTML = "Anotáciu môžete odstrániť kliknutím na <b>ikonu koša</b> v zozname označení alebo <b>pravým kliknutím</b> na označenie na obrázku.";        
        modalFooter.textContent = "7 z 8";
        var annotationInfo = document.getElementById('annotation-info');
        annotationInfo.style.borderTop = "none";
        annotationInfo.style.borderBottom = "0.8px solid rgb(45, 45, 66)";

        modal.style.top = "16%";
        modal.style.left = "56%";

        var nextButton = document.getElementById('nextManual');
        nextButton.textContent = "Ďalej";

        step = 7;
    } else if (step == 7) {
        modalBody.innerHTML = "Úspešne ste dokončili tutoriál manuálneho označovania. <br><br> Pokračujte kliknutím na tlačidlo <b>Hotovo</b>.";
        modalFooter.textContent = "8 z 8";
        step = 8;

        var nextButton = document.getElementById('nextManual');
        nextButton.textContent = "Hotovo";

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

    if(call_backs.length!=0){
        console.log('closing',call_backs.length)
        document.querySelectorAll('#mtds-tool-dropdown-content li').forEach((element) => {
            element.onclick = call_backs.pop()
            console.log(element.onclick)
        })
    }
    let btn_export = document.getElementById('btn-export');
    btn_export.classList.remove("button-grey");
    btn_export.disabled = false;
    btn_export.classList.add("button-blue");
    
    let btn_automatic = document.getElementById("dropdownMenuButton");
    btn_automatic.disabled = false;
    btn_automatic.classList.add("pulse");
    btn_automatic.classList.remove("button-icons-disabled");
    btn_automatic.classList.add("button-icons");
    document.getElementById("notification-dot").style.display = "block";

    let btn_annotations = document.getElementById("mtds-tool-btn");
    btn_annotations.classList.add("button-active");
    
    if(area_callback) {
        document.getElementById("mainImage") = area_callback
    }
}

function backManual() {
    step -= 2;
    nextManual();
}