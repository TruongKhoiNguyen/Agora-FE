import React from 'react'

import styles from './Navbar.module.css'

import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'

import { AiFillFacebook, AiOutlineHome, AiOutlineUser, AiOutlineMail, AiOutlineBell } from "react-icons/ai";
import { BsMoon, BsGrid } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons"

const Navbar = () => {
    return (
        <div className={styles.navbar}> 
            <div className={styles.pageIconContainer}>
                <AiFillFacebook size={40}/>
            </div>    
            <div className={styles.iconsContainer}>
                <AiOutlineHome size={28}/>
                <BsMoon size={26}/>
                <BsGrid size={26}/>
            </div>
            <InputGroup justifyContent='center' width='50%'>
                <InputLeftAddon pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftAddon>
                <Input 
                    borderRadius='0.4rem' 
                    width='26rem' 
                    padding='0.4rem' 
                    placeholder='Search' 
                />
            </InputGroup>
            <div className={styles.noftiContainer}>
                <AiOutlineUser size={24}/>
                <AiOutlineMail size={24}/>
                <AiOutlineBell size={24}/>
            </div>
            <div className={styles.userContainer}>
                <AiOutlineUser size={28}/>
                <h4>Username</h4>
            </div>
        </div>  
    )
}

export default Navbar