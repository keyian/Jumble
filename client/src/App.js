import React from 'react';
import axios from 'axios';
import './App.css';
import Post from './components/Post.js';



class App extends React.Component {

  state = {
    title: '',
    body: '',
    posts: [],
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data});
        // this.generateRandomPosition(this.state.posts.length);
        console.log('Data has been received');
      })
      .catch(() => {
        alert('Error retrieving data!!');
      })
  }

  //target is the element that triggered the event. in this case it's input
  handleChange = ({target}) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  submit = (event) => {
    event.preventDefault();

    //object to be POST'd
    const payload = {
      title: this.state.title,
      body: this.state.body,
      xLoc: Math.random()*5000,
      yLoc: Math.random()*5000
    };
    //use axios to POST
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
      })
      .then(() => {
        console.log('Data has been sent to the server');
        //reset contents of textboxes
        this.resetUserInputs();
        //get the blogpost list again
        this.getBlogPost();
      })
      .catch((e) => {
        //spit this out 
        console.log("Axios error called in submit function, server error: ", e);
      });
  };

  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });
  };
  
  displayBlogPost = (posts) => {
    if(!posts.length) return null;
    return posts.map((post, index) => (
      <Post key={index} className="blog-post__display" title={post.title} body={post.body} xLoc={post.xLoc} yLoc={post.yLoc} />
    ));
  }

  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <Post name="something" />
        <header>jumble</header>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
             />
          </div>
          <div className="form-input">
            <textarea name="body" placeholder="Body" cols="30" rows="10" value={this.state.body} onChange={this.handleChange}></textarea>
          </div>

          <button>Submit</button>
        </form>
        {this.displayBlogPost(this.state.posts)}
      </div>
      
    );
  }
}

export default App;
