$(document).ready(function(){
      $("#search").keyup(function(){
          var searchVal = $("#search").val();
          console.log(searchVal);
          $.get("/products/search/" + searchVal, function(results){
              $("#products").html(results)
             console.log(results);
            });
       });
 });
// $(document).ready(function(){
//     $('search').keyup(function() {
//       var Value = $('#search').val();
//       $.get("/categories/search/" + Value, function(results) {
//         $('#categories').html(results);
//       });
//     });
// });
