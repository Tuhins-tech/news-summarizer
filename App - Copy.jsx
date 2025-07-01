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

  const fetchArticles = async (cat = 'general') => {
    setLoading(true);
    setError('');
    try {
      const endpoint = query =>
        `https://newsapi.org/v2/top-headlines?${
          query ? `q=${query}&` : ''
        }category=${cat}&country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;

      const { data } = await axios.get(endpoint());
      if (!data.articles || data.articles.length === 0) throw new Error('No results');
      setArticles(data.articles);
    } catch (err) {
      console.error(err);
      setError('⚠️ Could not fetch articles. Check your internet or API key.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <Navbar onSearch={fetchArticles} />
      <Tabs onChangeCategory={(cat) => { setCategory(cat); fetchArticles(cat); }} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!selectedArticle ? (
        <ArticleList articles={articles} onSelect={setSelectedArticle} />
      ) : (
        <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
      )}
    </div>
  );
};

export default App;
