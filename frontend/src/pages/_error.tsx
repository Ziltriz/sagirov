import ErrorBlock from '@/core/components/error'

function Error({ statusCode }) {
    return (
        <ErrorBlock text={statusCode} />
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}
   
export default Error