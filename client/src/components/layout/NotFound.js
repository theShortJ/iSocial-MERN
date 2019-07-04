import React, {Fragment} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';

const NotFound = () => {
    return (
        <Fragment>
            <HelmetProvider>
                <Helmet>
                    <meta name = "prerender-status-code" content = "404"/>
                </Helmet>
            </HelmetProvider>

            <h1 className = "x-large text-primary">
                <i className = "fas fa-exclamation-triangle"/> Page Not Found
            </h1>
            <p className = "large">
                Page doesn't exists, please review the url.
            </p>
        </Fragment>
    );
};

export default NotFound;
