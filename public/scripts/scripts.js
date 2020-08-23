const recipes = document.querySelectorAll(".link-show")

for(let recipe of recipes){
    recipe.addEventListener("click", function(){
        const recipeId = recipe.getAttribute("id")

        window.location.href = `/receitas/${recipeId}`
    })
}

const ImageUpload = {
    input: "",
    preview: document.querySelector('#image-preview'),
    limit: 1,
    files: [],
    chef(event){
        const {files: fileList} = event.target

        Array.from(fileList).forEach(file => {
            ImageUpload.files.push(file)
            
            const reader = new FileReader()
    
            reader.onload = () =>{
                const fileImage = document.querySelector('#file-image')
                const input = document.createElement('input')
                input.value = String(reader.result)
    
                ImageUpload.fileImage.appendChild(input)
            }

            reader.readAsDataURL(file)
        })

        ImageUpload.input.files = ImageUpload.getFiles()
    },
    recipe(event){
        const {files: fileList} = event.target
        ImageUpload.input = event.target
        ImageUpload.limit = 5
        
        if(ImageUpload.maxUpload(event, ImageUpload.limit)) return 

        if(ImageUpload.files.length + 1 > ImageUpload.limit){
            window.alert("Você deve escolher no máximo 5 imagens")
            event.preventDefault()
            return
        }

        Array.from(fileList).forEach(file => {
            ImageUpload.files.push(file)

            const reader = new FileReader

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
    maxUpload(event, limit){
        const {files: fileList} = event.target

        if(fileList.length > limit){
            alert("Você só pode escolher 5 imagens")
            event.preventDefault()
            return true
        }

        return false
    },
    getFiles(){
        const dataTransfer = new DataTransfer() || new ClipboardEvent("").clipboardData

        ImageUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    removeButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removeImage(evente){
        const imageDiv = event.target.parentNode
        const imageArray = Array.from(ImageUpload.preview.children)
        const index = imageArray.indexOf(imageDiv)

        ImageUpload.files.splice(index, 1)
        ImageUpload.input.files = ImageUpload.getFiles()

        imageDiv.remove()
    }
}