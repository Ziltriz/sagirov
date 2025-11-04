import { Alert, Transition } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite'

export default observer(({
    store
}) => {

    if (store.hasOwnProperty('states') == true) {
        
        if (store.states.init == true && store.states.error.length > 0) {
            
            setTimeout(() => {

                store.states.error = "";

            }, 3000)

            const iconError = <IconInfoCircle />;

            return (

                <Transition mounted={true} transition="fade-left" enterDelay={500} exitDelay={300}>
                    {(transitionStyle) => (
                        <Alert variant="danger" color="red" radius="xs" title={store.states.error} icon={iconError} />
                    )}
                </Transition>

            )

        }

    }

});