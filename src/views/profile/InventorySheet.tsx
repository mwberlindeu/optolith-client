import * as React from 'react';
import SheetHeader from './SheetHeader';
import TextBox from '../../components/TextBox';

export default () => {
	return (
		<div className="sheet inventory">
			<SheetHeader title="Besitz" />
			<div className="upper">
				<TextBox label="Ausrüstung">
				</TextBox>
			</div>
		</div>
	);
}
