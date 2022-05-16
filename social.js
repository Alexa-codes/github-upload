//starting off with a function which will run on submit
form.addEventListener("submit", function (event) {
  event.preventDefault(); //stop page from resetting when submit is clicked

  //define variables
  const form = document.getElementById("form");
  let name = document.getElementById("name");
  let date = document.getElementById("date");
  let comment = document.getElementById("commentBox");
  let post = document.querySelector(".timeline");

  //if the name contains anything other than letters, the alert will populate
  var letters = /^[A-Za-z ]+$/;
  if (!name.value.match(letters)) {
    alert("Name must only contain letters");
  }
  //form validation for comment length
  else if (comment.value.length >= 500) {
    alert("Comment must be less than 500 characters");
  } else {
    //use split to separate the date at each dash, into an array. Then rearrange it by posting each individual array element in the proper order and connecting with dashes
    var miniDate = date.value.split("-");
    //using innerHTML to pull the name, date, and comment data into the new row for each comment
    post.innerHTML += `
     <tr>
         <td>${name.value}</td> 
         <td>${comment.value}</td>
         <td>${`${miniDate[1]}-${miniDate[2]}-${miniDate[0]}`}</td>
         <td>
              <form>
                <select class="options">
                  <option value=""></option>
                  <option value="comment-edit">Edit Post</option>
                  <option value="comment-save">Save Post</option>
                  <option value="comment-delete">Delete Post</option>
                </select>
              </form>
            </td>
     </tr>
     `;
  }
});
//Dropdown menu

//Using consitionals to give functionality to the delete, edit and save buttons

const selectElement = document.querySelector("#comment-table");
//used an inbuilt function to listen for changes to the comment table
selectElement.addEventListener("change", (event) => {
  //when delete is selected, that row will be removed via .remove and parent nodes
  if (event.target.value == "comment-delete") {
    event.target.parentNode.parentNode.parentNode.remove();
  }
  //used contentEditable property to allow editing when the edit option is selected
  else if (event.target.value == "comment-edit") {
    event.target.parentNode.parentNode.parentNode.setAttribute(
      "contentEditable",
      true
    );
  }
  //When save is selected, content will not be editable
  else if (event.target.value == "comment-save") {
    event.target.parentNode.parentNode.parentNode.setAttribute(
      "contenteditable",
      false
    );
  }
});

//search bar functionality

function searchNames() {
  var input, filter, table, tr, td, i, txtValue;
  //we are pulling data from the search bar entries
  input = document.getElementById("search");
  //all cases will be accepted using toUpperCase
  filter = input.value.toUpperCase();
  //identifying the table
  table = document.getElementById("comment-table");
  //identifying the table rows (which we will be targeting)
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    //looping through the rows
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      //looking at the inner text of the table rows (comments)
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //if the text of the table row matches the text of the search bar
        //the table row will display
        tr[i].style.display = "";
      } else {
        //and if they do not match, the table rows will not display
        tr[i].style.display = "none";
      }
    }
  }
}
