function export_annotations() {
    if(run_annotation) {
        let modal = document.getElementById("modal-ggg-overlay");
        modal.style.display = "block";
    }
    else {
        show_succsess();
    }
}

function show_succsess() {
    document.getElementById("modal-succ-overlay").style.display = "block";
    document.getElementById("modal-ggg-overlay").style.display = "none";
}

function closeGenerate() {
    document.getElementById("modal-ggg-overlay").style.display = "none";
}

function closeSuccessGenerate() {
    document.getElementById("modal-succ-overlay").style.display = "none";
}

function updateWarningMessage() {
    let msg = document.getElementById("warning-content");
    let expl = document.getElementById("warning-expl");
    let modal = document.getElementById("warning-modal");
    console.log(msg.style)
    if(msg.style.display == "none" || msg.style.display == "") {
        msg.style.display = "block";
        expl.style.display = "none";
        modal.style.left = "60%";
    } else {
        msg.style.display = "none";
        expl.style.display = "block";
        modal.style.left = null;
    }

}

