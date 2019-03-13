import React from 'react';
import PropTypes from 'prop-types';
import {
  Upload,
  Icon,
  message,
  Row,
  Col,
} from 'antd';

export default class UploadImg extends React.Component {

  state = {
    loading: false,
  };

  beforeUpload = (file) => {
    const { accept, limitSize } = this.props;
    const isLimitSize = file.size / 1024 / 1024 < limitSize;
    let isSupport = false;
    accept.forEach(type => {
      if (file.type === type) {
        isSupport = true
      }
    })
    if (!isSupport) {
      message.error('You upload Image format not support!');
    }
    if (!isLimitSize) {
      message.error(`Image must smaller than ${limitSize}MB!`);
    }
    return isSupport && isLimitSize;
  }

  handleChange = (info) => {
    const { onChange } = this.props
    const { file: { response = {} } } = info;

    if (info.file.status === 'uploading') {
      this.setState({
        loading: true,
      });
      return;
    }
    if (info.file.status === 'done') {
      // todo： 可能需要修改图片大小
      this.setState({
        imageUrl: response.url + '/0?imageView2/1/',
        loading: false,
      })
      // 设置回调
      onChange && onChange(info)
    }
  }

  render() {
    const { imageUrl: stateImageUrl, loading } = this.state;
    const { imageUrl : propsImageUrl } = this.props;
    const imageUrl = stateImageUrl || propsImageUrl;

    // https://jsonplaceholder.typicode.com/posts/
    // http://localhost:7001/upLoadFile
    return (
      <Row gutter={16}>
        {
          imageUrl
            ? (
              <Col span={18}>
                <img src={imageUrl} alt="img" style={{ width: '100%' }}/>
              </Col>
            )
            : null
        }
        <Col span={6}>
          <Upload
            name="imgUrl"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/upLoadFile"
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            <div>
              <Icon type={loading ? 'loading' : 'plus'}/>
              <div className="ant-upload-text">{imageUrl ? 'replace' : 'Upload'}</div>
            </div>
          </Upload>
        </Col>
      </Row>

    );
  }
}

UploadImg.propTypes = {
  accept: PropTypes.array,
  limitSize: PropTypes.number,
};

UploadImg.defaultProps = {
  accept: ['image/jpeg', 'image/jpg', 'image/png'],
  limitSize: 20,
}
