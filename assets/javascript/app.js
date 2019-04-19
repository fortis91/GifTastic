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

    // $("button").on("click", function () {
    //     console.log("button click");
    //     retrieveData();
    // });

    $(document).on("click", ".gif-btn", retrieveData);
    //renderButtons(); //tooo start will have no buttons to render

    // $(document).on("click", ".gif", changeState);
    // $(document).on("click", ".gif", function () {
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

    // from api.js
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

    //todo: clear = gifs / reset = all
    $("#clear-gifs").on("click", function () {
        console.log("clear movies");
        event.preventDefault();
        gifs = [];
        gifObjs = [];
        topics = [];
        // $("#buttons-view").empty();
        $('#gifs-view').empty();
        console.clear();
    });


    function retrieveData() {
        console.log("retrieve data");
        var results = [];
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=" + apiKey + "&limit=" + limit + "&rating=" + rating + "&lang=" + lang;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            results = response.data;

            formatJSON(results);
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


    $("#add-gif").on("click", function (event) {
        console.log("add gif");
        event.preventDefault();
        var topic = $("#gif-input").val().trim();
        topics.push(topic);
        renderButtons();
    });


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