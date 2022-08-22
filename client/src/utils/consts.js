export const FILTERTYPE = {
  RANGE: "range",
  DATERANGE: "dateRange",
  SELECT: "select",
  BOOLEAN: "boolean"
}

export const FILTERLIST = [
  {
    name: "markedtCap",
    value: "Market Cap",
    type: FILTERTYPE.RANGE
  },
  {
    name: "industry",
    value: "Industry",
    type: FILTERTYPE.SELECT
  },
  {
    name: "sector",
    value: "Sector",
    type: FILTERTYPE.RANGE
  },
  {
    name: "yearStockSrartedTrading",
    value: "Year Stock Started Trading",
    type: FILTERTYPE.DATERANGE
  },
  {
    name: "hasDividendsOrNot",
    value: "Has\"Dividends\"or not",
    type: FILTERTYPE.BOOLEAN
  },
  {
    name: "dividendAmount",
    value: "Dividend Amount",
    type: FILTERTYPE.RANGE
  },
  {
    name: "dividendDate",
    value: "Dividend Date",
    type: FILTERTYPE.RANGE
  },
  {
    name: "dateAnnouncementWasPublished",
    value: "Date Announcement Was Published",
    type: FILTERTYPE.DATERANGE
  },
  {
    name: "pe",
    value: "P/E",
    type: FILTERTYPE.RANGE
  },
  {
    name: "eps",
    value: "EPS",
    type: FILTERTYPE.RANGE
  },
  {
    name: "averageDailyVolume",
    value: "Average Daily Volume",
    type: FILTERTYPE.RANGE
  },
  {
    name: "lastPrice",
    value: "Last Price",
    type: FILTERTYPE.RANGE
  },
  {
    name: "lastTradeDate",
    value: "Last Trade Date",
    type: FILTERTYPE.DATERANGE
  },
  {
    name: "de-listingDate",
    value: "De-listing Date",
    type: FILTERTYPE.DATERANGE
  },
  {
    name: "foreignExempt",
    value: "Foreign Exempt",
    type: FILTERTYPE.BOOLEAN
  },
  {
    name: "shareType",
    value: "Share Type",
    type: FILTERTYPE.SELECT
  },
  {
    name: "securitiesOutstanding",
    value: "Securities Outstanding",
    type: FILTERTYPE.RANGE
  },
];

export const headerFormat = [];