import { IsActive } from '@/core/components/common/list'
import Role from '@/components/users/role'
import { SchemaInline } from '@/request/User'

const eventPrepareRequestValue = (value) => {

    if (Array.isArray(value) == true) {
        return value.join(',')
    }

    return value

}

export default {
    role: (index, item, value, name, key, store) => {

        return (
            <Role
                schema={SchemaInline}
                index={index}
                item={item}
                value={value}
                indexKey={key}
            />
        )

    },
    rules: (index, item, value, name, key, store) => {

        return (
            <Rule
                schema={SchemaInline}
                data={new Promise((resolve) => {
                    resolve(store.user.user.role != 'root' ? store.user.user.rules : rules)
                })}
                index={index}
                item={item}
                value={value}
                indexKey={key}
                eventPrepareRequestValue={eventPrepareRequestValue}
            />
        )

    },
    providers: (index, item, value, name, key, store) => {

        return (
            <Rule
                schema={SchemaInline}
                data={new Promise((resolve) => {
                    resolve(store.user.user.role != 'root' ? store.user.user.providers : providers)
                })}
                index={index}
                item={item}
                value={value}
                indexKey={key}
                eventPrepareRequestValue={eventPrepareRequestValue}
            />
        )

    },

    scorring: (index, item, value, name, key, store) => {

        return (
            <Rule
                schema={SchemaInline}
                data={new Promise((resolve) => {
                    resolve(store.user.user.role != 'root' ? store.user.user.scorring : sections)
                })}
                index={index} item={item}
                value={value}
                indexKey={key}
                eventPrepareRequestValue={eventPrepareRequestValue}
            />
        )

    },

    active: (index, item, value) => {

        return IsActive(
            index,
            item,
            value,
            (checked) => {
                return {
                    active: checked,
                    id: item.target.id
                }
            },
            SchemaInline
        );

    }
}