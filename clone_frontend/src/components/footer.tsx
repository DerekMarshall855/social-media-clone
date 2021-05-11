import React, {ReactNode, ReactElement} from 'react';

//Change these to change default, or edit on per call basis
const defaultContainerProps = {
    heading: <strong>Temp Footer Heading</strong>,
    content: <p>Temp Footer Content</p>
};

//Default Typings
type ContainerProps = { content: ReactNode } & typeof defaultContainerProps;
function Footer({ heading, content }: ContainerProps): ReactElement | null {
return (
    <div>
        <h3>{heading}</h3>
        {content}
    </div>
);
}
Footer.defaultProps = defaultContainerProps;

export default Footer;
