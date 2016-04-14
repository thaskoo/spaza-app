$(document).ready(function(){
      $("#search").keyup(function(){
          var searchVal = $("#search").val();
          console.log(searchVal);
          $.get("/products/search/" + searchVal, function(results){
              $("#products").html(results)
             console.log(results);
            });
  });
       $("#search").keyup(function(){
           var searchVal = $("#search").val();
           console.log(searchVal);
           $.get("/categories/search/" + searchVal, function(results){
               $("#categories").html(results)
              console.log(results);
             });
        });

  });
