import { Dropzone } from '@mantine/dropzone';
import { Group, Box, Flex, Anchor, Image, SimpleGrid } from '@mantine/core';
import { IconPaperclip, IconX } from '@tabler/icons-react';
import { useI18n } from 'next-localization';

import { schemaGetToPath } from '@/core/modules/Form'

export default ({
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    labelGroup,
    disabled,
    required,
    placeholder,
    accept,
    maxSize,
    description,
    onDrop,
    onReject,
    item,
    callbacks = {},
    value = []
}) => {

    const i18n = useI18n();

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + (positionIndex != undefined ? positionIndex + "." : "") + index : index)

    const onDropEvent = (data) => {

        if (typeof onDrop == 'function') {
            onDrop(data)
        } else {

            let formElement = schemaGetToPath(form.values, formIndex)

            if (typeof (formElement) != 'undefined') {
                form.setFieldValue(formIndex, (Array.isArray(value) == true ? value : []).concat(data))
            }

        }

    }

    const onRejectEvent = (data) => {

        if (typeof onReject == 'function') {
            onReject()
        }

    }

    const onResetEvent = (event) => {

        event.preventDefault();
        event.stopPropagation();

        let formElement = schemaGetToPath(form.values, formIndex)

        if (typeof (formElement) != 'undefined') {
            form.setFieldValue(formIndex, [])
        }


    }

    const prepareValue = () => {

        if (callbacks.hasOwnProperty('prepare') == true) {
            if (callbacks.prepare.hasOwnProperty(index) == true) {
                return callbacks.prepare[index](value);
            }
        }

        return (Array.isArray(value) == true ? value : [])

    }

    return (
        <Box
            className="mantine-DropzoneGroup-root"
            variant={variant}
            key={formIndex + 'DropzoneGroup'}
        >
            <Box
                className="mantine-DropzoneGroup-label"
                variant={variant}
                key={formIndex + 'DropzoneGroup-label'}
            > {label} </Box>
            <Dropzone
                key={formIndex + 'Dropzone'}
                variant={variant}
                onDrop={onDropEvent}
                onReject={onRejectEvent}
                maxSize={maxSize}
                accept={accept}
            >

                {(Array.isArray(value) == true ? value : []).length > 0 ?

                    <SimpleGrid>
                        <IconX className="mantine-DropzoneGroup-close" onClick={onResetEvent} />
                        {
                            prepareValue().map((file, fileIndex) => {

                                if (typeof (file) != 'undefined') {
                                    
                                    let imageUrl = (file instanceof File ? URL.createObjectURL(file) : (file.hasOwnProperty('url') == true ? file.url : undefined));

                                    if (imageUrl) {

                                        return (
                                            <Image className="mantine-DropzoneGroup-image" key={formIndex + fileIndex} src={imageUrl} onLoad={() => { URL.revokeObjectURL(imageUrl) }} />
                                        );
                                    }
                                }
                            })
                        }
                    </SimpleGrid>
                    :
                    <Group>
                        <Flex>
                            <Box variant="left" className="mantine-DropzoneGroup-box"><IconPaperclip className="mantine-DropzoneGroup-icon" stroke={1.5} /></Box>
                            <Box variant="right" className="mantine-DropzoneGroup-box"><Anchor className="mantine-DropzoneGroup-anchor">{i18n.t('common.select_files')}</Anchor> {placeholder}</Box>
                        </Flex>
                    </Group>
                }
            </Dropzone>
            {
                description ?
                    <Box
                        className="mantine-DropzoneGroup-description"
                        variant={variant}
                        key={formIndex + 'Dropzone-description'}
                    >
                        <Box key={formIndex + 'Dropzone-description-title'} className="mantine-DropzoneGroup-description-title">{i18n.t('common.image_requirements')}</Box>
                        <Box key={formIndex + 'Dropzone-description-text'} className="mantine-DropzoneGroup-description-text">{description}</Box>

                    </Box>
                    : ''
            }

        </Box>
    )

}