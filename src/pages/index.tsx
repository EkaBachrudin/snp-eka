
import Image from 'next/image';
import { Card, Pagination, type PaginationProps } from 'antd';
import styles from '../styles/pages/_index.module.scss';
import { fetchPosts } from '@/lib/api/gorest';
import { useEffect, useState } from 'react';
import type { PaginationData, PostType } from '@/types';
import { useData } from '@/context/SearchContext';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';

export default function Home() {

  const [posts, setPosts] = useState<PostType[]>([]);
  const [pagination, setPagination] = useState<PaginationData>();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data } = useData();
  const debouncedInput = useDebounce(data, 500);

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();

    fetchPosts({
      queryKey: [pageSize, debouncedInput],
      pageParam: currentPage,
      signal: abortController.signal,
      meta: {}
    })
      .then(response => {
        setPosts(response.data);
        setPagination(response.pagination)
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [debouncedInput, currentPage, pageSize]);

  const onPageChange: PaginationProps['onChange'] = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setPageSize(pageSize);
  };

  if (loading) return (
    <div className='p-7'>
      <Card className={styles.card_ex} hoverable loading={true}></Card>
      <Card className={styles.card_ex} hoverable loading={true}></Card>
      <Card className={styles.card_ex} hoverable loading={true}></Card>
    </div>
  );

  return (
    <main className='p-7'>
      {debouncedInput && (
        <p className='dark:text-white font-worksans text-f-20 mb-4'>
          Result for: {debouncedInput}
        </p>
      )}


      {posts.map((post, index) => (
        <Card className={styles.card_ex} hoverable loading={false} cover={
          <Image
            src={`https://picsum.photos/360/24${index}?random=1`}
            alt="ima"
            width={50}
            height={60}
            layout="responsive"
          />
        }>

          <Link href={`/post/${post.id}`}>
            <div  className={styles.title}>{post.title}</div>
          </Link> 

        </Card>

      ))}

        <Pagination
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
          defaultPageSize={pageSize}
          defaultCurrent={currentPage}
          total={Number(pagination?.totalItems)}
        />
      

    </main>
  )
}
