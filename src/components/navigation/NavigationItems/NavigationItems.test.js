import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('<NavigationItems/>', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    });

    it('should render two NavigationItem elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three NavigationItem elements if authenticated', () => {
        wrapper.setProps({authenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contain a Logout element if authenticated', () => {
        wrapper.setProps({authenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toEqual(true);
    });

    it('should not contain a Logout element if unauthenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toEqual(false);
    });

    it('should contain a Orders element if authenticated', () => {
        wrapper.setProps({authenticated: true});
        expect(wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)).toEqual(true);
    });

    it('should not contain a Orders element if unauthenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)).toEqual(false);
    });

    it('should contain a Auth element if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/auth">Auth</NavigationItem>)).toEqual(true);
    });

    it('should not contain a Auth element if authenticated', () => {
        wrapper.setProps({authenticated: true});
        expect(wrapper.contains(<NavigationItem link="/auth">Auth</NavigationItem>)).toEqual(false);
    });

    it('should always contain the BurgerBuilder navigation item', () => {
        const unauthContains = wrapper.contains(<NavigationItem link="/" exact>Burger Builder</NavigationItem>);
        wrapper.setProps({authenticated: true});
        const authContains = wrapper.contains(<NavigationItem link="/" exact>Burger Builder</NavigationItem>);
        expect(authContains && unauthContains).toEqual(true);
    })
});