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

$(document).ready(function(){
    $('search').keyup(function() {
      var Value = $('#search').val();
      $.get("/sales/search/" + Value, function(results) {
        $('#sales').html(results);
      });
    });
});
