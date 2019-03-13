import React from 'react';
import { Link } from 'react-router-dom';
import { withApollo, compose } from 'react-apollo';
import {
  Form,
  Input,
  Button,
  Table,
  Divider,
  Pagination,
  Modal,
} from 'antd';

import activityList from '@/apollo/query/activityList';
import deleteActivity from '@/apollo/mutations/deleteActivity';

import styles from './index.less';
import {message} from "antd/lib/index";

const pageSize = 20;

class ChannelsList extends React.Component {

  state = {
    activityList: {}
  }

  componentDidMount() {
    this.getData()
  }

  getData = (pageNo = 1) => {
    this.props.client.query( {
      query: activityList,
      variables: {
        type: 0,
        pageNo,
        pageSize,
      },
      fetchPolicy: 'network-only',
    }).then((result) => {
      const { data = {} } = result;
      const activityList = data.activityList;
      this.setState({
        activityList: activityList
      })
    })
  }

  handleSubmit = (e) => {
    const { form } = this.props
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        // this.props.data.refetch(values);
      }
    });
  }

  onPageSizeChange = (page, pageSize) => {
    this.props.data.refetch({
      type: 0,
      pageNo: page,
      pageSize,
    });
  }

  delActivity = (id) => {
    Modal.confirm({
      title: '二次确认弹窗',
      content: '确认删除这个弹窗么？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.client.mutate({
          mutation: deleteActivity,
          variables:{
            id: +id,
          },
        }).then(({ data: {deleteActivity = {}} }) => {
          if(deleteActivity.code === 0 ) {
            message.success(deleteActivity.msg);
            this.getData();
          } else {
            message.error(deleteActivity.msg || '操作失败请稍后再试');
          }
        })
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { activityList = {} } = this.state;
    return (
      <div>
        <div className={styles.title}>
          <h2>活动list</h2>
          <Link className={`ant-btn login-form-button ant-btn-primary ${styles.fr}`} to="/activity/add">添加活动</Link>
        </div>
        <div className={styles.form}>
          <Form onSubmit={this.handleSubmit} layout="inline">
            <Form.Item label="id">
              {
                getFieldDecorator('id', {
                  rules: [{required: false, message: 'Please input name!'}],
                })(
                  <Input placeholder="id"/>
                )
              }
            </Form.Item>
            <Form.Item label="标题">
              {
                getFieldDecorator('title', {
                  rules: [{required: false, message: 'Please input search!'}],
                })(
                  <Input placeholder="标题"/>
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">搜索</Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.contains}>
          <Table
            rowKey="id"
            columns={[
              {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
              },
              {
                title: '副标题',
                dataIndex: 'subTitle',
                key: 'subTitle',
              },
              {
                title: 'info',
                dataIndex: 'info',
                key: 'info',
              },
              {
                title: '开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
              },
              {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime',
              },
              {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
              },
              {
                title: '是否热门',
                dataIndex: 'isHot',
                key: 'isHot',
              },
              {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <Link to={`/activity/edit/${record.id}`}>编辑</Link>
                    <Divider type="vertical"/>
                    <a
                      onClick={() => this.delActivity(record.id)}
                    >
                      删除
                    </a>
                  </span>
                ),
              }
            ]}
            dataSource={activityList.rows}
            pagination={false}
          />
        </div>
        <div className={styles.paginationBox}>
          <Pagination
            defaultPageSize={pageSize}
            className={styles.pagination}
            defaultCurrent={1}
            total={activityList.total}
            onChange={this.onPageSizeChange}
          />
        </div>
      </div>
    );
  }
}

export default compose(
  Form.create(),
  withApollo,
)(ChannelsList);
