import React from 'react';
import { Button, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import styles from '../styles/components/_form.module.scss';

interface FormProps {
  mode: 'create' | 'update';
  title: string;
  body: string;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  getError: (field: string) => string | undefined;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

const FormComponent: React.FC<FormProps> = ({
  mode,
  title,
  body,
  setTitle,
  setBody,
  getError,
  onSubmit
}) => {

    const { TextArea } = Input;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(event);
    };

    const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleBodyInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.form_wrapper}>
                <div className={styles.title}>{mode === 'create' ? 'Create new post' : 'Update post'}</div>
                <Input
                    style={{ borderColor: getError('title') ? 'red' : 'initial' }}
                    value={title}
                    onChange={handleTitleInput}
                    placeholder="Title..."
                    className={styles.custom_input}
                    name='title'
                />
                {getError('title') && <p className={styles.error_text} style={{ color: 'red' }}>{getError('title')}</p>}
                <TextArea
                    style={{ borderColor: getError('body') ? 'red' : 'initial' }}
                    value={body}
                    onChange={handleBodyInput}
                    rows={6}
                    placeholder="Body..."
                    className={styles.custom_input}
                    name='body'
                />
                {getError('body') && <p className={styles.error_text} style={{ color: 'red' }}>{getError('body')}</p>}

                <Button
                    htmlType="submit"
                    type="primary"
                    icon={<SaveOutlined />}
                >
                    {mode === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    );
};

export default FormComponent;
