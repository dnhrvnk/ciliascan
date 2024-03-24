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

console.log(document.getElementById('notes').getBoundingClientRect().bottom);

function toggleCollapsible(element) {
    var content = element.nextElementSibling;
    var icon = element.querySelector('.chevron-icon');
    element.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
    icon.classList.toggle('rotate');
}


function toggleAnnotations(element) {
    var annotationsDiv = element.parentElement.parentElement.nextElementSibling;
    var chevronIcon = element;

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

// color of confidence chips based on value
var chips = document.querySelectorAll('.chip');

chips.forEach(function(chip) {
    var text = chip.textContent.trim();
    var value = parseFloat(text.replace('%', ''));

    if (value < 0.75) {
        chip.style.backgroundColor = '#FF5F5896';
    } else if (value < 0.90) {
        chip.style.backgroundColor = '#febc2e80';
    } else {
        chip.style.backgroundColor = 'transparent';
    }
});

// Get the rows of the first table
var tableRows = document.querySelectorAll('.table-annotations tr');

// Add click event listeners to each row
tableRows.forEach(function(row) {
    row.addEventListener('click', function() {

        var selectedRows = document.querySelectorAll('.table-annotations tr.selected-row');
        selectedRows.forEach(function(selectedRow) {
            selectedRow.classList.remove('selected-row');
        });
        row.classList.add('selected-row');

        // Extract information from the clicked row
        var defectType = row.cells[1].textContent.trim();
        var confLevel = row.cells[2].querySelector('.chip').textContent.trim();

        // Update the second table with extracted information
        var mtdsSelect = document.getElementById('mtds');
        var dyneinSelect = document.getElementById('dynein');
        var confLevelCell = document.querySelector('.conf-level');

        mtdsSelect.value = defectType;
        confLevelCell.textContent = confLevel;
        
        // Trigger change event to update the select elements' appearance
        var event = new Event('change', { bubbles: true });
        mtdsSelect.dispatchEvent(event);
        dyneinSelect.dispatchEvent(event);

        var text = confLevelCell.textContent.trim();
        var value = parseFloat(text.replace('%', ''));

        if (value < 0.75) {
            confLevelCell.style.backgroundColor = '#FF5F5896';
        } else if (value < 0.90) {
            confLevelCell.style.backgroundColor = '#febc2e80';
        } else {
            confLevelCell.style.backgroundColor = '#00000000';
        }
        });
});

// Get the range slider element
var slider = document.getElementById("myRange");
var output = document.getElementById("rangeValue");
var annotations = document.getElementsByClassName("annotation");


function updateOutputPosition() {
    var percent = (slider.value - slider.min) / (slider.max - slider.min);
    var position = percent * (slider.offsetWidth - 5); // Subtracting the width of the output element
    var middlePosition = slider.getBoundingClientRect().left + position;
    output.style.left = middlePosition + 'px';
}

function toggleOutputVisibility() {
    output.style.display = slider.classList.contains('active') ? 'block' : 'none';
}

output.textContent = slider.value;

slider.addEventListener("input", function() {
    output.textContent = this.value;
    updateOutputPosition();
    toggleOutputVisibility();

    var opacityValue = this.value / 100; // Convert slider value to opacity value (between 0 and 1)
    annotations.forEach(function(annotation) {
        annotation.style.opacity = opacityValue;
    });
});

slider.addEventListener("mousedown", function() {
    slider.classList.add('active');
    toggleOutputVisibility();
});

slider.addEventListener("mouseup", function() {
    slider.classList.remove('active');
    toggleOutputVisibility();
});
updateOutputPosition();

// Get references to the button and slider container
var toggleSliderButton = document.getElementById("toggleSliderButton");
var sliderContainer = document.getElementById("sliderContainer");

function toggleSlider() {
    if (sliderContainer.style.display === "none") {
        sliderContainer.style.display = "block";
    } else {
        sliderContainer.style.display = "none";
    }
}
toggleSliderButton.addEventListener("click", toggleSlider);




