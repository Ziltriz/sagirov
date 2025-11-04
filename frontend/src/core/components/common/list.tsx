import CIsActive from '@/core/components/parts/isActive'
import CImage from '@/core/components/parts/image'
import CLink from '@/core/components/parts/link'
import CDescription from '@/core/components/parts/description'
import CDetailedDescription from '@/core/components/parts/detailedDescription'

export const Image = (index, item, value, name = '') => {
    return (<CImage index={index} item={item} value={value} name={name} />);
}

export const IsActive = (index, item, value, prepareRequest = () => { }, schema) => {
    return (<CIsActive index={index} item={item} value={value} prepareRequest={prepareRequest} schema={schema} />);
}

export const Description = (index, item, value) => {
    return (<CDescription index={index} item={item} value={value} />);
}

export const Link = (index, item, value, target) => {
    return (<CLink index={index} item={item} value={value} target={target} />);
}

export const DetailedDescription = (index, item, value) => {
    return (<CDetailedDescription index={index} item={item} value={value} />);
}