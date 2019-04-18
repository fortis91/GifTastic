const apiKey = "lIs3ok8bg7ciOQExZvbuD2howm6mCwTe";
const rating = "G";
const lang = "eng";
const limit = 10;
var gifObjs = [];
var gifKey = 0;


$(document).on("click", ".gif", function () {
    console.log("click");
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
        console.log(response);
        results = response.data;
        //formatJSON(results);

        for (var i = 0; i < results.length; i++) {
            gifObjs.push({
                key: gifKey,
                rating: results[i].rating,
                title: results[i].title,
                still: results[i].images.fixed_height_still.url,
                animate: results[i].images.fixed_height.url
            })
            gifKey++;
        }


        $("#gifs-view").empty();

        // <div class="mdb-lightbox">
        //     <figure class="col-md-4">
        //  </figure >
        //         <img src="https://media2.giphy.com/media/JIX9t2j0ZTN9S/200_s.gif" gif-state="still"
        //         class="img-fluid" id="3">
        // </div>

        // for (var i = 0; i < gifObjs.length; i++) {
        //     var gifDiv = $("<div>");
        //     gifDiv.addClass("mdb-lighbox");
        //     var figure = $("<figure>");
        //     figure.addClass("col-md-4");
        //     var image = $("<img>");
        //     image.attr("source", "https://media2.giphy.com/media/JIX9t2j0ZTN9S/200_s.gif");
        //     gifDiv.append(figure, image);
        //     $("#gifs-view").prepend(gifDiv);
        // }
        // <div class="mdb-lightbox">
        //     <figure class="col-md-4">
        //         <img alt="picture"
        //             src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
        //             class="img-fluid">
        //      </figure>
        // </div>
        for (var i = 0; i < gifObjs.length; i++) {
            var gifDiv = $('<div>');
            gifDiv.addClass("mdb-lightbox");
            var figure = $('<figure>');
            figure.addClass('col-md-4');
        
                    //     var p = $('<p>').html("Rating: " + gifObjs[i].rating.toUpperCase());

            var image = $('<img>');
            image.attr("src", gifObjs[i].still);
            image.attr("gif-state", "still");
            image.attr("class", "gif img-fluid");
            image.attr("id", gifObjs[i].key);
            figure.append(image);
            gifDiv.append(figure);
            $("#gifs-view").prepend(gifDiv);
        }
        // for (var i = 0; i < gifObjs.length; i++) {
        //     console.log(gifObjs[i].key);
        //     var gifDiv = $('<div>');
        //     gifDiv.attr("class", "col-lg-3 col-md-4 col-6");

        //     var a = $('<a>');
        //     a.attr("href", "#");
        //     // a.attr("class", "d-block mb-4 h-100");
        //     var p = $('<p>').html("Rating: " + gifObjs[i].rating.toUpperCase());
        //     var image = $('<img>');
        //     image.attr("src", gifObjs[i].still);
        //     image.attr("gif-state", "still");
        //     image.attr("alt", "");
        //     image.attr("class", "gif img-fluid img-thumbnail");
        //     image.attr("id", gifObjs[i].key);

        //     gifDiv.append(p, a, image);
        //     $("#gifs-view").prepend(gifDiv);
        // }
        console.log(gifObjs)
        return results;
    });
}