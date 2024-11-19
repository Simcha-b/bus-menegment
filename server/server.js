import app from "./app.js";
import path from "path";

const port = process.env.PORT || 3001;

// // Serve static files from the React app's build directory
// app.use(express.static(path.join(__dirname, "client/build")));

// // For any other routes, serve the React app's index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
