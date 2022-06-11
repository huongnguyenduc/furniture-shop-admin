import {
  formatBillRevuene,
  formatImporter,
  CalSummary,
  formatDataTable,
  formatBestSellerTable,
  formatColLineData
} from '../Utils/report';
import {
  getBillRevenueReport,
  getImporterReport,
  getBestSeller,
  getRevenue,
  getTotalCost,
} from '../services/report';
import { notification } from 'antd';
import moment from 'moment';
export default {
  namespace: 'report',
  state: {
    products: [
      {
        name: 'Bàn học',
        sales: 100,
        vote: 5,
        price: 1000000,
        status: 'Còn hàng',
      },
      {
        name: 'Bàn học',
        sales: 100,
        vote: 5,
        price: 1000000,
        status: 'Còn hàng',
      },
      {
        name: 'Bàn học',
        sales: 100,
        vote: 5,
        price: 1000000,
        status: 'Còn hàng',
      },
      {
        name: 'Bàn học',
        sales: 100,
        vote: 5,
        price: 1000000,
        status: 'Còn hàng',
      },
      {
        name: 'Bàn học',
        sales: 100,
        vote: 5,
        price: 1000000,
        status: 'Còn hàng',
      },
    ],
    customers: [
      {
        name: 'Annete Black',
        image: 'https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg',
        email: 'annete@gmail.com',
      },
      {
        name: 'Annete Black',
        image: 'https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg',
        email: 'annete@gmail.com',
      },
      {
        name: 'Annete Black',
        image: 'https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg',
        email: 'annete@gmail.com',
      },
      {
        name: 'Annete Black',
        image: 'https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg',
        email: 'annete@gmail.com',
      },
      {
        name: 'Annete Black',
        image: 'https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg',
        email: 'annete@gmail.com',
      },
    ],
    dataLineChart: [
      {
        date: '1-1-2022',
        value: 12,
        category: 'Đơn hàng',
      },
      {
        date: '2-1-2022',
        value: 8,
        category: 'Đơn hàng',
      },
      {
        date: '3-1-2022',
        value: 14,
        category: 'Đơn hàng',
      },
      {
        date: '4-1-2022',
        value: 16,
        category: 'Đơn hàng',
      },
      {
        date: '5-1-2022',
        value: 20,
        category: 'Đơn hàng',
      },
      {
        date: '6-1-2022',
        value: 12,
        category: 'Đơn hàng',
      },

      {
        date: '1-1-2022',
        value: 1200000,
        category: 'Doanh thu',
      },
      {
        date: '2-1-2022',
        value: 800000,
        category: 'Doanh thu',
      },
      {
        date: '3-1-2022',
        value: 100400,
        category: 'Doanh thu',
      },
      {
        date: '4-1-2022',
        value: 106000,
        category: 'Doanh thu',
      },
      {
        date: '5-1-2022',
        value: 200000,
        category: 'Doanh thu',
      },
      {
        date: '6-1-2022',
        value: 120000,
        category: 'Doanh thu',
      },

      {
        date: '1-1-2022',
        value: 100000,
        category: 'Chi phí',
      },
      {
        date: '2-1-2022',
        value: 360000,
        category: 'Chi phí',
      },
      {
        date: '3-1-2022',
        value: 480000,
        category: 'Chi phí',
      },
      {
        date: '4-1-2022',
        value: 150000,
        category: 'Chi phí',
      },
      {
        date: '5-1-2022',
        value: 1200000,
        category: 'Chi phí',
      },
      {
        date: '6-1-2022',
        value: 600000,
        category: 'Chi phí',
      },
    ],
    dataBestSeller: [
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
    dataReportTable: [
      {
        index: '1',
        date: '01-01-2022',
        numberOfSales: 12,
        revenue: 12000,
        numberOfImports: 2,
        cost: 1000,
      },
      {
        index: '1',
        date: '01-01-2022',
        numberOfSales: 12,
        revenue: 12000,
        numberOfImports: 2,
        cost: 1000,
      },
      {
        index: '1',
        date: '01-01-2022',
        numberOfSales: 12,
        revenue: 12000,
        numberOfImports: 2,
        cost: 1000,
      },
      {
        index: '1',
        date: '01-01-2022',
        numberOfSales: 12,
        revenue: 12000,
        numberOfImports: 2,
        cost: 1000,
      },
      {
        index: '1',
        date: '01-01-2022',
        numberOfSales: 12,
        revenue: 12000,
        numberOfImports: 2,
        cost: 1000,
      },
    ],
    summary: {
      numberOfSales: 0,
      numberOfImporter: 0,
      revenue: 0,
      cost: 0,
    },
    columnsData: [
      {
        date: '2019-03',
        value: 35000,
        type: 'Đơn bán',
      },
      {
        date: '2019-04',
        value: 90000,
        type: 'Đơn bán',
      },
      {
        date: '2019-05',
        value: 30000,
        type: 'Đơn bán',
      },
      {
        date: '2019-06',
        value: 45000,
        type: 'Đơn bán',
      },
      {
        date: '2019-07',
        value: 47000,
        type: 'Đơn bán',
      },
      {
        date: '2019-03',
        value: 22000,
        type: 'Đơn nhập',
      },
      {
        date: '2019-04',
        value: 30000,
        type: 'Đơn nhập',
      },
      {
        date: '2019-05',
        value: 25000,
        type: 'Đơn nhập',
      },
      {
        date: '2019-06',
        value: 22000,
        type: 'Đơn nhập',
      },
      {
        date: '2019-07',
        value: 36200,
        type: 'Đơn nhập',
      },
    ],
    linesData:[
      {
        date: '2019-03',
        money: 80000,
        name: 'Doanh thu',
      },
      {
        date: '2019-04',
        money: 60000,
        name: 'Doanh thu',
      },
      {
        date: '2019-05',
        money: 40,
        name: 'Doanh thu',
      },
      {
        date: '2019-06',
        money: 30,
        name: 'Doanh thu',
      },
      {
        date: '2019-07',
        money: 20,
        name: 'Doanh thu',
      },
      {
        date: '2019-03',
        money: 75,
        name: 'Chi phí',
      },
      {
        date: '2019-04',
        money: 20,
        name: 'Chi phí',
      },
      {
        date: '2019-05',
        money: 10,
        name: 'Chi phí',
      },
      {
        date: '2019-06',
        money: 7,
        name: 'Chi phí',
      },
      {
        date: '2019-07',
        money: 13,
        name: 'Chi phí',
      },
    ]
  },
  reducers: {
    fetchLineChart(state, action) {
      return {
        ...state,
        dataLineChart: action.payload.dataChart,
        summary: action.payload.summary,
        dataReportTable: action.payload.dataReportTable,
        dataBestSeller: action.payload.dataBestSeller,
        columnsData: action.payload.columnsData,
        linesData: action.payload.linesData,
      };
    },
    getReportData(state, action) {
      return {
        ...state,
        summary: action.payload.summary,
      };
    },
  },
  effects: {
    *getDataLineChart(action, { put, call }) {
      const res1 = yield call(getBillRevenueReport, action.payload); // getAllData
      const res2 = yield call(getImporterReport, action.payload);
      const res3 = yield call(getBestSeller);
      if (res1.status === 200 && res2.status === 200 && res3.status === 200) {
        let data2 = formatImporter(res2.content, action.payload.start, action.payload.end);
        let data1 = formatBillRevuene(res1.content, action.payload.start, action.payload.end);
        for (let i = 0; i < data1.length; i++) {
          data2.push(data1[i]);
        }

        const data = data2.sort(
          (a, b) => new moment(a.date).format('YYYYMMDD') - new moment(b.date).format('YYYYMMDD'),
        );
        const summary = CalSummary(data);
        const dataReportTable = formatDataTable(data);
        const dataBestSeller = formatBestSellerTable(res3.content);
        const dataColLine = formatColLineData(data);  
          // test
            console.log("DATA table COLLINE");
            console.log(dataReportTable);
          //
        yield put({
          type: 'fetchLineChart',
          payload: {
            dataChart: data,
            summary,
            dataReportTable,
            dataBestSeller,
            linesData: dataColLine.lines,
            columnsData: dataColLine.cols
          },
        });
      } else {
        notification.error({ message: 'Không thể gọi api.' });
      }
    },
    *getSummary(action, { put, call }) {
      const res1 = yield call(getRevenue);
      const res2 = yield call(getTotalCost);
      console.log('1', res1);
      console.log('2', res2);

      if (res1.status === 200 && res2.status === 200) {
        const summary = {
          numberOfSales: res1.content.money_paid_orders,
          numberOfImporter: res2.content.money_import,
          revenue: res1.content.revenue,
          cost: res2.content.total_cost,
        };

        yield put({
          type: 'getReportData',
          payload: {
            summary,
          },
        });
      } else {
        notification.error({ message: 'Không thể gọi api' });
      }
    },
  },
};
