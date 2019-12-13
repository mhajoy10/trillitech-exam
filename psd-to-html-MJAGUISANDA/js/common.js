$(document).ready(function(){
	$("#slideMenu").click(function(event){
        event.stopPropagation();
         $("#slideContent").slideToggle();
    });

    $("#slideContent").on("click", function (event) {
        event.stopPropagation();
    });
	
});

$(document).on("click", function () {
	$("#slideContent").hide();
});