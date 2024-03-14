import mongoose from "mongoose";

export const connectToDb = async () => {
  const connection = {};
  try {
    // checks if there is already a connection
    if (connection.isConnected) {
      console.log("using existing connection");
      return;
    }
    // if there is no connection, it creates a new one
    const db = await mongoose.connect(process.env.MONGO);
    // it takes the first connection and checks if it is ready
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    // handleError(error);
    console.log(error);
    throw new Error(error);
  }
};
