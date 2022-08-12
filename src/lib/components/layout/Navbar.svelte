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
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3em;
	}
	ul {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
