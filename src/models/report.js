export default {
    namespace: 'report',
    state: {
      products:[
        {
          name: 'Bàn học',
          sales: 100,
          vote: 5,
          price: 1000000,
          status: 'Còn hàng'
        },
        {
          name: 'Bàn học',
          sales: 100,
          vote: 5,
          price: 1000000,
          status: 'Còn hàng'
        },
        {
          name: 'Bàn học',
          sales: 100,
          vote: 5,
          price: 1000000,
          status: 'Còn hàng'
        },
        {
          name: 'Bàn học',
          sales: 100,
          vote: 5,
          price: 1000000,
          status: 'Còn hàng'
        },
        {
          name: 'Bàn học',
          sales: 100,
          vote: 5,
          price: 1000000,
          status: 'Còn hàng'
        },
      ],
      customers: [
        {
          "name": "Annete Black",
          "image": "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg",
          "email" : "annete@gmail.com"
        },
        {
          "name": "Annete Black",
          "image": "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg",
          "email" : "annete@gmail.com"
        },
        {
          "name": "Annete Black",
          "image": "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg",
          "email" : "annete@gmail.com"
        },
        {
          "name": "Annete Black",
          "image": "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg",
          "email" : "annete@gmail.com"
        },
        {
          "name": "Annete Black",
          "image": "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg",
          "email" : "annete@gmail.com"
        },
        
      ],
      dataLineChart:[ // date: fomart 'DD-MM_YYYY', object theo thứ tự từng category
        {
          "date": "1-1-2022",
          "value": 12,
          "category": "Đơn hàng",
        },
        {
          "date": "2-1-2022",
          "value": 8,
          "category": "Đơn hàng",
        },
        {
          "date": "3-1-2022",
          "value": 14,
          "category": "Đơn hàng",
        },
        {
          "date": "4-1-2022",
          "value": 16,
          "category": "Đơn hàng",
        },
        {
          "date": "5-1-2022",
          "value": 20,
          "category": "Đơn hàng",
        },
        {
          "date": "6-1-2022",
          "value": 12,
          "category": "Đơn hàng",
        },

        {
          "date": "1-1-2022",
          "value": 1200000,
          "category": "Doanh thu",
        },
        {
          "date": "2-1-2022",
          "value": 800000,
          "category": "Doanh thu",
        },
        {
          "date": "3-1-2022",
          "value": 100400,
          "category": "Doanh thu",
        },
        {
          "date": "4-1-2022",
          "value": 106000,
          "category": "Doanh thu",
        },
        {
          "date": "5-1-2022",
          "value": 200000,
          "category": "Doanh thu",
        },
        {
          "date": "6-1-2022",
          "value": 120000,
          "category": "Doanh thu",
        },

        {
          "date": "1-1-2022",
          "value": 100000,
          "category": "Chi phí",
        },
        {
          "date": "2-1-2022",
          "value": 360000,
          "category": "Chi phí",
        },
        {
          "date": "3-1-2022",
          "value": 480000,
          "category": "Chi phí",
        },
        {
          "date": "4-1-2022",
          "value": 150000,
          "category": "Chi phí",
        },
        {
          "date": "5-1-2022",
          "value": 1200000,
          "category": "Chi phí",
        },
        {
          "date": "6-1-2022",
          "value": 600000,
          "category": "Chi phí",
        },
      ],
      dataTopProducts:[
        {
          index: 1,
          name: 'Bàn to gia đính',
          quantity: 10,
        },
        {
          index: 2,
          name: 'Bàn nhỏ phòng khách',
          quantity: 10,
        },
        {
          index: 3,
          name: 'Ghế đá vỉa hè',
          quantity: 10,
        },
        {
          index: 4,
          name: 'Ghế gỗ',
          quantity: 10,
        },
        {
          index: 5,
          name: 'Bàn nhựa',
          quantity: 10,
        },
        {
          index: 6,
          name: 'Bàn nhựa',
          quantity: 10,
        },
        {
          index: 7,
          name: 'Bàn nhựa',
          quantity: 10,
        },
        {
          index: 8,
          name: 'Bàn nhựa',
          quantity: 10,
        },
        {
          index: 9,
          name: 'Bàn nhựa',
          quantity: 10,
        },
        {
          index: 10,
          name: 'Bàn nhựa',
          quantity: 10,
        },
        {
          index: 11,
          name: 'Bàn nhựa',
          quantity: 10,
        },
      ],
      dataReportTable:[
        {
          index: '1',
          date: '01-01-2022',
          "numberOfSales": 12,
          revenue: 12000,
          "numberOfImports": 2,
          cost: 1000,
        },
        {
          index: '1',
          date: '01-01-2022',
          "numberOfSales": 12,
          revenue: 12000,
          "numberOfImports": 2,
          cost: 1000,
        },
        {
          index: '1',
          date: '01-01-2022',
          "numberOfSales": 12,
          revenue: 12000,
          "numberOfImports": 2,
          cost: 1000,
        },
        {
          index: '1',
          date: '01-01-2022',
          "numberOfSales": 12,
          revenue: 12000,
          "numberOfImports": 2,
          cost: 1000,
        },
        {
          index: '1',
          date: '01-01-2022',
          "numberOfSales": 12,
          revenue: 12000,
          "numberOfImports": 2,
          cost: 1000,
        }
      ]
        },
    reducers: {
    },
  };
  