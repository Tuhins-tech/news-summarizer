import React, { useState } from 'react';

const ArticleDetail = ({ article, onBack }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    setLoading(true);
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Summarize the following article in 3 bullet points:\n${article.title}\n${article.description}` }] }]
      })
    });
    const data = await res.json();
    setSummary(data.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary available');
    setLoading(false);
  };

  return (
    <div className="article-detail">
      <button onClick={onBack}>⬅ Back</button>
      <h2>{article.title}</h2>
      <img src={article.urlToImage} alt="" width="400" />
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Source:</strong> {article.source.name}</p>
      <p><strong>Date:</strong> {article.publishedAt}</p>
      <p>{article.description}</p>
      <button onClick={summarize}>✨ Summarize</button>
      {loading ? <p>Summarizing...</p> : <p>{summary}</p>}
    </div>
  );
};

export default ArticleDetail;
