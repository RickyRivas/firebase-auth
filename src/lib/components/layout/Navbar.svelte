<script>
	import { isLoggedIn } from './../../../routes/stores/authStore.js';
	import { goto } from '$app/navigation';
	import { getAuth, signOut } from 'firebase/auth';

	const auth = getAuth();

	const logout = () => {
		signOut(auth)
			.then(() => {
				localStorage.removeItem('uid');
				goto('/login');
			})
			.catch((e) => {
				console.error(e);
			});
	};
</script>

<header>
	<ul>
		{#if $isLoggedIn}
			<button on:click={logout}>Signout</button>
		{:else}
			<button>Sign In</button>
		{/if}
	</ul>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 3em;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		background-color: white;
	}
	ul {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
