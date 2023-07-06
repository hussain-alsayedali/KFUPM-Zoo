async function fetchDates() {
    const response = await fetch('/post/getPostComments');
    const jsonRes = await response.json();
    // waits until the request completes...
    console.log("these are the response",response);

    console.log("these are the response",jsonRes);
}
window.onload = () =>{
    fetchDates()
    console.log("mn")
}


