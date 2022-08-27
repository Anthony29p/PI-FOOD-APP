const axios = require('axios'); 

function onSearch(){
  const API_KEY=['bae6205bd8ea442fb0f34ea675b1b60d','131a106a68524e8d8d477a9a1346d445','14e20a2e077849409c7b75f3c14591cb','60cb8ed7d9584e62b394f806ddc83004','23b8144fff904deb9df08680579efcc0'];

  axios.get(`https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=${API_KEY[0]}`)
  .then(r => console.log(r.data))
  // .then(r => r.data)
  // .then(r =>r.results[0])
  // .then(r => {
  //   const comida = {
  //     name : r.title,
  //     image : r.image
  //   };
  // })
}


function onSearch2(){
  const API_KEY=['bae6205bd8ea442fb0f34ea675b1b60d','131a106a68524e8d8d477a9a1346d445','14e20a2e077849409c7b75f3c14591cb','60cb8ed7d9584e62b394f806ddc83004','23b8144fff904deb9df08680579efcc0'];

  axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${API_KEY[0]}`)
  .then(r => r.data)
  .then(r => r.results)
  .then(r => r.map(e => {
    return {
        id : e.id,
        name : e.title,
        description : e.summary,
        healthScore : e.healthScore,
        image : e.image,
        howToDo : e.analyzedInstructions[0] && e.analyzedInstructions[0].steps? e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):'',
        diets : e.diets
    }
}))
  .then(r => console.log(r))
  // .then(r => r.data)
  // .then(r =>r.results[0])
  // .then(r => {
  //   const comida = {
  //     name : r.title,
  //     image : r.image
  //   };
  // })
}
// onSearch()
onSearch2()
// https://api.spoonacular.com/recipes/716429/information&bae6205bd8ea442fb0f34ea675b1b60d