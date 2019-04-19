$(document).ready(function () {
    console.log("ready to go");

    const apiKey = "lIs3ok8bg7ciOQExZvbuD2howm6mCwTe";
    const rating = "G";
    const lang = "eng";
    const limit = 2;

    var gifs = [];
    var topics = [];
    var gifObjs = [];
    var gifKey = 0;


    $(document).on("click", ".gif-btn", retrieveData);

    $(document).on("click", ".gif", function () {
        console.log("click");
        var id = $(this).attr("id");
        var state = $(this).attr("gif-state");
        console.log("click on gif: " + id);

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
            for (var i = 0; i < gifObjs.length; i++) {
                var gifDiv = $('<div>');
                gifDiv.addClass("mdb-lightbox");
                var figure = $('<figure>');
                figure.addClass('col-md-3');

                var p = $('<p>').html("Rating: " + gifObjs[i].rating.toUpperCase());

                var image = $('<img>');
                image.attr("src", gifObjs[i].still);
                image.attr("gif-state", "still");
                image.attr("class", "gif img-fluid");
                image.attr("id", gifObjs[i].key);
                figure.append(p, image);
                gifDiv.append(figure);
                $("#gifs-view").prepend(gifDiv);
            }

            console.log(gifObjs)
            return results;
        });
    }


    var formatJSON = function (results) {
        gifObjs = [];
        gifs = [];
        $("#gifs-view").empty;

        // console.log("format JSON result: "+results.length);
        // gifObjs = [];
        for (var i = 0; i < results.length; i++) {
            gifs.push(results[i]);
        }

        for (var j = 0; j < gifs.length; j++) {
            console.log("gifKey: " + gifKey);
            gifObjs.push({
                key: gifKey,
                still: gifs[j].images.fixed_height_still.url,
                animate: gifs[j].images.fixed_height.url
            })
            gifKey++;
        }

        // $("#gifs-view").empty();

        console.log(gifObjs);
        for (var i = 0; i < gifObjs.length; i++) {
            console.log(gifObjs[i].key);
            console.log(gifObjs[i].still);
            console.log(gifObjs[i].animate);
            // console.log(gifObjs[i].image);
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
    }


    function renderButtons() {
        console.log("render buttons");
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gif-btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }

    var init = function () {
        console.clear();
        topics = ["cat", "dog", "computer"]
        renderButtons();
    }

    init(); //todo: for testing only

});






// const apiKey = "lIs3ok8bg7ciOQExZvbuD2howm6mCwTe";
// const rating = "G";
// const lang = "eng";
// const limit = 2;
// var gifObjs = [];
// var gifKey = 0;


// $(document).on("click", ".gif", function () {
//     console.log("click");
//     var id = $(this).attr("id");
//     var state = $(this).attr("gif-state");
//     console.log("click on gif: " + id);

//     if (state == "animate") {
//         $(this).attr("src", gifObjs[id].still);
//         $(this).attr("gif-state", "still");
//     }
//     else {
//         $(this).attr("src", gifObjs[id].animate);
//         $(this).attr("gif-state", "animate");
//     }

// });

// function retrieveData() {
//     console.clear();
//     console.log("retrieve data");
//     var results = [];
//     var animal = $(this).attr("data-name");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         animal + "&api_key=" + apiKey + "&limit=" + limit + "&rating=" + rating + "&lang=" + lang;
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//         results = response.data;
//         //formatJSON(results);

//         for (var i = 0; i < results.length; i++) {
//             gifObjs.push({
//                 key: gifKey,
//                 rating: results[i].rating,
//                 title: results[i].title,
//                 still: results[i].images.fixed_height_still.url,
//                 animate: results[i].images.fixed_height.url
//             })
//             gifKey++;
//         }


//         $("#gifs-view").empty();
//         for (var i = 0; i < gifObjs.length; i++) {
//             var gifDiv = $('<div>');
//             gifDiv.addClass("mdb-lightbox");
//             var figure = $('<figure>');
//             figure.addClass('col-md-4');

//                         var p = $('<p>').html("Rating: " + gifObjs[i].rating.toUpperCase());

//             var image = $('<img>');
//             image.attr("src", gifObjs[i].still);
//             image.attr("gif-state", "still");
//             image.attr("class", "gif img-fluid");
//             image.attr("id", gifObjs[i].key);
//             figure.append(p,image);
//             gifDiv.append(figure);
//             $("#gifs-view").prepend(gifDiv);
//         }

//         console.log(gifObjs)
//         return results;
//     });
// }