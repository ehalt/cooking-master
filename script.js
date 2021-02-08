// =========> All elements <=========
const searchBtn = document.getElementById('serch-button');
const mealList = document.getElementById('meals');
let notFound = document.querySelector('.cant-found');
let ingredientArea = document.getElementById('area-of-card')


// ============> SEarch button event <================
searchBtn.addEventListener('click',()=>{
    getMealList();
})


// =============> Meal list <================
const getMealList = ()=>{
    let meal = '';
    let inputValue = document.getElementById('input-field').value ;
   if(inputValue === ''){
       alert('Please fill up the search bar and find your meal here :D')
   }else{
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${inputValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.meals){
            showMealList(data, meal);
            notFound.style.display = 'none';
        }
        else{
            meal = `Sorry dude! Can't find any meal with the name ${inputValue}`
            notFound.innerHTML = meal ;
            notFound.style.display = 'block';
        }
    })
    let input = document.getElementById('input-field');
    input.value = '';
   }
}


// ==========> Show meal list <============
const showMealList = (mealItems, meal)=>{
    console.log(mealItems);
 
    mealItems.meals.forEach((mealItem)=>{
        meal += `
        <div onClick='getMealRecipe("${mealItem.idMeal}")' class='meal-items'>
            <img src="${mealItem.strMealThumb}"/>
            <h4>${mealItem.strMeal}</h4>
            
        </div>
        `
    })
    mealList.innerHTML = meal ;
}


// ===========> Meal recipe <===============
const getMealRecipe = (id)=>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` ;
    fetch(url)
    .then(res => res.json())
    .then(data => getIngredients(data))
}


// =============> to get ingredients <================
const getIngredients = (mealData)=>{
    const meal = mealData.meals[0];
    // ===========> destructuring <================
    const {strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strIngredient10,
        strIngredient12,strIngredient13,strIngredient14,strIngredient15,strIngredient16,strIngredient17,strIngredient18,strIngredient19,strIngredient20
    } = meal ;

    // ==============> all ingredients in an array <=================
    const ingredients = [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strIngredient10,
        strIngredient12,strIngredient13,strIngredient14,strIngredient15,strIngredient16,strIngredient17,strIngredient18,strIngredient19,strIngredient20];
    
    generateIngredients(ingredients, meal);
}


// =============> To display ingredients <===============
const generateIngredients = (ingredients, meal)=>{
    const newIngredients = [];
    ingredients.forEach((item) => {
        if(item !== ""){
            newIngredients.push(item);
        }
    });
    let ingredientsAndIcon = '';
    newIngredients.map((item) => {
        ingredientsAndIcon += `
        <div class="display-flex">
         <i class="fas fa-arrow-circle-right"></i>
        <h5>${item}</h5>
        </div>
        `
    });

    displayData(meal,ingredientsAndIcon);
}


// ============> to display data <=================
const displayData  = (meal, ingredientsAndIcon)=>{
    let data = `
    <div class="card">
    <img src="${meal.strMealThumb}" alt="">
        <div class="card-info">
        <h3>${meal.strMeal}</h3>
        <p>Ingredients</p>
        <div class='ingredients-group'>${ingredientsAndIcon}</div>
        </div>
    </div>
    `
    ingredientArea.innerHTML = data ;
}


// =====================> The end <=============================