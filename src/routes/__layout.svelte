<script>
	import { isLoggedIn } from './stores/authStore';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { onMount } from 'svelte';
	import App from './fb';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import global from '../../src/global.css';

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('Welcome to the file portal');
				isLoggedIn.update(() => true);
			} else {
				isLoggedIn.update(() => false);
				goto('/login');
			}
		});
	});
</script>

<Navbar />
<main>
	<slot />
</main>

<style>
	main {
		width: 100%;
		height: 100%;
	}
</style>
