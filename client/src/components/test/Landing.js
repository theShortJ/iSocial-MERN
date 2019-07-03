// import React from 'react';
// import { MemoryRouter, StaticRouter } from 'react-router';
// import {Link, Redirect} from 'react-router-dom';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// //Not used anymore as we have exported the component as named one. It strips out the REDUX connect from component.
// //import store from '../../store';
// import {Landing} from '../layout/Landing';

// configure({
//     adapter: new Adapter()
// });

// describe('<Landing />', () => {
//     let wrapper;
//     beforeEach( () => {
//         wrapper = shallow(<MemoryRouter> <Landing /> </MemoryRouter>);
//         console.log(wrapper.html());
//         //wrapper = shallow(<StaticRouter> <Landing /> </StaticRouter>, {context: {store}}).dive();
//     });

//     it('Should render Login Link to non-authenticated user', () => {
//         wrapper.setProps({ isAuthenticated: true });
//         //expect( wrapper.find(Redirect).props('to') ).to.be.equal('/dashboard');
//         const result = wrapper.contains( <Link to="/register" className="btn btn-primary">Sign Up</Link> );
//         //const result = wrapper.contains(<a class="btn btn-primary" href="/register">Sign Up</a> );
//         expect(result).toEqual(true);
//     });
// });
