const apiKey = "lIs3ok8bg7ciOQExZvbuD2howm6mCwTe";
const rating = "G";
const lang = "eng";
const limit = 2;
var gifObjs = [];
var gifKey = 0;


$(document).on("click", ".gif", function () {
    var id = $(this).attr("id");
    var state = $(this).attr("gif-state");
    console.log("click on gif: " + id);

    // console.log(id + "/" + state);
    if (state == "animate") {
        $(this).attr("src", gifObjs[id].still);
        $(this).attr("gif-state", "still");
    }
    else {
        $(this).attr("src", gifObjs[id].animate);
        $(this).attr("gif-state", "animate");
    }

});
function retrieveData() {
    console.clear();
    console.log("retrieve data");
    var results = [];
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=" + apiKey + "&limit=" + limit + "&rating=" + rating + "&lang=" + lang;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        results = response.data;
        //formatJSON(results);

        for (var j = 0; j < results.length; j++) {
            gifObjs.push({
                key: gifKey,
                still: results[j].images.fixed_height_still.url,
                animate: results[j].images.fixed_height.url
            })
            gifKey++;
        }


        $("#gifs-view").empty();

        for (var i = 0; i < gifObjs.length; i++) {
            console.log(gifObjs[i].key);
            var gifDiv = $('<div>');
            gifDiv.attr("class", "col-lg-3 col-md-4 col-6");

            var a = $('<a>');
            a.attr("href", "#");
            // a.attr("class", "d-block mb-4 h-100");

            var image = $('<img>');
            image.attr("src", gifObjs[i].still);
            image.attr("gif-state", "still");
            image.attr("alt", "");
            image.attr("class", "gif img-fluid img-thumbnail");
            // image.attr("id", i);
            image.attr("id", gifObjs[i].key);

            gifDiv.append(a, image);
            $("#gifs-view").prepend(gifDiv);
            // $("#gifs-view").append(gifDiv);
        }
        console.log(gifObjs)
        return results;
    });
}