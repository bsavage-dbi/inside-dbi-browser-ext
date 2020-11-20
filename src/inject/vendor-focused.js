


// Borderfree from Born Jiras

$(".list-view").before('<div id="theTank">HERE</div>');    
var settings = {
  "url": 'https://borngroup.atlassian.net/rest/api/2/search?fields=summary,description,customfield_10118&jql=(text ~ "borderfree" OR text~"border free") AND (description ~ "Acceptance " OR description ~ "Acceptance ")&expand=renderedFields&startAt=0&maxResults=1000&fields=key,summary',
  "method": "GET",
  "timeout": 0
};

$.ajax(settings).done(function (data) {
    console.log(data);
    console.log(data.total);
var ac = []; var tr = []; var br = [];
    $.each(data.issues, function (key, value) {

        $("#theTank").append('<div>');
        $("#theTank").append('<h4>'+this.key+' '+this.fields.summary+'</h4>');
        
        let x = this.renderedFields.description;

        if(x.search(/technical/i) > 0){
            $("#theTank").append('<h3>Technical Requirement:</h3>');
        }

        if(x.search(/technical/i) > 0){
            $("#theTank").append('<h3>Acceptance Criteria:</h3>');
        }
        if(x.search(/technical/i) > 0){
            $("#theTank").append('<h3>Business Requirement:</h3>');
        }
        $("#theTank").append(this.renderedFields.description);
        $("#theTank").append('</div>');

    });

});