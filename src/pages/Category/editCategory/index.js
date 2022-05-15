import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.less';
import { TweenOneGroup } from 'rc-tween-one';
import { connect, useSelector } from 'dva';
import {
  Affix,
  Form,
  Upload,
  Row,
  Col,
  Input,
  Typography,
  Button,
  AutoComplete,
  Tag,
  message,
  Spin
} from 'antd';
import { router } from 'umi';
const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
const EditCategory = props => {
  const { dispatch, loading } = props;
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [state, setState] = useState({
    inputVisible: false,
    inputValue: '',
    optionsCate: [],
    parentId: null,
  });
  const categories = useSelector(state => state.category.categories);
  const currCategory = useSelector(state => state.category.editCategory);
  React.useEffect(() => {
    var formFill = {};
     formFill['name'] = currCategory.categoryName;
     formFill['description'] = currCategory.categoryDesc;
     const parent = categories.find(item => { if(item.categoryId === currCategory.parentId) return item})
     formFill['parent'] = parent !== undefined ? parent.categoryName : '';
     setState({
       ...state,
       parentId: currCategory.parentId
     })
     console.log(formFill);
     form.setFieldsValue(formFill);
  }, [categories, currCategory.categoryDesc, currCategory.categoryName, currCategory.parentId, form, state]);
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

  const onFill = () => {
    var formFill = {};
     formFill['name'] = '';
     formFill['description'] = '';
     formFill['parent'] = ''
     setState({
       ...state,
       parentId: []
     })
     form.setFieldsValue(formFill);
  }
  const onFinish = async values => {
      var newCate = {};
      newCate['parentId'] = state.parentId;
      newCate['categoryId'] = currCategory.categoryId;
      newCate['options'] = currCategory.options;
      newCate['categoryName'] = values.name;
      newCate['categoryDesc'] = values.description;
      isLoading =  loading.effects[('category/editCategory')];
      console.log(newCate);
      dispatch({
        type: 'category/editCategory',
        payload: newCate,
      });
      if(!isLoading) router.goBack();
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
        onFinish={onFinish}
        autoComplete="off"
        className={styles.container}
      >
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={24}>
            <Affix offsetTop={70}>
              <Title className={styles.title}>CHỈNH SỬA PHÂN LOẠI</Title>
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

export default connect(state => ({ loading: state.loading })) (EditCategory);
