import { useState, useEffect } from 'react'
import { Flex, Box, Anchor } from '@mantine/core'
import { useI18n } from 'next-localization';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';

import { set as setObj, remove as removeObj } from '@/core/modules/Object'

import Text from '@/core/components/modules/form/text'
import Switch from '@/core/components/modules/form/switch'
import Select from '@/core/components/modules/form/select'
import Period from '@/core/components/modules/form/period'
import Date from '@/core/components/modules/form/date'
import DateTime from '@/core/components/modules/form/datetime'

import Classes from '@/core/styles/layouts-parts/filter.module.scss'

import Config from '@/config'

export default ({
  store,
  access_roles = {},
  name,
  data = [],
  callbacks = {},
  onFilter = (values) => {

  }
}) => {

  const i18n = useI18n();

  const types = [
    'text',
    'switch',
    'select',
    'date',
    'datetime',
    'dateperiod'
  ]

  const [init, setInit] = useState(false)

  const [open, setOpen] = useState(undefined);

  const [values, setValues] = useState({});

  useEffect(() => {

    if (init == false) {

      if (Array.isArray(data) == true) {

        if (data.length > 0) {

          let tmpValues = values

          data.forEach((item) => {

            if (item.hasOwnProperty('key') == true && item.hasOwnProperty('type') == true) {
              setObj(tmpValues, item['key'], "")
            }

          })

          setValues(tmpValues)

        }

      }

      setInit(true)

    }

  }, [init])

  const onSet = (key, value) => {

    if (typeof (onFilter) == 'function') {

      let tmpValues = { ...values }

      if (typeof (value) != 'undefined') {

        setObj(tmpValues, key, Array.isArray(value) == true ? [...value] : value)

      } else {

        removeObj(tmpValues, key)

      }

      setValues(tmpValues)

      onFilter(tmpValues)

    }

  }

  const onClear = () => {

    setValues({})

    onFilter({})

    setOpen(undefined)

  }

  if (init == true) {

    return (
      <Flex className={Classes.block}>

        {data.length > 0 ?

          data.map((item, index) => {

            let variant = `filter-${item['key']}`,
              value = (values.hasOwnProperty(item['key']) == true ? values[item['key']] : "")

              if (access_roles.hasOwnProperty(item['key']) == true) {
                if (access_roles[item['key']].includes(store.user.user.role) == false) {
                  return;
                }
              }

            if (item.hasOwnProperty('key') == true && item.hasOwnProperty('type') == true) {

              if (types.includes(item['type']) == true) {

                let view = '',
                  dropdown = false

                switch (item['type']) {

                  case 'text':

                    dropdown = true

                    if (open == item['key']) {

                      view = (
                        <Box className={Classes.itemdropdown}>
                          <Text
                            name={name}
                            value={(values.hasOwnProperty(item['key']) ? values[item['key']] : "")}
                            index={item['key']}
                            variant={variant}
                            callbacks={callbacks}
                            onSet={onSet}
                          />
                        </Box>
                      )

                    }

                    break;

                  case 'switch':

                    dropdown = true

                    if (open == item['key']) {

                      view = (
                        <Box className={Classes.itemdropdown}>
                          <Switch
                            name={name}
                            value={(values.hasOwnProperty(item['key']) ? values[item['key']] : false)}
                            index={item['key']}
                            variant={variant}
                            callbacks={callbacks}
                            onSet={onSet}
                          />
                        </Box>
                      )

                    }

                    break;

                  case 'select':

                    dropdown = true

                    if (open == item['key']) {

                      if (item.hasOwnProperty('data') == true) {

                        let multi = (item.hasOwnProperty('multi') == true ? (item.multi == true ? true : false) : false)

                        view = (
                          <Box className={Classes.itemdropdown}>
                            <Select
                              name={name}
                              item={(values.hasOwnProperty(item['key']) ? values[item['key']] : (multi == true ? [] : ""))}
                              values={item.data}
                              index={item['key']}
                              variant={variant}
                              callbacks={callbacks}
                              onSet={onSet}
                              multi={multi}
                            />
                          </Box>
                        )
                      }

                    }

                    break;

                  case 'date':

                    dropdown = true

                    if (open == item['key']) {

                      view = (
                        <Box className={Classes.itemdropdown}>
                          <Date
                            name={name}
                            value={(values.hasOwnProperty(item['key']) ? values[item['key']] : "")}
                            index={item['key']}
                            variant={variant}
                            callbacks={callbacks}
                            onSet={onSet}
                            valueFormat={Config.date_format}
                          />
                        </Box>
                      )

                    }

                    break;

                  case 'datetime':

                    dropdown = true

                    if (open == item['key']) {

                      view = (
                        <Box className={Classes.itemdropdown}>
                          <DateTime
                            name={name}
                            value={(values.hasOwnProperty(item['key']) ? values[item['key']] : "")}
                            index={item['key']}
                            variant={variant}
                            callbacks={callbacks}
                            onSet={onSet}
                            valueFormat={Config.datetime_format}
                          />
                        </Box>
                      )

                    }

                    break;

                  case 'dateperiod':

                    dropdown = true

                    if (open == item['key']) {

                      value = (value ? value : {
                        "start_date": "",
                        "end_date": ""
                      })

                      view = (
                        <Box className={Classes.itemdropdown}>
                          <Period
                            name={name}
                            item={value}
                            value={(values.hasOwnProperty(item['key']) ? values[item['key']] : value)}
                            index={item['key']}
                            variant={variant}
                            callbacks={callbacks}
                            onSet={onSet}
                            valueFormat={Config.date_format}
                            refs={setObj({}, item['key'], ['start_date', 'end_date'])}
                          />
                        </Box>
                      )

                    }

                    break;

                }

                let label = i18n.t(`${name}.${item['key']}`)

                if (!label) {
                  label = item['key']
                }

                return (
                  <Box className={Classes.item}>
                    <Box className={Classes.itemlabel} onClick={() => { setOpen((open == item['key'] ? '' : item['key'])) }} variant={open == item['key'] ? 'open' : ''}>
                      {label}
                      {dropdown == true ? (open == item['key'] ? <IconChevronDown className={Classes.itemicon} /> : <IconChevronUp className={Classes.itemicon} />) : ""}
                    </Box>
                    <Box className={Classes.itemvalue}>
                      {view}
                    </Box>
                  </Box>
                )

              }
            }

          })
          :
          ''
        }

        {
          Object.keys(values).length > 0 ?
            <Anchor className={Classes.clear} onClick={() => { onClear() }}>
              {i18n.t(`common.clear_button`)}
            </Anchor>
            : ''
        }
      </Flex>
    );

  }

}