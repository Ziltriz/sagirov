import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Box, Text,Stack, Button } from '@mantine/core';
import Classes from '@/styles/layouts-parts/header.module.scss'



export default observer(({
  name,
}) => {

return (
<Grid.Col span={6} p={'1rem'} style={{ textAlign: 'center' }}>
<Stack 
  justify="flex-start" 
  style={{ 
    position: 'relative', 
    zIndex: 3,
    textAlign: 'left', 
    maxWidth: 600,
    marginBottom: '4rem',
    marginTop: '10rem',
    
  }}
>

<Box
  component="span"
  style={{
    display: 'block',
    fontSize: '4.2rem',
    fontWeight: 300,
    textTransform: 'uppercase',
    color: '#ffffff', 
    margin: 0,
    position: 'relative'
  }}
>
  <Box
    component="span"
    style={{
      background: 'linear-gradient(90deg, #ffffff 0%, #ff440a 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 200,
      clipPath: 'polygon(0 0, 9% 0, 89% 100%, 0 100%)',
      letterSpacing:'0.1rem'
    }}
  >
    {name || 'Путешествие'}
  </Box>
</Box>
    
<Box
  component="span"
  style={{
    display: 'block',
    fontSize: '1.6rem',
    fontWeight: 300,
    lineHeight: 0.9,
    textTransform: 'uppercase',
    color: '#ffffff',
    margin: 0,
    marginTop: '0.4rem',
    position: 'relative',
  }}
>
  <Box
    component="span"
    style={{
      background: 'linear-gradient(90deg, #ffffff 0%, #ff440a 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 200,
    }}
  >
    {name || 'на красную планету'}
  </Box>
</Box>
<Box
  style={{
    marginTop: '4rem'

  }}
  >
    <Button
    variant="default"
    styles={{
      root: {
        padding: '1px',
        border: 'none',
        color: 'white',
      },
      inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }
    }}
    >
      <Text
        className={`${Classes.textbutton}`}
        style={{
          margin: '1.6rem 0.9rem'
        }}>
        Начать путешествие
      </Text>
      
      <div className={`${Classes.cornerbuttontr}`}></div>
      <div className={`${Classes.cornerbuttonbl}`}></div>
      <div className={`${Classes.linktr}`}></div>
      <div className={`${Classes.linkbl}`}></div>
    </Button>
  </Box>
  </Stack>
</Grid.Col>
)
})