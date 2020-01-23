import { connect } from "mongoose";

export async function startConnection() {
  const db = await connect(process.env.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(db => console.log("Database Connected"))
    .catch(err => console.log("error " + err ));
}
