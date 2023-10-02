import React, { PropsWithChildren } from "react";

import Sidebar from "../Sidebar";
import Header from "../Header";

type Props = {
};

const MainWrap = (props: PropsWithChildren<Props>) => {

    return (
        <div className={'flex items-stretch min-h-screen text-black_36'}>
            <Sidebar />

            <div className={'w-screen h-screen overflow-y-auto'}>
                <Header/>

                <div className="container-fluid">
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