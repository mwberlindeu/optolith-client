import { Component, PropTypes } from 'react';
import * as React from 'react';
import AccountActions from '../../actions/AccountActions';
import APStore from '../../stores/APStore';
import AuthStore from '../../stores/AuthStore';
import AvatarWrapper from '../AvatarWrapper';
import BorderButton from '../BorderButton';
import createOverlay from '../../utils/createOverlay';
import ELStore from '../../stores/ELStore';
import HeroCreation from '../../views/herolist/HeroCreation';
import HerolistActions from '../../actions/HerolistActions';
import HistoryActions from '../../actions/HistoryActions';
import HistoryStore from '../../stores/HistoryStore';
import IconButton from '../IconButton';
import InGameActions from '../../actions/InGameActions';
import Login from '../../views/account/Login';
import PhaseStore from '../../stores/PhaseStore';
import ProfileStore from '../../stores/ProfileStore';
import TabActions from '../../actions/TabActions';
import Text from '../Text';
import TitleBarBack from './TitleBarBack';
import TitleBarLeft from './TitleBarLeft';
import TitleBarRight from './TitleBarRight';
import TitleBarTabs from './TitleBarTabs';
import TitleBarWrapper from './TitleBarWrapper';
import TooltipToggle from '../TooltipToggle';

interface State {
	account: {
		id: string;
		session: string;
		name: string;
	};
	ap: {
		total: number;
		spent: number;
		rcp: number[];
		adv: number[];
		disadv: number[];
	};
	avatar: string;
	el: string;
	isUndoAvailable: boolean;
	phase: number;
}

interface Props {
	currentSection: string;
	currentTab: string;
}

interface Tab {
	label: string;
	tag: string;
	disabled?: boolean;
}

export default class TitleBar extends Component<Props, State> {

	static propTypes = {
		currentSection: PropTypes.string.isRequired,
		currentTab: PropTypes.string.isRequired
	};

	state = {
		account: AuthStore.getAll(),
		ap: APStore.getAll(),
		avatar: ProfileStore.getAvatar(),
		el: ELStore.getStart(),
		isUndoAvailable: HistoryStore.isUndoAvailable(),
		phase: PhaseStore.get()
	};

	_updateAuthStore = () => this.setState({ account: AuthStore.getAll() } as State);
	_updateAPStore = () => this.setState({ ap: APStore.getAll() } as State);
	_updateHistoryStore = () => this.setState({ isUndoAvailable: HistoryStore.isUndoAvailable() } as State);
	_updatePhaseStore = () => this.setState({ phase: PhaseStore.get() } as State);
	_updateProfileStore = () => this.setState({ avatar: ProfileStore.getAvatar() } as State);

	componentDidMount() {
		AuthStore.addChangeListener(this._updateAuthStore);
		APStore.addChangeListener(this._updateAPStore);
		HistoryStore.addChangeListener(this._updateHistoryStore);
		PhaseStore.addChangeListener(this._updatePhaseStore);
		ProfileStore.addChangeListener(this._updateProfileStore);
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._updateAuthStore);
		APStore.removeChangeListener(this._updateAPStore);
		HistoryStore.removeChangeListener(this._updateHistoryStore);
		PhaseStore.removeChangeListener(this._updatePhaseStore);
		ProfileStore.removeChangeListener(this._updateProfileStore);
	}

	test = () => {
		if (this.state.el === 'EL_0') {
			createOverlay(<HeroCreation />);
		} else {
			TabActions.showSection('hero');
		}
	}
	login = () => createOverlay(<Login />);
	logout = () => AccountActions.logout();
	saveHero = () => HerolistActions.save();
	saveGroup = () => InGameActions.save();
	undo = () => HistoryActions.undoLastAction();

	render() {

		const { currentSection, currentTab } = this.props;
		const { account, ap: { total, spent, adv, disadv }, avatar, isUndoAvailable, phase } = this.state;

		switch (currentSection) {
			case 'main': {
				const tabs: Tab[] = [
					{ label: 'Start', tag: 'home' },
					{ label: 'Über', tag: 'about' }
				];
				if (account.id === null) {
					return (
						<TitleBarWrapper>
							<TitleBarLeft>
								<TitleBarTabs active={currentTab} tabs={tabs} />
							</TitleBarLeft>
							<TitleBarRight>
								<BorderButton
									label={this.state.el === 'EL_0' ? 'Testen' : 'Test fortsetzen'}
									onClick={this.test}
									/>
								<BorderButton
									label="Anmelden"
									onClick={this.login}
									primary
									disabled
									/>
								<IconButton
									icon="&#xE868;"
									disabled
									/>
							</TitleBarRight>
						</TitleBarWrapper>
					);
				} else {
					tabs.splice(1, 0,
						{ label: 'Helden', tag: 'herolist' },
						{ label: 'Gruppen', tag: 'grouplist', disabled: true }
					);
					return (
						<TitleBarWrapper>
							<TitleBarLeft>
								<TitleBarTabs active={currentTab} tabs={tabs} />
							</TitleBarLeft>
							<TitleBarRight>
								<TitleBarTabs active={currentTab} tabs={[
									{ label: account.name, tag: 'account' }
								]} />
								<BorderButton label="Abmelden" onClick={this.logout} disabled />
								<IconButton
									icon="&#xE868;"
									disabled
									/>
							</TitleBarRight>
						</TitleBarWrapper>
					);
				}
			}
			case 'hero': {
				const tabs = [
					{ label: 'Profil', tag: 'profile' }
				];
				switch (phase) {
					case 1:
						tabs.push(
							{ label: 'Spezies, Kultur & Profession', tag: 'rcp' }
						);
						break;
					case 2:
						tabs.push(
							{ label: 'Eigenschaften', tag: 'attributes' },
							{ label: 'Vorteile & Nachteile', tag: 'disadv' },
							{ label: 'Fertigkeiten', tag: 'skills' }
						);
						break;
					case 3:
						tabs.push(
							{ label: 'Eigenschaften', tag: 'attributes' },
							{ label: 'Fertigkeiten', tag: 'skills' },
							{ label: 'Gegenstände', tag: 'items' }
						);
						break;
				}
				return (
					<TitleBarWrapper>
						<TitleBarLeft>
							<TitleBarBack />
							<AvatarWrapper src={avatar} />
							<TitleBarTabs active={currentTab} tabs={tabs} />
						</TitleBarLeft>
						<TitleBarRight>
							<TooltipToggle
								position="bottom"
								margin={12}
								content={
									<div className="ap-details">
										<h4>Abenteuerpunkte</h4>
										<p className="general">
											{total} AP gesamt<br/>
											{spent} AP verwendet
										</p>
										<hr />
										<p>
											{adv[0]} / 80 AP für Vorteile<br/>
											{adv[1] > 0 ? `${adv[1]} / 50 für magische Vorteile` : null}
											{adv[2] > 0 ? `${adv[2]} / 50 für karmale Vorteile` : null}
											{disadv[0]} / 80 AP für Nachteile<br/>
											{disadv[1] > 0 ? `${disadv[1]} / 50 für magische Nachteile` : null}
											{disadv[2] > 0 ? `${disadv[2]} / 50 für karmale Nachteile` : null}
										</p>
									</div>
								}
								>
								<Text className="collected-ap">{total - spent} AP</Text>
							</TooltipToggle>
							<IconButton
								icon="&#xE166;"
								onClick={this.undo}
								disabled={!isUndoAvailable}
								/>
							<BorderButton
								label="Speichern"
								onClick={this.saveHero}
								disabled
								/>
						</TitleBarRight>
					</TitleBarWrapper>
				);
			}

			case 'group': {
				return (
					<TitleBarWrapper>
						<TitleBarLeft>
							<TitleBarBack />
							<Text>Gruppenname</Text>
						</TitleBarLeft>
						<TitleBarRight>
							<BorderButton
								label="Speichern"
								onClick={this.saveGroup}
								/>
						</TitleBarRight>
					</TitleBarWrapper>
				);
			}

			default:
				return null;
		}
	}
}
