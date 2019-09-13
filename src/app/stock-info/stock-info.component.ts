import { Component, OnInit } from '@angular/core';
import { StockInfoService } from '../service/stock-info.service';
import { jsonpCallbackContext } from '../../../node_modules/@angular/common/http/src/module';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  userdata;
  title = 'Stock Information';
  successMessage: string;
  failMessage: string;
  userName: string;
  stockList;
  mandatoryField:string;
  stocksFromStock;
  toggleHistory:boolean = false;
  toggleQuotes:boolean = false;
  constructor(private _stockInfo: StockInfoService) { }

  ngOnInit() {
  }

  saveUser(frm){
    var form = frm;
    console.log("form"+ form.value.quotes);
    if(frm.value.userName === undefined){
      this.failMessage = "UserName or Stocks cannot be empty!!";
    }else if (form.value.quotes === undefined || form.value.quotes == ""){
      this.failMessage = "Quotes cannot be empty!!";
    }else {
      this.failMessage = "";
      var words = frm.value.quotes.split(',');
      this._stockInfo.createUser(frm.value.userName, words)
        .subscribe(data =>{
           this.userdata = data;
            if(data.statusText == "OK" || data.status ==200){
              console.log(this.userdata);
               this.successMessage ="User quote successfully saved into database!!"
            }else{
              this.failMessage = "There is a problem at server side. Please try again";
            }
        });
    }
  }
  getStocks(){
    this.toggleQuotes = !this.toggleQuotes;
    console.log(this.userName+"  username");
    if(this.userName !== undefined && this.userName !== ""){
      this.failMessage = "";
      var data = this._stockInfo.getStocks(this.userName)
      .subscribe(data =>{
        var body = data._body;
        this.stockList = JSON.parse(body);
        console.log(this.stockList[0]);
        console.log(this.stockList);
      })
    }else {
      console.log("username is empty");
      this.stockList = "";
      this.failMessage = "UserName cannot be empty!!";
    }
    
  }

  saveStock(stock){
    console.log(this.userName);
    console.log(stock)
    if(this.userName === undefined || stock === undefined){
      this.failMessage = "UserName or Stocks cannot be empty!!";
    }else{
      this.failMessage = "";
      let body = JSON.stringify({
        userName: this.userName,
        stocks: [
          {
            "quoteName": stock.quote,
            "price": stock.price
          }
      ]
      });
      this._stockInfo.saveStocks(body)
      .subscribe(data =>{
        this.userdata = data;
        if(data.statusText == "OK" || data.status ==200){
          console.log(this.userdata);
          this.successMessage ="User stock successfully saved into database!!"
        }else{
          this.failMessage = "There is a problem at server side. Please try again";
        }
    });
    }
  }

  getStockHistory(){
    if(this.userName === undefined){
      this.failMessage = "UserName cannot be empty!!";
    }else{
      this.failMessage = "";
      this.toggleHistory = ! this.toggleHistory;
      console.log(this.userName);
      this._stockInfo.getStockHistory(this.userName, null)
        .subscribe(data =>{
          var body = data._body;
          this.stocksFromStock = JSON.parse(body);
          //console.log(this.stockList[0]);
          //console.log(this.stockList);
        })
    }
   
  }
  }
