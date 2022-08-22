import './filter.css'

const FilterList = (props) => {
  const { filterList, setFilterList, filters, setFilters, setShowFilterList } = props;

  return (
    <div>
      <ul className="filterList">
        {filterList.map((item, index) => {
          return (
            <li
              style={{ cursor: "pointer" }}
              key={index}
              onClick={() => {
                let tempFilters = structuredClone(filters);
                tempFilters.push(item);
                setFilters(tempFilters);
                let tempFilterList = structuredClone(filterList);
                tempFilterList.splice(index, 1);
                setFilterList(tempFilterList);
                setShowFilterList(false)
              }}
            >
              {item.value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FilterList;