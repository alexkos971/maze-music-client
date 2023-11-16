import React, { PropsWithChildren } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Player from "@components/Player";

type Props = {
};

const MainWrap = (props: PropsWithChildren<Props>) => {

    return (
        <>
            <div className={'flex items-stretch min-h-screen text-black_36 relative'}>
                <Sidebar />

                <div className={'w-screen h-screen overflow-y-auto overflow-x-hidden'}>
                    <Header/>

                    <div className="main-wrap min-h-screen">
                        <div className="container-fluid pb-16">
                            <div className="row">
                                <div className="col-lg-12">
                                    {/* Render Current Page */}
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Player/>
                </div>
            </div>
        </>
    );
}

export default MainWrap;