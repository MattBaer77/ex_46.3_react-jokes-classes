import React from "react";
import "./Joke.css";

class JokeCx extends React.Component {

    constructor(props) {

        super(props);

        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);

    }

    upVote() {
        
    }



    render() {

        return (
            <div className="Joke">
              <div className="Joke-votearea">
                <button onClick={upVote}>
                  <i className="fas fa-thumbs-up" />
                </button>
        
                <button onClick={downVote}>
                  <i className="fas fa-thumbs-down" />
                </button>
        
                {votes}
              </div>
        
              <div className="Joke-text">{text}</div>
            </div>
          );

    }


}