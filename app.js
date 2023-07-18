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

  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      //amy append
      const appendFromAmy = (data) => `
    <h6 class="m-0"><b>${data.comments[0].user.username}</b></h6>
    <span>${data.comments[0].createdAt}</span>
  `;
      amyInfo.innerHTML += appendFromAmy(data);

      const appendFromAmy2 = (data) => `
     <p>${data.comments[0].content}
     </p>
   `;
      amyComment.innerHTML += appendFromAmy2(data);

      //max append
      const appendFromMax = (data) => `
      <h6 class="m-0"><b>${data.comments[1].user.username}</b></h6>
      <span>${data.comments[1].createdAt}</span>
    `;
      maxInfo.innerHTML += appendFromMax(data);

      const appendFromMax2 = (data) => `
       <p>${data.comments[1].content}
       </p>
     `;
      maxComment.innerHTML += appendFromMax2(data);
      //default replies ram
      const appendReplyRam = (data) => `
      <h6 class="m-0"><b>${data.comments[1].replies[0].user.username}</b></h6>
      <span>${data.comments[1].replies[0].createdAt}</span>

    `;
    ramInfo.innerHTML +=appendReplyRam(data);

    const appendReplyRam2 = (data) => `
    <p>"<b>@${data.comments[1].replies[0].replyingTo}</b> ${ data.comments[1].replies[0].content}
    "</p>
    `;
    ramReply.innerHTML += appendReplyRam2(data);

//julius
    const appendReplyJulius = (data) => `
    <h6 class="m-0"><b>${data.currentUser.username}</b></h6>
    <span>${data.comments[1].replies[1].createdAt}</span>

  `;
  juliusInfo.innerHTML +=appendReplyJulius(data);

  const appendReplyJulius2 = (data) => `
  <p>"<b>@${data.comments[1].replies[1].replyingTo}</b> ${ data.comments[1].replies[1].content}
  "</p>
  `;
  juliusReply.innerHTML += appendReplyJulius2(data);


      // creates new comment
      const createNewComment = (message) => `
<div id="comments">
    <div id="text-wrapper" class="pt-2">
      <div id="comment-info">
        <div id="first-info">
          <img src="./image-juliusomo.png" :alt="comment.user.username" />
          <h6 class="m-0"><b>amyrobson</b></h6>
          <span>1 month ago</span>
        </div>

        <div id="second-info">
          <img src="./icon-reply.svg" alt="reply" />
          <p class="m-0">Reply</p>
        </div>
      </div>

      <div id="comment-text" class="pt-2">
        <p>${message.text}</p>
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
        <span>2 week ago</span>
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

        const message = {
          text: commentInput.value,
        };
        juliusComment.innerHTML += createNewComment(message);
        commentInput.value = "";
      };

      //gets input value and appends reply
      const replyAppend = (e) => {
        e.preventDefault();

        const replytext = {
          reply: replyInput.value,
        };
        if (selectedButton === "amy") {
          replyToAmy.innerHTML += createNewReply(replytext);
          replyInput.value = "";
        }
        if (selectedButton === "max") {
          replyToMax.innerHTML += createNewReply(replytext);
          replyInput.value = "";
        }
        if (selectedButton === "rame") {
          replyToRame.innerHTML += createNewReply(replytext);
          replyInput.value = "";
        }
        replyForm.style.display = "none";
      };

      commentForm.addEventListener("submit", comment);
      replyForm.addEventListener("submit", replyAppend);

      //json data manipulation
    });
});
