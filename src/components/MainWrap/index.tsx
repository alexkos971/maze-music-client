import React, { PropsWithChildren } from "react";
import './MainWrap.scss';

import Sidebar from "../Sidebar";

type Props = {
};

const MainWrap = (props: PropsWithChildren<Props>) => {

    return (
        <div className="layout layout_main">
            <Sidebar />

            <div className="layout__main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Render Current Page */}
                            {props.children}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MainWrap;