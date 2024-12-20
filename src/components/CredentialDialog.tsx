import React, { useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import { createUser } from '@/lib/api/gorest';
import type { UserDto } from '@/types/user.interface';
import removeSpacesAndSpecialChars from '@/hooks/specialChar.hook';

const CredentialDialog: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [credential, setCredential] = useState('');
    const [isCredential, setIsCredential] = useState('');

    useEffect(() => {
        showModal();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        handleSubmit();
    };

    const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    };

    const handleCredentialChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setIsCredential('');
        setCredential(e.target.value);
    };

    const handleSubmit = () => {
        handleCreateUser();
    };

    async function handleCreateUser() {
        const payload: UserDto = {
          name: username,
          email: `${removeSpacesAndSpecialChars(username)}user@mail.com`,
          gender: "male",
          status: "active"
        };
      
        try {
          const response = await createUser(payload, credential);
          localStorage.setItem('userId', response.data.id);
          setConfirmLoading(false);
          setOpen(false);
        } catch (error: any) {
          setIsCredential(error.response?.data.message);
          setConfirmLoading(false);
          localStorage.removeItem('token'); 
        }
      }

    return (
        <>
            <Modal
                okButtonProps={
                    { disabled: username && credential ? false : true }
                }
                cancelButtonProps={
                    { className: 'hidden' }
                }
                closable={
                    { disabled: true }
                }
                title="Welcome"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
            >
                <Input
                    className='mt-4'
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />

                <Input
                    className='mt-4'
                    placeholder="Credential"
                    status={isCredential ? "error" : ''}
                    value={credential}
                    onChange={handleCredentialChange}
                />
                <div className='h-3 text-red-600 font-worksans'>{isCredential}</div>
            </Modal>
        </>
    )
}

export default CredentialDialog;