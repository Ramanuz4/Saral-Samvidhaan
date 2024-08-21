const constitutionContainer = document.getElementById("constitution-container");
const articleTitle = document.getElementById("article-title");
const articleContent = document.getElementById("article-content");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

let currentIndex = 0;
let constitutionData = [];

// Load the PDF file
const pdfUrl = "the_constitution_of_india.pdf";
const pdfDoc = await pdfjsLib.getDocument(pdfUrl);

// Extract the text from the PDF file
const text = await pdfDoc.getTextContent();
const textArray = text.items.map((item) => item.str);

// Split the text into individual articles
const articles = [];
let currentArticle = "";
textArray.forEach((line, index) => {
  if (line.trim() === "") {
    if (currentArticle !== "") {
      articles.push(currentArticle);
      currentArticle = "";
    }
  } else {
    currentArticle += line + " ";
  }
});
if (currentArticle !== "") {
  articles.push(currentArticle);
}

// Store the article data
constitutionData = articles.map((article, index) => {
  const [title, content] = article.split("\n");
  return { title, content };
});

const displayArticle = () => {
  const currentArticle = constitutionData[currentIndex];
  articleTitle.textContent = currentArticle.title;
  articleContent.textContent = currentArticle.content;
};

displayArticle();

previousButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayArticle();
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < constitutionData.length - 1) {
    currentIndex++;
    displayArticle();
  }
});
