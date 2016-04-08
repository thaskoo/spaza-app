$(document).ready(function(){
    $('search').keyup(function() {
      var Value = $('#search').val();
      $.get("/products/search/" + Value, function(results) {
        $('#products').html(results);
      });
    });
});
