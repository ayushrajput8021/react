import { useEffect, useState } from 'react';
import axios from 'axios';
import { RepositoriesDataType } from '../types';

type Props = {
	user: RepositoriesDataType;
	onClose: () => void;
	html_url: string;
};

function RepositoriesModal({ user, onClose }: Props) {
	const [repositories, setRepositories] = useState<RepositoriesDataType[]>();

	useEffect(() => {
		const fetchRepositories = async () => {
			const response = await axios.get(user.html_url);
			setRepositories(response.data);
		};

		fetchRepositories();
	}, [user.html_url]);

	return (
		<div className='repositories-modal'>
			<h3>Repositories</h3>
			<button onClick={onClose}>Close</button>
			<ul>
				{repositories?.map((repository) => (
					<li key={repository.id}>
						<a
							href={repository.html_url} target='_blank'rel='noopener noreferrer'>
							{repository.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default RepositoriesModal;