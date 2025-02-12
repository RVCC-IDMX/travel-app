function e(sel, event, func) {
    let answer = document.getElementById(sel);
    answer.addEventListener(event, func);
}

const q1 = document.getElementById('question-1');
const q2 = document.getElementById('question-2');
const q3 = document.getElementById('question-3');
const q4 = document.getElementById('question-4');
const q5 = document.getElementById('question-5');
const q6 = document.getElementById('question-6');
const q7 = document.getElementById('question-7');

e('1-yes', 'click', () => {
    console.log('Remove US cities');
    questionAdvance(q1, q2);
});

e('1-no', 'click', () => {
    console.log('Remove non US cities');
    questionAdvance(q1, q2);
});

e('1-no-pref', 'click', () => {
    console.log('Do nothing');
    questionAdvance(q1, q2);
});

e('2-weekend', 'click', () => {
    console.log('+1 Point for small cities');
    questionAdvance(q2, q3);
});

e('2-week', 'click', () => {
    console.log('+1 Point for big cities');
    questionAdvance(q2, q3);
});

e('2-longer', 'click', () => {
    console.log('Remove small cities');
    questionAdvance(q2, q3);
});

e('3-warm', 'click', () => {
    console.log('Keep only warm cities');
    questionAdvance(q3, q4);
});

e('3-cold', 'click', () => {
    console.log('Keep only cold cities');
    questionAdvance(q3, q4);
});

e('3-wet', 'click', () => {
    console.log('Keep only wet cities');
    questionAdvance(q3, q4);
});

e('3-no-pref', 'click', () => {
    console.log('Do nothing');
    questionAdvance(q3, q4);
});

e('4-cozy', 'click', () => {
    console.log('+2 Points for small cities');
    questionAdvance(q4, q5);
});

e('4-bustling', 'click', () => {
    console.log('+2 Points for big cities');
    questionAdvance(q4, q5);
});

e('4-no-pref', 'click', () => {
    console.log('Do nothing');
    questionAdvance(q4, q5);
});

e('5-jungle', 'click', () => {
    console.log('Remove cities where jungle is not highest in enviorments');
    questionAdvance(q5, q6);
});

e('5-forest', 'click', () => {
    console.log('Remove cities where forest is not highest in enviorments');
    questionAdvance(q5, q6);
});

e('5-desert', 'click', () => {
    console.log('Remove cities where desert is not highest in enviorments');
    questionAdvance(q5, q6);
});

e('5-costal', 'click', () => {
    console.log('Remove cities where costal is not highest in enviorments');
    questionAdvance(q5, q6);
});

e('5-mountains', 'click', () => {
    console.log('Remove cities where mountains is not highest in enviorments');
    questionAdvance(q5, q6);
});

e('5-cityscape', 'click', () => {
    console.log('Remove cities where cityscape is not highest in enviorments');
    questionAdvance(q5, q6);
});

e('5-no-pref', 'click', () => {
    console.log('Do nothing');
    questionAdvance(q5, q6);
});

e('6-fine', 'click', () => {
    console.log('+1 Point for fine');
    questionAdvance(q6, q7);
});

e('6-casual', 'click', () => {
    console.log('+1 Point for casual');
    questionAdvance(q6, q7);
});

e('7-yes', 'click', () => {
    console.log('Display family attractions.');
    questionAdvance(q7);
});

e('7-no', 'click', () => {
    console.log('Display non family attractions.');
    questionAdvance(q7);
});

function questionAdvance(currentQuestion, nextQuestion) {
    currentQuestion.style.display = 'none';

    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    }
    else {
        console.log('Quiz Finished');
    }
}
