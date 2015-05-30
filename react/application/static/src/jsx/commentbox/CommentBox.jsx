import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: this.props.data}
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      chache: false,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({date: date});
      },
      error: (xhr, status, err) => {
        console.err(this.props.url, status. err.toString());
      }
    });
  }

  componentDidMount () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
      </div>
    );
  }
}

CommentBox.defaultProps = {data: []};
