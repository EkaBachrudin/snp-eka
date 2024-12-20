import { deletePost, fetchAuthor, fetchPost, updatePost } from '@/lib/api/gorest';
import type { FormError } from '@/types/post';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/pages/_post.module.scss';
import Image from 'next/image';
import type { UserInterface } from '@/types/user.interface';
import { Button, message, notification, Popconfirm, type PopconfirmProps } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import FormComponent from '@/components/FormComponent';


type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Post = () => {
  const [api, contextHolder] = notification.useNotification();
  const [user, setUser] = useState<UserInterface>();
  const [editMode, SetEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<FormError[]>([]);

  const router = useRouter();
  const id = router.query.id as string;

  const openNotificationWithIcon = (type: NotificationType) => {
    console
    api[type]({
      message: 'Success create post',
      description:
        'Post was succesfully edited',
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPostData = async () => {
      try {
        const response = await fetchPost(id);
        setTitle(response.data.title);
        setBody(response.data.body);
        const getAuthor = fetchAuthor(response.data.user_id);
        setUser((await getAuthor).data);
      } catch (err: any) {
        setErrors(err.response?.data || []);
      }
    };

    fetchPostData();

    return () => {
    };
  }, [id]);

  const getError = (field: string): string | undefined => {
    const error = errors?.find(e => e.field === field);
    return error ? error.message : undefined;
  };

  const handleUpdate = async () => {
    try {
      const postData = { title, body };
      await updatePost(id, postData);
      openNotificationWithIcon('success');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    handleDelete();
  };

  const errorMessage: PopconfirmProps['onCancel'] = (e) => {
    message.error('Something went wrong');
  };

  const handleDelete = async () => {
    if (!id) { return; }
    try {
      await deletePost(id);
      message.success('Success delete post');
    } catch (err: any) {
      errorMessage
    } finally {
      router.push('/');
    }
  };

  if (editMode) return (
    <div className='px-6 max-w-[800px] mx-auto'>
      <button
        onClick={() => SetEditMode(false)}
        className='text-f-18 dark:text-white font-bold mt-10'><LeftOutlined /> Back</button>

      {contextHolder}

      <FormComponent
        mode="update"
        title={title}
        body={body}
        setTitle={setTitle}
        setBody={setBody}
        getError={getError}
        onSubmit={handleUpdate}
      />
    </div>
  );

  return (
    <>
      <div className={styles.post_wrapper}>
        <Link href={`/`}>
          <button
            className='text-f-18 dark:text-white font-bold'><LeftOutlined /> Back</button>
        </Link>

        <Button className='mt-10 ml-4' type="primary" size='small' icon={<EditOutlined />} onClick={() => SetEditMode(true)}>
          Update
        </Button>

        <div className={styles.title}> {title} </div>

        <div className={styles.author}>
          {user?.name}
        </div>

        <Image
          src={`https://picsum.photos/1280/720?random=1`}
          alt="ima"
          width={50}
          height={60}
          layout="responsive"
        />

        <div className={styles.body}> {body} </div>

        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this post?"
          onConfirm={confirm}
          onCancel={() => { }}
          okText="Yes"
          cancelText="No"

        >
          <Button danger className={styles.btn_dan}>Delete</Button>
        </Popconfirm>
      </div>
    </>
  );

};

export default Post;