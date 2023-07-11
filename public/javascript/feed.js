var currentUrl = window.location.href

// console.log(currentUrl)
let scoreUrl = new URL(currentUrl)
scoreUrl.searchParams.set("sort", "score")

let descUrl = new URL(currentUrl)
descUrl.searchParams.set("sort", "desc")

let asceUrl = new URL(currentUrl)
asceUrl.searchParams.set("sort", "asce")

// console.log(scoreUrl.href)






window.onload= () =>{

    // let meowDom = document.querySelector('.dude')
    // console.log(meowDom)
    // meowDom.innerHTML = "how"

    const asceDom = document.getElementById("descUrl")
    asceDom.href = asceUrl.href

    const descDom = document.getElementById("asceUrl")
    descDom.href = descUrl.href

    const scoreDom = document.getElementById("scoreUrl")
    scoreDom.href = scoreUrl.href



    // pagingation
    const totalPages = document.getElementById("total-pages").innerText
    const pagingationContiner = document.getElementById("pagination")
    // console.log(totalPages + "meow moew")
    createPagination(pagingationContiner, totalPages)
    addColorToCurrentType()
}

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
    currenta.classList.add("btn-main")

    let currentParams = new URL(currentUrl).searchParams;
    let currentPage = parseInt(currentParams.get("page"))
    console.log(currentPage)
    if(currentNumber === currentPage ) 
        currenta.classList.add("text-red-400")
    currentli.appendChild(currenta)
    container.appendChild(currentli)
}
function addColorToCurrentType(){
    nextPageUrl = new URL(currentUrl)
    let currentParams = new URL(currentUrl).searchParams;
    let currentType = currentParams.get("type")
    let currentContainer
    if(currentType == "fox")       currentContainer = document.getElementById("fox-container")
    else if(currentType == "duck") currentContainer = document.getElementById("duck-container")
    else if(currentType == "bird") currentContainer = document.getElementById("bird-container")
    else if(currentType == "oria") currentContainer = document.getElementById("oria-container")
    else if(currentType == "all")  currentContainer = document.getElementById("all-container")

    currentContainer.classList.add("text-cyan-600")
    console.log(currentContainer)
}