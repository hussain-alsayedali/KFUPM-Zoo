async function fetchDates() {
    const currentUrl =  window.location.href
    const n = currentUrl.lastIndexOf('/')
    
    const response = await fetch('/post/getPostComments/' + currentUrl.substring(n + 1));
    const jsonRes = await response.json();
    // waits until the request completes...


    const datesFormated = []
    for(let i = 0 ; i < jsonRes.length ; i++ ){
        datesFormated.push(new Date(jsonRes[i]["createdAt"]).toDateString().substring(4))
    }
    return datesFormated
}
function putDates(dates){
    const commentsSpans = document.getElementsByClassName("date-comment")
    for(let i = 0 ; i < commentsSpans.length ; i++ ){
        console.log(dates[i])
        console.log(commentsSpans[i])
        commentsSpans[i].innerHTML = dates[i]
    }
}
async function putDatesDom(){
    const dates  = await fetchDates()
    putDates(dates)
}

window.onload = () =>{
    putDatesDom()
}



