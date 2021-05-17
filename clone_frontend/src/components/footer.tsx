import React, {ReactNode, ReactElement} from 'react';

//Change these to change default, or edit on per call basis
const defaultContainerProps = {
    heading: <p>Dereks Blog Website</p>,
    content: <div>
        <p>Created: 2021</p>
        <p>Author: Derek Marshall</p>
        <p>Tools: Typescript, React, Express, Node, MongoDB</p>
        <a href="https://github.com/DerekMarshall855/social-media-clone">Github</a>
        </div>
};

//Default Typings
type ContainerProps = { content: ReactNode } & typeof defaultContainerProps;
function Footer({ heading, content }: ContainerProps): ReactElement | null {
return (
    <div>
        <h4>{heading}</h4>
        {content}
    </div>
);
}
Footer.defaultProps = defaultContainerProps;

export default Footer;
