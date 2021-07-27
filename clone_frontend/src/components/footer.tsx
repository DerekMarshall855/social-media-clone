import React, {ReactElement} from 'react';

//Change these to change default, or edit on per call basis
const defaultContainerProps = {
    footing: <div>All Rights Reserved</div>
};

//Default Typings
type ContainerProps = typeof defaultContainerProps;
function Footer({ footing }: ContainerProps): ReactElement | null {
return (
    <footer className="row center">
        {footing}
    </footer>
);
}
Footer.defaultProps = defaultContainerProps;

export default Footer;
