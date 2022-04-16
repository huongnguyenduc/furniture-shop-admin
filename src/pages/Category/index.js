import  React, { useState,} from 'react'
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Modal, Tag } from 'antd';
import {PlusOutlined, } from '@ant-design/icons';
import styles from './styles.less';
import ActionRender from '../../components/product/actionRender/index';
import ViewDetail from '../../components/product/viewDetail/index';
import { router } from 'umi';
import {
  moneyConverter
} from '../../Utils/helper';
const { Content, Header } = Layout

const Category = props => {
    const categories = useSelector(state => state.category.categories);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'left',
            width: '4%',
        },
        {
            title: 'Tên Phân loại',
            dataIndex: 'name',
            align: 'center',
            width: '15%',
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          align: 'center',
          width: '15%',
        },
        {
          title: 'Các thuộc tính',
          dataIndex: 'options',
          align: 'center',
          width: '15%',
          render: tags => (
            <>
              {tags.map(tag => {
                let color =  'geekblue';

                return (
                  <Tag className={styles.tag} color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
         },
         {
            title: 'Hành Động',
            align: 'center',
            width: '15%',
            render: () => {return <ActionRender showModal = {showModal} />}
         },
    ];
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
  return (
  <Layout className={styles.layoutContainer}>
      <ViewDetail onCancel={handleCancel} visible = {isModalVisible} />
      <Header className={styles.productHeader}>
        <span className={styles.title}>DANH SÁCH PHÂN LOẠI</span> 
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={() => {
            router.push('/category/create');
          }}
        >
          <PlusOutlined className ={styles.plusIcon}/>
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Content className= {styles.productContent}>
       <Table 
       className={styles.tableCategory}
       columns={columns}
       bordered
       dataSource={categories} 
       >
       </Table>
      </Content>
  </Layout>
  );
}

export default Category;
