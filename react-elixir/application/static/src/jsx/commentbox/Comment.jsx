export default class Comment extends React.Component {
  render() {
    var rawMarkup = marked(this.props.children.toString(), {senitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}