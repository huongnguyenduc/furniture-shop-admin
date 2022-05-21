import styles from './index.less';
import { Table, Layout, Button } from 'antd';
import { getdateTime, moneyConverter } from '../../Utils/helper';
import Invoice from '../../components/importInvoice';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import React, { useRef } from 'react';

const { Content } = Layout;

const ImportInvoice = props => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className={styles.layout}>
      <div className={styles.buttonLayout}>
        <ReactToPrint
          trigger={() => (
            <Button className={styles.styleButton} onClick={handlePrint} type="primary">
              Print
            </Button>
          )}
          content={() => componentRef.current}
        />
        <Button
          className={styles.styleButton}
          style={{ backgroundColor: '#dc3545' }}
          type="primary"
        >
          Dowload PDF
        </Button>
      </div>
      <Invoice data={props} ref={componentRef} />
    </div>
  );
};
export default ImportInvoice;
