// TASK 1: VAR AND SCOPE

// assignments is an array of objects with id, grade, and daysLate
function summarizeGrades(assignments) {
    let sum = 0; // let because we add to it in the loop
    const count = assignments.length; // const because the array length doesn't change

    const LATE_PENALTY_PER_DAY = 20;

    // declaring this outside the loop so lastGraded can still access it at the very end
    let assignment;

    for (let i = 0; i < count; i++) {
        assignment = assignments[i];
        
        // grade might change if there's a penalty, so we use let
        let grade = assignment.grade;

        if (assignment.daysLate > 0) {
            const latePenalty = assignment.daysLate * LATE_PENALTY_PER_DAY;
            // making sure the grade doesn't drop below 0
            grade = grade - latePenalty >= 0 ? grade - latePenalty : 0;
        }
        sum += grade;
    }

    const lastGraded = assignment;
    return { average: sum / count, lastGraded: lastGraded.id };
}


// TASK 2: CLOSURES

// letter is a single string character, ignoreCapitalization is a boolean (true/false)
let letterCounter = function (letter, ignoreCapitalization) {
    
    // converting the target letter right away if needed so we don't have to do it repeatedly
    let targetLetter = ignoreCapitalization ? letter.toLowerCase() : letter;

    // word is the string we are counting letters in
    return function(word) {
        let count = 0;
        for (let i = 0; i < word.length; i++) {
            let currentLetter = ignoreCapitalization ? word[i].toLowerCase() : word[i];
            if (currentLetter === targetLetter) {
                count++;
            }
        }
        return count;
    };
};


// characterName is just a string
function makeCharacter(characterName) {
    
    // keeping these inside the closure so they can't be messed with directly from the outside
    let farmingSkill = 0;
    let fishingSkill = 0;

    // skill must be exactly "farming" or "fishing"
    let levelUp = function (skill) {
        if (skill === "farming" && farmingSkill < 10) {
            farmingSkill++;
        } else if (skill === "fishing" && fishingSkill < 10) {
            fishingSkill++;
        }
    };

    // skill must be exactly "farming" or "fishing"
    let showSkill = function (skill) {
        if (skill === "farming") {
            return farmingSkill;
        } else if (skill === "fishing") {
            return fishingSkill;
        }
    };

    return {
        name: characterName,
        levelUp,
        showSkill
    };
}