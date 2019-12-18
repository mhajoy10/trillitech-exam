let specialData;
const fetchDataSpecials = async () => {
    const response = await fetch('http://localhost:3001/specials');
    specialData = await response.json(); 
    console.log("specials", specialData);
    // do something with myJson
}

const fetchDataRecipes = async () => {
    const response = await fetch('http://localhost:3001/recipes');
    const myJson = await response.json(); 
    console.log("recipe", myJson);

    let title, description, images, servings, prepTime, cookTime, ingredients, measurement, name, amount, ingredientId, uuid, type, text, specialTitle;
    let detail, ingrDetail = [], specialDataText = [];
    let recItem = $("#recipeItem");
    let recDetail = $("#recipeDetail");
    
    let url = window.location.href;
    let str = url.substring(url.lastIndexOf("?")+1);
    $.each(myJson, function(i, item) {
        title = item.title;
        images = item.images.full.substr(1);
        description = item.description;
        servings = item.servings;
        prepTime = item.prepTime;
        cookTime = item.cookTime;
        ingredients = item.ingredients;
        
        if (i == str){

            $.each(ingredients, function(i, item) {
                uuid = item.uuid;
                measurement = item.measurement;
                name = item.name;
                amount = item.amount;
                
                ingrDetail.push('<ul class="ingr-detail" data-id="'+uuid+'">'
                + ' <li><p>'+name+'</p>'
                + '<p>measurement: '+amount+''+measurement+'</p> </li>'
                + '</ul>');


            });

            console.log("ingrDetail", specialDataText);
            detail = '<p class="title">'+title+'</p>'
            + '<img src='+images+'>'
            + '<p><strong>Description: </strong>'+description+'</p>'
            + '<p><strong>Servings: </strong>'+servings+'</p>'
            + '<p><strong>Preparation Time: </strong>'+prepTime+'</p>'
            + '<p><strong>Cooking Time: </strong>'+cookTime+'</p>'
            + '<p><strong>Ingredients: </strong>'+ingrDetail.join(' ')+'</p>';
            

            recDetail.append(detail);
        }
        detail = '<a href="recipe.html?'+i+'" target="_blank"><div class="recipe-item"><img src='+images+'><p>'+title+'</p></div></a>';
        recItem.append(detail);
    });
            
    $(".ingr-detail").each(function(){
        var $this = $(this);
        var $id = $this.attr("data-id");
        $.each(specialData, function(i, item) {
            ingredientId = item.ingredientId;
            text = item.text;
            type = item.type;
            specialTitle = item.title;
            if ($id === ingredientId){
                $this.find("li > p:first-child").append('<ul class="special-text" data-id='+ingredientId+'>'
                + '<li> '+specialTitle+'</li>'
                + '<li> '+type+'</li>'
                + '<li> '+text+'</li>'
                + '</ul')
            }
        });
    
    });
    
}

fetchDataSpecials();
fetchDataRecipes();