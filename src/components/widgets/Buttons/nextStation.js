import React, { useContext } from 'react'
import {
    Button,
} from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import MainContext from 'context/mainContext/MainContext';

export const NextStation = () => {
   // useContext(MainContext)
    return (
        <Button
            type='submit'
            marginLeft={'80%'}
            marginBottom={'-12%'}
            // marginLeft={{ lg: '38em', md: '80%', sm: '70%' }}
            // marginBottom={{ lg: '-4.5em', md: '-15%', sm: '-30%' }}
            borderRadius={'20px'}
            bgColor={'#137797'}
            color='#ffff'
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Guardando..."
        >
            <BsFillArrowRightCircleFill />
        </Button>
    )
}
