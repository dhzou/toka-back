import React from 'react';
import { compose, withApollo } from 'react-apollo';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Switch,
  message,
} from 'antd';
import moment from 'moment';

import activityDetail from '@/apollo/query/activity';
import reEdithActivity from '@/apollo/mutations/reEdithActivity';
import publishActivity from '@/apollo/mutations/publishActivity';

import UploadImg from '@/components/business/UploadImg';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

class Detail extends React.Component {

  state = {
    imageUrl: null
  }

  componentDidMount() {
    const { client, form } = this.props;
    const activityId = this.pageType();
    if(activityId) {
      client.query( {
        query: activityDetail,
        variables: {
          id: +activityId,
        },
        fetchPolicy: 'network-only',
      }).then((result) => {
        const { data = {} } = result;
        const activityDetail = data.activityDetail;
        // 初始化数据
        form.setFieldsValue({
          isHot: !!activityDetail.isHot,
          title: activityDetail.title,
          subTitle: activityDetail.subTitle,
          info: activityDetail.info,
          startTime: moment(activityDetail.startTime, 'YYYY-MM-DD HH:mm:ss'),
          endTime: moment(activityDetail.endTime, 'YYYY-MM-DD HH:mm:ss'),
          statementRules: activityDetail.statementRules,
          awardRules: activityDetail.awardRules,
          imgUrl: activityDetail.imgUrl,
        });
        this.setState({
          imageUrl: activityDetail.imgUrl
        })
      })
    }
  }

  pageType = () => {
    const { match  = {} } = this.props;
    return match.params.activityId;
  }

  handleSubmit = (e) => {
    const { client, form, history } = this.props;
    const activityId = this.pageType();
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          isHot: values.isHot ? 1: 0,
          startTime: values.startTime.format('YYYY-MM-DD HH:mm:ss'),
          endTime: values.endTime.format('YYYY-MM-DD HH:mm:ss'),
        }
        // 修改
        if(activityId) {
          params.id = +activityId;
          client.mutate({
            mutation: reEdithActivity,
            variables:params,
          }).then(({ data: {reEdithActivity = {}} }) => {
            console.log(reEdithActivity);
            if(reEdithActivity.code === 200 ) {
              message.success(reEdithActivity.msg);
              history.push('/activity')
            } else {
              message.error(reEdithActivity.msg || '操作失败请稍后再试');
            }
          })
        } else { // 新增
          client.mutate({
            mutation: publishActivity,
            variables:params,
          }).then(({ data: {publishActivity = {}} }) => {
            if(publishActivity.code === 0 ) {
              message.success(publishActivity.msg);
              history.push('/activity')
            } else {
              message.error(publishActivity.msg || '操作失败请稍后再试');
            }
          })
        }
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    const file = (e && e.file) || {};
    return file.response.url + '/0';
  }

  render () {;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const activityId = this.pageType();
    const { imageUrl = null } = this.state;
    return (
      <div>
        <div className={styles.title}>
          <h2>{ !!activityId ? '编辑活动' : '添加活动' }</h2>
        </div>
        <div className={styles.form}>
        <div className={styles.operateForm}>
          <Form
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...formItemLayout}
              label="isHot"
            >
              {getFieldDecorator('isHot', { valuePropName: 'checked' })(
                <Switch />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="标题">
              {
                getFieldDecorator('title', {
                  rules: [{required: true, message: 'Please input title!'}],
                })(
                  <Input placeholder="标题" />
                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="副标题">
              {
                getFieldDecorator('subTitle', {
                  rules: [{required: true, message: 'Please input subTitle!'}],
                })(
                  <Input placeholder="副标题"/>
                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="活动相关权益">
              {
                getFieldDecorator('info', {
                  rules: [{required: true, message: 'Please input info!'}],
                })(
                  <Input placeholder="活动相关权益"/>
                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="开始时间">
              {
                getFieldDecorator('startTime', {
                  rules: [{required: true, message: 'Please input start time!'}],
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="结束时间">
              {
                getFieldDecorator('endTime', {
                  rules: [{required: true, message: 'Please input end time!'}],
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="banner图片">
              {
                getFieldDecorator('imgUrl', {
                  rules: [{required: true, message: 'Please uploadImg!'}],
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <UploadImg imageUrl={imageUrl}/>
                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="活动规则">
              {
                getFieldDecorator('statementRules', {
                  rules: [{required: true, message: 'Please input subTitle!'}],
                })(
                  <Input.TextArea rows={4} placeholder="填写活动相关规则"/>
                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="奖项设置">
              {
                getFieldDecorator('awardRules', {
                  rules: [{required: true, message: 'Please input subTitle!'}],
                })(
                  <Input.TextArea rows={4} placeholder="填写奖项设置文案"/>
                )
              }
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className="login-form-button">确定</Button>
            </Form.Item>
          </Form>
        </div>
        </div>
      </div>
    );
  }
}

export default compose(
  Form.create(),
  withApollo,
)(Detail);
