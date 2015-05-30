import CommentBox from './commentbox/CommentBox.jsx';

$(function(){
  React.render(
    <CommentBox url="/api/comments.json" pollInterval={2000} />,
    document.getElementById('content')
  );
});
