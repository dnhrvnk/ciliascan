function export_annotations() {
    if(run_annotation) {
        let modal = document.getElementById("generate-modal");
        modal.style.display = "block";
    }
    else {
        show_succsess();
    }
}

function show_succsess() {
    document.getElementById("succesful-generate-modal").style.display = "block";
    document.getElementById("generate-modal").style.display = "none";
}

function closeGenerate() {
    document.getElementById("generate-modal").style.display = "none";
}

function closeSuccessGenerate() {
    document.getElementById("succesful-generate-modal").style.display = "none";
}

function updateWarningMessage() {
    let msg = document.getElementById("warning-content");
    let expl = document.getElementById("warning-expl");
    let modal = document.getElementById("warning-modal");
    console.log(msg.style)
    if(msg.style.display == "none") {
        msg.style.display = "block";
        expl.style.display = "none";
        modal.style.left = "60%";
        //modal.style.top = "-45%";
    } else {
        msg.style.display = "none";
        expl.style.display = "block";
        modal.style.left = null;
        //modal.style.top = null;
    }

    if (msg.style.maxHeight === "0px") {
        msg.style.maxHeight = msg.scrollHeight + "px";
    } else {
        msg.style.maxHeight = "0px";
    }
}

