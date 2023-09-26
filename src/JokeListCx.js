import React from "react";
import axios from "axios";
import JokeCx from "./JokeCx";
import "./JokeList.css";

class JokeListCx extends React.Component {


    constructor(props) {

        super(props);
        this.numJokesToGet = 10;
        this.state = { jokes:[] }
        this.vote = this.vote.bind(this);
        this.generateNewJokes = this.generateNewJokes.bind(this);

    }

    componentDidMount() {

        if (this.state.jokes.length === 0) this.getJokes();

    }

    componentDidUpdate() {

        if (this.state.jokes.length === 0) this.getJokes();

    }

    getJokes = async() => {
        let j = [...this.state.jokes];
        let seenJokes = new Set();
        try {
          while (j.length < this.numJokesToGet) {

            let res = await axios.get("https://icanhazdadjoke.com", {
              headers: { Accept: "application/json" }
            });
            let { status, ...jokeObj } = res.data;
    
            if (!seenJokes.has(jokeObj.id)) {
              seenJokes.add(jokeObj.id);
              j.push({ ...jokeObj, votes: 0 });
            } else {
              console.error("duplicate found!");
            }
            
          }

          this.setState( {jokes : [...j]} );

        } catch (e) {
          console.log(e);
        }
    }

    generateNewJokes = () => {

        this.setState( {jokes : []});

    }

    vote = (id, delta) => {

        this.setState(st => ({
            jokes: st.jokes.map(j =>
              j.id === id ? { ...j, votes: j.votes + delta } : j
            )
          }));

    }

    render () {

        if (this.state.jokes.length) {
            let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
          
            return (
              <div className="JokeList">
                <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                  Get New Jokes
                </button>
          
                {sortedJokes.map(j => (
                  <JokeCx text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
                ))}
              </div>
            );
        }

        return null;

    }

}

export default JokeListCx;