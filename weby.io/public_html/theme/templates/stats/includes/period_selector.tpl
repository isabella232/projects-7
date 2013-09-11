<div class="stat-title-bar">
    {$title}
    <select id="periodical-stats-period">
        <option value="day">Today</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
    </select>
    <input type="hidden" value="--EVENT--" id="stat_id"/>
</div>

<div id="sales_data">
    <div id="grid"></div>
</div>

{* JS for getting period data and rendering Google graph *}
<script type="text/javascript">
    {literal}
    function viewReady() {
        var period = $('select#periodical-stats-period');
        var webiesDataSource = new kendo.data.DataSource({
            type: "odata",
            serverPaging: true,
            pageSize: 10,
            transport: {
                read: {
                    url: WEB + 'stats/ajax-get-top-users-stats/?period=' + period.val(),
                    contentType: "application/json; charset=utf-8",
                    type: "GET",
                    dataType: "jsonp"
                }
            },
            schema: {
                model: kendo.data.Model.define({
                    id: "id"
                }),
                data: function (response) {
                    return response.webies;
                },
                total: function (response) {
                    return response.count;
                }
            },
            requestStart: function (e) {
                console.log('started')
            },
            requestEnd: function (e) {
                console.log('endeeed');
            }
        });

        $("#grid").kendoGrid({
            dataSource: webiesDataSource,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true
            },
            columns: [ {
                field: "FirstName",
                width: 90,
                title: "First Name"
            } , {
                field: "LastName",
                width: 90,
                title: "Last Name"
            } , {
                width: 100,
                field: "City"
            } , {
                field: "Title"
            } , {
                field: "BirthDate",
                title: "Birth Date",
                template: '#= kendo.toString(BirthDate,"dd MMMM yyyy") #'
            } , {
                width: 50,
                field: "Age"
            }
            ]
        });


       /*var period = $('select#periodical-stats-period');
        getData(period.val());
        period.change(function () {
            getData($(this).val());
        })*/
    }

    function getData(period) {
        var salesData = $('div#sales_data');
        var domain = $('select#domain-selector').val();

        $.ajax({
            type: "POST",
            url: WEB + 'statistics/ajax_get_{/literal}{$stat}{literal}_stats/?period=' + period,
            success: function (response) {
                salesData.hide().empty();
                salesData.append(response.data);
                if (response.error == false) {
                    drawChart();
                }
                salesData.show();
            }
        });
    }
    {/literal}
</script>