var currentUrl = window.location.href

let scoreUrl = new URL(currentUrl)
scoreUrl.searchParams.set("sort", "score")

let descUrl = new URL(currentUrl)
descUrl.searchParams.set("sort", "desc")

let asceUrl = new URL(currentUrl)
asceUrl.searchParams.set("sort", "asce")








window.onload= () =>{



    const asceDom = document.getElementById("descUrl")
    asceDom.href = asceUrl.href

    const descDom = document.getElementById("asceUrl")
    descDom.href = descUrl.href

    const scoreDom = document.getElementById("scoreUrl")
    scoreDom.href = scoreUrl.href



    // pagingation
    const totalPages = document.getElementById("total-pages").innerText
    const pagingationContiner = document.getElementById("pagination")

    createPagination(pagingationContiner, totalPages)
    addColorToCurrentType()
    putDatesDom()
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
    
}

async function fetchDates(){
    const feedUrlString = getUrlString()
    console.log(feedUrlString)
    const response = await fetch(feedUrlString);
    const jsonRes = await response.json()


    let datesFormated =  []
    for(let i = 0 ; i < jsonRes["posts"].length ; i++ ){
        // datesFormated.push(i)
        datesFormated.push(new Date(jsonRes["posts"][i]["createdAt"]).toDateString().substring(4))
    }

    return datesFormated
}

function getUrlString(){
    const currentLink =new URL(currentUrl)
    const currentPageNum = currentLink.searchParams.get("page")
    const currentSort = currentLink.searchParams.get("sort")
    const currentType = currentLink.searchParams.get("type")

    console.log( currentPageNum , currentSort , currentType )
    let currentSortString = ""
    if(currentSort != null){
        currentSortString = "&sort=" + currentSort 
    } 
    const feedUrlString = 'feed/feedJson'+ "?" + "type=" +currentType + "&page=" + currentPageNum + currentSortString
    console.log(feedUrlString)
    return feedUrlString;
}

function putDates(dates){

    const datesContainers = document.getElementsByClassName("date-picture")

    for(let i = 0 ; i < datesContainers.length ; i++  ){
        datesContainers[i].innerHTML = dates[i]
    }
}

async function putDatesDom(){
    const datesObj = await fetchDates()
    putDates(datesObj)
}