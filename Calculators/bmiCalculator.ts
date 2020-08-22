interface Values {
    value1: number;
    value2: number;
  }

interface Answer {
    weight: number;
    height: number;
    bmi: string;
}

  
const parseArguments = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

export const bmiCalculator = (bm: number, bh: number) : Answer => {
    const health = bm / Math.sqrt(bh);


    if(health < 18.5){
        return {
          weight: bm,
          height: bh,
          bmi: 'Underweight'
        };
    } else if(health >= 18.5 && health <= 25){
        return {
          weight: bm,
          height: bh,
          bmi: 'Normal(healthy weight)'
        };
    } else if(health >= 25 && health <= 30){
        return {
          weight: bm,
          height: bh,
          bmi: 'Overweight'
        };
    } else{
        return {
          weight: bm,
          height: bh,
          bmi: 'Obese'
        };
    }

 
};
if(process.argv.length > 2){
  try {
    const { value1, value2 } = parseArguments(process.argv);
    const result = bmiCalculator(value1, value2);
    console.log(result.bmi);
} catch(e) {
    console.log('Error, something bad happened, message: ', e.message); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
}
}
