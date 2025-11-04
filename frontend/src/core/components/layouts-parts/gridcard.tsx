import { Card, Text, Box } from '@mantine/core';
import React from 'react';

interface Props {
  smallLabel?: string;
  big: string | number;
  caption?: string;
}

export default function StatsCard({ smallLabel, big, caption }: Props) {
  return (
    <Card className="stat-card" radius="sm">
      <Box className="stat-inner">
        {smallLabel && <Text className="stat-small">{smallLabel}</Text>}
        <Text className="stat-big">{big}</Text>
        {caption && <Text className="stat-caption">{caption}</Text>}
      </Box>
    </Card>
  );
}