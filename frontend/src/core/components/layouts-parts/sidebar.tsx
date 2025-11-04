import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Anchor, Box, NavLink } from '@mantine/core';
import { IconCircleFilled, IconMenu2 } from '@tabler/icons-react';

import { searchUri, templateReplace } from '@/core/modules/Url'
import { request } from '@/core/modules/Request'
import { set as setObj } from '@/core/modules/Object'
import { getRootPath } from '@/core/modules/Url'

import Classes from '@/core/styles/layouts-parts/sidebar.module.scss'

import Data from '@/data/Sidebar'

export default ({
  store
}) => {

  const [init, setInit] = useState(false);

  const [initRule, setInitRule] = useState(false);

  const [rule, setRule] = useState([]);

  const [role, setRole] = useState("");

  const [items, setItems] = useState(Data);

  const [childrens, setChildrens] = useState({});

  const pathname = useRouter().pathname;

  useEffect(() => {

    if (init == false && initRule == false) {

      if (store.hasOwnProperty('user') == true) {

        if (store.user.hasOwnProperty('user') == true) {

          if (typeof (store.user.user) == 'object') {

            if (store.user.user.hasOwnProperty('rules') == true) {
              setRule(store.user.user.rules);
            }

            if (store.user.user.hasOwnProperty('role') == true) {
              setRole(store.user.user.role);
            }

            setInitRule(true);

          }

        }

      }

    } else if (init == false && initRule == true) {

      let tmpItems = items

      items.map((value, index) => {

        setObj(value, 'view', false)

        let access_roles = undefined

        if (value.hasOwnProperty('access_roles') == true) {
          if (Array.isArray(value.access_roles) == true) {
            access_roles = value.access_roles
          }
        }

        if (value.hasOwnProperty('code') == true) {

          if (Array.isArray(access_roles) == true) {
            if (access_roles.includes(role) == true) {
              value.view = true
            }
          }

          if (value.view == false) {
            let not_rule = (Array.isArray(access_roles) == true ? access_roles.includes('all') : false)
            if (not_rule == false) {
              value.view = rule.includes(value.code);
            } else {
              value.view = true
            }
          }

        }

        if (value.hasOwnProperty('children_schema') == true && value.hasOwnProperty('code') == true) {

          if (value.children_schema.hasOwnProperty('schema') == true && childrens.hasOwnProperty(value.code) == false) {
            getChildrens(value.code, value.children_schema)
          }

        }

        if (value.hasOwnProperty('children') == true) {

          value.children.map((subValue, subIndex) => {

            setObj(subValue, 'view', false)

            let access_roles = undefined

            if (subValue.hasOwnProperty('access_roles') == true) {
              if (Array.isArray(subValue.access_roles) == true) {
                access_roles = subValue.access_roles
              }
            }

            if (subValue.hasOwnProperty('code') == true) {

              if (Array.isArray(access_roles) == true) {
                if (access_roles.includes(role) == true) {
                  subValue.view = true
                }
              }

              if (subValue.view == false) {
                let not_rule = (Array.isArray(access_roles) == true ? access_roles.includes('all') : false)
                if (not_rule == false) {
                  subValue.view = rule.includes(subValue.code);
                } else {
                  subValue.view = true
                }
              }

            }

          })

        }

      })

      setItems(tmpItems);
      setInit(true);


    }

  });

  const getChildrens = (code, children_schema) => {

    if (children_schema.hasOwnProperty('schema') == true && children_schema.hasOwnProperty('href') == true) {

      request(children_schema.schema, {}, {}, {}).then((data) => {

        let tmpChildrens = { ...childrens },
          arrChildrens = [];

        if (data.data.hasOwnProperty('items') == true) {

          if (Array.isArray(data.data.items) == true) {

            data.data.items.forEach((item) => {

              if (item.hasOwnProperty('title') == true) {

                let href = templateReplace(children_schema.href, item)

                arrChildrens.push({ code: code, title: item.title, href: href, view: rule.includes(code) })

              }

            })

          }

          setChildrens(setObj(tmpChildrens, code, arrChildrens))

        }

      })

    }

  }

  if (Array.isArray(items) == true) {

    return (

      <Box className={Classes.block} variant={store.states.sidebar ? 'sidebar-open' : 'sidebar-close'}>

        {
          typeof (store) != 'undefined' && init == true ?
            <Box className={Classes.loginblock}>
              <Anchor href={getRootPath() + 'profile'} className={Classes.login}>
                <IconMenu2 onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  store.states.sidebar = !store.states.sidebar;
                }} className={Classes.ico} /> <span className={Classes.logintext}>{store.states.sidebar ? store.user.user.login : ""}</span>
              </Anchor>
            </Box> : ""
        }

        {init == true ?

          items.map((value, index) => {

            if (value.view == true) {

              let children = (childrens.hasOwnProperty(value.code) == true ? childrens[value.code] : []).concat((value.hasOwnProperty('children') == true ? value.children : []))

              return (
                <Box key={index} className={Classes.item}>

                  <NavLink
                    variant={(value.hasOwnProperty('href') == true ? (searchUri(value.href, pathname) ? 'active' : '') : '')}
                    defaultOpened={(value.hasOwnProperty('href') == true ? searchUri(value.href, pathname) || searchUri((value.hasOwnProperty('codes') == true ? value.codes : []), pathname, false) : false)}
                    key={index}
                    className={Classes.itemlink}
                    href={(value.hasOwnProperty('href') == true ? value.href : 'javascript:;')}
                    label={store.states.sidebar ? value.title : ""}
                    leftSection={(value.hasOwnProperty('icon') == true ? value.icon : (<IconCircleFilled className={Classes.ico} />))}
                  >
                    {
                      store.states.sidebar && children.length > 0 ?

                        children.map((subValue, subIndex) => {

                          if (subValue.view == true) {

                            return (
                              <NavLink key={index + subIndex}
                                variant={(subValue.hasOwnProperty('href') == true ? (searchUri(subValue.href, pathname) ? 'active' : '') : '')}
                                className={Classes.subitemlink}
                                href={(subValue.hasOwnProperty('href') == true ? subValue.href : 'javascript:;')}
                                label={subValue.title}
                              //leftSection={<IconCircleFilled className={Classes.subico} />}
                              >
                              </NavLink >
                            )

                          }

                        }) : ''

                    }

                  </NavLink >

                </Box>
              )
            }

          })

          : ''}

      </Box>

    )

  }

}