import React from 'react';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
}

const team: TeamMember[] = [
    {
        name: "Steven Gao",
        role: "Full-time Software engineer",
        bio: "hi"
    }
];

interface AboutPageProps {
    teamName: string;
    description: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ teamName, description }) => {
    return (
        <div>
            <h1>{teamName}</h1>
            <p>{description}</p>
            <h2>Meet Our Team</h2>
            {team.map(member => (
                <div key={member.name}>
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                    <p>{member.bio}</p>
                </div>
            ))}
        </div>
    );
};

export default AboutPage;
