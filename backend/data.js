// /backend/data.js
const mongoose = require("mongoose");
mongoose.pluralize(null)
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    ticker: String,
    title: String,
    search_text: String,
    document_date: String,
    release_date: String,
    market_cap: Number,
    url: String,
  },
  { timestamps: true }
);

const CompaniesSchema = new Schema(
  {
    ticker: String,
    name: String,
    website: String,
    document_date: Date,
    primary_share: [],
    gics_sector: String,
    gics_industry: String,
    listing_date: Date,
    principal_activities: String,
    delisting_date: Date,
    website: String,
    mailing_address: String,
    phone_number: String,
    fax_number: String,
    registry_name: String,
    registry_phone_number: String,
    foreign_exempt: String,
    products: [],
    last_dividend: [],
    Announcements: [],
    searchable_announcements: [],
  },
  { timestamps: true }
);


const Data = mongoose.model('searchable_announcements', DataSchema);
const Companies = mongoose.model('companies', CompaniesSchema);

module.exports = {
  Data, Companies
}