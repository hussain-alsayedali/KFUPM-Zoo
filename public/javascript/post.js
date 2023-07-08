async function fetchDates() {
    const currentUrl =  window.location.href
    const n = currentUrl.lastIndexOf('/')
    // console.log(currentUrl.substring(n + 1))
    const response = await fetch('/post/getPostComments/' + currentUrl.substring(n + 1));
    const jsonRes = await response.json();
    // waits until the request completes...
    // console.log("these are the response",response);

    console.log("these are the response",jsonRes[0]["createdAt"]);
    console.log("these are the response");
    for(let i = 0 ; i < jsonRes.length ; i++ ){
        console.log(jsonRes[i]["createdAt"])
    }
    // for(const res in jsonRes){
    //     console.log(jsonRes[res])
    // }
}
window.onload = () =>{
    fetchDates()
    console.log("mn")
}


