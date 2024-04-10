function openModelInfo() {
    var modal = document.getElementById('model-information');
    modal.style.display = 'flex';
}

function showContent(sectionId) {
    var contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(function(section) {
        section.style.display = 'none';
    });

    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    var navLinks = document.querySelectorAll('#model-nav a');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    var clickedLink = document.getElementById(sectionId + '-link');
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

function closeModelInformation() {
    var modal = document.getElementById('model-information');
    modal.style.display = 'none';
}

function showExample(defect) {
    const imageContainers = document.querySelectorAll('#example-images');
    imageContainers.forEach(container => {
        container.style.display = 'none';
    });
    
    const defectImages = document.querySelector(`#example-images.${defect}`);
    if (defectImages) {
        defectImages.style.display = 'flex';
    }

    var navLinks = document.querySelectorAll('#defect-navigation a');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    var clickedLink = document.getElementById(defect + '-link');
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

function showMoreInfo() {
    var moreInfo = document.getElementById('annotation-info-card');
    moreInfo.style.display = 'block';
    let image = document.getElementById('image-annotations');
    image.style.display = 'none';

    var annotationInfo = document.getElementById('btnInfo');
    annotationInfo.textContent = 'Hide more info';
    annotationInfo.onclick = () => closeAnnotationInfo();

}

function closeAnnotationInfo() {
    let info = document.getElementById('annotation-info-card');
    let image = document.getElementById('image-annotations');
    info.style.display = 'none';
    image.style.display = 'block';
    
    var annotationInfo = document.getElementById('btnInfo');
    annotationInfo.textContent = 'Show more info';
    annotationInfo.onclick = () => showMoreInfo();

}

function showCounterfactual(imageId) {
    var images = document.querySelectorAll('.Counterfactual-imgs img');
    images.forEach(function(image) {
        image.style.display = 'none';
    });

    var imageToShow = document.getElementById(imageId);
    if (imageToShow) {
        imageToShow.style.display = 'block';
    }

    var activeLinks = document.querySelectorAll('.Counterfactual-nav a');
    activeLinks.forEach(function(link) {
        link.classList.remove('active');
    });
    var clickedLink = document.getElementById(imageId + '-link');
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}