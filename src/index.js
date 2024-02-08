// write your code here 
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then (data => {
        data.forEach(ramen => {
            let header = document.querySelector("#ramen-menu")

            let img = document.createElement("img")
            img.src = `${ramen.image}`

            header.appendChild(img)

            img.addEventListener("click", () => ramenInfo(ramen))
        })
    })

    document.querySelector("#new-ramen").addEventListener("submit", (e) => {
        e.preventDefault()
        createRamen()
    })
})

function ramenInfo(ramen) {
    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete")
    deleteBtn.textContent = "Delete"
    deleteBtn.addEventListener("click", () => deleteRamen(ramen))
    document.querySelector(".detail-image").src = `${ramen.image}`
    document.querySelector(".name").textContent = `${ramen.name}`
    document.querySelector(".restaurant").textContent = `${ramen.restaurant}`
    document.querySelector("#rating-display").textContent = `${ramen.rating}`
    document.querySelector("#comment-display").textContent = `${ramen.comment}`    
    document.querySelector("#comment-display").appendChild(deleteBtn)  
     
}


function deleteRamen(ramen){
    fetch(`http://localhost:3000/ramens/${ramen.id}`, {
        method: 'DELETE'
    })
}



function createRamen() {
    let nameInput = document.querySelector("#new-name").value
    let restaurantInput = document.querySelector("#new-restaurant").value
    let imageInput = document.querySelector("#new-image").value
    let ratingInput = document.querySelector("#new-rating").value
    let commentInput = document.querySelector("#new-comment").value

    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "name": nameInput,
            "restaurant": restaurantInput,
            "image": imageInput,
            "rating": ratingInput,
            "comment": commentInput
        })
    })
    
}

