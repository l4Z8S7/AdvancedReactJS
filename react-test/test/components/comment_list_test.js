import {renderComponent, expect} from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {
	let component;
	beforeEach(() => {
		component = renderComponent(CommentList, null, {comments: ['New Comment', 'Other Comment']});
	});

	it('shows a LI for each comment', () => {
		expect(component.find('li').length).to.equal(2);
	});
	it('shows all comments that is provided', () => {
		expect(component).to.contain('New Comment');
		expect(component).to.contain('Other Comment');
	});
});