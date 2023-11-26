import React, { useState, useEffect, useMemo } from 'react';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { BookmarkTreeNode } from '@root/src/pages/popup/types';
import { ListItem } from '@root/src/pages/popup/components/ListItem/ListItem';
import { SearchInput } from '@root/src/pages/popup/components/SearchInput/SearchInput';

const searchInBookmarks = (node: BookmarkTreeNode, searchTerm: string, path = []) => {
  if (!node.children) return [];

  let matches = [];
  node.children.forEach(child => {
    const newPath = [...path, child];

    const search = searchTerm.toLowerCase();

    if (child.title?.toLowerCase?.().includes?.(search) || child.url?.toLowerCase?.().includes?.(search)) {
      matches.push(newPath);
    }

    matches = matches.concat(searchInBookmarks(child, searchTerm, newPath));
  });

  return matches;
};

const formatMatches = matches => {
  return matches.map(path => path[path.length - 1]);
};

const Popup = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkTreeNode[]>([]);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    chrome.bookmarks.getTree(items => {
      setBookmarks(items);
    });
  }, []);

  const rootBookmark = useMemo(() => bookmarks?.[0] || ({ children: [] } as BookmarkTreeNode), [bookmarks]);
  const bookmarksBar = useMemo(
    () => rootBookmark.children?.[0] || ({ children: [] } as BookmarkTreeNode),
    [rootBookmark],
  );

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredBookmarks = useMemo(() => {
    if (!searchValue.trim()) {
      return bookmarksBar.children || [];
    }

    const matches = searchInBookmarks(bookmarksBar, searchValue);
    return formatMatches(matches);
  }, [bookmarksBar, searchValue]);

  return (
    <div>
      <SearchInput onChange={handleInputOnChange} />

      {filteredBookmarks.map((bookmark, index) => (
        <ListItem key={index} node={bookmark} />
      ))}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
