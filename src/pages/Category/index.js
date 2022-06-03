import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Space, Tag, Spin, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { PlusOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import styles from './styles.less';
import ActionRender from '../../components/Category/actionRender/index';

import { router } from 'umi';
const { Content, Header } = Layout;

const Category = props => {
  const { dispatch, loading } = props;
  const isLoading = loading.effects['category/getCategoryList'];
  React.useEffect(() => {
    dispatch({
      type: 'category/getCategoryList',
    });
  }, [dispatch]);
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  });
  window.onscroll = function() {
    scrollFunction();
  };
  function scrollFunction() {
    var mybutton = document.getElementById('myBtn');
    if (mybutton !== null) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = 'block';
      } else {
        mybutton.style.display = 'none';
      }
    }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const categories = useSelector(state => state.category.categories);
  let searchInput;
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className={styles.buttonSearch}
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 50 }}
          >
            <SearchOutlined />
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 70 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'categoryId',
      align: 'left',
      width: '4%',
      sorter: (a, b) => a.categoryId - b.categoryId,
    },
    {
      title: 'ID Cha',
      dataIndex: 'parentId',
      align: 'left',
      width: '4%',
    },
    {
      title: 'Tên Phân loại',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center',
      width: '15%',
      ...getColumnSearchProps('categoryName'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'categoryDesc',
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
            let color = 'geekblue';

            return (
              <Tag className={styles.tag} color={color} key={tag}>
                {tag.optionName.toUpperCase()}
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
      render: item => {
        return <ActionRender item={item} />;
      },
    },
  ];

  return (
    <Layout className={styles.layoutContainer}>
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
          <PlusOutlined className={styles.plusIcon} />
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Spin spinning={isLoading}>
        <Content className={styles.productContent}>
          <Table
            className={styles.tableCategory}
            columns={columns}
            bordered
            dataSource={categories}
          ></Table>
          <Button
            onClick={() => topFunction()}
            className={styles.topButton}
            icon={<UpOutlined />}
            id="myBtn"
          ></Button>
        </Content>
      </Spin>
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Category);
