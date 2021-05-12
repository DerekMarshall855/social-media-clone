import React, {ReactNode, ReactElement} from 'react';

// Currently just header code as placeholder, later will define
// as a tool to create post blocks w/ good css

const defaultContainerProps = {
    heading: <strong>Social Media Clone</strong>,
    children: <p></p>
};

//Default Typings
type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;
function Header({ heading, children }: ContainerProps): ReactElement | null {
return (
    <div>
        <h1>{heading}</h1>
        {children}
    </div>
);
}
Header.defaultProps = defaultContainerProps;

export default Header;
