import React from "react";
import axios from "axios";
// import JokeCx from "./JokeCx";
import Joke from "./Joke";

import "./JokeList.css";

class JokeListCx extends React.Component {


    constructor(props) {

        super(props);
        this.numJokesToGet = 10;
        this.state = { jokes:[], random : "hello" }
        this.vote = this.vote.bind(this);
        this.generateNewJokes = this.generateNewJokes.bind(this);

    }

    // Defined here ...
    getJokes = async() => {
        console.log(this)
        let j = [...this.state.jokes];
        let seenJokes = new Set();
        try {
          while (j.length < this.numJokesToGet) {
            console.log("calling")
            console.log(j)
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

        this.setState({jokes : [ ...(allJokes) => {

            allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))

        }]});

    }

    componentDidMount() {

        // Was defined here...

        if (this.state.jokes.length === 0) this.getJokes();

    }

    render () {

        // return (
        //     <div>
        //         {this.state.jokes.map(j => <p>{j.joke}</p>)}
        //     </div>
        // )

        // return (

        //     <div className="JokeList">
        //     <button className="JokeList-getmore" onClick={this.generateNewJokes}>
        //       Get New Jokes
        //     </button>
      
        //     {this.state.jokes.map(j => (
        //       <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
        //     ))}
        //   </div>

        // )

        if (this.state.jokes.length) {
            let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
          
            return (
              <div className="JokeList">
                <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                  Get New Jokes
                </button>
          
                {sortedJokes.map(j => (
                  <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
                ))}
              </div>
            );
        }

        return null;

    }

}

export default JokeListCx;