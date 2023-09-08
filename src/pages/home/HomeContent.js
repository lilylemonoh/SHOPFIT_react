import React from 'react';

import HomeMain from '../../components/home/HomeMain';
import HomeCommunity from '../../components/home/HomeCommunity';
import HomeNews from '../../components/home/HomeNews';
import HomeShopping from '../../components/home/HomeShopping';
import HomeIcons from '../../components/home/HomeIcons';
import ChatBot from '../mypage/ChatBot';
import HomeNewsSlide from '../../components/home/HomeNewsSlide';
import HomeImageSlide from '../../components/home/HomeImageSlide';


const HomeContent = () => {
    return (
        <div>
            <HomeMain />
            <HomeImageSlide />
            <HomeIcons />
            {/* <HomeNewsSlide /> */}
            <HomeCommunity />
            <HomeNews />
            <HomeShopping />

        </div>
    );
};

export default HomeContent;