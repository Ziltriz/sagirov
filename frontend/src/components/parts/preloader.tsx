import { Box } from '@mantine/core';
import { observer } from 'mobx-react-lite'
import Classes from '@/styles/parts/preloader.module.scss'

export default observer(({
    store
}) => {

    if (store.hasOwnProperty('states') == true) {

        if (store.states.loader == true) {
            return (
                <Box className={Classes.wrapper}>
                    <Box className={Classes.box}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r="59" fill="none" strokeWidth="10" stroke="#e0e0e0" />
                            <g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill="#00874f" />
                                <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1400ms" repeatCount="indefinite" /></g>
                        </svg>
                    </Box>
                </Box>
            )
        }

    }

})