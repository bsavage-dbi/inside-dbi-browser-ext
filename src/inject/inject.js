chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			document.head.insertAdjacentHTML("beforeend", '<script>var epicsObj;</script>');


			if ('undefined' == window.jQuery) {
				console.log("jQuery not present");
			} else {
				// jQuery present
				console.log("jQuery present");
				console.log($.fn.jquery);
			}



			let dbiModal = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
			  <div class="modal-content" style="width: 75%;overflow-y: auto;max-height: 800px;">
				<div class="modal-header">
				  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
				  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				  </button>
				</div>
				<div class="modal-body">
				${dataGrid}
				</div>
				<div class="modal-footer">
				  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				  <button type="button" class="btn btn-primary">Save changes</button>
				</div>
			  </div>
			</div>
		  </div>`;
		  $('body').append(dbiModal);
			//loadDataGrid();
			makeBtn();

			$('.modal-content').resizable({
				alsoResize: ".modal-dialog",
				minHeight: 150
			});
			$('.modal-dialog').draggable();

			$('#exampleModal').on('show.bs.modal', function () {
				$(this).find('.modal-body').css({
					'max-height': '100%'
				});
			});

			//LOAD EPICS
			console.log("         - LOADING EPICS");
			var settings = {
				"url": "https://davidsbridal.atlassian.net/rest/api/3/search?jql=project=TH AND issuetype = Epic ORDER BY key ASC&startAt=0&maxResults=1000&fields=key,summary",
				"method": "GET",
				"timeout": 0
			};
			var epics = {};
			$('nav').append('<div class="dropdown"><button class="ddbtn btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown<span class="caret"></span></button><ul id="epics-dropdown" class="dropdown-menu"></ul></div>');

			$.ajax(settings).done(function (data) {
				//console.log(data.total);
				$.each(data.issues, function (key, value) {
					//console.log(this.key+' : '+this.fields.summary);
					epics[this.key] = this.fields.summary;
					$('#epics-dropdown').append('<li><a href="#" id="' + this.id + '" data-link="' + this.self + '">' + this.key + ' : ' + this.fields.summary + '</a></li>');
				});
				localStorage.setItem("epics", JSON.stringify(epics));

			});
			console.log("         - EPICS LOADED");



			$(".dropdown").ready(function () {
				$(".dropdown li a").select(function (event) {
					event.preventDefault();
					console.log($(this).text());
					console.log($(this).attr("href"));
					
				});

				$(".dropdown").on("hide.bs.dropdown", function () {
					$(".ddbtn").html('Dropdown <span class="caret"></span>');
				});
				$(".dropdown").on("show.bs.dropdown", function () {
					$(".ddbtn").html('Dropdown <span class="caret caret-up"></span>');
				});
			});





		}
	}, 10);
});

function makeBtn(){
let dbiButton = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
Launch demo modal
</button>`;
$('nav').append(dbiButton);
}