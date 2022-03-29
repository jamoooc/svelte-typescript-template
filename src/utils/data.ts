import homeData from '../../data/home';
import homeMockData from '../../mockData/home';
import footerData from '../../data/footer';
import footerMockData from '../../mockData/footer';
import mediaButtonsData from '../../data/mediaButtons';
import mediaButtonsMockData from '../../mockData/mediaButtons';

import nav from '../../data/nav';
import logo from '../../data/logo';

const isProd = process.env.NODE_ENV === "production" ? true : false;

export const home = {
  headingOne: isProd ? homeData.headingOne : homeMockData.headingOne,
  headingTwo: isProd ? homeData.headingTwo : homeMockData.headingTwo
}

export const footer = {
  copyright: isProd ? footerData.copyright : footerMockData.copyright
}

export const mediaButtons = isProd ? mediaButtonsData : mediaButtonsMockData;

export { nav, logo };
