import { Button, notification } from "antd";
import { useState } from "react";
import { createPost } from "@/lib/api/gorest";
import type { FormError } from "@/types/post";
import FormComponent from "@/components/FormComponent";
import Link from "next/link";
import { LeftOutlined } from '@ant-design/icons';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Create = () => {

    const [api, contextHolder] = notification.useNotification();
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [errors, setErrors] = useState<FormError[]>([]);

    const openNotificationWithIcon = (type: NotificationType) => {
        console
        api[type]({
          message: 'Success create post',
          description:
            'Go back to landing page to view your post',
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          const postData = { title, body };
          await createPost(postData);
          openNotificationWithIcon('success');
          setTitle('');
          setBody('');
        } catch (error: any) {
            setErrors(error.response?.data || []);
        }
    };

    const getError = (field: string): string | undefined => {
        const error = errors.find(e => e.field === field);
        return error ? error.message : undefined;
    };

    return (
        <>
        <Link href={`/`}>
          <button 
            className='text-f-18 dark:text-white font-bold mt-10 mx-4'><LeftOutlined /> Back</button>
        </Link> 
        {contextHolder}
        <FormComponent
            mode="create"
            title={title}
            body={body}
            setTitle={setTitle}
            setBody={setBody}
            getError={getError}
            onSubmit={handleSubmit}
        />
            
        </>
    )
}

export default Create;