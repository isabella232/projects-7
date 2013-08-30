function WebyDashboard() {

    var $this = this;
    
    var webiesDataSource = new kendo.data.DataSource({
        data: myWebies,
        pageSize: 2
    });

    $("#webiesPager").kendoPager({
        dataSource: webiesDataSource,
        buttonCount: 5
    });

    $("#webiesList").kendoListView({
        dataSource: webiesDataSource,
        template: kendo.template('<div class="my-weby">${title}</div>'),
        selectable: "single"
    });

    // Bind My Webies
    $("#my-webies").click(function (e) {
        e.preventDefault();
       $this.open();
    });
    
    this.open = function(modal){
        if(typeof modal == "undefined"){
            modal = false;
        }

       $.fancybox($('#my-webies-dialog'), {
           modal: modal,
           type: 'inline',
           width:500,
           height: 400,
           autoSize: false
       });
    }
}