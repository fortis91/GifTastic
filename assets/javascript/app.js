$(document).ready(function () {
    console.log("ready to go");

    var topics = ["computer", "popcorn", "matrix"]
    var gifs = [];
    var gifObjs = [];
    var gifKey = 0;

    //listeners
    $(document).on("click", ".gif-btn", function () {
        var topic = $(this).attr("data-name");
        console.log("topic button clicked: " + topic)
        retrieveData(topic);
    });
    $(document).on("click", ".gif", function () {
        console.log("click gif");
        var gifObj = this;
        changeState(gifObj);
    });
    $("#add-gif").on("click", function (event) {
        console.log("add gif");
        event.preventDefault();
        var topic = $("#gif-input").val().trim();
        $("#gif-input").val("");

        topics.push(topic);
        renderButtons();
    });
    // $("#clear-gifs").on("click", function () {
    //     console.log("clear movies");
    //     event.preventDefault();
    //     gifs = [];
    //     gifObjs = [];
    //     topics = [];
    //     // $("#buttons-view").empty();
    //     $('#gifs-view').empty();
    //     console.clear();
    // });

    //listeners

   
    var displayGIFS = function () {
        console.log("display gifs")
        $("#gifs-view").empty();
        for (var i = 0; i < gifObjs.length; i++) {
            var card = $('<div>').addClass("card");
            var image = $('<img>');
            image.attr("src", gifObjs[i].still);
            image.attr("data-state", "still");
            image.attr("class", "gif card-img-top");
            image.attr("id", gifObjs[i].key);
            var cardBody = $('<div>').addClass("card-body");
            var cardTitle = $('<p>').addClass("card-title").html("Title: " + gifObjs[i].title);
            var cardText = $('<p>').addClass("card-text").html("Rating: " + gifObjs[i].rating);
            var link = $('<a>', {
                text: 'See more like this',
                target: '_new',
                href: gifObjs[i].embed_url
            }).appendTo('body');
            cardBody.append(cardTitle, cardText, link);//, like);
            card.append(image, cardBody);
            $("#gifs-view").prepend(card);
        }
    }


    var changeState = function (gifObj) {
        console.log("change state");
        var id = $(gifObj).attr("id");
        var state = $(gifObj).attr("data-state");

        if (state === "animate") {
            $(gifObj).attr("src", gifObjs[id].still);
            $(gifObj).attr("data-state", "still");
        }
        else {
            $(gifObj).attr("src", gifObjs[id].animate);
            $(gifObj).attr("data-state", "animate");
        }
    }


    var renderButtons = function () {
        console.log("render buttons: " + topics.length);
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gif-btn btn btn-success btn-sm");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }


    var retrieveData = function (topic) {
        console.log("retrieve data: " + topic);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=" + apiKey + "&limit=" + limit + "&rating=" + rating + "&lang=" + lang;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            gifs = response.data;
            createGIFObjects(gifs);
            displayGIFS();
        });
    }


    var createGIFObjects = function (gifs) {
        for (var i = 0; i < gifs.length; i++) {
            gifObjs.push({
                key: gifKey,
                rating: gifs[i].rating,
                title: gifs[i].title,
                embed_url: gifs[i].embed_url,
                source: gifs[i].source,
                still: gifs[i].images.fixed_height_still.url,
                animate: gifs[i].images.fixed_height.url
            })
            gifKey++;
        }
        console.log(gifObjs);
        console.log("create gif object: " + gifObjs.length);

        return gifObjs;
    }


    $(document).on("click", ".form-check-input", function () {
        var checked = $('.form-check-input')[0].checked;
        // if (checked) {
        //     toggleAnimate();
        // }
        //toggleAnimate(checked);
    });

    
    var toggleAnimate = function (checked) {
        console.log("toggle animate - " + checked);
        var state;
        for (var i = 0; i < gifObjs.length; i++) {
            console.log(checked);
            if (checked) {
                $(gifObjs[i]).attr("src", gifObjs[i].animate);
                $(gifObjs[i]).attr("data-state", "animate");
            }
            else {
                $(gifObjs[i]).attr("src", gifObjs[i].still);
                $(gifObjs[i]).attr("data-state", "still");
            }
        }
        displayGIFSV2(state);
    }
    var init = function () {
        renderButtons();
        console.log(topics);
        storeIt();
        var data = JSON.parse(localStorage.getItem('topics'));
        console.log(data);
        //retrieveData("computer");
    }

    var storeIt = function () {
        localStorage.setItem('topics', JSON.stringify(topics));
    }
    init();

});