function addIngredient(){
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")
  
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
  
    if (newField.children[0].value == "") return false
  
    newField.children[0].value = ""
    ingredients.appendChild(newField)
  }

function addStep(){ 
    const steps = document.querySelector("#steps")
    let fieldStep = document.querySelectorAll(".step")

    if(!fieldStep){
      fieldStep = document.createElement('div')
      let input = document.createElement('input')
      fieldStep.classList.add('step')
      fieldStep.appendChild(input)
    }
    
    const newFieldStep = fieldStep[fieldStep.length -1].cloneNode(true)

    if(newFieldStep.children[0].value == "") return false

    newFieldStep.children[0].value = ""
    steps.appendChild(newFieldStep)
}
