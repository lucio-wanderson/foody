const currentPage = location.pathname
const menuItems = document.querySelectorAll(".header_card .menu a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

const recipes = document.querySelectorAll(".link-show")

for(let recipe of recipes){
    recipe.addEventListener("click", function(){
        const recipeId = recipe.getAttribute("id")

        window.location.href = `/receitas/${recipeId}`
    })
}

chefImage()
function chefImage(){
    let fileValue = document.querySelector('#image-input')
    if(fileValue == null) return
    
    if(fileValue.value === undefined) return

    if(fileValue.getAttribute('value')){
        fileValue = fileValue.getAttribute('value')
        
        let input = document.createElement('input')
        input.setAttribute('value', fileValue) 
        document.querySelector('#file-image').appendChild(input)
    } 

    
}

const ImageUpload = {
    input: "",
    preview: document.querySelector('#image-preview'),
    limit: 5,
    files: [],
    chef(event){
        const {files: fileList} = event.target

        ImageUpload.input = event.target
        ImageUpload.limit = 1
       

        Array.from(fileList).forEach(file => {
            ImageUpload.files.push(file)
            
            const reader = new FileReader()
    
            reader.onload = () =>{
                const fileImage = document.querySelector('#file-image')
                let input = document.createElement('input')
                if(fileImage.childNodes.length > 1){
                    input = document.querySelector('#file-image input')
                } 

                input.value = String(reader.result)
    
                fileImage.appendChild(input)
            }

            reader.readAsDataURL(file)
        })

        ImageUpload.input.files = ImageUpload.getFiles()
    },
    recipe(event){
        const {files: fileList} = event.target
        ImageUpload.input = event.target
        
        if(ImageUpload.maxUpload(event)) return 

        Array.from(fileList).forEach(file => {
            ImageUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const container = ImageUpload.getContainer(image) 
                
                ImageUpload.preview.appendChild(container)
            }

            reader.readAsDataURL(file)
        })

        ImageUpload.input.files = ImageUpload.getFiles()
    },
    getContainer(image){
        const container = document.createElement('div')
        container.classList.add('image')
        container.onclick = ImageUpload.removeImage
        container.appendChild(image)

        container.appendChild(ImageUpload.removeButton())

        return container
    },
    maxUpload(event){
        const {limit, input, preview} = ImageUpload
        const {files: fileList} = input

        if(fileList.length > limit){
            window.alert("Você só pode escolher 5 imagens")
            event.preventDefault()
            return true
        }

        const imageDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "image"){
                imageDiv.push(item)
            }
        })

        const totalImages = fileList.length + imageDiv.length
        if(totalImages > limit){
            window.alert("Você só pode escolher 5 imagens")
            event.preventDefault()
            return true
        }

        return false
    },
    getFiles(){
        const dataTransfer = new DataTransfer() || new ClipboardEvent("")

        ImageUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    removeButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removeImage(event){
        const imageDiv = event.target.parentNode
        const imageArray = Array.from(ImageUpload.preview.children)
        const index = imageArray.indexOf(imageDiv)

        ImageUpload.files.splice(index, 1)
        ImageUpload.input.files = ImageUpload.getFiles()

        imageDiv.remove()
    },
    removeOldImage(event){
        const imageDiv = event.target.parentNode

        if(imageDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')
            
            if(removedFiles){
                removedFiles.value += `${imageDiv.id},`
            }
        }

        imageDiv.remove()
    }
}

deleteChef()
function deleteChef(){
    const chefDelete = document.querySelector('#delete-chef')
    
    if(chefDelete == null) return

    chefDelete.addEventListener('click', function(event){
        const confirmation = window.confirm("Deseja deletar?")

        const totalRecipes = document.querySelector('#total_recipes')
        console.log(totalRecipes)
        if (!confirmation) {
            event.preventDefault()
        } else if (Number(totalRecipes) > 0) {
            window.alert("Esse Chef não pode ser excuído, pois existem receitas registradas em sua autoria, por favor, exclua todas as receitas do mesmo, depois tente excluí-lo novemente")
            event.preventDefault()
        }
    })
}