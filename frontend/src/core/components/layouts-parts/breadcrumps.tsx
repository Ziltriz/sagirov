import { Flex, Box, Anchor, Title } from '@mantine/core'
import { useI18n } from 'next-localization';
import { IconChevronRight } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite'

import { isString, isObject } from "@/core/modules/Types"
import { getRootPath } from '@/core/modules/Url'

import Classes from '@/core/styles/layouts-parts/breadcrumps.module.scss'

export default observer(({
  store,
  name,
  section = '',
  breadcrumps = [],
  text,
  order,
  button
}) => {

  const i18n = useI18n();

  return (

    <Box className={Classes.block} key="block-breadcrumps">

      {breadcrumps.length > 0 ?
        <Flex className={Classes.breadcrumps} key="breadcrumps">
          {
            breadcrumps.map((value, index) => {

              if (breadcrumps.length - 1 == index) {

                if (isString(value) == true) {

                  name = value;

                } else if (isObject(value) == true) {

                  if (value.hasOwnProperty('value') == true) {
                    name = value.value;
                  }

                }

                let text = i18n.t('headlings.' + name)

                if (text.length == 0) {
                  text = name
                }

                return (
                  <Box className={Classes.breadcrumpsitem} key={value}>{text}</Box>
                )

              } else {

                var name,
                  uri = '';

                if (isString(value) == true) {

                  name = value;
                  uri = value.split('_').pop();

                } else if (isObject(value) == true) {

                  if (value.hasOwnProperty('value') == true) {
                    name = value.value;
                  }

                  if (value.hasOwnProperty('uri') == true) {
                    uri = value.uri;
                  }

                }

                return (
                  <Anchor className={Classes.breadcrumpslink} href={getRootPath() + (section.length > 0 && section.replace('/', '') != uri ? section : '') + uri} key={name}> {i18n.t('headlings.' + name)} <IconChevronRight className={Classes.breadcrumpslinkicon} /> </Anchor>
                )

              }

            })

          }

        </Flex>
        :
        ''}

      <Flex className={Classes.blockinner} key="block-breadcrumps-inner">

        {text ? <Title order={order} className={Classes.title}>{text}</Title> : ''}

        {button}

      </Flex>



    </Box>

  );
})