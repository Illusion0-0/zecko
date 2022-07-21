import React, {Component} from 'react';
import './App.css';

const SHEET_ID =  process.env.REACT_APP_SHEET_ID;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
var results = [];

class App extends Component {
  getSheetValues = async () =>{
    console.log("We're analysing the sheet");
    const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/'Pre program run'`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`  
    }
    });

    const data = await request.json();
    // console.log(data.values);
    const urls = [];
    const categories = ["shopify", "woocommerce", "bigcommerce", "magento","Not found"];
    data.values.forEach(row => {
      urls.push(row[0]);
    }
    );
    urls.shift();
    // console.log(urls);
    const requests = urls.map((url) => fetch(`https://cryptic-chamber-68777.herokuapp.com/${url}`)); 
    const responses = await Promise.all(requests); 
    const promises = responses.map((response) => response.text());
    const texts = await Promise.all(promises);
    console.log(texts);
    results = texts.map((text) => {
      let result={};
      for(let i=0; i<categories.length; i++){
        if(text.includes(categories[i])==true && categories[i]!="Not found")
        {result = categories[i].toUpperCase();break;}
        else if(text.includes(categories[i])==true && categories[i]=="Not found")
        {result = "NOT_WORKING";break;}
        else result = "OTHERS";
        
      }
      return result;
    }
    );
    console.log(results);
    results.unshift("Category");
    // return await Promise.all(promises);
  }

  updateSheetValues = () => {
    console.log("Updating sheet");
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //update this token with yours. 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({

        requests: [{
          updateCells: {
              "rows": results.map((result, index) => {
                return {
                  values: [{
                    userEnteredValue: {
                      stringValue: result
                    }
                  }]
                }
              }
              ),
              "fields": "*",

              
              "start": {
                "sheetId": 0,
                "rowIndex": 0,
                "columnIndex": 1
              }
          }
        }]

      })
    })
  }


  
  render() {
    return (
      <div className="App">
        <div className="zecko">
        <button className="btn btn-striped-shadow btn-striped-shadow--purple" onClick={this.getSheetValues}> 
        <span>Analyse Sheet</span> 
        </button>
        <button className="btn btn-striped-shadow btn-striped-shadow--green" onClick={this.updateSheetValues}> 
        <span>Update Sheet</span> 
        </button>
        </div>
      </div>
    );
  }
}

export default App;