let searchForm = document.getElementById("Search-form");
let searchBox = document.getElementById("Search-box");
let searchResult = document.getElementById("search-result");
let showmorebtn = document.getElementById("show-more-btn");
let loader = document.getElementById("loader");
let searchnotfound = document.getElementById("data-notfound");

let secreteKey = 'enetr your api key';

let inputvalue = '';
let page = 1;

async function searchImages() {
    if (page === 1) {
        searchResult.innerHTML = "";
    }
    inputvalue = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputvalue}&client_id=${secreteKey}&per_page=12`
    loader.style.display = "block";
    const response = await fetch(url);
    try {
    const data = await response.json();
    results = data.results;
    console.log(results)
    if(results.length > 0)
        {

            results.map(res => {
                const img = document.createElement("img");
                img.src = res.urls.small;
                const imgLink = document.createElement("a");
                imgLink.href = res.links.html;
                imgLink.target = "_blank";
                const dwnLink = document.createElement("p");
                dwnLink.innerHTML = res.user.name;
                imgLink.appendChild(img);
                imgLink.appendChild(dwnLink);
                searchResult.appendChild(imgLink);
            })
            showmorebtn.style.display = "block";
            loader.style.display="none";
        searchnotfound.innerHTML =''

        }
        else{
        showmorebtn.style.display = "none";
        loader.style.display="none";
        searchnotfound.innerHTML ='Search result not found!'
        }

    } catch (error) {
        searchResult = ""
    }
    

}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})
showmorebtn.addEventListener("click", () => {
    page++;
    searchImages();
})