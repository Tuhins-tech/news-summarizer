const categories = ['general', 'business', 'technology', 'health', 'sports'];

const Tabs = ({ onChangeCategory }) => (
  <div className="tabs">
    {categories.map((cat) => (
      <button key={cat} onClick={() => onChangeCategory(cat)}>{cat.toUpperCase()}</button>
    ))}
  </div>
);

export default Tabs;
