'use client'

import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
	try {
		const parsedURL = new URL(url);
		const hostname = parsedURL.hostname;

		if (hostname.includes('amazon.') || hostname.endsWith('amazon')) {
			return true
		}
	} catch (error) {
		return false
	}
}

const Searchbar = () => {
	const [searchPrompt, setSearchPrompt] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isValidLink = isValidAmazonProductURL(searchPrompt);
		if (!isValidLink) return alert('Please enter a valid URL')

		try {
			setIsLoading(true);

			// Scrape the product page
			const product = scrapeAndStoreProduct(searchPrompt);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
			<input 
				type='text'
				placeholder='Enter product link'
				className='searchbar-input'
				value={searchPrompt}
				onChange={e => setSearchPrompt(e.target.value)}
			/>

			<button 
				type='submit' 
				className='searchbar-btn'
				disabled={searchPrompt === ''}
			>
				{isLoading ? 'Searching...' : 'Search'}
			</button>
		</form>
  )
}

export default Searchbar