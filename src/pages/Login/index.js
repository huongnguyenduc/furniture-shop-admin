import React from 'react'
import styles from './styles.less'
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
const Login = props => {
    const { dispatch } = props;

    const onFinish = (values) => {
        dispatch({ type: "login/login", payload: values });
    };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <div className={styles.backGround}>
         <Row className={styles.container}>
             <Col className={styles.colContainerLeft}>
                 <div className={styles.logo}></div>
                 <div className={styles.welcome}>Welcome back!</div>
                 <div className={styles.guide}>Vui lòng điền thông tin đăng nhập bên dưới.</div>
                 <div className={styles.note}>Gõ admin vô Username để đăng nhập thành công</div>
                 <Form
                    className={styles.loginForm}
                    name="login"
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        className={styles.formItem}
                        label="Username"
                        name="username"
                        rules={[{ required: false, message: 'Please input your username!' }]}
                    >
                         <Input className={styles.inputItem} />
                    </Form.Item>

                    <Form.Item
                        className={styles.formItem}
                        label="Password"
                        name="password"
                        rules={[{ required: false, message: 'Please input your password!' }]}
                    >
                        <Input.Password className={styles.inputItem} />
                    </Form.Item>

                    <Form.Item 
                        className={styles.formItem}
                        name="remember" 
                        valuePropName="checked" 
                        wrapperCol={{ offset: 0, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button className={styles.buttonSubmit} type="primary" htmlType="submit">
                         Đăng nhập
                    </Button>
                    </Form.Item>
                </Form>
             </Col>
             <Col className={styles.colContainerRight}>
                 <div className={styles.sologanContainer}>
                    <p className={styles.sologan}>"Chúng tôi luôn mong muốn mang đến cho bạn một ngôi nhà sang trọng và đẳng cấp  nhất trong từng chi tiết".</p>
                    <p className={styles.name}>Mr. Hướng</p>
                    <p className={styles.decs}>Founder</p>
                    <p className={styles.decs}>Furniture Shop</p>
                 </div>
             </Col>
         </Row>
    </div>
  )
}

export default connect() (Login)