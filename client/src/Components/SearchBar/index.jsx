import './style.css'

const SearchBar = (props) => {
  const { user_search, setName, setLoading } = props;
  const addStr = (str) => {
    var tc = document.getElementById("searchBox");
    var tclen = user_search.length;
    if (tc) console.log(tc.value)
    tc?.focus();
    if (typeof document.selection != "undefined") {
      document.selection.createRange().text = str;
    } else {
      if (tc) setName(
        user_search.substr(0, tc.selectionStart) +
        str +
        user_search.substring(tc.selectionStart, tclen))
    }
  }
  return (
    <div className={'col-6'}>
      <div style={{ display: 'flex', width: '100%', }}>
        <div className="search-container">
          <input
            id="searchBox"
            type="text"
            value={user_search}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => addStr(" AND ")}
          >
            AND
          </button>
          <button
            className="search-button"
            style={{ right: "10px" }}
            onClick={() => addStr(" OR ")}
          >
            OR
          </button>
        </div>
        <input style={{}} type="submit" onClick={() => setLoading(true)} />
      </div>
    </div>
  )
}

export default SearchBar;