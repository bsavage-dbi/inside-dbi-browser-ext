
function getSprint(boardID = "241") {
    
    let boardPath = `https://davidsbridal.atlassian.net/rest/agile/1.0/board/${boardID}/sprint`;

    var jqxhr = $.ajax(boardPath)
        .done(function (data) {
            console.log("getSprint success");
            $.each(data.values , function(key, value) {
                console.log(this.name);
                console.log(this.id);
                console.log(this.state);
            });
        })
        .fail(function (data) {
            console.log("getSprint error");
        })
        .always(function (data) {
            console.log("getSprint complete");
        });

    // Perform other work here ...

    // Set another completion function for the request above
    jqxhr.always(function (data) {
        console.log("second complete");
        console.log(data);
    });
}

//getSprint("241");