import React from 'react';
import { Heading, Text, Image } from '@chakra-ui/react';
import './Styles/About.css';

export default function About() {
    return (
        <main className="about-page">
            <Heading className="about-title">
                About us
            </Heading>

            <Text className="about-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur quae eveniet esse facere perspiciatis. Eum esse itaque molestiae quasi maxime assumenda numquam quidem pariatur, tenetur omnis officiis, cupiditate deserunt dignissimos.
            </Text>

            <Image 
                src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Hello_re_3evm.svg"
                alt="Hello SVG"
                boxSize="250px"
            />
            <small style={{display: "block"}}>Please replace the svg image above with a better one!</small>
        </main>
    );
}