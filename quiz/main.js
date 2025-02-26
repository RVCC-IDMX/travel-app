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

const cityContainer = document.getElementById('city-container');
const questions = document.getElementById('questions');
const visualizer = document.getElementById('visualizer');

const smallPopulationNumber = 50000;
const weatherThreshold = 2;
const environmentThreshold = 2;
const attractionThreshold = 2;
const shoppingThreshold = 2;
const nightlifeThreshold = 3;

let smallCityThreshold = 0;
let sizeMax = 0;
let sizeMin = 0;

let cityData = [];

async function createQuiz() {
    await getCityData();

    normalizeSize();

    visualizeData();

    printCityElements();

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
        console.log('Remove small cities, +2 Points for big cities');
        removeCity('size', '', smallCityThreshold, '>');
        awardPoints(2, 'size', '');
        questionAdvance(q2, q3);
    });

    eventHelper('3-warm', 'click', () => {
        console.log('Remove non-warm cities.');
        removeCity('hot', 'weather', weatherThreshold, '>=');
        awardPoints(1, 'hot', 'weather');
        questionAdvance(q3, q4);
    });

    eventHelper('3-cold', 'click', () => {
        console.log('Remove non-cold cities.');
        removeCity('cold', 'weather', weatherThreshold, '>=');
        awardPoints(1, 'cold', 'weather');
        questionAdvance(q3, q4);
    });

    eventHelper('3-wet', 'click', () => {
        console.log('Remove non-wet cities.');
        removeCity('wet', 'weather', weatherThreshold, '>=');
        awardPoints(1, 'wet', 'weather');
        questionAdvance(q3, q4);
    });

    eventHelper('3-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q3, q4);
    });

    eventHelper('4-cozy', 'click', () => {
        console.log('Remove big cities, +2 Points for small cities.');
        removeCity('size', '', smallCityThreshold, '<');
        awardPoints(2, 'size', '', true);
        questionAdvance(q4, q5);
    });

    eventHelper('4-bustling', 'click', () => {
        console.log('Remove small cities, +2 Points for big cities.');
        removeCity('size', '', smallCityThreshold, '>');
        awardPoints(2, 'size', '');
        questionAdvance(q4, q5);
    });

    eventHelper('4-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q4, q5);
    });

    eventHelper('5-jungle', 'click', () => {
        console.log('Remove cities where jungle does not meet enviorment threshold, +1 point for jungle');
        removeCity('jungle', 'environment', weatherThreshold, '>=');
        awardPoints(1, 'jungle', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-forest', 'click', () => {
        console.log('Remove cities where forests does not meet enviorment threshold, +1 point for forests');
        removeCity('forests', 'environment', weatherThreshold, '>=');
        awardPoints(1, 'forests', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-desert', 'click', () => {
        console.log('Remove cities where desert does not meet enviorment threshold, +1 point for desert');
        removeCity('desert', 'environment', weatherThreshold, '>=');
        awardPoints(1, 'desert', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-coastal', 'click', () => {
        console.log('Remove cities where coast does not meet enviorment threshold, +1 point for coast');
        removeCity('coast', 'environment', weatherThreshold, '>=');
        awardPoints(1, 'coast', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-mountains', 'click', () => {
        console.log('Remove cities where mountains does not meet enviorment threshold, +1 point for mountains');
        removeCity('mountains', 'environment', weatherThreshold, '>=');
        awardPoints(1, 'mountains', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-cityscape', 'click', () => {
        console.log('Remove cities where cityscape does not meet enviorment threshold, +1 point for cityscape');
        removeCity('cityscape', 'environment', weatherThreshold, '>=');
        awardPoints(1, 'cityscape', 'environment');
        questionAdvance(q5, q6);
    });

    eventHelper('5-no-pref', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q5, q6);
    });

    eventHelper('6-fine', 'click', () => {
        console.log('+1 Point for fine food.');
        awardPoints(1, 'foodFine', 'food');
        questionAdvance(q6, q7);
    });

    eventHelper('6-casual', 'click', () => {
        console.log('+1 Point for casual food.');
        awardPoints(1, 'foodCasual', 'food');
        questionAdvance(q6, q7);
    });

    eventHelper('7-yes', 'click', () => {
        console.log('Remove cities where shopping does not meet shopping threshold, +1 point for shopping');
        removeCity('shopping', '', shoppingThreshold, '>=');
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
        console.log('Remove cities where naturalWonder does not meet attraction threshold, +1 point for naturalWonder');
        removeCity('naturalWonder', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'naturalWonder', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-monument', 'click', () => {
        console.log('Remove cities where monument does not meet attraction threshold, +1 point for monument');
        removeCity('monument', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'monument', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-historic-site', 'click', () => {
        console.log('Remove cities where historicSite does not meet attraction threshold, +1 point for historicSite');
        removeCity('historicSite', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'historicSite', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-religious-site', 'click', () => {
        console.log('Remove cities where religious does not meet attraction threshold, +1 point for religious');
        removeCity('religious', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'religious', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-museum', 'click', () => {
        console.log('Remove cities where museum does not meet attraction threshold, +1 point for museum');
        removeCity('museum', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'museum', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-stadium', 'click', () => {
        console.log('Remove cities where stadium does not meet attraction threshold, +1 point for stadium');
        removeCity('stadium', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'stadium', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9a-theatre', 'click', () => {
        console.log('Remove cities where theatre does not meet attraction threshold, +1 point for theatre');
        removeCity('theatre', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'theatre', 'attraction');
        questionAdvance(q9a, q10);
    });

    eventHelper('9b-natural-wonder', 'click', () => {
        console.log('Remove cities where naturalWonder does not meet attraction threshold, +1 point for naturalWonder');
        removeCity('naturalWonder', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'naturalWonder', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-aquarium', 'click', () => {
        console.log('Remove cities where aquarium does not meet attraction threshold, +1 point for aquarium');
        removeCity('aquarium', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'aquarium', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-amusement-park', 'click', () => {
        console.log('Remove cities where amusementPark does not meet attraction threshold, +1 point for amusementPark');
        removeCity('amusementPark', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'amusementPark', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-zoo', 'click', () => {
        console.log('Remove cities where zoo does not meet attraction threshold, +1 point for zoo');
        removeCity('zoo', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'zoo', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-museum', 'click', () => {
        console.log('Remove cities where museum does not meet attraction threshold, +1 point for museum');
        removeCity('museum', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'museum', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-stadium', 'click', () => {
        console.log('Remove cities where stadium does not meet attraction threshold, +1 point for stadium');
        removeCity('stadium', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'stadium', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('9b-theatre', 'click', () => {
        console.log('Remove cities where theatre does not meet attraction threshold, +1 point for theatre');
        removeCity('theatre', 'attraction', attractionThreshold, '>=');
        awardPoints(1, 'theatre', 'attraction');
        questionAdvance(q9b);
    });

    eventHelper('10-not-important', 'click', () => {
        console.log('Do nothing.');
        questionAdvance(q10);
    });

    eventHelper('10-somewhat-important', 'click', () => {
        console.log('Remove cities where nightLife does not meet nightLife threshold - 1, +1 point for nightLife.');
        awardPoints(1, 'nightLife', '');
        removeCity('nightlife', '', (nightlifeThreshold - 1), '>=');
        questionAdvance(q10);
    });

    eventHelper('10-very-important', 'click', () => {
        console.log('Remove cities where nightLife does not meet nightLife threshold, +2 point for nightLife.');
        removeCity('nightlife', '', (nightlifeThreshold), '>=');
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
        console.log(`${city.name} population ${city.size}`)
        city.size = parseFloat(((citySizeInt - sizeMin) / (sizeMax - sizeMin)).toFixed(3));
        console.log(`${city.name} population normalized: ${city.size}`)
    });

    smallCityThreshold = parseFloat((smallPopulationNumber - sizeMin) / (sizeMax - sizeMin));
};

/**
 * This function will award points to a certain key for each city 
 * @param {number} points The number of points to award
 * @param {string} key The key in the cities.json to target
 * @param {string} category The category to target if the key is in a category
 * @param {boolean} reversed If true, award more points to cities with a lower number in the key
 */
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
        endQuiz();
    }

    printCityElements();
};

function printCityElements() {
    let cityElements = document.getElementsByClassName('city');

    for (var i = cityElements.length - 1; i >= 0; --i) {
        cityElements[i].remove();
    }

    let sortedCities = cityData
        .sort((a, b) => b.points - a.points);

    sortedCities.forEach(city => {
        let cityElement = document.createElement('p');

        cityElement.innerHTML = `${city.name} | ${city.points.toFixed(2)} | ${city.removed}`;
        cityElement.className = 'city';
        cityElement.style.textAlign = 'center';

        cityContainer.appendChild(cityElement);
    });
};

function endQuiz() {
    questions.remove();
};

// There has got to be a better way to do this
function visualizeData() {
    let usCityCount = 0;

    let smallCityCount = 0;

    let coldCityCount = 0;
    let hotCityCount = 0;
    let wetCityCount = 0;

    let mountainsCityCount = 0;
    let forestsCityCount = 0;
    let coastCityCount = 0;
    let desertCityCount = 0;
    let cityscapeCityCount = 0;
    let jungleCityCount = 0;

    let amusementParkCityCount = 0;
    let zooCityCount = 0;
    let aquariumCityCount = 0;
    let museumCityCount = 0;
    let monumentCityCount = 0;
    let theaterCityCount = 0;
    let historicSiteCityCount = 0;
    let stadiumCityCount = 0;
    let religiousCityCount = 0;
    let naturalWonderCityCount = 0;

    let goodNightlifeCityCount = 0;
    let greatNightlifeCityCount = 0;

    let shoppingCityCount = 0;

    cityData.forEach(city => {
        if (city.location.country === 'USA') usCityCount++;

        if (city.size < smallCityThreshold) smallCityCount++;

        if (city.weather.cold >= weatherThreshold) coldCityCount++;
        if (city.weather.hot >= weatherThreshold) hotCityCount++;
        if (city.weather.wet >= weatherThreshold) wetCityCount++;

        if (city.environment.mountains >= environmentThreshold) mountainsCityCount++;
        if (city.environment.forests >= environmentThreshold) forestsCityCount++;
        if (city.environment.coast >= environmentThreshold) coastCityCount++;
        if (city.environment.desert >= environmentThreshold) desertCityCount++;
        if (city.environment.cityscape >= environmentThreshold) cityscapeCityCount++;
        if (city.environment.jungle >= environmentThreshold) jungleCityCount++;

        if (city.attraction.amusementPark >= attractionThreshold) amusementParkCityCount++;
        if (city.attraction.zoo >= attractionThreshold) zooCityCount++;
        if (city.attraction.aquarium >= attractionThreshold) aquariumCityCount++;
        if (city.attraction.museum >= attractionThreshold) museumCityCount++;
        if (city.attraction.monument >= attractionThreshold) monumentCityCount++;
        if (city.attraction.theater >= attractionThreshold) theaterCityCount++;
        if (city.attraction.historicSite >= attractionThreshold) historicSiteCityCount++;
        if (city.attraction.stadium >= attractionThreshold) stadiumCityCount++;
        if (city.attraction.religious >= attractionThreshold) religiousCityCount++;
        if (city.attraction.naturalWonder >= attractionThreshold) naturalWonderCityCount++;

        if (city.attraction.naturalWonder >= nightlifeThreshold - 1 && city.attraction.naturalWonder < nightlifeThreshold) goodNightlifeCityCount++;
        if (city.attraction.naturalWonder >= nightlifeThreshold) greatNightlifeCityCount++;

        if (city.shopping >= shoppingThreshold) shoppingCityCount++;
    });

    document.getElementById('us-city-percent').innerHTML = visualizerGetPercentage(usCityCount);

    document.getElementById('small-city-percent').innerHTML = visualizerGetPercentage(smallCityCount);

    document.getElementById('cold-city-percent').innerHTML = `Cold: ${visualizerGetPercentage(coldCityCount)}% | ${coldCityCount} cities`;
    document.getElementById('hot-city-percent').innerHTML = `Hot: ${visualizerGetPercentage(hotCityCount)}% | ${hotCityCount} cities`;
    document.getElementById('wet-city-percent').innerHTML = `Wet: ${visualizerGetPercentage(wetCityCount)}% | ${wetCityCount} cities`;

    document.getElementById('mountains-city-percent').innerHTML = `Mountains: ${visualizerGetPercentage(mountainsCityCount)}% | ${mountainsCityCount} cities`;
    document.getElementById('forests-city-percent').innerHTML = `Forests: ${visualizerGetPercentage(forestsCityCount)}% | ${forestsCityCount} cities`;
    document.getElementById('coast-city-percent').innerHTML = `Coast: ${visualizerGetPercentage(coastCityCount)}% | ${coastCityCount} cities`;
    document.getElementById('desert-city-percent').innerHTML = `Desert: ${visualizerGetPercentage(desertCityCount)}% | ${desertCityCount} cities`;
    document.getElementById('cityscape-city-percent').innerHTML = `Cityscape: ${visualizerGetPercentage(cityscapeCityCount)}% | ${cityscapeCityCount} cities`;
    document.getElementById('jungle-city-percent').innerHTML = `Jungle: ${visualizerGetPercentage(jungleCityCount)}% | ${jungleCityCount} cities`;

    document.getElementById('amusement-park-city-percent').innerHTML = `Amusement Park: ${visualizerGetPercentage(amusementParkCityCount)}% | ${amusementParkCityCount} cities`;
    document.getElementById('zoo-city-percent').innerHTML = `Zoo: ${visualizerGetPercentage(zooCityCount)}% | ${zooCityCount} cities`;
    document.getElementById('aquarium-city-percent').innerHTML = `Aquarium: ${visualizerGetPercentage(aquariumCityCount)}% | ${aquariumCityCount} cities`;
    document.getElementById('museum-city-percent').innerHTML = `Museum: ${visualizerGetPercentage(museumCityCount)}% | ${museumCityCount} cities`;
    document.getElementById('monument-city-percent').innerHTML = `Monument: ${visualizerGetPercentage(monumentCityCount)}% | ${monumentCityCount} cities`;
    document.getElementById('theater-city-percent').innerHTML = `Theater: ${visualizerGetPercentage(theaterCityCount)}% | ${theaterCityCount} cities`;
    document.getElementById('historic-site-city-percent').innerHTML = `Historic Site: ${visualizerGetPercentage(historicSiteCityCount)}% | ${historicSiteCityCount} cities`;
    document.getElementById('stadium-city-percent').innerHTML = `Stadium: ${visualizerGetPercentage(stadiumCityCount)}% | ${stadiumCityCount} cities`;
    document.getElementById('religious-city-percent').innerHTML = `Religious: ${visualizerGetPercentage(religiousCityCount)}% | ${religiousCityCount} cities`;
    document.getElementById('natural-wonder-city-percent').innerHTML = `NaturalWonder: ${visualizerGetPercentage(naturalWonderCityCount)}% | ${naturalWonderCityCount} cities`;

    document.getElementById('good-nightlife-city-percent').innerHTML = `Good Nightlife: ${visualizerGetPercentage(goodNightlifeCityCount)}% | ${goodNightlifeCityCount} cities`;
    document.getElementById('great-nightlife-city-percent').innerHTML = `Great Nightlife: ${visualizerGetPercentage(greatNightlifeCityCount)}% | ${greatNightlifeCityCount} cities`;

    document.getElementById('shopping-city-percent').innerHTML = `${visualizerGetPercentage(shoppingCityCount)}% | ${shoppingCityCount} cities`;
};

function visualizerGetPercentage(count) {
    let cityCount = cityData.length;

    return ((count / cityCount) * 100).toFixed(2);
}

// Dont refrence DOM elements before it has loaded
document.addEventListener("DOMContentLoaded", createQuiz);