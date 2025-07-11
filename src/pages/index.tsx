
import Image from 'next/image';
import { Card, Pagination, type PaginationProps } from 'antd';
import styles from '../styles/pages/_index.module.scss';
import { fetchAllPosts } from '@/lib/api/gorest';
import { useEffect, useState } from 'react';
import { useData } from '@/context/SearchContext';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { searchData } = useData();
  const debouncedInput = useDebounce(searchData, 500);

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getPosts', currentPage, pageSize, debouncedInput],
    queryFn: () => fetchAllPosts(currentPage, pageSize, debouncedInput),
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    refetch();
  }, [debouncedInput, currentPage, pageSize]);

  const onPageChange: PaginationProps['onChange'] = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setPageSize(pageSize);
  };

  if (isLoading) return (

    <div className={styles.landing_container}>
      <div className={styles.card_items}>
        <Card className={styles.card_ex} hoverable loading={true}></Card>
        <Card className={styles.card_ex} hoverable loading={true}></Card>
        <Card className={styles.card_ex} hoverable loading={true}></Card>
      </div>
    </div>

  );

  return (
    <main className={styles.landing_container}>
      {debouncedInput && (
        <p className='dark:text-white font-worksans text-f-20 mb-4'>
          Result for: {debouncedInput}
        </p>
      )}

      {!debouncedInput && currentPage === 1 && (
         <div className='relative hidden lg:block'>
         <div className={styles.single_post_image} style={{ 
             backgroundImage: `url(https://picsum.photos/1280/720)`
         }}> </div>
           
       
         <div className={styles.single_post_content}>
           <div  className={styles.single_post_title}>
               {data?.data.slice(-1)[0].title} 
           </div>
         </div>
       </div>
      )}

      <div className={styles.card_items}>
        {data?.data.map((post, index) => (
          <Card key={index} className={styles.card_ex} hoverable loading={false} cover={
            <Image
              src={`https://picsum.photos/360/24${index}?random=1`}
              alt="ima"
              width={50}
              height={60}
              layout="responsive"
            />
          }>

            <Link href={`/post/${post.id}`}>
              <div className={styles.title}>{post.title}</div>
            </Link>

          </Card>

        ))}
      </div>

      <Pagination
        onChange={onPageChange}
        onShowSizeChange={onShowSizeChange}
        defaultPageSize={pageSize}
        defaultCurrent={currentPage}
        total={Number(data?.pagination?.totalItems)}
      />

    </main>
  )
}
