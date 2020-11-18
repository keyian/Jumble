import React from 'react';

import '../App.css';

class Post extends React.Component {

  state = {
    title: '',
    body: '',
    posts: []
  };

  componentDidMount = () => {
    console.log("in post");
};




  render() {
    //JSX
    return(
     <div className={this.props.className} key={this.props.key} style={{top: this.props.yLoc, left: this.props.xLoc}}>
         <h3>{this.props.title}</h3>
         <p>{this.props.body}</p>
    </div>
    );
  }
}

export default Post;
