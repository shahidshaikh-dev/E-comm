/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type SyntheticEvent } from 'react';
import './CustomSearchbar.scss';
import { Input, Tooltip } from 'antd';

interface CustomSearchbarProps {
	name: string;
	value: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	debounce?: number | null;
	onChange: (e: SyntheticEvent) => void;
	placeholder: string;
	prefix?: HTMLElement | string | number | any;
	needFilter?: boolean;
	onFilterClick?: (e: SyntheticEvent) => void;
	searchTooltipTitle?: String;
	className?: string;
}
let debounceTimeout: any = null;
export const CustomSearchbar = React.memo(
	({
		name,
		value,
		setSearchValue,
		debounce = null,
		onChange,
		placeholder,
		// prefix,
		needFilter = false,
		// onFilterClick,
		searchTooltipTitle,
		className = '',
		prefix,
	}: CustomSearchbarProps) => {
		const handleOnSearch = (event: any) => {
			setSearchValue(event.target.value);
			if (debounce && typeof debounce === 'number') {
				if (debounceTimeout) {
					clearTimeout(debounceTimeout);
				}
				debounceTimeout = setTimeout(() => {
					onChange(event);
				}, debounce);
			} else {
				// no delay run always
				onChange(event);
			}
		};
		return (
			<div
				className={`custom-searchbar ${
					needFilter ? 'flex items-center gap-2' : ''
				}`}
			>
				<Tooltip
					title={searchTooltipTitle}
					placement='top'
				>
					<Input
						type='text'
						className={`search-input min-h-10 ${className} `}
						name={name}
						placeholder={placeholder}
						prefix={prefix || undefined}
						// prefix={
						// 	prefix ? (
						// 		prefix
						// 	) : (
						// 		<img
						// 			src='/images/icons/custom-search.svg'
						// 			alt='search'
						// 			style={{
						// 				marginRight: '4px',
						// 			}}
						// 		/>
						// 	)
						// }
						value={value}
						onChange={(e) => handleOnSearch(e)}
						allowClear={{
							clearIcon: (
								<img
									src='/images/icons/close.svg'
									className='search-icon-clear'
									style={{ width: '10px' }}
									alt='close'
								/>
							),
						}}
					/>
				</Tooltip>
				{/* {needFilter ? (
					<Tooltip
						placement='bottom'
						title={'Filter'}
					>
						<img
							src='/images/icons/filter.svg'
							style={{ width: '35px' }}
							onClick={onFilterClick}
							alt='filter'
							className='ms-1 cursor-pointer'
						/>
					</Tooltip>
				) : (
					''
				)} */}
			</div>
		);
	}
);
