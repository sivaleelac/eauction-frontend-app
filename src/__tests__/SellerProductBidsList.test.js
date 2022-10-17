import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import ProductBidsList from '../components/seller/ProductBidsList';
Enzyme.configure({adapter: new Adapter()});
describe("Seller Product with Bids details",() => {
    it("should render product bids list Component",()=>{
        const wrapper = shallow(<ProductBidsList />);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});