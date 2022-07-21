import React, {Component} from 'react';

const SHEET_ID =  process.env.REACT_APP_SHEET_ID;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
var results = [];

class App extends Component {
  getSheetValues = async () =>{
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
    // return await Promise.all(promises);
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this.getSheetValues}>Analyse Sheet</button>
        <button onClick={this.updateSheetValues}>Update Sheet</button>
      </div>
    );
  }
}

export default App;