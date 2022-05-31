import React from 'react';
import './Styles/Team.css';
import { Heading, Image, Text } from '@chakra-ui/react';

export default function Team() {
    return (
        <main className="team-page">
            <Heading className="team-title">
                The Team
            </Heading>
            <Image 
                src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Developer_activity_re_39tg.svg" 
                alt="Developer"
                boxSize="250px"
            />

            <Text className="team-text">
                Hello there! I am Kok Hon Kit, the one who develop this website. I am currently studying at Asia Pacific University (APU) and undergoing an internship programme at MyMessage. As I am interested in advance technologies like Blockchain, this minting website is born.
            </Text>
        </main>
    );
}