$(document).ready(function () {
    console.log("ready to go");

    const apiKey = "lIs3ok8bg7ciOQExZvbuD2howm6mCwTe";
    const rating = "G";
    const lang = "eng";
    const limit = 4;

    var gifs = [];
    var gifObjs = [];

    // $("button").on("click", function () {
    //     console.log("button click");
    //     retrieveData();
    // });

    $(document).on("click", ".gif-btn", retrieveData);
    //renderButtons(); //tooo start will have no buttons to render

    // $(document).on("click", ".gif", changeState);
    $(document).on("click", ".gif", function () {
        var id = $(this).attr("id");
        var state = $(this).attr("gif-state");
        console.log(id + "/" + state);
        if (state == "animate") {
            $(this).attr("src", gifObjs[id].still);
            $(this).attr("gif-state", "still");
        }
        else {
            $(this).attr("src", gifObjs[id].animate);
            $(this).attr("gif-state", "animate");
        }

    });


    //todo: clear = gifs / reset = all
    $("#clear-gifs").on("click", function () {
        console.log("clear movies");
        event.preventDefault();
        gifs = [];
        gifObjs = [];
        // $("#buttons-view").empty();
        $('#gifs-view').empty();
        console.clear();
    });


    function retrieveData() {
        console.log("retrieve data");
        // var apiKey = "lIs3ok8bg7ciOQExZvbuD2howm6mCwTe";
        // var rating = "G";
        // var lang = "eng";
        // var limit = 5;
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=" + apiKey + "&limit=" + limit + "&rating=" + rating + "&lang=" + lang;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //console.log(response.data);
            var results = response.data;
            formatJSON(results);
        });
    }


    var formatJSON = function (results) {
        console.log("format JSON: "+results.length);
        // gifObjs = [];
        for (var i = 0; i < results.length; i++) {
            // basic - push from results
            // var gifDiv = $("<div>");
            // var p = $("<p>");
            // p.text(results[i].rating);
            // var newImage = $("<img>");
            // newImage.attr("src", results[i].images.fixed_height.url);
            // gifDiv.append(p);
            // gifDiv.append(newImage);
            // $("#gifs-view").prepend(gifDiv);

            // create object
            gifObjs.push({
                key: i,
                still: results[i].images.fixed_height_still.url,
                animate: results[i].images.fixed_height.url
            })
        }

        // adding object
        // for (i = 0; i < gifObjs.length; i++) {
        //     var gifDiv = $("<div>");
        //     var p = $("<p>");
        //     p.text(gifObjs[i].rating);
        //     var newImage = $("<img>");
        //     newImage.attr("src", gifObjs[i].animate);
        //     newImage.attr("gif-state", "animate");
        //     newImage.attr("class", "gif");
        //     newImage.attr("id", i)
        //     gifDiv.append(p);
        //     gifDiv.append(newImage);
        //     $("#gifs-view").prepend(gifDiv);
        // }


        //create bootstrap gallery
        // <div class="col-lg-3 col-md-4 col-6">
        //     <a href="#" class="d-block mb-4 h-100">
        //         <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/pWkk7iiCoDM/400x300" alt="">
        //   </a>
        // </div>

        for (var i = 0; i < gifObjs.length; i++) {
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
            image.attr("id", i)

            gifDiv.append(a, image);
            $("#gifs-view").prepend(gifDiv);
            // $("#gifs-view").append(gifDiv);
        }
        console.log(gifObjs);
    }


    $("#add-gif").on("click", function (event) {
        console.log("add gif");
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        renderButtons();
    });


    function renderButtons() {
        console.log("render buttons");
        $("#buttons-view").empty();

        for (var i = 0; i < gifs.length; i++) {
            var a = $("<button>");
            a.addClass("gif-btn");
            a.attr("data-name", gifs[i]);
            a.text(gifs[i]);
            $("#buttons-view").append(a);
        }
    }


    var init = function () {
        console.clear();

        gifs = ["cat", "dog", "computer"]
        renderButtons();
    }

    init(); //todo: for testing only
});