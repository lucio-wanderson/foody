const hide1 = document.getElementById("1")
const hide2 = document.getElementById("2")
const hide3 = document.getElementById("3")

hide1.addEventListener("click", function () {
    const hideIngredient = document.getElementById("ingredientes")

    hideIngredient.classList.toggle("hidden")

    if(hide1.innerHTML == "ESCONDER"){
        hide1.innerHTML = "MOSTRAR"
    } else{
        hide1.innerHTML = "ESCONDER"
    }
    
})

hide2.addEventListener("click", function () {
    const hideIngredient = document.getElementById("preparation")

    hideIngredient.classList.toggle("hidden")

    if(hide2.innerHTML == "ESCONDER"){
        hide2.innerHTML = "MOSTRAR"
    } else{
        hide2.innerHTML = "ESCONDER"
    }
})

hide3.addEventListener("click", function () {
    const hideIngredient = document.getElementById("info")

    hideIngredient.classList.toggle("hidden")

    if(hide3.innerHTML == "ESCONDER"){
        hide3.innerHTML = "MOSTRAR"
    } else{
        hide3.innerHTML = "ESCONDER"
    }
})

function editPage(){
    const id = document.querySelector("div#top-show button.recipe-edit").getAttribute("id")
    window.location.href = `/admin/recipes/${id}/edit`
}