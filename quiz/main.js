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
const hotCityThreshold = 2;
const coldCityThreshold = 2;
const wetCityThreshold = 2;


let sizeMax = 0;
let sizeMin = 0;

let cityData = [];

async function createQuiz() {
    await getCityData();

    normalizeSize();

    console.log('Data collection complete.')

    eventHelper('1-yes', 'click', () => {
        console.log('Remove US cities.');
        removeCity('country', 'location', 'USA', '!==');
        questionAdvance(q1, q2);
    });

    eventHelper('1-no', 'click', () => {
        console.log('Remove non US cities.');
        removeCity('country', 'location', 'USA', '===');
        questionAdvance(q1, q2);
    });

    eventHelper('1-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q1, q2);
    });

    eventHelper('2-weekend', 'click', () => {
        console.log('+1 Point for small cities.');
        awardPoints(1, 'size', '', true);
        questionAdvance(q2, q3);
    });

    eventHelper('2-week', 'click', () => {
        console.log('+1 Point for big cities.');
        awardPoints(1, 'size', '');
        questionAdvance(q2, q3);
    });

    eventHelper('2-longer', 'click', () => {
        console.log('Remove small cities.');
        removeCity('size', '', smallCityThreshold, '>');
        awardPoints(2, 'size', '');
        questionAdvance(q2, q3);
    });

    eventHelper('3-warm', 'click', () => {
        console.log('Keep only warm cities.');
        removeCity('hot', 'weather', hotCityThreshold, '>=');
        awardPoints(1, 'hot', 'weather');
        questionAdvance(q3, q4);
    });

    eventHelper('3-cold', 'click', () => {
        console.log('Keep only cold cities.');
        removeCity('cold', 'weather', coldCityThreshold, '>=');
        awardPoints(1, 'cold', 'weather');
        questionAdvance(q3, q4);
    });

    eventHelper('3-wet', 'click', () => {
        console.log('Keep only wet cities.');
        removeCity('wet', 'weather', wetCityThreshold, '>=');
        awardPoints(1, 'wet', 'weather');
        questionAdvance(q3, q4);
    });

    eventHelper('3-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q3, q4);
    });

    eventHelper('4-cozy', 'click', () => {
        console.log('+2 Points for small cities.');
        awardPoints(2, 'size', '', true);
        questionAdvance(q4, q5);
    });

    eventHelper('4-bustling', 'click', () => {
        console.log('+2 Points for big cities.');
        awardPoints(2, 'size', '');
        questionAdvance(q4, q5);
    });

    eventHelper('4-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q4, q5);
    });

    eventHelper('5-jungle', 'click', () => {
        console.log('Remove cities where jungle is not highest in environments.');
        awardPoints(1, 'jungle', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-forest', 'click', () => {
        console.log('Remove cities where forest is not highest in environments.');
        awardPoints(1, 'forests', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-desert', 'click', () => {
        console.log('Remove cities where desert is not highest in environments.');
        awardPoints(1, 'desert', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-coastal', 'click', () => {
        console.log('Remove cities where coastal is not highest in environments.');
        awardPoints(1, 'coast', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-mountains', 'click', () => {
        console.log('Remove cities where mountains is not highest in environments.');
        awardPoints(1, 'mountains', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-cityscape', 'click', () => {
        console.log('Remove cities where cityscape is not highest in environments.');
        awardPoints(1, 'cityscape', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q5, q6);
    });

    eventHelper('6-fine', 'click', () => {
        console.log('+1 Point for fine.');
        awardPoints(1, 'foodFine', 'food');
        questionAdvance(q6, q7);
    });

    eventHelper('6-casual', 'click', () => {
        console.log('+1 Point for casual.');
        awardPoints(1, 'foodCasual', 'food');
        questionAdvance(q6, q7);
    });

    eventHelper('7-yes', 'click', () => {
        console.log('Remove cities with a score lower than 2.');
        awardPoints(1, 'shopping', '');
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
        // console.log('Remove cities where Natural Wonder is not the highest rated.');
        awardPoints(1, 'naturalWonder', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-monument', 'click', () => {
        // console.log('Remove cities where Monument is not the highest rated.');
        awardPoints(1, 'monument', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-historic-site', 'click', () => {
        // console.log('Remove cities where Historic Site is not the highest rated.');
        awardPoints(1, 'historicSite', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-religious-site', 'click', () => {
        // console.log('Remove cities where Religious Site is not the highest rated.');
        awardPoints(1, 'religious', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-museum', 'click', () => {
        // console.log('Remove cities where Museum is not the highest rated.');
        awardPoints(1, 'museum', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-stadium', 'click', () => {
        // console.log('Remove cities where Stadium is not the highest rated.');
        awardPoints(1, 'stadium', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-theatre', 'click', () => {
        // console.log('Remove cities where Stadium is not the highest rated.');
        awardPoints(1, 'theatre', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9b-natural-wonder', 'click', () => {
        // console.log('Remove cities where Natural Wonder is not the highest rated.');
        awardPoints(1, 'naturalWonder', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-aquarium', 'click', () => {
        // console.log('Remove cities where Aquarium is not the highest rated.');
        awardPoints(1, 'aquarium', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-amusement-park', 'click', () => {
        // console.log('Remove cities where Amusement Park is not the highest rated.');
        awardPoints(1, 'amusementPark', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-zoo', 'click', () => {
        // console.log('Remove cities where Zoo is not the highest rated.');
        awardPoints(1, 'zoo', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-museum', 'click', () => {
        // console.log('Remove cities where Museum is not the highest rated.');
        awardPoints(1, 'museum', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-stadium', 'click', () => {
        // console.log('Remove cities where Stadium is not the highest rated.');
        awardPoints(1, 'stadium', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-theatre', 'click', () => {
        // console.log('Remove cities where Stadium is not the highest rated.');
        awardPoints(1, 'theatre', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('10-not-important', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q10);
    });

    eventHelper('10-somewhat-important', 'click', () => {
        console.log('Remove cities with under 1 in nightlife.');
        awardPoints(1, 'nightLife', '');
        questionAdvance(q10);
    });

    eventHelper('10-very-important', 'click', () => {
        console.log('Remove cities with under 2 in nightlife.');
        awardPoints(2, 'nightLife', '');
        questionAdvance(q10);
    });
};

function eventHelper(sel, event, func) {
    let answer = document.getElementById(sel);
    answer.addEventListener(event, func);
};

// Grab city data from json and move into array
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
};

function normalizeSize() {
    // Find largest city size
    cityData.forEach(city => {
        let citySizeInt = parseInt(city.size.replace(/,/g, '')); // Remove commas from data

        if (citySizeInt > sizeMax || sizeMax === 0) {
            sizeMax = citySizeInt;
        }
    });

    // Find smallest city size
    cityData.forEach(city => {
        let citySizeInt = parseInt(city.size.replace(/,/g, '')); // Remove commas from data

        if (citySizeInt < sizeMin || sizeMin === 0) {
            sizeMin = citySizeInt;
        }
    });

    // Normalize city size
    cityData.forEach(city => {
        let citySizeInt = parseInt(city.size.replace(/,/g, '')); // Remove commas from data
        console.log(city.size)
        city.size = ((citySizeInt - sizeMin) / (sizeMax - sizeMin)).toFixed(3);
        console.log(city.size)
    });
};

function awardPoints(points, key, category, reversed) {
    cityData.forEach(city => {
        let value = category ? city[category][key] : city[key];
        if (reversed) {
            value = 1 - value;
        }
        city.points += value * points;

        if (value * points > 0) {
            console.log(`${city.name} was awarded ${value * points} points.`)
        }
    });
};

/**
 * This function will remove cities if the value comparison returns false
 * @param {string} key The key in the cities.json to target
 * @param {string} [category] The category to target if the key is in a category
 * @param {string} valueMatch Every city that does not match this value is removed
 * @param {string} comparisonOperator The function will use this to compare the values.
 */
function removeCity(key, category, valueMatch, comparisonOperator) {
    cityData.forEach(city => {
        let value = category ? city[category][key] : city[key];
        let comparisonResult;

        if (typeof value === 'string') {
            if (comparisonOperator === '==' || comparisonOperator === '!=' || comparisonOperator === '===' || comparisonOperator === '!==') {

            }
            else {
                console.error(`Unsupported comparison operator for comparing strings: ${comparisonOperator}`);
                return;
            }
        } 

        switch (comparisonOperator) {
            case '>':
                comparisonResult = value > valueMatch;
                if (!comparisonResult) {
                    console.log(`${city.name} is not greater than ${valueMatch} in ${key}. Removing ${city.name}.`);
                    city.removed = true;
                }
                break;
            case '>=':
                comparisonResult = value >= valueMatch;
                if (!comparisonResult) {
                    console.log(`${city.name} is not greater than or equal to ${valueMatch} in ${key}. Removing ${city.name}.`);
                    city.removed = true;
                }
                break;
            case '<':
                comparisonResult = value < valueMatch;
                if (!comparisonResult) {
                    console.log(`${city.name} is greater than ${valueMatch} in ${key}. Removing ${city.name}.`);
                    city.removed = true;
                }
                break;
            case '<=':
                comparisonResult = value <= valueMatch;
                if (!comparisonResult) {
                    console.log(`${city.name} is greater than or equal to ${valueMatch} in ${key}. Removing ${city.name}.`);
                    city.removed = true;
                }
                break;
            case '==':
            case '===':
                comparisonResult = value == valueMatch;
                if (!comparisonResult) {
                    console.log(`${city.name} is not equal to ${valueMatch} in ${key}. Removing ${city.name}.`);
                    city.removed = true;
                }
                break;
            case '!=':
            case '!==':
                comparisonResult = value != valueMatch;
                if (!comparisonResult) {
                    console.log(`${city.name} is equal to ${valueMatch} in ${key}. Removing ${city.name}.`);
                    city.removed = true;
                }
                break;
            default:
                console.error(`Unsupported comparison operator: ${comparisonOperator}`);
                return;
        };
    });
};

function questionAdvance(currentQuestion, nextQuestion) {
    currentQuestion.style.display = 'none';

    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    }
    else {
        console.log('Quiz Finished');

        cityData.forEach(city => {
            console.log(`${city.name} got ${city.points} points.`)
        });
    }
};

// Dont refrence DOM elements before it has loaded
document.addEventListener("DOMContentLoaded", createQuiz);