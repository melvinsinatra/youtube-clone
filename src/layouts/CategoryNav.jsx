import { Chip, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useUpdateCategory } from '../contexts/VideoContext';
import { categories } from '../utils/constants';

const CategoryNav = () => {
	const setCategory = useUpdateCategory();

	/**
	 * Handling category onClick
	 */
	function findCategoryIndex(chosenCategory) {
		let choice;
		categories.forEach((category) => {
			if (category === chosenCategory) {
				choice = chosenCategory;
			}
		});
		return categories.indexOf(choice);
	}

	function handleChipClick(e) {
		const categoryIndex = findCategoryIndex(e.target.textContent);
		setSelected(categoryIndex);

		setCategory(categories[categoryIndex]);
	}

	const categoryChips = categories.map((category) => {
		return <Chip key={category} sx={{ marginInline: '.3em', marginTop: '.5em' }} label={category} onClick={handleChipClick} />;
	});

	const [selected, setSelected] = useState(0);

	return (
		<Tabs value={selected} variant="scrollable" scrollButtons="auto" sx={{ borderBlock: `1px solid`, borderColor: 'text.disabled' }}>
			{categoryChips}
		</Tabs>
	);
};

export default CategoryNav;
