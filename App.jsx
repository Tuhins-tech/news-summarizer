import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('general');

  const fetchArticles = async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) throw new Error('Missing API Key in .env');

      const url = `https://newsapi.org/v2/top-headlines?${
        query ? `q=${query}&` : ''
      }category=${category}&country=us&apiKey=${apiKey}`;

      const { data } = await axios.get(url);

      if (!data.articles || data.articles.length === 0) {
        throw new Error('No articles found for this category.');
      }

      setArticles(data.articles);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError('⚠️ Could not fetch articles. Please check your internet connection or API key.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [category]); // 🔁 Fetch again if category changes

  return (
    <div>
      <Navbar onSearch={fetchArticles} />
      <Tabs onChangeCategory={(cat) => {
        setCategory(cat);
        setSelectedArticle(null); // Reset detail view on category change
      }} />
      {loading && <p>🔄 Loading articles...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        !selectedArticle ? (
          <ArticleList articles={articles} onSelect={setSelectedArticle} />
        ) : (
          <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
        )
      )}
    </div>
  );
};

export default App;
