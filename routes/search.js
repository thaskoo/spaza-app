$(document).ready(function(){
    $('search').keyup(function() {
      var Value = $('#search').val();
      $.get("/products/search/" + Value, function(results) {
        $('#products').html(results);
      });
    });
});

$(document).ready(function(){
    $('search').keyup(function() {
      var Value = $('#search').val();
      $.get("/categories/search/" + Value, function(results) {
        $('#categories').html(results);
      });
    });
});
