import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Input, Spin, Space} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './styles.less';
import Highlighter from 'react-highlight-words';
import React, { useState } from 'react';
import ActionRender from '../../components/brand/actionRender';
import CreateModal from '../../components/brand/create/index';
import EditModal from '../../components/brand/edit/index';
const { Content, Header } = Layout;

const Brand = props => {
  const { loading, dispatch } = props;
  const isLoading = loading.effects['brands/getBrandList'];
  const brands = useSelector(state => state.brands.brands);
  React.useEffect(() => {
    dispatch({
      type: 'brands/getBrandList',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [value, setValue] = useState({
    brandId: 0,
    brandName: '0',
    brandDesc: '0',
  });
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
  //handle search
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  });
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

  //update brand
  const handleUpdate = async props => {
    await dispatch({
      type: 'brands/updateBrand',
      payload: props,
    });
    console.log(brands);
  };
  //delete brand
  const handleDelete = async props => {
    await dispatch({
      type: 'brands/deleteBrand',
      payload: props,
    });
    console.log(brands);
  };
  //create brand
  const handleCreate = async props => {
    await dispatch({
      type: 'brands/addBrand',
      payload: props,
    });
    console.log(brands);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'brandId',
      align: 'center',
      width: '6%',
      sorter: (a, b) => a.brandId - b.brandId,
    },

    {
      title: 'Tên thương hiệu',
      dataIndex: 'brandName',
      align: 'center',
      width: '25%',
      ...getColumnSearchProps('brandName'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'brandDesc',
      align: 'center',
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '20%',
      render: record => {
        return (
          <ActionRender
            showModalUpdate={showModalUpdate}
            handleCancelUpdate={handleCancelUpdate}
            handleDelete={handleDelete}
            record={record}
          />
        );
      },
    },
  ];

  //Create
  const showModalCreate = () => {
    setIsModalVisibleCreate(true);
  };
  const handleCancelCreate = () => {
    setIsModalVisibleCreate(false);
  };

  const showModalUpdate = props => {
    setValue(props);
    setIsModalVisibleUpdate(true);
  };

  const handleCancelUpdate = () => {
    setIsModalVisibleUpdate(false);
  };
  return (
    <Layout className={styles.layoutContainer}>
      <Header className={styles.brandHeader}>
        <span className={styles.title}>DANH SÁCH THƯƠNG HIỆU</span>
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={showModalCreate}
        >
          <PlusOutlined className={styles.plusIcon} />
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Spin spinning={isLoading}>
        <Content className={styles.brandContent}>
          <Table
            className={styles.tableBrands}
            columns={columns}
            bordered
            dataSource={brands}
          ></Table>
        </Content>
      </Spin>
      <CreateModal
        handleCreate={handleCreate}
        onCancel={handleCancelCreate}
        visible={isModalVisibleCreate}
      />
      <EditModal
        value={value}
        handleUpdate={handleUpdate}
        onCancel={handleCancelUpdate}
        visible={isModalVisibleUpdate}
      />
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Brand);
