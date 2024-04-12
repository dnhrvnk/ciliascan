function closeExplicitFeedback() {
  document.getElementById('explicit-feedback').style.display = 'none';
  document.querySelector('.three-questions').style.display = 'none';
    document.querySelector('.four-questions').style.display = 'none';
    document.querySelector('.five-questions').style.display = 'none';
    document.querySelector('.six-questions').style.display = 'none';
  document.querySelector('.one-two-questions').style.display = 'block';
  let response = document.querySelector('#feedback-response');
  response.style.display = 'none';

  let feedback_header = document.querySelector('#feedback-header');
  let form_feedback = document.querySelector('#form-feedback');
  let btns = document.querySelector('.explicit-feedback-footer');

  feedback_header.style.display = 'block';
  form_feedback.style.display = 'block';
  btns.style.display = 'flex';
  document.querySelector('#submit-button').textContent = 'Next';
  document.querySelector('#submit-button').onclick = stepForward;
  document.querySelector('#feedback-steps').textContent = 'Step 1 of 5';


}

function openExplicitFeedback() {
  document.getElementById('explicit-feedback').style.display = 'flex';
  let section1DisplayStyle = window.getComputedStyle(section1).getPropertyValue('display');
}

const ratingButtonsSattisfaction = document.querySelectorAll('.rating-btn-satisfaction');
        ratingButtonsSattisfaction.forEach(button => {
            button.addEventListener('click', () => {
                ratingButtonsSattisfaction.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
});

const ratingButtonsEasy = document.querySelectorAll('.rating-btn-easy');
        ratingButtonsEasy.forEach(button => {
            button.addEventListener('click', () => {
                ratingButtonsEasy.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
});

const submit = () => {
    let response = document.querySelector('#feedback-response');
    response.style.display = 'block';

    let feedback_header = document.querySelector('#feedback-header');
    let form_feedback = document.querySelector('#form-feedback');
    let btns = document.querySelector('.explicit-feedback-footer');

    feedback_header.style.display = 'none';
    form_feedback.style.display = 'none';
    btns.style.display = 'none';
}

function stepForward() {
    let section1 = document.querySelector('.one-two-questions');
    let section2 = document.querySelector('.three-questions');
    let section3 = document.querySelector('.four-questions');
    let section4 = document.querySelector('.five-questions');
    let section5 = document.querySelector('.six-questions');
    let btn = document.querySelector('#submit-button');
    let btn_back = document.querySelector('#back-button');
    let btns = document.querySelector('.explicit-feedback-footer');
    let steps = document.querySelector('#feedback-steps');
    
    let section1DisplayStyle = window.getComputedStyle(section1).getPropertyValue('display');
    
    if(section1DisplayStyle === 'block') {
        section1.style.display = 'none';
        section2.style.display = 'block';
        btn_back.style.display = 'block';
        btns.style.justifyContent = 'space-between';
        steps.textContent = 'Step 2 of 5';
    } else if(section2.style.display == 'block') { 
        section2.style.display = 'none';
        section3.style.display = 'block';
        steps.textContent = 'Step 3 of 5';
    } else if(section3.style.display == 'block') {
        section3.style.display = 'none';
        section4.style.display = 'block';
        steps.textContent = 'Step 4 of 5';
    } else if(section4.style.display == 'block') { 
        section4.style.display = 'none';
        section5.style.display = 'block';
        btn.textContent = 'Submit';
        steps.textContent = 'Step 5 of 5';

        btn.onclick = submit;
    }
};


function stepBack() {
    let section1 = document.querySelector('.one-two-questions');
    let section2 = document.querySelector('.three-questions');
    let section3 = document.querySelector('.four-questions');
    let section4 = document.querySelector('.five-questions');
    let section5 = document.querySelector('.six-questions');
    let btn_back = document.querySelector('#back-button');
    let btn = document.querySelector('#submit-button');
    let btns = document.querySelector('.explicit-feedback-footer');
    let steps = document.querySelector('#feedback-steps');

    if(section2.style.display == 'block') {
        section2.style.display = 'none';
        section1.style.display = 'block';
        steps.textContent = 'Step 1 of 5';
    } else if(section3.style.display == 'block') {
        section3.style.display = 'none';
        section2.style.display = 'block';
        steps.textContent = 'Step 2 of 5';
    } else if(section4.style.display == 'block') {  
        section4.style.display = 'none';
        section3.style.display = 'block';
        steps.textContent = 'Step 3 of 5';
    } else if(section5.style.display == 'block') {  
        section5.style.display = 'none';
        section4.style.display = 'block';
        btn.textContent = 'Next';
        btn.onclick = stepForward;
        steps.textContent = 'Step 4 of 5';
    } else if(section1.style.display == 'block') {
        btn_back.style.display = 'none';
        btns.style.justifyContent = 'flex-end';
        steps.textContent = 'Step 1 of 5';
    }
};

let submit_btn = document.querySelector('#submit-button');

if(submit_btn.textContent === 'Submit'  ) {
    submit_btn.addEventListener('click', () => {


        let response = document.querySelector('#feedback-response');
        response.style.display = 'block';

        let feedback_header = document.querySelector('#feedback-header');
        let form_feedback = document.querySelector('#form-feedback');
        let btns = document.querySelector('.explicit-feedback-footer');

        feedback_header.style.display = 'none';
        form_feedback.style.display = 'none';
        btns.style.display = 'none';
    });
}
