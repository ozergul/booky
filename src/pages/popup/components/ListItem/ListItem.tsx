import { FC, useState } from 'react';
import { BookmarkTreeNode } from '@root/src/pages/popup/types';

import classnames from 'classnames';

import styles from './ListItem.module.scss';

function faviconURL(u: string) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'));
  url.searchParams.set('pageUrl', u);
  url.searchParams.set('size', '32');
  return url.toString();
}

type ListItemProps = {
  node: BookmarkTreeNode;
};

export const ListItem: FC<ListItemProps> = ({ node }) => {
  const isFolder = node.children;
  const [isOpened, setIsOpened] = useState(false);

  const Toggler = () => {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div className={styles.toggler} onClick={() => setIsOpened(!isOpened)}>
        {isOpened ? '-' : '+'}
      </div>
    );
  };

  const classes = [styles.item, isOpened ? styles.opened : ''];

  const Link = () => {
    return (
      <a href={node.url} target="_blank" rel="noreferrer">
        {node.title || node.url}
      </a>
    );
  };

  const Favicon = () => {
    return <img className={styles.favicon} src={faviconURL(node.url)} alt={node.url} />;
  };

  const Folder = () => {
    return <div>{node.title}</div>;
  };

  return (
    <div className={classnames(classes)}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className={styles.title} onClick={() => setIsOpened(!isOpened)}>
        {isFolder ? (
          <>
            <Folder />
            <Toggler />
          </>
        ) : (
          <>
            <Favicon />
            <Link />
          </>
        )}
      </div>

      {isFolder && isOpened && node.children?.map((bookmark, index) => <ListItem key={index} node={bookmark} />)}
    </div>
  );
};
