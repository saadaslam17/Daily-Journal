import express from "express";
import bodyParser from "body-parser";
// import ejs from "ejs";
import _ from "lodash";

const homeStartingContent = "Welcome to Daily Journal, where every day is an opportunity to reflect and grow. Immerse yourself in a beautifully crafted digital sanctuary, designed to inspire your inner thoughts and creativity. Whether it's jotting down your daily musings, setting goals, or simply expressing gratitude, Daily Journal is your companion on the path to self-discovery. Join us and transform your everyday moments into lasting memories.";
const aboutContent = "Welcome to Daily Journal, your go-to source for insightful news and engaging stories.Our dedicated team of experienced journalists is committed to delivering accurate and timely information across a wide range of topics, from politics and business to technology and lifestyle.At Daily Journal, we believe in the power of truthful reporting and the importance of diverse perspectives. Our mission is to keep you informed, inspired, and connected with the world around you.Thank you for choosing Daily Journal. Let's stay informed and curious together.";
const contactContent = `
We'd love to hear from you! Whether you have questions, feedback, or news tips, feel free to reach out. Your input helps us improve and serve you better.`;



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("home.ejs", {
    startingContent: homeStartingContent,
    posts: posts
  });
});


app.get("/about", (req, res) => {
  res.render("about.ejs", { aboutContent: aboutContent });
});


app.get("/contact", (req, res) => {
  res.render("contact.ejs", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedtitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedtitle) {
      res.render("post.ejs", {
        title: post.title,
        content: post.content
      });
    }
  });
});










app.listen(3000, function () {
  console.log("Server started on port 3000");
});
