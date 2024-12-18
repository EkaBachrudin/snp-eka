
import Image from 'next/image';
import { Card } from 'antd';
import styles from '../styles/pages/_index.module.scss';
import { fetchPosts } from '@/lib/api/gorest';
import { useEffect, useState } from 'react';
import type { PostType } from '@/types';
import { useData } from '@/context/SearchContext';
import useDebounce from '@/hooks/useDebounce';

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { data } = useData();
  const debouncedInput = useDebounce(data, 500);

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();

    fetchPosts({
      queryKey: [5, debouncedInput],
      pageParam: 2,
      signal: abortController.signal,
      meta: {}
    })
      .then(response => {
        const limit = response.headers['x-pagination-limit'];
        const page = response.headers['x-pagination-page'];
        const totalPages = response.headers['x-pagination-pages'];
        const totalItems = response.headers['x-pagination-total'];
        
        setPosts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch posts:", err);
        setError('Failed to load posts.');
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [debouncedInput]);

  if (loading) return (
    <div className='p-7'>
      <Card className={styles.card_ex} hoverable loading={true}></Card>
      <Card className={styles.card_ex} hoverable loading={true}></Card>
      <Card className={styles.card_ex} hoverable loading={true}></Card>
    </div>
  );
  if (error) return <p>Error: {error}</p>;

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

          <div className={styles.title}>{post.title}</div>

        </Card>

      ))}

    </main>
  )
}
