import { Button, HStack} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
       <HStack  padding={ '4' } backgroundColor={'black'} color={'white'} >
        <Button fontSize={'xx-large'} ml={'1px'} padding={'1px'} variant={'unstyle'} ><Link to={'/'}>Home</Link></Button>
        <Button fontSize={'xx-large'} ml={'1px'} padding={'1px'} variant={'unstyle'}><Link to={'/exchanges'}>Exhanges</Link></Button>
        <Button fontSize={'xx-large'} ml={'1px'} padding={'1px'} variant={'unstyle'}><Link to={'/coins'}>Coins</Link></Button >
        
      </HStack>
    </div>
  )
}

export default Header
