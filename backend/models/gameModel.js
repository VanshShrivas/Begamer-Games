import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();


const gameSchema = new mongoose.Schema({
  title:String,
  description:String,
  image:String,
  link:String,
});

const Game = mongoose.model("Game", gameSchema); // this creates(if not) the "Game"->"games" naam ka database 

export default Game;
