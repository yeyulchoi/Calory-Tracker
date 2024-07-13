class CalorieTracker{
    constructor(){
        this._calorieLimit =1000;
        this._totalCalories=0;
        this._meals=[];
        this._workouts=[];

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

    }


        //public Methods/API

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalories +=meal.calories;
        this._render();
    }
    addWorkout(workout){
        this._workouts.push(workout)
        this._totalCalories -=workout.calories;
        this._displayCaloriesTotal();
        this._render();

    }

    //private method

    _displayCaloriesTotal(){
        const totalCaloriesEl=document.getElementById('calories-total');
        totalCaloriesEl.innerHTML=this._totalCalories;
    }

    _displayCaloriesLimit(){
        const caloriesLimitEl=document.getElementById('calories-limit');
        caloriesLimitEl.innerHTML=this._calorieLimit;
    }
    _displayCaloriesConsumed(){
        const caloriesConsumedEl=document.getElementById('calories-consumed');
        caloriesConsumedEl.innerHTML=this._meals.reduce((total,meal)=>total+meal.calories,0)
    }
    _displayCaloriesBurned(){
        const caloriesBurnedEl=document.getElementById('calories-burned');
        caloriesBurnedEl.innerHTML=this._workouts.reduce((total,workout)=>total+workout.calories,0)
    }

    _displayCaloriesRemaining(){
        const progressEl=document.getElementById('calorie-progress');
        const caloriesRemainingEl= document.getElementById('calories-remaining');
        const remaining =this._calorieLimit-this._totalCalories;
        if(remaining<=0){
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
            // progressEl.classList.remove('bg-success');
            progressEl.classList.add('bg-danger');
        }else{
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
            // caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            // progressEl.classList.add('bg-success');  
            progressEl.classList.remove('bg-danger');
        }
        
        caloriesRemainingEl.innerHTML=remaining;
    } 

    _displayCaloriesProgress(){
        const progressEl=document.getElementById('calorie-progress');
        const percentage = (this._totalCalories/this._calorieLimit)*100;
        const width=Math.min(percentage,100);
        progressEl.style.width=`${width}%`;
    }

    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}



class Meal{
    constructor(name, calories){
        this.id= Math.random().toString(16).slice(2);
        this.name=name;
        this.calories=calories;
        }   
    }
class Workout{
    constructor(name, calories){
        this.id= Math.random().toString(16).slice(2);
        this.name=name;
        this.calories=calories;
    }
}


const m = new Meal('breakfast',100)
const w= new Workout('running',10)

const ct =new CalorieTracker()
ct.addMeal(m)
ct.addWorkout(w)

class App{
    constructor(){
        this._tracker=new CalorieTracker();

        document.getElementById('meal-form').addEventListener('submit',this._newItem.bind(this,'meal'))
        document.getElementById('workout-form').addEventListener('submit',this._newItem.bind(this,'workout'))

        

    }
    _newItem(type,e){
        e.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        //validate inputs

        if(name.value==="" || calories===""){
            alert('Please fill in the blank.');
            return;
        }

        if(type==='meal'){
            const meal= new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);

        }else{
            const workout= new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
      
        }
              
        name.value="";
        calories.value="";
      

        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseItem,{
            toggle:true
        })
    }

    // _newWorkout(e){
    //     e.preventDefault();
    //     const name = document.getElementById('workout-name');
    //     const calories = document.getElementById('workout-calories');

    //     //validate inputs

    //     if(name.value==="" || calories===""){
    //         alert('Please fill in the blank.');
    //         return;
    //     }

    //     const workout= new Workout(name.value, +calories.value);
    //     this._tracker.addWorkout(workout);
        
    //     name.value="";
    //     calories.value="";

    //     const collapseWorkout = document.getElementById('collapse-workout');
    //     const bsCollapse = new bootstrap.Collapse(collapseWorkout,{
    //         toggle:true
    //     })
    // }
}

 const app= new App();