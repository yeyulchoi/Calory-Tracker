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
        this._displayNewMeal(meal);
        this._render();
    }
    addWorkout(workout){
        this._workouts.push(workout)
        this._totalCalories -=workout.calories;
        this._displayNewWorkout(workout);
        this._render();

    }

// remove meals
    removeMeal(id){
        const index = this._meals.findIndex((meal)=>meal.id===id);
        
        if(index !== -1){
            const meal = this._meals[index];
            this._totalCalories -=meal.calories;
            this._meals.splice(index,1);
            this._render();
        }
        
    }
    // remove workout
    removeWorkout(id){
        const index = this._workouts.findIndex((workout)=>workout.id===id);
        
        if(index !== -1){
            const workout = this._workouts[index];
            this._totalCalories -=workout.calories;
            this._workouts.splice(index,1);
            this._render();
        }
        
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

    _displayNewMeal(meal){
        const mealsEl= document.getElementById('meal-items');
        const mealEl= document.createElement('div')
        mealEl.classList.add('card','my-2')
        mealEl.setAttribute('data-id',meal.id) //setattribute is set to delete item later. also, the id attribute should be set 'data-x' by convention.
        mealEl.innerHTML =`
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                  ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>                
              </div>
        `
        mealsEl.appendChild(mealEl)

    }
    _displayNewWorkout(workout){
        const workoutsEl= document.getElementById('workout-items');
        const workoutEl= document.createElement('div')
        workoutEl.classList.add('card','my-3')
        workoutEl.setAttribute('data-id',workout.id) //setattribute is set to delete item later. also, the id attribute should be set 'data-x' by convention.
        workoutEl.innerHTML =`
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                  ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
        `
        workoutsEl.appendChild(workoutEl)

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




class App{
    constructor(){
        this._tracker=new CalorieTracker();

        document.getElementById('meal-form').addEventListener('submit',this._newItem.bind(this,'meal'))
        document.getElementById('workout-form').addEventListener('submit',this._newItem.bind(this,'workout'))
        document.getElementById('meal-items').addEventListener('click',this._deleteItem.bind(this,'meal'));
        document.getElementById('workout-items').addEventListener('click',this._deleteItem.bind(this,'workout'));
        document.getElementById('filter-meals').addEventListener('keyup',this._filterItems.bind(this, 'meal'))
        document.getElementById('filter-workouts').addEventListener('keyup',this._filterItems.bind(this, 'workout'))

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

    _deleteItem(type,e){
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark') ){
            if(confirm('are you sure?')){
                const id = e.target.closest('.card').getAttribute('data-id');
                console.log(id);

                type==='meal'? this._tracker.removeMeal(id):this._tracker.removeWorkout(id);

                e.target.closest('.card').remove();
            }
        }
       
    }

    _filterItems(type,e){
        const text=e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach(item=>{
       
            const name =item.firstElementChild.firstElementChild.firstElementChild.textContent;

            if(name.toLowerCase().indexOf(text) !==-1){
                item.style.display='block';
            }else{
                item.style.display='none';
            }
        })
       
      
    }
}

 const app= new App();