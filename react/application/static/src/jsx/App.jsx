// import CommentBox from './commentbox/CommentBox.jsx';
import React from "react"
import Component from './flux/Component'

$(function(){
  // React.render(
  //   <CommentBox url="/api/comments.json" pollInterval={2000} />,
  //   document.getElementById('content')
  // );

  React.render(
    <Component />,
    document.getElementById('content')
  );
});
