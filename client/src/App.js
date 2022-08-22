// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import * as PropTypes from "prop-types";
import { useState } from "react";
import "./App.css";
import PacmanLoader from "react-spinners/PacmanLoader";

import { FilterItem, FilterList } from './Components/Filter';
import { FILTERLIST } from './utils/consts';
import SearchBar from './Components/SearchBar';
import { exportCSV } from './utils/exportCSV';
import { headerFormat } from './utils/consts';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function View(props) {
  return null;
}

View.propTypes = { children: PropTypes.node };

function Text(props) {
  return null;
}

function MyForm() {

  const [data, setData] = useState([]) // what ever you put as an argument will be the default data until it is set
  const [err, setErr] = useState(null) // this will be our error state
  const [user_search, setName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();


    console.log(`Your Search was: ${user_search}`)

    const regex = /("[^"]+")|([^\s]+)/g;
    const result = user_search
      .match(regex)
      .map(s => s.replace(/"([^"]+)"/, '$1'))
    let search_obj = result

    axios.post('http://localhost:3001/api/searchData', { search_obj })
      .then(resp => {
        console.log("RESP", resp)
        setData(...resp['data']); // see here we call the state function
        setLoading(false);
      })
      // then(resp => {
      //
      // })
      .catch(err => {
        setErr(err) // and here for our error
      });

  }
  const [value, setValue] = React.useState('None');


  const handleChange = (event) => {
    setValue(event.target.value);
    let filter_by = event.target.value;
  };




  const [asc_desc_value, setasc_desc_value] = React.useState('None');

  const asc_desc_value_handleChange = (event) => {
    setValue(event.target.value);
    let filter_by = event.target.value;
  };
  let ticker_list = []
  for (let i in data) {
    ticker_list.push(data[i]['ticker'])
  }
  let uniqueArray = [...new Set(ticker_list)]

  const [showFilterList, setShowFilterList] = React.useState(false);
  const [filters, setFilters] = React.useState([]);
  const [filterList, setFilterList] = React.useState(FILTERLIST);

  const [loading, setLoading] = React.useState(false);
  const [inputed, setInputed] = React.useState(false);
  React.useEffect(() => {
    if (user_search !== "") setInputed(true);
    if (data.length > 0) setLoading(false);
  }, [user_search, data])

  return (
    <form onSubmit={handleSubmit}>
      <div className="bar-header">
        <h1>Announcement Search</h1>
        <div className={'p-2'}></div>
        <div className={''}>
          <div style={{ width: '100%' }} className={'row search-bar'}>
            <div className={'col-2'}>
              Enter Search Terms:
            </div>
            <SearchBar
              user_search={user_search}
              setName={setName}
              setLoading={setLoading}
            />
            <button
              onClick={() => exportCSV(data, headerFormat)}
              className="export-btn"
            >
              Export to CSV
            </button>
            <div className={'col-2'}>
              <h3 style={{ float: 'right', color: 'white' }}>
                Results:
                <span style={{ color: '#EEEEEE' }}>
                  {data.length}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className={'col-2 header leftBar'}>
        <div>
          <label style={{ width: '100%' }}>
            Sort By
            <select style={{ width: '100%' }} value={value} onChange={handleChange}>
              <option value="none">None</option>
              <option value="market_cap">Market Cap</option>
              <option value="dividend_amount">Dividend Amount</option>
              <option value="securities_outstanding">Securities Outstanding</option>
              <option value="pe">P/E</option>
              <option value="results_per_searched_document">Results Per Searched Document</option>
              <option value="announcement_release_date">Announcement Release Date</option>
              <option value="dividend_date">Dividend Date</option>
              <option value="last_price">Last Price</option>
              <option value="listing_date">Listing Date</option>

            </select>
          </label>
        </div>
        <div>
          <label style={{ width: '100%' }}>
            Ascending/Descending
            <select style={{ width: '100%' }} asc_desc_value={asc_desc_value} onChange={asc_desc_value_handleChange}>
              <option asc_desc_value="ascending">Ascending</option>
              <option asc_desc_value="descending">Descending</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Filter By
          </label>
          {filters.length > 0 && filters.map((filter, index) => (
            <FilterItem
              item={filter}
              key={index}
              filterList={filterList}
              setFilterList={setFilterList}
              filters={filters}
              setFilters={setFilters}
              index={index}
            />
          ))}
          <br />
          <button
            className="addFilterBtn"
            onClick={() => setShowFilterList(true)}>
            Add Filter
          </button>
          {showFilterList &&
            <FilterList
              filterList={filterList}
              setFilterList={setFilterList}
              filters={filters}
              setFilters={setFilters}
              setShowFilterList={setShowFilterList}
            />
          }
        </div>
      </div>
      <div className={'col-10'} style={{ overflow: 'auto', height: 'calc(100vh - 146px)', float: 'right' }}>
        <div >
          <h5 style={{ marginRight: '32px', display: 'flex', justifyContent: 'end', color: '#525252' }}
            className={'p-2'}
          >
            Unique Stocks:
            <span style={{ color: '#525252' }}>
              {uniqueArray.length}
            </span>
          </h5>
        </div>
        {loading &&
          <div className="sweet-loading">
            <PacmanLoader
              cssOverride={override}
              size={32}
              color={"#C02D1A"}
              loading={loading}
              speedMultiplier={1.5}
            />
          </div>
        }
        {!inputed
          ? <div className="sweet-loading"><h5>Enter Search Terms Above......</h5></div>
          : data.length === 0 && loading === false ? <div className="sweet-loading"><h5>There are no results</h5></div> :
            data.map((dat) => (
              <div style={{
                fontSize: "0.8rem",
                boxShadow: '1px 2px 9px #888888',
                margin: '8px',
                padding: '16px',
                borderRadius: '10px'
              }} >
                <div className="border p-3" style={{ padding: '10px' }} key={dat._id}>
                  <span style={{ color: 'gray' }}> Ticker: </span><b style={{ fontSize: '1.2rem', color: '#555555' }}> {dat.ticker} </b><br />
                  <span style={{ color: 'gray' }}> Number of Lines Found: </span><b style={{ color: '#555555' }}> {dat.line_length} </b><br />
                  <span style={{ color: 'gray' }}> Company Name: </span><b style={{ color: '#555555' }}> {dat.name} </b><br />
                  <span style={{ color: 'gray' }}> Release Date: </span><b style={{ color: '#555555' }}> {dat.release_date} </b><br />
                  <span style={{ color: 'gray' }}> Document Title: </span><b style={{ color: '#555555' }}> {dat.title}</b> <br />
                  <span style={{ color: 'gray' }}> Document URL: </span><b>  <a href={dat.url} target="_blank" rel="noopener noreferrer">{dat.title}</a> </b><br />
                  <Collapsible className={'border'} title="Company Info">
                    <div style={{ fontSize: '0.8rem' }}>
                      <span style={{ color: 'gray' }}> Industry: </span><b style={{ color: '#555555' }}> {dat.industry} </b><br />
                      <span style={{ color: 'gray' }}> Sector: </span><b style={{ color: '#555555' }}> {dat.sector} </b><br />
                      <span style={{ color: 'gray' }}> Market Cap: </span><b style={{ color: '#555555' }}> {(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dat.market_cap))} </b><br />
                      <span style={{ color: 'gray' }}> Listing Date: </span><b style={{ color: '#555555' }}> {dat.listing_date} </b><br />
                      <span style={{ color: 'gray' }}> Principal Activities: </span><b style={{ color: '#555555' }}> {dat.principal_activities} </b><br />
                      <span style={{ color: 'gray' }}> Last Price: </span><b style={{ color: '#555555' }}> {(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dat.last_price))} </b><br />
                      <span style={{ color: 'gray' }}> Last Trade Date: </span><b style={{ color: '#555555' }}> {dat.last_trade_date} </b><br />
                      <span style={{ color: 'gray' }}> Delisting Date: </span><b style={{ color: '#555555' }}> {dat.delisting_date} </b><br />
                      <span style={{ color: 'gray' }}> Website: </span><b style={{ color: '#555555' }}> {dat.website} </b><br />
                      <Collapsible className={'border'} title="Primary Share Info">
                        <div style={{ fontSize: '0.8rem' }}>
                          <span style={{ color: 'gray' }}> Share Type: </span><b style={{ color: '#555555' }}> {dat.share_type} </b><br />
                          <span style={{ color: 'gray' }}> Average Daily Volume: </span><b style={{ color: '#555555' }}> {new Intl.NumberFormat().format(dat.average_daily_volume)} </b><br />
                          <span style={{ color: 'gray' }}> PE: </span><b style={{ color: '#555555' }}> {dat.pe} </b><br />
                          <span style={{ color: 'gray' }}> EPS: </span><b style={{ color: '#555555' }}> {dat.eps} </b><br />
                          <span style={{ color: 'gray' }}> Securities Outstanding: </span><b style={{ color: '#555555' }}> {new Intl.NumberFormat().format(dat.securities_outstanding)} </b><br />
                          <span style={{ color: 'gray' }}> Foreign Exempt: </span><b style={{ color: '#555555' }}> {dat.foreign_exempt} </b><br />
                          {/*<span style={{color: 'gray'}}> All Matched Lines: </span><b style={{color: '#555555'}}> {dat.all_lines} </b><br/>*/}
                        </div>
                      </Collapsible>
                    </div>
                  </Collapsible>
                </div>
              </div>
            ))}
      </div>
    </form>


  )
}



Text.propTypes = { children: PropTypes.node };

class Collapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open })
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <div onClick={(e) => this.togglePanel(e)} className='header'>
          {this.props.title}
        </div>
        {this.state.open ? (
          <div className='content'>
            {this.props.children}
          </div>
        ) : null}
      </div>
    );
  }
}



class App extends Component {
  // initialize our state
  state = {
    data: [],
    _id: 0,
    ticker: '',
    primary_share: [],
    title: null,
    document_date: null,
    release_date: null,
    search_text: null,
    url: null,
    result_state: null,

  };

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  collapsible() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  render() {
    this.state = {
      loading: true,
    };
    const { data } = this.state;
    return (
      <div>
        <MyForm />

        {/*<div className="sweet-loading">*/}
        {/*    <PacmanLoader*/}
        {/*        cssOverride={override}*/}
        {/*        size={32}*/}
        {/*        color={"#C02D1A"}*/}
        {/*        loading={this.state.loading}*/}
        {/*        speedMultiplier={1.5}*/}
        {/*    />*/}
        {/*</div>*/}

      </div>
    );
  }
}

export default App;
