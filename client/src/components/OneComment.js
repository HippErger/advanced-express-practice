import React from "react";

function OneComment(props) {
  const comment = props.resultData;
  console.log("this is the comment found", comment);
  if (!comment) {
    return (
      <div>
        <h4>Comment not found</h4>
      </div>
    );
  }
  return (
    <div>
      <p>{comment.body}</p>
      <h6>{comment.postId}</h6>
    </div>
  );
}

export default OneComment;
