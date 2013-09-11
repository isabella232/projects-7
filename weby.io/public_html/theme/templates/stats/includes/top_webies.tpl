<table class="stat-std-grid bordered">
    <thead>
    <tr>
        <th column="place" class="header">#</th>
        <th column="product" class="header">Title</th>
        <th column="product" class="header">ID</th>
        <th column="product" class="header">User</th>
        <th column="quantity_sold" class="header">Created on</th>
        <th column="quantity_sold" class="header">Hits</th>
        <th column="quantity_sold" class="header">View</th>
    </tr>
    </thead>
    <tbody>
    {foreach from=$webies key=key item=val}
        <tr>
            <td>{$key+1}</td>
            <td>{$val.title}<br/></td>
            <td>{$val.id}<br/></td>
            <td>{$val.username}</td>
            <td>{$val.created_on}</td>
            <td>{$val.value}</td>
            <td><a target="_blank" href="{$webPath}{$val.username}/{$val.slug}/{$val.id}">View</a></td>
        </tr>
    {/foreach}
    </tbody>

    <tfoot>
    </tfoot>

</table>

<div class="stat-title-bar">
    Graphical display
</div>


<div id="chart_div" style="width:100%"></div>
{literal}
<script type="text/javascript">

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        {/literal}
        var chartData = [
            ['', 'Hits count'],
            {foreach from=$webies key=key item=val}
            ['{$val.title}', {$val.value}],
            {/foreach}
        ];
        {literal}

        data = google.visualization.arrayToDataTable(chartData);

        var options = {
            title: {/literal}'Hits'{literal},
            height: 400,
            width: 800,
            legend: {position: 'none'},
            hAxis: {slantedText: true,
                slantedTextAngle: 110,
                titleTextStyle: {color: 'orange'},
                textStyle: {fontName: 'Verdana'}
            },
            chartArea: {top: 50, height: 250, width: 700}
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    function ucfirst(str) {
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
    }

</script>
{/literal}
