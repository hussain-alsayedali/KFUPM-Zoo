var currentUrl = window.location.href

let descScoreUrl = new URL(currentUrl)
descScoreUrl.searchParams.set("sort", "score_desc")

let asceScoreUrl = new URL(currentUrl)
asceScoreUrl.searchParams.set("sort", "score_asce")

let descCreatedatUrl = new URL(currentUrl)
descCreatedatUrl.searchParams.set("sort", "createdAt_desc")

let asceCreatedatUrl = new URL(currentUrl)
asceCreatedatUrl.searchParams.set("sort", "createdAt_asce")








window.onload= () =>{



    const asceDom = document.getElementById("desc-createdat-url")
    asceDom.href = asceCreatedatUrl.href

    const descDom = document.getElementById("asce-createdat-url")
    descDom.href = descCreatedatUrl.href

    const acseScoreDom = document.getElementById("asce-score-url")
    acseScoreDom.href = asceScoreUrl.href

    const descScoreDom = document.getElementById("desc-score-url")
    descScoreDom.href = descScoreUrl.href

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

    
    let currentSortString = ""
    if(currentSort != null){
        currentSortString = "&sort=" + currentSort 
    } 
    const feedUrlString = 'feed/feedJson'+ "?" + "type=" +currentType + "&page=" + currentPageNum + currentSortString
    
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