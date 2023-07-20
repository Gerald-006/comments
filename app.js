document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment");
  const juliusComment = document.getElementById("juliusComment");
  const amysReplyButton = document.getElementById("amys-reply-button");
  const maxsReplyButton = document.getElementById("maxs-reply-button");
  const ramesreplyButton = document.getElementById("rames-reply-button");
  const replyForm = document.getElementById("reply-popup");
  const replyInput = document.getElementById("replyinput");
  const replyToAmy = document.getElementById("reply-to-amy");
  const replyToMax = document.getElementById("reply-to-max");
  const replyToRame = document.getElementById("reply-to-rame");
  const deleteButton = document.getElementById("delete");
  const editButton = document.getElementById("edit");
  const computedStyle = window.getComputedStyle(replyForm);
  const display = computedStyle.getPropertyValue("display");
  const agreeingReply = document.querySelector(".agreeing-reply");
  const amyInfo = document.querySelector(".amy-info");
  const amyComment = document.querySelector(".amy-comment");
  const maxInfo = document.querySelector(".max-info");
  const maxComment = document.querySelector(".max-comment");
  const ramInfo = document.querySelector(".ram-info");
  const ramReply = document.querySelector(".ram-reply");
  const juliusInfo = document.querySelector(".julius-info");
  const juliusReply = document.querySelector(".julius-reply");

  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => {
      const comments = data.comments;

      //amy append
      const appendFromAmy = (data) => `
    <h6 class="m-0"><b>${data[0].user.username}</b></h6>
    <span>${data[0].createdAt}</span>
  `;
      amyInfo.innerHTML += appendFromAmy(data);

      const appendFromAmy2 = (data) => `
     <p>${data[0].content}
     </p>
   `;
      amyComment.innerHTML += appendFromAmy2(data);

      //max append
      const appendFromMax = (data) => `
      <h6 class="m-0"><b>${data[1].user.username}</b></h6>
      <span>${data[1].createdAt}</span>
    `;
      maxInfo.innerHTML += appendFromMax(data);

      const appendFromMax2 = (data) => `
       <p>${data[1].content}
       </p>
     `;
      maxComment.innerHTML += appendFromMax2(data);
      //default replies ram
      const appendReplyRam = (data) => `
      <h6 class="m-0"><b>${data[1].replies[0].user.username}</b></h6>
      <span>${data[1].replies[0].createdAt}</span>

    `;
      ramInfo.innerHTML += appendReplyRam(data);

      const appendReplyRam2 = (data) => `
    <p>"<b>@${data[1].replies[0].replyingTo}</b> ${data[1].replies[0].content}
    "</p>
    `;
      ramReply.innerHTML += appendReplyRam2(data);

      //julius

      fetch("http://localhost:3000/currentUser")
        .then((response) => response.json())
        .then((datA) => {
          const appendReplyJulius = (datA) => `
    <h6 class="m-0"><b>${datA.username}</b></h6>
    <span>${data[1].replies[1].createdAt}</span>

  `;
          juliusInfo.innerHTML += appendReplyJulius(data);

          const appendReplyJulius2 = (data) => `
  <p>"<b>@${data[1].replies[1].replyingTo}</b> ${data[1].replies[1].content}
  "</p>
  `;
          juliusReply.innerHTML += appendReplyJulius2(data);
        });

      
      // creates new comment
      const createNewComment = (lastEntry) => `
<div id="comments">
    <div id="text-wrapper" class="pt-2">
      <div id="comment-info">
        <div id="first-info">
          <img src="./image-juliusomo.png" :alt="comment.user.username" />
          <h6 class="m-0"><b>amyrobson</b></h6>
          <span>${lastEntry.createdAt}</span>
        </div>

        <div id="second-info">
          <img src="./icon-reply.svg" alt="reply" />
          <p class="m-0">Reply</p>
        </div>
      </div>

      <div id="comment-text" class="pt-2">
        <p>${lastEntry.content}</p>
      </div>
    </div>
  </div>
    
    `;
    

      //creates new reply
      const createNewReply = (replytext) => `
  <div id="reply">
  <div id="text-wrapper">
    <div id="comment-info">
      <div id="first-info">
        <img src="./image-juliusomo.png" alt="ramsemiron" />
        <h6><b>juliusomo</b></h6>
        <span>${replytext.timestamp}</span>
      </div>

      <div id="second-info">
        <span id="delete">
          <img src="./icon-delete.svg" alt="reply" />
          Delete
        </span>

        <span id="edit">
          <img src="./icon-edit.svg" alt="reply" />
          Edit
        </span>
      </div>
    </div>

    <div id="comment-text" class="pt-2">
      <p>
        <b>@ramsemiron</b>
        ${replytext.reply}
      </p>
    </div>
  </div>
</div>
    
    `;
      // toggle  reply form function
      const toggleReplyForm = () => {
        if (display === "none") {
          replyForm.style.display = "flex";
        } else {
          replyForm.style.display = "none";
        }
      };
      let selectedButton = null;

      //buttons
      // reply buttons
      ramesreplyButton.addEventListener("click", function () {
        selectedButton = "rame";
        toggleReplyForm();


      });
      maxsReplyButton.addEventListener("click", function () {
        selectedButton = "max";
        toggleReplyForm();
      });
      amysReplyButton.addEventListener("click", function () {
        selectedButton = "amy";
        toggleReplyForm();
      });
      //delete and edit buttons
      deleteButton.addEventListener("click", () => {
        agreeingReply.remove();
      });
      editButton.addEventListener("click", () => {
        if (agreeingReply.contentEditable === "false") {
          agreeingReply.contentEditable = "true";
        } else {
          agreeingReply.contentEditable = "false";
        }
      });

      // gets input value and appends comment
      const comment = (e) => {
        e.preventDefault();
        const timestamp = new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const message = {
          text: commentInput.value,
          timestamp: timestamp,
        };
        //Add the new comment to the comments array
        const newComment = {
          id: comments.length + 1,
          content: commentInput.value,
          createdAt: timestamp,
          score: 0,
          user: {
            image: {
              png: "./image-juliusomo.png",
              webp: "./image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          replies: [],
        };
        comments.push(newComment);
        //write to json file
        const updatedData = { comments: comments };
       
        fetch("http://localhost:3000/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        })
          .then((response) => {
            const lastEntry = comments[comments.length - 1];
            juliusComment.innerHTML += createNewComment(lastEntry);
            commentInput.value = "";
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
          
       
      };

      


      //gets input value and appends reply
      const replyAppend = (e) => {
        e.preventDefault();
        const timestamp = new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const replytext = {
          reply: replyInput.value,
          timestamp: timestamp,
        };


        const appendNewReplyToJSON = (commentId, reply) => {
          const replyObject = {
            id: comments.length + 1, // Assign a unique ID for the new reply (you may use a different method to generate unique IDs)
            content: replyInput.value, // Extract the reply content from the input data
            createdAt:timestamp, // Extract the timestamp from the input data
            score: 0, // Initialize the reply score to 0 or any default value you prefer
            user: {
              image: {
                png: "./image-juliusomo.png",
                webp: "./image-juliusomo.webp",
              },
              username: "juliusomo",
            },
            replyingTo: "", // Set this to an empty string since it's a new reply
          };
        
          // Find the comment in the comments array with the specified commentId
          const comment = comments.find((c) => c.id === commentId);
          if (comment) {
            // Add the new reply to the replies array of the comment
            comment.replies.push(replyObject);
          }
        
          // Update the JSON data on the server
        
  
          fetch("http://localhost:3000/comments", {
            method: "POST", // Assuming you are using PUT to update the JSON data on the server
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(replyObject),
          })
            .then((response) => {
              // Handle the response here if needed

            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };

        if (selectedButton === "amy") {
          replyToAmy.innerHTML += createNewReply(replytext);
          replyInput.value = "";
          appendNewReplyToJSON(1, replytext);
        }
        if (selectedButton === "max") {
          replyToMax.innerHTML += createNewReply(replytext);
          replyInput.value = "";
          appendNewReplyToJSON(2, replytext);
        }
        if (selectedButton === "rame") {
          replyToRame.innerHTML += createNewReply(replytext);
          replyInput.value = "";
          appendNewReplyToJSON(3, replytext);
        }
        replyForm.style.display = "none";
       
      };

      commentForm.addEventListener("submit", comment);
      replyForm.addEventListener("submit", replyAppend);
    });
});
