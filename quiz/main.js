const q1 = document.getElementById('question-1');
const q2 = document.getElementById('question-2');
const q3 = document.getElementById('question-3');
const q4 = document.getElementById('question-4');
const q5 = document.getElementById('question-5');
const q6 = document.getElementById('question-6');
const q7 = document.getElementById('question-7');
const q8 = document.getElementById('question-8');
const q9a = document.getElementById('question-9a');
const q9b = document.getElementById('question-9b');
const q10 = document.getElementById('question-10');

const smallCityThreshold = 0.25;

let sizeMax = 0;
let sizeMin = 0;

let cityData = [];

async function createQuiz() {
    await getCityData();

    normalizeSize();

    awardPoints('attraction', 'amusementPark')

    console.log('Data collection complete.')

    eventHelper('1-yes', 'click', () => {
        console.log('Remove US cities.');
        cityData = cityData.filter((city) => city.location.country != 'USA');
        questionAdvance(q1, q2);
    });

    eventHelper('1-no', 'click', () => {
        console.log('Remove non US cities.');
        cityData = cityData.filter((city) => city.location.country == 'USA');
        questionAdvance(q1, q2);
    });

    eventHelper('1-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q1, q2);
    });

    eventHelper('2-weekend', 'click', () => {
        console.log('+1 Point for small cities.');
        cityData.forEach(city => {
            if (city.size < smallCityThreshold) {
                city.points++;
            }
        });
        questionAdvance(q2, q3);
    });

    eventHelper('2-week', 'click', () => {
        console.log('+1 Point for big cities.');
        cityData.forEach(city => {
            if (city.size > smallCityThreshold) {
                city.points++;
            }
        });
        questionAdvance(q2, q3);
    });

    eventHelper('2-longer', 'click', () => {
        console.log('Remove small cities.');
        cityData = cityData.filter((city) => city.size > smallCityThreshold);
        questionAdvance(q2, q3);
    });

    eventHelper('3-warm', 'click', () => {
        console.log('Keep only warm cities.');
        questionAdvance(q3, q4);
    });

    eventHelper('3-cold', 'click', () => {
        console.log('Keep only cold cities.');
        questionAdvance(q3, q4);
    });

    eventHelper('3-wet', 'click', () => {
        console.log('Keep only wet cities.');
        questionAdvance(q3, q4);
    });

    eventHelper('3-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q3, q4);
    });

    eventHelper('4-cozy', 'click', () => {
        console.log('+2 Points for small cities.');
        questionAdvance(q4, q5);
    });

    eventHelper('4-bustling', 'click', () => {
        console.log('+2 Points for big cities.');
        questionAdvance(q4, q5);
    });

    eventHelper('4-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q4, q5);
    });

    eventHelper('5-jungle', 'click', () => {
        console.log('Remove cities where jungle is not highest in environments.');
        questionAdvance(q5, q6);
    });

    eventHelper('5-forest', 'click', () => {
        console.log('Remove cities where forest is not highest in environments.');
        questionAdvance(q5, q6);
    });

    eventHelper('5-desert', 'click', () => {
        console.log('Remove cities where desert is not highest in environments.');
        questionAdvance(q5, q6);
    });

    eventHelper('5-coastal', 'click', () => {
        console.log('Remove cities where coastal is not highest in environments.');
        questionAdvance(q5, q6);
    });

    eventHelper('5-mountains', 'click', () => {
        console.log('Remove cities where mountains is not highest in environments.');
        questionAdvance(q5, q6);
    });

    eventHelper('5-cityscape', 'click', () => {
        console.log('Remove cities where cityscape is not highest in environments.');
        questionAdvance(q5, q6);
    });

    eventHelper('5-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q5, q6);
    });

    eventHelper('6-fine', 'click', () => {
        console.log('+1 Point for fine.');
        questionAdvance(q6, q7);
    });

    eventHelper('6-casual', 'click', () => {
        console.log('+1 Point for casual.');
        questionAdvance(q6, q7);
    });

    eventHelper('7-yes', 'click', () => {
        console.log('Remove cities with a score lower than 2.');
        questionAdvance(q7, q8);
    });

    eventHelper('7-no', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q7, q8);
    });

    eventHelper('8-yes', 'click', () => {
        console.log('Display family attractions.');
        questionAdvance(q8, q9b);
    });

    eventHelper('8-no', 'click', () => {
        console.log('Display non family attractions.');
        questionAdvance(q8, q9a);
    });

    eventHelper('9a-natural-wonder', 'click', () => {
        console.log('Remove cities where Natural Wonder is not the highest rated.');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-monument', 'click', () => {
        console.log('Remove cities where Monument is not the highest rated.');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-historic-site', 'click', () => {
        console.log('Remove cities where Historic Site is not the highest rated.');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-religious-site', 'click', () => {
        console.log('Remove cities where Religious Site is not the highest rated.');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-museum', 'click', () => {
        console.log('Remove cities where Museum is not the highest rated.');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-stadium', 'click', () => {
        console.log('Remove cities where Stadium is not the highest rated.');
        questionAdvance(q9a, q10);
    });

    eventHelper('9b-natural-wonder', 'click', () => {
        console.log('Remove cities where Natural Wonder is not the highest rated.');
        questionAdvance(q9b);
    });

    eventHelper('9b-aquarium', 'click', () => {
        console.log('Remove cities where Aquarium is not the highest rated.');
        questionAdvance(q9b);
    });

    eventHelper('9b-amusement-park', 'click', () => {
        console.log('Remove cities where Amusement Park is not the highest rated.');
        questionAdvance(q9b);
    });

    eventHelper('9b-zoo', 'click', () => {
        console.log('Remove cities where Zoo is not the highest rated.');
        questionAdvance(q9b);
    });

    eventHelper('9b-museum', 'click', () => {
        console.log('Remove cities where Museum is not the highest rated.');
        questionAdvance(q9b);
    });

    eventHelper('9b-stadium', 'click', () => {
        console.log('Remove cities where Stadium is not the highest rated.');
        questionAdvance(q9b);
    });

    eventHelper('10-not-important', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q10);
    });

    eventHelper('10-somewhat-important', 'click', () => {
        console.log('Remove cities with under 1 in nightlife.');
        questionAdvance(q10);
    });

    eventHelper('10-very-important', 'click', () => {
        console.log('Remove cities with under 2 in nightlife.');
        questionAdvance(q10);
    });
}

function eventHelper(sel, event, func) {
    let answer = document.getElementById(sel);
    answer.addEventListener(event, func);
}

async function getCityData() {
    const url = "/_site/cities.json";
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        cityData = await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

function normalizeSize() {
    // Find largest city size
    cityData.forEach(city => {
        let citySizeInt = parseInt(city.size.replace(/,/g, ''));

        if (citySizeInt > sizeMax || sizeMax == 0) {
            sizeMax = citySizeInt;
        }
    });

    // Find smallest city size
    cityData.forEach(city => {
        let citySizeInt = parseInt(city.size.replace(/,/g, ''));

        if (citySizeInt < sizeMin || sizeMin == 0) {
            sizeMin = citySizeInt;
        }
    });

    // Normalize city size
    cityData.forEach(city => {
        let citySizeInt = parseInt(city.size.replace(/,/g, ''));

        city.size = ((citySizeInt - sizeMin) / (sizeMax - sizeMin));
    });
}

function awardPoints(category, key) {
    cityData.forEach(city => {
        if (!category) {
            console.log(city[key]);
        } 
        else {
            console.log(city[category][key]);
        }
    });
}

function questionAdvance(currentQuestion, nextQuestion) {
    currentQuestion.style.display = 'none';

    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    }
    else {
        console.log('Quiz Finished');
    }

    console.log(cityData);
}

document.addEventListener("DOMContentLoaded", createQuiz);