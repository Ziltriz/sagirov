import React from 'react';
import { Flex, Box } from '@mantine/core';
import { useI18n } from 'next-localization';

import Classes from '@/core/styles/layouts-parts/tabs.module.scss';

type TabsProps = {
  tabs?: string[];
  active?: string | null;
  variant?: string;
  onClick?: (value: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs = [], active = null, variant, onClick }) => {
  const i18n = useI18n();

  const handleClick = (value: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (typeof onClick === 'function') {
      onClick(value);
    }
  };

  return (
    <Box className={Classes.tabswrapper} key="block-tabs" data-variant={variant}>
      {tabs.length > 0 && (
        <Flex className={Classes.tabs} key="block-tab" data-variant={variant}>
          {tabs.map((value) => {
            // перевод заголовка таба
            let title = i18n.t(`profile.tabs.${value}`);
            if (!title || title === `profile.tabs.${value}`) {
              title = i18n.t(value);
            }
            if (!title || title === value) {
              title = value;
            }

            // определение активного таба
            const valueKey = value.indexOf('.') !== -1 ? value.split('.').pop() : value;
            const isActive = (valueKey === active);

            return (
              <Box
                key={value}
                onClick={handleClick(value)}
                data-active={isActive ? 'true' : 'false'}
                className={Classes.tabsitem}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(value)(e as any); }}
              >
                {title}
              </Box>
            );
          })}
        </Flex>
      )}
    </Box>
  );
};

export default Tabs;