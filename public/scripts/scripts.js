const recipes = document.querySelectorAll(".link-show")

for(let recipe of recipes){
    recipe.addEventListener("click", function(){
        const recipeId = recipe.getAttribute("id")

        window.location.href = `/receitas/${recipeId}`
    })
}

const ImageUpload = {
    input: "",
    fileImage: document.getElementById('file-image'),
    limit: 1,
    files: [],
    chef(event){
        const {files: fileList} = event.target
        ImageUpload.input = event.target

        Array.from(fileList).forEach(file => {
            ImageUpload.files.push(file)
            
            const reader = new FileReader()
    
            reader.onload = () =>{
                const input = document.createElement('input')
                input.value = String(reader.result)
    
                ImageUpload.fileImage.appendChild(input)
            }
    
            reader.readAsDataURL(file)
        })


    }
}