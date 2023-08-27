import React from "react";
import "./Sidebar.scss";
import { public_url } from "../../config";

const sidebar_menu = [
    {
        icon: '/assets/images/icons/explore.svg',
        path: '/for-you',
        title: 'For you',
        is_current: true
    },
    {
        icon: '/assets/images/icons/box.svg',
        path: '/library',
        title: 'Library',
        is_current: false
    },
]

const Sidebar = () => {
    return (
        <aside className={`sidebar sidebar_collapsed`}>
            <div className="logo sidebar__logo">
                <img src={'/assets/images/logo.svg'}/>
            </div>

            <ul className="sidebar__menu">
                {
                    sidebar_menu.map((item, index) => (
                        <li key={index + item.title} className={`sidebar__menu-item sidebar-button${item.is_current ? ' sidebar-button_current' : '' }`}>
                            <a href={item.path} className="sidebar-button__wrap">
                                <div className="sidebar-button__icon">
                                    <img src={item.icon} />
                                </div>
                                <span className="sidebar-button__title">{item.title}</span>
                            </a>
                        </li>
                    ))
                }
            </ul>

            <div className="sidebar-button sidebar-button_collapse">
                <button className="sidebar-button__wrap">
                    <span className="sidebar-button__title">Collapse</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;