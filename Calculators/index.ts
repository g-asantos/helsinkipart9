
import express from 'express';
const app = express();
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'

app.use(express.json())


app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!');
});

app.get('/bmi', (req, res) => {
  const Weight = req.query.weight;
  const Height = req.query.height;

    if(Weight == null || Height == null){
      res.status(400).json({ error: "malformatted parameters" });
    } else {
      res.send(bmiCalculator(Number(Weight), Number(Height)));
    }


    
  
  
});


app.post('/exercises', (req,res) => {
  const exercises : Array<number> = req.body.daily_exercises
  const target : number = req.body.target
  console.log(typeof(exercises))
  console.log(typeof(target))

    if(!exercises || !target || exercises.length < 7){
      res.status(400).json({ error: "parameters missing" });
    } else if(typeof(exercises) !== 'object' || typeof(target) !== 'number'){
      res.status(400).json({ error: "malformatted parameters" });
    }else {
      res.send(calculateExercises(target, exercises));
    }  
  
});




const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});