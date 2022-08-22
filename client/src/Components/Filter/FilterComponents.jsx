import React from "react";

const Close = (props) => {
  const { filterList, setFilterList, filters, setFilters, index, item } = props;
  return (
    <div
      onClick={() => {
        let tempFilters = structuredClone(filters);
        tempFilters.splice(index, 1)
        setFilters(tempFilters);
        let tempFilterList = structuredClone(filterList);
        tempFilterList.push(item);
        setFilterList(tempFilterList);
      }}>
      <img
        src="img/close.svg"
        style={{ "width": "15px" }}
        alt=""
      />
    </div>
  )
}

export const Boolean = (props) => {
  const { filterList, setFilterList, filters, setFilters, index, item } = props;
  const [switchState, setSwitchState] = React.useState(true)
  return (
    <div className="boolean">
      <div className="boolean-switch">
        <span>Yes/No</span>
        <div
          style={{ "display": "flex", "align-items": "center" }}
          onClick={() => setSwitchState(!switchState)}
        >
          {switchState &&
            <img
              src="img/switch-yes.svg"
              alt=""
            />
          }
          {!switchState &&
            <img
              src="img/switch-no.svg"
              alt=""
            />
          }
        </div>
      </div>
      <Close
        filterList={filterList}
        setFilterList={setFilterList}
        filters={filters}
        setFilters={setFilters}
        index={index}
        item={item}
      />
    </div>
  )
}

export const Range = (props) => {
  const { filterList, setFilterList, filters, setFilters, index, item } = props;
  return (
    <div className="range">
      <div className="range-header">
        <span>Range</span>
        <Close
          filterList={filterList}
          setFilterList={setFilterList}
          filters={filters}
          setFilters={setFilters}
          index={index}
          item={item}
        />
      </div>
      <div className="range-body">
        <input
          style={{ width: "40%", height: "20px" }}
          type="text"
        />
        <span>To</span>
        <input
          style={{ width: "40%", height: "20px" }}
          type="text"
        />
      </div>
    </div>
  )
}

export const DateRange = (props) => {
  const { filterList, setFilterList, filters, setFilters, index, item } = props;
  return (
    <div className="range">
      <div className="range-header">
        <span>Date Range</span>
        <Close
          filterList={filterList}
          setFilterList={setFilterList}
          filters={filters}
          setFilters={setFilters}
          index={index}
          item={item}
        />
      </div>
      <div className="range-body">
        <input
          style={{ width: "40%", height: "20px" }}
          type="date"
        />
        <span>To</span>
        <input
          style={{ width: "40%", height: "20px" }}
          type="date"
        />
      </div>
    </div>
  )
}

export const Select = (props) => {
  const { filterList, setFilterList, filters, setFilters, index, item } = props;
  return (
    <div className="select">
      <div className="select-header">
        <Close
          filterList={filterList}
          setFilterList={setFilterList}
          filters={filters}
          setFilters={setFilters}
          index={index}
          item={item}
        />
      </div>
      <select style={{ width: '100%' }} >
        <option value="">Number of Lines</option>
        <option value="">Market Cap</option>
        <option value="">Shares Outstanding</option>
        <option value="">Dividend Amount</option>
      </select>
    </div>
  )
}