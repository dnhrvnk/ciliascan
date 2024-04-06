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

