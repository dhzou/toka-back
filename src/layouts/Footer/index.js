import React from 'react';
import { Layout, Icon } from 'antd';

import styles from './index.less';

const links = [];

const Footer = () => (
  <Layout.Footer>
    <div className={styles.footer}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      <div className={styles.copyright}>
        Copyright <Icon type="copyright" /> @2018 阅文集团所有品
      </div>
    </div>
  </Layout.Footer>
);

export default Footer;
