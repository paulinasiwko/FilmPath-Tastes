const foodAppID = "c2f96cfc";
const foodApiKey = "ae1a63d9274452ced8ffd14d5a60ba49";


function getFood(cityName) {

    const queryURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${cityName}&app_id=${foodAppID}&app_key=${foodApiKey}`;
    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        displayRecipe(data);
    })

}

function displayRecipe(food) {

    if (food.hits && food.hits.length > 0) {
    const recipeName = food.hits[3].recipe.label;
    const image = food.hits[3].recipe.image;
    const recipeLink = food.hits[3].recipe.url;
    const cusineType = food.hits[3].recipe.cuisineType[0];
    const ingredients = food.hits[3].recipe.ingredientLines;

    const foodDiv = document.getElementById("food");

    foodDiv.innerHTML = `
        <h5 class="card-title">Food that pairs well with this city!</h5>
        <h5 class="foodTitle">${recipeName}</h5>
        <p><h6>Cusine type:</h6> ${cusineType}</p>
        <div class="food-container">
            <div>
                <img src="${image}" alt="${recipeName} photo" class="foodImg">
            </div>
            <div>
                <h6 class="shoppingList">Shopping list: </h6>
                <div id="list"></div>
                <a href="${recipeLink}" class="link">Click here to see full recipe.</a>
            </div>
        </div>
    `; 

    const listDiv = document.getElementById("list");

    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const ingredientEl = document.createElement("li");
        ingredientEl.textContent = ingredient;
        listDiv.append(ingredientEl);
    }
} else {

    const foodDiv = document.getElementById("food");

     foodDiv.innerHTML = `

     <h5 class="card-title">Food that goes with pair in the City!</h5>
     <h5 class="foodTitle">Pizza Margherita</h5>
     <p><h6>Cusine type:</h6> Italian</p>
     <div class="food-container">
        <img src="assets/img/pizza.png" alt="Pizza Margherita" class="pizzaImage">
         <div>
             <h6 class="shoppingList">Shopping list: </h6>
             <div id="list">
                <li>300g strong bread flour</li>
                <li>1 tsp istant yeast</li>
                <li>1 tsp salt</li>
                <li>1 tbsp olive oil</li>
                <li>100 ml passata</li>
                <li>fresh basil</li>
                <li>1 garlic glove</li>
                <li>125g ball mozzarella</li>
                <li>shaved parmesan</li>
                <li>handful of cherry tomatoes</li>    
             </div>
         </div>
     </div> `;
}
}
$(document).ready(function() {
    var params = new URLSearchParams(window.location.search);
    var city = params.get('city');
    getFood(city);
});