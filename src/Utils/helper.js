export const getdateTime = () => {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }    
    var dateTime = day+'-'+month+'-'+year;
     return dateTime;
}
export function moneyConverter(value) {
     let dollarUSLocale = Intl.NumberFormat('en-US');
     return dollarUSLocale.format(value);
   }