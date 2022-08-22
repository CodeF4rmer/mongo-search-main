import { FILTERTYPE } from "../../utils/consts";
import { Boolean, Range, DateRange, Select } from "./FilterComponents";

const FilterItem = (props) => {
  const { item, filterList, setFilterList, filters, setFilters, index } = props;

  return (
    <div>
      <label>{item.value}</label>
      <div className="filterItemContainer">
        {item.type === FILTERTYPE.BOOLEAN &&
          <Boolean
            filterList={filterList}
            setFilterList={setFilterList}
            filters={filters}
            setFilters={setFilters}
            index={index}
            item={item}
          />}
        {item.type === FILTERTYPE.RANGE &&
          <Range
            filterList={filterList}
            setFilterList={setFilterList}
            filters={filters}
            setFilters={setFilters}
            index={index}
            item={item}
          />}
        {item.type === FILTERTYPE.DATERANGE &&
          <DateRange
            filterList={filterList}
            setFilterList={setFilterList}
            filters={filters}
            setFilters={setFilters}
            index={index}
            item={item}
          />}
        {item.type === FILTERTYPE.SELECT &&
          <Select
            filterList={filterList}
            setFilterList={setFilterList}
            filters={filters}
            setFilters={setFilters}
            index={index}
            item={item}
          />}
      </div>
    </div>
  )
}

export default FilterItem;