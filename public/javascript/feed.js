const currentUrl = window.location.href

// console.log(currentUrl)
let scoreUrl = new URL(currentUrl)
scoreUrl.searchParams.set("sort", "score")

let descUrl = new URL(currentUrl)
descUrl.searchParams.set("sort", "desc")

let asceUrl = new URL(currentUrl)
asceUrl.searchParams.set("sort", "asce")

// console.log(scoreUrl.href)






// window.onload= () =>{

//     // let meowDom = document.querySelector('.dude')
//     // console.log(meowDom)
//     // meowDom.innerHTML = "how"

//     const asceDom = document.getElementById("descUrl")
//     asceDom.href = asceUrl.href

//     const descDom = document.getElementById("asceUrl")
//     descDom.href = descUrl.href

//     const scoreDom = document.getElementById("scoreUrl")
//     scoreDom.href = scoreUrl.href



//     // pagingation
//     const totalPages = document.getElementById("total-pages").innerText
//     const pagingationContiner = document.getElementById("pagination")
//     // console.log(totalPages + "meow moew")
//     createPagination(pagingationContiner, totalPages)
// }

function createPagination(container , totalPages){
    for(i = 0 ; i < totalPages ; i++){
        createPageButton(container, i)
    }
}
function createPageButton(container, currentNumber){
    const currentli = document.createElement("li")
    const currenta = document.createElement("a")
    
    nextPageUrl = new URL(currentUrl)
    nextPageUrl.searchParams.set("page", currentNumber)

    currenta.href = nextPageUrl
    currenta.innerText = currentNumber
    currentli.appendChild(currenta)
    container.appendChild(currentli)
}