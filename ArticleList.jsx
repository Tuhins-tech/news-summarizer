const ArticleList = ({ articles, onSelect }) => (
  <div>
    {articles.map((article, i) => (
      <div key={i} className="article-card" onClick={() => onSelect(article)}>
        <h3>{article.title}</h3>
        <p>{article.source.name}</p>
        {article.urlToImage && <img src={article.urlToImage} alt="thumbnail" width="100" />}
      </div>
    ))}
  </div>
);

export default ArticleList;
