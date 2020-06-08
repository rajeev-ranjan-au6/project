console.log("Pizza Center");

function fetchCurrencyData(item) {
    loadingText.style.display = 'block';
    var baseURL = `https://forkify-api.herokuapp.com/api/search`;
    console.log(item);
    baseURL += `?q=${item}`;

    return fetch(baseURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(JSONresponse) {
            return JSONresponse.recipes;

        })
        .catch(function(err) {
            alert(err.message);
        });
}
var btnSearch = document.querySelector('form');
var loadingText = document.querySelector("#lod");
var page = document.querySelector("#page1");

btnSearch.addEventListener('submit', function(event) {

    loadingText.style.display = 'block'
    event.preventDefault();

    var searchText = event.target.searchText.value;

    fetchCurrencyData(searchText).then(function(
        response
    ) {

        loadingText.style.display = 'block'
        for (i = 0; i <= response.length; i++) {

            page.style.display = 'none'
            $("#result").append(
                `<div class="col-4 mb-3"><div class="card"><div class="card-header">Recipe Number:
          ` + response[i].recipe_id + `
        </div><img src=` +
                response[i].image_url +
                ` class="card-img-top card_style" alt="food_image">
          <div class="card-body" style="width:400px;height:200px;"><h5 class="card-title">` +
                response[i].title +
                `</h5><p class="card-text"> By: ` +
                response[i].publisher +
                `.</p><a href=` +
                response[i].source_url +
                ` class="btn btn-primary"> Recipe</a>
            <div class="card-footer text-muted">
            Loved it` +
                response[i].social_rank +
                `peoples
          </div>`
            );
            loadingText.style.display = 'none'
        }

    });
});