import React, { useState, useContext } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import {
	DIJKSTRA,
	BELLMAN_FORD,
	A_STAR,
	DFS,
	BFS,
	DELAY_SLOWEST,
	DELAY_SLOW,
	DELAY_NORMAL,
	DELAY_FAST,
	DELAY_FASTEST,
} from '../../constants.js';

import { Context } from '../../Provider';
import PathFinder from '../../algorithms/index';
import StyledHeader from './StyledHeader';

const Header = () => {
	const [type, setType] = useState(DIJKSTRA);
	const [pause, setPause] = useState(false);

	const context = useContext(Context);
	const {
		begin,
		end,
		updateItem,
		delay,
		pathFinder,
		clear,
		clearPath,
		board,
		isVisualized,
		setIsPathExist,
		setIsVisualized,
		currentLevel,
		setCurrentLevel,
	} = context;

	const onAlgoChange = (e) => {
		setType(e.target.value);
	};

	const onDelayChange = (e) => {
		delay.current = Number(e.target.value);
	};

	const onVisualize = (e) => {
		if (isVisualized) return;
		clearPath();
		setIsVisualized(true);

		pathFinder.current = new PathFinder[type]({
			begin: begin.current,
			end: end.current,
			updateItem,
			board: board.current,
		});

		const isPossiblePath = pathFinder.current.execute();
		setIsPathExist(isPossiblePath);
		if (isPossiblePath) {
			setIsPathExist(isPossiblePath);
			setCurrentLevel(currentLevel + 1);
		}
	};

	const onClearAll = () => {
		if (isVisualized && !pause) return;
		if (pause) setPause(false);
		setIsVisualized(false);
		clear();
	};

	const onClearPath = () => {
		if (isVisualized && !pause) return;
		if (pause) setPause(false);
		setIsVisualized(false);

		clearPath();
	};

	const onPause = () => {
		if (pause) {
			setPause(false);
			pathFinder.current.resumeTimers();
		} else {
			setPause(true);
			pathFinder.current.stopTimers();
		}
	};

	return (
		<StyledHeader>
			<div className="content-header">
				<select
					className="content-header__select"
					onChange={onAlgoChange}
					id="algorithm"
					disabled={isVisualized}
				>
					<option value={DIJKSTRA} defaultChecked>
						Dijkstra
					</option>
					<option value={BELLMAN_FORD}>Bellman-Ford</option>
					<option value={BFS}>0-1 BFS</option>
					<option value={DFS}>DFS</option>
					<option value={A_STAR}>A*</option>
				</select>

				<select
					className="content-header__select"
					onChange={onDelayChange}
					defaultValue={300}
					disabled={isVisualized}
				>
					<option value={DELAY_SLOW}>slowest</option>
					<option value={DELAY_SLOWEST}>slow</option>
					<option value={DELAY_NORMAL}>normal</option>
					<option value={DELAY_FAST}>fast</option>
					<option value={DELAY_FASTEST}>fastest</option>
				</select>
				<button
					className="content-header__button"
					onClick={onVisualize}
					disabled={isVisualized}
					type="button"
				>
					Run
				</button>
				<button
					className="content-header__button"
					onClick={onClearAll}
					disabled={isVisualized && !pause}
					type="button"
				>
					Clear All
				</button>
				<button
					className="content-header__button"
					onClick={onClearPath}
					disabled={isVisualized && !pause}
					type="button"
				>
					Clear Path
				</button>
				<button
					className="content-header__button--pause"
					onClick={onPause}
					disabled={!isVisualized}
					type="button"
				>
					{pause ? <FaPlay /> : <FaPause />}
				</button>
			</div>
		</StyledHeader>
	);
};

export default Header;
