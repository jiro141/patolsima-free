import React from 'react'
import {
    Button,
    CloseButton,
} from '@chakra-ui/react';

export default function CloseButtonL({handleModal}) {
  return (
    <Button
                            borderRadius={'50%'}
                            colorScheme="blue"
                            width="40px"
                            height="40px"
                            marginLeft={'95%'}
                            marginTop={'-60px'}
                            bgColor={'#137797'}
                            color='#ffff'
                            onClick={handleModal}>
                            <CloseButton
                            />
                        </Button>
  )
}
