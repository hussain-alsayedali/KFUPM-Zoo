const currentUrl = window.location.href

console.log(currentUrl)
let scoreUrl = new URL(currentUrl)
scoreUrl.searchParams.set("sort", "score")

let descUrl = new URL(currentUrl)
descUrl.searchParams.set("sort", "desc")

let asceUrl = new URL(currentUrl)
asceUrl.searchParams.set("sort", "asce")

console.log(scoreUrl.href)






window.onload= () =>{
    let meowDom = document.querySelector('.dude')
    console.log(meowDom)
    meowDom.innerHTML = "how"

    const asceDom = document.getElementById("descUrl")
    asceDom.href = asceUrl.href

    const descDom = document.getElementById("asceUrl")
    descDom.href = descUrl.href

    const scoreDom = document.getElementById("scoreUrl")
    scoreDom.href = scoreUrl.href


}