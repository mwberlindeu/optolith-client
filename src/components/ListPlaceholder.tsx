import * as React from 'react';
import { translate } from '../utils/I18n';
import { IconButton } from './IconButton';
import { List } from './List';
import { ListItem } from './ListItem';
import { ListItemButtons } from './ListItemButtons';
import { ListItemName } from './ListItemName';
import { ListItemSeparator } from './ListItemSeparator';
import { ListItemValues } from './ListItemValues';

export function ListPlaceholder() {
	const placeholder = (
		<ListItem className="placeholder">
			<ListItemName name="" />
			<ListItemSeparator/>
			<ListItemValues>
				<div className="cost"><div className="placeholder-text"></div></div>
			</ListItemValues>
			<ListItemButtons>
				<IconButton icon="&#xE15B;" flat disabled />
				<IconButton icon="&#xE88F;" flat disabled />
			</ListItemButtons>
		</ListItem>
	);

	return (
		<List>
			{placeholder}
			{placeholder}
			{placeholder}
			{placeholder}
			{placeholder}
			<div className="placeholder-message">
				{translate('emptylist')}
			</div>
		</List>
	);
}