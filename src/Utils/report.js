import moment from "moment";
function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
export function formatBillRevuene(contentReport, start, end){
  // Init //
    const res =[];
    let dateEnd = moment(end);
    let FULLDATES = getDatesInRange(new Date(start), new Date(end)); //moment(FULLDATES[i]).format("YYYY-MM-DD")
    
    for( let i = 0; i < FULLDATES.length; i++){
      if (contentReport[moment(FULLDATES[i]).format("YYYY-MM-DD")] === undefined){
        res.unshift({
          date: moment(FULLDATES[i]).format("YYYY-MM-DD"),
          category: "Doanh thu",
          value: 0,
        });
        res.unshift({
          date: moment(FULLDATES[i]).format("YYYY-MM-DD"),
          category: "Đơn hàng",
          value: 0,
        })
      }
    }

  // ---- //
    
    const dates = Object.getOwnPropertyNames(contentReport);
    for(let i=0; i<dates.length; i++){
      let foo = {
        date: dates[i],
        category: 'Đơn hàng',
        value: contentReport[dates[i]].length,
      }
      
      let money=0;
      for(let j=0; j<contentReport[dates[i]].length; j++){
        money += contentReport[dates[i]][j].totalPrice;
      }
      let bar = {
        date: dates[i],
        category: 'Doanh thu',
        value: money
      }

      res.unshift(foo);
      res.unshift(bar);
    }
    return res;
}

export function formatImporter(contentReport, start, end){
  const res = [];
  // Init
  let dateEnd = moment(end);
  let FULLDATES = getDatesInRange(new Date(start), new Date(end)); //moment(FULLDATES[i]).format("YYYY-MM-DD")
  
  for( let i = 0; i < FULLDATES.length; i++){
    if (contentReport[moment(FULLDATES[i]).format("YYYY-MM-DD")] === undefined){
      res.unshift({
        date: moment(FULLDATES[i]).format("YYYY-MM-DD"),
        category: "Số đơn nhập",
        value: 0,
      });
      res.unshift({
        date: moment(FULLDATES[i]).format("YYYY-MM-DD"),
        category: "Chi phí",
        value: 0,
      })
    }
  }
  //
  const dates = Object.getOwnPropertyNames(contentReport);

  for(let i=0; i<dates.length; i++){
    let foo = {
      date: dates[i],
      category: 'Số đơn nhập',
      value: contentReport[dates[i]].length,
    }

    let money=0;
    for(let j=0; j<contentReport[dates[i]].length; j++){
      money += contentReport[dates[i]][j].totalPrice;
    }
    let bar = {
      date: dates[i],
      category: 'Chi phí',
      value: money
    }

    res.unshift(foo);
    res.unshift(bar);
  }

  return res;
}

export function CalSummary(data){
  let numberOfSales = 0;
  let numberOfImporter = 0;
  let revenue =  0;
  let cost = 0;

  for(let i = 0; i< data.length; i++){
    if(data[i].category === 'Đơn hàng'){
      numberOfSales += parseInt(data[i].value);
    }
    if(data[i].category === 'Doanh thu'){
      revenue += parseInt(data[i].value);
    }
    if (data[i].category === 'Số đơn nhập'){
      numberOfImporter += parseInt(data[i].value);
    }
    if (data[i].category === 'Chi phí'){
      cost += parseInt(data[i].value)
    }
  }
  return {
    numberOfSales,
    numberOfImporter,
    revenue,
    cost
  }
}

export function formatDataTable(data){
  const n = data.length/4;
  const res = [];
  for(let i=0; i<n;i++){
    let nS = 0;
    let nI = 0;
    let r = 0;
    let c = 0;
    
    switch(data[4*i].category){ 
      case 'Doanh thu':
        r = data[4*i].value;
        break;
      case 'Đơn hàng':
        nS = data[4*i].value;
        break;
      case 'Số đơn nhập':
        nI = data[4*i].value;
        break;
      case 'Chi phí':
        c = data[4*i].value;
        break;
    }
    switch(data[4*i + 1].category){ 
      case 'Doanh thu':
        r = data[4*i + 1].value;
        break;
      case 'Đơn hàng':
        nS = data[4*i + 1].value;
        break;
      case 'Số đơn nhập':
        nI = data[4*i + 1].value;
        break;
      case 'Chi phí':
        c = data[4*i + 1].value;
        break;
    }
    switch(data[4*i + 2].category){ 
      case 'Doanh thu':
        r = data[4*i + 2].value;
        break;
      case 'Đơn hàng':
        nS = data[4*i + 2].value;
        break;
      case 'Số đơn nhập':
        nI = data[4*i + 2].value;
        break;
      case 'Chi phí':
        c = data[4*i + 2].value;
        break;
    }
    switch(data[4*i + 3].category){ 
      case 'Doanh thu':
        r = data[4*i + 3].value;
        break;
      case 'Đơn hàng':
        nS = data[4*i + 3].value;
        break;
      case 'Số đơn nhập':
        nI = data[4*i + 3].value;
        break;
      case 'Chi phí':
        c = data[4*i + 3].value;
        break;
    }

    let row = {
      index: parseInt(i) + 1,
      date: moment(data[4*i].date).format("DD-MM-YYYY"),
      numberOfSales: nS,
      revenue: r,
      numberOfImports: nI,
      cost: c,
    }
    res.push(row);
  }
  return res;
}

export function formatBestSellerTable(data){
  const res =[];

  for(let i=0; i<data.length; i++){
    let row ={
      index: parseInt(i) + 1,
      name: data[i].product.productName,
      quantity: data[i].quantity_sold
    }
    res.push(row)
  }
  return res;
}