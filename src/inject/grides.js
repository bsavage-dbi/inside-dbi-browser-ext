let dataGrid = `<div class="alert alert-danger" role="alert"><strong>Info!</strong> Add row and Delete row are working. Edit row displays modal with row cells information.</div>
<a class="btn btn-success" style="float:left;margin-right:20px;" href="https://codepen.io/collection/XKgNLN/" target="_blank">Other examples on Codepen</a>
<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
	<thead>
		<tr>
			<th>Order</th>
			<th>Description</th>
			<th>Deadline</th>
			<th>Status</th>
			<th>Amount</th>
			<th style="text-align:center;width:100px;">Add row <button type="button" data-func="dt-add" class="btn btn-success btn-xs dt-add">
					<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
				</button></th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Row information</h4>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>`;


function loadDataGrid() {


    $(document).ready(function () {
        console.log("loadDataGrid start");
        let boardID = "241"
        let boardPath = `https://davidsbridal.atlassian.net/rest/agile/1.0/board/${boardID}/sprint`;

        var jqxhr = $.ajax(boardPath)
            .done(function (data) {
                console.log("getSprint success");
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
            console.log("building table of sprints");
            $.each(data.values, function (key, value) {
                //Create some data and insert it
                var rowData = [];
                var table = $('#example').DataTable();
                //Store next row number in array
                var info = table.page.info();
                rowData.push(info.recordsTotal + 1);
                //Some description
                rowData.push(this.name+' '+this.goal);
                //Random date
                var date1 = new Date(2016, 01, 01);
                var date2 = new Date(2018, 12, 31);
                var rndDate = new Date(+date1 + Math.random() * (date2 - date1)); //.toLocaleDateString();
                rowData.push(rndDate.getFullYear() + '/' + (rndDate.getMonth() + 1) + '/' + rndDate.getDate());
                //Status column
                rowData.push('NEW');
                //Amount column
                rowData.push(this.startDate);
                //Inserting the buttons ???
                rowData.push('<button type="button" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button type="button" class="btn btn-danger btn-xs dt-delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>');
                //Looping over columns is possible
                //var colCount = table.columns()[0].length;
                //for(var i=0; i < colCount; i++){			}

                //INSERT THE ROW
                table.row.add(rowData).draw(false);
            });

        });
        /*
        "id": 460,
        "self": "https://davidsbridal.atlassian.net/rest/agile/1.0/sprint/460",
        "state": "closed",
        "name": "HUB Sprint 3",
        "startDate": "2019-06-11T13:05:08.489Z",
        "endDate": "2019-06-28T13:05:00.000Z",
        "completeDate": "2019-06-27T20:42:51.567Z",
        "originBoardId": 185,
        "goal": ""
        */
        //Only needed for the filename of export files.
        //Normally set in the title tag of your page.
        document.title = 'Transaction Hub Sprints';
        // DataTable initialisation
        $('#example').DataTable({
            "dom": '<"dt-buttons"Bf><"clear">lirtp',
            "paging": false,
            "autoWidth": true,
            "columnDefs": [{
                "orderable": false,
                "targets": 5
            }],
            "buttons": [
                'colvis',
                'copyHtml5',
                'csvHtml5',
                'excelHtml5',
                'pdfHtml5',
                'print'
            ]
        });
        //Add row button
        $('.dt-add').each(function () {
            $(this).on('click', function (evt) {
                //Create some data and insert it
                var rowData = [];
                var table = $('#example').DataTable();
                //Store next row number in array
                var info = table.page.info();
                rowData.push(info.recordsTotal + 1);
                //Some description
                rowData.push('New Order');
                //Random date
                var date1 = new Date(2016, 01, 01);
                var date2 = new Date(2018, 12, 31);
                var rndDate = new Date(+date1 + Math.random() * (date2 - date1)); //.toLocaleDateString();
                rowData.push(rndDate.getFullYear() + '/' + (rndDate.getMonth() + 1) + '/' + rndDate.getDate());
                //Status column
                rowData.push('NEW');
                //Amount column
                rowData.push(Math.floor(Math.random() * 2000) + 1);
                //Inserting the buttons ???
                rowData.push('<button type="button" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button type="button" class="btn btn-danger btn-xs dt-delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>');
                //Looping over columns is possible
                //var colCount = table.columns()[0].length;
                //for(var i=0; i < colCount; i++){			}

                //INSERT THE ROW
                table.row.add(rowData).draw(false);
            });
        });
        //Edit row buttons
        $('.dt-edit').each(function () {
            $(this).on('click', function (evt) {
                $this = $(this);
                var dtRow = $this.parents('tr');
                $('div.modal-body').innerHTML = '';
                $('div.modal-body').append('Row index: ' + dtRow[0].rowIndex + '<br/>');
                $('div.modal-body').append('Number of columns: ' + dtRow[0].cells.length + '<br/>');
                for (var i = 0; i < dtRow[0].cells.length; i++) {
                    $('div.modal-body').append('Cell (column, row) ' + dtRow[0].cells[i]._DT_CellIndex.column + ', ' + dtRow[0].cells[i]._DT_CellIndex.row + ' => innerHTML : ' + dtRow[0].cells[i].innerHTML + '<br/>');
                }
                $('#myModal').modal('show');
            });
        });
        //Delete buttons
        $('.dt-delete').each(function () {
            $(this).on('click', function (evt) {
                $this = $(this);
                var dtRow = $this.parents('tr');
                if (confirm("Are you sure to delete this row?")) {
                    var table = $('#example').DataTable();
                    table.row(dtRow[0].rowIndex - 1).remove().draw(false);
                }
            });
        });
        $('#myModal').on('hidden.bs.modal', function (evt) {
            $('.modal .modal-body').empty();
        });
    });


}