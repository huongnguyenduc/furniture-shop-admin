import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.less';
import { TweenOneGroup } from 'rc-tween-one';
import { connect, useSelector } from 'dva';
import {
  Affix,
  Form,
  Modal,
  Row,
  Col,
  Input,
  Typography,
  Button,
  AutoComplete,
  Tag,
  message,
  Spin,
} from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
const CreateCategory = props => {
  const { dispatch, loading } = props;
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [state, setState] = useState({
    options: [],
    inputVisible: false,
    inputValue: '',
    optionsCate: [],
    parentId: null,
  });
  const categories = useSelector(state => state.category.categories);
  var isLoading = false;
  const searchResult = value => {
    let result = categories.filter(item =>
      item.categoryName.toUpperCase().includes(value.toUpperCase()),
    );
    return result.map((item, index) => {
      return {
        value: item.categoryName,
        label: <span>{item.categoryName}</span>,
      };
    });
  };
  const onSelectCate = value => {
    let result = categories.find(item => item.categoryName.toUpperCase() === value.toUpperCase());
    setState({
      ...state,
      parentId: result.categoryId,
    });
  };
  const handleSearchCate = value => {
    setState({
      ...state,
      optionsCate: value ? searchResult(value) : [],
      parentId: null,
    });
  };
  const removeOption = item => {
    const temps = state.options.filter(option => option !== item);
    console.log(temps);
    setState({
      ...state,
      options: temps,
    });
  };
  const showInput = () => {
    setState({
      ...state,
      inputVisible: true,
    });
  };
  const inputRef = useRef(null);
  
  const saveInputRef = input => {
    inputRef.current = input;
  };
  useEffect(() => {
    if (state.inputVisible) {
      inputRef.current.focus();
    }
  }, [state]);
  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { options } = state;
    if (inputValue && options.indexOf(inputValue) === -1) {
      options = [...options, inputValue];
    }
    setState(state => ({
      ...state, // <-- shallow copy previous state
      options,
      inputVisible: false,
      inputValue: '',
    }));
  };

  const handleInputChange = text => {
    setState({
      ...state,
      inputValue: text,
    });
  };
  const forMap = tag => {
    const tagElem = (
      <Tag
        className={styles.tagItem}
        closable
        onClose={() => {
          removeOption(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block', marginBottom: '10px' }}>
        {tagElem}
      </span>
    );
  };

  const onFill = () => {
    var formFill = {};
    formFill['name'] = '';
    formFill['description'] = '';
    formFill['parent'] = '';
    setState({
      ...state,
      options: [],
      parentId: [],
    });
    form.setFieldsValue(formFill);
  };
  function confirm(values) {
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn không thể chỉnh sửa các thuộc tính, vẫn tiếp tục?',
      onOk: () => {
        onFinish(values);
      },
      okText: 'OK',
      cancelText: 'Hủy',
    });
  }
  const onFinish = async values => {
    var newCate = {};
    var optionArr = [];
    state.options.forEach(item => {
      let option = {};
      option['optionName'] = item;
      optionArr.push(option);
    });
    newCate['parentId'] = state.parentId;
    newCate['options'] = optionArr;
    newCate['categoryName'] = values.name;
    newCate['categoryDesc'] = values.description;
    isLoading = loading.effects['category/addCategory'];
    dispatch({
      type: 'category/addCategory',
      payload: newCate,
    });
    if (!isLoading) router.goBack();
    onFill();
  };
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form
          name="create-category"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            description: '',
            multiSubmission: true,
            sponsors: [],
          }}
          layout="vertical"
          form={form}
          onFinish={confirm}
          autoComplete="off"
          className={styles.container}
        >
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={24}>
              <Affix offsetTop={70}>
                <Title className={styles.title}>THÊM PHÂN LOẠI MỚI</Title>
              </Affix>
            </Col>
            <Col span={16}>
              <Affix offsetTop={130}>
                <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                  <Col span={12}>
                    <Form.Item
                      className={styles.formItems}
                      label="TÊN PHÂN LOẠI"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền tên loại sản phẩm',
                        },
                      ]}
                    >
                      <Input className={styles.inputItems} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItems} label="CHA" name="parent">
                      <AutoComplete
                        className="complete"
                        options={state.optionsCate}
                        onSelect={onSelectCate}
                        onSearch={handleSearchCate}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item className={styles.formItems} label="MÔ TẢ" name="description">
                      <Input className={styles.inputItems} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item className={styles.formItems} label="THUỘC TÍNH" name="options">
                      <TweenOneGroup
                        enter={{
                          scale: 0.8,
                          opacity: 0,
                          type: 'from',
                          duration: 100,
                        }}
                        onEnd={e => {
                          if (e.type === 'appear' || e.type === 'enter') {
                            e.target.style = 'display: inline-block';
                          }
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                      >
                        {state.options.map(item => {
                          return forMap(item);
                        })}
                      </TweenOneGroup>
                    </Form.Item>
                    {state.inputVisible && (
                      <Input
                        className={styles.inputOptions}
                        ref={saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 170 }}
                        value={state.inputValue}
                        onChange={e => {
                          handleInputChange(e.target.value);
                        }}
                        onBlur={e => {
                          handleInputConfirm();
                        }}
                        onPressEnter={e => {
                          handleInputConfirm();
                        }}
                      />
                    )}
                    {!state.inputVisible && (
                      <Tag onClick={() => showInput()} className={styles.siteTagPlus}>
                        <PlusOutlined /> Thuộc tính mới
                      </Tag>
                    )}
                  </Col>
                  <Col span={4} offset={15}>
                    <Form.Item>
                      <Button
                        className={styles.myButtonCancel}
                        onClick={() => {
                          router.goBack();
                        }}
                        size="large"
                        htmlType="button"
                      >
                        Hủy
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item>
                      <Button
                        type="primary"
                        className={styles.myButton}
                        size="large"
                        htmlType="submit"
                        // onClick={handleAllFields}
                        // loading={isLoading}
                      >
                        Hoàn tất
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Affix>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default connect(state => ({ loading: state.loading }))(CreateCategory);
