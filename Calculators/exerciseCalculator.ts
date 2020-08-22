interface ValuesExercise {
    valueTarget: number;
    valueArray: Array<number>;
}

const parseWeightArguments = (args: Array<string>): ValuesExercise => {
    if (args.length < 12) throw new Error('Not enough arguments');
    if (args.length > 12) throw new Error('Too many arguments');

    const values = [];

    for (let i = 3; i < args.length; i++) {
        values.push(Number(args[i]));
    }

    for (let i = 0; i < values.length; i++) {
        if (isNaN(Number(values[i]))) {
            throw new Error('Provided values were not numbers');
        }
    }


    if (isNaN(Number(args[3]))) {
        throw new Error('Provided values were not numbers!');
    }


    return {
        valueTarget: Number(args[2]),
        valueArray: values

    };


};

interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}




export const calculateExercises = (target: number, days: Array<number>): Results => {
    const trainedDays = [];
    for (let i = 0; i < days.length; i++) {
        if (days[i] !== 0) {
            trainedDays.push(days[i]);
        }
    }

    let sumOfDays = 0;

    for (let i = 0; i < trainedDays.length; i++) {
        sumOfDays += trainedDays[i];
    }
    const calculatedAverage = sumOfDays / days.length;

    let targetReached;

    if (calculatedAverage >= target) {
        targetReached = true;
    } else {
        targetReached = false;
    }

    let rated;
    let ratedDescription;

    if (calculatedAverage < target) {
        rated = 1;
        ratedDescription = 'bad, could improve';
    } else if (calculatedAverage === target) {
        rated = 2;
        ratedDescription = 'not too bad but could be better';
    } else if (calculatedAverage > target) {
        rated = 3;
        ratedDescription = 'great! keep it up';
    }



    return {
        periodLength: days.length,
        trainingDays: trainedDays.length,
        success: targetReached,
        rating: Number(rated),
        ratingDescription: String(ratedDescription),
        target: target,
        average: calculatedAverage
    };

};


if(process.argv.length > 2){
    try {
        const { valueTarget, valueArray } = parseWeightArguments(process.argv);
        console.log(calculateExercises(valueTarget, valueArray));
    } catch (e) {
    
        console.log('Error, something bad happened, message: ', e.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    }
    
}

