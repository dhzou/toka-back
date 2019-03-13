import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Form, Input, Button } from 'antd';

import workList from '@/apollo/query/workList'

class ChannelsList extends React.Component {

  handleSubmit = (e) => {
    const { formSubmit, form } = this.props
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        formSubmit && formSubmit(values);
        this.props.data.refetch(values);
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { data : { loading, error } } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} layout="inline">
          <Form.Item>
            {
              getFieldDecorator('search', {
                rules: [{required: true, message: 'Please input search!'}],
              })(
                <Input placeholder="search"/>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('name', {
                rules: [{required: true, message: 'Please input name!'}],
              })(
                <Input placeholder="name"/>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">搜索</Button>
          </Form.Item>
        </Form>
        {
          loading ?
            <p>Loading ...</p>
            :
            null
        }
        {
          error ?
            <p>{error.message}</p>
            :
            null
        }
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}

export default compose(
  Form.create(),
  graphql(workList),
)(ChannelsList);
