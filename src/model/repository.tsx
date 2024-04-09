import { useState } from 'react';
import RepositoriesModal from './repositoryModel';
import { UserDataType } from '../types';

type Props = {
	user: UserDataType;
	html_url: string;
};

function Repositories({ user }: Props) {
	const [showrepo, setShowRepo] = useState(false);

	const handleOpenModal = () => {
		setShowRepo(true);
	};

	const handleCloseModal = () => {
		setShowRepo(false);
	};

	return (
		<div className='repositories'>
			<h3>Repositories</h3>
			<button onClick={handleOpenModal}>View Repositories</button>
			{showrepo && (
				<RepositoriesModal user={user} onClose={handleCloseModal} html_url={''} />
			)}
		</div>
	);
}

export default Repositories;