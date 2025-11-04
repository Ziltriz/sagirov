import { useI18n } from 'next-localization';

export default ({ code }) => {

    const i18n = useI18n();

    return (
        <>{i18n.t(code).length > 0 ? i18n.t(code) : code}</>
    );
}