import React from "react";
import axios from "axios";
// import Joke from "./JokeCx";
import "./JokeList.css";

class JokeListCx extends React.Component {


    constructor(props) {

        super(props);
        this.numJokesToGet = 10;
        this.state = { jokes:[], random : "hello" }

    }

    componentDidMount() {

        console.log(this)

        const getJokes = async() => {
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

        if (this.state.jokes.length === 0) getJokes();

        console.log(this.state.jokes)
        console.log(this.state.random)
        console.log(this.numJokesToGet)

    }

    render () {

        return (
            <div>
                {this.state.jokes.map(j => <p>{j.joke}</p>)}
            </div>
        )

    }

}

export default JokeListCx;