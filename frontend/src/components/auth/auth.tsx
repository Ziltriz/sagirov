import { observer } from 'mobx-react-lite'
import { useI18n } from 'next-localization';
import { Box, Modal, TextInput, Text, Group } from '@mantine/core';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Title, Button } from '@/components/parts';
import { schemaToRender, schemaUseForm } from '@/core/modules/Form'
import { authUser, setAccessToken, setAccessTokenAt, setAccessId , verifyTwoFactor} from '@/core/models/User'
import Schema from '@/request/Auth'

import Classes from '@/styles/auth/auth.module.scss'

export default observer(({ store }) => {

    const router = useRouter();
    const i18n = useI18n();
    const schema = Schema;
    const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    

    const handleAuthSubmit = async (values) => {
        setLoading(true);
        setError('');
        
        try {
            const result = await authUser(values);
            const data = result.data;

            if (data.success) {
                if (data.two_factor_required) {
                    setUserId(data.user_id);
                    setTwoFactorModalOpen(true);
                } else {
                    handleSuccessfulAuth(data);
                }

                store.state = {
                    ...store.states,
                    ...{
                      loader: false,
                    }
                }
            } else {
                setError(i18n.t('auth.not'));

                notifications.show({
                    title: 'Ошибка',
                    message: 'Неверный логин или пароль',
                    color: 'red'
                });
            }
        } catch (err) {
            setError(i18n.t('auth.not'));

            notifications.show({
                title: 'Ошибка',
                message: 'Нет соединения с сервером!',
                color: 'red'
            });
        }
    };

    const handleVerifyCode = async () => {
        setLoading(true);
        try {
            const result = await verifyTwoFactor({
                user_id: userId,
                code: verificationCode
            });
            if (result.data.success) {
                handleSuccessfulAuth(result.data);
            } else {
                setError('Неверный код подтверждения');
                notifications.show({
                    title: 'Ошибка',
                    message: 'Неверный код подтверждения!',
                    color: 'red'
                });
                
            }
        } catch (err) {
            setError('Ошибка при проверке кода');
            notifications.show({
                title: 'Ошибка',
                message: 'Нет соединения с сервером!',
                color: 'red'
            });
        } finally {
            setLoading(false);
        }
    };


    const handleSuccessfulAuth = (data) => {
        setAccessToken(data.session);
        setAccessTokenAt(data.session_at);
        setAccessId(data.id);
        router.reload();
    };

    if (Object.keys(schema.values).length > 0) {

        const form = schemaUseForm(schema)


        return (
            <>
            <Box className={Classes.block}>
                <form className={Classes.form} onSubmit={form.onSubmit(handleAuthSubmit)}>
                    <Title className={Classes.title} text={i18n.t('headlings.auth')} order={4} />
                    { schemaToRender(store, form, schema, '', {}, {}, { prefix: '' }) }
                    <Button className={Classes.buttoninput} text={i18n.t('auth.sign_in')} type="submit" />
                </form>
            </Box>
            <Modal
                opened={twoFactorModalOpen}
                onClose={() => setTwoFactorModalOpen(false)}
                title="Двухфакторная аутентификация"
            >
                <Text mb="md">
                    Код подтверждения отправлен в ваш Telegram. 
                    Введите его ниже:
                </Text>
                <TextInput
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.currentTarget.value)}
                    placeholder="6-значный код"
                    maxLength={6}
                    mb="md"
                />
                <Group position="right">
                    <Button 
                        onClick={handleVerifyCode}
                        loading={loading}
                        text={i18n.t('auth.sign_in')}
                    />
                </Group>
                {error && <Text color="red" size="sm" mt="sm">{error}</Text>}
            </Modal>
            </>
        );
    }
});