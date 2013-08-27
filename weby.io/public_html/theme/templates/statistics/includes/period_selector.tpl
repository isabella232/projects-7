<div class="stat-title-bar">
    {$title}
    <select id="periodical-stats-period">
        <option value="today">Today</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
    </select>
    <input type="hidden" value="--EVENT--" id="stat_id"/>
</div>

<div id="sales_data"></div>

{* JS for getting period data and rendering Google graph *}
<script type="text/javascript">
    {literal}
    function viewReady() {
       var period = $('select#periodical-stats-period');
        getData(period.val());
        period.change(function () {
            getData($(this).val());
        })
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