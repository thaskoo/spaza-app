<table>
     <tr><td>Enter Search Term:
     <input type="text" name="searchword" />
     <input type="button" name="searchbutton" value="Search" onclick="contentDisp();">
     </td></tr>
     <tr><td><textarea id="contentArea" rows="40" cols="60"></textarea></td></tr>
   </table>  //currently using text area but ideally this would be displayed in a table
 <script type="text/javascript">
function contentDisp() {
          $.ajax({
              url : "file.csv",
              success : function (data) {
                  $("#contentArea").html(data); // I THINK SOMETHING NEEDS TO GO IN HERE, WHICH WILL GRAB THE SEARCH TERM ABOVE AND THEN ONLY DISPLAY FILE CONTENTS USING THAT TERM, POSSIBLY 'CONTAIN' */
              }
          });
      }
      </script>
