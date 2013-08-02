var FileDragListener = function(){
    var $this = this;

    App.getContent().bind('dragenter', function (e) {
        $this.dragEnter(e);
    });

    this.dragEnter = function(e){
        console.log(e)
    }

    this.dragOver = function(e){

    }
}