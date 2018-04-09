
import 'jest-localstorage-mock';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { notify } from 'react-notify-toast';

Enzyme.configure({ adapter: new Adapter() });

notify.show = jest.fn();