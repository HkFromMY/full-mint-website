import React from 'react';
import { Flex, List, ListItem, Text, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Styles/Navbar.css';

export default function Navbar({ accounts, setAccounts }) {
    // for responsive design
    const [isOpen, setIsOpen] = React.useState(false);

    function shortenAddress() {
        return accounts[0].slice(0, 4) + '...' + accounts[0].slice(-4);
    }

    const navigation_links = (
        <>
            <Link to="/about">About</Link>
            <Link to="/">Mint</Link>
            <Link to="/team">Team</Link>
            <ListItem><Text>{ accounts.length > 0 ? 'Connected' : 'Not connected' }</Text></ListItem>
        </>
    );

    return (
        <>
            <nav className="navbar">
                <Flex
                    w='100%' 
                    height="75px"
                    p={24}
                    borderWidth='1px'
                    borderRadius='lg'
                    justifyContent="space-between"
                    color="white"
                >
                    {/* Left side of social auth */}
                    <div className="social-icons">
                        <List display='inline-flex' columnGap={36}>
                            <ListItem><FontAwesomeIcon icon={brands('facebook')} size='xl' className="social-icon" /></ListItem>
                            <ListItem><FontAwesomeIcon icon={brands('twitter')} size='xl' className="social-icon" /></ListItem>
                            <ListItem><FontAwesomeIcon icon={solid('envelope')} size='xl' className="social-icon" /></ListItem>
                            {
                                accounts.length > 0 ?
                                <ListItem className="hello-text">
                                    Hello { shortenAddress() }
                                </ListItem>
                                :
                                ''
                            }
                        </List>
                    </div>
                    {
                        !isOpen &&
                        <div className="hamburger-icon">
                            <FontAwesomeIcon 
                                icon={solid('bars')} 
                                className="hamburger-icon" 
                                size="xl" 
                                onClick={() => setIsOpen(oldIsOpen => true)}
                            />
                        </div>
                    }
                    
                    {/* Right side for function */}
                    <Box className="function-links">
                        {
                            isOpen ? 
                            <FontAwesomeIcon 
                                icon={solid('xmark')} 
                                cursor="pointer"
                                size="xl"
                                onClick={() => setIsOpen(oldIsOpen => false)} 
                            />
                            :

                            <List className="functions-list">
                                { navigation_links }
                            </List>
                        }
                    </Box>
                </Flex>
            </nav>
            {
                isOpen &&
                <div className="menu-box">
                    <List className="menu-list">
                        { navigation_links }
                    </List>
                </div>
            }
        </>
    );
}